import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import { Dropdown } from './Dropdown';
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

const meta = {
  title: 'Components/Dropdown/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  decorators: [menuRoomDecorator],
  tags: ['autodocs', 'test', 'beta'],
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
      control: { type: 'select' },
      options: ['emphasis', 'default', 'subtle'],
      description: 'Trigger appearance.',
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
    defaultOpen: {
      control: { type: 'boolean' },
      description: 'Initial open state for uncontrolled usage.',
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
    await expect(canvas.getByRole('menu')).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await waitFor(async () => {
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  },
};

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
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('menu')).toBeVisible();
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
    await userEvent.click(
      canvas.getByRole('menuitemradio', { name: 'Option B' }),
    );
    // The selected option's label is now displayed on the trigger.
    await expect(
      canvas.getByRole('button', { name: 'Option B' }),
    ).toBeVisible();
  },
};

export const MixedItems: Story = {
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
          onCheckedChange={setChecked}
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
  play: async ({ canvas, userEvent }) => {
    const expandable = canvas.getByRole('menuitem', { name: 'Expand' });
    await userEvent.click(expandable);
    await expect(expandable).toHaveAttribute('aria-expanded', 'true');
    // The submenu is portaled to document.body, outside the story canvas.
    await expect(
      document.querySelector('.mds-dropdown-item__submenu'),
    ).not.toBeNull();
  },
};

export const NavPill: Story = {
  args: { variant: 'nav-pill' },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownItemAction label="Action item" />
      <DropdownItemAction label="Action item" />
    </Dropdown>
  ),
};

export const RightToLeft: Story = {
  tags: ['test', 'beta'],
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
