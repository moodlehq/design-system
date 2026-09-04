import figma from '@figma/code-connect';
import { PasswordInput } from './PasswordInput';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/branch/LKS8cJfLCTQFLxT8N60TVq/Moodle-Design-System?node-id=14747-15294';

const baseProps = {
  label: figma.string('Label'),
  required: figma.boolean('Required'),
  hideLabel: figma.boolean('Show label', { true: false, false: true }),
};

figma.connect(PasswordInput, url, {
  variant: { State: 'default', Type: 'Password' },
  props: baseProps,
  example: ({ label, required, hideLabel }) => (
    <PasswordInput
      label={label}
      required={required}
      hideLabel={hideLabel}
      placeholder="Placeholder text goes here"
      passwordToggleShowLabel="Show password"
      passwordToggleHideLabel="Hide password"
    />
  ),
});

figma.connect(PasswordInput, url, {
  variant: { State: 'invalid', Type: 'Password' },
  props: baseProps,
  example: ({ label, required, hideLabel }) => (
    <PasswordInput
      label={label}
      required={required}
      hideLabel={hideLabel}
      invalid
      invalidFeedback="Error message"
      placeholder="Placeholder text goes here"
      passwordToggleShowLabel="Show password"
      passwordToggleHideLabel="Hide password"
    />
  ),
});

figma.connect(PasswordInput, url, {
  variant: { State: 'disabled', Type: 'Password' },
  props: baseProps,
  example: ({ label, required, hideLabel }) => (
    <PasswordInput
      label={label}
      required={required}
      hideLabel={hideLabel}
      disabled
      supportingText="Supporting text"
      placeholder="Placeholder text goes here"
      passwordToggleShowLabel="Show password"
      passwordToggleHideLabel="Hide password"
    />
  ),
});

figma.connect(PasswordInput, url, {
  variant: { State: 'read-only', Type: 'Password' },
  props: baseProps,
  example: ({ label, required, hideLabel }) => (
    <PasswordInput
      label={label}
      required={required}
      hideLabel={hideLabel}
      readOnly
      defaultValue="Read-only value"
      passwordToggleShowLabel="Show password"
      passwordToggleHideLabel="Hide password"
    />
  ),
});
