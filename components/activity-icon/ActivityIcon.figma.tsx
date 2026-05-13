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

const variant = figma.enum('Container', {
  None: 'none',
  Default: 'default',
  Large: 'large',
});

// Collaboration category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Collaboration' },
  props: {
    size: size,
    variant: variant,
  },
  example: ({ size, variant }) => (
    <ActivityIcon
      icon="database"
      size={size}
      variant={variant}
      alt="Collaboration activity"
    />
  ),
});

// Communication category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Communication' },
  props: {
    size: size,
    variant: variant,
  },
  example: ({ size, variant }) => (
    <ActivityIcon
      icon="chat"
      size={size}
      variant={variant}
      alt="Communication activity"
    />
  ),
});

// Assessment category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Assessment' },
  props: {
    size: size,
    variant: variant,
  },
  example: ({ size, variant }) => (
    <ActivityIcon
      icon="assignment"
      size={size}
      variant={variant}
      alt="Assessment activity"
    />
  ),
});

// Interactive category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Interactive' },
  props: {
    size: size,
    variant: variant,
  },
  example: ({ size, variant }) => (
    <ActivityIcon
      icon="ims-package"
      size={size}
      variant={variant}
      alt="Interactive activity"
    />
  ),
});

// Resource category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Resource' },
  props: {
    size: size,
    variant: variant,
  },
  example: ({ size, variant }) => (
    <ActivityIcon icon="book" size={size} variant={variant} alt="Resource" />
  ),
});

// Other category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Other' },
  props: {
    size: size,
    variant: variant,
  },
  example: ({ size, variant }) => (
    <ActivityIcon
      icon="subsection"
      size={size}
      variant={variant}
      alt="Activity"
    />
  ),
});
