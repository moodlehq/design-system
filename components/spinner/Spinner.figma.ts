// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=16693-1329
// source=https://github.com/moodlehq/design-system/blob/main/components/spinner/Spinner.tsx
// component=Spinner

import figma from 'figma';

const labelText = figma.selectedInstance.getString('Label text');
const size = figma.selectedInstance.getEnum('Size', {
  Small: 'small',
  Large: 'large',
});
const appearance = figma.selectedInstance.getEnum('Appearance', {
  Primary: 'primary',
  Inverse: 'inverse',
});
const showLabel = figma.selectedInstance.getBoolean('Show label');

const template = {
  id: 'Spinner',
  imports: ["import { Spinner } from './Spinner';"],
  example: figma.code`<Spinner${figma.helpers.react.renderProp(
    'labelText',
    labelText,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp(
    'appearance',
    appearance,
  )}${figma.helpers.react.renderProp('showLabel', showLabel)}/>`,
  metadata: { nestable: true },
};

export default template;
