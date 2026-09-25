import figma from '@figma/code-connect';
import { Input } from './Input';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=14649-2248';

// Figma models the HTML type (email, number, tel, url) as implementation
// guidance rather than a component property, so `type` is left at its
// default. Hover, active, and focus are interaction states with no code prop.
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
  field: figma.nestedProps('Input/input.text', {
    placeholder: figma.enum('Content', {
      Placeholder: figma.string('Placeholder text'),
    }),
    defaultValue: figma.enum('Content', {
      Filled: figma.string('Fill text'),
    }),
    // The Figma icon is a free swap with no Code Connect of its own, so a
    // representative Font Awesome icon stands in for whichever one is chosen.
    startIcon: figma.boolean('Leading icon', {
      true: <i className="fa-solid fa-user" aria-hidden="true" />,
      false: undefined,
    }),
  }),
};

figma.connect(Input, url, {
  variant: { Type: 'Text', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: undefined,
    }),
  },
  example: ({ field, supportingText, ...props }) => (
    <Input
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      startIcon={field.startIcon}
      supportingText={supportingText}
    />
  ),
});

// In the invalid state the supporting text slot carries the validation
// message, which maps to invalidFeedback in code.
figma.connect(Input, url, {
  variant: { Type: 'Text', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: undefined,
    }),
  },
  example: ({ field, invalidFeedback, ...props }) => (
    <Input
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      startIcon={field.startIcon}
      invalid
      invalidFeedback={invalidFeedback}
    />
  ),
});
