import figma from '@figma/code-connect';
import { Switch } from './Switch';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12166-3906';

const baseProps = {
  label: figma.string('Label'),
  hideLabel: figma.boolean('Show label', { true: false, false: true }),
  variant: figma.enum('Variant', {
    Enablement: 'enable',
    Visibility: 'visibility',
    Lock: 'lock',
  }),
  labelSide: figma.enum('Label side', {
    End: 'end',
    Start: 'start',
  }),
  checked: figma.enum('Checked', { Yes: true, No: false }),
};

figma.connect(Switch, url, {
  variant: { State: 'Default' },
  props: baseProps,
  example: ({ label, hideLabel, variant, labelSide, checked }) => (
    <Switch
      label={label}
      hideLabel={hideLabel}
      variant={variant}
      labelSide={labelSide}
      checked={checked}
      // Dev Mode emits a static checked value; consumers should replace this no-op with real state handling.
      onChange={() => {}}
    />
  ),
});

figma.connect(Switch, url, {
  variant: { State: 'Disabled' },
  props: baseProps,
  example: ({ label, hideLabel, variant, labelSide, checked }) => (
    <Switch
      label={label}
      hideLabel={hideLabel}
      variant={variant}
      labelSide={labelSide}
      checked={checked}
      disabled
      // Dev Mode emits a static checked value; consumers should replace this no-op with real state handling.
      onChange={() => {}}
    />
  ),
});
