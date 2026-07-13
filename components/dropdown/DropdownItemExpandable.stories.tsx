import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { DropdownMenu } from './Dropdown';
import { DropdownItemAction, DropdownItemExpandable } from './DropdownItem';

const meta = {
  title: 'Components/Dropdown/DropdownItem/Expandable',
  component: DropdownItemExpandable,
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ inlineSize: '12.9375rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    label: {
      description: 'Visible label text for the expandable row.',
    },
    defaultOpen: {
      // Hide when disabled — a disabled row cannot open its submenu.
      if: { arg: 'disabled', truthy: false },
      control: { type: 'boolean' },
      description: 'Initial open state for the submenu (uncontrolled).',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    placement: {
      // Hide when disabled — placement only applies when the submenu can open.
      if: { arg: 'disabled', truthy: false },
      control: { type: 'select' },
      options: ['right-start', 'right-end', 'left-start', 'left-end'],
      description:
        'Submenu placement relative to the expandable row. flip() mirrors to the opposite side when space is insufficient.',
      table: {
        type: { summary: 'Placement' },
        defaultValue: { summary: 'right-start' },
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
    label: 'Expand',
    defaultOpen: false,
    disabled: false,
  },
} satisfies Meta<typeof DropdownItemExpandable>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Single expandable row — click or press Right Arrow (Left Arrow in RTL) to
 * open the nested submenu. Press Escape or Left Arrow to close it.
 */
export const Default: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownItemExpandable {...args}>
        <DropdownItemAction label="Sub action 1" />
        <DropdownItemAction label="Sub action 2" />
        <DropdownItemAction label="Sub action 3" />
      </DropdownItemExpandable>
    </DropdownMenu>
  ),
  play: async ({ canvas, userEvent }) => {
    const item = canvas.getByRole('menuitem', { name: 'Expand' });
    await expect(item).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(item);
    await expect(item).toHaveAttribute('aria-expanded', 'true');
    // The submenu is portaled to document.body; wait for both menus to appear.
    await waitFor(() => {
      expect(document.querySelectorAll('[role="menu"]').length).toBe(2);
    });
    await userEvent.keyboard('{Escape}');
    await expect(item).toHaveAttribute('aria-expanded', 'false');
    // Right Arrow also opens the submenu without a click (Left Arrow in RTL).
    item.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(item).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    await expect(item).toHaveAttribute('aria-expanded', 'false');
  },
};

/**
 * Expandable item in the disabled state. The row is non-interactive: the chevron
 * and label both render in `text.muted`, the submenu cannot open, and no popup
 * ARIA attributes are exposed.
 */
export const DisabledState: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' as const } },
  },
  render: () => (
    <DropdownMenu aria-label="Menu">
      <DropdownItemExpandable label="Expand" disabled>
        <DropdownItemAction label="Sub action 1" />
        <DropdownItemAction label="Sub action 2" />
      </DropdownItemExpandable>
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    const item = canvas.getByRole('menuitem', { name: 'Expand' });
    await expect(item).toHaveAttribute('aria-disabled', 'true');
    // A disabled expandable with children keeps aria-haspopup — it's a permanent
    // descriptor of the item type, not a state. aria-expanded stays false because
    // the submenu cannot open while disabled.
    await expect(item).toHaveAttribute('aria-haspopup', 'menu');
    await expect(item).toHaveAttribute('aria-expanded', 'false');
  },
};

/** RTL layout test — verifies the chevron mirrors and Left Arrow (not Right) opens the submenu in a right-to-left context. */
export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  render: () => (
    <div dir="rtl">
      <DropdownMenu aria-label="Menu">
        <DropdownItemExpandable label="Expand" defaultOpen>
          <DropdownItemAction label="Sub action 1" />
          <DropdownItemAction label="Sub action 2" />
        </DropdownItemExpandable>
      </DropdownMenu>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const item = canvas.getByRole('menuitem', { name: 'Expand' });
    // Confirm the submenu is open by default (two menus: parent + portaled submenu).
    await waitFor(() =>
      expect(document.querySelectorAll('[role="menu"]').length).toBe(2),
    );
    // Close with Escape — direction-independent.
    await userEvent.keyboard('{Escape}');
    await expect(item).toHaveAttribute('aria-expanded', 'false');
    // In RTL, Left Arrow (not Right Arrow) is the open key on the button.
    item.focus();
    await userEvent.keyboard('{ArrowLeft}');
    await expect(item).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() =>
      expect(document.querySelectorAll('[role="menu"]').length).toBe(2),
    );
    // Close via Right Arrow — in RTL this is the submenu close key, and the
    // portaled submenu now correctly reads direction from the reference element.
    await userEvent.keyboard('{ArrowRight}');
    await expect(item).toHaveAttribute('aria-expanded', 'false');
  },
};
