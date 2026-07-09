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
  title: 'Components/Dropdown/DropdownItemGroup',
  component: DropdownItemGroup,
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <div>
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
    children: {
      description: 'Dropdown item components to include in this group.',
      control: false,
      table: {
        type: {
          summary:
            'DropdownItemAction |DropdownItemCustom | DropdownItemDivider | DropdownItemExpandable | DropdownItemGroup | DropdownItemHeader | DropdownItemMultiselect | DropdownItemSelect',
        },
      },
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
  parameters: {
    docs: {
      source: {
        code: `<DropdownMenu aria-label="Grouped menu">
  <DropdownItemGroup label="Section">
    <DropdownItemAction label="Action 1" />
    <DropdownItemAction label="Action 2" />
  </DropdownItemGroup>
</DropdownMenu>`,
      },
    },
  },
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
    // DropdownItemHeader renders role="none" — it is a visual label, not a group.
    await expect(canvas.getByText('Dropdown header')).toBeInTheDocument();
    await expect(canvas.getByRole('separator')).toBeInTheDocument();
  },
};

/**
 * Side-by-side comparison of the two labelling patterns. `DropdownItemGroup`
 * wraps its items as DOM children, so Assistive Technology users hear "Section A, group" as
 * they navigate into any item inside it. `DropdownItemHeader` only labels
 * the row itself — the action items below it are DOM siblings, not children,
 * so Assistive Technology users do not hear the section name when navigating into them.
 * Prefer `DropdownItemGroup` whenever the section name should be announced
 * as part of each item's context; use `DropdownItemHeader` + `DropdownItemDivider`
 * only for a visual label with no Assistive Technology-announced association.
 */
export const ComparedToHeaderDivider: Story = {
  parameters: {
    ...showcaseParameters,
    docs: {
      source: {
        code: `// DropdownItemGroup — items are DOM children of role="group",
// so Assistive Technology users hear "Section A" when navigating into them.
<DropdownItemGroup label="Section A">
  <DropdownItemAction label="Action 1" />
  <DropdownItemAction label="Action 2" />
</DropdownItemGroup>
<DropdownItemDivider />
<DropdownItemGroup label="Section B">
  <DropdownItemAction label="Action 3" />
  <DropdownItemAction label="Action 4" />
</DropdownItemGroup>

// DropdownItemHeader + DropdownItemDivider — items are DOM siblings,
// so Assistive Technology users do not hear "Dropdown header" when navigating into them.
<DropdownItemHeader label="Dropdown header" />
<DropdownItemAction label="Action item" />
<DropdownItemAction label="Action item" />
<DropdownItemDivider />
<DropdownItemHeader label="Dropdown header" />
<DropdownItemAction label="Action item" />
<DropdownItemAction label="Action item" />`,
      },
    },
  },
  render: () => (
    <>
      <div
        style={{
          display: 'flex',
          gap: 'var(--mds-spacing-md)',
          alignItems: 'flex-start',
        }}
      >
        <DropdownMenu aria-label="Using DropdownItemGroup">
          <DropdownItemGroup label="Section A">
            <DropdownItemAction label="Action 1" />
            <DropdownItemAction label="Action 2" />
          </DropdownItemGroup>
          <DropdownItemDivider />
          <DropdownItemGroup label="Section B">
            <DropdownItemAction label="Action 3" />
            <DropdownItemAction label="Action 4" />
          </DropdownItemGroup>
        </DropdownMenu>

        <DropdownMenu aria-label="Using DropdownItemHeader and DropdownItemDivider">
          <DropdownItemHeader label="Dropdown header" />
          <DropdownItemAction label="Action item" />
          <DropdownItemAction label="Action item" />
          <DropdownItemDivider />
          <DropdownItemHeader label="Dropdown header" />
          <DropdownItemAction label="Action item" />
          <DropdownItemAction label="Action item" />
        </DropdownMenu>
      </div>
    </>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('group', { name: 'Section A' }),
    ).toBeInTheDocument();
    // DropdownItemHeader renders role="none" — it is a visual label, not a group.
    // Two headers share the same label so getAllByText is required.
    const headers = canvas.getAllByText('Dropdown header');
    await expect(headers).toHaveLength(2);
  },
};
