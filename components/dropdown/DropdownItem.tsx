import {
  FloatingFocusManager,
  FloatingList,
  type Placement,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useTypeahead,
} from '@floating-ui/react';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef, isValidElement, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Checkbox } from '../checkbox';
import { DropdownContext, DropdownMenu, useDropdownContext } from './Dropdown';

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
  /** When provided, the item renders as an `<a>` element instead of `<button>`,
   *  navigating to this URL on activation. Suppressed when `disabled` is true. */
  href?: string;
  /** Link target (e.g. `_blank`). Only applies when `href` is provided. */
  target?: string;
  /** Link relationship. Only applies when `href` is provided. */
  rel?: string;
}

/**
 * Dropdown.item.action — a command row inside a Dropdown menu. Activating it
 * performs an action and typically closes the menu.
 */
export const DropdownItemAction = forwardRef<
  HTMLButtonElement,
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

  const sharedContent = (
    <>
      {resolvedStartIcon && (
        <span className="mds-dropdown-item__icon">{resolvedStartIcon}</span>
      )}
      <span className="mds-dropdown-item__label-wrap">
        <span className="mds-dropdown-item__label">{label}</span>
        {description && (
          <span className="mds-dropdown-item__description">{description}</span>
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
 * consumer (role="menuitemradio" for AT semantics).
 */
export const DropdownItemSelect = forwardRef<
  HTMLButtonElement,
  DropdownItemSelectProps
>(function DropdownItemSelect(
  {
    label,
    selected = false,
    startIcon,
    description,
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
      aria-disabled={disabled || undefined}
      tabIndex={activeIndex === index ? 0 : -1}
      className={classes.join(' ')}
      {...(getItemProps({
        ...(restProps as React.HTMLProps<HTMLElement>),
        onClick: disabled
          ? (e: React.MouseEvent) => e.preventDefault()
          : onClick,
      }) as ButtonHTMLAttributes<HTMLButtonElement>)}
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
      {/* Always in DOM — CSS hides it when unselected to preserve trailing-column
          width and prevent label jitter on selection change (ZeroHeight spec:
          "the label alignment is preserved"). */}
      <span className="mds-dropdown-item__check" aria-hidden="true" />
    </button>
  );
});
DropdownItemSelect.displayName = 'DropdownItemSelect';

/* ------------------------------------------------------------------ */
/* Dropdown.item.multiselect                                           */
/* ------------------------------------------------------------------ */

export interface DropdownItemMultiselectProps extends HTMLAttributes<HTMLDivElement> {
  /** Visible label text. Must be a caller-supplied translated string. */
  label: string;
  /** Whether this item is currently checked. Controlled by the consumer. */
  checked?: boolean;
  /** Optional secondary line below the label. Caller-supplied translated string. */
  description?: string;
  /** Prevents interaction and renders the item as unavailable. */
  disabled?: boolean;
}

/**
 * Dropdown.item.multiselect — a multi-select row embedding the Checkbox
 * component as its leading visual indicator. Supports independent
 * checked/unchecked toggling without closing the menu.
 *
 * The outer element carries `role="menuitemcheckbox"` so it participates
 * correctly in the ARIA menu model. The embedded `<Checkbox>` is
 * `aria-hidden` and `tabIndex={-1}` — it is purely visual; the div handles
 * all keyboard interaction and AT announcements.
 */
export const DropdownItemMultiselect = forwardRef<
  HTMLDivElement,
  DropdownItemMultiselectProps
>(function DropdownItemMultiselect(
  {
    label,
    checked = false,
    description,
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

  const classes = ['mds-dropdown-item', 'mds-dropdown-item--multiselect'];
  if (description) {
    classes.push('mds-dropdown-item--with-description');
  }
  if (className) {
    classes.push(className);
  }

  return (
    <div
      ref={ref}
      role="menuitemcheckbox"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      tabIndex={activeIndex === index ? 0 : -1}
      className={classes.join(' ')}
      {...(getItemProps({
        ...(restProps as React.HTMLProps<HTMLElement>),
        onClick: disabled
          ? (e: React.MouseEvent) => e.preventDefault()
          : (onClick as React.MouseEventHandler),
        // Divs don't fire click on Space by default — handle it explicitly.
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === ' ') {
            e.preventDefault();
            if (!disabled) {
              (e.currentTarget as HTMLElement).click();
            }
          }
          (
            restProps.onKeyDown as
              React.KeyboardEventHandler<HTMLDivElement> | undefined
          )?.(e);
        },
      }) as HTMLAttributes<HTMLDivElement>)}
    >
      {/* Checkbox is purely visual. The outer `inert` span removes the <input>
          from both the tab sequence and the accessibility tree, preventing the
          nested-interactive axe violation. `aria-hidden` adds a second guard
          for ATs that traverse inert subtrees. */}
      <span inert aria-hidden="true" className="mds-dropdown-item__checkbox">
        <Checkbox
          hideLabel
          label={label}
          checked={checked}
          disabled={disabled}
          readOnly // purely visual; outer div handles all interaction
          tabIndex={-1}
        />
      </span>
      <span className="mds-dropdown-item__label-wrap">
        <span className="mds-dropdown-item__label">{label}</span>
        {description && (
          <span className="mds-dropdown-item__description">{description}</span>
        )}
      </span>
    </div>
  );
});
DropdownItemMultiselect.displayName = 'DropdownItemMultiselect';

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
  /** Submenu placement relative to the expandable row. Defaults to 'right-start'.
   *  flip() will invert to the opposite side when space is insufficient. */
  placement?: Placement;
}

// Offset the submenu relative to the expandable button:
//   mainAxis: 4px gap from the button's inline-end edge toward the submenu.
//   crossAxis: -5px shifts the submenu up (border 1px + padding 4px of the
//     parent panel) so the first submenu item's text aligns with the
//     expandable item's text rather than sitting 5px below it.
const SUBMENU_MAIN_OFFSET = 4;
const SUBMENU_CROSS_OFFSET = -5;

/**
 * Dropdown.item.expandable — a parent row that opens a nested Dropdown menu.
 *
 * Submenu positioning is delegated to @floating-ui/react (placement='right-start'
 * + flip + shift), which replaces the previous manual getBoundingClientRect /
 * scroll-resize-listener approach and handles RTL direction automatically.
 * The submenu is portaled via createPortal (react-dom) to avoid overflow clipping
 * and to keep the inline DOM clean — FloatingPortal is intentionally not used here
 * because it renders an inline span[aria-owns] sibling that would land inside the
 * parent role="menu" element and trigger aria-required-children violations.
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
    placement = 'right-start',
    onClick,
    className,
    disabled,
    ...restProps
  },
  forwardedRef,
) {
  // Register with the parent menu's list navigation
  const { ref: listItemRef, index } = useListItem({ label });
  const { getItemProps: parentGetItemProps, activeIndex: parentActiveIndex } =
    useDropdownContext();

  // Stable id for the label span — used as aria-labelledby on the submenu panel
  // so AT users hear the parent item's text when they enter the submenu.
  const labelId = useId();

  const hasSubmenu = children != null;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen =
    hasSubmenu && !disabled && (controlledOpen ?? uncontrolledOpen);

  const [submenuActiveIndex, setSubmenuActiveIndex] = useState<number | null>(
    null,
  );
  const submenuElementsRef = useRef<(HTMLElement | null)[]>([]);
  const submenuLabelsRef = useRef<(string | null)[]>([]);

  const setOpen = (next: boolean) => {
    setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  // Position the submenu to the inline-end of this row. flip() mirrors to the
  // opposite side when space is insufficient; RTL direction is handled
  // automatically by the placement prop (Floating UI uses logical placement
  // relative to the writing direction).
  const {
    refs: submenuRefs,
    floatingStyles: submenuFloatingStyles,
    context: submenuContext,
  } = useFloating<HTMLButtonElement>({
    open: isOpen,
    onOpenChange: setOpen,
    placement,
    middleware: [
      offset({
        mainAxis: SUBMENU_MAIN_OFFSET,
        crossAxis: SUBMENU_CROSS_OFFSET,
      }),
      flip(),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  // useDismiss handles Escape (closes submenu, returns focus to this row) and
  // outside-press (clicking anywhere outside the submenu closes it). A second
  // Escape press then closes the parent menu via its own useDismiss.
  const dismiss = useDismiss(submenuContext);
  const submenuListNavigation = useListNavigation(submenuContext, {
    listRef: submenuElementsRef,
    activeIndex: submenuActiveIndex,
    onNavigate: setSubmenuActiveIndex,
  });
  const submenuTypeahead = useTypeahead(submenuContext, {
    listRef: submenuLabelsRef,
    activeIndex: submenuActiveIndex,
    onMatch: setSubmenuActiveIndex,
  });

  const { getFloatingProps, getItemProps: getSubmenuItemProps } =
    useInteractions([dismiss, submenuListNavigation, submenuTypeahead]);

  // Three refs on one element: the forwarded consumer ref, the parent list-item
  // ref (so arrow-key navigation can find this row), and the submenu anchor ref
  // (so Floating UI can compute the submenu's position from this button).
  const ref = useMergeRefs([
    forwardedRef,
    listItemRef,
    submenuRefs.setReference,
  ]);

  const classes = ['mds-dropdown-item', 'mds-dropdown-item--expandable'];
  if (className) {
    classes.push(className);
  }

  return (
    // Re-provide the context with this expandable's own getItemProps and
    // activeIndex so nested items participate in the submenu's list navigation
    // rather than the parent menu's.
    <DropdownContext.Provider
      value={{
        getItemProps: getSubmenuItemProps,
        activeIndex: submenuActiveIndex,
      }}
    >
      <button
        ref={ref}
        type="button"
        role="menuitem"
        aria-disabled={disabled || undefined}
        className={classes.join(' ')}
        tabIndex={parentActiveIndex === index ? 0 : -1}
        {...restProps}
        {...(parentGetItemProps({
          onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
            // aria-disabled: swallow activation; pointer-events:none covers mouse.
            if (disabled) {
              e.preventDefault();
              return;
            }
            if (hasSubmenu) setOpen(!isOpen);
            onClick?.(e);
          },
          // Right Arrow (LTR) / Left Arrow (RTL) opens the submenu and focuses
          // the first item via FloatingFocusManager. stopPropagation prevents
          // the parent list navigation from also handling the key.
          onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (!hasSubmenu || isOpen) return;
            const isRtl = getComputedStyle(e.currentTarget).direction === 'rtl';
            const openKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
            if (e.key === openKey) {
              e.preventDefault();
              e.stopPropagation();
              setOpen(true);
            }
          },
        }) as ButtonHTMLAttributes<HTMLButtonElement>)}
        // These must come last — override any conflicting values from spreads above.
        // Omit popup semantics when no children are provided: an expandable row
        // with no submenu should behave like a plain menuitem.
        {...(hasSubmenu
          ? { 'aria-haspopup': 'menu' as const, 'aria-expanded': isOpen }
          : {})}
      >
        <span className="mds-dropdown-item__label-wrap">
          <span id={labelId} className="mds-dropdown-item__label">
            {label}
          </span>
        </span>
        <span className="mds-dropdown-item__chevron-right" aria-hidden="true" />
      </button>
      {isOpen &&
        createPortal(
          /* guards={false}: same reason as the parent Dropdown — no focus trapping
             needed in modal={false} mode; guards cause aria-hidden-focus violations. */
          <FloatingFocusManager
            context={submenuContext}
            modal={false}
            guards={false}
          >
            <FloatingList
              elementsRef={submenuElementsRef}
              labelsRef={submenuLabelsRef}
            >
              <DropdownMenu
                ref={submenuRefs.setFloating}
                style={submenuFloatingStyles}
                aria-labelledby={labelId}
                {...getFloatingProps({
                  // Left Arrow (LTR) / Right Arrow (RTL) closes the submenu and
                  // returns focus to the expandable row via FloatingFocusManager.
                  // The submenu is portaled to document.body so e.currentTarget
                  // won't inherit the app-level dir attribute. Read direction from
                  // the reference (button) element instead, which is in the correct
                  // DOM context (e.g. inside a dir="rtl" wrapper).
                  onKeyDown(e: React.KeyboardEvent) {
                    const refEl = submenuContext.refs.domReference
                      .current as HTMLElement | null;
                    const isRtl =
                      getComputedStyle(
                        refEl ?? (e.currentTarget as HTMLElement),
                      ).direction === 'rtl';
                    const closeKey = isRtl ? 'ArrowRight' : 'ArrowLeft';
                    if (e.key === closeKey) {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpen(false);
                    }
                  },
                })}
              >
                {children}
              </DropdownMenu>
            </FloatingList>
          </FloatingFocusManager>,
          document.body,
        )}
    </DropdownContext.Provider>
  );
});
DropdownItemExpandable.displayName = 'DropdownItemExpandable';

