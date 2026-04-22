import figma from '@figma/code-connect';
import { CloseButton } from './CloseButton';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=7811-354';

const size = figma.enum('Size', {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
});

// Default state.
figma.connect(CloseButton, url, {
  variant: { State: 'Default' },
  props: {
    size: size,
  },
  example: ({ size }) => <CloseButton aria-label="Close" size={size} />,
});

// Hover state.
figma.connect(CloseButton, url, {
  variant: { State: 'Hover' },
  props: {
    size: size,
  },
  example: ({ size }) => <CloseButton aria-label="Close" size={size} />,
});

// Focus state.
figma.connect(CloseButton, url, {
  variant: { State: 'Focus' },
  props: {
    size: size,
  },
  example: ({ size }) => <CloseButton aria-label="Close" size={size} />,
});

// Disabled state.
figma.connect(CloseButton, url, {
  variant: { State: 'Disabled' },
  props: {
    size: size,
  },
  example: ({ size }) => (
    <CloseButton aria-label="Close" size={size} disabled />
  ),
});
