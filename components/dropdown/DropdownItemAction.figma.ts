// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12467-2725&m=dev
// source=https://github.com/moodlehq/design-system/blob/main/components/dropdown/DropdownItemAction.tsx
// component=DropdownItemAction

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  default: 'default',
  danger: 'danger',
});
const startIcon = figma.selectedInstance.getEnum('Icon', {
  true: figma.helpers.react.jsxElement(
    '<i className="fa-solid fa-face-smile"/>',
  ),
});
const description = figma.selectedInstance.getEnum('Description', {
  true: 'Description goes here',
});
const disabled = figma.selectedInstance.getEnum('State', { disabled: true });

const template = {
  id: 'DropdownItemAction',
  imports: ["import { DropdownItemAction } from './DropdownItemAction';"],
  example: figma.code`<DropdownItemAction label={itemLabel}${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}${figma.helpers.react.renderProp(
    'startIcon',
    startIcon,
  )}${figma.helpers.react.renderProp(
    'description',
    description,
  )}${figma.helpers.react.renderProp('disabled', disabled)}/>`,
  metadata: { nestable: true },
};

export default template;
