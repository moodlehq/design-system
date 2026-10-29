/**
 * Generates per-component agent guidance from ZeroHeight.
 *
 *   npm run build-guidance            Fetch public ZeroHeight pages and write
 *                                     docs/guidance/** and llms.txt (committed).
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
  FOUNDATIONS,
  builtFrom,
  chooseGuidance,
  compactGallery,
  extractAccessibility,
  readProps,
  readTokenNames,
  renderBuiltFrom,
  renderProps,
  renderTokenTable,
} from './lib/guidance-extras';
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

/** ZeroHeight links type declarations at the latest release; pin them to this version. */
const UNPKG_LATEST = `https://unpkg.com/${PACKAGE_NAME}/`;

/** Versioned link to the DTCG token source, which the package does not ship. */
const DTCG_URL = (version: string): string =>
  `https://raw.githubusercontent.com/moodlehq/design-system/design-system-v${version}/tokens/dtcg/Defaultmode_Light.tokens.json`;

/** Marks every generated Markdown file so nobody hand-edits it. */
const GENERATED_NOTE =
  '<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->';

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

/** Collects pages under one top-level group (default "Components"), ignoring other groups. */
export function collectComponentPages(
  pages: Tree,
  groupName = 'Components',
): PageRef[] {
  const group = (pages[groupName] ?? {}) as Tree;
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

/** Package directory a documented page ships in, or undefined if the package has none. */
export function packageSlugFor(name: string): string | undefined {
  const slug = slugFor(name);
  const target = PART_OF[slug] ?? slug;
  return shippedSlugs().has(target) ? target : undefined;
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

/** Collapses table padding and drops separator dash runs; padded tables bloat every page. */
export function compactTables(md: string): string {
  return md
    .split('\n')
    .map((l) => {
      if (!/^\s*\|.*\|\s*$/.test(l)) return l;
      return l
        .trim()
        .replace(/\|\s*(:?)-{3,}(:?)\s*(?=\|)/g, '| $1---$2 ')
        .replace(/[ \t]{2,}/g, ' ');
    })
    .join('\n');
}

/** Removes ZeroHeight-only markup that carries no meaning outside the site. */
function cleanBody(md: string): string {
  return compactTables(md)
    .replace(/\[([^\]]*)\]\(vscode-file:\/\/[^)]*\)/g, '$1')
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
  // Drop the component's own name first: "radio button" must not match Button.
  const text = line.replace(new RegExp(`\\b${self}s?\\b`, 'gi'), '');
  return names.filter(
    (n) =>
      n.toLowerCase() !== self.toLowerCase() &&
      !NAME_STOPWORDS.has(n) &&
      new RegExp(`\\b${n}s?\\b`, 'i').test(text),
  );
}

/** Look-alikes the page text can't reveal, keyed by component name (lower case). */
const EXTRA_LOOK_ALIKES: Record<string, string[]> = {
  'radio button': ['Checkbox', 'Choicebox'],
  checkbox: ['Radio button', 'Choicebox'],
  choicebox: ['Radio button', 'Checkbox'],
};

export interface ForAgents {
  must: string[];
  mustNot: string[];
  useInstead: string[];
  lookAlikes: string[];
}

/**
 * Derives look-alikes and the machine-readable rules from page content. This is a deterministic
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
  for (const b of bullets.filter(
    (x) => /^(don'?t|do not|never)\b/i.test(x) || /\binstead\b/i.test(x),
  )) {
    const alt = b.match(
      /^.*\buse (?:a |an |the )?([^.,;—]+?)(?: component)? instead/i,
    );
    if (alt) useInstead.add(alt[1].trim());
    for (const n of mentionedComponents(b, allNames, title)) lookAlikes.add(n);
  }
  for (const n of EXTRA_LOOK_ALIKES[title.toLowerCase()] ?? [])
    lookAlikes.add(n);
  return {
    must: must.slice(0, 6),
    mustNot: notUse.slice(0, 6),
    useInstead: [...useInstead],
    lookAlikes: [...lookAlikes],
  };
}

/** Dos and don'ts already live in Usage, so only the look-alikes are surfaced. */
function renderLookAlikes(f: ForAgents): string {
  if (!f.lookAlikes.length) return '';
  const instead = f.useInstead.length
    ? `\n\nUse instead: ${f.useInstead.join('; ')}.`
    : '';
  return `## Look-alikes\n\n${f.lookAlikes.join(' · ')}${instead}\n`;
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
  /** Machine-readable dos and don'ts, written as <slug>.rules.json. */
  rules: ForAgents;
}

/** Code-derived inputs for the "Built from" section; omitted in unit tests. */
export interface CodeContext {
  tokens: Map<string, string>;
  slugs: string[];
}

