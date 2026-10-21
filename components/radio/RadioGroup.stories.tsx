import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import { Button } from '../button';
import { RadioGroup, type RadioGroupOption } from './RadioGroup';

const frequencyOptions: RadioGroupOption[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const meta = {
  title: 'Components/Radio/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    label: {
      description:
        'Pre-translated group label. Name the choice with a short noun phrase in sentence case.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    options: {
      description:
        'Options rendered as Radio inputs sharing one name. Use 2 to 5 options — use Select for 6 or more.',
      control: { type: 'object' },
      table: { type: { summary: '{ value: string; label: string }[]' } },
    },
    orientation: {
      description:
        'Vertical (default) stacks options. Horizontal places them in one row without wrapping — use it only when every label is short.',
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      table: {
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: 'vertical' },
      },
    },
    name: {
      description:
        'Shared name for every radio input. Generated automatically when omitted.',
      control: { type: 'text' },
      table: { defaultValue: { summary: 'auto-generated' } },
    },
    value: {
      description: 'Selected value for controlled usage. Pair with onChange.',
      control: { type: 'text' },
    },
    defaultValue: {
      description: 'Initially selected value for uncontrolled usage.',
      control: { type: 'text' },
    },
    onChange: {
      control: false,
      description: 'Called with the newly selected value.',
      table: {
        type: {
          summary:
            '(value: string, event: React.ChangeEvent<HTMLInputElement>) => void',
        },
      },
    },
    hideLabel: {
      description:
        'Hides the label row (label, required marker, info button). Only use when a nearby heading already names the choice; the label (or aria-label) is still used as the accessible name.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      description:
        'Shows the asterisk and enables native required validation. A failed submit shows the browser message in the supporting text row.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      description:
        'Disables every radio and mutes the supporting text. Takes precedence over invalid.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
      description:
        'Marks every radio invalid and turns the supporting text danger. Always pair with invalidFeedback so the error does not rely on colour.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    invalidFeedback: {
      description:
        "Pre-translated error message shown in place of supportingText while invalid. Also replaces the browser's message when native required validation fails, so pass it whenever required is set.",
      control: { type: 'text' },
      if: { arg: 'invalid', truthy: true },
    },
    supportingText: {
      description: 'Pre-translated guidance shown below the options.',
      control: { type: 'text' },
    },
    infoTooltipLabel: {
      description:
        'Pre-translated accessible name and tooltip for the info button. The button only renders when this is set.',
      control: { type: 'text' },
    },
  },
  args: {
    label: 'Email frequency',
    options: frequencyOptions,
    orientation: 'vertical',
    hideLabel: false,
    required: false,
    disabled: false,
    invalid: false,
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default vertical group with no option selected, so people make an active choice.
 */
export const Default: Story = {
  play: async ({ canvas }) => {
    const group = canvas.getByRole('radiogroup', { name: 'Email frequency' });
    await expect(group).toBeVisible();
    await expect(canvas.getAllByRole('radio')).toHaveLength(3);
    for (const radio of canvas.getAllByRole('radio')) {
      await expect(radio).not.toBeChecked();
    }
  },
};

/**
 * Horizontal places options in one row and never wraps. Use it only for a few
 * short labels, and switch to vertical when the options no longer fit.
 */
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    supportingText: 'You can change this at any time.',
  },
  play: async ({ canvas }) => {
    const [first, second] = canvas.getAllByRole('radio');
    // Same row: the second option sits beside the first, not below it.
    await expect(second.getBoundingClientRect().top).toBe(
      first.getBoundingClientRect().top,
    );
  },
};

/**
 * Supporting text below the options says what to choose or why it matters,
 * and is the group's accessible description.
 */
export const WithSupportingText: Story = {
  args: {
    supportingText: 'You can change this at any time.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('radiogroup', { name: 'Email frequency' }),
    ).toHaveAccessibleDescription('You can change this at any time.');
  },
};

/**
 * An info button beside the label, for when the label and supporting text
 * can't explain the choice. Give it a name that includes the label.
 */
export const WithInfoButton: Story = {
  args: {
    infoTooltipLabel: 'More information about email frequency',
  },
  play: async ({ canvas }) => {
    const info = canvas.getByRole('button', {
      name: 'More information about email frequency',
    });
    await expect(info).toBeVisible();
    // The button sits in the label row, outside the radiogroup.
    await expect(canvas.getByRole('radiogroup')).not.toContainElement(info);
  },
};

/**
 * The asterisk is visual only; the group is marked required in code so
 * assistive technology announces it, and native required validation is on.
 */
