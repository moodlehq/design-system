import figma from '@figma/code-connect';
import { Badge } from './Badge';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=7309-410';

const variant = figma.enum('Type', {
  Primary: 'primary',
  Secondary: 'secondary',
  Success: 'success',
  Danger: 'danger',
  Warning: 'warning',
  Info: 'info',
});

const pill = figma.enum('Style', {
  Pill: true,
  Default: false,
});

// Default contrast, no icon
figma.connect(Badge, url, {
  variant: { Contrast: 'Default', Icon: 'None' },
  props: {
    variant: variant,
    pill: pill,
  },
  example: ({ variant, pill }) => (
    <Badge label="Label" variant={variant} pill={pill} />
  ),
});

// Default contrast, prefix icon
figma.connect(Badge, url, {
  variant: { Contrast: 'Default', Icon: 'Prefix' },
  props: {
    variant: variant,
    pill: pill,
  },
  example: ({ variant, pill }) => (
    <Badge
      label="Label"
      variant={variant}
      pill={pill}
      startIcon={<i className="fa-solid fa-circle-check" aria-hidden="true" />}
    />
  ),
});

// Default contrast, suffix icon
figma.connect(Badge, url, {
  variant: { Contrast: 'Default', Icon: 'Suffix' },
  props: {
    variant: variant,
    pill: pill,
  },
  example: ({ variant, pill }) => (
    <Badge
      label="Label"
      variant={variant}
      pill={pill}
      endIcon={<i className="fa-solid fa-xmark" aria-hidden="true" />}
    />
  ),
});

// Subtle contrast, no icon
figma.connect(Badge, url, {
  variant: { Contrast: 'Subtle', Icon: 'None' },
  props: {
    variant: variant,
    pill: pill,
  },
  example: ({ variant, pill }) => (
    <Badge label="Label" variant={variant} subtle pill={pill} />
  ),
});

// Subtle contrast, prefix icon
figma.connect(Badge, url, {
  variant: { Contrast: 'Subtle', Icon: 'Prefix' },
  props: {
    variant: variant,
    pill: pill,
  },
  example: ({ variant, pill }) => (
    <Badge
      label="Label"
      variant={variant}
      subtle
      pill={pill}
      startIcon={<i className="fa-solid fa-circle-check" aria-hidden="true" />}
    />
  ),
});

// Subtle contrast, suffix icon
figma.connect(Badge, url, {
  variant: { Contrast: 'Subtle', Icon: 'Suffix' },
  props: {
    variant: variant,
    pill: pill,
  },
  example: ({ variant, pill }) => (
    <Badge
      label="Label"
      variant={variant}
      subtle
      pill={pill}
      endIcon={<i className="fa-solid fa-xmark" aria-hidden="true" />}
    />
  ),
});