export function renderComponent(
  page: PageRef,
  raw: string,
  version: string,
  allNames: string[],
  code?: CodeContext,
): Rendered {
  const { meta, body } = parsePage(stripExpiringImages(raw));
  const name = meta.get('title') || page.name;
  const slug = slugFor(name);
  const status = meta.get('status') || 'Unknown';
  const url = meta.get('url') || page.url;
  const intro = meta.get('introduction') || '';
  const sections = splitSections(body);
  const rules = deriveForAgents(name, sections.get('Usage') ?? '', allNames);
  const lookAlikes = renderLookAlikes(rules);
  const target = PART_OF[slug] ?? slug;
  const accessibility = extractAccessibility(sections);
  const composition = code
    ? renderBuiltFrom(
        builtFrom(target, COMPONENTS_DIR, code.slugs, code.tokens),
      )
    : '';
  const props = code ? renderProps(readProps(target, COMPONENTS_DIR)) : '';
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
    GENERATED_NOTE,
    '',
    `# ${name}`,
    '',
    intro,
    '',
    lookAlikes,
    accessibility,
    props,
    composition,
    ...orderedSections(sections),
  ]
    .filter((l, i, a) => !(l === '' && a[i - 1] === ''))
    .join('\n')
    .trimEnd()
    .concat('\n')
    .replaceAll(UNPKG_LATEST, `${UNPKG_LATEST.slice(0, -1)}@${version}/`);
  return { name, slug, status, url, intro, markdown, rules };
}

export interface Foundation {
  file: string;
  title: string;
  markdown: string;
}

function renderFoundation(
  spec: (typeof FOUNDATIONS)[number],
  pages: Map<string, string>,
  version: string,
  tokens: Map<string, string>,
  slugs: string[],
): Foundation {
  const guidance = spec.pages
    .map((n) => pages.get(n))
    .filter((raw): raw is string => Boolean(raw))
    .map((raw) => {
      const { body } = parsePage(stripExpiringImages(raw));
      return chooseGuidance(splitSections(body), (b) =>
        demoteHeadings(compactGallery(cleanBody(b))),
      );
    })
    .filter(Boolean)
    .join('\n\n');
  const markdown = [
    '---',
    `foundation: ${spec.title}`,
    `package: "${PACKAGE_NAME}@${version}"`,
    `source: https://${PUBLIC_HOST}/`,
    '---',
    '',
    GENERATED_NOTE,
    '',
    `# ${spec.title}`,
    '',
    guidance
      ? `How to choose, from ${PUBLIC_HOST}. Token values below the guidance come from code.`
      : 'Token values come from code.',
    '',
    guidance,
    '',
    renderTokenTable(tokens, spec.prefixes, slugs),
  ]
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd()
    .concat('\n');
  return { file: spec.file, title: spec.title, markdown };
}

function renderIndex(
  shipped: Rendered[],
  missing: Rendered[],
  foundations: Foundation[] = [],
): string {
  const row = (r: Rendered): string =>
    `- [${r.name}](components/${r.slug}.md) · ${r.status}${r.intro ? ` · ${r.intro}` : ''}`;
  return [
    GENERATED_NOTE,
    '',
    '# MDS guidance index',
    '',
    'One page per shipped component. Check `status` and `package` in each page before trusting it.',
    '',
    '## Components',
    '',
    ...shipped.map(row),
    '',
    '## Foundations',
    '',
    ...foundations.map((f) => `- [${f.title}](foundations/${f.file})`),
    '',
    '## Documented but not in this package version',
    '',
    ...missing.map((r) => `- ${r.name} · ${r.status}`),
    '',
  ].join('\n');
}

function renderLlms(
  shipped: Rendered[],
  version: string,
  foundations: Foundation[] = [],
): string {
  const cdn = `https://cdn.jsdelivr.net/npm/${PACKAGE_NAME}@${version}`;
  return [
    '# Moodle Design System',
    '',
    `> React components and design tokens for Moodle. Package: ${PACKAGE_NAME}@${version}.`,
    '',
    'Read the per-component guidance before choosing a component. Each component page lists its props and allowed values, generated from the TypeScript types.',
    '',
    '## Guidance',
    '',
    `- [Index](${cdn}/dist/guidance/index.md): one line per page with status`,
    ...shipped.map(
      (r) => `- [${r.name}](${cdn}/dist/guidance/components/${r.slug}.md)`,
    ),
    '',
    '## Foundations',
    '',
    ...foundations.map(
      (f) => `- [${f.title}](${cdn}/dist/guidance/foundations/${f.file})`,
    ),
    '',
    '## Optional',
    '',
    `- [Design tokens (DTCG)](${DTCG_URL(version)}): token source, read-only`,
    `- [Full documentation](${cdn}/llms-full.txt): every public page in one file, large`,
    `- [Design guidelines](https://${PUBLIC_HOST}/)`,
    '',
  ].join('\n');
}

