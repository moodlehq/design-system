import type { Placement } from '@floating-ui/react';
import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useTypeahead,
} from '@floating-ui/react';
import type {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  RefAttributes,
} from 'react';
import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useId,
  useRef,
  useState,
} from 'react';
import type { DropdownTriggerProps } from './DropdownTrigger';
import { DropdownTrigger } from './DropdownTrigger';

type IconElement = ReactElement<'i' | 'svg'>;
type CustomTriggerProps = React.HTMLProps<HTMLElement> &
  RefAttributes<HTMLElement>;
type CustomTriggerElement = ReactElement<CustomTriggerProps>;

// ── Context ──────────────────────────────────────────────────────────────────

export interface DropdownContextValue {
  /** Merge Floating UI item-interaction props with the caller's own props. */
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  /** Index of the currently keyboard-active item, or null on first open before
   *  any arrow-key movement. Items set their tabIndex based on this value. */
  activeIndex: number | null;
}

// Exported so DropdownItemExpandable can re-provide a nested instance for its
// own submenu children.
export const DropdownContext = createContext<DropdownContextValue | null>(null);

// Returned by items rendered outside any Dropdown (e.g. standalone unit tests).
// Acts as a passthrough so items function correctly in isolation.
const fallbackDropdownContext: DropdownContextValue = {
  getItemProps: (userProps) => (userProps as Record<string, unknown>) ?? {},
  activeIndex: null,
};

/**
 * Returns the nearest Dropdown's item-interaction helpers.
 * Falls back to a passthrough context so items work in isolation (tests /
 * standalone story usage).
 */
export function useDropdownContext(): DropdownContextValue {
  return useContext(DropdownContext) ?? fallbackDropdownContext;
}

// ── DropdownMenu ─────────────────────────────────────────────────────────────

export type DropdownMenuProps = HTMLAttributes<HTMLDivElement>;

/**
 * Dropdown.menu — the panel that hosts Dropdown items.
 *
 * A passive container: interactive behavior lives on each item. Compose it
 * with DropdownItemAction, DropdownItemSelect, DropdownItemExpandable,
 * DropdownItemMultiselect, DropdownItemHeader, DropdownItemDivider and
 * DropdownItemCustom children.
 */
export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  function DropdownMenu({ className, children, ...props }, ref) {
    const classes = ['mds-dropdown-menu'];
    if (className) {
      classes.push(className);
    }

    return (
      <div
        ref={ref}
        role="menu"
        tabIndex={-1}
        className={classes.join(' ')}
        {...props}
      >
        {children}
      </div>
    );
  },
);
DropdownMenu.displayName = 'DropdownMenu';

// ── Dropdown ─────────────────────────────────────────────────────────────────

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  /** Trigger label. Must be a caller-supplied translated string. Required
   *  unless `trigger` is provided. */
  label?: string;
  /** Trigger form — see DropdownTrigger. Ignored when `trigger` is provided. */
  variant?: DropdownTriggerProps['variant'];
  /** Trigger appearance — see DropdownTrigger. Ignored when `trigger` is provided. */
  appearance?: DropdownTriggerProps['appearance'];
  /** Trigger size — see DropdownTrigger. Ignored when `trigger` is provided. */
  size?: DropdownTriggerProps['size'];
  /** Optional leading trigger icon. Accepts only intrinsic `<i>` or `<svg>` elements.
   *  Ignored when `trigger` is provided. */
  startIcon?: IconElement;
  /** Renders an icon-only trigger; the label becomes its aria-label.
   *  Ignored when `trigger` is provided. */
  iconOnly?: boolean;
  /**
   * Escape hatch for a fully custom trigger element when none of the built-in
   * DropdownTrigger visual variants fit (e.g. a link-styled trigger). The
   * element is cloned with the floating reference ref plus the ARIA and
   * interaction props Dropdown needs — it must forward its `ref` to a
   * focusable host element. When provided, `label`, `variant`, `appearance`,
   * `size`, `startIcon` and `iconOnly` are ignored.
   */
  trigger?: CustomTriggerElement;
  /** Controlled open state; leave undefined for uncontrolled behavior. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Menu placement relative to the trigger. Defaults to 'bottom-start'.
   *  flip() will invert to the opposite side when space is insufficient. */
  placement?: Placement;
  /** Whether the menu may flip to an alternate placement when space is
   *  insufficient. Defaults to true. */
  allowPlacementFlip?: boolean;
  /** When true, the menu panel grows to be at least as wide as the trigger.
   *  Useful when the trigger label is wider than the default 217px minimum. */
  matchTriggerWidth?: boolean;
  /** Menu content (Dropdown item components). */
  children?: ReactNode;
}

