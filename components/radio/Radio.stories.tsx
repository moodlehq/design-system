import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'beta'],
  argTypes: {
    id: {
      description:
        'ID for the input element, used to associate the label. If omitted, a unique ID is generated automatically.',
      table: {
        type: {
          summary: 'auto-generated | string',
        },
        defaultValue: { summary: 'auto-generated' },
      },
    },
    name: {
      description:
        'Name value associated with the radio input and used to group individual radio buttons.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    value: {
      description: 'Value associated with the radio input.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the radio input is checked (controlled mode).',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: 'Is the radio input required?',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Should the radio input be disabled?',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
    hideLabel: {
      control: { type: 'boolean' },
      description:
        'When true, hides the visible label element. Use only when a visible label would be redundant (e.g. in a table with a header label). Always provide an accessible name via aria-label or label prop.',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      description:
        'Visible label text. Also used as the aria-label fallback when hideLabel is true and no explicit aria-label is provided.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    ['aria-label']: {
      description:
        'Accessible label for the input. Takes precedence over the label prop when hideLabel is true. Required when hideLabel is true and no label prop is provided.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    autoFocus: {
      control: { type: 'boolean' },
      description:
        'Whether the radio input should automatically receive focus when the page loads.',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      description:
        'Additional class names to apply to the radio wrapper div for custom styling when displaying the radio input with a label.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    invalidFeedback: {
      description:
        'Pre-translated error message shown below the label when the input is invalid. Requires invalid={true} to be set. The caller is responsible for supplying a translated string.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    invalid: {
      control: { type: 'boolean' },
      description:
        'Marks the input as invalid, applying danger styling to the input border and label. Set this independently of invalidFeedback to show invalid state without a feedback message.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    name: 'contact-method',
    value: 'email',
    required: false,
    disabled: false,
    invalid: false,
    hideLabel: false,
    label: 'Email',
    autoFocus: false,
    className: undefined,
    invalidFeedback: undefined,
    // Uncontrolled by default; no checked/onChange
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

// Each story uses a unique name so radio groups are independent on the autodocs page.
/**
 * Default unselected state. Clicking the input or label selects it.
 */
export const Default = {
  play: async ({ canvas, userEvent }) => {
    const radio = canvas.getByRole('radio', { name: 'Email' });
    await userEvent.click(radio);
    await expect(radio).toBeChecked();
    await expect(canvas.getByText('Email')).toBeVisible();
  },
} satisfies Story;

/**
 * Pre-checked on render via `defaultChecked`. Use `defaultChecked` for uncontrolled
 * forms and `checked` together with an `onChange` handler for controlled forms.
 */

/**
 * Uncontrolled checked radio example.
 *
 * This story demonstrates the use of `defaultChecked` for an uncontrolled radio input.
 * The checked state is managed by the DOM, not React state. Use this for simple forms where you do not need to track the checked state in React.
 */
export const Checked: Story = {
  args: {
    name: 'contact-checked',
    defaultChecked: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('radio', { name: 'Email' })).toBeChecked();
  },
};

/**
 * Controlled checked radio example.
 *
 * This story demonstrates the use of `checked` and `onChange` for a controlled radio input.
 * The checked state is managed by React state. Use this pattern when you need to track or update the checked state in your component logic.
 */
export const ControlledChecked: Story = {
  args: {
    name: 'contact-controlled',
    checked: true,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('radio', { name: 'Email' })).toBeChecked();
  },
};

/**
 * Multiple `Radio` components sharing the same `name` attribute form a group — the browser ensures only one can be selected at a time. Each option needs its own `value` and `label`; the consumer is responsible for the container and its layout direction.
 *
 * The two layouts below use a flex container to demonstrate both common arrangements. Neither is provided by this component — choose whichever suits the surrounding form.
 */
export const Group: Story = {
  parameters: {
    // The render function contains scaffolding (flex containers, headings) that isn't
    // representative of component usage — suppress the code block in docs.
    docs: { source: { code: null } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Horizontal</p>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <Radio name="contact-group-h" value="email" label="Email" />
          <Radio name="contact-group-h" value="phone" label="Phone" />
          <Radio name="contact-group-h" value="post" label="Post" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Vertical</p>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <Radio name="contact-group-v" value="email" label="Email" />
          <Radio name="contact-group-v" value="phone" label="Phone" />
          <Radio name="contact-group-v" value="post" label="Post" />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    // Two "Email" and "Phone" radios exist (one per layout); index 0 is the horizontal group.
    const [emailH] = canvas.getAllByRole('radio', { name: 'Email' });
    const [phoneH] = canvas.getAllByRole('radio', { name: 'Phone' });
    // Clicking a second option must deselect the first — browser-native mutual exclusion via shared name.
    await userEvent.click(emailH);
    await expect(emailH).toBeChecked();
    await userEvent.click(phoneH);
    await expect(phoneH).toBeChecked();
    await expect(emailH).not.toBeChecked();
  },
};

/**
 * Disabled state — the input is not interactive and cannot be selected. All visual
 * elements (input, label) are rendered with reduced emphasis via token-based colours.
 */
export const Disabled = {
  args: {
    name: 'contact-disabled',
    disabled: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('radio', { name: 'Email' })).toBeDisabled();
  },
} satisfies Story;

/**
 * Disabled and pre-checked. The checked indicator is shown in its disabled colour;
 * the input cannot be interacted with.
 */
export const DisabledChecked: Story = {
  args: {
    name: 'contact-disabled-checked',
    disabled: true,
    defaultChecked: true,
  },
  play: async ({ canvas }) => {
    const radio = canvas.getByRole('radio', { name: 'Email' });
    await expect(radio).toBeChecked();
    await expect(radio).toBeDisabled();
  },
};

/**
 * Invalid state without feedback text. Use this when the surrounding form communicates
 * the error at a group level and individual feedback messages are not needed. The danger
 * border and `aria-invalid` attribute are applied regardless of whether `invalidFeedback`
 * is set.
 */
export const InvalidNoFeedback = {
  args: {
    name: 'contact-invalid',
    invalid: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('radio', { name: 'Email' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  },
} satisfies Story;

/**
 * Invalid state with a feedback message below the label. The message is linked to the
 * input via `aria-describedby` so screen readers announce it alongside the field label.
 * The caller is responsible for supplying a pre-translated string.
 */
export const FeedbackInvalid = {
  args: {
    name: 'contact-feedback',
    invalid: true,
    invalidFeedback: 'Please select a contact method',
  },
  play: async ({ canvas }) => {
    const radio = canvas.getByRole('radio', { name: 'Email' });
    await expect(radio).toHaveAttribute('aria-invalid', 'true');
    await expect(
      canvas.getByText('Please select a contact method'),
    ).toBeVisible();
  },
} satisfies Story;

/**
 * `hideLabel` with an explicit `aria-label`. Use this when no visible label is wanted
 * but the input must still be accessible — for example, inside a table where the column
 * heading acts as the label. The `aria-label` prop takes precedence over the `label` prop
 * when `hideLabel` is true.
 */
export const InputOnly = {
  args: {
    name: 'contact-input-only',
    hideLabel: true,
    label: undefined,
    'aria-label': 'Email',
  },
  play: async ({ canvas, userEvent }) => {
    const radio = canvas.getByRole('radio', { name: 'Email' });
    // The sole purpose of this story is the label-less accessibility path — confirm
    // aria-label is applied and the input is selectable without a visible label.
    await expect(radio).toHaveAccessibleName('Email');
    await userEvent.click(radio);
    await expect(radio).toBeChecked();
  },
} satisfies Story;

/**
 * No specific Figma design for RTL, but this story ensures that the component can be used in RTL contexts without layout or functionality issues. The label and feedback text are provided in Arabic to reflect a common RTL language scenario.
 */
export const RightToLeft: Story = {
  tags: ['test', 'beta'],
  parameters: {
    // The render function contains a dir="rtl" wrapper that isn't representative of component usage — suppress the code block in docs.
    docs: { source: { code: null } },
  },
  args: {
    name: 'contact-rtl',
    label: 'خيار واحد',
    invalid: true,
    invalidFeedback: 'يرجى اختيار هذا الخيار',
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('radio', { name: 'خيار واحد' }));
    await expect(canvas.getByText('خيار واحد')).toBeVisible();
    await expect(canvas.getByText('يرجى اختيار هذا الخيار')).toBeVisible();
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};

/**
 * `hideLabel` with the `label` prop used as the accessible name fallback. No explicit
 * `aria-label` is provided — the component derives the accessible name from `label`.
 */
export const HideLabelFallback: Story = {
  args: {
    name: 'contact-hide-label-fallback',
    hideLabel: true,
    label: 'Email',
  },
  play: async ({ canvas, userEvent }) => {
    const radio = canvas.getByRole('radio', { name: 'Email' });
    await expect(radio).toHaveAccessibleName('Email');
    await userEvent.click(radio);
    await expect(radio).toBeChecked();
  },
};

/**
 * Keyboard interaction: Tab to focus the input, then Space to select it.
 */
export const KeyboardInteraction: Story = {
  args: {
    name: 'contact-keyboard',
  },
  play: async ({ canvas, userEvent }) => {
    const radio = canvas.getByRole('radio', { name: 'Email' });
    await userEvent.tab();
    await expect(radio).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(radio).toBeChecked();
  },
};
