// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=6576-368
// source=https://github.com/moodlehq/design-system/blob/main/components/radio/Radio.tsx
// component=Radio

import figma from 'figma';

const label = figma.selectedInstance.getString('Label');
const hideLabel = figma.selectedInstance.getBoolean('Label', {
  true: false,
  false: true,
});
const checked = figma.selectedInstance.getEnum('Selected', {
  Yes: true,
});
const invalid = figma.selectedInstance.getEnum('State', { Invalid: true });
const invalidFeedback =
  invalid && figma.selectedInstance.getBoolean('Show feedback text')
    ? 'Error message'
    : undefined;
const disabled = figma.selectedInstance.getEnum('State', { Disabled: true });

const template = {
  id: 'Radio',
  imports: ["import { Radio } from './Radio';"],
  example: figma.code`<Radio${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'hideLabel',
    hideLabel,
  )}${figma.helpers.react.renderProp(
    'checked',
    checked,
  )}${figma.helpers.react.renderProp(
    'invalid',
    invalid,
  )}${figma.helpers.react.renderProp(
    'invalidFeedback',
    invalidFeedback,
  )}${figma.helpers.react.renderProp('disabled', disabled)}/>`,
  metadata: { nestable: true },
};

export default template;
