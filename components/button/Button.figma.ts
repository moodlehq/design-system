// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=7206:1782
// source=https://github.com/moodlehq/design-system/blob/main/components/button/Button.tsx
// component=Button

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  primary: figma.selectedInstance.getEnum('Style', {
    fill: 'primary',
    outline: 'outline-primary',
  }),
  secondary: figma.selectedInstance.getEnum('Style', {
    fill: 'secondary',
    outline: 'outline-secondary',
  }),
  danger: figma.selectedInstance.getEnum('Style', {
    fill: 'danger',
    outline: 'outline-danger',
  }),
  ghost: figma.selectedInstance.getEnum('Style', {
    fill: 'ghost',
  }),
});
const size = figma.selectedInstance.getEnum('Size', {
  sm: 'sm',
  'md (default)': 'md',
  lg: 'lg',
});
// Icon-only buttons have no visible label, so they take an aria-label instead.
const iconOnly = figma.selectedInstance.getEnum('Icon', { 'Icon only': true });
const label = iconOnly
  ? undefined
  : figma.helpers.react.identifier('buttonLabel');
const ariaLabel = iconOnly
  ? figma.helpers.react.identifier('iconOnlyAriaLabel')
  : undefined;
const startIcon = figma.selectedInstance.getEnum('Icon', {
  startIcon: figma.helpers.react.jsxElement(
    '<i className="fa-solid fa-arrow-left"/>',
  ),
  'Icon only': figma.helpers.react.jsxElement(
    '<i className="fa-solid fa-gear"/>',
  ),
});
const endIcon = figma.selectedInstance.getEnum('Icon', {
  endIcon: figma.helpers.react.jsxElement(
    '<i className="fa-solid fa-arrow-right"/>',
  ),
});
const disabled = figma.selectedInstance.getEnum('State', { disabled: true });

const template = {
  id: 'Button',
  imports: ["import { Button } from './Button';"],
  example: figma.code`<Button${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp(
    'aria-label',
    ariaLabel,
  )}${figma.helpers.react.renderProp(
    'startIcon',
    startIcon,
  )}${figma.helpers.react.renderProp(
    'endIcon',
    endIcon,
  )}${figma.helpers.react.renderProp('disabled', disabled)}/>`,
  metadata: { nestable: true },
};

export default template;
