import figma from '@figma/code-connect';
import { Checkbox } from './Checkbox';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=8116-15114';

const baseProps = {
  label: figma.string('Label text'),
  hideLabel: figma.boolean('Label', { true: false, false: true }),
  required: figma.boolean('Required*'),
};

figma.connect(Checkbox, url, {
  variant: { State: 'Unchecked', Disabled: 'No' },
  props: baseProps,
  example: ({ label, hideLabel, required }) => (
    <Checkbox label={label} hideLabel={hideLabel} required={required} />
  ),
});

figma.connect(Checkbox, url, {
  variant: { State: 'Unchecked', Disabled: 'No', 'Supporting text': true },
  // Keep this variant split explicit: omitting supportingText via undefined suppresses the snippet.
  props: baseProps,
  example: ({ label, hideLabel, required }) => (
    <Checkbox
      label={label}
      hideLabel={hideLabel}
      required={required}
      supportingText="support text"
    />
  ),
});

figma.connect(Checkbox, url, {
  variant: { State: 'Checked', Disabled: 'No' },
  props: baseProps,
  example: ({ label, hideLabel, required }) => (
    <Checkbox label={label} hideLabel={hideLabel} checked required={required} />
  ),
});

figma.connect(Checkbox, url, {
  variant: { State: 'Indeterminate', Disabled: 'No' },
  props: baseProps,
  example: ({ label, hideLabel, required }) => (
    <Checkbox
      label={label}
      hideLabel={hideLabel}
      required={required}
      indeterminate
    />
  ),
});

figma.connect(Checkbox, url, {
  variant: { State: 'Invalid', Disabled: 'No', 'Supporting text': false },
  props: baseProps,
  example: ({ label, hideLabel, required }) => (
    <Checkbox label={label} hideLabel={hideLabel} required={required} invalid />
  ),
});

figma.connect(Checkbox, url, {
  variant: { State: 'Invalid', Disabled: 'No', 'Supporting text': true },
  // Feedback text must stay in its own mapping so Dev Mode shows the concrete prop, not a conditional expression.
  props: baseProps,
  example: ({ label, hideLabel, required }) => (
    <Checkbox
      label={label}
      hideLabel={hideLabel}
      required={required}
      invalid
      invalidFeedback="Error message"
    />
  ),
});

figma.connect(Checkbox, url, {
  variant: { State: 'Unchecked', Disabled: 'Yes' },
  props: baseProps,
  example: ({ label, hideLabel, required }) => (
    <Checkbox
      label={label}
      hideLabel={hideLabel}
      required={required}
      disabled
    />
  ),
});