export const Required: Story = {
  args: {
    required: true,
  },
  play: async ({ canvas, canvasElement }) => {
    const group = canvas.getByRole('radiogroup', { name: 'Email frequency' });
    await expect(group).toHaveAttribute('aria-required', 'true');
    await expect(
      canvasElement.querySelector('.mds-radio-group-required'),
    ).toHaveAttribute('aria-hidden', 'true');
    for (const radio of canvas.getAllByRole('radio')) {
      await expect(radio).toBeRequired();
    }
  },
};

/**
 * Invalid: every radio shows its invalid treatment and the error message
 * replaces the supporting text. The message is the group's accessible description.
 */
export const Invalid: Story = {
  args: {
    required: true,
    invalid: true,
    supportingText: 'You can change this at any time.',
    invalidFeedback: 'Choose how often we email you.',
  },
  play: async ({ canvas }) => {
    const group = canvas.getByRole('radiogroup', { name: 'Email frequency' });
    await expect(group).toHaveAccessibleDescription(
      'Choose how often we email you.',
    );
    for (const radio of canvas.getAllByRole('radio')) {
      await expect(radio).toHaveAttribute('aria-invalid', 'true');
    }
  },
};

/**
 * Disabled: no radio can be focused or changed and the supporting text mutes.
 * The label and asterisk keep their colours so the field stays identifiable.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    required: true,
    supportingText: 'Email notifications are turned off for this site.',
  },
  play: async ({ canvas }) => {
    for (const radio of canvas.getAllByRole('radio')) {
      await expect(radio).toBeDisabled();
    }
  },
};

/**
 * `hideLabel` removes the label row; the `label` still names the group for
 * assistive technology. Use only when a nearby heading already names the choice.
 */
export const HiddenLabel: Story = {
  args: {
    hideLabel: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByText('Email frequency')).toBeNull();
    await expect(canvas.getByRole('radiogroup')).toHaveAccessibleName(
      'Email frequency',
    );
  },
};

/**
 * Uncontrolled group with a pre-selected recommended option via `defaultValue`.
 */
export const DefaultValue: Story = {
  name: 'Uncontrolled default value',
  parameters: {
    // Behaviour check: ends on a plain selected group.
    chromatic: { disableSnapshot: true },
  },
  args: {
    defaultValue: 'weekly',
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('radio', { name: 'Weekly' })).toBeChecked();
    await userEvent.click(canvas.getByRole('radio', { name: 'Daily' }));
    await expect(canvas.getByRole('radio', { name: 'Daily' })).toBeChecked();
    await expect(
      canvas.getByRole('radio', { name: 'Weekly' }),
    ).not.toBeChecked();
  },
};

/**
 * Controlled group: the selected value lives in React state and `onChange`
 * receives the new value.
 *
 * With React Hook Form, use `Controller` rather than `register()`, because
 * `onChange` passes the value first: `value={field.value}`,
 * `onChange={field.onChange}`, `onBlur={field.onBlur}`, and
 * `inputRef={field.ref}` so the form can focus the group on error.
 */
export const Controlled: Story = {
  parameters: {
    // Behaviour check: ends on a plain selected group.
    chromatic: { disableSnapshot: true },
    docs: {
      source: {
        code: `import { useState } from 'react';
import { RadioGroup } from '@moodlehq/design-system';

export const ControlledExample = () => {
  const [frequency, setFrequency] = useState('weekly');

  return (
    <RadioGroup
      label={t('emailfrequency')}
      options={options}
      value={frequency}
      onChange={(value) => setFrequency(value)}
    />
  );
};`,
      },
    },
  },
  render: function Render(args) {
    const [value, setValue] = useState('weekly');
    const selectedLabel = args.options.find(
      (option) => option.value === value,
    )?.label;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--mds-spacing-lg)',
        }}
      >
        <RadioGroup {...args} value={value} onChange={setValue} />
        {/* Story scaffolding, not part of RadioGroup: shows the selection the
            app holds in its own state, which onChange updates. */}
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--mds-font-family-base)',
            fontSize: 'var(--mds-font-size-paragraph-small)',
            color: 'var(--mds-text-subtle)',
          }}
        >
          Selected: <output data-testid="selected">{selectedLabel}</output>
        </p>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('radio', { name: 'Monthly' }));
    await expect(canvas.getByTestId('selected')).toHaveTextContent('Monthly');
    await expect(canvas.getByRole('radio', { name: 'Monthly' })).toBeChecked();
  },
};

/**
 * Submitting a form with a required, unanswered group moves focus to the first
 * radio and shows `invalidFeedback` in the supporting text row, so screen
 * readers announce it. Pass `invalidFeedback` with `required`: without it the
 * browser's own message shows, in the browser's language rather than the
 * user's. Choosing an option clears the error.
 */
