import figma from '@figma/code-connect';
import { Input } from './Input';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=14649-2248';

// Figma models the HTML type (email, number, tel, url) as implementation
// guidance rather than a component property, so `type` is left at its
// default. The leading icon is a nested boolean with a free icon swap and
// no Code Connect of its own; nested properties can't be split with variant
// filters and startIcon has no empty value, so it is left out of the
// snippet.
// Every mapping covers all of its values ('' where a prop should be absent)
// so no snippet ever receives undefined.
const baseProps = {
  label: figma.string('Label text'),
  hideLabel: figma.boolean('Show label', { true: false, false: true }),
  required: figma.boolean('Required'),
  infoTooltipLabel: figma.boolean('Info', {
    true: 'More information about this field',
    false: '',
  }),
  field: figma.nestedProps('Input/input.text', {
    placeholder: figma.enum('Content', {
      Empty: '',
      Placeholder: figma.string('Placeholder text'),
      Filled: '',
    }),
    defaultValue: figma.enum('Content', {
      Empty: '',
      Placeholder: '',
      Filled: figma.string('Fill text'),
    }),
  }),
};

// One connection per State (and isInvalid where Figma defines it), with
// state props written into the JSX rather than derived, per the Code Connect
// guidelines. Hover, active, and focus are interaction states with no code
// prop, so they share the default snippet. In the invalid state the
// supporting text slot carries the validation message (invalidFeedback).
figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'default', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <Input
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
    />
  ),
});

figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'default', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <Input
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      invalid
    />
  ),
});

figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'hover', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <Input
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
    />
  ),
});

figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'hover', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <Input
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      invalid
    />
  ),
});

figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'active', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <Input
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
    />
  ),
});

figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'active', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <Input
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      invalid
    />
  ),
});

figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'focus', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <Input
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
    />
  ),
});

figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'focus', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <Input
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      invalid
    />
  ),
});

figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'disabled' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <Input
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      disabled
    />
  ),
});

figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'read-only' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <Input
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      readOnly
    />
  ),
});
