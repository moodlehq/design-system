import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect } from 'storybook/test';
import { Dropdown } from './Dropdown.js';
import { DropdownItemAction } from './DropdownItemAction.js';
import { DropdownItemDivider } from './DropdownItemDivider.js';
import { DropdownItemHeader } from './DropdownItemHeader.js';
import { DropdownTrigger } from './DropdownTrigger.js';

const iconMapping = {
  Smile: <i className="fa-solid fa-face-smile" aria-hidden="true" />,
  Gear: <i className="fa-solid fa-gear" aria-hidden="true" />,
  Trash: <i className="fa-solid fa-trash" aria-hidden="true" />,
  Plus: <i className="fa-solid fa-plus" aria-hidden="true" />,
};

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

const rtlTriggerItems = (
  <>
    <DropdownItemHeader label="رأس القائمة" />
    <DropdownItemDivider />
    <DropdownItemAction label="عنصر إجراء" />
    <DropdownItemAction label="عنصر إجراء" />
    <DropdownItemAction label="عنصر إجراء" />
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
      table: {
        type: { summary: 'button | nav-pill' },
        defaultValue: { summary: 'button' },
      },
    },
    appearance: {
      // nav-pill is constrained to a single appearance by design — hide the
      // control so consumers don't try values that have no effect.
      if: { arg: 'variant', eq: 'button' },
      control: { type: 'select' },
      options: ['emphasis', 'default', 'subtle'],
      table: {
        type: { summary: 'emphasis | default | subtle' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      // nav-pill is constrained to md by design.
      if: { arg: 'variant', eq: 'button' },
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      // Internal implementation detail — not a consumer-facing prop.
      table: { disable: true },
    },
    open: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    iconOnly: {
      // icon-only mode is not supported for nav-pill.
      if: { arg: 'variant', eq: 'button' },
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    startIcon: {
      // icon-only mode is not supported for nav-pill.
      if: { arg: 'variant', eq: 'button' },
      description:
        'Leading icon. Accepts only intrinsic `<i>` or `<svg>` elements.',
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      control: { type: 'select' },
    },
  },
  args: {
    label: 'Label',
    variant: 'button',
    appearance: 'default',
    size: 'md',
    startIcon: undefined,
    iconOnly: false,
    open: false,
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
  render: function DefaultStory(args) {
    const [{ open }, updateArgs] = useArgs<typeof args>();
    return (
      <DropdownTrigger
        {...args}
        open={open}
        onClick={() => updateArgs({ open: !open })}
      />
    );
  },
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
  parameters: {
    ...showcaseParameters,
    chromatic: { pauseAnimationAtEnd: true },
  },
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
        <Dropdown label="Med + icon" size="md" startIcon={iconMapping.Smile}>
          {triggerItems}
        </Dropdown>
        <Dropdown label="Small + icon" size="sm" startIcon={iconMapping.Smile}>
          {triggerItems}
        </Dropdown>
        <Dropdown label="Large" size="lg">
          {triggerItems}
        </Dropdown>
        <Dropdown label="Large + icon" size="lg" startIcon={iconMapping.Smile}>
          {triggerItems}
        </Dropdown>
      </div>
      {/* Special states */}
      <div style={showcaseInlineStyle}>
        <Dropdown label="Open" defaultOpen>
          {triggerItems}
        </Dropdown>
        <DropdownTrigger label="Disabled" disabled />
        <Dropdown label="Open menu" startIcon={iconMapping.Gear} iconOnly>
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

const largeAppearances = ['emphasis', 'default', 'subtle'] as const;

/**
 * Every appearance at `lg`, closed, with an icon, open and disabled.
 * The open-state overrides in dropdown.css are keyed on appearance, not size,
 * so this matrix is what gives Chromatic coverage of open × appearance at lg.
 * Open and disabled cells render a bare DropdownTrigger with `open` so the
 * `--open` class is applied without three menus overlapping the snapshot.
 */
export const LargeTriggers: Story = {
  name: 'Large triggers',
  parameters: showcaseParameters,
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--mds-spacing-md)',
      }}
    >
      {largeAppearances.map((appearance) => (
        <div key={appearance} style={showcaseInlineStyle}>
          <DropdownTrigger
            label={`${appearance} closed`}
            appearance={appearance}
            size="lg"
          />
          <DropdownTrigger
            label={`${appearance} icon`}
            appearance={appearance}
            size="lg"
            startIcon={iconMapping.Smile}
          />
          <DropdownTrigger
            label={`${appearance} open`}
            appearance={appearance}
            size="lg"
            open
          />
          <DropdownTrigger
            label={`${appearance} disabled`}
            appearance={appearance}
            size="lg"
            disabled
          />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    for (const appearance of largeAppearances) {
      await expect(
        canvas.getByRole('button', { name: `${appearance} closed` }),
      ).toHaveAttribute('aria-expanded', 'false');
      await expect(
        canvas.getByRole('button', { name: `${appearance} open` }),
      ).toHaveAttribute('aria-expanded', 'true');
      await expect(
        canvas.getByRole('button', { name: `${appearance} disabled` }),
      ).toBeDisabled();
    }
  },
};

export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  parameters: {
    ...showcaseParameters,
    chromatic: { pauseAnimationAtEnd: true },
  },
  render: () => (
    <div dir="rtl" style={showcaseInlineStyle}>
      <Dropdown label="تسمية" startIcon={iconMapping.Smile}>
        {rtlTriggerItems}
      </Dropdown>
      <Dropdown label="مفتوح" defaultOpen>
        {rtlTriggerItems}
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
