import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
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
      control: { type: 'text' },
      description: 'Visible label text above the password field.',
    },
    passwordToggleShowLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the toggle when password is hidden.',
    },
    passwordToggleHideLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the toggle when password is visible.',
    },
    invalidFeedback: {
      control: { type: 'text' },
      if: { arg: 'invalid', truthy: true },
    },
    supportingText: {
      control: { type: 'text' },
    },
    infoTooltipLabel: {
      description:
        'Accessible label for the info tooltip button shown beside the visible label.',
      control: { type: 'text' },
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
    const input = canvas.getByLabelText('Password');

    expect(input).toHaveAttribute('type', 'password');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Show password' }),
    );
    expect(input).toHaveAttribute('type', 'text');
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
