import figma from '@figma/code-connect';
import { ActivityIcon } from './ActivityIcon';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=6300-132';

const size = figma.enum('Size', {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
});

const container = figma.enum('Container', {
  None: 'none',
  Default: 'default',
  Large: 'large',
});

// Collaboration category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Collaboration' },
  props: {
    size: size,
    container: container,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="database"
      size={size}
      container={container}
      alt="Collaboration activity"
    />
  ),
});

// Communication category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Communication' },
  props: {
    size: size,
    container: container,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="chat"
      size={size}
      container={container}
      alt="Communication activity"
    />
  ),
});

// Assessment category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Assessment' },
  props: {
    size: size,
    container: container,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="assignment"
      size={size}
      container={container}
      alt="Assessment activity"
    />
  ),
});

// Interactive category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Interactive' },
  props: {
    size: size,
    container: container,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="ims-package"
      size={size}
      container={container}
      alt="Interactive activity"
    />
  ),
});

// Resource category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Resource' },
  props: {
    size: size,
    container: container,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="book"
      size={size}
      container={container}
      alt="Resource"
    />
  ),
});

// Other category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Other' },
  props: {
    size: size,
    container: container,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="subsection"
      size={size}
      container={container}
      alt="Activity"
    />
  ),
});
