import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef, isValidElement, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Checkbox } from '../checkbox';
import { DropdownMenu } from './DropdownMenu';

type IconElement = ReactElement<'i' | 'svg'>;

// Runtime guard — icon props must be <i> or <svg> elements (same contract as Button)
const isIconElement = (el: unknown): el is IconElement =>
  isValidElement(el) && (el.type === 'i' || el.type === 'svg');

/* ------------------------------------------------------------------ */
/* Dropdown.item.action                                                */
/* ------------------------------------------------------------------ */

type DropdownItemActionVariant = 'default' | 'danger';

const allowedActionVariants: DropdownItemActionVariant[] = [
  'default',
  'danger',
];

export interface DropdownItemActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visible label text. Must be a caller-supplied translated string. */
  label: string;
  /** default (neutral) or danger (destructive) styling. */
  variant?: DropdownItemActionVariant;
  /** Optional leading icon. Accepts only intrinsic `<i>` or `<svg>` elements. */
  startIcon?: IconElement;
  /** Optional secondary line below the label. Caller-supplied translated string. */
  description?: string;
}

/**
 * Dropdown.item.action — a command row inside a Dropdown menu. Activating it
 * performs an action and typically closes the menu.
 */
export const DropdownItemAction = forwardRef<
  HTMLButtonElement,
  DropdownItemActionProps
>(function DropdownItemAction(
  { label, variant = 'default', startIcon, description, className, ...props },
  ref,
) {
  const resolvedVariant = allowedActionVariants.includes(
    variant as DropdownItemActionVariant,
  )
    ? variant
    : 'default';
  const resolvedStartIcon = isIconElement(startIcon) ? startIcon : null;

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
  }

  const classes = [
    'mds-dropdown-item',
    'mds-dropdown-item--action',
    `mds-dropdown-item--${resolvedVariant}`,
  ];
  if (description) {
    classes.push('mds-dropdown-item--with-description');
  }
  if (className) {
    classes.push(className);
  }

  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      className={classes.join(' ')}
      {...props}
    >
      {resolvedStartIcon && (
        <span className="mds-dropdown-item__icon">{resolvedStartIcon}</span>
      )}
      <span className="mds-dropdown-item__label-wrap">
        <span className="mds-dropdown-item__label">{label}</span>
        {description && (
          <span className="mds-dropdown-item__description">{description}</span>
        )}
      </span>
    </button>
  );
});
DropdownItemAction.displayName = 'DropdownItemAction';

/* ------------------------------------------------------------------ */
/* Dropdown.item.select                                                */
/* ------------------------------------------------------------------ */

export interface DropdownItemSelectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visible label text. Must be a caller-supplied translated string. */
  label: string;
  /** Single-select state: shows the surface-subtle fill and trailing check. */
  selected?: boolean;
  /** Optional leading icon. Accepts only intrinsic `<i>` or `<svg>` elements. */
  startIcon?: IconElement;
  /** Optional secondary line below the label. Caller-supplied translated string. */
  description?: string;
}

/**
 * Dropdown.item.select — a single-select option row. Only one item in the
 * group should be selected at a time; selection state is controlled by the
 * consumer (radio-like semantics via role="menuitemradio").
 */
export const DropdownItemSelect = forwardRef<
  HTMLButtonElement,
  DropdownItemSelectProps
>(function DropdownItemSelect(
  { label, selected = false, startIcon, description, className, ...props },
  ref,
) {
  const resolvedStartIcon = isIconElement(startIcon) ? startIcon : null;

  if (import.meta.env.DEV && startIcon != null && !resolvedStartIcon) {
    console.error(
      '[MDS DropdownItemSelect] `startIcon` must be an <i> or <svg> element.',
    );
  }

  const classes = ['mds-dropdown-item', 'mds-dropdown-item--select'];
  if (selected) {
    classes.push('mds-dropdown-item--selected');
  }
  if (description) {
    classes.push('mds-dropdown-item--with-description');
  }
  if (className) {
    classes.push(className);
  }

  return (
    <button
      ref={ref}
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      className={classes.join(' ')}
      {...props}
    >
      {resolvedStartIcon && (
        <span className="mds-dropdown-item__icon">{resolvedStartIcon}</span>
      )}
      <span className="mds-dropdown-item__label-wrap">
        <span className="mds-dropdown-item__label">{label}</span>
        {description && (
          <span className="mds-dropdown-item__description">{description}</span>
        )}
      </span>
      {selected && (
        <span className="mds-dropdown-item__check" aria-hidden="true" />
      )}
    </button>
  );
});
DropdownItemSelect.displayName = 'DropdownItemSelect';

