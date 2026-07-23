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
  useTypeahead,
} from '@floating-ui/react';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useRef,
  useState,
} from 'react';
import type { DropdownTriggerProps } from './DropdownTrigger';
import { DropdownTrigger } from './DropdownTrigger';

type IconElement = ReactElement<'i' | 'svg'>;

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
  /** Trigger label. Must be a caller-supplied translated string. */
  label: string;
  /** Trigger form — see DropdownTrigger. */
  variant?: DropdownTriggerProps['variant'];
  /** Trigger appearance — see DropdownTrigger. */
  appearance?: DropdownTriggerProps['appearance'];
  /** Trigger size — see DropdownTrigger. */
  size?: DropdownTriggerProps['size'];
  /** Optional leading trigger icon. Accepts only intrinsic `<i>` or `<svg>` elements. */
  startIcon?: IconElement;
  /** Renders an icon-only trigger; the label becomes its aria-label. */
  iconOnly?: boolean;
  /** Controlled open state; leave undefined for uncontrolled behavior. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Menu placement relative to the trigger. Defaults to 'bottom-start'.
   *  flip() will invert to the opposite side when space is insufficient. */
  placement?: Placement;
  /** When true, the menu panel grows to be at least as wide as the trigger.
   *  Useful when the trigger label is wider than the default 217px minimum. */
  sameWidth?: boolean;
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
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      placement = 'bottom-start',
      sameWidth = false,
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
        flip(),
        // Slide along the cross-axis to stay within the viewport.
        shift({ padding: 8 }),
        // Match the trigger width when sameWidth=true.
        ...(sameWidth
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

    const classes = ['mds-dropdown'];
    if (className) classes.push(className);

    return (
      <DropdownContext.Provider value={{ getItemProps, activeIndex }}>
        <div ref={ref} className={classes.join(' ')} {...props}>
          <DropdownTrigger
            ref={setReference}
            id={triggerId}
            label={label}
            variant={variant}
            appearance={appearance}
            size={triggerSize}
            startIcon={startIcon}
            iconOnly={iconOnly}
            open={open}
            {...(getReferenceProps() as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          />
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
