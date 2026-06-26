import figma from '@figma/code-connect';
import { Avatar } from './Avatar';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10897-145';

const size = figma.enum('Size', {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
});

// Initials type — all sizes
figma.connect(Avatar, url, {
  variant: { Type: 'Initials' },
  props: {
    size: size,
    initials: figma.string('Initials'),
  },
  example: ({ size, initials }) => <Avatar size={size} initials={initials} />,
});

// Image type — all sizes
figma.connect(Avatar, url, {
  variant: { Type: 'Image' },
  props: {
    size: size,
    initials: figma.string('Initials'),
  },
  example: ({ size, initials }) => (
    <Avatar
      size={size}
      initials={initials}
      imageSrc="https://example.com/user-photo.jpg"
      aria-label="User name"
    />
  ),
});
