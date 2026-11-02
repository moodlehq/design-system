// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10232-4215
// source=https://github.com/moodlehq/design-system/blob/main/components/choicebox/Choicebox.tsx
// component=Choicebox

import figma from 'figma';

const label = figma.selectedInstance.getString('Label');
const supportingText = figma.selectedInstance.getBoolean('Supporting text')
  ? figma.selectedInstance.getString('Support text')
  : undefined;
const icon = figma.selectedInstance.getBoolean('Icon')
  ? figma.helpers.react.jsxElement('<i className="fa-solid fa-star"/>')
  : undefined;
const checked = figma.selectedInstance.getEnum('Selected', {
  Yes: true,
  No: false,
});
const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
});

const template = {
  id: 'Choicebox',
  imports: ["import { Choicebox } from './Choicebox';"],
  example: figma.code`<Choicebox${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'supportingText',
    supportingText,
  )}${figma.helpers.react.renderProp(
    'icon',
    icon,
  )}${figma.helpers.react.renderProp(
    'checked',
    checked,
  )}${figma.helpers.react.renderProp('disabled', disabled)}/>`,
  metadata: { nestable: true },
};

export default template;
