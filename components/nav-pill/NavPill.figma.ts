// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10982-756
// source=https://github.com/moodlehq/design-system/blob/main/components/nav-pill/NavPill.tsx
// component=NavPill

import figma from 'figma';

const label = figma.selectedInstance.getString('Label');
const selected = figma.selectedInstance.getEnum('Selected', { Yes: true });
const disabled = figma.selectedInstance.getEnum('State', { Disabled: true });

const template = {
  id: 'NavPill',
  imports: ["import { NavPill } from './NavPill';"],
  example: figma.code`<NavPill${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'selected',
    selected,
  )}${figma.helpers.react.renderProp('disabled', disabled)}/>`,
  metadata: { nestable: true },
};

export default template;
