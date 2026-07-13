import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, screen, waitFor } from 'storybook/test';
import { Dropdown, DropdownMenu } from './Dropdown';
import {
  DropdownItemAction,
  DropdownItemDivider,
  DropdownItemExpandable,
  DropdownItemHeader,
  DropdownItemMultiselect,
  DropdownItemSelect,
} from './DropdownItem';

// The composed stories need vertical room for the open menu panel.
const menuRoomDecorator = (Story: React.ComponentType) => (
  <div style={{ blockSize: '18rem' }}>
    <Story />
  </div>
);

const showcaseParameters = {
  controls: { disable: true },
  docs: { canvas: { sourceState: 'none' as const } },
} as const;

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  decorators: [menuRoomDecorator],
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    label: {
      description: 'Trigger label.',
      table: { defaultValue: { summary: '' } },
    },
    variant: {
      control: { type: 'select' },
      options: ['button', 'nav-pill'],
      description: 'Trigger form.',
      table: {
        type: { summary: 'button | nav-pill' },
        defaultValue: { summary: 'button' },
      },
    },
    appearance: {
      // nav-pill is constrained to a single appearance by design — hide the
      // control so consumers don't try values that have no effect.
      if: { arg: 'variant', eq: 'button' },
      control: { type: 'select' },
      options: ['emphasis', 'default', 'subtle'],
      description: 'Trigger appearance. Only applies to the `button` variant.',
      table: {
        type: { summary: 'emphasis | default | subtle' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      // nav-pill is constrained to md by design — hide the control to match DropdownTrigger behaviour.
      if: { arg: 'variant', eq: 'button' },
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Trigger size.',
      table: {
        type: { summary: 'sm | md' },
        defaultValue: { summary: 'md' },
      },
    },
    defaultOpen: {
      control: { type: 'boolean' },
      description: 'Initial open state for uncontrolled usage.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    sameWidth: {
      control: { type: 'boolean' },
      description:
        'When true, the menu is at least as wide as the trigger button.',
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
  },
} satisfies Meta<typeof Dropdown>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Configure label, variant, appearance, and size via the controls panel. Click the trigger to open the menu and verify open/close behaviour. */
export const Default: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <DropdownItemHeader label="Dropdown header" />
      <DropdownItemDivider />
      <DropdownItemAction label="Action item" />
      <DropdownItemAction label="Action item" />
      <DropdownItemAction label="Action item" />
    </Dropdown>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Label' });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    // The menu is portaled to document.body via FloatingPortal, so use screen.
    await expect(screen.getByRole('menu')).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await waitFor(async () => {
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  },
};

/**
 * `defaultOpen` opens the menu on first render without consumer-managed state.
 * The menu stays user-closable (Escape, outside click) — this is the uncontrolled
 * pattern. Use `open` + `onOpenChange` for fully controlled open state.
 */
export const OpenByDefault: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownItemHeader label="Dropdown header" />
      <DropdownItemDivider />
      <DropdownItemAction label="Action item" />
      <DropdownItemAction label="Action item" />
    </Dropdown>
  ),
  play: async ({ canvas, userEvent }) => {
    // The menu is portaled to document.body via FloatingPortal, so use screen.
    await expect(screen.getByRole('menu')).toBeVisible();
    // Verify the menu is still user-closable even when opened by default.
    await userEvent.keyboard('{Escape}');
    await waitFor(async () => {
      await expect(
        canvas.getByRole('button', { name: 'Label' }),
      ).toHaveAttribute('aria-expanded', 'false');
    });
  },
};

/**
 * Single-select pattern: the chosen item's label becomes the trigger label
 * (select-input semantics) and choosing an option closes the menu.
 */
export const SingleSelect: Story = {
  render: function SingleSelectStory(args) {
    const options = ['Option A', 'Option B', 'Option C'];
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    return (
      <Dropdown
        {...args}
        label={selectedIndex === null ? args.label : options[selectedIndex]}
        open={open}
        onOpenChange={setOpen}
      >
        {options.map((option, index) => (
          <DropdownItemSelect
            key={option}
            label={option}
            selected={selectedIndex === index}
            onClick={() => {
              setSelectedIndex(index);
              setOpen(false);
            }}
          />
        ))}
      </Dropdown>
    );
  },
  args: { label: 'Choose an option' },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Choose an option' }),
    );
    // Menu items are portaled to document.body via FloatingPortal, so use screen.
    await userEvent.click(
      screen.getByRole('menuitemradio', { name: 'Option B' }),
    );
    // The selected option's label is now displayed on the trigger.
    await expect(
      canvas.getByRole('button', { name: 'Option B' }),
    ).toBeVisible();
  },
};

