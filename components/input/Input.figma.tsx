import figma from '@figma/code-connect';
import { Input } from './Input';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/branch/LKS8cJfLCTQFLxT8N60TVq/Moodle-Design-System?node-id=14649-2248';

// Type=Text covers text/email/number/tel/url in code — Figma only
// distinguishes Text vs Password since the text-family HTML types are
// visually identical (see the component's Figma description).
const baseProps = {
  label: figma.string('Label text'),
  required: figma.boolean('Required'),
  hideLabel: figma.boolean('Show label', { true: false, false: true }),
  infoTooltipLabel: figma.boolean('Info', {
    true: 'Additional information about this field',
    false: undefined,
  }),
};

figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'default', isInvalid: 'No' },
  props: baseProps,
  example: ({ label, required, hideLabel, infoTooltipLabel }) => (
    <Input
      label={label}
      required={required}
      hideLabel={hideLabel}
      infoTooltipLabel={infoTooltipLabel}
      placeholder="Placeholder text goes here"
    />
  ),
});

figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'default', isInvalid: 'Yes' },
  props: baseProps,
  example: ({ label, required, hideLabel, infoTooltipLabel }) => (
    <Input
      label={label}
      required={required}
      hideLabel={hideLabel}
      infoTooltipLabel={infoTooltipLabel}
      invalid
      invalidFeedback="Error message"
      placeholder="Placeholder text goes here"
    />
  ),
});

figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'disabled', isInvalid: 'No' },
  props: baseProps,
  example: ({ label, required, hideLabel, infoTooltipLabel }) => (
    <Input
      label={label}
      required={required}
      hideLabel={hideLabel}
      infoTooltipLabel={infoTooltipLabel}
      disabled
      supportingText="Supporting text"
      placeholder="Placeholder text goes here"
    />
  ),
});

figma.connect(Input, url, {
  variant: { Type: 'Text', State: 'read-only', isInvalid: 'No' },
  props: baseProps,
  example: ({ label, required, hideLabel, infoTooltipLabel }) => (
    <Input
      label={label}
      required={required}
      hideLabel={hideLabel}
      infoTooltipLabel={infoTooltipLabel}
      readOnly
      defaultValue="Read-only value"
    />
  ),
});
