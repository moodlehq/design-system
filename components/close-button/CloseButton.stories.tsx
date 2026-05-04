import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { CloseButton } from './CloseButton';

const meta = {
  title: 'Components/CloseButton',
  component: CloseButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'beta'],
  argTypes: {
    'aria-label': {
      control: { type: 'text' },
      description:
        'Required accessible name for the close button. Pass a translated string from the consuming application.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '(required)' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Close button size.',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Close button disabled state.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      description:
        'Callback fired when the button is clicked. Receives the native mouse event.',
      table: {
        type: {
          summary: '(event: React.MouseEvent<HTMLButtonElement>) => void',
        },
      },
    },
  },
  args: {
    'aria-label': 'Close',
    size: 'md',
    disabled: false,
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', {
      name: args['aria-label'] as string,
    });
    await userEvent.click(button);
    await new Promise((resolve) => setTimeout(resolve, 0));
    await expect(button).toBeVisible();
  },
} satisfies Meta<typeof CloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Small = {
  args: {
    size: 'sm',
  },
} satisfies Story;

export const Large = {
  args: {
    size: 'lg',
  },
} satisfies Story;

export const Focus = {
  name: 'Focus (Tab to toggle)',
  parameters: {
    docs: {
      description: {
        story:
          'To preview focus-visible manually: click anywhere in the canvas, then press Tab until the close button is focused.',
      },
    },
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', {
      name: args['aria-label'] as string,
    });
    await userEvent.click(document.body);
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', {
      name: args['aria-label'] as string,
    });
    await expect(button).toBeDisabled();
  },
} satisfies Story;
