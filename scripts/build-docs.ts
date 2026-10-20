/**
 * Fetches all public ZeroHeight pages and writes one combined, titled Markdown
 * file to llms-full.txt (repo root, shipped in the package) for agents that
 * want everything. It is an optional extra: the per-component guidance from
 * `npm run build-guidance` is the main path.
 *
 * Usage: npm run build-docs
 * Requires: ZEROHEIGHT_MCP_URL=https://mcp.zeroheight.com/mcp/<your-token>
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

import { formatPage, stripExpiringImages } from './lib/zeroheight-format';

const STYLEGUIDE_ID = 131542;
const OUTPUT_PATH = resolve('llms-full.txt');

// The cover page is a ZeroHeight UI chrome element with no text content.
const SKIP_KEYS = new Set(['___cover']);

const FILE_HEADER = `<!-- Auto-generated from ZeroHeight. Do not edit manually. -->
<!-- Source: https://design.moodle.com/ -->
<!-- Regenerate: npm run build-docs -->

# Moodle Design System: full documentation

Every public page, in site order. Each page starts with a "# <title>" heading.
Prefer llms.txt and the per-component guidance files; use this only when you need everything.

`;

interface PageEntry {
  id: number;
  url: string;
}
type PageTree = Record<string, PageEntry | PageTree>;
interface FlatPage {
  id: number;
  title: string;
  url: string;
}
type MCPContent = Array<{ type: string; [key: string]: unknown }>;

// The MCP token exposes draft and hidden pages; restrict to the public domain only.
const PUBLIC_STYLEGUIDE_HOST = 'design.moodle.com';

/** Type guard distinguishing a leaf page entry from a nested subtree. */
function isPageEntry(value: unknown): value is PageEntry {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof (value as PageEntry).id === 'number'
  );
}

/** Returns true only for pages published on the public styleguide domain. */
function isPublicPage(page: FlatPage): boolean {
  try {
    return new URL(page.url).hostname === PUBLIC_STYLEGUIDE_HOST;
  } catch {
    return false;
  }
}

/** Recursively flattens the nested ZeroHeight page tree into an ordered list. */
function extractPages(tree: PageTree): FlatPage[] {
  return Object.entries(tree).flatMap(([key, value]) => {
    if (SKIP_KEYS.has(key)) return [];
    if (isPageEntry(value))
      return [{ id: value.id, title: key, url: value.url }];
    return extractPages(value as PageTree);
  });
}

/** Concatenates all text-typed content blocks from an MCP tool response. */
function extractText(content: MCPContent): string {
  return content
    .filter((c) => c.type === 'text')
    .map((c) => c['text'] as string)
    .join('');
}

/** Resolves after `ms` milliseconds. */
function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

/** Calls a ZeroHeight MCP tool and returns the concatenated text content. */
async function invokeToolText(
  client: Client,
  name: string,
  args: Record<string, unknown>,
): Promise<string> {
  const result = await client.callTool({ name, arguments: args });
  return extractText(result.content as MCPContent);
}

/**
 * Fetches the styleguide page tree and returns only pages on the public domain.
 * Logs a count of any hidden/draft pages that were filtered out.
 */
async function fetchPublicPages(client: Client): Promise<FlatPage[]> {
  console.log('Fetching page tree…');
  const json = await invokeToolText(client, 'list-pages', {
    styleguideId: STYLEGUIDE_ID,
  });
  const data = JSON.parse(json) as { pages?: PageTree } | PageTree;
  const tree = 'pages' in data && data.pages ? data.pages : (data as PageTree);
  const all = extractPages(tree);
  const pages = all.filter(isPublicPage);
  if (pages.length < all.length) {
    console.log(
      `Skipping ${all.length - pages.length} non-public page(s) (hidden/draft).`,
    );
  }
  console.log(`Found ${pages.length} public pages.`);
  return pages;
}

/**
 * Fetches and formats content for each page, returning non-empty sections.
 *
 * Requests are rate-limited to one per 1.1 s (ZeroHeight allows 30 per 30 s).
 * The delay is applied before each request except the first, avoiding a
 * trailing wait after the final page.
 */
async function fetchPageContent(
  client: Client,
  pages: FlatPage[],
): Promise<string[]> {
  const sections: string[] = [];
  for (let i = 0; i < pages.length; i++) {
    if (i > 0) await sleep(1100);
    const page = pages[i];
    console.log(`  Fetching: ${page.title} (id: ${page.id})`);
    const raw = await invokeToolText(client, 'get-page', { pageId: page.id });
    const formatted = formatPage(stripExpiringImages(raw), page.title);
    if (formatted) {
      sections.push(formatted);
    } else {
      console.log('    (skipped — no content)');
    }
  }
  return sections;
}

async function main(): Promise<void> {
  const mcpUrl = process.env.ZEROHEIGHT_MCP_URL;
  if (!mcpUrl) {
    throw new Error(
      'ZEROHEIGHT_MCP_URL environment variable is required.\n' +
        'Set it to your ZeroHeight MCP server URL:\n' +
        '  export ZEROHEIGHT_MCP_URL=https://mcp.zeroheight.com/mcp/<your-token>',
    );
  }

  console.log('Connecting to ZeroHeight MCP server…');
  const client = new Client({ name: 'mds-docs-builder', version: '1.0.0' });
  await client.connect(new StreamableHTTPClientTransport(new URL(mcpUrl)));

  let pages: FlatPage[];
  let sections: string[];
  try {
    pages = await fetchPublicPages(client);
    sections = await fetchPageContent(client, pages);
  } finally {
    await client.close();
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  const output = FILE_HEADER + sections.join('\n\n---\n\n') + '\n';
  writeFileSync(OUTPUT_PATH, output, 'utf-8');

  console.log(
    `\nWritten: ${OUTPUT_PATH}\n` +
      `Pages:   ${sections.length} (${pages.length - sections.length} skipped)`,
  );
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
