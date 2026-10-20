/**
 * CI gate for Code Connect. Fails when a component is missing its Code
 * Connect file, story or ZeroHeight guidance page, or when
 * `figma connect parse` can't parse the mappings.
 *
 *   npm run check-code-connect
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve('.');
const COMPONENTS_DIR = join(ROOT, 'components');

const pascal = (slug: string): string =>
  slug
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');

export function missingFiles(slugs: string[], root = ROOT): string[] {
  const problems: string[] = [];
  for (const slug of slugs) {
    const name = pascal(slug);
    const dir = join(root, 'components', slug);
    for (const f of [`${name}.figma.tsx`, `${name}.stories.tsx`]) {
      if (!existsSync(join(dir, f)))
        problems.push(`components/${slug}/${f} is missing`);
    }
    if (!existsSync(join(root, 'docs', 'guidance', 'components', `${slug}.md`)))
      problems.push(
        `no guidance page for "${slug}" (docs/guidance/components)`,
      );
  }
  return problems;
}

function main(): void {
  const slugs = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(
      (d) => d.isDirectory() && !d.name.startsWith('_') && d.name !== 'assets',
    )
    .map((d) => d.name);

  const problems = missingFiles(slugs);
  try {
    execFileSync('npx', ['figma', 'connect', 'parse', '--skip-update-check'], {
      stdio: ['ignore', 'ignore', 'pipe'],
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (err) {
    const stderr = (err as { stderr?: Buffer }).stderr?.toString() ?? '';
    problems.push(`figma connect parse failed:\n${stderr.slice(-800)}`);
  }

  if (problems.length) {
    console.error(`Code Connect check failed:\n- ${problems.join('\n- ')}`);
    process.exit(1);
  }
  console.log(`Code Connect check passed (${slugs.length} components).`);
}

main();
