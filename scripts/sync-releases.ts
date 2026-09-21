/**
 * Syncs RELEASES.md (the release & support matrix) to a Confluence page.
 *
 * Required environment variables:
 *   CONFLUENCE_BASE_URL         — e.g. https://moodle.atlassian.net
 *   CONFLUENCE_RELEASES_PAGE_ID — numeric ID of the target Confluence page
 *   CONFLUENCE_USER             — Atlassian account email
 *   CONFLUENCE_API_TOKEN        — Atlassian API token
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
  const pageId = requireEnv('CONFLUENCE_RELEASES_PAGE_ID');
  const user = requireEnv('CONFLUENCE_USER');
  const apiToken = requireEnv('CONFLUENCE_API_TOKEN');

  const releasesPath = join(__dirname, '..', 'RELEASES.md');
  const markdown = readFileSync(releasesPath, 'utf-8');

  const client = createConfluenceClient(baseUrl, user, apiToken);
  await syncMarkdownToConfluencePage({
    label: 'RELEASES.md',
    markdown,
    client,
    pageId,
  });
}

main().catch((error: unknown) => {
  console.error('sync-releases failed:', error);
  process.exit(1);
});
