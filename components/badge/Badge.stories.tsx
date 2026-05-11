import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description:
        'Visible badge text. Must be a caller-supplied translated string.',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Colour and semantic variant.',
      table: {
        type: {
          summary: 'primary | secondary | success | danger | warning | info',
        },
        defaultValue: { summary: 'primary' },
      },
    },
    subtle: {
      control: { type: 'boolean' },
      description:
        'Renders the low-contrast style: light tinted background, dark text, and a visible border.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    pill: {
      control: { type: 'boolean' },
      description: 'Renders a fully rounded pill shape.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    startIcon: {
      control: false,
      description:
        'Optional icon rendered before the label. Must be an `<i>` or `<svg>` element.',
      table: {
        type: { summary: 'ReactElement<"i" | "svg">' },
      },
    },
    endIcon: {
      control: false,
      description:
        'Optional icon rendered after the label. Must be an `<i>` or `<svg>` element.',
      table: {
        type: { summary: 'ReactElement<"i" | "svg">' },
      },
    },
  },
  args: {
    label: 'Label',
    variant: undefined,
    subtle: false,
    pill: false,
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('.mds-badge');
    await expect(badges.length).toBeGreaterThan(0);
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
] as const;

const icon = <i className="fa-solid fa-circle-info" aria-hidden="true" />;

const showcaseRowStyle = {
  display: 'flex',
  gap: 'var(--mds-spacing-xs)',
  flexWrap: 'wrap',
} as const;

const showcaseParameters = {
  controls: { disable: true },
  docs: {
    canvas: { sourceState: 'none' },
  },
} as const;

export const Primary: Story = {};

export const DefaultVariants: Story = {
  parameters: showcaseParameters,
  render: () => (
    <div style={showcaseRowStyle}>
      {variants.map((variant) => (
        <Badge
          key={variant}
          label={variant[0].toUpperCase() + variant.slice(1)}
          variant={variant}
        />
      ))}
    </div>
  ),
};

export const SubtleVariants: Story = {
  parameters: showcaseParameters,
  render: () => (
    <div style={showcaseRowStyle}>
      {variants.map((variant) => (
        <Badge
          key={variant}
          label={variant[0].toUpperCase() + variant.slice(1)}
          variant={variant}
          subtle
        />
      ))}
    </div>
  ),
};

export const PillVariants: Story = {
  parameters: showcaseParameters,
  render: () => (
    <div style={showcaseRowStyle}>
      <Badge label="Default" variant="primary" />
      <Badge label="Pill" variant="primary" pill />
    </div>
  ),
};

export const RightToLeft: Story = {
  args: {
    label: 'حالة',
    startIcon: icon,
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  tags: ['test'],
};
