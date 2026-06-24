import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { NavPill } from './NavPill';

const meta = {
  title: 'Components/NavPill',
  component: NavPill,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    href: {
      control: { type: 'text' },
      description: 'Destination URL for the navigation pill.',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: { type: 'text' },
      description:
        'Visible label text. Must be a caller-supplied translated string.',
      table: {
        type: { summary: 'string' },
      },
    },
    selected: {
      control: { type: 'boolean' },
      description:
        'Whether this pill is currently the active/selected navigation item. Controls the active-indicator dot and selected visual styles.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description:
        'Disables the pill and prevents interaction. Has no effect when `selected` is true — a selected pill always remains enabled.',
      if: { arg: 'selected', truthy: false },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      description:
        'Callback fired when the pill is clicked. Receives the native mouse event.',
      table: {
        type: {
          summary: '(event: React.MouseEvent<HTMLAnchorElement>) => void',
        },
      },
    },
  },
  args: {
    label: 'Label',
    href: '#',
    selected: false,
    disabled: false,
  },
  play: async ({ canvas }) => {
    const links = canvas.getAllByRole('link');
    await expect(links[0]).toBeVisible();
  },
} satisfies Meta<typeof NavPill>;

export default meta;

type Story = StoryObj<typeof meta>;

const showcaseParameters = {
  controls: { disable: true },
  docs: {
    canvas: { sourceState: 'none' },
  },
} as const;

const showcaseRowStyle = {
  display: 'flex' as const,
  gap: 'var(--mds-spacing-sm)',
  justifyContent: 'center' as const,
};

/** Default unselected pill — the resting state for inactive navigation items. */
export const Default: Story = {
  args: {
    label: 'Label',
    selected: false,
  },
};

/** All states displayed together for a visual overview. */
export const States: Story = {
  parameters: showcaseParameters,
  render: () => (
    <div style={showcaseRowStyle}>
      <NavPill label="Default" href="#" />
      <NavPill label="Selected" href="#" selected />
      <NavPill label="Disabled" href="#" disabled />
    </div>
  ),
  play: async ({ canvas }) => {
    const links = canvas.getAllByRole('link');
    await expect(links).toHaveLength(3);
  },
};

/** RTL layout verification story to ensure directional styles mirror correctly. */
export const RightToLeft: Story = {
  args: {
    label: 'التصنيف',
    selected: true,
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
