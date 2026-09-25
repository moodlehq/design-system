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
    (Story, context) => (
      <div
        style={{
          width:
            context.name === 'States' ? 'min(48rem, 95vw)' : 'min(395px, 95vw)',
        }}
      >
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

const showcaseParameters = {
  controls: { disable: true },
  docs: {
    canvas: { sourceState: 'none' },
  },
} as const;

const showcaseTableStyle = {
  borderCollapse: 'collapse' as const,
  tableLayout: 'fixed' as const,
  inlineSize: '100%',
  minInlineSize: '32rem',
};

const showcaseHeaderCellStyle = {
  padding: 'var(--mds-spacing-xs) var(--mds-spacing-sm)',
  textAlign: 'center' as const,
  color: 'var(--mds-text-subtle)',
  fontSize: 'var(--mds-font-size-paragraph-small)',
  fontFamily: 'var(--mds-font-family-base)',
  fontWeight: 'var(--mds-font-weight-medium)',
};

const showcaseRowHeaderCellStyle = {
  padding: 'var(--mds-spacing-xs) var(--mds-spacing-sm)',
  textAlign: 'start' as const,
  fontFamily: 'var(--mds-font-family-base)',
  fontWeight: 'var(--mds-font-weight-medium)',
  inlineSize: '6rem',
};

const showcaseCellStyle = {
  padding: 'var(--mds-spacing-xs) var(--mds-spacing-sm)',
  verticalAlign: 'middle' as const,
};

export const Default: Story = {};

export const States: Story = {
  parameters: {
    ...showcaseParameters,
    docs: {
      ...showcaseParameters.docs,
      description: {
        story:
          'State table for visual regression review. Hover, active, and focus-visible cells are driven by the Storybook pseudo-states addon.',
      },
    },
    pseudo: {
      hover: "[data-password-input-state='hover'] .mds-input-field",
      active: "[data-password-input-state='active'] .mds-input-field",
      focusVisible:
        "[data-password-input-state='focus-visible'] .mds-input-field",
    },
  },
  render: (args) => (
    <table style={showcaseTableStyle}>
      <thead>
        <tr>
          <th
            style={{ ...showcaseHeaderCellStyle, inlineSize: '6rem' }}
            scope="col"
          >
            State
          </th>
          <th style={showcaseHeaderCellStyle} scope="col">
            Empty
          </th>
          <th style={showcaseHeaderCellStyle} scope="col">
            Filled
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th style={showcaseRowHeaderCellStyle} scope="row">
            Default
          </th>
          <td style={showcaseCellStyle}>
            <PasswordInput {...args} label="Default empty" hideLabel />
          </td>
          <td style={showcaseCellStyle}>
            <PasswordInput
              {...args}
              label="Default filled"
              hideLabel
              defaultValue="Sup3rSecret!"
            />
          </td>
        </tr>

        <tr data-password-input-state="hover">
          <th style={showcaseRowHeaderCellStyle} scope="row">
            Hover
          </th>
          <td style={showcaseCellStyle}>
            <PasswordInput {...args} label="Hover empty" hideLabel />
          </td>
          <td style={showcaseCellStyle}>
            <PasswordInput
              {...args}
              label="Hover filled"
              hideLabel
              defaultValue="Sup3rSecret!"
            />
          </td>
        </tr>

        <tr data-password-input-state="active">
          <th style={showcaseRowHeaderCellStyle} scope="row">
            Active
          </th>
          <td style={showcaseCellStyle}>
            <PasswordInput {...args} label="Active empty" hideLabel />
          </td>
          <td style={showcaseCellStyle}>
            <PasswordInput
              {...args}
              label="Active filled"
              hideLabel
              defaultValue="Sup3rSecret!"
            />
          </td>
        </tr>

        <tr data-password-input-state="focus-visible">
          <th style={showcaseRowHeaderCellStyle} scope="row">
            Focus
          </th>
          <td style={showcaseCellStyle}>
            <PasswordInput {...args} label="Focus empty" hideLabel />
          </td>
          <td style={showcaseCellStyle}>
            <PasswordInput
              {...args}
              label="Focus filled"
              hideLabel
              defaultValue="Sup3rSecret!"
            />
          </td>
        </tr>
      </tbody>
    </table>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Default empty')).toBeVisible();
    await expect(canvas.getByLabelText('Default filled')).toHaveValue(
      'Sup3rSecret!',
    );
    await expect(canvas.getByLabelText('Hover empty')).toBeVisible();
    await expect(canvas.getByLabelText('Active empty')).toBeVisible();
    await expect(canvas.getByLabelText('Focus empty')).toBeVisible();
  },
};

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
    supportingText: 'Reveal the password to copy it.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Password');

    await expect(input).toHaveAttribute('type', 'password');
    await expect(input).toHaveAttribute('readonly');

    const toggle = canvas.getByRole('button', { name: 'Show password' });
    await userEvent.click(toggle);
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveValue('NotEditablePassword123');
  },
};

export const HiddenLabel: Story = {
  args: {
    hideLabel: true,
    label: 'Password',
    supportingText: 'Supporting text still shows when the label is hidden.',
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

    await expect(toggle.closest('.mds-tooltip')).toHaveClass(
      'mds-tooltip--light',
    );

    await expect(input).toHaveAttribute('type', 'password');
    await userEvent.hover(toggle);
    const tooltip = page.getByRole('tooltip', { hidden: true });
    await waitFor(() => expect(tooltip).toHaveTextContent('Show password'));

    await userEvent.click(toggle);
    await expect(input).toHaveAttribute('type', 'text');
    await waitFor(() => expect(tooltip).toHaveTextContent('Hide password'));

    await userEvent.click(
      canvas.getByRole('button', { name: 'Hide password' }),
    );
    await expect(input).toHaveAttribute('type', 'password');
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
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByText('*')).toBeInTheDocument();
    await expect(
      canvas.getByText('كلمة المرور قصيرة جدًا.'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'معلومات إضافية حول كلمة المرور' }),
    ).toBeInTheDocument();
  },
};
