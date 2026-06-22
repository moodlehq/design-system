import type { AnchorHTMLAttributes, MouseEvent, ReactElement } from 'react';
import { forwardRef, isValidElement } from 'react';

type LinkVariant = 'primary' | 'secondary';

type IconElement = ReactElement<'i' | 'svg'>;

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  variant?: string;
  disabled?: boolean;
  startIcon?: IconElement;
  endIcon?: IconElement;
}

const allowedVariants: LinkVariant[] = ['primary', 'secondary'];

const isIconElement = (el: unknown, propName: string): el is IconElement => {
  const valid = isValidElement(el) && (el.type === 'i' || el.type === 'svg');
  if (!valid && el != null && import.meta.env.DEV) {
    console.error(`Link: \`${propName}\` must be an <i> or <svg> element.`);
  }
  return valid;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    label,
    variant,
    disabled = false,
    startIcon,
    endIcon,
    className,
    href,
    target,
    rel,
    onClick,
    tabIndex,
    role,
    ...props
  },
  ref,
) {
  const resolvedVariant =
    variant && allowedVariants.includes(variant as LinkVariant)
      ? (variant as LinkVariant)
      : 'primary';
  const resolvedStartIcon = isIconElement(startIcon, 'startIcon')
    ? startIcon
    : null;
  const resolvedEndIcon = isIconElement(endIcon, 'endIcon') ? endIcon : null;

  if (import.meta.env.DEV) {
    const hasAccessibleName =
      label.trim().length > 0 ||
      Boolean(props['aria-label']?.trim()) ||
      Boolean(props['aria-labelledby']?.trim());

    if (!hasAccessibleName) {
      console.warn(
        'Link: provide a label, aria-label, or aria-labelledby for accessibility.',
      );
    }

    if (variant && !allowedVariants.includes(variant as LinkVariant)) {
      console.warn(
        `[MDS Link] Invalid variant "${variant}". Falling back to "primary". Allowed: ${allowedVariants.join(', ')}`,
      );
    }

    if (resolvedStartIcon && resolvedEndIcon) {
      console.warn(
        'Link: pass either startIcon or endIcon, not both. Rendering startIcon only.',
      );
    }
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Anchors have no native disabled state, so block activation explicitly.
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  // When opening in a new tab, ensure the page can't access window.opener
  // and browsers don't send the Referer header (reverse tabnabbing protection).
  const resolvedRel = (() => {
    if (target !== '_blank') return rel;
    const parts = new Set([
      ...(rel ?? '').split(/\s+/).filter(Boolean),
      'noopener',
      'noreferrer',
    ]);
    return Array.from(parts).join(' ');
  })();

  const classes = ['mds-link', `mds-link--${resolvedVariant}`];
  if (disabled) {
    classes.push('mds-link--disabled');
  }
  if (className) {
    classes.push(className);
  }

  return (
    <a
      ref={ref}
      {...props}
      className={classes.join(' ')}
      href={disabled ? undefined : href}
      target={target}
      rel={resolvedRel}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex}
      role={disabled ? (role ?? 'link') : role}
      onClick={handleClick}
    >
      {resolvedStartIcon ? (
        <span className="mds-link__icon" aria-hidden="true">
          {resolvedStartIcon}
        </span>
      ) : null}
      <span className="mds-link__label">{label}</span>
      {resolvedStartIcon ? null : resolvedEndIcon ? (
        <span className="mds-link__icon" aria-hidden="true">
          {resolvedEndIcon}
        </span>
      ) : null}
    </a>
  );
});

Link.displayName = 'Link';
