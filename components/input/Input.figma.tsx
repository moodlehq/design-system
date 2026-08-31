import figma from '@figma/code-connect';
import { Input } from './Input';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/branch/LKS8cJfLCTQFLxT8N60TVq/Moodle-Design-System?node-id=14747-15294';

const baseProps = {
  label: figma.string('Label'),
  required: figma.boolean('Required'),
  hideLabel: figma.boolean('Show label', { true: false, false: true }),
  type: figma.enum('Type', {
    Text: 'text',
    Email: 'email',
    Number: 'number',
    Tel: 'tel',
    Url: 'url',
  }),
};

figma.connect(Input, url, {
  variant: { State: 'default' },
  props: baseProps,
  example: ({ label, required, hideLabel, type }) => (
    <Input
      label={label}
      required={required}
      hideLabel={hideLabel}
      type={type}
      placeholder="Placeholder text goes here"
    />
  ),
});

figma.connect(Input, url, {
  variant: { State: 'invalid' },
  props: baseProps,
  example: ({ label, required, hideLabel, type }) => (
    <Input
      label={label}
      required={required}
      hideLabel={hideLabel}
      type={type}
      invalid
      invalidFeedback="Error message"
      placeholder="Placeholder text goes here"
    />
  ),
});

figma.connect(Input, url, {
  variant: { State: 'disabled' },
  props: baseProps,
  example: ({ label, required, hideLabel, type }) => (
    <Input
      label={label}
      required={required}
      hideLabel={hideLabel}
      type={type}
      disabled
      supportingText="Supporting text"
      placeholder="Placeholder text goes here"
    />
  ),
});

figma.connect(Input, url, {
  variant: { State: 'read-only' },
  props: baseProps,
  example: ({ label, required, hideLabel, type }) => (
    <Input
      label={label}
      required={required}
      hideLabel={hideLabel}
      type={type}
      readOnly
      defaultValue="Read-only value"
    />
  ),
});
