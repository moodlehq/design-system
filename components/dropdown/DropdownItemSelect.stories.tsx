import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import { expect, screen } from 'storybook/test';
import { DropdownMenu } from './Dropdown';
import { DropdownItemSelect } from './DropdownItem';

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
  title: 'Components/Dropdown/DropdownItemSelect',
  component: DropdownItemSelect,
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ blockSize: '14rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    label: {
      description: 'Visible label text.',
    },
    selected: {
      control: { type: 'boolean' },
      description:
        'Selected state. Only one item in the group should be selected at a time — selection logic is controlled by the consumer.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Optional secondary line below the label.',
    },
    startIcon: {
      description:
        'Leading icon. Accepts only intrinsic `<i>` or `<svg>` elements.',
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      control: { type: 'select' },
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
    label: 'Select item',
    selected: false,
    startIcon: undefined,
    disabled: false,
  },
} satisfies Meta<typeof DropdownItemSelect>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Single configurable select item — click the item or use the controls panel to toggle selected, description, and disabled. */
export const Default: Story = {
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
  render: function DefaultStory(args) {
    const [{ selected }, updateArgs] = useArgs<typeof args>();

    return (
      <DropdownMenu>
        <DropdownItemSelect
          {...args}
          selected={selected}
          onClick={() => {
            updateArgs({ selected: !selected });
          }}
        />
      </DropdownMenu>
    );
  },
  play: async () => {
    const item = screen.getByRole('menuitemradio');
    await expect(item).toBeVisible();
    // Default state must advertise unchecked to AT.
    await expect(item).toHaveAttribute('aria-checked', 'false');
  },
};

/**
 * Single-select group. Only one item should be selected at a time (radio-like
 * semantics controlled by the consumer). Selecting an item typically also
 * closes the menu.
 */
export const SelectVariants: Story = {
  parameters: {
    ...showcaseParameters,
    chromatic: { pauseAnimationAtEnd: true },
  },
  render: function SelectVariantsStory() {
    const [selected, setSelected] = useState(true);
    return (
      <DropdownMenu>
        <DropdownItemSelect
          label="Selected"
          selected={selected}
          onClick={() => setSelected(!selected)}
        />
        <DropdownItemSelect label="Unselected" selected={false} />
        <DropdownItemSelect
          label="With description"
          description="Description goes here"
          selected={false}
        />
      </DropdownMenu>
    );
  },
  play: async ({ userEvent }) => {
    const items = screen.getAllByRole('menuitemradio');
    await expect(items[0]).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(items[0]);
    await expect(items[0]).toHaveAttribute('aria-checked', 'false');
  },
};

/**
 * Disabled states — selected and unselected. Both rows are non-interactive;
 * the check placeholder remains in the DOM so column widths stay consistent.
 */
export const DisabledState: Story = {
  name: 'Disabled state',
  parameters: {
    ...showcaseParameters,
    chromatic: { pauseAnimationAtEnd: true },
  },
  render: () => (
    <DropdownMenu>
      <DropdownItemSelect label="Disabled selected" selected disabled />
      <DropdownItemSelect label="Disabled unselected" disabled />
    </DropdownMenu>
  ),
  play: async () => {
    const items = screen.getAllByRole('menuitemradio');
    await expect(items[0]).toHaveAttribute('aria-disabled', 'true');
    await expect(items[0]).toHaveAttribute('aria-checked', 'true');
    await expect(items[1]).toHaveAttribute('aria-disabled', 'true');
    await expect(items[1]).toHaveAttribute('aria-checked', 'false');
  },
};