/* ------------------------------------------------------------------ */
/* Dropdown.item.header                                                */
/* ------------------------------------------------------------------ */

export interface DropdownItemHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Visible label text. Must be a caller-supplied translated string. */
  label: string;
}

/**
 * Dropdown.item.header — a non-interactive section label for visual grouping only.
 * Excluded from keyboard navigation.
 *
 * This component uses `role="group"` with `aria-label` to expose the header text to
 * the accessibility tree. Note: items that follow the header are DOM siblings, not
 * children of the group element — the ARIA grouping contract is therefore not
 * fulfilled. For semantic grouping where AT should announce the group name as users
 * navigate into it, use `DropdownItemGroup` instead, which correctly wraps its
 * children inside the `role="group"` element.
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
    // role="group" + aria-label exposes the header as a named group landmark
    // for AT users, replacing role="presentation" which suppressed all semantics.
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={classes.join(' ')}
      {...props}
    >
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
    <div ref={ref} role="separator" className={classes.join(' ')} {...props} />
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

/* ------------------------------------------------------------------ */
/* Dropdown.item.group                                                 */
/* ------------------------------------------------------------------ */

export interface DropdownItemGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Group section label. Rendered as visible text and used as the
   *  accessible name for role="group" via aria-labelledby. */
  label: string;
  /** Dropdown item components to include in this group. */
  children?: ReactNode;
}

