import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect, userEvent, within } from 'storybook/test';
import { Choicebox } from './Choicebox';

const iconMapping = {
  None: undefined,
  Download: <i className="fa-solid fa-download" aria-hidden="true" />,
  Sort: <i className="fa-solid fa-sort" aria-hidden="true" />,
  Trash: <i className="fa-solid fa-trash" aria-hidden="true" />,
  'Arrow Right': <i className="fa-solid fa-arrow-right" aria-hidden="true" />,
  'Arrow Left': <i className="fa-solid fa-arrow-left" aria-hidden="true" />,
  Plus: <i className="fa-solid fa-plus" aria-hidden="true" />,
  Check: <i className="fa-solid fa-check" aria-hidden="true" />,
};

const meta = {
  title: 'Components/Choicebox',
  component: Choicebox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    label: {
      description:
        'Required primary label text identifying the option. Keep to 1–5 words.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    supportingText: {
      description:
        'Optional secondary text below the label. Use to add context the label alone cannot convey.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    icon: {
      description:
        'Optional icon rendered before the label group. Must be an `<i>` or `<svg>` element.',
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      control: { type: 'select' },
      table: {
        type: { summary: 'ReactElement<"i" | "svg">' },
        defaultValue: { summary: 'undefined' },
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the choicebox is selected (controlled).',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Prevents interaction and applies disabled styling.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      control: { type: 'text' },
      description:
        'Groups related choiceboxes so only one can be selected at a time.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    value: {
      control: { type: 'text' },
      description:
        'Value submitted with the form when this option is selected.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    id: {
      control: { type: 'text' },
      description:
        'ID for the input element. If omitted, a unique ID is generated automatically.',
      table: {
        type: { summary: 'auto-generated | string' },
        defaultValue: { summary: 'auto-generated' },
      },
    },
  },
  args: {
    label: 'Label text',
    checked: false,
    disabled: false,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Choicebox
        {...args}
        onChange={(e) => updateArgs({ checked: e.target.checked })}
      />
    );
  },
} satisfies Meta<typeof Choicebox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default — label only
// ---------------------------------------------------------------------------
export const Default: Story = {
  args: {
    label: 'Label text',
  },
};

// ---------------------------------------------------------------------------
// Group — shows mutually exclusive selection in context
// Wrapped in a role="radiogroup" per accessibility guidelines.
// ---------------------------------------------------------------------------
export const Group: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div
      role="radiogroup"
      aria-label="Choose a course format"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '320px',
      }}
    >
      <Choicebox
        label="Weekly format"
        supportingText="Organises your course into weekly sections."
        name="course-format"
        value="weekly"
        defaultChecked
      />
      <Choicebox
        label="Topics format"
        supportingText="Organises your course into topic sections."
        name="course-format"
        value="topics"
      />
      <Choicebox
        label="Social format"
        supportingText="Centred around a single forum for discussion."
        name="course-format"
        value="social"
        disabled
      />
    </div>
  ),
  // Group story is used for visual/structural testing, not API docs
  tags: ['test', 'stable'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const weekly = canvas.getByRole('radio', {
      name: 'Weekly format Organises your course into weekly sections.',
    });
    const topics = canvas.getByRole('radio', {
      name: 'Topics format Organises your course into topic sections.',
    });
    // Weekly format is pre-selected via defaultChecked
    expect(weekly).toBeChecked();
    expect(topics).not.toBeChecked();
    // Clicking Topics format must deselect Weekly format (radio-group mutual exclusion)
    await userEvent.click(topics.nextElementSibling); // Click the label, not the hidden input
    expect(topics).toBeChecked();
    expect(weekly).not.toBeChecked();
  },
};

// ---------------------------------------------------------------------------
// WithIcon — demonstrates the icon slot in all relevant states
// ---------------------------------------------------------------------------
export const WithIcon: Story = {
  args: {
    label: 'Label text',
    icon: <i className="fa-solid fa-star" />,
  },
  tags: ['autodocs', 'test', 'beta'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('radio');
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
    expect(canvas.getByText('Label text')).toBeInTheDocument();
    // Icon slot should be rendered
    const iconWrapper = canvasElement.querySelector('.mds-choicebox-icon');
    expect(iconWrapper).toBeInTheDocument();
  },
};

// ---------------------------------------------------------------------------
// State matrix — all interactive states × checked/unchecked
// ---------------------------------------------------------------------------

const matrixGridStyle = {
  display: 'grid' as const,
  gap: 'var(--mds-spacing-xs)',
  gridTemplateColumns: 'minmax(8rem, auto) repeat(3, minmax(20rem, auto))',
  alignItems: 'center' as const,
};

const matrixLabelCellStyle = {
  color: 'var(--mds-text-subtle)',
  fontSize: 'var(--mds-font-size-paragraph-small)',
  fontFamily: 'var(--mds-font-family-base)',
  fontWeight: 'var(--mds-font-weight-medium)',
};

const matrixStates = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover' },
  { key: 'pressed', label: 'Pressed' },
  { key: 'focus-visible', label: 'Focus visible' },
  { key: 'disabled', label: 'Disabled' },
] as const;

export const StateMatrix: Story = {
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      canvas: { sourceState: 'none' },
      description: {
        story:
          'State matrix for visual regression review across all interactive states and checked/unchecked combinations. Hover, pressed, and focus-visible cells are driven by the Storybook pseudo-states addon.',
      },
    },
    // Pseudo-states addon: hover/active target the label (.mds-choicebox),
    // focus-visible targets the hidden input (.mds-choicebox-input) — matching
    // the CSS sibling-selector rules in choicebox.css.
    pseudo: {
      hover: "[data-matrix-state='hover'] .mds-choicebox",
      active: "[data-matrix-state='pressed'] .mds-choicebox",
      focusVisible: "[data-matrix-state='focus-visible'] .mds-choicebox-input",
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--mds-spacing-xs)' }}>
      {/* Header row */}
      <div style={matrixGridStyle}>
        <span style={matrixLabelCellStyle}>State</span>
        <span style={matrixLabelCellStyle}>Unselected</span>
        <span style={matrixLabelCellStyle}>Selected</span>
        <span style={matrixLabelCellStyle}>With icon</span>
      </div>

      {/* Data rows: one per state */}
      {matrixStates.map((state) => {
        const isDisabled = state.key === 'disabled';
        return (
          <div
            key={state.key}
            data-matrix-state={state.key}
            style={matrixGridStyle}
          >
            <span style={matrixLabelCellStyle}>{state.label}</span>
            <Choicebox
              label="Label text"
              supportingText="Support text"
              disabled={isDisabled}
              readOnly
            />
            <Choicebox
              label="Label text"
              supportingText="Support text"
              checked
              disabled={isDisabled}
              readOnly
            />
            <Choicebox
              label="Label text"
              supportingText="Support text"
              icon={<i className="fa-solid fa-star" />}
              disabled={isDisabled}
              readOnly
            />
          </div>
        );
      })}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// RTL — verifies CSS logical properties mirror correctly
// ---------------------------------------------------------------------------
export const RightToLeft: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  args: {
    label: 'حالت هفتگی',
    supportingText:
      'برای بررسی چیدمان راست به چپ از متن فارسی استفاده شده است.',
    icon: <i className="fa-solid fa-star" />,
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  tags: ['test', 'stable'],
};
