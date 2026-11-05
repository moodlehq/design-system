// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12381-3057&m=dev
// source=https://github.com/moodlehq/design-system/blob/main/components/dropdown/DropdownTrigger.tsx
// component=DropdownTrigger

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  'nav.pill': 'nav-pill',
});
const isButton =
  figma.selectedInstance.getPropertyValue('Variant') === 'button';
const iconOnly =
  isButton && figma.selectedInstance.getEnum('Icon', { 'Icon only': true });
// The icon-only trigger has no visible label, so it gets a fixed one.
const label = iconOnly
  ? 'Open menu'
  : figma.helpers.react.identifier('triggerLabel');
const appearance = figma.selectedInstance.getEnum('Variant', {
  button: figma.selectedInstance.getEnum('Appearance', {
    emphasis: 'emphasis',
    default: 'default',
    subtle: 'subtle',
  }),
});
const size = figma.selectedInstance.getEnum('Variant', {
  button: figma.selectedInstance.getEnum('Size', {
    sm: 'sm',
    md: 'md',
  }),
});
const startIcon = isButton
  ? figma.selectedInstance.getEnum('Icon', {
      startIcon: figma.helpers.react.jsxElement(
        '<i className="fa-solid fa-face-smile"/>',
      ),
      'Icon only': figma.helpers.react.jsxElement(
        '<i className="fa-solid fa-face-smile"/>',
      ),
    })
  : undefined;

const template = {
  id: 'DropdownTrigger',
  imports: ["import { DropdownTrigger } from './DropdownTrigger';"],
  example: figma.code`<DropdownTrigger${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}${figma.helpers.react.renderProp(
    'appearance',
    appearance,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp(
    'startIcon',
    startIcon,
  )}${figma.helpers.react.renderProp('iconOnly', iconOnly)}/>`,
  metadata: { nestable: true },
};

export default template;
