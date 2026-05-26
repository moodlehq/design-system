import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Button } from './Button';

const iconMapping = {
  None: undefined,
  Download: <i className="fa-solid fa-download" aria-hidden="true" />,
  Sort: <i className="fa-solid fa-sort" aria-hidden="true" />,
  Trash: <i className="fa-solid fa-trash" aria-hidden="true" />,
  'Arrow Right': <i className="fa-solid fa-arrow-right" aria-hidden="true" />,
  'Arrow Left': <i className="fa-solid fa-arrow-left" aria-hidden="true" />,
  Plus: <i className="fa-solid fa-plus" aria-hidden="true" />,
  Check: <i className="fa-solid fa-check" aria-hidden="true" />,
};

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  play: async ({ canvas, userEvent }) => {
    const buttons = canvas.getAllByRole('button');
    await userEvent.click(buttons[0]);
    // Wait for any updates to complete
    await new Promise((resolve) => setTimeout(resolve, 0));
    await expect(buttons[0]).toBeVisible();
  },
  tags: ['autodocs', 'test', 'stable'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: {
      description: 'Button label.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'danger',
        'ghost',
        'outline-primary',
        'outline-secondary',
        'outline-danger',
      ],
      description: 'Button variant.',
      table: {
        type: {
          summary:
            'primary | secondary | danger | ghost | outline-primary | outline-secondary | outline-danger',
        },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size. Defaults to "md" when not set.',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    startIcon: {
      description:
        'Icon rendered before the label. Accepts only intrinsic `<i>` or `<svg>` elements. Mark decorative icons with `aria-hidden="true"`. For icon-only buttons pass `aria-label` directly.',
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      control: { type: 'select' },
    },
    endIcon: {
      description:
        'Icon rendered after the label. Accepts only intrinsic `<i>` or `<svg>` elements. Mark decorative icons with `aria-hidden="true"`. For icon-only buttons pass `aria-label` directly.',
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Button disabled state.',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Native button type.',
      table: {
        type: {
          summary: 'button | submit | reset',
        },
        defaultValue: { summary: 'button' },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    label: 'Button',
    variant: undefined,
    disabled: false,
  },
} satisfies Meta<typeof Button>;
export default meta;

const showcaseInlineStyle = {
  display: 'flex' as const,
  gap: 'var(--mds-spacing-sm)',
  flexWrap: 'wrap' as const,
  alignItems: 'center' as const,
};

const showcaseParameters = {
  controls: {
    disable: true,
  },
  docs: {
    canvas: { sourceState: 'none' },
  },
} as const;

const withShowcaseDocs = (story: string) => ({
  ...showcaseParameters,
  docs: {
    ...showcaseParameters.docs,
    description: {
      story,
    },
  },
});

const matrixContainerStyle = {
  display: 'grid' as const,
  gap: 'var(--mds-spacing-xs)',
};

const matrixGridStyle = {
  display: 'grid' as const,
  gap: 'var(--mds-spacing-xs)',
  gridTemplateColumns:
    'minmax(11rem, auto) minmax(9rem, auto) repeat(5, minmax(9rem, auto))',
  alignItems: 'center' as const,
};

const matrixLabelCellStyle = {
  color: 'var(--mds-text-subtle)',
  fontSize: 'var(--mds-font-size-paragraph-small)',
  fontFamily: 'var(--mds-font-family-base)',
  fontWeight: 'var(--mds-font-weight-medium)',
};

const matrixStateCellStyle = {
  minHeight: '2.5rem',
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'flex-start' as const,
};

const matrixVariants = [
  { label: 'Primary', variant: 'primary' },
  { label: 'Secondary', variant: 'secondary' },
  { label: 'Danger', variant: 'danger' },
  { label: 'Ghost', variant: 'ghost' },
  { label: 'Outline Primary', variant: 'outline-primary' },
  { label: 'Outline Secondary', variant: 'outline-secondary' },
  { label: 'Outline Danger', variant: 'outline-danger' },
] as const;

interface MatrixUsageDef {
  label: string;
  isIconOnly: boolean;
  startIcon?: (typeof iconMapping)[keyof typeof iconMapping];
  endIcon?: (typeof iconMapping)[keyof typeof iconMapping];
}

const matrixUsages: readonly MatrixUsageDef[] = [
  { label: 'Text only', isIconOnly: false },
  {
    label: 'Start icon (startIcon)',
    isIconOnly: false,
    startIcon: iconMapping.Download,
  },
  {
    label: 'End icon (endIcon)',
    isIconOnly: false,
    endIcon: iconMapping['Arrow Right'],
  },
  { label: 'Icon only', isIconOnly: true, startIcon: iconMapping.Trash },
] as const;

const matrixStates = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover' },
  { key: 'pressed', label: 'Pressed' },
  { key: 'focus-visible', label: 'Focus visible' },
  { key: 'disabled', label: 'Disabled' },
] as const;

type MatrixStateKey = (typeof matrixStates)[number]['key'];
type MatrixVariant = (typeof matrixVariants)[number];
type MatrixUsage = MatrixUsageDef;
interface MatrixRow {
  key: string;
  variantDef: MatrixVariant;
  usage: MatrixUsage;
}

