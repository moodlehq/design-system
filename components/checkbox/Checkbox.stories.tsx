import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import { expect, waitFor } from 'storybook/test';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    label: {
      description:
        'Visible label text. Also used as the aria-label fallback when hideLabel is true and no explicit aria-label is provided.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    hideLabel: {
      control: { type: 'boolean' },
      description:
        'When true, hides the visible label element. Use only when a visible label would be redundant. Always provide an accessible name via aria-label or label prop.',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
    ['aria-label']: {
      control: { type: 'text' },
      description:
        'Accessible label for the input. Takes precedence over the label prop when hideLabel is true. Required when hideLabel is true and no label prop is provided.',
      if: { arg: 'hideLabel', truthy: true },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    checked: {
      control: { type: 'boolean' },
      description:
        'Whether the checkbox input is checked (controlled mode). Use checked together with an onChange handler to keep the component interactive.',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      control: false,
      description:
        'Change handler for controlled usage. When checked is provided, onChange is required unless readOnly is true.',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void',
        },
      },
    },
    indeterminate: {
      control: { type: 'boolean' },
      description:
        'Renders the checkbox in a mixed state, typically for parent/select-all controls.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description:
        'Prevents interaction with the checkbox and applies disabled styling.',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
    invalid: {
      control: { type: 'boolean' },
      description:
        'Marks the input as invalid. Sets aria-invalid on the input and applies danger styling to the border and label.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    invalidFeedback: {
      control: { type: 'text' },
      description:
        'Pre-translated error message shown below the label when the input is invalid. Requires invalid={true} to be set.',
      if: { arg: 'invalid', truthy: true },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    required: {
      control: { type: 'boolean' },
      description:
        'Marks the checkbox as required for form submission. Displays a visual required indicator beside the label.',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
    supportingText: {
      description:
        'Optional helper text shown below the label when no invalid feedback is active.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    id: {
      control: { type: 'text' },
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
      control: { type: 'text' },
      description:
        'Name attribute submitted with the form. Groups related checkboxes under the same key.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    value: {
      control: { type: 'text' },
      description:
        'Value submitted with the form when the checkbox is checked.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    autoFocus: {
      control: { type: 'boolean' },
      description:
        'Whether the checkbox input should automatically receive focus when the page loads.',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    label: 'Remember this setting',
    name: 'settings',
    value: 'remember-this-setting',
    hideLabel: false,
    indeterminate: false,
    disabled: false,
    invalid: false,
    invalidFeedback: undefined,
    required: false,
    autoFocus: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    checked: false,
  },
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs<typeof args>();

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(event) => {
          updateArgs({ checked: event.target.checked });
        }}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole('checkbox', {
      name: 'Remember this setting',
    });
    await userEvent.click(checkbox);
    await waitFor(() => {
      expect(
        canvas.getByRole('checkbox', { name: 'Remember this setting' }),
      ).toBeVisible();
    });
    await userEvent.click(
      canvas.getByRole('checkbox', {
        name: 'Remember this setting',
      }),
    );
    // Return to a neutral visual baseline so screenshot QA is not biased by focus styling.
    const currentCheckbox = canvas.getByRole('checkbox', {
      name: 'Remember this setting',
    });
    currentCheckbox.blur();
    await expect(currentCheckbox).not.toHaveFocus();
    await expect(canvas.getByText('Remember this setting')).toBeVisible();
  },
} satisfies Story;

/**
 * Uncontrolled checked checkbox example.
 *
 * This story demonstrates the use of `defaultChecked` for an uncontrolled checkbox input.
 * The checked state is managed by the DOM, not React state. Use this for simple forms where you do not need to track the checked state in React.
 */

export const DefaultChecked: Story = {
  name: 'Uncontrolled checked',
  parameters: {
    docs: {
      source: {
        code: `import { Checkbox } from '@moodlehq/design-system';

export const DefaultCheckedExample = () => (
  <Checkbox
    label="Remember this setting"
    name="settings"
    value="remember-this-setting"
    defaultChecked
  />
);`,
      },
    },
  },
  args: {
    defaultChecked: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('checkbox', { name: 'Remember this setting' }),
    ).toBeChecked();
  },
};

