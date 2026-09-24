import figma from '@figma/code-connect';
import { PasswordInput } from './PasswordInput';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/branch/LKS8cJfLCTQFLxT8N60TVq/Moodle-Design-System?node-id=14649-2248';

const baseProps = {
  label: figma.string('Label text'),
  required: figma.boolean('Required'),
  hideLabel: figma.boolean('Show label', { true: false, false: true }),
  infoTooltipLabel: figma.boolean('Info', {
    true: 'Additional information about this field',
    false: undefined,
  }),
};

figma.connect(PasswordInput, url, {
  variant: { Type: 'Password', State: 'default', isInvalid: 'No' },
  props: baseProps,
  example: ({ label, required, hideLabel, infoTooltipLabel }) => (
    <PasswordInput
      label={label}
      required={required}
      hideLabel={hideLabel}
      infoTooltipLabel={infoTooltipLabel}
      placeholder="Placeholder text goes here"
      passwordToggleShowLabel="Show password"
      passwordToggleHideLabel="Hide password"
    />
  ),
});

figma.connect(PasswordInput, url, {
  variant: { Type: 'Password', State: 'default', isInvalid: 'Yes' },
  props: baseProps,
  example: ({ label, required, hideLabel, infoTooltipLabel }) => (
    <PasswordInput
      label={label}
      required={required}
      hideLabel={hideLabel}
      infoTooltipLabel={infoTooltipLabel}
      invalid
      invalidFeedback="Error message"
      placeholder="Placeholder text goes here"
      passwordToggleShowLabel="Show password"
      passwordToggleHideLabel="Hide password"
    />
  ),
});

figma.connect(PasswordInput, url, {
  variant: { Type: 'Password', State: 'disabled', isInvalid: 'No' },
  props: baseProps,
  example: ({ label, required, hideLabel, infoTooltipLabel }) => (
    <PasswordInput
      label={label}
      required={required}
      hideLabel={hideLabel}
      infoTooltipLabel={infoTooltipLabel}
      disabled
      supportingText="Supporting text"
      placeholder="Placeholder text goes here"
      passwordToggleShowLabel="Show password"
      passwordToggleHideLabel="Hide password"
    />
  ),
});

figma.connect(PasswordInput, url, {
  variant: { Type: 'Password', State: 'read-only', isInvalid: 'No' },
  props: baseProps,
  example: ({ label, required, hideLabel, infoTooltipLabel }) => (
    <PasswordInput
      label={label}
      required={required}
      hideLabel={hideLabel}
      infoTooltipLabel={infoTooltipLabel}
      readOnly
      defaultValue="Read-only value"
      passwordToggleShowLabel="Show password"
      passwordToggleHideLabel="Hide password"
    />
  ),
});
