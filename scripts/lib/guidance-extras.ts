/**
 * Guidance sections that build-guidance adds beyond the ZeroHeight page body:
 * structured accessibility, "Built from" (from code) and foundations pages.
 * Pure functions where possible so they can be unit tested without the network.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';

const NOT_DOCUMENTED = 'Not documented';

/**
 * Collapses ZeroHeight icon-gallery tiles (`<design>` blocks holding an image
 * placeholder and a name) into a plain list of icon names.
 */
export function compactGallery(md: string): string {
  return md
    .replace(
      /<design[^>]*>\s*_\[image: [^\]]*\]_\s*\*\*([^*\n]+)\*\*\s*<\/design>/g,
      '- $1',
    )
    .replace(/<\/?design[^>]*>/g, '')
    .replace(/(- [^\n]+)\n+(?=- )/g, '$1\n')
    .replace(/\n{3,}/g, '\n\n');
}

/** Returns the body of the first heading (any level) in `md` whose text matches `re`. */
export function sectionByHeading(md: string, re: RegExp): string | undefined {
  const lines = md.split('\n');
  let inFence = false;
  let start = -1;
  let level = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) inFence = !inFence;
    const h = !inFence && lines[i].match(/^(#{1,6})\s+(.+?)\s*$/);
    if (!h) continue;
    if (start >= 0 && h[1].length <= level) {
      return lines.slice(start, i).join('\n').trim();
    }
    if (start < 0 && re.test(h[2])) {
      start = i + 1;
      level = h[1].length;
    }
  }
  return start >= 0 ? lines.slice(start).join('\n').trim() : undefined;
}

const clean = (s: string): string =>
  s.replace(/\*\*/g, '').replace(/\s+/g, ' ').replace(/:\s*$/, '').trim();

/** Rows of a Markdown table as arrays of cells, without the header and separator. */
function tableRows(md: string): string[][] {
  return md
    .split('\n')
    .filter((l) => /^\s*\|/.test(l) && !/^\s*\|[\s:|-]+\|\s*$/.test(l))
    .slice(1)
    .map((l) =>
      l
        .trim()
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((c) => clean(c)),
    );
}

/** Flattened bullet text (nested bullets are folded into their parent). */
function bullets(md: string): string[] {
  const out: string[] = [];
  for (const line of md.split('\n')) {
    const m = line.match(/^(\s*)[*-]\s+(.*\S)\s*$/);
    if (!m) continue;
    if (m[1].length === 0 || out.length === 0) out.push(clean(m[2]));
    else out[out.length - 1] += ` ${clean(m[2])}`;
  }
  return out;
}

const field = (label: string, items: string[]): string =>
  items.length
    ? `- ${label}:\n${items.map((i) => `  - ${i}`).join('\n')}\n`
    : `- ${label}: ${NOT_DOCUMENTED}\n`;

/**
 * Builds fixed-field accessibility notes (keyboard, role, announced, focus) from
 * a page's "Accessibility implementation" content. Anything the page doesn't
 * document is stated as such rather than guessed.
 */
export function extractAccessibility(sections: Map<string, string>): string {
  const all = [...sections.values()].join('\n');
  const impl =
    sectionByHeading(all, /^accessibility implementation$/i) ??
    sectionByHeading(all, /^accessibility$/i);
  if (!impl) return '';

  const keyboardMd = sectionByHeading(impl, /^keyboard/i);
  const ariaMd = sectionByHeading(impl, /^aria/i);
  const announceMd = sectionByHeading(impl, /announce/i);
  const focusMd = sectionByHeading(impl, /^focus/i);

  const keyboard = keyboardMd
    ? tableRows(keyboardMd)
        .filter((r) => r.length >= 2)
        .map((r) => `${r[0]}: ${r[1]}`)
        .concat(keyboardMd.includes('|') ? [] : bullets(keyboardMd))
    : [];

  const roleBullets = ariaMd
    ? bullets(ariaMd).filter((b) => /^role\b/i.test(b))
    : [];
  const role = roleBullets.map((b) => b.replace(/^role:?\s*/i, ''));
  const required = ariaMd
    ? bullets(ariaMd)
        .filter((b) => /^required attributes/i.test(b))
        .map((b) => b.replace(/^required attributes:?\s*/i, ''))
    : [];

  const announced = announceMd ? bullets(announceMd) : [];

  // Keyboard rows that mention focus only stand in when the page has no Focus notes.
  const focus = focusMd
    ? bullets(focusMd)
    : keyboardMd
      ? tableRows(keyboardMd)
          .filter((r) => /focus/i.test(`${r[1] ?? ''}`))
          .map((r) => `${r[0]}: ${r[1]}`)
      : [];
  const keyboardSet = new Set(keyboard);

  return [
    '## Accessibility\n\n',
    field('Keyboard', keyboard),
    field('Role', role),
    field('Required attributes', required),
    field('Announced', announced),
    field(
      'Focus',
      [...new Set(focus)].filter((f) => !keyboardSet.has(f)),
    ),
  ]
    .join('')
    .trimEnd()
    .concat('\n');
}

