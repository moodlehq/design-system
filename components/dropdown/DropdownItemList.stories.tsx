import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen } from 'storybook/test';
import { DropdownMenu } from './Dropdown';
import { DropdownItemList } from './DropdownItemList';

const meta = {
  title: 'Components/Dropdown/DropdownItemList',
  component: DropdownItemList,
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
    variant: {
      control: { type: 'select' },
      description: 'Visual variant of the item.',
      options: ['todo', 'done'],
      table: {
        type: { summary: 'todo | done' },
        defaultValue: { summary: 'todo' },
      },
    },
  },
  args: {
    label: 'List item',
    variant: 'todo',
  },
} satisfies Meta<typeof DropdownItemList>;
export default meta;

type Story = StoryObj<typeof meta>;

/** List item in todo state — shows empty circle indicator. */
export const Default: Story = {
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
  render: function DefaultStory(args) {
    return (
      <DropdownMenu>
        <DropdownItemList {...args} />
      </DropdownMenu>
    );
  },
  play: async () => {
    const item = screen.getByRole('menuitemradio');
    await expect(item).toBeVisible();
  },
};

/** List item in done state — shows filled check indicator. */
export const Done: Story = {
  args: {
    variant: 'done',
  },
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
  render: function DoneStory(args) {
    return (
      <DropdownMenu>
        <DropdownItemList {...args} />
      </DropdownMenu>
    );
  },
  play: async () => {
    const item = screen.getByRole('menuitemradio');
    await expect(item).toBeVisible();
  },
};
