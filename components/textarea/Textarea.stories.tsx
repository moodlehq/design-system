import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
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
  argTypes: {
    placeholder: {
      description: 'Placeholder text shown when the field is empty.',
      control: { type: 'text' },
    },
    label: {
      description: 'Visible label text above the field.',
      control: { type: 'text' },
    },
    hideLabel: {
      description:
        'When true, hides the visible label. Provide an accessible name via aria-label or label prop.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      description: 'Marks the field as required. Appends a * to the label.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
      description:
        'Marks the field as invalid — applies danger border styling and sets aria-invalid.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    invalidFeedback: {
      description:
        'Pre-translated error message shown below the field when invalid is true.',
      control: { type: 'text' },
      if: { arg: 'invalid', truthy: true },
    },
    supportingText: {
      description: 'Helper text shown below the field in non-error state.',
      control: { type: 'text' },
    },
    infoTooltipLabel: {
      description:
        'Accessible label for the info tooltip button shown beside the visible label.',
      control: { type: 'text' },
      if: { arg: 'hideLabel', eq: false },
    },
    showCounter: {
      description:
        'Shows a live character counter. Requires maxLength to be set.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
      if: { arg: 'maxLength', exists: true },
    },
    counterAriaLabel: {
      description:
        'Optional i18n text (static string) or formatter for the counter aria-label. Formatter receives (currentLength, maxLength). The control only accepts a static string; use the args/code editor to pass a formatter function.',
      control: { type: 'text' },
      table: {
        type: {
          summary:
            'string | ((currentLength: number, maxLength: number) => string)',
        },
      },
    },
    counterRemainingAnnouncement: {
      description:
        'Optional i18n text (static string) or formatter for remaining-character milestone announcements. Formatter receives (remaining, maxLength). The control only accepts a static string; use the args/code editor to pass a formatter function.',
      control: { type: 'text' },
      table: {
        type: {
          summary:
            'string | ((remaining: number, maxLength: number) => string)',
        },
      },
    },
    counterOverLimitAnnouncement: {
      description:
        'Optional i18n text (static string) or formatter for over-limit announcements. Formatter receives (overLimitBy, maxLength). The control only accepts a static string; use the args/code editor to pass a formatter function.',
      control: { type: 'text' },
      table: {
        type: {
          summary:
            'string | ((overLimitBy: number, maxLength: number) => string)',
        },
      },
    },
    resizable: {
      description:
        'When true (default), the textarea can be resized vertically by the user.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
    disabled: {
      description:
        'Use when input is unavailable. Pair with supportingText to explain why the field is disabled.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
      description:
        'Use when existing content should stay readable/copyable while editing is blocked.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    maxLength: {
      description:
        'Maximum number of characters. Provide a non-negative integer (0 allowed). Clear/reset this control to remove the limit and hide showCounter.',
      control: { type: 'number', min: 0, step: 1 },
      table: {
        type: { summary: 'number' },
      },
    },
    rows: {
      description: 'The number of visible text lines.',
      control: { type: 'number' },
    },
  },
  args: {
    placeholder: 'Placeholder text goes here',
    label: 'Label text',
    hideLabel: false,
    required: false,
    invalid: false,
    showCounter: false,
    resizable: true,
    disabled: false,
    readOnly: false,
    rows: 3,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label text',
    placeholder: 'Placeholder text goes here',
  },
};

export const WithSupportingText: Story = {
  args: {
    label: 'Label text',
    placeholder: 'Placeholder text goes here',
    supportingText: 'Supporting text',
  },
};

export const WithCounter: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    label: 'Label text',
    placeholder: 'Placeholder text goes here',
    showCounter: true,
    maxLength: 100,
  },
};

export const WithSupportingTextAndCounter: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    label: 'Label text',
    placeholder: 'Placeholder text goes here',
    supportingText: 'Supporting text',
    showCounter: true,
    maxLength: 100,
  },
};

export const WithInfoButton: Story = {
  args: {
    label: 'Course description',
    placeholder: 'Describe the course aims and outcomes…',
    infoTooltipLabel:
      'Enter a brief overview of what learners will gain from this course.',
  },
};

export const Required: Story = {
  args: {
    label: 'Label text',
    required: true,
    placeholder: 'Placeholder text goes here',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Label text',
    invalid: true,
    invalidFeedback: 'This field is required.',
    placeholder: 'Placeholder text goes here',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(canvas.getByText('This field is required.')).toBeInTheDocument();
  },
};

export const InvalidWithCounter: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    label: 'Label text',
    invalid: true,
    invalidFeedback: 'This field is required.',
    showCounter: true,
    maxLength: 100,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label text',
    disabled: true,
    placeholder: 'Placeholder text goes here',
    supportingText: 'Supporting text',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('textbox')).toBeDisabled();
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Label text',
    readOnly: true,
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    supportingText: 'Supporting text',
    showCounter: true,
    maxLength: 100,
  },
};

export const NonResizable: Story = {
  args: {
    label: 'Label text',
    resizable: false,
    placeholder: 'Placeholder text goes here',
    supportingText: 'This textarea cannot be resized.',
  },
};

export const HiddenLabel: Story = {
  args: {
    label: 'Description',
    hideLabel: true,
    placeholder: 'Enter your description',
  },
};

export const LiveCharacterCount: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    label: 'Message',
    placeholder: 'Type here…',
    showCounter: true,
    maxLength: 50,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    await userEvent.type(textarea, 'Hello');
    await expect(canvas.getByText('5 / 50')).toBeInTheDocument();
  },
};

export const LocalizedCounterAccessibility: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    label: 'Nachricht',
    placeholder: 'Hier schreiben…',
    showCounter: true,
    maxLength: 20,
    counterAriaLabel: (current, max) =>
      `${current} von ${max} Zeichen verwendet`,
    counterRemainingAnnouncement: (remaining, max) =>
      `${remaining} von ${max} Zeichen verbleibend`,
    counterOverLimitAnnouncement: (over, max) =>
      `${over} über dem Limit von ${max} Zeichen`,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    await userEvent.type(textarea, '123456789012345');
    await expect(canvas.getByText('15 / 20')).toHaveAttribute(
      'aria-label',
      '15 von 20 Zeichen verwendet',
    );
    await expect(canvas.getByRole('status')).toHaveTextContent(
      '5 von 20 Zeichen verbleibend',
    );
  },
};

export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  args: {
    label: 'نص التسمية',
    placeholder: 'اكتب النص هنا',
    required: true,
    invalid: true,
    invalidFeedback: 'هذا الحقل مطلوب',
    infoTooltipLabel: 'معلومات إضافية حول هذا الحقل',
    showCounter: true,
    maxLength: 100,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    await expect(textarea).toHaveAttribute('aria-invalid', 'true');
    await expect(
      canvas.getByRole('button', { name: 'معلومات إضافية حول هذا الحقل' }),
    ).toBeInTheDocument();
    await expect(canvas.getByText('هذا الحقل مطلوب')).toBeInTheDocument();
    await userEvent.type(textarea, 'مرحبا');
    await expect(textarea).toHaveValue('مرحبا');
    await expect(canvas.getByText('5 / 100')).toBeInTheDocument();
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};
