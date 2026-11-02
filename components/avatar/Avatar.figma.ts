// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10897-145
// source=https://github.com/moodlehq/design-system/blob/main/components/avatar/Avatar.tsx
// component=Avatar

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
});
// Initials also back the image variant as its fallback.
const initials = figma.selectedInstance.getEnum('Type', {
  Initials: figma.selectedInstance.getString('Initials'),
  Image: figma.selectedInstance.getString('Initials'),
});
const imageSrc = figma.selectedInstance.getEnum('Type', {
  Image: 'https://example.com/user-photo.jpg',
});
const alt = figma.selectedInstance.getEnum('Type', { Image: 'User name' });

const template = {
  id: 'Avatar',
  imports: ["import { Avatar } from './Avatar';"],
  example: figma.code`<Avatar${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp(
    'initials',
    initials,
  )}${figma.helpers.react.renderProp(
    'imageSrc',
    imageSrc,
  )}${figma.helpers.react.renderProp('alt', alt)}/>`,
  metadata: { nestable: true },
};

export default template;
