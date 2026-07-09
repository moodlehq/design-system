import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect } from 'storybook/test';
import {
  DropdownItemAction,
  DropdownItemCustom,
  DropdownItemDivider,
  DropdownItemExpandable,
  DropdownItemHeader,
  DropdownItemMultiselect,
  DropdownItemSelect,
} from './DropdownItem';

const itemWidthDecorator = (Story: React.ComponentType) => (
  <div style={{ inlineSize: '12.9375rem' }}>
    <Story />
  </div>
);

const meta = {
  title: 'Components/Dropdown/DropdownItem',
  component: DropdownItemAction,
  parameters: {
    layout: 'centered',
  },
  decorators: [itemWidthDecorator],
  tags: ['autodocs', 'test', 'beta'],
  argTypes: {
    label: {
      description: 'Item label.',
      table: { defaultValue: { summary: '' } },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'danger'],
      description: 'default (neutral) or danger (destructive) styling.',
      table: {
        type: { summary: 'default | danger' },
        defaultValue: { summary: 'default' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Optional secondary line below the label.',
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
    label: 'Action item',
    variant: 'default',
    disabled: false,
  },
} satisfies Meta<typeof DropdownItemAction>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Action: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('menuitem')).toBeVisible();
  },
};

export const ActionWithIcon: Story = {
  args: {
    startIcon: <i className="fa-solid fa-face-smile" aria-hidden="true" />,
  },
};

export const ActionWithDescription: Story = {
  args: { description: 'Description goes here' },
};

export const ActionDanger: Story = {
  args: {
    label: 'Delete',
    variant: 'danger',
    startIcon: <i className="fa-solid fa-trash" aria-hidden="true" />,
  },
};

export const ActionDisabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('menuitem')).toBeDisabled();
  },
};

export const Select: StoryObj = {
  render: function SelectStory() {
    const [selected, setSelected] = useState(true);
    return (
      <DropdownItemSelect
        label="Selectable"
        selected={selected}
        onClick={() => setSelected(!selected)}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const item = canvas.getByRole('menuitemradio');
    await expect(item).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(item);
    await expect(item).toHaveAttribute('aria-checked', 'false');
  },
};

export const SelectWithDescription: StoryObj = {
  render: () => (
    <DropdownItemSelect
      label="Selectable"
      description="Description goes here"
      selected
    />
  ),
};

export const Expandable: StoryObj = {
  render: () => (
    <DropdownItemExpandable label="Expand">
      <DropdownItemAction label="Sub action 1" />
      <DropdownItemAction label="Sub action 2" />
      <DropdownItemAction label="Sub action 3" />
    </DropdownItemExpandable>
  ),
  play: async ({ canvas, userEvent }) => {
    const item = canvas.getByRole('menuitem', { name: 'Expand' });
    await expect(item).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(item);
    await expect(item).toHaveAttribute('aria-expanded', 'true');
    // The submenu is portaled to document.body, outside the story canvas.
    await expect(
      document.querySelector('.mds-dropdown-item__submenu'),
    ).not.toBeNull();
    await userEvent.keyboard('{Escape}');
    await expect(item).toHaveAttribute('aria-expanded', 'false');
  },
};

export const Multiselect: StoryObj = {
  render: function MultiselectStory() {
    const [checked, setChecked] = useState(false);
    return (
      <DropdownItemMultiselect
        label="Label text"
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const item = canvas.getByRole('menuitemcheckbox');
    await expect(item).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(item);
    await expect(item).toHaveAttribute('aria-checked', 'true');
  },
};

export const HeaderAndDivider: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--mds-spacing-xxs)',
      }}
    >
      <DropdownItemHeader label="Dropdown header" />
      <DropdownItemDivider />
      <DropdownItemAction label="Action item" />
    </div>
  ),
};

export const Custom: StoryObj = {
  render: () => (
    <DropdownItemCustom>
      <span
        style={{
          fontSize: 'var(--mds-font-size-paragraph-small)',
          color: 'var(--mds-text-subtle)',
        }}
      >
        Custom slot content
      </span>
    </DropdownItemCustom>
  ),
};

export const RightToLeft: StoryObj = {
  tags: ['test', 'beta'],
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--mds-spacing-xxs)',
      }}
    >
      <DropdownItemAction
        label="Action item"
        startIcon={<i className="fa-solid fa-face-smile" aria-hidden="true" />}
      />
      <DropdownItemSelect label="Selectable" selected />
      <DropdownItemExpandable label="Expand">
        <DropdownItemAction label="Sub action" />
      </DropdownItemExpandable>
    </div>
  ),
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};
