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
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { DropdownContext, DropdownMenu, useDropdownContext } from './Dropdown';

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
//   mainAxis: 8px gap from the button's inline-end edge toward the submenu.
//   crossAxis: for *-start placements, -5px shifts the submenu up (border 1px
//     + padding 4px of the parent panel) so the first submenu item's text
//     aligns with the expandable item's text; for *-end placements, +5px keeps
//     the alignment mirrored on the end edge.
const SUBMENU_MAIN_OFFSET = 8;
const SUBMENU_CROSS_OFFSET_START = -5;
const SUBMENU_CROSS_OFFSET_END = 5;

/**
 * Dropdown.item.expandable — a parent row that opens a nested Dropdown menu.
 *
 * Submenu positioning is delegated to `@floating-ui/react` (`placement='right-start'`
 * with `flip` and `shift` middleware), which replaces the previous manual
 * getBoundingClientRect / scroll-resize-listener approach and handles RTL direction
 * automatically. The submenu is portaled via createPortal (react-dom) to avoid overflow clipping
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
  // so Assistive Technology users hear the parent item's text when they enter the submenu.
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

  // Floating UI uses physical placement values, not logical ones — it does not
  // read the dir attribute automatically. Detect RTL after mount and mirror
  // right-* ↔ left-* so the submenu opens at the inline-end edge in all directions.
  const [submenuDirection, setSubmenuDirection] = useState<'ltr' | 'rtl'>(
    'ltr',
  );
  const isRtlContext = submenuDirection === 'rtl';
  const effectivePlacement: Placement = isRtlContext
    ? placement.startsWith('right')
      ? (placement.replace('right', 'left') as Placement)
      : placement.startsWith('left')
        ? (placement.replace('left', 'right') as Placement)
        : placement
    : placement;

  const submenuCrossAxisOffset = effectivePlacement.endsWith('end')
    ? SUBMENU_CROSS_OFFSET_END
    : SUBMENU_CROSS_OFFSET_START;

  const {
    refs: submenuRefs,
    floatingStyles: submenuFloatingStyles,
    context: submenuContext,
  } = useFloating<HTMLButtonElement>({
    open: isOpen,
    onOpenChange: setOpen,
    placement: effectivePlacement,
    middleware: [
      offset({
        mainAxis: SUBMENU_MAIN_OFFSET,
        crossAxis: submenuCrossAxisOffset,
      }),
      flip(),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  // Reads dir from the reference element after mount and mirrors the placement.
  useLayoutEffect(() => {
    const el = submenuRefs.reference.current;
    // VirtualElement (used in floating-ui for virtual anchors) has no computed style.
    if (el instanceof Element) {
      const direction =
        getComputedStyle(el).direction === 'rtl' ? 'rtl' : 'ltr';
      setSubmenuDirection(direction);
    }
  }, [submenuRefs.reference]); // stable ref object — runs once after mount

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
        {hasSubmenu && (
          <span
            className="mds-dropdown-item__chevron-right"
            aria-hidden="true"
          />
        )}
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
                dir={submenuDirection}
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
