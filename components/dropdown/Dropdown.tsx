import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { DropdownMenu } from './DropdownMenu';
import type { DropdownTriggerProps } from './DropdownTrigger';
import { DropdownTrigger } from './DropdownTrigger';

type IconElement = ReactElement<'i' | 'svg'>;

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
  /** Menu content (Dropdown item components). */
  children?: ReactNode;
}

/**
 * Dropdown — composes DropdownTrigger with DropdownMenu.
 *
 * The trigger toggles the menu; while open the trigger renders its active
 * state (Figma Open=true). The menu closes on outside pointer press and
 * Escape. Item activation behavior (closing the menu after an action,
 * single-select bookkeeping, etc.) is the consumer's responsibility since
 * items are composed as children.
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  function Dropdown(
    {
      label,
      variant,
      appearance,
      size,
      startIcon,
      iconOnly,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const open = controlledOpen ?? uncontrolledOpen;
    const rootRef = useRef<HTMLDivElement | null>(null);
    const triggerId = useId();

    const setOpen = useCallback(
      (next: boolean) => {
        setUncontrolledOpen(next);
        onOpenChange?.(next);
      },
      [onOpenChange],
    );

    // Track both the forwarded ref and the local one used for outside-press
    // detection.
    const setRefs = (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      if (!open) {
        return;
      }
      const onPointerDown = (event: PointerEvent) => {
        if (
          rootRef.current &&
          !rootRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
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
    }, [open, setOpen]);

    const classes = ['mds-dropdown'];
    if (className) {
      classes.push(className);
    }

    return (
      <div ref={setRefs} className={classes.join(' ')} {...props}>
        <DropdownTrigger
          id={triggerId}
          label={label}
          variant={variant}
          appearance={appearance}
          size={size}
          startIcon={startIcon}
          iconOnly={iconOnly}
          open={open}
          onClick={() => setOpen(!open)}
        />
        {open && (
          <div className="mds-dropdown__menu-anchor">
            <DropdownMenu aria-labelledby={triggerId}>{children}</DropdownMenu>
          </div>
        )}
      </div>
    );
  },
);
Dropdown.displayName = 'Dropdown';
