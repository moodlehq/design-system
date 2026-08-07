import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, screen, waitFor } from 'storybook/test';
import { Dropdown, DropdownMenu } from './Dropdown';
import { DropdownItemAction } from './DropdownItemAction';
import { DropdownItemDivider } from './DropdownItemDivider';
import { DropdownItemExpandable } from './DropdownItemExpandable';
import { DropdownItemHeader } from './DropdownItemHeader';
import { DropdownItemList } from './DropdownItemList';
import { DropdownItemMultiselect } from './DropdownItemMultiselect';
import { DropdownItemSelect } from './DropdownItemSelect';

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

const iconMapping = {
  Smile: <i className="fa-solid fa-face-smile" aria-hidden="true" />,
  Gear: <i className="fa-solid fa-gear" aria-hidden="true" />,
  Trash: <i className="fa-solid fa-trash" aria-hidden="true" />,
  Plus: <i className="fa-solid fa-plus" aria-hidden="true" />,
};

const meta = {
  title: 'Components/Dropdown/Dropdown',
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
    open: {
      if: { arg: 'variant', eq: 'button' },
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    iconOnly: {
      // icon-only mode is not supported for nav-pill.
      if: { arg: 'variant', eq: 'button' },
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
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
    matchTriggerWidth: {
      control: { type: 'boolean' },
      description:
        'When true, the menu will match lengthy trigger buttons. Note: This only applies to top/bottom placements, not left/right placements.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    startIcon: {
      description:
        'Leading icon in the trigger button. Accepts only intrinsic `<i>` or `<svg>` elements.',
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      control: { type: 'select' },
    },
    placement: {
      control: { type: 'select' },
      options: [
        'bottom-start',
        'bottom-end',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'left-start',
        'left-end',
      ],
      description:
        'Menu placement relative to the trigger. `flip()` mirrors to the opposite side when space is insufficient.',
      table: {
        type: {
          summary:
            'bottom-start | bottom-end | top-start | top-end | right-start | right-end | left-start | left-end',
        },
        defaultValue: { summary: 'bottom-start' },
      },
    },
    allowPlacementFlip: {
      control: { type: 'boolean' },
      description:
        'When false, keeps the requested placement when the available space is constrained.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'true' },
      },
    },
    children: {
      control: { disable: true },
      description:
        'Dropdown menu items. Use `DropdownItem*` components within the dropdown.',
      table: {
        type: {
          summary:
            'DropdownItemAction |DropdownItemCustom | DropdownItemDivider | DropdownItemExpandable | DropdownItemGroup | DropdownItemHeader | DropdownItemMultiselect | DropdownItemSelect',
        },
      },
    },
  },
  args: {
    label: 'Label',
    variant: 'button',
    appearance: 'default',
    size: 'md',
    startIcon: undefined,
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
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownItemHeader label="Dropdown header" />
      <DropdownItemDivider />
      <DropdownItemAction label="Action item" />
      <DropdownItemAction label="Action item" />
    </Dropdown>
  ),
  play: async () => {
    // The menu is portaled to document.body via FloatingPortal, so use screen.
    await expect(screen.getByRole('menu')).toBeVisible();
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
  parameters: {
    ...showcaseParameters,
    chromatic: { pauseAnimationAtEnd: true },
  },
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
        <DropdownItemList
          label="One long list item label for testing"
          variant="done"
        />
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
  args: { defaultOpen: true, label: 'تسمية' },
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownItemHeader label="رأس القائمة" />
      <DropdownItemDivider />
      <DropdownItemAction label="عنصر إجراء" />
      <DropdownItemExpandable label="توسيع">
        <DropdownItemAction label="إجراء فرعي" />
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
    chromatic: { pauseAnimationAtEnd: true },
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
      <Dropdown label="Open bottom (start)" placement="bottom-start">
        {triggerItems}
      </Dropdown>
      <Dropdown label="Open bottom (end)" placement="bottom-end">
        {triggerItems}
      </Dropdown>
      <Dropdown label="Open top (start)" placement="top-start">
        {triggerItems}
      </Dropdown>
      <Dropdown label="Open top (end)" placement="top-end">
        {triggerItems}
      </Dropdown>
      <Dropdown label="Open right (start)" placement="right-start">
        {triggerItems}
      </Dropdown>
      <Dropdown label="Open right (end)" placement="right-end">
        {triggerItems}
      </Dropdown>
      <Dropdown label="Open left (start)" placement="left-start">
        {triggerItems}
      </Dropdown>
      <Dropdown label="Open left (end)" placement="left-end">
        {triggerItems}
      </Dropdown>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const triggers = canvas.getAllByRole('button');
    for (const trigger of triggers) {
      await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await userEvent.click(trigger);
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      // The menu is portaled to document.body via FloatingPortal, so use screen.
      await expect(screen.getByRole('menu')).toBeVisible();
      await userEvent.keyboard('{Escape}');
      await waitFor(async () => {
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      });
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
 * `matchTriggerWidth` makes the menu panel at least as wide as the trigger.
 * Useful when the trigger label is wider than the default 217 px minimum.
 */
export const MatchTriggerWidth: Story = {
  name: 'Match trigger width',
  parameters: showcaseParameters,
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--mds-spacing-md)',
        alignItems: 'flex-start',
      }}
    >
      <Dropdown
        label="A longer matched trigger label"
        defaultOpen={true}
        matchTriggerWidth={true}
      >
        <DropdownItemAction label="Action item" />
        <DropdownItemAction label="Action item" />
      </Dropdown>
      <Dropdown
        label="A longer standard trigger label"
        defaultOpen={true}
        matchTriggerWidth={false}
      >
        <DropdownItemAction label="Action item" />
        <DropdownItemAction label="Action item" />
      </Dropdown>
    </div>
  ),
  play: async ({ canvas }) => {
    const triggers = canvas.getAllByRole('button');
    for (const trigger of triggers) {
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    }
  },
};
