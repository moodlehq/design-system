import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Accordion } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9zvbdhx3NdiOv0GL7fCA7u/MDS-473?node-id=28-261&t=WOhVusVAwHhHNCAZ-1',
    },
  },
  args: {
    heading: 'Heading',
    children:
      'This is a paragraph dpwoa kdawopkda wdkd wopdawkoawdpawdpokadwk dwapoadwkadwko.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '422px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'info'],
      description: 'Accordion visual variant.',
      table: {
        type: { summary: 'default | info' },
        defaultValue: { summary: 'default' },
      },
    },
    expanded: {
      control: { type: 'boolean' },
      description: 'Controlled expanded state.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultExpanded: {
      control: { type: 'boolean' },
      description: 'Initial expanded state for uncontrolled mode.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onExpandedChange: {
      action: 'expanded-changed',
      description: 'Callback fired when user toggles the accordion.',
      table: {
        type: { summary: '(expanded: boolean) => void' },
      },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Heading' });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
} satisfies Story;

export const Info = {
  args: {
    variant: 'info',
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Heading' });
    await expect(trigger.closest('.mds-accordion')).toHaveClass(
      'mds-accordion--info',
    );
  },
} satisfies Story;

export const Expanded = {
  args: {
    defaultExpanded: true,
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Heading' });
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
    onExpandedChange: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const trigger = canvas.getByRole('button', { name: 'Heading' });
    await userEvent.click(trigger);
    await expect(trigger).toBeDisabled();
    await expect(args.onExpandedChange).not.toHaveBeenCalled();
  },
} satisfies Story;