/** `--mds-*` custom property names declared in the token CSS (values come from code). */
export function readTokenNames(tokensCssDir: string): Map<string, string> {
  const out = new Map<string, string>();
  if (!existsSync(tokensCssDir)) return out;
  for (const file of readdirSync(tokensCssDir).filter((f) =>
    f.endsWith('.css'),
  )) {
    const css = readFileSync(join(tokensCssDir, file), 'utf-8');
    for (const m of css.matchAll(/^\s*(--mds-[\w-]+):\s*([^;]+);/gm)) {
      out.set(m[1], m[2].trim());
    }
  }
  return out;
}

/** True for tokens named after a single component, which aren't generally reusable. */
export function isComponentSpecific(token: string, slugs: string[]): boolean {
  const name = token.replace(/^--mds-/, '');
  return slugs.some((slug) => {
    if (slug === 'link') return name.startsWith('link-');
    return (
      name.startsWith(`${slug}-`) ||
      name.includes(`-${slug}-`) ||
      name.endsWith(`-${slug}`)
    );
  });
}

export interface BuiltFrom {
  components: string[];
  tokens: string[];
}

/**
 * Derives composition from code: MDS components imported by the component's
 * source and the shared semantic tokens its CSS uses. Component-specific
 * tokens are left out on purpose.
 */
