import figma from '@figma/code-connect';
import { ActivityIcon } from './ActivityIcon';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=6300-132';

const sizeProps = {
  size: figma.enum('Size', {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl',
  }),
};

const containerProps = {
  container: figma.enum('Container', {
    None: 'none',
    Default: 'default',
    Large: 'large',
  }),
};

// Collaboration category, default appearance
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Collaboration', Appearance: 'Default' },
  props: {
    ...sizeProps,
    ...containerProps,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="database"
      size={size}
      container={container}
      appearance="default"
      alt="Collaboration activity"
    />
  ),
});

// Collaboration category, muted appearance
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Collaboration', Appearance: 'Muted' },
  props: {
    ...sizeProps,
    ...containerProps,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="database"
      size={size}
      container={container}
      appearance="muted"
      alt="Collaboration activity"
    />
  ),
});

// Communication category, default appearance
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Communication', Appearance: 'Default' },
  props: {
    ...sizeProps,
    ...containerProps,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="chat"
      size={size}
      container={container}
      appearance="default"
      alt="Communication activity"
    />
  ),
});

// Communication category, muted appearance
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Communication', Appearance: 'Muted' },
  props: {
    ...sizeProps,
    ...containerProps,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="chat"
      size={size}
      container={container}
      appearance="muted"
      alt="Communication activity"
    />
  ),
});

// Assessment category, default appearance
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Assessment', Appearance: 'Default' },
  props: {
    ...sizeProps,
    ...containerProps,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="assignment"
      size={size}
      container={container}
      appearance="default"
      alt="Assessment activity"
    />
  ),
});

// Assessment category, muted appearance
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Assessment', Appearance: 'Muted' },
  props: {
    ...sizeProps,
    ...containerProps,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="assignment"
      size={size}
      container={container}
      appearance="muted"
      alt="Assessment activity"
    />
  ),
});

// Interactive category, default appearance
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Interactive', Appearance: 'Default' },
  props: {
    ...sizeProps,
    ...containerProps,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="ims-package"
      size={size}
      container={container}
      appearance="default"
      alt="Interactive activity"
    />
  ),
});

// Interactive category, muted appearance
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Interactive', Appearance: 'Muted' },
  props: {
    ...sizeProps,
    ...containerProps,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="ims-package"
      size={size}
      container={container}
      appearance="muted"
      alt="Interactive activity"
    />
  ),
});

// Resource category, default appearance
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Resource', Appearance: 'Default' },
  props: {
    ...sizeProps,
    ...containerProps,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="book"
      size={size}
      container={container}
      appearance="default"
      alt="Resource"
    />
  ),
});

// Resource category, muted appearance
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Resource', Appearance: 'Muted' },
  props: {
    ...sizeProps,
    ...containerProps,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="book"
      size={size}
      container={container}
      appearance="muted"
      alt="Resource"
    />
  ),
});

// Other category, default appearance
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Other', Appearance: 'Default' },
  props: {
    ...sizeProps,
    ...containerProps,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="subsection"
      size={size}
      container={container}
      appearance="default"
      alt="Activity"
    />
  ),
});

// Other category, muted appearance
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Other', Appearance: 'Muted' },
  props: {
    ...sizeProps,
    ...containerProps,
  },
  example: ({ size, container }) => (
    <ActivityIcon
      icon="subsection"
      size={size}
      container={container}
      appearance="muted"
      alt="Activity"
    />
  ),
});
