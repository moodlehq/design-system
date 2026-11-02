// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=8116-15114
// source=https://github.com/moodlehq/design-system/blob/main/components/checkbox/Checkbox.tsx
// component=Checkbox

import figma from 'figma';

const hasSupportingText = figma.selectedInstance.getBoolean('Supporting text');

const label = figma.selectedInstance.getString('Label text');
const hideLabel = figma.selectedInstance.getBoolean('Label', {
  true: false,
  false: true,
});
const required = figma.selectedInstance.getBoolean('Required*');
const checked = figma.selectedInstance.getEnum('State', { Checked: true });
const indeterminate = figma.selectedInstance.getEnum('State', {
  Indeterminate: true,
});
const invalid = figma.selectedInstance.getEnum('State', { Invalid: true });
const disabled = figma.selectedInstance.getEnum('Disabled', {
  Yes: true,
  No: false,
});
// Supporting text doubles as the error message once the checkbox is invalid.
const supportingText =
  hasSupportingText && !invalid ? 'support text' : undefined;
const invalidFeedback =
  hasSupportingText && invalid ? 'Error message' : undefined;

const template = {
  id: 'Checkbox',
  imports: ["import { Checkbox } from './Checkbox';"],
  example: figma.code`<Checkbox${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'hideLabel',
    hideLabel,
  )}${figma.helpers.react.renderProp(
    'checked',
    checked,
  )}${figma.helpers.react.renderProp(
    'required',
    required,
  )}${figma.helpers.react.renderProp(
    'indeterminate',
    indeterminate,
  )}${figma.helpers.react.renderProp(
    'invalid',
    invalid,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp(
    'supportingText',
    supportingText,
  )}${figma.helpers.react.renderProp('invalidFeedback', invalidFeedback)}/>`,
  metadata: { nestable: true },
};

export default template;