export function builtFrom(
  slug: string,
  componentsDir: string,
  allSlugs: string[],
  knownTokens: Map<string, string>,
): BuiltFrom {
  const dir = join(componentsDir, slug);
  const files = existsSync(dir) ? readdirSync(dir) : [];
  const source = files
    .filter(
      (f) => /\.tsx?$/.test(f) && !/\.(test|stories|figma)\.tsx?$/.test(f),
    )
    .map((f) => readFileSync(join(dir, f), 'utf-8'))
    .join('\n');
  const css = files
    .filter((f) => f.endsWith('.css'))
    .map((f) => readFileSync(join(dir, f), 'utf-8'))
    .join('\n');

  const components = new Set<string>();
  for (const m of source.matchAll(
    /from\s+['"]\.\.\/([\w-]+)(?:\/[\w-]+)?['"]/g,
  )) {
    if (allSlugs.includes(m[1]) && m[1] !== slug) components.add(m[1]);
  }
  const tokens = new Set<string>();
  for (const m of css.matchAll(/var\((--mds-[\w-]+)/g)) {
    if (
      knownTokens.has(m[1]) &&
      !isComponentSpecific(m[1], allSlugs) &&
      !/^--mds-(color|scale)-/.test(m[1])
    ) {
      tokens.add(m[1]);
    }
  }
  return { components: [...components].sort(), tokens: [...tokens].sort() };
}

export interface PropDoc {
  name: string;
  type: string;
  optional: boolean;
  default?: string;
  description: string;
  /** Exact values when the prop type is a union of string literals. */
  values?: string[];
}

export interface PropsDoc {
  name: string;
  props: PropDoc[];
}

function literalValues(node: ts.TypeNode): string[] | undefined {
  if (!ts.isUnionTypeNode(node)) return undefined;
  const values: string[] = [];
  for (const t of node.types) {
    if (ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal)) {
      values.push(t.literal.text);
    } else return undefined;
  }
  return values;
}

/**
 * Reads the own props of each `*Props` interface in a component's source with
 * the TypeScript compiler: type, optionality, default (from destructuring
 * defaults) and exact allowed values for string-literal unions, following one
 * level of type alias. Inherited HTML attributes are not listed.
 */
export function readProps(slug: string, componentsDir: string): PropsDoc[] {
  const dir = join(componentsDir, slug);
  if (!existsSync(dir)) return [];
  const out: PropsDoc[] = [];
  for (const file of readdirSync(dir).sort()) {
    if (!/\.tsx?$/.test(file) || /\.(test|stories|figma)\.tsx?$/.test(file)) {
      continue;
    }
    const sf = ts.createSourceFile(
      file,
      readFileSync(join(dir, file), 'utf-8'),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const aliases = new Map<string, string[]>();
    const defaults = new Map<string, string>();
    const visit = (n: ts.Node): void => {
      if (ts.isTypeAliasDeclaration(n)) {
        const v = literalValues(n.type);
        if (v) aliases.set(n.name.text, v);
      } else if (
        ts.isBindingElement(n) &&
        n.initializer &&
        ts.isIdentifier(n.name) &&
        !n.propertyName
      ) {
        if (!defaults.has(n.name.text)) {
          defaults.set(n.name.text, n.initializer.getText(sf));
        }
      }
      ts.forEachChild(n, visit);
    };
    visit(sf);

    sf.forEachChild((n) => {
      if (!ts.isInterfaceDeclaration(n) || !/Props$/.test(n.name.text)) return;
      const props: PropDoc[] = [];
      for (const m of n.members) {
        if (!ts.isPropertySignature(m) || !m.type || !m.name) continue;
        const name = m.name.getText(sf).replace(/^['"]|['"]$/g, '');
        const description = ts
          .getJSDocCommentsAndTags(m)
          .map((d) =>
            ts.isJSDoc(d) ? ts.getTextOfJSDocComment(d.comment) : '',
          )
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
        const alias = ts.isTypeReferenceNode(m.type)
          ? aliases.get(m.type.typeName.getText(sf))
          : undefined;
        const values = alias ?? literalValues(m.type);
        props.push({
          name,
          type: m.type.getText(sf).replace(/\s+/g, ' '),
          optional: !!m.questionToken,
          default: defaults.get(name),
          description,
          values,
        });
      }
      if (props.length) out.push({ name: n.name.text, props });
    });
  }
  return out;
}

const cell = (s: string): string => s.replace(/\|/g, '\\|');

export function renderProps(docs: PropsDoc[]): string {
  if (!docs.length) return '';
  const blocks = docs.map((d) => {
    const rows = d.props.map(
      (p) =>
        `| \`${p.name}\`${p.optional ? '' : ' (required)'} | \`${cell(p.type)}\` | ${
          p.default ? `\`${cell(p.default)}\`` : ''
        } | ${cell(p.description)} |`,
    );
    const allowed = d.props
      .filter((p) => p.values)
      .map(
        (p) =>
          `- \`${p.name}\`: ${(p.values ?? []).map((v) => `\`${v}\``).join(', ')}`,
      );
    return [
      `### ${d.name}`,
      '',
      '| Prop | Type | Default | Description |',
      '| --- | --- | --- | --- |',
      ...rows,
      ...(allowed.length ? ['', 'Allowed values:', '', ...allowed] : []),
    ].join('\n');
  });
  return [
    '## Props',
    '',
    'Generated from the component TypeScript types, not from ZeroHeight. Inherited HTML attributes are not listed.',
    '',
    blocks.join('\n\n'),
    '',
  ].join('\n');
}

export function renderBuiltFrom(b: BuiltFrom): string {
  if (!b.components.length && !b.tokens.length) return '';
  return [
    '## Built from',
    '',
    'Generated from the component source and CSS, not from ZeroHeight.',
    '',
    b.components.length
      ? `- MDS components: ${b.components.join(', ')}\n`
      : '- MDS components: none\n',
    b.tokens.length
      ? `- Semantic tokens: ${b.tokens.map((t) => `\`${t}\``).join(', ')}\n`
      : '',
  ]
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd()
    .concat('\n');
}

export interface FoundationSpec {
  file: string;
  title: string;
  /** ZeroHeight page names whose how-to-choose guidance feeds this file. */
  pages: string[];
  /** Token name prefixes (without --mds-) listed with values from code. */
  prefixes: string[];
}

export const FOUNDATIONS: FoundationSpec[] = [
  {
    file: 'tokens.md',
    title: 'Design tokens',
    pages: ['Styles', 'Borders', 'Elevation'],
    prefixes: ['border-radius', 'stroke-weight', 'offset', 'blur'],
  },
  {
    file: 'colour.md',
    title: 'Colour',
    pages: ['Colours'],
    prefixes: [
      'bg-surface',
      'bg-interactive',
      'bg-feedback',
      'text-',
      'border-default',
      'border-subtle',
      'border-interactive',
      'border-feedback',
      'focus',
    ],
  },
  {
    file: 'typography.md',
    title: 'Typography',
    pages: ['Typography'],
    prefixes: ['font-', 'line-height', 'letter-spacing'],
  },
  {
    file: 'spacing.md',
    title: 'Spacing',
    pages: [],
    prefixes: ['spacing-', 'scale-'],
  },
  {
    file: 'icons.md',
    title: 'Icons',
    pages: ['Icons'],
    prefixes: [],
  },
  {
    file: 'layout.md',
    title: 'Layout',
    pages: ['Layout'],
    prefixes: [],
  },
];

/**
 * Keeps the how-to-choose sections of a foundation page and drops the "# Tokens"
 * and "# Code" H1 sections: values come from code, not ZeroHeight tables.
 */
export function chooseGuidance(
  sections: Map<string, string>,
  format: (body: string) => string,
): string {
  return [...sections.entries()]
    .filter(([k]) => !/^(tokens|code)$/i.test(k))
    .map(([k, v]) => `## ${k}\n\n${format(v).trim()}`)
    .join('\n\n');
}

export function renderTokenTable(
  tokens: Map<string, string>,
  prefixes: string[],
  slugs: string[],
): string {
  const rows = [...tokens.entries()].filter(
    ([name]) =>
      prefixes.some((p) => name.startsWith(`--mds-${p}`)) &&
      !isComponentSpecific(name, slugs),
  );
  if (!rows.length) return '';
  return [
    '## Tokens (from code)',
    '',
    'Names and values come from `tokens/css`. Use the CSS custom property, never the raw value.',
    '',
    '| Token | Value |',
    '| --- | --- |',
    ...rows.map(([n, v]) => `| \`${n}\` | \`${v}\` |`),
    '',
  ].join('\n');
}
