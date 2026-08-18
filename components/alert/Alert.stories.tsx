import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger'],
      description:
        'Semantic alert type controlling icon, colours, and live region role.',
      table: {
        type: { summary: 'info | success | warning | danger' },
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Optional heading text shown above the message.',
      table: {
        type: { summary: 'string' },
      },
    },
    message: {
      control: { type: 'text' },
      description: 'Required message content.',
      table: {
        type: { summary: 'string' },
      },
    },
    isDismissible: {
      control: { type: 'boolean' },
      description:
        'Renders a dismiss button that removes the alert from the page.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    dismissAriaLabel: {
      control: { type: 'text' },
      description:
        'Accessible name for the dismiss button. Required when `isDismissible` is true to satisfy WCAG 2.1 SC 4.1.2.',
      if: { arg: 'isDismissible', truthy: true },
      table: {
        type: { summary: 'string' },
      },
    },
    onDismiss: {
      action: 'dismissed',
      control: false,
      description: 'Callback fired after the alert is dismissed.',
      if: { arg: 'isDismissible', truthy: true },
      table: {
        type: { summary: '() => void' },
      },
    },
    isActionable: {
      control: { type: 'boolean' },
      description: 'Renders a single action button below the message.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    actionLabel: {
      control: { type: 'text' },
      description:
        'Visible label for the action button. Required when `isActionable` is true.',
      if: { arg: 'isActionable', truthy: true },
      table: {
        type: { summary: 'string' },
      },
    },
    onAction: {
      action: 'actioned',
      control: false,
      description: 'Click handler for the action button.',
      if: { arg: 'isActionable', truthy: true },
      table: {
        type: { summary: 'MouseEventHandler<HTMLButtonElement>' },
      },
    },
    actionButtonProps: {
      control: { type: 'object' },
      description: 'Additional props forwarded to the action Button.',
      if: { arg: 'isActionable', truthy: true },
      table: {
        type: {
          summary:
            'Omit<ButtonProps, "label" | "variant" | "onClick" | "type" | "startIcon" | "endIcon">',
        },
      },
    },
  },
  args: {
    title: 'Profile update available',
    message:
      'Your profile details have changed. Review them before continuing.',
    isDismissible: true,
    dismissAriaLabel: 'Close alert',
    isActionable: false,
    actionLabel: 'Review',
  },
  play: async ({ canvasElement }) => {
    const alerts = canvasElement.querySelectorAll('.mds-alert');
    await expect(alerts.length).toBeGreaterThan(0);
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

const showcaseStackStyle = {
  display: 'grid',
  gap: 'var(--mds-spacing-md)',
} as const;

const parentContainerStyle = {
  display: 'grid',
  gap: 'var(--mds-spacing-xs)',
} as const;

const parentFrameStyle = {
  display: 'grid',
  gap: 'var(--mds-spacing-sm)',
  padding: 'var(--mds-spacing-sm)',
  border: 'var(--mds-stroke-weight-sm) dashed var(--mds-border-default)',
  borderRadius: 'var(--mds-border-radius-md)',
} as const;

const parentLabelStyle = {
  margin: 0,
  fontFamily: 'var(--mds-font-family-base)',
  fontSize: 'var(--mds-font-size-paragraph-default)',
  fontWeight: 'var(--mds-font-weight-medium)',
  lineHeight: 'var(--mds-line-height-paragraph-default)',
  color: 'var(--mds-text-default)',
} as const;

const standardStoryWidthStyle = {
  inlineSize: '32rem',
} as const;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={standardStoryWidthStyle}>
        <Story />
      </div>
    ),
  ],
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ ...showcaseStackStyle, ...standardStoryWidthStyle }}>
      <Alert
        type="info"
        title="Information"
        message="Your report is ready to view."
        dismissAriaLabel="Close alert"
      />
      <Alert
        type="success"
        title="Saved"
        message="Your course settings were updated."
        dismissAriaLabel="Close alert"
      />
      <Alert
        type="warning"
        title="Attention needed"
        message="Your session expires in 5 minutes."
        dismissAriaLabel="Close alert"
      />
      <Alert
        type="danger"
        title="Submission failed"
        message="We could not submit your response."
        dismissAriaLabel="Close alert"
      />
    </div>
  ),
};

export const NotDismissible: Story = {
  args: {
    isDismissible: false,
    message:
      'This alert cannot be dismissed. Use this only when the message must remain visible until the underlying issue is resolved.',
  },
  play: async ({ canvas }) => {
    const dismissButton = canvas.queryByRole('button', { name: /close/i });
    await expect(dismissButton).toBeNull();
  },
  decorators: [
    (Story) => (
      <div style={standardStoryWidthStyle}>
        <Story />
      </div>
    ),
  ],
};

export const Actionable: Story = {
  args: {
    isActionable: true,
    actionLabel: 'Retry',
    message: 'There was a sync issue. Retry the operation when ready.',
  },
  decorators: [
    (Story) => (
      <div style={standardStoryWidthStyle}>
        <Story />
      </div>
    ),
  ],
};

export const RelativeToParent: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={showcaseStackStyle}>
      <div style={{ ...parentFrameStyle, inlineSize: '25rem' }}>
        <p style={parentLabelStyle}>Parent width: 25rem</p>
        <div style={parentContainerStyle}>
          <Alert
            isDismissible={false}
            title="Narrow parent"
            message="This alert expands to the width of its parent container."
          />
        </div>
      </div>

      <div
        style={{
          ...parentFrameStyle,
          inlineSize: '48rem',
          padding: 'var(--mds-spacing-lg)',
        }}
      >
        <p style={parentLabelStyle}>Parent width: 48rem</p>
        <div style={parentContainerStyle}>
          <Alert
            isDismissible={false}
            title="Wider parent"
            message="The same component grows when the parent container is wider."
          />
        </div>
      </div>
    </div>
  ),
};

export const CustomSlot: Story = {
  args: {
    message: 'Additional context can be shown in a controlled custom slot.',
  },
  decorators: [
    (Story) => (
      <div style={standardStoryWidthStyle}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Alert {...args}>
      <a href="https://moodle.com" target="_blank" rel="noreferrer">
        Read recovery guidance
      </a>
    </Alert>
  ),
};

export const WithoutTitle: Story = {
  args: {
    title: undefined,
    message: 'Changes were saved successfully.',
  },
  decorators: [
    (Story) => (
      <div style={standardStoryWidthStyle}>
        <Story />
      </div>
    ),
  ],
};

export const RightToLeft: Story = {
  args: {
    type: 'warning',
    title: 'تنبيه',
    message: 'قد تنتهي صلاحية الجلسة قريبًا. احفظ عملك.',
    dismissAriaLabel: 'إغلاق التنبيه',
  },
  decorators: [
    (Story) => (
      <div dir="rtl" style={standardStoryWidthStyle}>
        <Story />
      </div>
    ),
  ],
  tags: ['test', 'stable'],
};
