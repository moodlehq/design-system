// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=13661-871
// source=https://github.com/moodlehq/design-system/blob/main/components/alert/Alert.tsx
// component=Alert

import figma from 'figma';

const type = figma.selectedInstance.getEnum('Type', {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
});
const title = figma.selectedInstance.getBoolean('Show Title')
  ? figma.selectedInstance.getString('Title text')
  : undefined;
const message = figma.selectedInstance.getString('Paragraph text');
const isDismissible = figma.selectedInstance.getBoolean('isDismissible');
const isActionable = figma.selectedInstance.getBoolean('isActionable');

const props = figma.code`<Alert${figma.helpers.react.renderProp(
  'type',
  type,
)}${figma.helpers.react.renderProp(
  'title',
  title,
)}${figma.helpers.react.renderProp(
  'message',
  message,
)}${figma.helpers.react.renderProp(
  'isDismissible',
  isDismissible,
)} dismissAriaLabel="Dismiss alert"${figma.helpers.react.renderProp(
  'isActionable',
  isActionable,
)} actionLabel="Action label"`;

// Only the custom slot changes the shape: self-closing vs. wrapping children.
let example;
if (figma.selectedInstance.getBoolean('Customs slot')) {
  const children = figma.properties.children(['Custom elements']);
  example = figma.code`${props}>
        ${figma.helpers.react.renderChildren(children)}
      </Alert>`;
} else {
  example = figma.code`${props}/>`;
}

const template = {
  id: 'Alert',
  imports: ["import { Alert } from './Alert';"],
  example,
  metadata: { nestable: true },
};

export default template;
