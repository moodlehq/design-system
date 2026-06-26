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

// Initials type — md/lg/xl/xxl only (xs/sm do not support initials per the design spec)
figma.connect(Avatar, url, {
  variant: { Type: 'Initials', Size: 'md' },
  props: { initials: figma.string('Initials') },
  example: ({ initials }) => <Avatar size="md" initials={initials} />,
});

figma.connect(Avatar, url, {
  variant: { Type: 'Initials', Size: 'lg' },
  props: { initials: figma.string('Initials') },
  example: ({ initials }) => <Avatar size="lg" initials={initials} />,
});

figma.connect(Avatar, url, {
  variant: { Type: 'Initials', Size: 'xl' },
  props: { initials: figma.string('Initials') },
  example: ({ initials }) => <Avatar size="xl" initials={initials} />,
});

figma.connect(Avatar, url, {
  variant: { Type: 'Initials', Size: 'xxl' },
  props: { initials: figma.string('Initials') },
  example: ({ initials }) => <Avatar size="xxl" initials={initials} />,
});

// xs and sm with "Initials" type in Figma will show the silhouette placeholder
// at runtime because initials are unsupported at those sizes per the design spec.
figma.connect(Avatar, url, {
  variant: { Type: 'Initials', Size: 'xs' },
  example: () => <Avatar size="xs" />,
});

figma.connect(Avatar, url, {
  variant: { Type: 'Initials', Size: 'sm' },
  example: () => <Avatar size="sm" />,
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
      alt="User name"
    />
  ),
});
