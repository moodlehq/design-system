import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { PasswordInput } from './PasswordInput';

const meta = {
  title: 'Components/Input/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  decorators: [
    (Story) => (
      <div style={{ width: 'min(395px, 95vw)' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    hideLabel: false,
    invalid: false,
    required: false,
    disabled: false,
    readOnly: false,
    passwordToggleShowLabel: 'Show password',
    passwordToggleHideLabel: 'Hide password',
  },
  argTypes: {
    label: {
      description: 'Visible label text above the password field.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      description: 'Placeholder text shown when the field is empty.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    hideLabel: {
      description:
        'When true, hides the visible label. Provide aria-label or label for accessible naming.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    invalid: {
      description: 'Applies invalid styling and aria-invalid.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      description:
        'Marks the field as required and enables native HTML5 validation.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description:
        'Use when input is unavailable. Pair with supportingText to explain why the field is disabled.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      description:
        'Use when existing content should stay readable/copyable while editing is blocked.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    passwordToggleShowLabel: {
      description: 'Accessible label for the toggle when password is hidden.',
      control: { type: 'text' },
    },
    passwordToggleHideLabel: {
      description: 'Accessible label for the toggle when password is visible.',
      control: { type: 'text' },
    },
    invalidFeedback: {
      description: 'Error text shown below the field when invalid is true.',
      control: { type: 'text' },
      if: { arg: 'invalid', truthy: true },
      table: { type: { summary: 'string' } },
    },
    supportingText: {
      description:
        'Helper text shown below the field when no invalid feedback is shown.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    infoTooltipLabel: {
      description:
        'Accessible label for the info tooltip button shown beside the visible label.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
      if: { arg: 'hideLabel', eq: false },
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInfoButton: Story = {
  args: {
    infoTooltipLabel:
      'Your password must be at least 8 characters and include a number.',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    invalidFeedback: 'This password is too short.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    supportingText: 'Password editing is disabled for this account.',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 'NotEditablePassword123',
    supportingText: 'You can copy this value but cannot edit it.',
  },
};

export const HiddenLabel: Story = {
  args: {
    hideLabel: true,
    label: 'Password',
  },
};

export const ToggleVisibility: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const input = canvas.getByLabelText('Password');
    const toggle = canvas.getByRole('button', { name: 'Show password' });

    expect(toggle.closest('.mds-tooltip')).toHaveClass('mds-tooltip--light');

    expect(input).toHaveAttribute('type', 'password');
    await userEvent.hover(toggle);
    const tooltip = page.getByRole('tooltip', { hidden: true });
    await waitFor(() => expect(tooltip).toHaveTextContent('Show password'));

    await userEvent.click(toggle);
    expect(input).toHaveAttribute('type', 'text');
    await waitFor(() => expect(tooltip).toHaveTextContent('Hide password'));

    await userEvent.click(
      canvas.getByRole('button', { name: 'Hide password' }),
    );
    expect(input).toHaveAttribute('type', 'password');
  },
};

export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  decorators: [
    (Story) => (
      <div dir="rtl" style={{ width: 'min(395px, 95vw)' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'كلمة المرور',
    placeholder: 'أدخل كلمة المرور',
    supportingText: 'نص الدعم',
    passwordToggleShowLabel: 'إظهار كلمة المرور',
    passwordToggleHideLabel: 'إخفاء كلمة المرور',
    required: true,
    invalid: true,
    invalidFeedback: 'كلمة المرور قصيرة جدًا.',
    infoTooltipLabel: 'معلومات إضافية حول كلمة المرور',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/^كلمة المرور\s*\*?\s*$/);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(canvas.getByText('*')).toBeInTheDocument();
    expect(canvas.getByText('كلمة المرور قصيرة جدًا.')).toBeInTheDocument();
    expect(
      canvas.getByRole('button', { name: 'معلومات إضافية حول كلمة المرور' }),
    ).toBeInTheDocument();
  },
};
