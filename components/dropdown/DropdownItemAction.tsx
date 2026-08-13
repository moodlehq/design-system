import { useListItem, useMergeRefs } from '@floating-ui/react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useDropdownContext } from './Dropdown';
import type { IconElement } from './dropdownItemUtils';
import { isIconElement } from './dropdownItemUtils';

type DropdownItemActionVariant = 'default' | 'danger';

const allowedActionVariants: DropdownItemActionVariant[] = [
  'default',
  'danger',
];

interface DropdownItemActionCommonProps {
  /** Visible label text. Must be a caller-supplied translated string. */
  label: string;
  /** default (neutral) or danger (destructive) styling. */
  variant?: DropdownItemActionVariant;
  /** Optional leading icon. Accepts only intrinsic `<i>` or `<svg>` elements. */
  startIcon?: IconElement;
  /** Optional secondary line below the label. Caller-supplied translated string. */
  description?: string;
  disabled?: boolean;
  /** Link target (e.g. `_blank`). Only applies when `href` is provided. */
  target?: string;
  /** Link relationship. Only applies when `href` is provided. */
  rel?: string;
}

/** Button mode — activates an action. */
export type DropdownItemActionButtonProps = DropdownItemActionCommonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof DropdownItemActionCommonProps | 'children'
  > & {
    href?: never;
  };

/** Link mode — navigates to `href` on activation. Renders as `<a>`. */
export type DropdownItemActionLinkProps = DropdownItemActionCommonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof DropdownItemActionCommonProps | 'children'
  > & {
    /** When provided, the item renders as an `<a>` element instead of `<button>`. Suppressed when `disabled` is true. */
    href: string;
  };

export type DropdownItemActionProps =
  DropdownItemActionButtonProps | DropdownItemActionLinkProps;

/**
 * Dropdown.item.action — a command row inside a Dropdown menu. Activating it
 * performs an action and typically closes the menu.
 */
export const DropdownItemAction = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  DropdownItemActionProps
>(function DropdownItemAction(
  {
    label,
    variant = 'default',
    startIcon,
    description,
    href,
    target,
    rel,
    className,
    disabled,
    onClick,
    ...restProps
  },
  forwardedRef,
) {
  const { ref: listItemRef, index } = useListItem({ label });
  const { getItemProps, activeIndex } = useDropdownContext();
  const ref = useMergeRefs([listItemRef, forwardedRef]);

  const resolvedVariant = allowedActionVariants.includes(
    variant as DropdownItemActionVariant,
  )
    ? variant
    : 'default';
  const resolvedStartIcon = isIconElement(startIcon) ? startIcon : null;
  // Danger items are destructive, single-purpose actions — a description row
  // would compete visually with the danger-colored label, so it's suppressed.
  const resolvedDescription =
    resolvedVariant === 'danger' ? undefined : description;
  const isLink = Boolean(href);

  // Automatically inject "noopener" into rel when target="_blank" to prevent
  // reverse tabnapping (OWASP A05). Consumers should pass rel="noopener noreferrer"
  // explicitly — the auto-injection is a safety net, not a substitute.
  const resolvedRel =
    target === '_blank' && !rel?.includes('noopener')
      ? [rel, 'noopener'].filter(Boolean).join(' ')
      : rel;

  if (import.meta.env.DEV) {
    if (variant && !allowedActionVariants.includes(variant)) {
      console.warn(
        `[MDS DropdownItemAction] Invalid variant "${variant}". Falling back to "default". Allowed: ${allowedActionVariants.join(', ')}`,
      );
    }
    if (startIcon != null && !resolvedStartIcon) {
      console.error(
        '[MDS DropdownItemAction] `startIcon` must be an <i> or <svg> element.',
      );
    }
    if (target === '_blank' && !rel?.includes('noopener')) {
      console.warn(
        '[MDS DropdownItemAction] `target="_blank"` used without `rel` containing "noopener". Injecting "noopener" automatically to prevent tabnapping. Pass `rel="noopener noreferrer"` explicitly to suppress this warning.',
      );
    }
    if (description && resolvedVariant === 'danger') {
      console.warn(
        '[MDS DropdownItemAction] `description` is not supported on the "danger" variant and will not be rendered.',
      );
    }
  }

  const classes = [
    'mds-dropdown-item',
    'mds-dropdown-item--action',
    `mds-dropdown-item--${resolvedVariant}`,
  ];
  if (resolvedDescription) {
    classes.push('mds-dropdown-item--with-description');
  }
  if (className) {
    classes.push(className);
  }

  const sharedContent = (
    <>
      {resolvedStartIcon && (
        <span className="mds-dropdown-item__icon">{resolvedStartIcon}</span>
      )}
      <span className="mds-dropdown-item__label-wrap">
        <span className="mds-dropdown-item__label">{label}</span>
        {resolvedDescription && (
          <span className="mds-dropdown-item__description">
            {resolvedDescription}
          </span>
        )}
      </span>
    </>
  );

  if (isLink) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        role="menuitem"
        // Suppress href when disabled so the anchor is inert.
        href={disabled ? undefined : href}
        target={target}
        rel={resolvedRel}
        aria-disabled={disabled || undefined}
        tabIndex={activeIndex === index ? 0 : -1}
        className={classes.join(' ')}
        {...(getItemProps({
          ...(restProps as React.HTMLProps<HTMLElement>),
          onClick: disabled
            ? (e: React.MouseEvent) => e.preventDefault()
            : (onClick as React.MouseEventHandler),
        }) as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {sharedContent}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      // aria-disabled keeps the item focusable and announced by AT as unavailable,
      // unlike the native disabled attribute which removes it from the tab sequence.
      aria-disabled={disabled || undefined}
      tabIndex={activeIndex === index ? 0 : -1}
      className={classes.join(' ')}
      {...(getItemProps({
        ...(restProps as React.HTMLProps<HTMLElement>),
        // Swallow keyboard-triggered activations (Enter/Space) when aria-disabled.
        // pointer-events:none in CSS already blocks mouse clicks.
        onClick: disabled
          ? (e: React.MouseEvent) => e.preventDefault()
          : onClick,
      }) as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {sharedContent}
    </button>
  );
});
DropdownItemAction.displayName = 'DropdownItemAction';
