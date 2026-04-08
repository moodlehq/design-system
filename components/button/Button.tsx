import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { isValidElement } from 'react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-danger';

type IconElement = ReactElement<'i' | 'svg'>;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: ButtonVariant;
  size?: 'sm' | 'lg';
  startIcon?: IconElement;
  endIcon?: IconElement;
}

// Runtime guard — prop for icons must be <i> or <svg> elements
const isIconElement = (el: unknown, propName: string): el is IconElement => {
  const valid = isValidElement(el) && (el.type === 'i' || el.type === 'svg');
  if (!valid && el != null && import.meta.env.DEV) {
    console.error(`Button: \`${propName}\` must be an <i> or <svg> element.`);
  }
  return valid;
};

const allowedVariants: ButtonVariant[] = [
  'primary',
  'secondary',
  'danger',
  'outline-primary',
  'outline-secondary',
  'outline-danger',
];

export const Button = ({
  label,
  variant,
  size,
  startIcon,
  endIcon,
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  // Warn in development if button has no accessible name
  if (import.meta.env.DEV) {
    const hasLabel = Boolean(label);
    const hasAriaLabel = 'aria-label' in props;
    if (!hasLabel && !hasAriaLabel) {
      console.warn(
        'Button: label prop or aria-label attribute is required for accessibility.',
      );
    }
    if (variant && !allowedVariants.includes(variant as ButtonVariant)) {
      console.warn(
        `[MDS Button] Invalid variant "${variant}". Falling back to "primary". Allowed: ${allowedVariants.join(', ')}`,
      );
    }
  }

  const resolvedVariant =
    variant && allowedVariants.includes(variant as ButtonVariant)
      ? variant
      : 'primary';

  const classes = ['mds-btn', 'btn', `btn-${resolvedVariant}`];
  if (size) {
    classes.push(`btn-${size}`);
  }
  if (className) {
    classes.push(className);
  }

  return (
    <button className={classes.join(' ')} type={type} {...props}>
      {isIconElement(startIcon, 'startIcon') ? startIcon : null}
      {label}
      {isIconElement(endIcon, 'endIcon') ? endIcon : null}
    </button>
  );
};
