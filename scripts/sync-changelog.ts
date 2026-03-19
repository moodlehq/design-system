/**
 * Syncs CHANGELOG.md to a Confluence page.
 *
 * Required environment variables:
 *   CONFLUENCE_BASE_URL    — e.g. https://moodle.atlassian.net
 *   CONFLUENCE_PAGE_ID     — numeric ID of the target Confluence page
 *   CONFLUENCE_USER        — Atlassian account email
 *   CONFLUENCE_API_TOKEN   — Atlassian API token
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  createConfluenceClient,
  requireEnv,
  syncMarkdownToConfluencePage,
} from './confluence-sync.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main(): Promise<void> {
  const baseUrl = requireEnv('CONFLUENCE_BASE_URL');
  const pageId = requireEnv('CONFLUENCE_PAGE_ID');
  const user = requireEnv('CONFLUENCE_USER');
  const apiToken = requireEnv('CONFLUENCE_API_TOKEN');

  const changelogPath = join(__dirname, '..', 'CHANGELOG.md');
  const markdown = readFileSync(changelogPath, 'utf-8');

  const client = createConfluenceClient(baseUrl, user, apiToken);
  await syncMarkdownToConfluencePage({
    label: 'CHANGELOG.md',
    markdown,
    client,
    pageId,
  });
}

main().catch((error: unknown) => {
  console.error('sync-changelog failed:', error);
  process.exit(1);
});
