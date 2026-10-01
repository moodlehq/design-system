import figma from '@figma/code-connect';
import { Avatar } from './Avatar';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10897-145';

const sizeProps = {
  size: figma.enum('Size', {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
    xxl: 'xxl',
  }),
};

// Initials type — md/lg/xl/xxl only (Figma and the design spec do not define it at xs/sm)
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

// Empty state type — all sizes (Figma defines Initials only at md and up, so
// xs and sm only exist as Image or Empty state).
figma.connect(Avatar, url, {
  variant: { Type: 'Empty state' },
  props: { ...sizeProps },
  example: ({ size }) => <Avatar size={size} />,
});

// Image type — all sizes
figma.connect(Avatar, url, {
  variant: { Type: 'Image' },
  props: {
    ...sizeProps,
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
