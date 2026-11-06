// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=15857-3800
// source=https://github.com/moodlehq/design-system/blob/main/components/select/Select.tsx
// component=Select

import figma from 'figma';

// Hover, active and focus are interaction states with no code prop, so only
// disabled maps to a flag. Figma defines disabled only with isInvalid=No.
const disabled = figma.selectedInstance.getEnum('State', { disabled: true });
const invalid = figma.selectedInstance.getEnum('isInvalid', { Yes: true });

// Supporting text becomes the error message once the field is invalid.
const feedback = figma.selectedInstance.getBoolean('Support text', {
  true: figma.selectedInstance.getString('Supporting text'),
  false: '',
});
const supportingText = invalid ? undefined : feedback;
const invalidFeedback = invalid ? feedback : undefined;
const label = figma.selectedInstance.getString('Label text');
const hideLabel = figma.selectedInstance.getBoolean('Show label', {
  true: false,
  false: true,
});
const required = figma.selectedInstance.getBoolean('Required');
const infoTooltipLabel = figma.selectedInstance.getBoolean('Info', {
  true: 'More information about this field',
  false: '',
});
// Figma's single `Value` text stands in for the chosen option, so the snippet
// renders it as the one entry in `options`. JSON.stringify quotes and escapes
// it as a valid JS string literal.
const value = figma.selectedInstance.getString('Value');

const template = {
  id: 'Select',
  imports: ["import { Select } from './Select';"],
  example: figma.code`<Select${figma.helpers.react.renderProp(
    'supportingText',
    supportingText,
  )}${figma.helpers.react.renderProp(
    'invalidFeedback',
    invalidFeedback,
  )}${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'hideLabel',
    hideLabel,
  )}${figma.helpers.react.renderProp(
    'required',
    required,
  )}${figma.helpers.react.renderProp(
    'infoTooltipLabel',
    infoTooltipLabel,
  )} options={[{ value: 'option', label: ${JSON.stringify(value)} }]}${figma.helpers.react.renderProp(
    'invalid',
    invalid,
  )}${figma.helpers.react.renderProp('disabled', disabled)}/>`,
  metadata: { nestable: true },
};

export default template;
