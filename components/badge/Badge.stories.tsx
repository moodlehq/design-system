import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'beta'],
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
    variant: 'primary',
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

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Success: Story = {
  args: { variant: 'success' },
};

export const Danger: Story = {
  args: { variant: 'danger' },
};

export const Warning: Story = {
  args: { variant: 'warning' },
};

export const Info: Story = {
  args: { variant: 'info' },
};

export const Subtle: Story = {
  args: { subtle: true },
};

export const AllDefaultVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge label="Primary" variant="primary" />
      <Badge label="Secondary" variant="secondary" />
      <Badge label="Success" variant="success" />
      <Badge label="Danger" variant="danger" />
      <Badge label="Warning" variant="warning" />
      <Badge label="Info" variant="info" />
    </div>
  ),
  tags: ['test', 'beta'],
};

export const AllSubtleVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge label="Primary" variant="primary" subtle />
      <Badge label="Secondary" variant="secondary" subtle />
      <Badge label="Success" variant="success" subtle />
      <Badge label="Danger" variant="danger" subtle />
      <Badge label="Warning" variant="warning" subtle />
      <Badge label="Info" variant="info" subtle />
    </div>
  ),
  tags: ['test', 'beta'],
};

export const Pill: Story = {
  args: { pill: true },
};

export const WithPrefixIcon: Story = {
  args: {
    startIcon: <i className="fa-solid fa-circle-check" aria-hidden="true" />,
  },
};

export const WithSuffixIcon: Story = {
  args: {
    endIcon: <i className="fa-solid fa-xmark" aria-hidden="true" />,
  },
};

export const RightToLeft: Story = {
  args: {
    label: 'RTL state',
    startIcon: <i className="fa-solid fa-arrow-right" aria-hidden="true" />,
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  tags: ['test', 'beta'],
};
