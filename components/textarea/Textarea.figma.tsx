import figma from '@figma/code-connect';
import { Textarea } from './Textarea';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=13934-4878';

const baseProps = {
  label: figma.string('Supporting text#13940:21'),
  required: figma.boolean('Required#13940:15'),
  // "Show Label" is the inverse of hideLabel
  hideLabel: figma.boolean('Show Label#13940:13', { true: false, false: true }),
  resizable: figma.boolean('Resizable#13963:21'),
};

// Default state
figma.connect(Textarea, url, {
  variant: { State: 'default' },
  props: baseProps,
  example: ({ label, hideLabel, required, resizable }) => (
    <Textarea
      label={label}
      hideLabel={hideLabel}
      required={required}
      resizable={resizable}
      placeholder="Placeholder text goes here"
    />
  ),
});

// Default state with supporting text
figma.connect(Textarea, url, {
  variant: { State: 'default', 'Support text': 'yes' },
  props: baseProps,
  example: ({ label, hideLabel, required, resizable }) => (
    <Textarea
      label={label}
      hideLabel={hideLabel}
      required={required}
      resizable={resizable}
      placeholder="Placeholder text goes here"
      supportingText="Supporting text"
    />
  ),
});

// Default state with counter
figma.connect(Textarea, url, {
  variant: { State: 'default', Counter: 'yes' },
  props: baseProps,
  example: ({ label, hideLabel, required, resizable }) => (
    <Textarea
      label={label}
      hideLabel={hideLabel}
      required={required}
      resizable={resizable}
      placeholder="Placeholder text goes here"
      showCounter
      maxLength={100}
    />
  ),
});

// Invalid state without feedback text
figma.connect(Textarea, url, {
  variant: { State: 'invalid', 'Support text': 'no' },
  props: baseProps,
  example: ({ label, hideLabel, required, resizable }) => (
    <Textarea
      label={label}
      hideLabel={hideLabel}
      required={required}
      resizable={resizable}
      placeholder="Placeholder text goes here"
      invalid
    />
  ),
});

// Invalid state with feedback text
figma.connect(Textarea, url, {
  variant: { State: 'invalid', 'Support text': 'yes' },
  props: baseProps,
  example: ({ label, hideLabel, required, resizable }) => (
    <Textarea
      label={label}
      hideLabel={hideLabel}
      required={required}
      resizable={resizable}
      placeholder="Placeholder text goes here"
      invalid
      invalidFeedback="Error message"
    />
  ),
});

// Disabled state
figma.connect(Textarea, url, {
  variant: { State: 'disabled' },
  props: baseProps,
  example: ({ label, hideLabel, required }) => (
    <Textarea
      label={label}
      hideLabel={hideLabel}
      required={required}
      placeholder="Placeholder text goes here"
      disabled
    />
  ),
});

// Read-only state
figma.connect(Textarea, url, {
  variant: { State: 'read-only' },
  props: baseProps,
  example: ({ label, hideLabel, required, resizable }) => (
    <Textarea
      label={label}
      hideLabel={hideLabel}
      required={required}
      resizable={resizable}
      readOnly
      defaultValue="Lorem ipsum dolor sit amet"
    />
  ),
});
