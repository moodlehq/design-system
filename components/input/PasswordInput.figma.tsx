import figma from '@figma/code-connect';
import { PasswordInput } from './PasswordInput';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=14649-2248';

// The lock icon and visibility toggle are fixed in PasswordInput, so the
// nested "Leading icon" and "Toggle button" booleans have no code prop.
// Hover, active, and focus are interaction states with no code prop.
const baseProps = {
  label: figma.string('Label text'),
  hideLabel: figma.boolean('Show label', { true: false, false: true }),
  required: figma.boolean('Required'),
  infoTooltipLabel: figma.boolean('Info', {
    true: 'More information about this field',
    false: undefined,
  }),
  disabled: figma.enum('State', { disabled: true }),
  readOnly: figma.enum('State', { 'read-only': true }),
  field: figma.nestedProps('Input/input.password', {
    placeholder: figma.enum('Content', {
      Placeholder: figma.string('Placeholder text'),
    }),
    // Masked vs visible is runtime toggle state, not a prop — both render
    // the same prefilled value.
    defaultValue: figma.enum('Content', {
      'Filled masked': figma.string('Fill text'),
      'Filled visible': figma.string('Fill text'),
    }),
  }),
};

figma.connect(PasswordInput, url, {
  variant: { Type: 'Password', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: undefined,
    }),
  },
  example: ({ field, supportingText, ...props }) => (
    <PasswordInput
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      supportingText={supportingText}
      passwordToggleShowLabel="Show password"
      passwordToggleHideLabel="Hide password"
    />
  ),
});

// In the invalid state the supporting text slot carries the validation
// message, which maps to invalidFeedback in code.
figma.connect(PasswordInput, url, {
  variant: { Type: 'Password', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: undefined,
    }),
  },
  example: ({ field, invalidFeedback, ...props }) => (
    <PasswordInput
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      invalid
      invalidFeedback={invalidFeedback}
      passwordToggleShowLabel="Show password"
      passwordToggleHideLabel="Hide password"
    />
  ),
});
