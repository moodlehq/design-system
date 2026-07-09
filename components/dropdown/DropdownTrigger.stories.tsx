import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { DropdownTrigger } from './DropdownTrigger';

const iconMapping = {
  None: undefined,
  Smile: <i className="fa-solid fa-face-smile" aria-hidden="true" />,
  Gear: <i className="fa-solid fa-gear" aria-hidden="true" />,
  Filter: <i className="fa-solid fa-filter" aria-hidden="true" />,
};

const meta = {
  title: 'Components/Dropdown/DropdownTrigger',
  component: DropdownTrigger,
  parameters: {
    layout: 'centered',
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button');
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
  },
  tags: ['autodocs', 'test', 'beta'],
  argTypes: {
    label: {
      description:
        'Trigger label. For icon-only triggers it becomes the aria-label.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['button', 'nav-pill'],
      description:
        'Visual form. The nav-pill variant is constrained to appearance="default" and size="md".',
      table: {
        type: { summary: 'button | nav-pill' },
        defaultValue: { summary: 'button' },
      },
    },
    appearance: {
      control: { type: 'select' },
      options: ['emphasis', 'default', 'subtle'],
      description:
        'emphasis = filled secondary, default = outlined secondary, subtle = ghost.',
      table: {
        type: { summary: 'emphasis | default | subtle' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Trigger size.',
      table: {
        type: { summary: 'sm | md' },
        defaultValue: { summary: 'md' },
      },
    },
    startIcon: {
      description:
        'Icon rendered before the label. Accepts only intrinsic `<i>` or `<svg>` elements. Mark decorative icons with `aria-hidden="true"`.',
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      control: { type: 'select' },
    },
    iconOnly: {
      control: { type: 'boolean' },
      description:
        'Renders only the startIcon; the label prop becomes the aria-label.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    open: {
      control: { type: 'boolean' },
      description:
        'Whether the controlled dropdown is open. Drives aria-expanded and the active visual state.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    label: 'Label',
    variant: 'button',
    appearance: 'default',
    size: 'md',
    iconOnly: false,
    open: false,
    disabled: false,
  },
} satisfies Meta<typeof DropdownTrigger>;
export default meta;

type Story = StoryObj<typeof meta>;

const showcaseInlineStyle = {
  display: 'flex' as const,
  gap: 'var(--mds-spacing-sm)',
  flexWrap: 'wrap' as const,
  alignItems: 'center' as const,
};

export const Default: Story = {};

export const Emphasis: Story = {
  args: { appearance: 'emphasis' },
};

export const Subtle: Story = {
  args: { appearance: 'subtle' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const WithStartIcon: Story = {
  args: { startIcon: iconMapping.Smile },
};

export const IconOnly: Story = {
  args: {
    label: 'Open menu',
    startIcon: iconMapping.Gear,
    iconOnly: true,
  },
};

export const NavPill: Story = {
  args: { variant: 'nav-pill' },
};

export const Open: Story = {
  args: { open: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeDisabled();
  },
};

export const AllAppearances: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: (args) => (
    <div style={showcaseInlineStyle}>
      <DropdownTrigger {...args} label="Emphasis" appearance="emphasis" />
      <DropdownTrigger {...args} label="Default" appearance="default" />
      <DropdownTrigger {...args} label="Subtle" appearance="subtle" />
      <DropdownTrigger {...args} label="Nav pill" variant="nav-pill" />
    </div>
  ),
  // Overrides the meta play: this story renders several triggers, so the
  // single-element getByRole lookup there would throw.
  play: async ({ canvas }) => {
    const triggers = canvas.getAllByRole('button');
    await expect(triggers).toHaveLength(4);
  },
};

export const RightToLeft: Story = {
  tags: ['test', 'beta'],
  args: { startIcon: iconMapping.Smile },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};
