import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { forwardRef, isValidElement } from 'react';
import { Button } from '../button';
import type { ButtonVariant } from '../button/Button';
import './dropdown.css';

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
 * For the button variant, renders a <Button> with the chevron passed as
 * endIcon alongside any optional startIcon. For the nav-pill variant, renders
 * a raw <button> with nav-pill CSS classes — NavPill is intentionally not
 * reused here because NavPill renders an <a> element (navigation semantics),
 * whereas a dropdown trigger is a toggle action and must be a <button>.
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
  const isIconOnly = !isNavPill && iconOnly && Boolean(resolvedStartIcon);

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

  // md triggers use the 12×8 chevron; sm and nav-pill use the 8×8 one.
  const chevronClasses = [
    'mds-dropdown-trigger__chevron',
    resolvedSize === 'sm' || isNavPill
      ? 'mds-dropdown-trigger__chevron--sm'
      : null,
  ]
    .filter(Boolean)
    .join(' ');

  // Button variant: delegate to <Button> so the trigger is composed from the
  // real Button component rather than duplicating its classes manually.
  // The chevron is passed as endIcon alongside any optional startIcon — this
  // requires Button to support both icon slots simultaneously (see Button.tsx).
  if (!isNavPill) {
    // Icon-only triggers always use size="lg" — the lg variant changes only
    // border-radius (md instead of pill), not spacing, so the icon-only trigger
    // is not fully rounded. Non-icon-only triggers are restricted to sm/md.
    const buttonSize = isIconOnly ? 'lg' : resolvedSize;
    return (
      <Button
        ref={ref}
        type={type}
        variant={appearanceToButtonVariant[resolvedAppearance] as ButtonVariant}
        size={buttonSize}
        label={isIconOnly ? undefined : label}
        startIcon={resolvedStartIcon ?? undefined}
        // Omit the chevron for icon-only triggers — they show only the action
        // icon; the open state is conveyed via aria-expanded alone.
        endIcon={
          isIconOnly ? undefined : (
            <i className={chevronClasses} aria-hidden="true" />
          )
        }
        aria-label={isIconOnly ? label : undefined}
        aria-haspopup="menu"
        aria-expanded={open}
        className={[
          'mds-dropdown-trigger',
          open ? 'mds-dropdown-trigger--open' : null,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    );
  }

  // Nav-pill variant: NavPill renders an <a> element and is designed for
  // navigation, not toggle actions. The trigger must be a <button>, so the
  // nav-pill CSS classes are applied directly here rather than wrapping NavPill.

  return (
    <button
      ref={ref}
      className={[
        'mds-dropdown-trigger',
        'mds-nav-pill',
        'mds-dropdown-trigger--nav-pill',
        open ? 'mds-dropdown-trigger--open' : null,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      type={type}
      aria-haspopup="menu"
      aria-expanded={open}
      {...props}
    >
      <span className="mds-nav-pill__label">{label}</span>
      <i
        className="mds-dropdown-trigger__chevron mds-dropdown-trigger__chevron--sm"
        aria-hidden="true"
      />
    </button>
  );
});
DropdownTrigger.displayName = 'DropdownTrigger';
