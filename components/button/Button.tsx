import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { forwardRef, isValidElement } from 'react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-danger';

type ButtonSize = 'sm' | 'md' | 'lg';

type IconElement = ReactElement<'i' | 'svg'>;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
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
  'ghost',
  'outline-primary',
  'outline-secondary',
  'outline-danger',
];

const allowedSizes: ButtonSize[] = ['sm', 'md', 'lg'];

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      label,
      variant,
      size,
      startIcon,
      endIcon,
      className,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const resolvedVariant =
      variant && allowedVariants.includes(variant as ButtonVariant)
        ? variant
        : 'primary';
    const resolvedSize =
      size && allowedSizes.includes(size as ButtonSize) ? size : 'md';
    const resolvedStartIcon = isIconElement(startIcon, 'startIcon')
      ? startIcon
      : null;
    let resolvedEndIcon = isIconElement(endIcon, 'endIcon') ? endIcon : null;

    if (import.meta.env.DEV) {
      const hasAccessibleName =
        Boolean(label) ||
        Boolean(props['aria-label']?.trim()) ||
        Boolean(props['aria-labelledby']?.trim());
      if (!hasAccessibleName) {
        console.warn(
          'Button: provide a label, aria-label, or aria-labelledby for accessibility.',
        );
      }
      if (variant && !allowedVariants.includes(variant as ButtonVariant)) {
        console.warn(
          `[MDS Button] Invalid variant "${variant}". Falling back to "primary". Allowed: ${allowedVariants.join(', ')}`,
        );
      }
      if (size && !allowedSizes.includes(size as ButtonSize)) {
        console.warn(
          `[MDS Button] Invalid size "${size}". Falling back to "md". Allowed: ${allowedSizes.join(', ')}`,
        );
      }
      if (resolvedStartIcon && resolvedEndIcon) {
        console.warn(
          'Button: pass either startIcon or endIcon, not both. Rendering startIcon only.',
        );
      }
      if (!label && !resolvedStartIcon && !resolvedEndIcon) {
        console.warn(
          'Button: provide a label or icon so the button does not render as visually empty.',
        );
      }
    }

    if (resolvedStartIcon && resolvedEndIcon) {
      resolvedEndIcon = null;
    }
    const isIconOnly = !label && Boolean(resolvedStartIcon || resolvedEndIcon);

    const classes = [
      'mds-btn',
      'btn',
      `btn-${resolvedVariant}`,
      `mds-btn--size-${resolvedSize}`,
    ];
    if (isIconOnly) {
      classes.push('mds-btn--icon-only');
    }
    if (className) {
      classes.push(className);
    }

    return (
      <button ref={ref} className={classes.join(' ')} type={type} {...props}>
        {isIconOnly ? (
          <span className="mds-btn-icon-box">
            {resolvedStartIcon || resolvedEndIcon}
          </span>
        ) : (
          <>
            {resolvedStartIcon}
            {label}
            {resolvedEndIcon}
          </>
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';
