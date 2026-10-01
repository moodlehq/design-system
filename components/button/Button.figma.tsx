import figma from '@figma/code-connect';
import { Button } from './Button';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=7206:1782';

// The parser needs object literals inline, so these can't be factored out.
const variantProps = {
  variant: figma.enum('Variant', {
    primary: figma.enum('Style', {
      fill: 'primary',
      outline: 'outline-primary',
    }),
    secondary: figma.enum('Style', {
      fill: 'secondary',
      outline: 'outline-secondary',
    }),
    danger: figma.enum('Style', {
      fill: 'danger',
      outline: 'outline-danger',
    }),
    ghost: figma.enum('Style', {
      fill: 'ghost',
    }),
  }),
};
const sizeProps = {
  size: figma.enum('Size', {
    sm: 'sm',
    'md (default)': 'md',
    lg: 'lg',
  }),
};
const buttonLabel = 'Button';
const iconOnlyAriaLabel = 'Action';

// Default state (no icon, no focus state visual)
figma.connect(Button, url, {
  variant: { Icon: 'none', State: 'default', Focus: 'False' },
  props: { ...variantProps, ...sizeProps },
  example: (props) => (
    <Button label={buttonLabel} variant={props.variant} size={props.size} />
  ),
});

// Hover state
figma.connect(Button, url, {
  variant: { Icon: 'none', State: 'hover', Focus: 'False' },
  props: { ...variantProps, ...sizeProps },
  example: (props) => (
    <Button label={buttonLabel} variant={props.variant} size={props.size} />
  ),
});

// Pressed state
figma.connect(Button, url, {
  variant: { Icon: 'none', State: 'pressed', Focus: 'False' },
  props: { ...variantProps, ...sizeProps },
  example: (props) => (
    <Button label={buttonLabel} variant={props.variant} size={props.size} />
  ),
});

// Focus-visible state
figma.connect(Button, url, {
  variant: { Icon: 'none', State: 'default', Focus: 'True' },
  props: { ...variantProps, ...sizeProps },
  example: (props) => (
    <Button label={buttonLabel} variant={props.variant} size={props.size} />
  ),
});

// Disabled state
figma.connect(Button, url, {
  variant: { Icon: 'none', State: 'disabled', Focus: 'False' },
  props: { ...variantProps, ...sizeProps },
  example: (props) => (
    <Button
      label={buttonLabel}
      variant={props.variant}
      size={props.size}
      disabled
    />
  ),
});

// With end icon
figma.connect(Button, url, {
  variant: { Icon: 'endIcon', State: 'default', Focus: 'False' },
  props: { ...variantProps, ...sizeProps },
  example: (props) => (
    <Button
      label={buttonLabel}
      variant={props.variant}
      size={props.size}
      endIcon={<i className="fa-solid fa-arrow-right" />}
    />
  ),
});

// With start icon
figma.connect(Button, url, {
  variant: { Icon: 'startIcon', State: 'default', Focus: 'False' },
  props: { ...variantProps, ...sizeProps },
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
    ...variantProps,
    ...sizeProps,
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
