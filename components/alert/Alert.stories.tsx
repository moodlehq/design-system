import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from 'react-bootstrap';
import { expect, fn } from 'storybook/test';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
⚠️ **This component is under development and not production ready.** API may change without notice.

The Alert component displays important messages to users with different severity levels (success, info, warning, danger).
It supports optional icons, headings, body content, and action buttons.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ width: '500px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  play: async ({ canvas }) => {
    const alert = canvas.getByRole('alert');
    await expect(alert).toBeVisible();
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'danger'],
      description: 'Alert variant that determines the visual style.',
      table: {
        type: { summary: 'success | info | warning | danger' },
        defaultValue: { summary: 'info' },
      },
    },
    heading: {
      control: { type: 'text' },
      description: 'The heading text displayed in the alert.',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'The body content of the alert.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Optional icon to display before the heading.',
      table: {
        type: { summary: 'string' },
      },
    },
    actionLabel: {
      control: { type: 'text' },
      description: 'Label for the action button.',
      table: {
        type: { summary: 'string' },
      },
    },
    actionButtonProps: {
      control: { type: 'object' },
      description:
        'Optional design-system button override. When provided, it replaces actionLabel/onActionClick and accepts the same props as Button.',
      table: {
        type: {
          summary:
            '{ label: string; variant?: string; size?: sm | lg; disabled?: boolean; onClick?: () => void; ...ButtonProps }',
        },
      },
    },
    onActionClick: {
      action: 'action-clicked',
      description: 'Callback function when action button is clicked.',
      table: {
        type: { summary: '() => void' },
      },
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Whether the alert can be dismissed with a close button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback function when alert is dismissed.',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    variant: 'info',
    heading: 'Alert Heading',
    children: 'This is the alert message content.',
    dismissible: false,
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success = {
  args: {
    variant: 'success',
    icon: '✓',
    heading: 'Success!',
    children: 'Your action was completed successfully.',
    actionLabel: 'View Details',
    onActionClick: fn(),
  },
  play: async ({ canvas }) => {
    const alert = canvas.getByRole('alert');
    await expect(alert).toHaveClass('alert-success');
  },
} satisfies Story;

export const Info = {
  args: {
    variant: 'info',
    icon: 'ℹ️',
    heading: 'Information',
    children: 'Here is some important information you should know.',
  },
  play: async ({ canvas }) => {
    const alert = canvas.getByRole('alert');
    await expect(alert).toHaveClass('alert-info');
  },
} satisfies Story;

export const Warning = {
  args: {
    variant: 'warning',
    icon: '⚠️',
    heading: 'Warning',
    children: 'Please review this warning before proceeding.',
    actionLabel: 'Acknowledge',
    onActionClick: fn(),
  },
  play: async ({ canvas }) => {
    const alert = canvas.getByRole('alert');
    await expect(alert).toHaveClass('alert-warning');
  },
} satisfies Story;

export const Danger = {
  args: {
    variant: 'danger',
    icon: '✗',
    heading: 'Error',
    children: 'An error occurred while processing your request.',
    actionLabel: 'Retry',
    onActionClick: fn(),
  },
  play: async ({ canvas }) => {
    const alert = canvas.getByRole('alert');
    await expect(alert).toHaveClass('alert-danger');
  },
} satisfies Story;

export const WithoutIcon = {
  args: {
    variant: 'success',
    heading: 'No Icon',
    children: 'This alert does not have an icon.',
  },
} satisfies Story;

export const WithoutHeading = {
  args: {
    variant: 'info',
    children: 'This alert only has body content without a heading.',
  },
} satisfies Story;

export const WithAction = {
  args: {
    variant: 'info',
    icon: 'ℹ️',
    heading: 'Action Required',
    children: 'Please complete the required action.',
    actionLabel: 'Complete Action',
    onActionClick: fn(),
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Complete Action' });
    await expect(button).toBeVisible();
    await userEvent.click(button);
  },
} satisfies Story;

export const WithConfigurableDesignSystemButton = {
  args: {
    variant: 'info',
    icon: 'ℹ️',
    heading: 'Custom Action Button',
    children: 'This uses explicit Button variant and size props.',
    actionButtonProps: {
      label: 'Primary Action',
      variant: 'primary',
      size: 'lg',
    },
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Primary Action' });
    await expect(button).toHaveClass('btn-primary');
    await expect(button).toHaveClass('btn-lg');
  },
} satisfies Story;

export const Dismissible = {
  args: {
    variant: 'warning',
    icon: '⚠️',
    heading: 'Dismissible Alert',
    children: 'This alert can be dismissed by clicking the close button.',
    dismissible: true,
    onClose: fn(),
  },
  play: async ({ canvas, userEvent }) => {
    const closeButton = canvas.getByRole('button', { name: /close/i });
    await expect(closeButton).toBeVisible();
    await userEvent.click(closeButton);
  },
} satisfies Story;

export const LongContent = {
  args: {
    variant: 'info',
    icon: 'ℹ️',
    heading: 'Detailed Information',
    children:
      'This is a longer alert message that contains more detailed information. It demonstrates how the alert component handles multiple lines of text and maintains proper spacing and readability even with extensive content.',
    actionLabel: 'Learn More',
    onActionClick: fn(),
  },
} satisfies Story;

export const MinimalAlert = {
  args: {
    variant: 'success',
    children: 'Minimal alert with just content.',
  },
} satisfies Story;