const matrixRows: MatrixRow[] = matrixUsages.flatMap((usage) =>
  matrixVariants.map((variantDef) => ({
    key: `${usage.label}-${variantDef.variant}`,
    variantDef,
    usage,
  })),
);

const renderMatrixCellButton = (
  variantDef: MatrixVariant,
  usage: MatrixUsage,
  state: MatrixStateKey,
) => {
  const isDisabled = state === 'disabled';

  if (usage.isIconOnly) {
    const iconOnlyLabel = `${variantDef.label} icon button`;
    return (
      <div data-matrix-state={state}>
        <Button
          variant={variantDef.variant}
          label=""
          startIcon={usage.startIcon}
          aria-label={iconOnlyLabel}
          disabled={isDisabled}
        />
      </div>
    );
  }

  return (
    <div data-matrix-state={state}>
      <Button
        variant={variantDef.variant}
        label="Button"
        startIcon={usage.startIcon}
        endIcon={usage.endIcon}
        disabled={isDisabled}
      />
    </div>
  );
};

type Story = StoryObj<typeof meta>;

export const DefaultPrimary: Story = {};

export const Variants: Story = {
  parameters: withShowcaseDocs(
    'Compares all supported visual variants. Use filled variants for primary actions, outline variants for lower-emphasis alternatives, and ghost for subtle actions.',
  ),
  render: () => (
    <div style={showcaseInlineStyle}>
      <Button variant="primary" label="Primary" />
      <Button variant="secondary" label="Secondary" />
      <Button variant="danger" label="Danger" />
      <Button variant="outline-primary" label="Outline Primary" />
      <Button variant="outline-secondary" label="Outline Secondary" />
      <Button variant="outline-danger" label="Outline Danger" />
      <Button variant="ghost" label="Ghost" />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: withShowcaseDocs(
    'Shows small, medium, and large sizes to help choose the right emphasis and touch target for each layout context.',
  ),
  render: () => (
    <div style={showcaseInlineStyle}>
      <Button size="sm" label="Small" />
      <Button size="md" label="Medium" />
      <Button size="lg" label="Large" />
    </div>
  ),
};

export const States: Story = {
  parameters: withShowcaseDocs(
    'Baseline interactive states represented via real props. Disabled is rendered with the native disabled attribute.',
  ),
  render: () => (
    <div style={showcaseInlineStyle}>
      <Button label="Default" />
      <Button label="Disabled" disabled />
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: withShowcaseDocs(
    'Demonstrates startIcon and endIcon usage with text labels. Prefer decorative icons with aria-hidden so the label remains the accessible name.',
  ),
  render: () => (
    <div style={showcaseInlineStyle}>
      <Button label="Download" startIcon={iconMapping.Download} />
      <Button label="Continue" endIcon={iconMapping['Arrow Right']} />
    </div>
  ),
};

export const IconOnly: Story = {
  parameters: withShowcaseDocs(
    'Icon-only buttons across sizes. Always provide an aria-label when no visible text label is rendered.',
  ),
  render: () => (
    <div style={showcaseInlineStyle}>
      <Button
        size="sm"
        label=""
        startIcon={iconMapping.Trash}
        aria-label="Delete small"
      />
      <Button
        size="md"
        label=""
        startIcon={iconMapping.Trash}
        aria-label="Delete medium"
      />
      <Button
        size="lg"
        label=""
        startIcon={iconMapping.Trash}
        aria-label="Delete large"
      />
    </div>
  ),
};

export const RightToLeft: Story = {
  args: {
    label: 'حالة',
    startIcon: iconMapping['Arrow Right'],
  },
  render: (args) => (
    <div dir="rtl">
      <Button {...args} />
    </div>
  ),
  tags: ['test'],
};

export const StateMatrix: Story = {
  parameters: {
    ...withShowcaseDocs(
      'State matrix for visual regression review across variant and icon usage combinations. Hover, pressed, and focus-visible cells are driven by the Storybook pseudo-states addon.',
    ),
    pseudo: {
      hover: "[data-matrix-state='hover'] button",
      active: "[data-matrix-state='pressed'] button",
      focusVisible: "[data-matrix-state='focus-visible'] button",
    },
  },
  render: () => (
    <div style={matrixContainerStyle}>
      <div style={matrixGridStyle}>
        <span style={matrixLabelCellStyle}>Variant</span>
        <span style={matrixLabelCellStyle}>Usage</span>
        {matrixStates.map((state) => (
          <span key={state.key} style={matrixLabelCellStyle}>
            {state.label}
          </span>
        ))}
      </div>
      {matrixRows.map((row) => (
        <div key={row.key} style={matrixGridStyle}>
          <span style={matrixLabelCellStyle}>{row.variantDef.label}</span>
          <span style={matrixLabelCellStyle}>{row.usage.label}</span>
          {matrixStates.map((state) => (
            <div key={state.key} style={matrixStateCellStyle}>
              {renderMatrixCellButton(row.variantDef, row.usage, state.key)}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
