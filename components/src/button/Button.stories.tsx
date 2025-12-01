import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from 'react-bootstrap';
import { expect } from 'storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { label: 'Button' }));
    // Wait for any updates to complete
    await new Promise((resolve) => setTimeout(resolve, 0));
    await expect(canvas.getByText('Button')).toBeVisible();
  },
  tags: ['autodocs', 'test', 'stable'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: {
      description: 'Button label.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'danger',
        'outline-primary',
        'outline-secondary',
        'outline-danger',
      ],
      description: 'Button variant.',
      table: {
        type: {
          summary:
            'primary | secondary | danger | outline-primary | outline-secondary | outline-danger',
        },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: [undefined, 'sm', 'lg'],
      description: 'Button size. Default is "md" if not set.',
      table: {
        type: { summary: 'sm | lg' },
        defaultValue: { summary: 'undefined' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Button disabled state.',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    label: 'Button',
    variant: 'primary',
    disabled: false,
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    label: 'Button',
  },
} satisfies Story;

export const Secondary = {
  args: {
    variant: 'secondary',
    label: 'Button',
  },
} satisfies Story;

export const Danger = {
  args: {
    variant: 'danger',
    label: 'Button',
  },
} satisfies Story;

export const OutlinePrimary = {
  args: {
    variant: 'outline-primary',
    label: 'Button',
  },
} satisfies Story;

export const OutlineSecondary = {
  args: {
    variant: 'outline-secondary',
    label: 'Button',
  },
} satisfies Story;

export const OutlineDanger = {
  args: {
    variant: 'outline-danger',
    label: 'Button',
  },
} satisfies Story;

export const Disabled = {
  args: {
    label: 'Button',
    disabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { label: 'Button' });
    await expect(button).toBeDisabled();
  },
} satisfies Story;

export const Large = {
  args: {
    size: 'lg',
    label: 'Button',
  },
} satisfies Story;

export const Small = {
  args: {
    size: 'sm',
    label: 'Button',
  },
} satisfies Story;
