import figma from '@figma/code-connect';
import { Select } from './Select';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=15857-3800';

// Props shared by every connection. Each mapping covers all of its Figma
// values ('' where a prop should be absent) so no snippet ever receives
// undefined. Figma's single `Value` text stands in for the chosen option, so
// the snippet renders it as the one option in `options`.
const baseProps = {
  label: figma.string('Label text'),
  hideLabel: figma.boolean('Show label', { true: false, false: true }),
  required: figma.boolean('Required'),
  infoTooltipLabel: figma.boolean('Info', {
    true: 'More information about this field',
    false: '',
  }),
  value: figma.string('Value'),
};

// One connection per State × isInvalid, with state props written into the
// JSX rather than derived, per the Code Connect guidelines. Hover, active,
// and focus are interaction states with no code prop, so they share the
// default snippet. In the invalid state the supporting text slot carries the
// validation message (invalidFeedback).
figma.connect(Select, url, {
  variant: { State: 'default', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ value, ...props }) => (
    <Select {...props} options={[{ value: 'option', label: value }]} />
  ),
});

figma.connect(Select, url, {
  variant: { State: 'default', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ value, ...props }) => (
    <Select {...props} options={[{ value: 'option', label: value }]} invalid />
  ),
});

figma.connect(Select, url, {
  variant: { State: 'hover', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ value, ...props }) => (
    <Select {...props} options={[{ value: 'option', label: value }]} />
  ),
});

figma.connect(Select, url, {
  variant: { State: 'hover', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ value, ...props }) => (
    <Select {...props} options={[{ value: 'option', label: value }]} invalid />
  ),
});

figma.connect(Select, url, {
  variant: { State: 'active', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ value, ...props }) => (
    <Select {...props} options={[{ value: 'option', label: value }]} />
  ),
});

figma.connect(Select, url, {
  variant: { State: 'active', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ value, ...props }) => (
    <Select {...props} options={[{ value: 'option', label: value }]} invalid />
  ),
});

figma.connect(Select, url, {
  variant: { State: 'focus', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ value, ...props }) => (
    <Select {...props} options={[{ value: 'option', label: value }]} />
  ),
});

figma.connect(Select, url, {
  variant: { State: 'focus', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ value, ...props }) => (
    <Select {...props} options={[{ value: 'option', label: value }]} invalid />
  ),
});

// Figma defines disabled only with isInvalid=No.
figma.connect(Select, url, {
  variant: { State: 'disabled', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ value, ...props }) => (
    <Select {...props} options={[{ value: 'option', label: value }]} disabled />
  ),
});