/**
 * Dropdown.item.group — a semantic wrapper that correctly groups related items.
 *
 * Uses role="group" with aria-labelledby so AT users hear the group's name
 * when they navigate into it. The label is rendered as a visible header row.
 *
 * Prefer this over placing DropdownItemHeader alongside ungrouped siblings:
 * role="group" requires that grouped items are DOM children of the group
 * element — sibling placement does not satisfy the ARIA grouping contract.
 * DropdownItemHeader is a visual label only and should be used only when
 * semantic AT-announced grouping is not required.
 *
 * display:contents removes the wrapper div from the visual layout so the
 * menu panel's own gap applies uniformly across all items and group labels.
 */
export const DropdownItemGroup = forwardRef<
  HTMLDivElement,
  DropdownItemGroupProps
>(function DropdownItemGroup({ label, children, className, ...props }, ref) {
  const labelId = useId();

  const classes = ['mds-dropdown-item-group'];
  if (className) classes.push(className);

  return (
    <div
      ref={ref}
      role="group"
      aria-labelledby={labelId}
      className={classes.join(' ')}
      {...props}
    >
      <span id={labelId} className="mds-dropdown-item-group__label">
        {label}
      </span>
      {children}
    </div>
  );
});
DropdownItemGroup.displayName = 'DropdownItemGroup';
