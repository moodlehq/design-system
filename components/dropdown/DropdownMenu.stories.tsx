import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import {
  DropdownItemAction,
  DropdownItemDivider,
  DropdownItemHeader,
} from './DropdownItem';
import { DropdownMenu } from './DropdownMenu';

const meta = {
  title: 'Components/Dropdown/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('menu')).toBeVisible();
  },
  tags: ['autodocs', 'test', 'beta'],
  args: {
    'aria-label': 'Example menu',
  },
} satisfies Meta<typeof DropdownMenu>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Flat list — Figma Items=2–3. */
export const FlatList: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownItemAction label="Action item" />
      <DropdownItemAction label="Action item" />
      <DropdownItemAction label="Action item" />
    </DropdownMenu>
  ),
};

/** Grouped list with a header and divider — Figma Items=4+. */
export const GroupedList: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownItemHeader label="Dropdown header" />
      <DropdownItemDivider />
      <DropdownItemAction label="Action item" />
      <DropdownItemAction label="Action item" />
      <DropdownItemAction label="Action item" />
    </DropdownMenu>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownItemHeader label="Dropdown header" />
      <DropdownItemDivider />
      <DropdownItemAction
        label="Download"
        startIcon={<i className="fa-solid fa-download" aria-hidden="true" />}
      />
      <DropdownItemAction
        label="Duplicate"
        startIcon={<i className="fa-solid fa-copy" aria-hidden="true" />}
      />
      <DropdownItemDivider />
      <DropdownItemAction
        label="Delete"
        variant="danger"
        startIcon={<i className="fa-solid fa-trash" aria-hidden="true" />}
      />
    </DropdownMenu>
  ),
};
