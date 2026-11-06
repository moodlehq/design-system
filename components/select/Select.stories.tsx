import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import type { SelectOptionItem } from './Select';
import { Select } from './Select';

const countryOptions: SelectOptionItem[] = [
  { value: '', label: 'Select a country' },
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'ca', label: 'Canada' },
  { value: 'es', label: 'Spain' },
  { value: 'jp', label: 'Japan' },
  { value: 'nz', label: 'New Zealand' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  decorators: [
    (Story, context) => (
      <div
        style={{
          width:
            context.name === 'State Matrix'
              ? 'min(48rem, 95vw)'
              : 'min(395px, 95vw)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    options: {
      description:
        'Options and optional `{ label, options }` groups rendered as native `<option>` / `<optgroup>` elements. Plain text only. Use `value: ""` for an instructional default option.',
      control: { type: 'object' },
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
      description:
        'Native required attribute. Appends a * to the label; pair with an instructional `value: ""` default so validation fails until a real choice is made.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
      description:
        'Marks the field as invalid — danger border, trailing icon, and aria-invalid. Ignored when disabled.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    invalidFeedback: {
      description:
        'Pre-translated error message shown below the field while invalid. Say what to do next.',
      control: { type: 'text' },
      if: { arg: 'invalid', truthy: true },
    },
    supportingText: {
      description: 'Pre-translated helper text shown below the field.',
      control: { type: 'text' },
    },
    infoTooltipLabel: {
      description:
        'Pre-translated label for the info button shown beside the visible label.',
      control: { type: 'text' },
      if: { arg: 'hideLabel', eq: false },
    },
    disabled: {
      description:
        'Use when the field is unavailable. Pair with supportingText to explain why.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    label: 'Country',
    options: countryOptions,
    hideLabel: false,
    required: false,
    invalid: false,
    disabled: false,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const showcaseParameters = {
  controls: { disable: true },
  docs: { canvas: { sourceState: 'none' } },
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

const showcaseStatesCellStyle = {
  padding: 'var(--mds-spacing-xs) var(--mds-spacing-sm)',
  verticalAlign: 'middle' as const,
};

const notApplicableCellStyle = {
  ...showcaseStatesCellStyle,
  textAlign: 'center' as const,
  color: 'var(--mds-text-muted)',
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox', { name: 'Country' });
    await expect(select).toHaveValue('');
    await userEvent.selectOptions(select, 'es');
    await expect(select).toHaveValue('es');
  },
};

export const WithSupportingText: Story = {
  args: {
    supportingText: 'Used to show local course dates.',
  },
};

export const WithInfoButton: Story = {
  args: {
    infoTooltipLabel: 'Your country decides which public holidays apply.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('button', {
        name: 'Your country decides which public holidays apply.',
      }),
    ).toBeInTheDocument();
  },
};

export const Required: Story = {
  args: {
    required: true,
    supportingText: 'Choose where you live.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    await expect(select).toBeRequired();
    // Tabbing away from the untouched instructional default triggers native
    // validation on blur and surfaces the invalid state.
    select.focus();
    await userEvent.tab();
    await expect(select).toHaveAttribute('aria-invalid', 'true');
    await userEvent.selectOptions(select, 'au');
    await expect(select).not.toHaveAttribute('aria-invalid');
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    invalidFeedback: 'Select a country to continue.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    await expect(select).toHaveAttribute('aria-invalid', 'true');
    await expect(
      canvas.getByText('Select a country to continue.'),
    ).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'au',
    supportingText: 'Set by your site administrator.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('combobox')).toBeDisabled();
  },
};

export const HiddenLabel: Story = {
  args: {
    hideLabel: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('combobox', { name: 'Country' }),
    ).toBeInTheDocument();
  },
};

export const OptionGroups: Story = {
  args: {
    label: 'Course',
    options: [
      { value: '', label: 'Select a course' },
      {
        label: 'Science',
        options: [
          { value: 'bio', label: 'Biology' },
          { value: 'chem', label: 'Chemistry' },
          { value: 'phys', label: 'Physics' },
        ],
      },
      {
        label: 'Humanities',
        options: [
          { value: 'hist', label: 'History' },
          { value: 'phil', label: 'Philosophy' },
        ],
      },
      {
        label: 'Archived',
        disabled: true,
        options: [{ value: 'latin', label: 'Latin' }],
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('group')).toHaveLength(3);
  },
};

export const LongOptionText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A long chosen value truncates inside the closed field; the open native list shows the full text.',
      },
    },
  },
  args: {
    label: 'Grading method',
    defaultValue: 'long',
    options: [
      { value: 'short', label: 'Highest grade' },
      {
        value: 'long',
        label:
          'Average of all attempts, excluding the lowest-scoring attempt where more than three attempts exist',
      },
    ],
  },
};

export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('nz');
    return (
      <Select
        {...args}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        supportingText={`Selected value: ${value}`}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    await expect(select).toHaveValue('nz');
    await userEvent.selectOptions(select, 'ca');
    await expect(canvas.getByText('Selected value: ca')).toBeInTheDocument();
  },
};

