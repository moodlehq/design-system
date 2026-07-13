import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect } from 'storybook/test';
import { Checkbox } from '../checkbox';
import { Choicebox } from '../choicebox';
import { DropdownMenu } from './Dropdown';
import {
  DropdownItemAction,
  DropdownItemCustom,
  DropdownItemDivider,
  DropdownItemExpandable,
  DropdownItemSelect,
} from './DropdownItem';

const meta = {
  title: 'Components/Dropdown/DropdownItem/Custom',
  component: DropdownItemCustom,
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
} satisfies Meta<typeof DropdownItemCustom>;
export default meta;

type Story = StoryObj<typeof meta>;

/** An escape-hatch slot for bespoke item content not covered by the typed variants. */
export const Default: Story = {
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

/**
 * Slot pattern for checkbox and radio inputs. Place a `Checkbox` inside
 * `DropdownItemCustom` for multi-select rows, or `Choicebox` for single-select.
 * Each component owns its own accessible name — no bespoke wrapper needed.
 *
 * Prefer `DropdownItemMultiselect` or `DropdownItemSelect` for the standard
 * menu patterns. Use this slot only when you need the full prop surface of
 * the underlying form control.
 */
export const CustomSlot: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' as const } },
  },
  render: function CustomSlotStory() {
    const [checkedA, setCheckedA] = useState(false);
    const [checkedB, setCheckedB] = useState(true);
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Multi-select: Checkbox inside the custom slot */}
        <DropdownItemCustom>
          <Checkbox
            label="Enable feature A"
            checked={checkedA}
            onChange={(e) => setCheckedA(e.target.checked)}
          />
        </DropdownItemCustom>
        <DropdownItemCustom>
          <Checkbox
            label="Enable feature B"
            checked={checkedB}
            onChange={(e) => setCheckedB(e.target.checked)}
          />
        </DropdownItemCustom>
        <DropdownItemDivider />
        {/* Single-select: Choicebox (radio) group inside the custom slot */}
        <DropdownItemCustom>
          <Choicebox label="Option A" name="custom-slot-group" value="a" />
        </DropdownItemCustom>
        <DropdownItemCustom>
          <Choicebox
            label="Option B"
            name="custom-slot-group"
            value="b"
            defaultChecked
          />
        </DropdownItemCustom>
      </div>
    );
  },
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes[0]).not.toBeChecked();
    await expect(checkboxes[1]).toBeChecked();
    const radios = canvas.getAllByRole('radio');
    await expect(radios).toHaveLength(2);
  },
};

/**
 * RTL layout test covering action, select, and expandable items together.
 * Verifies that CSS logical properties mirror correctly in a right-to-left context.
 */
export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  render: () => (
    <DropdownMenu>
      <DropdownItemAction
        label="Action item"
        startIcon={<i className="fa-solid fa-face-smile" aria-hidden="true" />}
      />
      <DropdownItemSelect label="Selectable" selected />
      <DropdownItemExpandable label="Expand">
        <DropdownItemAction label="Sub action" />
      </DropdownItemExpandable>
    </DropdownMenu>
  ),
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};
