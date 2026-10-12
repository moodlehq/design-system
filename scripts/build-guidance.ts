/**
 * Generates per-component agent guidance from ZeroHeight.
 *
 *   npm run build-guidance            Fetch public ZeroHeight pages and write
 *                                     docs/guidance/** and llms.txt (committed).
 *   npm run build-guidance -- --check Offline CI gate: every shipped component
 *                                     has a usable, placeholder-free page.
 *   npm run build-guidance -- --dist  Copy the committed docs/guidance into
 *                                     dist/guidance (no network; runs in `build`).
 *   npm run build-guidance -- --fixtures <dir>
 *                                     Read pages from <dir>/tree.json and
 *                                     <dir>/<pageId>.md instead of the MCP.
 *
 * ZeroHeight stays the authoring source. Nothing generated here is hand-edited.
 * Requires ZEROHEIGHT_MCP_URL unless --fixtures or --dist is used.
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import {
  demoteHeadings,
  parsePage,
  stripExpiringImages,
} from './lib/zeroheight-format';

const STYLEGUIDE_ID = 131542;
const PUBLIC_HOST = 'design.moodle.com';
const ROOT = resolve('.');
const COMPONENTS_DIR = join(ROOT, 'components');
const GUIDANCE_DIR = join(ROOT, 'docs', 'guidance');
const DIST_GUIDANCE_DIR = join(ROOT, 'dist', 'guidance');
const LLMS_PATH = join(ROOT, 'llms.txt');
const PACKAGE_NAME = '@moodlehq/design-system';

/** ZeroHeight page names whose package slug is not the kebab-cased name. */
const SLUG_ALIASES: Record<string, string> = {
  'text-area': 'textarea',
  'radio-button': 'radio',
  'activity-icons': 'activity-icon',
};

/** Documented pages that ship as part of another component's package directory. */
const PART_OF: Record<string, string> = { password: 'input', search: 'input' };

/** Section order for generated pages; anything else follows in source order. */
const SECTION_ORDER = ['Usage', 'Design', 'Code'];

export interface PageRef {
  id: number;
  name: string;
  url: string;
}
type Tree = Record<string, unknown>;

function isRef(v: unknown): v is { id: number; url: string } {
  return (
    typeof v === 'object' &&
    v !== null &&
    typeof (v as { id?: unknown }).id === 'number'
  );
}

/** Collects pages under the top-level "Components" group, ignoring other groups. */
export function collectComponentPages(pages: Tree): PageRef[] {
  const group = (pages['Components'] ?? {}) as Tree;
  const out: PageRef[] = [];
  const walk = (node: Tree): void => {
    for (const [name, value] of Object.entries(node)) {
      if (isRef(value)) {
        let host = '';
        try {
          host = new URL(value.url).hostname;
        } catch {
          /* non-URL entries are skipped below */
        }
        if (host === PUBLIC_HOST)
          out.push({ id: value.id, name, url: value.url });
      } else if (value && typeof value === 'object') {
        walk(value as Tree);
      }
    }
  };
  walk(group);
  return out;
}

export function slugFor(name: string): string {
  const kebab = name.trim().toLowerCase().replace(/\s+/g, '-');
  return SLUG_ALIASES[kebab] ?? kebab;
}

