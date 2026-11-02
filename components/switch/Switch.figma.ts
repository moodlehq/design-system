// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12166-3906
// source=https://github.com/moodlehq/design-system/blob/main/components/switch/Switch.tsx
// component=Switch

import figma from 'figma';

const label = figma.selectedInstance.getString('Label');
const hideLabel = figma.selectedInstance.getBoolean('Show label', {
  true: false,
  false: true,
});
const variant = figma.selectedInstance.getEnum('Variant', {
  Enablement: 'enable',
  Visibility: 'visibility',
  Lock: 'lock',
});
const labelSide = figma.selectedInstance.getEnum('Label side', {
  End: 'end',
  Start: 'start',
});
const checked = figma.selectedInstance.getEnum('Checked', {
  Yes: true,
  No: false,
});
const disabled = figma.selectedInstance.getEnum('State', { Disabled: true });

const template = {
  id: 'Switch',
  imports: ["import { Switch } from './Switch';"],
  example: figma.code`<Switch${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'hideLabel',
    hideLabel,
  )}${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}${figma.helpers.react.renderProp(
    'labelSide',
    labelSide,
  )}${figma.helpers.react.renderProp(
    'checked',
    checked,
  )}${figma.helpers.react.renderProp('disabled', disabled)} 
  // Dev Mode emits a static checked value; consumers should replace this no-op with real state handling.
  onChange={() => { }}/>`,
  metadata: { nestable: true },
};

export default template;