export const FormSubmission: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A required Select with an instructional `value: ""` default inside a form. Submitting without a choice blocks the submit, shows the invalid feedback, and moves focus to the Select (the first invalid control), as the browser does for a plain `<select>`.',
      },
    },
  },
  args: {
    required: true,
    name: 'country',
  },
  render: function Render(args) {
    const [submitted, setSubmitted] = useState<string>();
    return (
      <form
        style={{
          display: 'grid',
          gap: 'var(--mds-spacing-sm)',
          justifyItems: 'start',
        }}
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(
            String(new FormData(event.currentTarget).get('country')),
          );
        }}
      >
        <Select {...args} />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        {submitted && <p role="status">Saved: {submitted}</p>}
      </form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox', { name: 'Country' });
    const submit = canvas.getByRole('button', { name: 'Save' });

    // Untouched instructional default: submit is blocked and focus moves to
    // the invalid Select.
    await userEvent.click(submit);
    await waitFor(() => expect(select).toHaveFocus());
    await expect(select).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.queryByRole('status')).not.toBeInTheDocument();

    // A real choice clears the error and the form submits.
    await userEvent.selectOptions(select, 'au');
    await expect(select).not.toHaveAttribute('aria-invalid');
    await userEvent.click(submit);
    await expect(await canvas.findByRole('status')).toHaveTextContent(
      'Saved: au',
    );
  },
};

export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  args: {
    label: 'الدولة',
    required: true,
    invalid: true,
    invalidFeedback: 'اختر دولة للمتابعة',
    infoTooltipLabel: 'معلومات إضافية حول هذا الحقل',
    options: [
      { value: '', label: 'اختر دولة' },
      { value: 'eg', label: 'مصر' },
      { value: 'jo', label: 'الأردن' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    await expect(select).toHaveAttribute('aria-invalid', 'true');
    await expect(
      canvas.getByRole('button', { name: 'معلومات إضافية حول هذا الحقل' }),
    ).toBeInTheDocument();
    await expect(canvas.getByText('اختر دولة للمتابعة')).toBeInTheDocument();
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};

export const ForcedColors: Story = {
  tags: ['test', 'stable'],
  parameters: {
    ...showcaseParameters,
    chromatic: { forcedColors: 'active' },
    docs: {
      ...showcaseParameters.docs,
      description: {
        story:
          'Default, invalid, and disabled fields for forced-colors (Windows High Contrast) review. To check locally, open DevTools → Rendering → "Emulate CSS media feature forced-colors" → active. The chevron should stay visible in every field.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--mds-spacing-md)' }}>
      <Select {...args} label="Default" defaultValue="au" />
      <Select
        {...args}
        label="Invalid"
        defaultValue="au"
        invalid
        invalidFeedback="Select a country to continue."
      />
      <Select
        {...args}
        label="Disabled"
        defaultValue="au"
        disabled
        supportingText="Set by your site administrator."
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('combobox', { name: 'Default' }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('combobox', { name: 'Invalid' }),
    ).toHaveAttribute('aria-invalid', 'true');
    await expect(
      canvas.getByRole('combobox', { name: 'Disabled' }),
    ).toBeDisabled();
  },
};

const matrixRows = [
  { state: 'default', title: 'Default' },
  { state: 'hover', title: 'Hover' },
  { state: 'active', title: 'Active' },
  { state: 'focus-visible', title: 'Focus' },
] as const;

export const StateMatrix: Story = {
  parameters: {
    ...showcaseParameters,
    docs: {
      ...showcaseParameters.docs,
      description: {
        story:
          'State matrix for visual regression review, covering every Figma State × isInvalid combination. Hover, active, and focus-visible cells are driven by the Storybook pseudo-states addon. A dash marks combinations Figma does not define (disabled + invalid).',
      },
    },
    pseudo: {
      hover: "[data-select-state='hover'] .mds-select-field",
      active: "[data-select-state='active'] .mds-select-field",
      focusVisible: "[data-select-state='focus-visible'] .mds-select-field",
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
            Valid
          </th>
          <th style={showcaseHeaderCellStyle} scope="col">
            Invalid
          </th>
        </tr>
      </thead>
      <tbody>
        {matrixRows.map(({ state, title }) => (
          <tr key={state} data-select-state={state}>
            <th style={showcaseRowHeaderCellStyle} scope="row">
              {title}
            </th>
            <td style={showcaseStatesCellStyle}>
              <Select
                {...args}
                label={`${title} valid`}
                hideLabel
                defaultValue="au"
              />
            </td>
            <td style={showcaseStatesCellStyle}>
              <Select
                {...args}
                label={`${title} invalid`}
                hideLabel
                defaultValue="au"
                invalid
              />
            </td>
          </tr>
        ))}
        <tr>
          <th style={showcaseRowHeaderCellStyle} scope="row">
            Disabled
          </th>
          <td style={showcaseStatesCellStyle}>
            <Select
              {...args}
              label="Disabled valid"
              hideLabel
              defaultValue="au"
              disabled
            />
          </td>
          <td style={notApplicableCellStyle}>—</td>
        </tr>
      </tbody>
    </table>
  ),
};
