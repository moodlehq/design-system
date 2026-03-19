/**
 * Syncs CHANGELOG.md to a Confluence page.
 *
 * Reads CHANGELOG.md, converts it to Atlassian Document Format (ADF) via
 * @atlaskit/editor-markdown-transformer, then PUTs the result to the
 * configured Confluence page.
 *
 * Required environment variables:
 *   CONFLUENCE_BASE_URL    — e.g. https://moodle.atlassian.net
 *   CONFLUENCE_PAGE_ID     — numeric ID of the target Confluence page
 *   CONFLUENCE_USER        — Atlassian account email
 *   CONFLUENCE_API_TOKEN   — Atlassian API token
 */

import { MarkdownTransformer } from '@atlaskit/editor-markdown-transformer';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const CONFLUENCE_BASE_URL = requireEnv('CONFLUENCE_BASE_URL').replace(
  /\/$/,
  '',
);
const CONFLUENCE_PAGE_ID = requireEnv('CONFLUENCE_PAGE_ID');
const CONFLUENCE_USER = requireEnv('CONFLUENCE_USER');
const CONFLUENCE_API_TOKEN = requireEnv('CONFLUENCE_API_TOKEN');

const confluenceAuthHeader = `Basic ${Buffer.from(`${CONFLUENCE_USER}:${CONFLUENCE_API_TOKEN}`).toString('base64')}`;

const transformer = new MarkdownTransformer();

interface ConfluencePage {
  id: string;
  title: string;
  version: { number: number };
}

async function getPage(): Promise<ConfluencePage> {
  const response = await fetch(
    `${CONFLUENCE_BASE_URL}/wiki/api/v2/pages/${CONFLUENCE_PAGE_ID}`,
    {
      headers: {
        Authorization: confluenceAuthHeader,
        Accept: 'application/json',
      },
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Confluence GET error ${response.status}: ${body}`);
  }

  return response.json() as Promise<ConfluencePage>;
}

async function updatePage(
  title: string,
  nextVersion: number,
  adfBody: string,
): Promise<void> {
  const response = await fetch(
    `${CONFLUENCE_BASE_URL}/wiki/api/v2/pages/${CONFLUENCE_PAGE_ID}`,
    {
      method: 'PUT',
      headers: {
        Authorization: confluenceAuthHeader,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        id: CONFLUENCE_PAGE_ID,
        status: 'current',
        title,
        body: {
          representation: 'atlas_doc_format',
          value: adfBody,
        },
        version: { number: nextVersion },
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Confluence PUT error ${response.status}: ${body}`);
  }
}

async function main(): Promise<void> {
  const changelogPath = join(__dirname, '..', 'CHANGELOG.md');
  const markdown = readFileSync(changelogPath, 'utf-8');

  console.log('Converting CHANGELOG.md to ADF...');
  const adfBody = JSON.stringify(transformer.parse(markdown));

  console.log('Fetching current Confluence page...');
  const page = await getPage();
  const nextVersion = page.version.number + 1;

  console.log(
    `Updating page "${page.title}" (v${page.version.number} → v${nextVersion})...`,
  );
  await updatePage(page.title, nextVersion, adfBody);

  console.log('Done — Confluence page updated successfully.');
}

main().catch((error: unknown) => {
  console.error('sync-changelog failed:', error);
  process.exit(1);
});
