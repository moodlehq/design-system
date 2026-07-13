import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { DropdownMenu } from './Dropdown';
import { DropdownItemAction } from './DropdownItem';

const showcaseParameters = {
  controls: { disable: true },
  docs: { canvas: { sourceState: 'none' as const } },
} as const;

const meta = {
  title: 'Components/Dropdown/DropdownItem/Action',
  component: DropdownItemAction,
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
      description: 'Visible label text.',
    },
    href: {
      control: { type: 'text' },
      description:
        'When provided the item renders as an `<a>` element. Omit to render as a `<button>`.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    variant: {
      // Only meaningful for button rendering — hide when an href is provided.
      if: { arg: 'href', truthy: false },
      control: { type: 'select' },
      options: ['default', 'danger'],
      description:
        'default (neutral) or danger (destructive) styling. Only applies when rendering as a `<button>`.',
      table: {
        type: { summary: 'default | danger' },
        defaultValue: { summary: 'default' },
      },
    },
    target: {
      // Only meaningful when href is set.
      if: { arg: 'href', truthy: true },
      control: { type: 'text' },
      description:
        'Link target (e.g. `_blank`). Only applies when `href` is provided.',
      table: { type: { summary: 'string' } },
    },
    rel: {
      // Only meaningful when href is set.
      if: { arg: 'href', truthy: true },
      control: { type: 'text' },
      description:
        'Link relationship (e.g. `noopener noreferrer`). Only applies when `href` is provided.',
      table: { type: { summary: 'string' } },
    },
    description: {
      control: { type: 'text' },
      description: 'Optional secondary line below the label.',
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
    label: 'Action item',
    variant: 'default',
    disabled: false,
  },
} satisfies Meta<typeof DropdownItemAction>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Single configurable action item — use the controls panel to explore label, variant, description, and disabled. */
export const Default: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownItemAction {...args} />
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    const item = canvas.getByRole('menuitem');
    await expect(item).toBeVisible();
    // Default state must not carry aria-disabled.
    await expect(item).not.toHaveAttribute('aria-disabled');
  },
};

/** All action-item configurations side by side: icon, description, danger, disabled. */
export const ActionVariants: Story = {
  parameters: showcaseParameters,
  render: () => (
    <DropdownMenu>
      <DropdownItemAction label="Action item" />
      <DropdownItemAction
        label="With icon"
        startIcon={<i className="fa-solid fa-face-smile" aria-hidden="true" />}
      />
      <DropdownItemAction
        label="With description"
        description="Secondary line"
      />
      <DropdownItemAction
        label="Delete"
        variant="danger"
        startIcon={<i className="fa-solid fa-trash" aria-hidden="true" />}
      />
      <DropdownItemAction label="Disabled" disabled />
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('menuitem');
    await expect(items).toHaveLength(5);
    // Disabled item uses aria-disabled (not native disabled) so it remains
    // focusable and is announced as unavailable by AT.
    await expect(items[items.length - 1]).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  },
};

/**
 * Danger variant full matrix — default, with description, and disabled.
 * The disabled danger item uses `text.danger-disabled` (a lighter tint) rather
 * than `text.muted`, distinguishing it from a disabled default-variant item.
 */
export const DangerVariants: Story = {
  name: 'Danger variants',
  parameters: showcaseParameters,
  render: () => (
    <DropdownMenu>
      <DropdownItemAction
        label="Delete course"
        variant="danger"
        startIcon={<i className="fa-solid fa-trash" aria-hidden="true" />}
      />
      <DropdownItemAction
        label="Delete course"
        variant="danger"
        startIcon={<i className="fa-solid fa-trash" aria-hidden="true" />}
        description="This cannot be undone"
      />
      <DropdownItemAction label="Delete course" variant="danger" disabled />
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('menuitem');
    await expect(items).toHaveLength(3);
    for (const item of items) {
      await expect(item).toHaveClass('mds-dropdown-item--danger');
    }
    await expect(items[2]).toHaveAttribute('aria-disabled', 'true');
  },
};

/**
 * When an `href` prop is supplied the action item renders as an `<a>` element
 * rather than a `<button>`. Disabled suppresses the href and sets aria-disabled.
 */
export const LinkVariants: Story = {
  parameters: showcaseParameters,
  render: () => (
    <DropdownMenu>
      <DropdownItemAction label="Go to settings" href="/settings" />
      <DropdownItemAction
        label="External link"
        href="https://moodle.com"
        target="_blank"
        rel="noopener noreferrer"
        startIcon={
          <i
            className="fa-solid fa-arrow-up-right-from-square"
            aria-hidden="true"
          />
        }
      />
      <DropdownItemAction label="Disabled link" href="/path" disabled />
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('menuitem');
    await expect(items[0].tagName).toBe('A');
    await expect(items[0]).toHaveAttribute('href', '/settings');
    await expect(items[2]).toHaveAttribute('aria-disabled', 'true');
    await expect(items[2]).not.toHaveAttribute('href');
  },
};
