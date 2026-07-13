import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect } from 'storybook/test';
import { DropdownMenu } from './Dropdown';
import { DropdownItemMultiselect } from './DropdownItem';

const showcaseParameters = {
  controls: { disable: true },
  docs: { canvas: { sourceState: 'none' as const } },
} as const;

const meta = {
  title: 'Components/Dropdown/DropdownItem/Multiselect',
  component: DropdownItemMultiselect,
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
      description: 'Visible label text.',
    },
    checked: {
      control: { type: 'boolean' },
      description:
        'Checked state. Each item toggles independently without closing the menu.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
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
    label: 'Option',
    checked: false,
    disabled: false,
  },
} satisfies Meta<typeof DropdownItemMultiselect>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Single configurable multiselect item — use the controls panel to toggle checked, description, and disabled. */
export const Default: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownItemMultiselect {...args} />
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    const item = canvas.getByRole('menuitemcheckbox');
    await expect(item).toBeVisible();
    // Default state must advertise unchecked to AT.
    await expect(item).toHaveAttribute('aria-checked', 'false');
  },
};

/**
 * Multiple items with independent checked state. Unlike `DropdownItemSelect`,
 * each item toggles without affecting others and without closing the menu.
 */
export const MultiselectVariants: Story = {
  parameters: showcaseParameters,
  render: function MultiselectVariantsStory() {
    const [checkedA, setCheckedA] = useState(false);
    const [checkedB, setCheckedB] = useState(true);
    const [checkedC, setCheckedC] = useState(false);
    return (
      <DropdownMenu>
        <DropdownItemMultiselect
          label="Option A"
          checked={checkedA}
          onClick={() => setCheckedA(!checkedA)}
        />
        <DropdownItemMultiselect
          label="Option B"
          checked={checkedB}
          onClick={() => setCheckedB(!checkedB)}
        />
        <DropdownItemMultiselect label="Disabled" checked disabled />
        <DropdownItemMultiselect
          label="With description"
          description="Secondary line"
          checked={checkedC}
          onClick={() => setCheckedC(!checkedC)}
        />
      </DropdownMenu>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const items = canvas.getAllByRole('menuitemcheckbox');
    await expect(items).toHaveLength(4);
    await expect(items[0]).toHaveAttribute('aria-checked', 'false');
    await expect(items[1]).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(items[0]);
    await expect(items[0]).toHaveAttribute('aria-checked', 'true');
  },
};
