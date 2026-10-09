import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

// Component CSS is loaded globally through .storybook/preview.ts, so Chromatic
// TurboSnap cannot trace a `.css` change back to the stories it affects. Each
// story file therefore imports the CSS of every component folder it can render:
// its own folder, folders it imports directly, and everything those folders
// import in turn. This test keeps those lists complete as stories are added and
// component dependencies change. Rule documented in
// .github/instructions/stories-tests.instructions.md.

const componentsDir = import.meta.dirname;

const importPattern = /(?:\bfrom\s+|\bimport\s+)'(\.{1,2}\/[^']+)'/g;

const isSourceFile = (file: string) =>
  /\.tsx?$/.test(file) && !/\.(stories|test|figma)\.tsx?$/.test(file);

const readImports = (file: string) =>
  [...readFileSync(file, 'utf8').matchAll(importPattern)].map((match) =>
    path.resolve(path.dirname(file), match[1]),
  );

const componentFolders = readdirSync(componentsDir).filter((entry) =>
  statSync(path.join(componentsDir, entry)).isDirectory(),
);

// Maps a resolved import (`../button`, `../button/Button`) to its component
// folder; anything outside components/<folder>/ (e.g. tests/utils) is ignored.
const folderOf = (absolutePath: string): string | undefined => {
  const [folder] = path.relative(componentsDir, absolutePath).split(path.sep);
  return componentFolders.includes(folder) ? folder : undefined;
};

const cssFilesByFolder = new Map(
  componentFolders.map((folder) => [
    folder,
    readdirSync(path.join(componentsDir, folder))
      .filter((file) => file.endsWith('.css'))
      .map((file) => path.join(componentsDir, folder, file)),
  ]),
);

const folderDependencies = new Map(
  componentFolders.map((folder) => {
    const deps = new Set<string>();
    for (const file of readdirSync(path.join(componentsDir, folder))) {
      if (!isSourceFile(file)) continue;
      for (const target of readImports(
        path.join(componentsDir, folder, file),
      )) {
        const targetFolder = folderOf(target);
        if (targetFolder && targetFolder !== folder) deps.add(targetFolder);
      }
    }
    return [folder, deps];
  }),
);

const reachableFolders = (start: Iterable<string>) => {
  const seen = new Set<string>();
  const queue = [...start];
  while (queue.length > 0) {
    const folder = queue.pop()!;
    if (seen.has(folder)) continue;
    seen.add(folder);
    queue.push(...(folderDependencies.get(folder) ?? []));
  }
  return seen;
};

const storyFiles = componentFolders.flatMap((folder) =>
  readdirSync(path.join(componentsDir, folder))
    .filter((file) => file.endsWith('.stories.tsx'))
    .map((file) => path.join(componentsDir, folder, file)),
);

describe('Story CSS imports: Unit Test', () => {
  it.each(storyFiles.map((file) => [path.relative(componentsDir, file), file]))(
    '%s imports the CSS of every component it can render',
    (_name, storyFile) => {
      const imports = readImports(storyFile);
      const importedCss = new Set(
        imports.filter((target) => target.endsWith('.css')),
      );
      const startFolders = [
        folderOf(storyFile)!,
        ...imports
          .filter((target) => !target.endsWith('.css'))
          .map(folderOf)
          .filter((folder): folder is string => folder !== undefined),
      ];

      const missing = [...reachableFolders(startFolders)]
        .flatMap((folder) => cssFilesByFolder.get(folder) ?? [])
        .filter((cssFile) => !importedCss.has(cssFile))
        .map((cssFile) => path.relative(path.dirname(storyFile), cssFile))
        .map((relative) =>
          relative.startsWith('.') ? relative : `./${relative}`,
        )
        .sort();

      expect(missing).toEqual([]);
    },
  );
});
