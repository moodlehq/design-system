import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Dropdown } from './Dropdown';
import {
  DropdownItemAction,
  DropdownItemDivider,
  DropdownItemHeader,
} from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';

const triggerIconSmile = (
  <i className="fa-solid fa-face-smile" aria-hidden="true" />
);
const triggerIconGear = <i className="fa-solid fa-gear" aria-hidden="true" />;

// Minimal items reused inside trigger-showcase Dropdowns.
const triggerItems = (
  <>
    <DropdownItemHeader label="Dropdown header" />
    <DropdownItemDivider />
    <DropdownItemAction label="Action item" />
    <DropdownItemAction label="Action item" />
    <DropdownItemAction label="Action item" />
  </>
);

const showcaseInlineStyle = {
  display: 'flex' as const,
  gap: 'var(--mds-spacing-sm)',
  flexWrap: 'wrap' as const,
  alignItems: 'center' as const,
};

const showcaseParameters = {
  controls: { disable: true },
  docs: { canvas: { sourceState: 'none' as const } },
} as const;

const meta = {
  title: 'Components/Dropdown/DropdownTrigger',
  component: DropdownTrigger,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    label: { description: 'Trigger label.' },
    variant: {
      control: { type: 'select' },
      options: ['button', 'nav-pill'],
    },
    appearance: {
      // nav-pill is constrained to a single appearance by design — hide the
      // control so consumers don't try values that have no effect.
      if: { arg: 'variant', eq: 'button' },
      control: { type: 'select' },
      options: ['emphasis', 'default', 'subtle'],
    },
    size: {
      // nav-pill is constrained to md by design.
      if: { arg: 'variant', eq: 'button' },
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    open: { control: { type: 'boolean' } },
    iconOnly: {
      // icon-only mode is not supported for nav-pill.
      if: { arg: 'variant', eq: 'button' },
      control: { type: 'boolean' },
    },
  },
  args: {
    label: 'Label',
    variant: 'button',
    appearance: 'default',
    size: 'md',
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ blockSize: '14rem', paddingBlockStart: '2rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownTrigger>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Default trigger — no decoration, outline appearance. */
export const Default: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Label' });
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

/**
 * All trigger appearances, sizes, and icon configurations side-by-side.
 * Use this as the at-a-glance reference for the trigger's visual range.
 */
export const TriggerVariants: Story = {
  name: 'Trigger variants',
  parameters: showcaseParameters,
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--mds-spacing-md)',
      }}
    >
      {/* Appearances */}
      <div style={showcaseInlineStyle}>
        <Dropdown label="Emphasis" appearance="emphasis">
          {triggerItems}
        </Dropdown>
        <Dropdown label="Default" appearance="default">
          {triggerItems}
        </Dropdown>
        <Dropdown label="Subtle" appearance="subtle">
          {triggerItems}
        </Dropdown>
        <Dropdown label="Nav pill" variant="nav-pill">
          {triggerItems}
        </Dropdown>
      </div>
      {/* Sizes + icons */}
      <div style={showcaseInlineStyle}>
        <Dropdown label="Medium" size="md">
          {triggerItems}
        </Dropdown>
        <Dropdown label="Small" size="sm">
          {triggerItems}
        </Dropdown>
        <Dropdown label="Med + icon" size="md" startIcon={triggerIconSmile}>
          {triggerItems}
        </Dropdown>
        <Dropdown label="Small + icon" size="sm" startIcon={triggerIconSmile}>
          {triggerItems}
        </Dropdown>
      </div>
      {/* Special states */}
      <div style={showcaseInlineStyle}>
        <Dropdown label="Open" defaultOpen>
          {triggerItems}
        </Dropdown>
        <DropdownTrigger label="Disabled" disabled />
        <Dropdown label="Open menu" startIcon={triggerIconGear} iconOnly>
          {triggerItems}
        </Dropdown>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const triggers = canvas.getAllByRole('button');
    for (const trigger of triggers) {
      await expect(trigger).toBeVisible();
      await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    }
    await expect(canvas.getByRole('button', { name: 'Open' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await expect(
      canvas.getByRole('button', { name: 'Disabled' }),
    ).toBeDisabled();
  },
};

export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  parameters: showcaseParameters,
  render: () => (
    <div dir="rtl" style={showcaseInlineStyle}>
      <Dropdown label="Label" startIcon={triggerIconSmile}>
        {triggerItems}
      </Dropdown>
      <Dropdown label="Open" defaultOpen>
        {triggerItems}
      </Dropdown>
    </div>
  ),
  play: async ({ canvas }) => {
    const triggers = canvas.getAllByRole('button');
    for (const trigger of triggers) {
      await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    }
  },
};