export const RequiredValidation: Story = {
  args: {
    required: true,
    supportingText: 'You can change this at any time.',
  },
  parameters: {
    // Behaviour check: the last step clears the error, so it ends on a plain
    // selected group.
    chromatic: { disableSnapshot: true },
    // The form and submit button are story scaffolding, not component usage.
    docs: { source: { code: null } },
  },
  // invalidFeedback is passed here rather than in args: its argType is
  // conditional on `invalid`, and Storybook drops a conditional arg while its
  // condition is false, so it would never reach the component.
  render: (args) => (
    <form
      onSubmit={(event) => event.preventDefault()}
      // Column layout so the button sits clear of the field and keeps its
      // own width instead of stretching.
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 'var(--mds-spacing-lg)',
      }}
    >
      <RadioGroup {...args} invalidFeedback="Choose how often we email you." />
      <Button type="submit" label="Save" variant="primary" />
    </form>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Save' }));
    const daily = canvas.getByRole('radio', { name: 'Daily' });
    await waitFor(() => expect(daily).toHaveAttribute('aria-invalid', 'true'));
    await expect(daily).toHaveFocus();
    await expect(daily).toHaveAccessibleDescription(
      'Choose how often we email you.',
    );
    await userEvent.click(daily);
    await expect(daily).not.toHaveAttribute('aria-invalid');
  },
};

/**
 * Native radio keyboard pattern: Tab enters the group, arrow keys move and select.
 */
export const KeyboardInteraction: Story = {
  parameters: {
    // Behaviour check: ends on a focus ring, which snapshots unreliably.
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('radio', { name: 'Daily' })).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    const weekly = canvas.getByRole('radio', { name: 'Weekly' });
    await expect(weekly).toHaveFocus();
    await expect(weekly).toBeChecked();
  },
};

/**
 * Horizontal never wraps. When translated labels grow too long to fit on one
 * line in the form column, the group switches to the vertical layout by itself
 * rather than overflowing sideways, and switches back once there's room.
 */
export const HorizontalFallback: Story = {
  tags: ['test', 'stable'],
  parameters: {
    docs: { source: { code: null } },
  },
  args: {
    label: 'E-Mail-Häufigkeit',
    orientation: 'horizontal',
    options: [
      { value: 'daily', label: 'Täglich zusammengefasst' },
      { value: 'weekly', label: 'Wöchentlich zusammengefasst' },
      { value: 'monthly', label: 'Monatlich zusammengefasst' },
    ],
  },
  decorators: [
    (Story) => (
      // A typical form column; the labels need more than this on one line.
      <div data-testid="column" style={{ inlineSize: '24rem' }}>
        <Story />
      </div>
    ),
  ],
  // Narrow → wide → narrow, so both directions are checked and the story ends
  // on the fallback layout, which is what Chromatic snapshots.
  play: async ({ canvas }) => {
    const group = canvas.getByRole('radiogroup');
    const column = canvas.getByTestId('column');
    const expectVerticalWithoutOverflow = async () => {
      await waitFor(() =>
        expect(group).toHaveClass('mds-radio-group-options--vertical'),
      );
      await expect(group.scrollWidth).toBeLessThanOrEqual(group.clientWidth);
    };

    await expectVerticalWithoutOverflow();

    // Given room for all three on one line, it returns to horizontal.
    column.style.inlineSize = '60rem';
    await waitFor(() =>
      expect(group).toHaveClass('mds-radio-group-options--horizontal'),
    );
    const [first, second] = canvas.getAllByRole('radio');
    await expect(second.getBoundingClientRect().top).toBe(
      first.getBoundingClientRect().top,
    );

    // Narrowed again, it falls back to vertical.
    column.style.inlineSize = '24rem';
    await expectVerticalWithoutOverflow();
  },
};

/**
 * The same fallback inside a container sized to its content (here
 * `inline-flex`, as in a toolbar or filter bar), where the group can't take
 * its width from its parent. It still switches to vertical when the column
 * narrows, and back to horizontal when it widens.
 */
