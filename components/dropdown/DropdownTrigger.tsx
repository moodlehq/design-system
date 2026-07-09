import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { forwardRef, isValidElement } from 'react';

type DropdownTriggerVariant = 'button' | 'nav-pill';
type DropdownTriggerAppearance = 'emphasis' | 'default' | 'subtle';
type DropdownTriggerSize = 'sm' | 'md';

type IconElement = ReactElement<'i' | 'svg'>;

// Figma "Appearance" values map onto the existing Button visual variants —
// the trigger is a styled secondary button, so it reuses the same Bootstrap
// modifier classes (and therefore the same button.css rules).
const appearanceToButtonVariant: Record<DropdownTriggerAppearance, string> = {
  emphasis: 'secondary',
  default: 'outline-secondary',
  subtle: 'ghost',
};

const allowedVariants: DropdownTriggerVariant[] = ['button', 'nav-pill'];
const allowedAppearances: DropdownTriggerAppearance[] = [
  'emphasis',
  'default',
  'subtle',
];
const allowedSizes: DropdownTriggerSize[] = ['sm', 'md'];

// Runtime guard — icon props must be <i> or <svg> elements (same contract as Button)
const isIconElement = (el: unknown): el is IconElement =>
  isValidElement(el) && (el.type === 'i' || el.type === 'svg');

export interface DropdownTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visible label text. Must be a caller-supplied translated string.
   *  For icon-only triggers it becomes the aria-label instead. */
  label: string;
  /** Visual form: a standalone button or a navigation pill. The nav-pill
   *  variant is constrained to Appearance=default and Size=md per the design. */
  variant?: DropdownTriggerVariant;
  /** emphasis = filled secondary, default = outlined secondary, subtle = ghost. */
  appearance?: DropdownTriggerAppearance;
  size?: DropdownTriggerSize;
  /** Optional leading icon. Accepts only intrinsic `<i>` or `<svg>` elements. */
  startIcon?: IconElement;
  /** Renders only the startIcon (no label text, no chevron); the label prop is
   *  applied as aria-label so the trigger keeps an accessible name. */
  iconOnly?: boolean;
  /** Whether the dropdown this trigger controls is open. Drives aria-expanded
   *  and the pressed/active visual state (Figma State=active). */
  open?: boolean;
}

/**
 * Dropdown.trigger — the clickable affordance that opens a Dropdown menu.
 *
 * Renders a native <button> carrying the Button component's classes rather
 * than wrapping <Button> itself: the trigger needs a leading icon, the label,
 * and a trailing chevron at the same time, while Button intentionally renders
 * only one icon slot (it warns when both are passed). All visual styling
 * still comes from button.css / nav-pill.css via the shared classes.
 */
export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(function DropdownTrigger(
  {
    label,
    variant = 'button',
    appearance = 'default',
    size = 'md',
    startIcon,
    iconOnly = false,
    open = false,
    className,
    type = 'button',
    ...props
  },
  ref,
) {
  const resolvedVariant = allowedVariants.includes(
    variant as DropdownTriggerVariant,
  )
    ? variant
    : 'button';
  const resolvedAppearance = allowedAppearances.includes(
    appearance as DropdownTriggerAppearance,
  )
    ? appearance
    : 'default';
  const resolvedSize = allowedSizes.includes(size as DropdownTriggerSize)
    ? size
    : 'md';
  const resolvedStartIcon = isIconElement(startIcon) ? startIcon : null;
  const isNavPill = resolvedVariant === 'nav-pill';

  if (import.meta.env.DEV) {
    if (variant && !allowedVariants.includes(variant)) {
      console.warn(
        `[MDS DropdownTrigger] Invalid variant "${variant}". Falling back to "button". Allowed: ${allowedVariants.join(', ')}`,
      );
    }
    if (appearance && !allowedAppearances.includes(appearance)) {
      console.warn(
        `[MDS DropdownTrigger] Invalid appearance "${appearance}". Falling back to "default". Allowed: ${allowedAppearances.join(', ')}`,
      );
    }
    if (size && !allowedSizes.includes(size)) {
      console.warn(
        `[MDS DropdownTrigger] Invalid size "${size}". Falling back to "md". Allowed: ${allowedSizes.join(', ')}`,
      );
    }
    if (startIcon != null && !resolvedStartIcon) {
      console.error(
        '[MDS DropdownTrigger] `startIcon` must be an <i> or <svg> element.',
      );
    }
    if (isNavPill && (startIcon || iconOnly)) {
      console.warn(
        '[MDS DropdownTrigger] The nav-pill variant does not support icons. Ignoring startIcon/iconOnly.',
      );
    }
    if (isNavPill && (appearance !== 'default' || size !== 'md')) {
      console.warn(
        '[MDS DropdownTrigger] The nav-pill variant only supports appearance="default" and size="md". Ignoring appearance/size.',
      );
    }
    if (iconOnly && !resolvedStartIcon) {
      console.warn(
        '[MDS DropdownTrigger] iconOnly requires a startIcon; rendering the label instead.',
      );
    }
  }

  const isIconOnly = !isNavPill && iconOnly && Boolean(resolvedStartIcon);

  const classes = isNavPill
    ? ['mds-dropdown-trigger', 'mds-nav-pill', 'mds-dropdown-trigger--nav-pill']
    : [
        'mds-dropdown-trigger',
        'mds-btn',
        'btn',
        `btn-${appearanceToButtonVariant[resolvedAppearance]}`,
        `mds-btn--size-${resolvedSize}`,
      ];
  if (isIconOnly) {
    classes.push('mds-btn--icon-only');
  }
  if (open) {
    classes.push('mds-dropdown-trigger--open');
  }
  if (className) {
    classes.push(className);
  }

  // md triggers use the 12×8 chevron; sm and nav-pill use the 8×8 one.
  const chevronClasses = [
    'mds-dropdown-trigger__chevron',
    resolvedSize === 'sm' || isNavPill
      ? 'mds-dropdown-trigger__chevron--sm'
      : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      className={classes.join(' ')}
      type={type}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-label={isIconOnly ? label : undefined}
      {...props}
    >
      {!isNavPill && resolvedStartIcon}
      {isIconOnly ? null : isNavPill ? (
        <span className="mds-nav-pill__label">{label}</span>
      ) : (
        label
      )}
      {!isIconOnly && <span className={chevronClasses} aria-hidden="true" />}
    </button>
  );
});
DropdownTrigger.displayName = 'DropdownTrigger';
