// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=7309-410
// source=https://github.com/moodlehq/design-system/blob/main/components/badge/Badge.tsx
// component=Badge

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  Primary: 'primary',
  Secondary: 'secondary',
  Success: 'success',
  Danger: 'danger',
  Warning: 'warning',
  Info: 'info',
});
const subtle = figma.selectedInstance.getEnum('Contrast', { Subtle: true });
const pill = figma.selectedInstance.getEnum('Style', {
  Pill: true,
  Default: false,
});
const startIcon = figma.selectedInstance.getEnum('Icon', {
  startIcon: figma.helpers.react.jsxElement(
    '<i className="fa-solid fa-circle-check" aria-hidden="true"/>',
  ),
});
const endIcon = figma.selectedInstance.getEnum('Icon', {
  endIcon: figma.helpers.react.jsxElement(
    '<i className="fa-solid fa-xmark" aria-hidden="true"/>',
  ),
});

const template = {
  id: 'Badge',
  imports: ["import { Badge } from './Badge';"],
  example: figma.code`<Badge label="Label"${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}${figma.helpers.react.renderProp(
    'subtle',
    subtle,
  )}${figma.helpers.react.renderProp(
    'pill',
    pill,
  )}${figma.helpers.react.renderProp(
    'startIcon',
    startIcon,
  )}${figma.helpers.react.renderProp('endIcon', endIcon)}/>`,
  metadata: { nestable: true },
};

export default template;