export const HorizontalFallbackFitContent: Story = {
  tags: ['test', 'stable'],
  parameters: {
    // Behaviour check: ends on the same layout HorizontalFallback snapshots.
    chromatic: { disableSnapshot: true },
    docs: { source: { code: null } },
  },
  args: HorizontalFallback.args,
  decorators: [
    (Story) => (
      <div data-testid="column" style={{ inlineSize: '24rem' }}>
        <div style={{ display: 'inline-flex', maxInlineSize: '100%' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  play: async ({ canvas, canvasElement }) => {
    const group = canvas.getByRole('radiogroup');
    const column = canvas.getByTestId('column');
    const root = canvasElement.querySelector('.mds-radio-group') as HTMLElement;
    const expectVerticalWithinColumn = async () => {
      await waitFor(() =>
        expect(group).toHaveClass('mds-radio-group-options--vertical'),
      );
      await expect(root.getBoundingClientRect().width).toBeLessThanOrEqual(
        column.getBoundingClientRect().width,
      );
    };

    await expectVerticalWithinColumn();

    column.style.inlineSize = '60rem';
    await waitFor(() =>
      expect(group).toHaveClass('mds-radio-group-options--horizontal'),
    );

    column.style.inlineSize = '24rem';
    await expectVerticalWithinColumn();
  },
};

/**
 * A group label that wraps onto several lines (long translations, narrow
 * containers) keeps clear space between its lines.
 */
export const LongLabel: Story = {
  tags: ['test', 'stable'],
  parameters: {
    docs: { source: { code: null } },
  },
  args: {
    label:
      'Wie oft möchten Sie E-Mail-Benachrichtigungen über neue Forumsbeiträge erhalten?',
    required: true,
  },
  decorators: [
    (Story) => (
      <div style={{ inlineSize: '16rem' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const label = canvasElement.querySelector(
      '.mds-radio-group-label-text',
    ) as HTMLElement;
    const style = getComputedStyle(label);
    await expect(parseFloat(style.lineHeight)).toBeGreaterThanOrEqual(
      parseFloat(style.fontSize),
    );
    // It really does wrap: taller than one line.
    await expect(label.getBoundingClientRect().height).toBeGreaterThan(
      parseFloat(style.lineHeight),
    );
  },
};

/**
 * No specific Figma design for RTL; confirms the label row, options, and
 * supporting text mirror correctly.
 */
export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  parameters: {
    docs: { source: { code: null } },
  },
  args: {
    label: 'تكرار البريد الإلكتروني',
    orientation: 'horizontal',
    required: true,
    infoTooltipLabel: 'مزيد من المعلومات',
    supportingText: 'يمكنك تغيير ذلك في أي وقت.',
    options: [
      { value: 'daily', label: 'يومي' },
      { value: 'weekly', label: 'أسبوعي' },
      { value: 'monthly', label: 'شهري' },
    ],
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
      canvas.getByRole('radiogroup', { name: 'تكرار البريد الإلكتروني' }),
    ).toBeVisible();
    // Options run right to left: the second sits to the left of the first.
    const [first, second] = canvas.getAllByRole('radio');
    await expect(second.getBoundingClientRect().right).toBeLessThan(
      first.getBoundingClientRect().left,
    );
    // The info button follows the label, so it sits to its left.
    const labelText = canvas.getByText('تكرار البريد الإلكتروني');
    const info = canvas.getByRole('button', { name: 'مزيد من المعلومات' });
    await expect(info.getBoundingClientRect().right).toBeLessThanOrEqual(
      labelText.getBoundingClientRect().left,
    );
  },
};

const showcaseParameters = {
  controls: { disable: true },
  docs: { canvas: { sourceState: 'none' } },
} as const;

const showcaseTableStyle = {
  borderCollapse: 'collapse' as const,
  tableLayout: 'fixed' as const,
  inlineSize: '100%',
  minInlineSize: '40rem',
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
  verticalAlign: 'top' as const,
};

const matrixStates = [
  { name: 'Default', props: {} },
  { name: 'Disabled', props: { disabled: true } },
  {
    name: 'Invalid',
    props: { invalid: true, invalidFeedback: 'Supporting text' },
  },
] as const;

const matrixOrientations = ['vertical', 'horizontal'] as const;

/**
 * State matrix for visual regression review, covering every Figma State ×
 * Orientation variant with all content options on. Focus belongs to each
 * Radio and is covered by the Radio stories; the group has no hover or active state.
 */
export const StateMatrix: Story = {
  parameters: showcaseParameters,
  render: () => (
    <table style={showcaseTableStyle}>
      <thead>
        <tr>
          <th style={showcaseHeaderCellStyle} scope="col">
            State
          </th>
          {matrixOrientations.map((orientation) => (
            <th key={orientation} style={showcaseHeaderCellStyle} scope="col">
              {orientation === 'vertical' ? 'Vertical' : 'Horizontal'}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {matrixStates.map((state) => (
          <tr key={state.name}>
            <th style={showcaseRowHeaderCellStyle} scope="row">
              {state.name}
            </th>
            {matrixOrientations.map((orientation) => (
              <td key={orientation} style={showcaseStatesCellStyle}>
                <RadioGroup
                  label={`${state.name} ${orientation}`}
                  options={[
                    { value: 'item-1', label: 'Item 1' },
                    { value: 'item-2', label: 'Item 2' },
                    { value: 'item-3', label: 'Item 3' },
                  ]}
                  orientation={orientation}
                  required
                  infoTooltipLabel={`More information about ${state.name} ${orientation}`}
                  supportingText="Supporting text"
                  {...state.props}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('radiogroup')).toHaveLength(6);
  },
};