function shippedSlugs(): Set<string> {
  return new Set(
    readdirSync(COMPONENTS_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
      .map((d) => d.name),
  );
}

/** Splits a page body into its top-level (H1) sections, keyed by heading. */
export function splitSections(body: string): Map<string, string> {
  const sections = new Map<string, string>();
  let current: string | null = null;
  let inFence = false;
  for (const line of body.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const h = !inFence && line.match(/^#\s+(.+)$/);
    if (h) {
      current = h[1].trim();
      sections.set(current, '');
    } else if (current) {
      sections.set(current, `${sections.get(current)}${line}\n`);
    }
  }
  return sections;
}

/** Removes ZeroHeight-only markup that carries no meaning outside the site. */
function cleanBody(md: string): string {
  return md
    .replace(/<\/?(callout|shortcut_tiles?)[^>]*>/g, '')
    .replace(/^\*\*GitHub: .*\*\*$/gm, '')
    .replace(/^#{1,6}\s+GitHub\s*$/gm, '')
    .replace(/^\s*---\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const NAME_STOPWORDS = new Set(['The', 'When', 'Use', 'Don', 'If', 'A', 'An']);

/** Component names (from the documented set) mentioned in a line of text. */
function mentionedComponents(
  line: string,
  names: string[],
  self: string,
): string[] {
  return names.filter(
    (n) =>
      n.toLowerCase() !== self.toLowerCase() &&
      !NAME_STOPWORDS.has(n) &&
      new RegExp(`\\b${n}s?\\b`, 'i').test(line),
  );
}

export interface ForAgents {
  must: string[];
  mustNot: string[];
  useInstead: string[];
  lookAlikes: string[];
}

/**
 * Derives the "For agents" block from page content. This is a deterministic
 * heuristic over "When not to use" and guideline bullets, not authored data:
 * the MSE disambiguation tables are the intended source once published.
 */
export function deriveForAgents(
  title: string,
  usage: string,
  allNames: string[],
): ForAgents {
  const bullets = usage
    .split('\n')
    .map((l) => l.match(/^\s*[*-]\s+(.*\S)\s*$/)?.[1])
    .filter((b): b is string => Boolean(b));

  const notUse = bullets.filter((b) => /^(don'?t|do not|never)\b/i.test(b));
  const must = bullets
    .filter((b) => /^(always|must)\b/i.test(b))
    .map((b) => b.replace(/:$/, ''));

  const useInstead = new Set<string>();
  const lookAlikes = new Set<string>();
  for (const b of notUse) {
    const alt = b.match(
      /^.*\buse (?:a |an |the )?([^.,;—]+?)(?: component)? instead/i,
    );
    if (alt) useInstead.add(alt[1].trim());
    for (const n of mentionedComponents(b, allNames, title)) lookAlikes.add(n);
  }
  return {
    must: must.slice(0, 6),
    mustNot: notUse.slice(0, 6),
    useInstead: [...useInstead],
    lookAlikes: [...lookAlikes],
  };
}

function list(label: string, items: string[]): string {
  if (!items.length) return '';
  return `- ${label}:\n${items.map((i) => `  - ${i}`).join('\n')}\n`;
}

function renderForAgents(f: ForAgents): string {
  const out = [
    list('Must', f.must),
    list('Must not', f.mustNot),
    f.useInstead.length ? `- Use instead: ${f.useInstead.join('; ')}\n` : '',
    f.lookAlikes.length ? `- Look-alikes: ${f.lookAlikes.join(' · ')}\n` : '',
  ].join('');
  return out ? `## For agents\n\n${out}` : '';
}

function orderedSections(sections: Map<string, string>): string[] {
  const keys = [...sections.keys()];
  const first = SECTION_ORDER.filter((k) => sections.has(k));
  const rest = keys.filter((k) => !SECTION_ORDER.includes(k));
  return [...first, ...rest].map(
    (k) =>
      `## ${k}\n\n${demoteHeadings(cleanBody(sections.get(k) ?? '')).trim()}\n`,
  );
}

export interface Rendered {
  name: string;
  slug: string;
  status: string;
  url: string;
  intro: string;
  markdown: string;
}

export function renderComponent(
  page: PageRef,
  raw: string,
  version: string,
  allNames: string[],
): Rendered {
  const { meta, body } = parsePage(stripExpiringImages(raw));
  const name = meta.get('title') || page.name;
  const slug = slugFor(name);
  const status = meta.get('status') || 'Unknown';
  const url = meta.get('url') || page.url;
  const intro = meta.get('introduction') || '';
  const sections = splitSections(body);
  const forAgents = renderForAgents(
    deriveForAgents(name, sections.get('Usage') ?? '', allNames),
  );
  const target = PART_OF[slug] ?? slug;
  const markdown = [
    '---',
    `component: ${name}`,
    `slug: ${target}`,
    `package: "${PACKAGE_NAME}@${version}"`,
    `status: ${status}`,
    `source: ${url}`,
    `import: ${PACKAGE_NAME}/components/${target}`,
    `types: dist/components/${target}/index.d.ts`,
    '---',
    '',
    `# ${name}`,
    '',
    intro,
    '',
    forAgents,
    ...orderedSections(sections),
  ]
    .filter((l, i, a) => !(l === '' && a[i - 1] === ''))
    .join('\n')
    .trimEnd()
    .concat('\n');
  return { name, slug, status, url, intro, markdown };
}

function renderIndex(shipped: Rendered[], missing: Rendered[]): string {
  const row = (r: Rendered): string =>
    `- [${r.name}](components/${r.slug}.md) · ${r.status}${r.intro ? ` · ${r.intro}` : ''}`;
  return [
    '# MDS guidance index',
    '',
    'One page per shipped component. Check `status` and `package` in each page before trusting it.',
    '',
    '## Components',
    '',
    ...shipped.map(row),
    '',
    '## Documented but not available in this package version',
    '',
    'See [not-available.md](not-available.md).',
    ...missing.map((r) => `- ${r.name} · ${r.status}`),
    '',
  ].join('\n');
}

function renderNotAvailable(missing: Rendered[], version: string): string {
  return [
    '# Not available',
    '',
    `Documented on ${PUBLIC_HOST} but not shipped in ${PACKAGE_NAME}@${version}. Do not import these; say so, or use an available alternative.`,
    '',
    ...missing.map(
      (r) => `- **${r.name}** · ${r.status}${r.intro ? ` · ${r.intro}` : ''}`,
    ),
    '',
    'Components with no documentation at all (for example Toast or Tabs) are also not available.',
    '',
  ].join('\n');
}

function renderLlms(shipped: Rendered[], version: string): string {
  return [
    '# Moodle Design System',
    '',
    `> React components and design tokens for Moodle. Package: ${PACKAGE_NAME}@${version}.`,
    '',
    'Read the per-component guidance before choosing a component. Props come from the TypeScript types in `dist/`.',
    '',
    '## Guidance',
    '',
    `- [Index](https://cdn.jsdelivr.net/npm/${PACKAGE_NAME}@${version}/dist/guidance/index.md): one line per component with status`,
    `- [Not available](https://cdn.jsdelivr.net/npm/${PACKAGE_NAME}@${version}/dist/guidance/not-available.md): documented but unshipped components`,
    ...shipped.map(
      (r) =>
        `- [${r.name}](https://cdn.jsdelivr.net/npm/${PACKAGE_NAME}@${version}/dist/guidance/components/${r.slug}.md)`,
    ),
    '',
    '## Optional',
    '',
    `- [Design guidelines](https://${PUBLIC_HOST}/)`,
    '',
  ].join('\n');
}

async function loadPages(
  fixtures: string | undefined,
): Promise<{ pages: PageRef[]; read: (p: PageRef) => Promise<string> }> {
  if (fixtures) {
    const tree = JSON.parse(
      readFileSync(join(fixtures, 'tree.json'), 'utf-8'),
    ) as { pages?: Tree } & Tree;
    return {
      pages: collectComponentPages(tree.pages ?? tree),
      read: async (p) => readFileSync(join(fixtures, `${p.id}.md`), 'utf-8'),
    };
  }
  const url = process.env.ZEROHEIGHT_MCP_URL;
  if (!url) throw new Error('ZEROHEIGHT_MCP_URL is required.');
  const client = new Client({ name: 'mds-guidance-builder', version: '1.0.0' });
  await client.connect(new StreamableHTTPClientTransport(new URL(url)));
  const text = async (name: string, args: Record<string, unknown>) => {
    const r = await client.callTool({ name, arguments: args });
    return (r.content as Array<{ type: string; text?: string }>)
      .filter((c) => c.type === 'text')
      .map((c) => c.text ?? '')
      .join('');
  };
  // Endpoints bound to one styleguide reject a styleguideId argument, so try no
  // arguments first and fall back to the id for unscoped token URLs.
  const parseTree = (t: string): ({ pages?: Tree } & Tree) | null => {
    try {
      return JSON.parse(t) as { pages?: Tree } & Tree;
    } catch {
      return null;
    }
  };
  let bare = await text('list-pages', {});
  let data = parseTree(bare);
  // The ZeroHeight API intermittently returns "unknown error"; back off and retry.
  for (let attempt = 1; !data && attempt <= 3; attempt++) {
    console.warn(`list-pages retry ${attempt}: ${bare.slice(0, 120)}`);
    await new Promise((r) => setTimeout(r, 5000 * attempt));
    bare = await text('list-pages', {});
    data = parseTree(bare);
  }
  if (!data) {
    const withId = await text('list-pages', { styleguideId: STYLEGUIDE_ID });
    data = parseTree(withId);
    if (!data) {
      throw new Error(
        `list-pages failed: ${bare.slice(0, 120)} / ${withId.slice(0, 120)}`,
      );
    }
  }
  let first = true;
  return {
    pages: collectComponentPages(data.pages ?? data),
    read: async (p) => {
      // ZeroHeight allows 30 requests per 30 s.
      // A valid page starts with YAML front matter; anything else is an error
      // message (rate limit, auth) that must not be written out as content.
      let last = '';
      for (let attempt = 0; attempt < 4; attempt++) {
        if (!first || attempt > 0) {
          await new Promise((r) => setTimeout(r, 1100 * (attempt + 1)));
        }
        first = false;
        last = await text('get-page', { pageId: p.id });
        if (last.startsWith('---')) return last;
        console.warn(`    retry ${attempt + 1}: ${last.slice(0, 120)}`);
      }
      throw new Error(
        `get-page ${p.id} (${p.name}) failed: ${last.slice(0, 200)}`,
      );
    },
  };
}

function copyToDist(): void {
  if (!existsSync(GUIDANCE_DIR)) {
    // Not yet generated: don't break the package build. A CI gate can make this fatal.
    console.warn(
      'docs/guidance not found; skipping. Run `npm run build-guidance` and commit the result.',
    );
    return;
  }
  rmSync(DIST_GUIDANCE_DIR, { recursive: true, force: true });
  cpSync(GUIDANCE_DIR, DIST_GUIDANCE_DIR, { recursive: true });
  console.log(`Copied docs/guidance → dist/guidance`);
}

/**
 * Offline gate for CI: every shipped component has a usable guidance page and
 * the generated files carry no unresolved ZeroHeight placeholders.
 */
export function checkGenerated(): string[] {
  const problems: string[] = [];
  if (!existsSync(LLMS_PATH)) problems.push('llms.txt is missing');
  for (const slug of shippedSlugs()) {
    const file = join(GUIDANCE_DIR, 'components', `${slug}.md`);
    if (!existsSync(file)) {
      problems.push(`no guidance page for component "${slug}"`);
      continue;
    }
    const md = readFileSync(file, 'utf-8');
    if (/^status: Unknown$/m.test(md))
      problems.push(`${slug}: status is Unknown`);
    if (!md.includes('\n## Usage')) problems.push(`${slug}: no Usage section`);
    if (md.includes('zeroheight://'))
      problems.push(`${slug}: unresolved zeroheight:// placeholder`);
  }
  return problems;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.includes('--dist')) return copyToDist();
  if (args.includes('--check')) {
    const problems = checkGenerated();
    if (problems.length) {
      console.error(`Guidance check failed:\n- ${problems.join('\n- ')}`);
      process.exit(1);
    }
    console.log('Guidance check passed.');
    return;
  }

  const fIdx = args.indexOf('--fixtures');
  const fixtures = fIdx >= 0 ? resolve(args[fIdx + 1]) : undefined;
  const version = (
    JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8')) as {
      version: string;
    }
  ).version;
  const shipped = shippedSlugs();

  const { pages, read } = await loadPages(fixtures);
  const allNames = pages.map((p) => p.name);
  const rendered: Rendered[] = [];
  for (const page of pages) {
    console.log(`  ${page.name} (${page.id})`);
    const raw = await read(page);
    if (!parsePage(raw).body) {
      console.warn(`    skipped (no content): ${page.name}`);
      continue;
    }
    rendered.push(renderComponent(page, raw, version, allNames));
  }

  const isShipped = (r: Rendered): boolean =>
    shipped.has(PART_OF[r.slug] ?? r.slug);
  const have = rendered.filter(isShipped);
  const missing = rendered.filter((r) => !isShipped(r));

  rmSync(GUIDANCE_DIR, { recursive: true, force: true });
  mkdirSync(join(GUIDANCE_DIR, 'components'), { recursive: true });
  for (const r of have) {
    writeFileSync(join(GUIDANCE_DIR, 'components', `${r.slug}.md`), r.markdown);
  }
  writeFileSync(join(GUIDANCE_DIR, 'index.md'), renderIndex(have, missing));
  writeFileSync(
    join(GUIDANCE_DIR, 'not-available.md'),
    renderNotAvailable(missing, version),
  );
  writeFileSync(LLMS_PATH, renderLlms(have, version));
  console.log(
    `\nWrote ${have.length} component page(s); ${missing.length} documented but not shipped.`,
  );
}

// Only run when executed directly, so tests can import the helpers.
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  main().catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  });
}
