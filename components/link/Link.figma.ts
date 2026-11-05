// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10843-763
// source=https://github.com/moodlehq/design-system/blob/main/components/link/Link.tsx
// component=Link

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  Primary: 'primary',
  Secondary: 'secondary',
  Inline: 'inline',
});
const disabled = figma.selectedInstance.getEnum('State', { disabled: true });
const startIcon = figma.selectedInstance.getEnum('Link', {
  startIcon: figma.helpers.react.jsxElement(
    '<i className="fa-solid fa-arrow-left"/>',
  ),
});
// Inline links flag external destinations; the others point onwards.
const endIcon = figma.selectedInstance.getEnum('Link', {
  endIcon: figma.helpers.react.jsxElement(
    variant === 'inline'
      ? '<i className="fa-solid fa-arrow-up-right-from-square"/>'
      : '<i className="fa-solid fa-arrow-right"/>',
  ),
});

const template = {
  id: 'Link',
  imports: ["import { Link } from './Link';"],
  example: figma.code`<Link label={linkLabel} href={linkHref}${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp(
    'startIcon',
    startIcon,
  )}${figma.helpers.react.renderProp('endIcon', endIcon)}/>`,
  metadata: { nestable: true },
};

export default template;
