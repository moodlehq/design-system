import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface ComponentIndexItem {
  name: string;
  slug: string;
  exportPath: string;
  implementationPath: string;
  storyPath?: string;
  testPath?: string;
  figmaPath?: string;
  cssPath?: string;
}

interface ComponentIndex {
  generatedAt: string;
  sourceDir: string;
  componentCount: number;
  components: ComponentIndexItem[];
}

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(SCRIPT_DIR, '..');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const OUTPUT_DIR = path.join(ROOT_DIR, 'dist');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'component-index.json');

const RESERVED_DIR_NAMES = new Set(['assets']);

function toPosix(filePath: string): string {
  return filePath.split(path.sep).join('/');
}

function titleCaseFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function findFirstExisting(filePaths: string[]): string | undefined {
  return filePaths.find((filePath) => fs.existsSync(filePath));
}

function collectComponent(slug: string): ComponentIndexItem | null {
  const dir = path.join(COMPONENTS_DIR, slug);
  if (!fs.statSync(dir).isDirectory()) {
    return null;
  }

  const componentName = titleCaseFromSlug(slug);
  const implementation = findFirstExisting([
    path.join(dir, `${componentName}.tsx`),
    path.join(dir, 'index.tsx'),
  ]);

  if (!implementation) {
    return null;
  }

  const story = findFirstExisting([
    path.join(dir, `${componentName}.stories.tsx`),
  ]);
  const test = findFirstExisting([path.join(dir, `${componentName}.test.tsx`)]);
  const figma = findFirstExisting([
    path.join(dir, `${componentName}.figma.tsx`),
  ]);
  const css = findFirstExisting([path.join(dir, `${slug}.css`)]);

  const rel = (fullPath: string) => toPosix(path.relative(ROOT_DIR, fullPath));

  return {
    name: componentName,
    slug,
    exportPath: `@moodlehq/design-system/components/${slug}`,
    implementationPath: rel(implementation),
    storyPath: story ? rel(story) : undefined,
    testPath: test ? rel(test) : undefined,
    figmaPath: figma ? rel(figma) : undefined,
    cssPath: css ? rel(css) : undefined,
  };
}

function buildIndex(): ComponentIndex {
  const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });

  const components = entries
    .filter(
      (entry) => entry.isDirectory() && !RESERVED_DIR_NAMES.has(entry.name),
    )
    .map((entry) => collectComponent(entry.name))
    .filter((value): value is ComponentIndexItem => value !== null)
    .sort((a, b) => a.slug.localeCompare(b.slug));

  return {
    generatedAt: new Date().toISOString(),
    sourceDir: toPosix(path.relative(ROOT_DIR, COMPONENTS_DIR)),
    componentCount: components.length,
    components,
  };
}

function main(): void {
  const index = buildIndex();
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(index, null, 2)}\n`, 'utf-8');
  console.log(
    `Generated ${toPosix(path.relative(ROOT_DIR, OUTPUT_FILE))} (${index.componentCount} components)`,
  );
}

main();