/**
 * Controlled checked checkbox example.
 *
 * This story demonstrates the use of `checked` and `onChange` for a controlled checkbox input.
 * The checked state is managed by React state. Use this pattern when you need to track or update the checked state in your component logic.
 */

export const ControlledChecked: Story = {
  name: 'Controlled checked',
  parameters: {
    docs: {
      source: {
        code: `import { useState } from 'react';
import { Checkbox } from '@moodlehq/design-system';

export const ControlledCheckedExample = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      label="Remember this setting"
      name="settings"
      value="remember-this-setting"
      checked={checked}
      onChange={handleChange}
    />
  );
};`,
      },
    },
  },
  args: {
    checked: true,
  },
  render: function Render(args) {
    const [checked, setChecked] = useState<boolean>(!!args.checked);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole('checkbox', {
      name: 'Remember this setting',
    });
    await expect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('checkbox', { name: 'Remember this setting' }),
    ).toBeDisabled();
  },
} satisfies Story;

export const Invalid: Story = {
  args: {
    invalid: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('checkbox', { name: 'Remember this setting' }),
    ).toHaveAttribute('aria-invalid', 'true');
  },
};

export const InvalidWithFeedback: Story = {
  args: {
    invalid: true,
    invalidFeedback: 'Select this option to continue',
  },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox', {
      name: 'Remember this setting',
    });
    await expect(checkbox).toHaveAttribute('aria-describedby');
    await expect(
      canvas.getByText('Select this option to continue'),
    ).toBeVisible();
  },
};

export const SupportingText: Story = {
  args: {
    supportingText: 'Used for helper context when no error is present',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Used for helper context when no error is present'),
    ).toBeVisible();
  },
};

export const WrappedLabel: Story = {
  render: (args) => (
    <div style={{ width: '14rem' }}>
      <Checkbox {...args} />
    </div>
  ),
  args: {
    required: true,
    label:
      'Remember this setting so the label wraps naturally when the available viewport width is too small for a single line',
    supportingText:
      'This helper text should also wrap cleanly when the viewport is narrow.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('checkbox', {
        name: 'Remember this setting so the label wraps naturally when the available viewport width is too small for a single line',
      }),
    ).toBeVisible();
    await expect(
      canvas.getByText(
        'Remember this setting so the label wraps naturally when the available viewport width is too small for a single line',
      ),
    ).toBeVisible();
    await expect(
      canvas.getByText(
        'This helper text should also wrap cleanly when the viewport is narrow.',
      ),
    ).toBeVisible();
    await expect(canvas.getByText('*')).toBeVisible();
  },
} satisfies Story;

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox', {
      name: 'Remember this setting',
    });
    await expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    // `indeterminate` is set via useEffect; waitFor retries until the effect is applied.
    await waitFor(() => {
      expect(checkbox).toHaveProperty('indeterminate', true);
    });
  },
};

export const RequiredIndicator: Story = {
  args: {
    required: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('*')).toBeVisible();
    await expect(
      canvas.getByRole('checkbox', { name: 'Remember this setting' }),
    ).toBeRequired();
  },
};

export const HiddenLabel: Story = {
  args: {
    hideLabel: true,
    ['aria-label']: 'Remember this setting',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('checkbox', { name: 'Remember this setting' }),
    ).toBeVisible();
    await expect(
      canvas.queryByText('Remember this setting'),
    ).not.toBeInTheDocument();
  },
};

export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  args: {
    label: 'تذكر هذا الإعداد',
    required: true,
    invalid: true,
    invalidFeedback: 'هذا الحقل مطلوب',
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('checkbox', { name: 'تذكر هذا الإعداد' }),
    ).toBeVisible();
    await expect(canvas.getByText('*')).toBeVisible();
    await expect(canvas.getByText('هذا الحقل مطلوب')).toBeVisible();
  },
};