/* ------------------------------------------------------------------ */
/* Dropdown.item.expandable                                            */
/* ------------------------------------------------------------------ */

export interface DropdownItemExpandableProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visible label text. Must be a caller-supplied translated string. */
  label: string;
  /** Submenu content (Dropdown item components). Presence enables the
   *  expand behavior; without children the row renders inert chrome only. */
  children?: ReactNode;
  /** Controlled submenu open state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Dropdown.item.expandable — a parent row that opens a nested Dropdown menu.
 *
 * The submenu is top-aligned to this row and offset from the parent menu
 * panel by spacing/xxs. Both the menu panel and the item row clip overflow,
 * so the submenu is portaled to document.body and positioned from live
 * bounding rects (viewport coordinates via position: fixed).
 */
export const DropdownItemExpandable = forwardRef<
  HTMLButtonElement,
  DropdownItemExpandableProps
>(function DropdownItemExpandable(
  {
    label,
    children,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    onClick,
    className,
    disabled,
    ...props
  },
  ref,
) {
  const hasSubmenu = children != null;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = hasSubmenu && !disabled && (controlledOpen ?? uncontrolledOpen);

  const itemRef = useRef<HTMLButtonElement | null>(null);
  const submenuRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{
    top: number;
    left?: number;
    right?: number;
  } | null>(null);

  const setOpen = (next: boolean) => {
    setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  // Track both the forwarded ref and the local one used for positioning.
  const setRefs = (node: HTMLButtonElement | null) => {
    itemRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  useEffect(() => {
    if (!open || !itemRef.current) {
      return;
    }
    const update = () => {
      const item = itemRef.current;
      if (!item) {
        return;
      }
      const itemRect = item.getBoundingClientRect();
      // Anchor on the parent menu panel's edge (not the row's own edge, which
      // sits inset by the panel's padding); fall back to the row when the
      // item is used standalone. The xxs gap itself is applied in CSS via
      // margin-inline-start so the token stays the single source of truth.
      const parentMenu = item.closest('.mds-dropdown-menu');
      const anchorRect = (parentMenu ?? item).getBoundingClientRect();
      // In RTL the submenu opens to the inline-end (visual left); pairing a
      // physical left/right with CSS margin-inline-start keeps the gap
      // direction-aware without measuring the submenu's own width.
      const isRtl = getComputedStyle(item).direction === 'rtl';
      setPosition(
        isRtl
          ? {
              top: itemRect.top,
              right: document.documentElement.clientWidth - anchorRect.left,
            }
          : { top: itemRect.top, left: anchorRect.right },
      );
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        itemRef.current?.contains(target) ||
        submenuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
    // setOpen is stable enough here: it only wraps state setters and the
    // onOpenChange callback, and re-subscribing on open toggles suffices.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const classes = ['mds-dropdown-item', 'mds-dropdown-item--expandable'];
  if (className) {
    classes.push(className);
  }

  return (
    <>
      <button
        ref={setRefs}
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={open}
        className={classes.join(' ')}
        disabled={disabled}
        onClick={(event) => {
          if (hasSubmenu) {
            setOpen(!open);
          }
          onClick?.(event);
        }}
        {...props}
      >
        <span className="mds-dropdown-item__label-wrap">
          <span className="mds-dropdown-item__label">{label}</span>
        </span>
        <span className="mds-dropdown-item__chevron-right" aria-hidden="true" />
      </button>
      {open &&
        position &&
        createPortal(
          <DropdownMenu
            ref={submenuRef}
            className="mds-dropdown-item__submenu"
            style={{ position: 'fixed', ...position }}
          >
            {children}
          </DropdownMenu>,
          document.body,
        )}
    </>
  );
});
DropdownItemExpandable.displayName = 'DropdownItemExpandable';

/* ------------------------------------------------------------------ */
/* Dropdown.item.multiselect                                           */
/* ------------------------------------------------------------------ */

export interface DropdownItemMultiselectProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  /** Visible label text. Must be a caller-supplied translated string. */
  label: string;
  checked?: boolean;
  /** Called with the next checked state when the row is toggled. */
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

/**
 * Dropdown.item.multiselect — a multi-select row embedding the Checkbox
 * component. Toggling it does not close the menu. The row owns the
 * interaction (role="menuitemcheckbox"); the embedded Checkbox is
 * presentation only, matching the Figma pattern where the whole item is
 * the hit area.
 */
export const DropdownItemMultiselect = forwardRef<
  HTMLDivElement,
  DropdownItemMultiselectProps
>(function DropdownItemMultiselect(
  {
    label,
    checked = false,
    onCheckedChange,
    disabled = false,
    className,
    onClick,
    onKeyDown,
    ...props
  },
  ref,
) {
  const classes = ['mds-dropdown-item', 'mds-dropdown-item--multiselect'];
  if (className) {
    classes.push(className);
  }

  return (
    <div
      ref={ref}
      role="menuitemcheckbox"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      className={classes.join(' ')}
      onClick={(event) => {
        if (!disabled) {
          onCheckedChange?.(!checked);
        }
        onClick?.(event);
      }}
      onKeyDown={(event) => {
        if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onCheckedChange?.(!checked);
        }
        onKeyDown?.(event);
      }}
      {...props}
    >
      {/* aria-hidden + tabIndex -1: the row carries the checkbox semantics;
          exposing the inner input too would double-announce the control. */}
      <span className="mds-dropdown-item__checkbox" aria-hidden="true">
        <Checkbox
          label={label}
          checked={checked}
          disabled={disabled}
          readOnly
          tabIndex={-1}
        />
      </span>
    </div>
  );
});
DropdownItemMultiselect.displayName = 'DropdownItemMultiselect';

/* ------------------------------------------------------------------ */
/* Dropdown.item.header                                                */
/* ------------------------------------------------------------------ */

export interface DropdownItemHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Visible label text. Must be a caller-supplied translated string. */
  label: string;
}

/**
 * Dropdown.item.header — a non-interactive section label that groups
 * related items. Excluded from keyboard navigation.
 */
export const DropdownItemHeader = forwardRef<
  HTMLDivElement,
  DropdownItemHeaderProps
>(function DropdownItemHeader({ label, className, ...props }, ref) {
  const classes = ['mds-dropdown-item', 'mds-dropdown-item--header'];
  if (className) {
    classes.push(className);
  }

  return (
    <div ref={ref} role="presentation" className={classes.join(' ')} {...props}>
      <span className="mds-dropdown-item__label">{label}</span>
    </div>
  );
});
DropdownItemHeader.displayName = 'DropdownItemHeader';

/* ------------------------------------------------------------------ */
/* Dropdown.item.divider                                               */
/* ------------------------------------------------------------------ */

export type DropdownItemDividerProps = HTMLAttributes<HTMLDivElement>;

/** Dropdown.item.divider — a horizontal rule separating groups of items. */
export const DropdownItemDivider = forwardRef<
  HTMLDivElement,
  DropdownItemDividerProps
>(function DropdownItemDivider({ className, ...props }, ref) {
  const classes = ['mds-dropdown-divider'];
  if (className) {
    classes.push(className);
  }

  return (
    <div
      ref={ref}
      role="separator"
      aria-hidden="true"
      className={classes.join(' ')}
      {...props}
    />
  );
});
DropdownItemDivider.displayName = 'DropdownItemDivider';

/* ------------------------------------------------------------------ */
/* Dropdown.item.custom                                                */
/* ------------------------------------------------------------------ */

export interface DropdownItemCustomProps extends HTMLAttributes<HTMLDivElement> {
  /** Arbitrary slot content. The custom item is the escape hatch for item
   *  layouts not covered by the typed variants; interactivity and ARIA for
   *  the content are the consumer's responsibility. */
  children?: ReactNode;
}

/** Dropdown.item.custom — a slot container for bespoke item content. */
export const DropdownItemCustom = forwardRef<
  HTMLDivElement,
  DropdownItemCustomProps
>(function DropdownItemCustom({ className, children, ...props }, ref) {
  const classes = ['mds-dropdown-item', 'mds-dropdown-item--custom'];
  if (className) {
    classes.push(className);
  }

  return (
    <div ref={ref} role="presentation" className={classes.join(' ')} {...props}>
      <span className="mds-dropdown-item__slot">{children}</span>
    </div>
  );
});
DropdownItemCustom.displayName = 'DropdownItemCustom';
