/** Shared helpers for turning ZeroHeight page Markdown into agent-readable Markdown. */

export interface ParsedPage {
  meta: Map<string, string>;
  body: string;
}

/**
 * Replaces ZeroHeight image references with plain alt text.
 * Covers expiring https:// S3 URLs (valid for 7 days) and zeroheight:// asset
 * placeholders. Neither can be resolved from a committed file, so both are removed.
 */
export function stripExpiringImages(md: string): string {
  return md.replace(
    /!\[[^\]]*\]\((?:https:\/\/zeroheight|zeroheight:\/\/)[^)]+\)/g,
    '',
  );
}

/** Splits ZeroHeight YAML front matter (title, url, status, introduction) from the body. */
export function parsePage(raw: string): ParsedPage {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = new Map<string, string>();
  for (const line of (match?.[1] ?? '').split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta.set(kv[1], kv[2].trim());
  }
  return { meta, body: raw.slice(match?.[0].length ?? 0).trim() };
}

/** Shifts every Markdown heading down one level (capped at H6), skipping code fences. */
export function demoteHeadings(md: string): string {
  let inFence = false;
  return md
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
      if (inFence) return line;
      return line.replace(/^(#{1,5})(\s)/, '#$1$2');
    })
    .join('\n');
}

/**
 * Replaces ZeroHeight's YAML front matter with a page title heading and a short
 * metadata line (package slug, status, URL), so every section names its component.
 * Page headings are demoted one level beneath the title.
 */
export function formatPage(
  raw: string,
  fallbackTitle: string,
  packageSlug?: string,
): string {
  const { meta, body } = parsePage(raw);
  if (!body) return '';

  const title = meta.get('title') || fallbackTitle;
  const facts = [
    packageSlug && `Package slug: ${packageSlug}`,
    meta.get('status') && `Status: ${meta.get('status')}`,
    meta.get('url') && `Source: ${meta.get('url')}`,
  ].filter(Boolean);
  const intro = meta.get('introduction');
  return [
    `# ${title}`,
    facts.length ? facts.join(' · ') : '',
    intro ?? '',
    demoteHeadings(body),
  ]
    .filter(Boolean)
    .join('\n\n');
}
