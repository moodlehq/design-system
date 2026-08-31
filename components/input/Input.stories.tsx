import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Input } from './Input';

const iconMapping = {
  None: undefined,
  Email: <i className="fa-solid fa-envelope" aria-hidden="true" />,
  Search: <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />,
  Phone: <i className="fa-solid fa-phone" aria-hidden="true" />,
  Link: <i className="fa-solid fa-link" aria-hidden="true" />,
};

const meta = {
  title: 'Components/Input/Input',
  component: Input,
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
    type: 'text',
    label: 'Label text',
    placeholder: 'Placeholder text goes here',
    hideLabel: false,
    invalid: false,
    required: false,
    disabled: false,
    readOnly: false,
  },
  argTypes: {
    placeholder: {
      description: 'Placeholder text shown when the field is empty.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
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
    type: {
      description:
        'Input type constrained to text-like variants in the design system.',
      control: { type: 'select' },
      options: ['text', 'email', 'number', 'tel', 'url'],
      table: {
        type: {
          summary: 'text | email | number | tel | url',
        },
        defaultValue: { summary: 'text' },
      },
    },
    label: {
      description: 'Visible label text above the input field.',
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
      if: { arg: 'hideLabel', eq: false },
      table: { type: { summary: 'string' } },
    },
    startIcon: {
      description:
        'Decorative icon rendered at the start of the field. Accepts only intrinsic `<i>` or `<svg>` elements.',
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const showcaseStackStyle = {
  display: 'flex' as const,
  flexDirection: 'column' as const,
  gap: 'var(--mds-spacing-md)',
};

const showcaseParameters = {
  controls: { disable: true },
  docs: { canvas: { sourceState: 'none' } },
} as const;

const withShowcaseDocs = (story: string) => ({
  ...showcaseParameters,
  docs: {
    ...showcaseParameters.docs,
    description: { story },
  },
});

export const Default: Story = {};

export const Types: Story = {
  parameters: withShowcaseDocs(
    'All supported `type` values with their typical placeholder pattern.',
  ),
  render: () => (
    <div style={showcaseStackStyle}>
      <Input label="Email" type="email" placeholder="name@example.com" />
      <Input label="Number" type="number" placeholder="42" />
      <Input label="Telephone" type="tel" placeholder="+1 555 000 000" />
      <Input label="Url" type="url" placeholder="https://example.com" />
    </div>
  ),
};

export const WithStartIcon: Story = {
  args: {
    type: 'email',
    placeholder: 'name@example.com',
    startIcon: iconMapping.Email,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('textbox', { name: 'Label text' })).toHaveClass(
      'mds-input-field--with-start-icon',
    );
  },
};

export const WithInfoButton: Story = {
  args: {
    label: 'Course code',
    placeholder: 'e.g. CS101',
    infoTooltipLabel:
      'Enter the short code learners will use to find this course.',
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
    invalidFeedback: 'This field is required.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Label text' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(canvas.getByText('This field is required.')).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    supportingText: 'This field is unavailable right now.',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 'Read-only value',
    supportingText: 'You can copy this value but cannot edit it.',
  },
};

export const HiddenLabel: Story = {
  args: {
    hideLabel: true,
    label: 'Email address',
    type: 'email',
    placeholder: 'name@example.com',
  },
};

export const NativeValidationDemo: Story = {
  tags: ['test', 'stable'],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          'Demonstrates HTML5 constraint validation (e.g. `required`, `type="email"`) wired into `invalidFeedback`. Validation runs on blur: leave the field with an empty or invalid value and, instead of the native browser bubble, the field switches to its invalid state and shows the browser\'s own validation message inline. This fallback only applies when `invalidFeedback` is not provided — pass `invalidFeedback` to show your own message instead of the native one.',
      },
    },
  },
  args: {
    type: 'email',
    required: true,
    defaultValue: 'not-an-email',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Label text' });

    await userEvent.click(input);
    await userEvent.tab();

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(
      canvas.getByText('Please include an', { exact: false }),
    ).toBeInTheDocument();
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
    label: 'التسمية النصية',
    placeholder: 'نص العنصر النائب يظهر هنا',
    required: true,
    invalid: true,
    invalidFeedback: 'هذا الحقل مطلوب',
    infoTooltipLabel: 'معلومات إضافية حول هذا الحقل',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'التسمية النصية' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(canvas.getByText('*')).toBeInTheDocument();
    expect(canvas.getByText('هذا الحقل مطلوب')).toBeInTheDocument();
    expect(
      canvas.getByRole('button', { name: 'معلومات إضافية حول هذا الحقل' }),
    ).toBeInTheDocument();
  },
};
