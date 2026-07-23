import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { DropdownMenu } from './Dropdown';
import {
  DropdownItemAction,
  DropdownItemDivider,
  DropdownItemGroup,
  DropdownItemHeader,
} from './DropdownItem';

const showcaseParameters = {
  controls: { disable: true },
  docs: { canvas: { sourceState: 'none' as const } },
} as const;

const meta = {
  title: 'Components/Dropdown/DropdownItem/Group',
  component: DropdownItemGroup,
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
        'Section label rendered as visible text and used as the accessible name via aria-labelledby.',
    },
  },
  args: {
    label: 'Section',
  },
} satisfies Meta<typeof DropdownItemGroup>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Single configurable group — children are action items for illustration. */
export const Default: Story = {
  render: (args) => (
    <DropdownMenu aria-label="Grouped menu">
      <DropdownItemGroup {...args}>
        <DropdownItemAction label="Action 1" />
        <DropdownItemAction label="Action 2" />
      </DropdownItemGroup>
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    const group = canvas.getByRole('group');
    await expect(group).toHaveAccessibleName('Section');
  },
};

/**
 * Two named groups separated by a divider. `role="group"` ensures AT users
 * hear the group name as they navigate into each section. Prefer
 * `DropdownItemGroup` over a standalone `DropdownItemHeader` beside sibling
 * items — only items that are DOM children of the group element satisfy the
 * ARIA grouping contract.
 */
export const GroupedItems: Story = {
  parameters: showcaseParameters,
  render: () => (
    <DropdownMenu aria-label="Grouped menu">
      <DropdownItemGroup label="Section A">
        <DropdownItemAction label="Action 1" />
        <DropdownItemAction label="Action 2" />
      </DropdownItemGroup>
      <DropdownItemDivider />
      <DropdownItemGroup label="Section B">
        <DropdownItemAction label="Action 3" />
        <DropdownItemAction
          label="Delete"
          variant="danger"
          startIcon={<i className="fa-solid fa-trash" aria-hidden="true" />}
        />
      </DropdownItemGroup>
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    const groups = canvas.getAllByRole('group');
    await expect(groups).toHaveLength(2);
    await expect(groups[0]).toHaveAccessibleName('Section A');
    await expect(groups[1]).toHaveAccessibleName('Section B');
    await expect(groups[0].querySelectorAll('[role="menuitem"]')).toHaveLength(
      2,
    );
    await expect(groups[1].querySelectorAll('[role="menuitem"]')).toHaveLength(
      2,
    );
  },
};

/**
 * `DropdownItemHeader` and `DropdownItemDivider` are the structural primitives
 * for labelling and separating items. Unlike `DropdownItemGroup`, a standalone
 * header does not semantically associate the items below it — use it only for
 * visual labelling when the ARIA grouping contract is not required.
 */
export const HeaderAndDivider: Story = {
  parameters: showcaseParameters,
  render: () => (
    <DropdownMenu>
      <DropdownItemHeader label="Dropdown header" />
      <DropdownItemDivider />
      <DropdownItemAction label="Action item" />
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('group', { name: 'Dropdown header' }),
    ).toBeInTheDocument();
    await expect(canvas.getByRole('separator')).toBeInTheDocument();
  },
};
