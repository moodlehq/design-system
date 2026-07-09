import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { DropdownMenu } from './Dropdown';
import { DropdownItemAction, DropdownItemDivider } from './DropdownItem';

const meta = {
  title: 'Components/Dropdown/DropdownItemDivider',
  component: DropdownItemDivider,
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ inlineSize: '12.9375rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs', 'test', 'stable'],
  args: {},
} satisfies Meta<typeof DropdownItemDivider>;
export default meta;

type Story = StoryObj<typeof meta>;

/** A horizontal rule separating groups of items. */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<DropdownMenu>
  <DropdownItemAction label="Action 1" />
  <DropdownItemDivider />
  <DropdownItemAction label="Action 2" />
</DropdownMenu>`,
      },
    },
  },
  render: () => (
    <DropdownMenu>
      <DropdownItemAction label="Action 1" />
      <DropdownItemDivider />
      <DropdownItemAction label="Action 2" />
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('separator')).toBeInTheDocument();
  },
};
