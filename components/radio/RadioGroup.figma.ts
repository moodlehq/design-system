// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=16404-476
// source=https://github.com/moodlehq/design-system/blob/main/components/radio/RadioGroup.tsx
// component=RadioGroup

import figma from 'figma';

const invalid = figma.selectedInstance.getEnum('State', { invalid: true });
const disabled = figma.selectedInstance.getEnum('State', { disabled: true });
// Vertical is the default orientation, so only horizontal is written out.
const orientation = figma.selectedInstance.getEnum('Orientation', {
  Vertical: '',
  Horizontal: 'horizontal',
});

// Supporting text becomes the error message once the group is invalid.
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
// ZeroHeight: the info button's name includes the field label. The template
// can't splice 'Label text' into it, so the snippet shows a placeholder.
const infoTooltipLabel = figma.selectedInstance.getBoolean('Info', {
  true: 'More information about [field label]',
  false: '',
});

// The Options slot holds Radio Button instances, which can't be turned into
// an options array, so the snippet inlines the slot's default content (three
// items) as placeholder options.
const options = figma.helpers.react.identifier(
  "[{ value: 'item-1', label: 'Item 1' }, { value: 'item-2', label: 'Item 2' }, { value: 'item-3', label: 'Item 3' }]",
);

const template = {
  id: 'RadioGroup',
  imports: ["import { RadioGroup } from './RadioGroup';"],
  example: figma.code`<RadioGroup${figma.helpers.react.renderProp(
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
  )}${figma.helpers.react.renderProp(
    'options',
    options,
  )}${figma.helpers.react.renderProp(
    'orientation',
    orientation,
  )}${figma.helpers.react.renderProp(
    'invalid',
    invalid,
  )}${figma.helpers.react.renderProp('disabled', disabled)}/>`,
  metadata: { nestable: true },
};

export default template;
