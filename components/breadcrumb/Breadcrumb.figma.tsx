import figma from '@figma/code-connect';
import { Breadcrumb } from './Breadcrumb';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=13170-296';

// One connection per Items value, since each changes the rendered trail.
// "Truncation width" has no code prop — code uses a fluid width cap instead
// of Figma's fixed widths (per Zeroheight) — so it doesn't change the snippet
// and is intentionally left unmapped. Filtering on Items alone covers every
// Truncation width variant.

// Items: 2
figma.connect(Breadcrumb, url, {
  variant: { Items: '2' },
  example: () => (
    <Breadcrumb
      items={[{ label: 'Home', href: '/' }, { label: 'Current page' }]}
      ariaLabel="Breadcrumb"
    />
  ),
});

// Items: 3
figma.connect(Breadcrumb, url, {
  variant: { Items: '3' },
  example: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Section', href: '/section' },
        { label: 'Current page' },
      ]}
      ariaLabel="Breadcrumb"
    />
  ),
});

// Items: 4
figma.connect(Breadcrumb, url, {
  variant: { Items: '4' },
  example: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Section', href: '/section' },
        { label: 'Sub-section', href: '/sub' },
        { label: 'Current page' },
      ]}
      ariaLabel="Breadcrumb"
    />
  ),
});

// Items: More than 4 — the middle ancestors collapse into the overflow menu.
figma.connect(Breadcrumb, url, {
  variant: { Items: 'More than 4' },
  example: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Level 2', href: '/l2' },
        { label: 'Level 3', href: '/l3' },
        { label: 'Level 4', href: '/l4' },
        { label: 'Level 5', href: '/l5' },
        { label: 'Current page' },
      ]}
      ariaLabel="Breadcrumb"
      overflowAriaLabel="Show more items"
    />
  ),
});