// --mds-spacing-xxs = var(--mds-scale-100) = 0.25rem = 4px
const MENU_OFFSET = 4;

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  function Dropdown(
    {
      label,
      variant,
      appearance,
      size: triggerSize,
      startIcon,
      iconOnly,
      trigger,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      placement = 'bottom-start',
      allowPlacementFlip = true,
      matchTriggerWidth = false,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const open = controlledOpen ?? uncontrolledOpen;
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const elementsRef = useRef<(HTMLElement | null)[]>([]);
    const labelsRef = useRef<(string | null)[]>([]);
    // Stable id used to label the menu panel with the trigger text.
    const triggerId = useId();

    const customTrigger = isValidElement<CustomTriggerProps>(trigger)
      ? trigger
      : null;
    const customTriggerRef = customTrigger?.props.ref as Ref<HTMLElement>;

    const setOpen = (next: boolean) => {
      setUncontrolledOpen(next);
      onOpenChange?.(next);
    };

    const { refs, floatingStyles, context } = useFloating<HTMLButtonElement>({
      open,
      onOpenChange: setOpen,
      placement,
      middleware: [
        // Separate the menu from the trigger by --mds-spacing-xxs.
        offset(MENU_OFFSET),
        // Auto-flip to the opposite side when vertical space is insufficient.
        ...(allowPlacementFlip ? [flip()] : []),
        // Slide along the cross-axis to stay within the viewport.
        shift({ padding: 8 }),
        // Match the trigger width when matchTriggerWidth=true.
        ...(matchTriggerWidth
          ? [
              size({
                apply({ rects, elements }) {
                  Object.assign(elements.floating.style, {
                    minWidth: `${rects.reference.width}px`,
                  });
                },
              }),
            ]
          : []),
      ],
      // Keep position accurate when the page scrolls or the viewport resizes.
      whileElementsMounted: autoUpdate,
    });
    const { setReference, setFloating } = refs;
    // Always called (Rules of Hooks) — only used when a custom `trigger` is
    // supplied, to merge the caller's own ref with the floating reference ref.
    const mergedCustomTriggerRef = useMergeRefs([
      setReference,
      customTriggerRef,
    ]);

    // FloatingPortal mounts under document.body, so the menu does not inherit
    // direction from a local dir wrapper. Mirror the trigger's computed
    // direction onto the menu for correct text alignment and submenu keys.
    const menuDirection: 'ltr' | 'rtl' =
      refs.reference.current instanceof Element &&
      getComputedStyle(refs.reference.current).direction === 'rtl'
        ? 'rtl'
        : 'ltr';

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const listNavigation = useListNavigation(context, {
      listRef: elementsRef,
      activeIndex,
      onNavigate: setActiveIndex,
    });
    const typeahead = useTypeahead(context, {
      listRef: labelsRef,
      activeIndex,
      onMatch: setActiveIndex,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([click, dismiss, listNavigation, typeahead]);

    if (import.meta.env.DEV) {
      if (!customTrigger && !label) {
        console.error(
          '[MDS Dropdown] Either `label` or `trigger` must be provided.',
        );
      }
    }

    const classes = ['mds-dropdown'];
    if (className) classes.push(className);

    // When `trigger` is provided, clone it with the floating reference ref and
    // the same ARIA/interaction wiring the built-in DropdownTrigger gets —
    // this is how consumers with a non-Button visual trigger (e.g. Breadcrumb's
    // link-styled overflow button) reuse Dropdown's floating-ui orchestration
    // instead of reimplementing it.
    const renderedTrigger = customTrigger ? (
      cloneElement(customTrigger, {
        ref: mergedCustomTriggerRef,
        id: triggerId,
        'aria-haspopup': 'menu',
        'aria-expanded': open,
        ...(getReferenceProps(
          customTrigger.props as React.HTMLProps<HTMLElement>,
        ) as Record<string, unknown>),
      })
    ) : (
      <DropdownTrigger
        ref={setReference}
        id={triggerId}
        label={label ?? ''}
        variant={variant}
        appearance={appearance}
        size={triggerSize}
        startIcon={startIcon}
        iconOnly={iconOnly}
        open={open}
        {...(getReferenceProps() as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );

    return (
      <DropdownContext.Provider value={{ getItemProps, activeIndex }}>
        <div ref={ref} className={classes.join(' ')} {...props}>
          {renderedTrigger}
          {open && (
            <FloatingPortal>
              {/* modal={false}: the menu is not a dialog — focus can leave via Tab.
                  guards={false}: focus-sentinel spans are not needed since modal={false}
                  does not trap focus; without this, Floating UI renders aria-hidden
                  focusable spans that axe-core flags as aria-hidden-focus violations. */}
              <FloatingFocusManager
                context={context}
                modal={false}
                guards={false}
              >
                <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                  <DropdownMenu
                    ref={setFloating}
                    dir={menuDirection}
                    style={floatingStyles}
                    aria-labelledby={triggerId}
                    {...getFloatingProps()}
                  >
                    {children}
                  </DropdownMenu>
                </FloatingList>
              </FloatingFocusManager>
            </FloatingPortal>
          )}
        </div>
      </DropdownContext.Provider>
    );
  },
);
Dropdown.displayName = 'Dropdown';