/** Short, static entry point for agents working in this repo (written to AGENTS.md). */
export function renderAgents(): string {
  return [
    '<!-- Generated by npm run build-guidance. Do not edit. -->',
    '',
    '# AGENTS.md',
    '',
    'Moodle Design System (`@moodlehq/design-system`): React components and design tokens for Moodle.',
    '',
    '## Read first',
    '',
    '- [llms.txt](llms.txt): short map, one line per component.',
    "- `docs/guidance/components/<slug>.md`: guidance per component (use, don't use, look-alikes). Don't invent components that have no page, such as Toast or Tabs. Generated from ZeroHeight, never hand-edit.",
    '- [.github/copilot-instructions.md](.github/copilot-instructions.md): setup, commands, commit conventions, guardrails.',
    '',
    '## Source of truth',
    '',
    '- Design intent: ZeroHeight (https://design.moodle.com/, JS-rendered, so use the guidance files).',
    '- Props and types: the code and its `.d.ts`.',
    '- Tokens: `tokens/`. Read-only, generated from ZeroHeight.',
    '',
    '## Rules',
    '',
    "- Check a guidance page's `status` and `package` version before using it.",
    "- Don't edit generated files: `AGENTS.md`, `docs/guidance/**`, `llms.txt`, `llms-full.txt`, `tokens/**`.",
    "- Don't change the version in `package.json`.",
    "- Layout for Radio, Checkbox and NavPill groups is supplied by the consumer. Don't invent wrappers.",
    '',
  ].join('\n');
}

async function loadPages(fixtures: string | undefined): Promise<{
  pages: PageRef[];
  foundationPages: PageRef[];
  read: (p: PageRef) => Promise<string>;
}> {
  if (fixtures) {
    const tree = JSON.parse(
      readFileSync(join(fixtures, 'tree.json'), 'utf-8'),
    ) as { pages?: Tree } & Tree;
    return {
      pages: collectComponentPages(tree.pages ?? tree),
      foundationPages: collectComponentPages(tree.pages ?? tree, 'Foundation'),
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
    foundationPages: collectComponentPages(data.pages ?? data, 'Foundation'),
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

/** Component directories the package exports (private `_` dirs and assets excluded). */
function exportedSlugs(): Set<string> {
  const skip = new Set(['assets']);
  return new Set([...shippedSlugs()].filter((s) => !skip.has(s)));
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.includes('--dist')) return copyToDist();

  const fIdx = args.indexOf('--fixtures');
  const fixtures = fIdx >= 0 ? resolve(args[fIdx + 1]) : undefined;
  const version = (
    JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8')) as {
      version: string;
    }
  ).version;
  const shipped = shippedSlugs();
  const slugs = [...exportedSlugs()];
  const tokens = readTokenNames(join(ROOT, 'tokens', 'css'));
  const code: CodeContext = { tokens, slugs };

  const { pages, foundationPages, read } = await loadPages(fixtures);
  const allNames = pages.map((p) => p.name);
  const rendered: Rendered[] = [];
  for (const page of pages) {
    console.log(`  ${page.name} (${page.id})`);
    const raw = await read(page);
    if (!parsePage(raw).body) {
      console.warn(`    skipped (no content): ${page.name}`);
      continue;
    }
    rendered.push(renderComponent(page, raw, version, allNames, code));
  }
  const foundationRaw = new Map<string, string>();
  for (const page of foundationPages) {
    console.log(`  Foundation: ${page.name} (${page.id})`);
    foundationRaw.set(page.name, await read(page));
  }
  const foundations = FOUNDATIONS.map((spec) =>
    renderFoundation(spec, foundationRaw, version, tokens, slugs),
  );

  const isShipped = (r: Rendered): boolean =>
    shipped.has(PART_OF[r.slug] ?? r.slug);
  const have = rendered.filter(isShipped);
  const missing = rendered.filter((r) => !isShipped(r));

  rmSync(GUIDANCE_DIR, { recursive: true, force: true });
  mkdirSync(join(GUIDANCE_DIR, 'components'), { recursive: true });
  mkdirSync(join(GUIDANCE_DIR, 'foundations'), { recursive: true });
  for (const r of have) {
    writeFileSync(join(GUIDANCE_DIR, 'components', `${r.slug}.md`), r.markdown);
    writeFileSync(
      join(GUIDANCE_DIR, 'components', `${r.slug}.rules.json`),
      `${JSON.stringify({ component: r.name, slug: r.slug, ...r.rules }, null, 2)}\n`,
    );
  }
  for (const f of foundations) {
    writeFileSync(join(GUIDANCE_DIR, 'foundations', f.file), f.markdown);
  }
  writeFileSync(
    join(GUIDANCE_DIR, 'index.md'),
    renderIndex(have, missing, foundations),
  );
  writeFileSync(LLMS_PATH, renderLlms(have, version, foundations));
  writeFileSync(join(ROOT, 'AGENTS.md'), renderAgents());
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
