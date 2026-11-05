// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=6300-132
// source=https://github.com/moodlehq/design-system/blob/main/components/activity-icon/ActivityIcon.tsx
// component=ActivityIcon

import figma from 'figma';

// Each category pairs an icon with its alt text.
const icon = figma.selectedInstance.getEnum('Category', {
  Collaboration: 'database',
  Communication: 'chat',
  Assessment: 'assignment',
  Interactive: 'ims-package',
  Resource: 'book',
  Other: 'subsection',
});
const alt = figma.selectedInstance.getEnum('Category', {
  Collaboration: 'Collaboration activity',
  Communication: 'Communication activity',
  Assessment: 'Assessment activity',
  Interactive: 'Interactive activity',
  Resource: 'Resource',
  Other: 'Activity',
});
const size = figma.selectedInstance.getEnum('Size', {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
});
const container = figma.selectedInstance.getEnum('Container', {
  None: 'none',
  Default: 'default',
  Large: 'large',
});
const appearance = figma.selectedInstance.getEnum('Appearance', {
  Default: 'default',
  Muted: 'muted',
});

const template = {
  id: 'ActivityIcon',
  imports: ["import { ActivityIcon } from './ActivityIcon';"],
  example: figma.code`<ActivityIcon${figma.helpers.react.renderProp(
    'icon',
    icon,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp(
    'container',
    container,
  )}${figma.helpers.react.renderProp(
    'appearance',
    appearance,
  )}${figma.helpers.react.renderProp('alt', alt)}/>`,
  metadata: { nestable: true },
};

export default template;
