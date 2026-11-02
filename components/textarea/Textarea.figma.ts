// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=13934-4878
// source=https://github.com/moodlehq/design-system/blob/main/components/textarea/Textarea.tsx
// component=Textarea

import figma from 'figma';

const invalid = figma.selectedInstance.getEnum('State', { invalid: true });
const disabled = figma.selectedInstance.getEnum('State', { disabled: true });
const readOnly = figma.selectedInstance.getEnum('State', { 'read-only': true });
const showCounter = figma.selectedInstance.getEnum('Counter', { yes: true });

// Read-only fields always show their text; disabled ones show none.
const filledText = figma.selectedInstance.findText('text-filled').__render__();
const defaultValue = readOnly
  ? filledText
  : disabled
    ? undefined
    : figma.selectedInstance.getEnum('Filled', { yes: filledText, no: '' });
// Supporting text becomes the error message once the field is invalid.
const feedback = figma.selectedInstance.getEnum('Support text', {
  yes: figma.selectedInstance.getString('Supporting text'),
  no: '',
});
const supportingText = invalid ? undefined : feedback;
const invalidFeedback = invalid ? feedback : undefined;
const label = figma.selectedInstance.findText('label-text').__render__();
const hideLabel = figma.selectedInstance.getBoolean('Show Label', {
  true: false,
  false: true,
});
const required = figma.selectedInstance.getBoolean('Required');
const resizable = figma.selectedInstance.getBoolean('Resizable');
const infoTooltipLabel = figma.selectedInstance.getBoolean('Info', {
  true: 'More information about this field',
  false: '',
});
const placeholder = figma.selectedInstance.getString('Placeholder text');

const template = {
  id: 'Textarea',
  imports: ["import { Textarea } from './Textarea';"],
  example: figma.code`<Textarea${figma.helpers.react.renderProp(
    'defaultValue',
    defaultValue,
  )}${figma.helpers.react.renderProp(
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
    'resizable',
    resizable,
  )}${figma.helpers.react.renderProp(
    'infoTooltipLabel',
    infoTooltipLabel,
  )}${figma.helpers.react.renderProp(
    'placeholder',
    placeholder,
  )}${figma.helpers.react.renderProp(
    'invalid',
    invalid,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp(
    'readOnly',
    readOnly,
  )}${figma.helpers.react.renderProp(
    'showCounter',
    showCounter,
  )}${figma.helpers.react.renderProp('maxLength', showCounter ? 100 : undefined)}/>`,
  metadata: { nestable: true },
};

export default template;
