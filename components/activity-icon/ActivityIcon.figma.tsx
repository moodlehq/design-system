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

// Figma currently names this property "Disabled" (No/Yes). It is expected to be
// renamed to "Appearance" (Default/Muted) to match the React prop; update the
// property key and options here if the designer chooses different names.
const appearanceProps = {
  appearance: figma.enum('Appearance', {
    Default: 'default',
    Muted: 'muted',
  }),
};

// Collaboration category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Collaboration' },
  props: {
    ...sizeProps,
    ...containerProps,
    ...appearanceProps,
  },
  example: ({ size, container, appearance }) => (
    <ActivityIcon
      icon="database"
      size={size}
      container={container}
      appearance={appearance}
      alt="Collaboration activity"
    />
  ),
});

// Communication category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Communication' },
  props: {
    ...sizeProps,
    ...containerProps,
    ...appearanceProps,
  },
  example: ({ size, container, appearance }) => (
    <ActivityIcon
      icon="chat"
      size={size}
      container={container}
      appearance={appearance}
      alt="Communication activity"
    />
  ),
});

// Assessment category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Assessment' },
  props: {
    ...sizeProps,
    ...containerProps,
    ...appearanceProps,
  },
  example: ({ size, container, appearance }) => (
    <ActivityIcon
      icon="assignment"
      size={size}
      container={container}
      appearance={appearance}
      alt="Assessment activity"
    />
  ),
});

// Interactive category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Interactive' },
  props: {
    ...sizeProps,
    ...containerProps,
    ...appearanceProps,
  },
  example: ({ size, container, appearance }) => (
    <ActivityIcon
      icon="ims-package"
      size={size}
      container={container}
      appearance={appearance}
      alt="Interactive activity"
    />
  ),
});

// Resource category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Resource' },
  props: {
    ...sizeProps,
    ...containerProps,
    ...appearanceProps,
  },
  example: ({ size, container, appearance }) => (
    <ActivityIcon
      icon="book"
      size={size}
      container={container}
      appearance={appearance}
      alt="Resource"
    />
  ),
});

// Other category examples
figma.connect(ActivityIcon, url, {
  variant: { Category: 'Other' },
  props: {
    ...sizeProps,
    ...containerProps,
    ...appearanceProps,
  },
  example: ({ size, container, appearance }) => (
    <ActivityIcon
      icon="subsection"
      size={size}
      container={container}
      appearance={appearance}
      alt="Activity"
    />
  ),
});
