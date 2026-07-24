import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, within } from 'storybook/test';
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb';

// ─── Sample data ──────────────────────────────────────────────────────────────

const sevenItems: BreadcrumbItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Faculty of Arts', href: '#arts' },
  { label: 'Design & Technology', href: '#dt' },
  { label: 'Undergraduate', href: '#ug' },
  { label: 'My courses', href: '#courses' },
  { label: 'Introduction to design', href: '#course' },
  { label: 'Week 1: Foundations' },
];

const shortOverflowItems: BreadcrumbItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Area', href: '#area' },
  { label: 'Course', href: '#course' },
  { label: 'Topic', href: '#topic' },
  { label: 'Week 1' },
];

const longLabelItems: BreadcrumbItem[] = [
  { label: 'Home', href: '#home' },
  {
    label: 'Faculty of Arts and Social Sciences',
    href: '#faculty',
  },
  {
    label: 'Bachelor of Design and Technology - 2025 intake',
    href: '#program',
  },
  { label: 'DSGN 101 - Introduction to design thinking and process' },
];

const rtlSevenItems: BreadcrumbItem[] = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'كلية الفنون', href: '#arts' },
  { label: 'التصميم والتكنولوجيا', href: '#dt' },
  { label: 'الدراسات الجامعية', href: '#ug' },
  { label: 'دوراتي', href: '#courses' },
  { label: 'مقدمة في التصميم', href: '#course' },
  { label: 'الأسبوع ١: الأسس' },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const showcaseParameters = {
  controls: { disable: true },
  docs: {
    canvas: { sourceState: 'none' as const },
  },
};

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Navigation landmark that shows the user's position in the site hierarchy. " +
          'Renders up to four items inline; when more are supplied the middle ancestors ' +
          'collapse behind an overflow button. Link labels are automatically truncated ' +
          'based on the viewport width, widening progressively across the MDS breakpoints.',
      },
    },
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    items: {
      description:
        'Ordered list of breadcrumb items from root to current page. The last item is the current page (rendered as bold text, not a link). JSON shape: [{ label: string, href?: string }, ...].',
      table: {
        type: { summary: 'BreadcrumbItem[]' },
      },
    },
    ariaLabel: {
      description: 'Accessible label for the `<nav>` landmark element.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Breadcrumb' },
      },
    },
    overflowAriaLabel: {
      description:
        'Screen-reader label for the overflow "…" button. Only relevant when items > 4.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Show more items' },
      },
    },
  },
  args: {
    ariaLabel: 'Breadcrumb',
    overflowAriaLabel: 'Show more items',
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────────────────────

/** The default interactive story. Use the controls panel to change `items`,
 * `ariaLabel`, and `overflowAriaLabel` and see the result live.
 */
export const Default: Story = {
  args: {
    items: shortOverflowItems,
  },
};

/**
 * Long labels to demonstrate truncation behavior at narrower widths while
 * keeping the same API shape as the default story.
 */
export const LongLabelsTruncation: Story = {
  name: 'Long labels (truncation)',
  parameters: showcaseParameters,
  args: {
    items: longLabelItems,
  },
  tags: ['test', 'stable'],
};

/** Display matrix showing all valid item-count variants from 2 up to the
 * maximum of 4 inline items. Four items is the threshold above which the
 * overflow trigger appears. The current page is always the last item -
 * rendered as plain bold text with `aria-current="page"`, never as a link.
 */
export const ItemCounts: Story = {
  name: 'Item count variants (2 – 4)',
  parameters: showcaseParameters,
  // args.items is required by the component type; the render function provides
  // its own data, so this placeholder is never rendered directly.
  args: { items: [] as BreadcrumbItem[] },
  render: () => {
    const variants: Array<{ label: string; items: BreadcrumbItem[] }> = [
      {
        label: '2 items',
        items: [{ label: 'Home', href: '#home' }, { label: 'Current page' }],
      },
      {
        label: '3 items',
        items: [
          { label: 'Home', href: '#home' },
          { label: 'My courses', href: '#courses' },
          { label: 'Introduction to design' },
        ],
      },
      {
        label: '4 items - maximum before overflow',
        items: [
          { label: 'Home', href: '#home' },
          { label: 'My courses', href: '#courses' },
          { label: 'Introduction to design', href: '#course' },
          { label: 'Week 1: Foundations' },
        ],
      },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {variants.map(({ label, items }) => (
          <div key={label}>
            <p
              style={{
                margin: '0 0 0.25rem',
                fontSize: '0.75rem',
                color: '#666',
              }}
            >
              {label}
            </p>
            <Breadcrumb items={items} ariaLabel={`Breadcrumb - ${label}`} />
          </div>
        ))}
      </div>
    );
  },
  tags: ['test', 'stable'],
};

/**
 * When more than four items are supplied, the middle ancestors collapse behind
 * a `…` button. Clicking it expands an inline dropdown listing the hidden
 * items; the root and the two closest ancestors always remain visible. The play
 * function opens the menu so the dropdown state is visible for screenshot and
 * a11y testing.
 */
export const OverflowMenuOpen: Story = {
  name: 'More than 4 (overflow)',
  parameters: showcaseParameters,
  args: {
    items: sevenItems,
  },
  play: async ({ canvas }) => {
    const overflowButton = canvas.getByRole('button');
    await userEvent.click(overflowButton);
    await expect(overflowButton).toHaveAttribute('aria-expanded', 'true');
    // The menu is rendered in a FloatingPortal (document.body), so use screen
    // instead of canvas to find it outside the story's root element.
    await expect(
      within(screen.getByRole('menu')).getByRole('menuitem', {
        name: 'Faculty of Arts',
      }),
    ).toBeVisible();
  },
};

/**
 * RTL layout with overflow, using Arabic labels. Verifies that separators,
 * padding, and the overflow dropdown all mirror correctly under `dir="rtl"`.
 * If overflow works correctly in RTL the simpler four-item case is implicitly
 * covered.
 */
export const RightToLeftOverflow: Story = {
  name: 'Right-to-left with overflow',
  parameters: showcaseParameters,
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  args: {
    items: rtlSevenItems,
    ariaLabel: 'مسار التنقل',
    overflowAriaLabel: 'عرض المزيد',
  },
  tags: ['test', 'stable'],
};
