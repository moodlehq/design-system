import figma from '@figma/code-connect';
import { Button } from './Button';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=7206:1782';

// Map Figma Size variants to React size prop
const sizeMap = {
  small: 'sm',
  default: 'md',
  large: 'lg',
} as const;

// Map Figma Type + Style variants to React variant prop
const styleVariantMap = {
  primary: {
    fill: 'primary',
    outline: 'outline-primary',
  },
  secondary: {
    fill: 'secondary',
    outline: 'outline-secondary',
  },
  danger: {
    fill: 'danger',
    outline: 'outline-danger',
  },
  ghost: {
    fill: 'ghost',
  },
} as const;

const variant = figma.enum('Type', {
  primary: figma.enum('Style', styleVariantMap.primary),
  secondary: figma.enum('Style', styleVariantMap.secondary),
  danger: figma.enum('Style', styleVariantMap.danger),
  ghost: figma.enum('Style', styleVariantMap.ghost),
});
const size = figma.enum('Size', sizeMap);
const buttonLabel = 'Button';
const iconOnlyAriaLabel = 'Action';

// Default state (no icon, no focus state visual)
figma.connect(Button, url, {
  variant: { Icon: 'none', State: 'default', Focus: 'False' },
  props: { variant: variant, size: size },
  example: (props) => (
    <Button label={buttonLabel} variant={props.variant} size={props.size} />
  ),
});

// Disabled state
figma.connect(Button, url, {
  variant: { Icon: 'none', State: 'disabled', Focus: 'False' },
  props: { variant: variant, size: size },
  example: (props) => (
    <Button
      label={buttonLabel}
      variant={props.variant}
      size={props.size}
      disabled
    />
  ),
});

// With end icon (suffix)
figma.connect(Button, url, {
  variant: { Icon: 'suffix', State: 'default', Focus: 'False' },
  props: { variant: variant, size: size },
  example: (props) => (
    <Button
      label={buttonLabel}
      variant={props.variant}
      size={props.size}
      endIcon={<i className="fa-solid fa-arrow-right" />}
    />
  ),
});

// With start icon (prefix)
figma.connect(Button, url, {
  variant: { Icon: 'prefix', State: 'default', Focus: 'False' },
  props: { variant: variant, size: size },
  example: (props) => (
    <Button
      label={buttonLabel}
      variant={props.variant}
      size={props.size}
      startIcon={<i className="fa-solid fa-arrow-left" />}
    />
  ),
});

// Icon only
figma.connect(Button, url, {
  variant: { Icon: 'Icon only', State: 'default', Focus: 'False' },
  props: {
    variant: variant,
    size: size,
  },
  example: ({ variant, size }) => (
    <Button
      variant={variant}
      size={size}
      aria-label={iconOnlyAriaLabel}
      startIcon={<i className="fa-solid fa-gear" />}
    />
  ),
});