export const MixedItems: Story = {
  parameters: showcaseParameters,
  render: function MixedItemsStory(args) {
    const [checked, setChecked] = useState(false);
    return (
      <Dropdown {...args} defaultOpen>
        <DropdownItemHeader label="Dropdown header" />
        <DropdownItemDivider />
        <DropdownItemAction
          label="Action item"
          startIcon={
            <i className="fa-solid fa-face-smile" aria-hidden="true" />
          }
        />
        <DropdownItemSelect label="Selectable" selected />
        <DropdownItemExpandable label="Expand">
          <DropdownItemAction label="Sub action 1" />
          <DropdownItemAction label="Sub action 2" />
        </DropdownItemExpandable>
        <DropdownItemMultiselect
          label="Label text"
          checked={checked}
          onClick={() => setChecked(!checked)}
        />
        <DropdownItemDivider />
        <DropdownItemAction
          label="Delete"
          variant="danger"
          startIcon={<i className="fa-solid fa-trash" aria-hidden="true" />}
        />
      </Dropdown>
    );
  },
  play: async ({ userEvent }) => {
    // The menu is portaled to document.body via FloatingPortal, so use screen.
    const expandable = screen.getByRole('menuitem', { name: 'Expand' });
    await userEvent.click(expandable);
    await expect(expandable).toHaveAttribute('aria-expanded', 'true');
    // Two menus should exist: the parent panel and the portaled submenu.
    await waitFor(() => {
      expect(document.querySelectorAll('[role="menu"]').length).toBe(2);
    });
  },
};

/** Nav-pill trigger variant — a compact pill-shaped button typically used in navigation bars. */
export const NavPill: Story = {
  args: { variant: 'nav-pill' },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownItemAction label="Action item" />
      <DropdownItemAction label="Action item" />
    </Dropdown>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Label' });
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

/** RTL layout test — verifies the trigger and open menu mirror correctly in a right-to-left context. */
export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  args: { defaultOpen: true },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownItemHeader label="Dropdown header" />
      <DropdownItemDivider />
      <DropdownItemAction label="Action item" />
      <DropdownItemExpandable label="Expand">
        <DropdownItemAction label="Sub action" />
      </DropdownItemExpandable>
    </Dropdown>
  ),
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};

// ── Shared helpers — also used by DropdownMenu/placement stories below ────────

// Minimal items reused inside showcase Dropdowns.
const triggerItems = (
  <>
    <DropdownItemAction label="Action item" />
    <DropdownItemAction label="Action item" />
    <DropdownItemAction label="Action item" />
  </>
);

const showcaseInlineStyle = {
  display: 'flex' as const,
  gap: 'var(--mds-spacing-sm)',
  flexWrap: 'wrap' as const,
  alignItems: 'center' as const,
};

// ── DropdownMenu stories ──────────────────────────────────────────────────────

/**
 * The `placement` prop accepts any Floating UI `Placement` value. `flip()`
 * inverts to the opposite side automatically when there is insufficient space,
 * so `top-start` becomes `bottom-start` when near the top of the viewport.
 */
export const PlacementVariants: Story = {
  name: 'Placement variants',
  parameters: {
    ...showcaseParameters,
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{ blockSize: '14rem', display: 'flex', alignItems: 'center' }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ ...showcaseInlineStyle }}>
      <Dropdown label="Drop up" placement="top-start">
        {triggerItems}
      </Dropdown>
      <Dropdown label="Drop end" placement="right-start">
        {triggerItems}
      </Dropdown>
      <Dropdown label="Drop start" placement="left-start">
        {triggerItems}
      </Dropdown>
    </div>
  ),
  play: async ({ canvas }) => {
    const triggers = canvas.getAllByRole('button');
    for (const trigger of triggers) {
      await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    }
  },
};

/** Flat and grouped menu panel layouts side by side. */
export const MenuVariants: Story = {
  name: 'Menu variants',
  parameters: showcaseParameters,
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--mds-spacing-md)',
        alignItems: 'flex-start',
      }}
    >
      <DropdownMenu aria-label="Flat list">
        <DropdownItemAction label="Action item" />
        <DropdownItemAction label="Action item" />
        <DropdownItemAction label="Action item" />
      </DropdownMenu>
      <DropdownMenu aria-label="Grouped list">
        <DropdownItemHeader label="Dropdown header" />
        <DropdownItemDivider />
        <DropdownItemAction label="Action item" />
        <DropdownItemAction label="Action item" />
        <DropdownItemAction label="Action item" />
      </DropdownMenu>
    </div>
  ),
  play: async ({ canvas }) => {
    const menus = canvas.getAllByRole('menu');
    await expect(menus).toHaveLength(2);
    for (const menu of menus) await expect(menu).toBeVisible();
  },
};

/**
 * `sameWidth` makes the menu panel at least as wide as the trigger.
 * Useful when the trigger label is wider than the default 217 px minimum.
 */
export const SameWidth: Story = {
  name: 'Same width as trigger',
  args: {
    label: 'A longer trigger label',
    defaultOpen: true,
    sameWidth: true,
  },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownItemAction label="Action item" />
      <DropdownItemAction label="Action item" />
    </Dropdown>
  ),
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', {
      name: 'A longer trigger label',
    });
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};
