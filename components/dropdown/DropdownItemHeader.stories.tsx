import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { DropdownMenu } from './Dropdown';
import { DropdownItemAction, DropdownItemHeader } from './DropdownItem';

const meta = {
  title: 'Components/Dropdown/DropdownItemHeader',
  component: DropdownItemHeader,
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
      description:
        'Visible label text. Must be a caller-supplied translated string.',
    },
  },
  args: {
    label: 'Section',
  },
} satisfies Meta<typeof DropdownItemHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A non-interactive section label. Prefer `DropdownItemGroup` instead when
 * Assistive Technology users should hear the section name as they navigate into its items —
 * see `DropdownItemGroup` stories for the side-by-side comparison.
 */
export const Default: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownItemHeader {...args} />
      <DropdownItemAction label="Action item" />
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    // DropdownItemHeader renders role="none" — it is a visual label, not a group.
    await expect(canvas.getByText('Section')).toBeInTheDocument();
  },
};
