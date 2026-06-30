import type { HTMLAttributes, ReactElement } from 'react';
import { isValidElement } from 'react';

type BadgeVariant =
  'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

type IconElement = ReactElement<'i' | 'svg'>;

// Runtime guard — icon props must be <i> or <svg> elements
const isIconElement = (el: unknown, propName: string): el is IconElement => {
  const valid = isValidElement(el) && (el.type === 'i' || el.type === 'svg');
  if (!valid && el != null && import.meta.env.DEV) {
    console.error(`Badge: \`${propName}\` must be an <i> or <svg> element.`);
  }
  return valid;
};

const allowedVariants: BadgeVariant[] = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
];

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visible badge text. Must be a caller-supplied translated string. */
  label: string;
  /** Colour/semantic variant. Defaults to `primary`. */
  variant?: BadgeVariant;
  /** When true, renders the low-contrast (subtle) style with a light background and border. */
  subtle?: boolean;
  /** When true, renders fully rounded pill shape instead of the default slight rounding. */
  pill?: boolean;
  /** Optional icon rendered before the label. Must be an `<i>` or `<svg>` element. Mutually exclusive with `endIcon`. */
  startIcon?: IconElement;
  /** Optional icon rendered after the label. Must be an `<i>` or `<svg>` element. Mutually exclusive with `startIcon`. */
  endIcon?: IconElement;
}

export const Badge = ({
  label,
  variant,
  subtle = false,
  pill = false,
  startIcon,
  endIcon,
  className,
  ...props
}: BadgeProps) => {
  const resolvedVariant =
    variant && allowedVariants.includes(variant as BadgeVariant)
      ? variant
      : 'primary';

  const resolvedStartIcon = isIconElement(startIcon, 'startIcon')
    ? startIcon
    : null;
  let resolvedEndIcon = isIconElement(endIcon, 'endIcon') ? endIcon : null;

  if (import.meta.env.DEV) {
    if (variant && !allowedVariants.includes(variant as BadgeVariant)) {
      console.warn(
        `[MDS Badge] Invalid variant "${variant}". Falling back to "primary". Allowed: ${allowedVariants.join(', ')}`,
      );
    }
    if (resolvedStartIcon && resolvedEndIcon) {
      console.warn(
        '[MDS Badge] `startIcon` and `endIcon` are mutually exclusive. Rendering `startIcon` only.',
      );
    }
  }

  // Only one icon can be rendered at a time; startIcon takes precedence when both are provided.
  if (resolvedStartIcon && resolvedEndIcon) {
    resolvedEndIcon = null;
  }

  const classes = ['mds-badge', 'badge', `mds-badge--${resolvedVariant}`];
  if (resolvedStartIcon || resolvedEndIcon) classes.push('mds-badge--has-icon');
  if (subtle) classes.push('mds-badge--subtle');
  if (pill) classes.push('mds-badge--pill');
  if (className) classes.push(className);

  return (
    <span className={classes.join(' ')} {...props}>
      {resolvedStartIcon}
      {label}
      {resolvedEndIcon}
    </span>
  );
};
