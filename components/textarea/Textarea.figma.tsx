import figma from '@figma/code-connect';
import { Textarea } from './Textarea';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=13934-4878';

// Props shared by every connection. Each mapping covers all of its Figma
// values ('' or false where the prop should be absent) so no snippet ever
// receives undefined. The label and filled value have no component property
// in Figma, so they are read from their text layers.
const baseProps = {
  label: figma.textContent('label-text'),
  hideLabel: figma.boolean('Show Label', { true: false, false: true }),
  required: figma.boolean('Required'),
  resizable: figma.boolean('Resizable'),
  infoTooltipLabel: figma.boolean('Info', {
    true: 'More information about this field',
    false: '',
  }),
  placeholder: figma.string('Placeholder text'),
};

// One connection per State x Counter, with state and counter props written
// into the JSX rather than derived, per the Code Connect guidelines. Hover,
// active, and focus are interaction states with no code prop, so they share
// the default snippet. Figma's counter reads "0 / 100", so the limit is 100.
figma.connect(Textarea, url, {
  variant: { State: 'default', Counter: 'no' },
  props: {
    ...baseProps,
    defaultValue: figma.enum('Filled', {
      yes: figma.textContent('text-filled'),
      no: '',
    }),
    supportingText: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => <Textarea {...props} />,
});

figma.connect(Textarea, url, {
  variant: { State: 'default', Counter: 'yes' },
  props: {
    ...baseProps,
    defaultValue: figma.enum('Filled', {
      yes: figma.textContent('text-filled'),
      no: '',
    }),
    supportingText: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => <Textarea {...props} showCounter maxLength={100} />,
});

figma.connect(Textarea, url, {
  variant: { State: 'hover', Counter: 'no' },
  props: {
    ...baseProps,
    defaultValue: figma.enum('Filled', {
      yes: figma.textContent('text-filled'),
      no: '',
    }),
    supportingText: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => <Textarea {...props} />,
});

figma.connect(Textarea, url, {
  variant: { State: 'hover', Counter: 'yes' },
  props: {
    ...baseProps,
    defaultValue: figma.enum('Filled', {
      yes: figma.textContent('text-filled'),
      no: '',
    }),
    supportingText: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => <Textarea {...props} showCounter maxLength={100} />,
});

figma.connect(Textarea, url, {
  variant: { State: 'active', Counter: 'no' },
  props: {
    ...baseProps,
    defaultValue: figma.enum('Filled', {
      yes: figma.textContent('text-filled'),
      no: '',
    }),
    supportingText: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => <Textarea {...props} />,
});

figma.connect(Textarea, url, {
  variant: { State: 'active', Counter: 'yes' },
  props: {
    ...baseProps,
    defaultValue: figma.enum('Filled', {
      yes: figma.textContent('text-filled'),
      no: '',
    }),
    supportingText: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => <Textarea {...props} showCounter maxLength={100} />,
});

figma.connect(Textarea, url, {
  variant: { State: 'focus', Counter: 'no' },
  props: {
    ...baseProps,
    defaultValue: figma.enum('Filled', {
      yes: figma.textContent('text-filled'),
      no: '',
    }),
    supportingText: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => <Textarea {...props} />,
});

figma.connect(Textarea, url, {
  variant: { State: 'focus', Counter: 'yes' },
  props: {
    ...baseProps,
    defaultValue: figma.enum('Filled', {
      yes: figma.textContent('text-filled'),
      no: '',
    }),
    supportingText: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => <Textarea {...props} showCounter maxLength={100} />,
});

// In the invalid state the supporting text slot carries the validation
// message, which maps to invalidFeedback in code.
figma.connect(Textarea, url, {
  variant: { State: 'invalid', Counter: 'no' },
  props: {
    ...baseProps,
    defaultValue: figma.enum('Filled', {
      yes: figma.textContent('text-filled'),
      no: '',
    }),
    invalidFeedback: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => <Textarea {...props} invalid />,
});

figma.connect(Textarea, url, {
  variant: { State: 'invalid', Counter: 'yes' },
  props: {
    ...baseProps,
    defaultValue: figma.enum('Filled', {
      yes: figma.textContent('text-filled'),
      no: '',
    }),
    invalidFeedback: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => (
    <Textarea {...props} invalid showCounter maxLength={100} />
  ),
});

// Figma only defines disabled as empty.
figma.connect(Textarea, url, {
  variant: { State: 'disabled', Counter: 'no' },
  props: {
    ...baseProps,
    supportingText: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => <Textarea {...props} disabled />,
});

figma.connect(Textarea, url, {
  variant: { State: 'disabled', Counter: 'yes' },
  props: {
    ...baseProps,
    supportingText: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => (
    <Textarea {...props} disabled showCounter maxLength={100} />
  ),
});

// Figma only defines read-only as filled.
figma.connect(Textarea, url, {
  variant: { State: 'read-only', Counter: 'no' },
  props: {
    ...baseProps,
    defaultValue: figma.textContent('text-filled'),
    supportingText: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => <Textarea {...props} readOnly />,
});

figma.connect(Textarea, url, {
  variant: { State: 'read-only', Counter: 'yes' },
  props: {
    ...baseProps,
    defaultValue: figma.textContent('text-filled'),
    supportingText: figma.enum('Support text', {
      yes: figma.string('Supporting text'),
      no: '',
    }),
  },
  example: (props) => (
    <Textarea {...props} readOnly showCounter maxLength={100} />
  ),
});
