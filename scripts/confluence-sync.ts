/**
 * Shared helpers for syncing a local Markdown file to a Confluence page,
 * used by sync-changelog.ts and sync-releases.ts.
 */

import { MarkdownTransformer } from '@atlaskit/editor-markdown-transformer';

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export interface ConfluencePage {
  id: string;
  title: string;
  version: { number: number };
}

export interface ConfluenceClient {
  getPage: (pageId: string) => Promise<ConfluencePage>;
  updatePage: (
    pageId: string,
    title: string,
    nextVersion: number,
    adfBody: string,
  ) => Promise<void>;
}

export function createConfluenceClient(
  baseUrl: string,
  user: string,
  apiToken: string,
): ConfluenceClient {
  const authHeader = `Basic ${Buffer.from(`${user}:${apiToken}`).toString('base64')}`;
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '');

  return {
    async getPage(pageId: string): Promise<ConfluencePage> {
      const response = await fetch(
        `${normalizedBaseUrl}/wiki/api/v2/pages/${pageId}`,
        {
          headers: {
            Authorization: authHeader,
            Accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Confluence GET error ${response.status}: ${body}`);
      }

      return response.json() as Promise<ConfluencePage>;
    },

    async updatePage(
      pageId: string,
      title: string,
      nextVersion: number,
      adfBody: string,
    ): Promise<void> {
      const response = await fetch(
        `${normalizedBaseUrl}/wiki/api/v2/pages/${pageId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            id: pageId,
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
    },
  };
}

const transformer = new MarkdownTransformer();

export function markdownToAdf(markdown: string): string {
  return JSON.stringify(transformer.parse(markdown));
}

export async function syncMarkdownToConfluencePage(options: {
  label: string;
  markdown: string;
  client: ConfluenceClient;
  pageId: string;
}): Promise<void> {
  const { label, markdown, client, pageId } = options;

  console.log(`Converting ${label} to ADF...`);
  const adfBody = markdownToAdf(markdown);

  console.log('Fetching current Confluence page...');
  const page = await client.getPage(pageId);
  const nextVersion = page.version.number + 1;

  console.log(
    `Updating page "${page.title}" (v${page.version.number} → v${nextVersion})...`,
  );
  await client.updatePage(pageId, page.title, nextVersion, adfBody);

  console.log('Done — Confluence page updated successfully.');
}
