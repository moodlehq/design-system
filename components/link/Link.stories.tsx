import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fireEvent, fn } from 'storybook/test';
import { Link } from './Link';

const iconMapping = {
  None: undefined,
  'Arrow Left': <i className="fa-solid fa-arrow-left" aria-hidden="true" />,
  'Arrow Right': <i className="fa-solid fa-arrow-right" aria-hidden="true" />,
};

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    label: {
      description: 'Visible link label.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    href: {
      control: { type: 'text' },
      description: 'Native anchor href.',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Link visual variant.',
      table: {
        type: { summary: 'primary | secondary' },
        defaultValue: { summary: 'primary' },
      },
    },
    startIcon: {
      description:
        'Icon rendered before the label. Accepts only intrinsic `<i>` or `<svg>` elements.',
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      control: { type: 'select' },
    },
    endIcon: {
      description:
        'Icon rendered after the label. Accepts only intrinsic `<i>` or `<svg>` elements.',
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables interaction and removes the href target.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    target: {
      control: { type: 'select' },
      options: ['_self', '_blank', '_parent', '_top'],
      description:
        'Browsing context for the link. When set to `_blank` the component automatically adds `rel="noopener noreferrer"` to prevent reverse tabnabbing.',
      table: {
        type: { summary: '_self | _blank | _parent | _top' },
        defaultValue: { summary: '_self' },
      },
    },
    rel: {
      control: { type: 'text' },
      description:
        'Space-separated list of link relationship tokens (e.g. `noopener noreferrer`). When `target="_blank"` is set, `noopener` and `noreferrer` are always merged in automatically.',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    label: 'Link',
    href: '#storybook-link',
    variant: undefined,
    disabled: false,
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Prevent the anchor from navigating during Storybook/Playwright tests.
    // Without preventDefault the browser connection closes mid-play and the
    // test runner reports a false "page closed unexpectedly" error.
    onClick: fn((e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()),
  },
  play: async ({ canvas, args }) => {
    const link = canvas.getByRole('link', { name: args.label });
    // Use fireEvent instead of userEvent.click to avoid Playwright simulating a
    // real pointer event that causes the browser to navigate before React's
    // synthetic event (and any preventDefault) can intercept it.
    fireEvent.click(link);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--mds-spacing-xl)' }}>
      <Link label="Primary" href="#storybook-link" />
      <Link label="Secondary" href="#storybook-link" variant="secondary" />
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--mds-spacing-xl)' }}>
      <Link
        label="Start icon"
        href="#storybook-link"
        startIcon={iconMapping['Arrow Left']}
      />
      <Link
        label="End icon"
        href="#storybook-link"
        endIcon={iconMapping['Arrow Right']}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    const link = canvas.getByRole('link', { name: args.label });
    // The disabled link has `pointer-events: none` so pointer simulation is
    // blocked by Playwright. Use fireEvent to dispatch the DOM event directly
    // and verify the component's JS guard (stopPropagation + early return)
    // prevents onClick from being called.
    fireEvent.click(link);
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(link).toHaveAttribute('aria-disabled', 'true');
  },
};

// In RTL layouts directional icons mirror: arrow-right points toward the
// logical start in a right-to-left reading context.
export const RightToLeft: Story = {
  args: {
    label: 'پیوند',
    startIcon: iconMapping['Arrow Right'],
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  tags: ['test', 'stable'],
};

// ─── State matrix ────────────────────────────────────────────────────────────

const matrixGridStyle = {
  display: 'grid' as const,
  gap: 'var(--mds-spacing-xs)',
  gridTemplateColumns:
    'minmax(7rem, auto) minmax(8rem, auto) repeat(5, minmax(7rem, auto))',
  alignItems: 'center' as const,
};

const matrixLabelCellStyle = {
  color: 'var(--mds-text-subtle)',
  fontSize: 'var(--mds-font-size-paragraph-small)',
  fontFamily: 'var(--mds-font-family-base)',
  fontWeight: 'var(--mds-font-weight-medium)',
};

const matrixStateCellStyle = {
  minHeight: '2rem',
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'flex-start' as const,
};

const linkMatrixVariants = [
  { label: 'Primary', variant: 'primary' as const },
  { label: 'Secondary', variant: 'secondary' as const },
];

const linkMatrixUsages = [
  { label: 'No icon', startIcon: undefined, endIcon: undefined },
  {
    label: 'Start icon',
    startIcon: iconMapping['Arrow Left'],
    endIcon: undefined,
  },
  {
    label: 'End icon',
    startIcon: undefined,
    endIcon: iconMapping['Arrow Right'],
  },
];

const linkMatrixStates = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover' },
  { key: 'pressed', label: 'Pressed' },
  { key: 'focus-visible', label: 'Focus visible' },
  { key: 'disabled', label: 'Disabled' },
] as const;

export const StateMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      canvas: { sourceState: 'none' },
      description: {
        story:
          'State matrix for visual regression review across variant and icon usage combinations. Hover, pressed, and focus-visible cells are driven by the Storybook pseudo-states addon.',
      },
    },
    // Pseudo-states addon selectors target the <a> anchor rendered by Link.
    pseudo: {
      hover: "[data-matrix-state='hover'] a",
      active: "[data-matrix-state='pressed'] a",
      focusVisible: "[data-matrix-state='focus-visible'] a",
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--mds-spacing-xs)' }}>
      {/* Header row */}
      <div style={matrixGridStyle}>
        <span style={matrixLabelCellStyle}>Variant</span>
        <span style={matrixLabelCellStyle}>Icon usage</span>
        {linkMatrixStates.map((state) => (
          <span key={state.key} style={matrixLabelCellStyle}>
            {state.label}
          </span>
        ))}
      </div>

      {/* Data rows: variant × icon usage */}
      {linkMatrixVariants.flatMap((variantDef) =>
        linkMatrixUsages.map((usage) => (
          <div
            key={`${variantDef.variant}-${usage.label}`}
            style={matrixGridStyle}
          >
            <span style={matrixLabelCellStyle}>{variantDef.label}</span>
            <span style={matrixLabelCellStyle}>{usage.label}</span>
            {linkMatrixStates.map((state) => {
              const isDisabled = state.key === 'disabled';
              return (
                <div
                  key={state.key}
                  data-matrix-state={state.key}
                  style={matrixStateCellStyle}
                >
                  <Link
                    label="Link"
                    href="#storybook-link"
                    variant={variantDef.variant}
                    startIcon={usage.startIcon}
                    endIcon={usage.endIcon}
                    disabled={isDisabled}
                  />
                </div>
              );
            })}
          </div>
        )),
      )}
    </div>
  ),
};
