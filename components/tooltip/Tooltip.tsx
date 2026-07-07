import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  limitShift,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import type { HTMLAttributes, ReactElement, Ref } from 'react';
import { cloneElement, isValidElement, useEffect, useState } from 'react';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
type TooltipVariant = 'dark' | 'light';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /** Tooltip text displayed in the popup. Must be a caller-supplied translated string. */
  label: string;
  /** Preferred physical side of the trigger the tooltip appears on. Defaults to `top`. Auto-flips to avoid viewport edges. In RTL, `left` and `right` still mean viewport-left and viewport-right. */
  placement?: TooltipPlacement;
  /** Colour mode. `dark` uses a dark background with light text; `light` uses a light background with dark text. Defaults to `dark`. */
  variant?: TooltipVariant;
  /** The trigger element. Must be a single React element that forwards refs. */
  children: ReactElement;
}

const allowedPlacements: TooltipPlacement[] = [
  'top',
  'bottom',
  'left',
  'right',
];
const allowedVariants: TooltipVariant[] = ['dark', 'light'];

const hasTextChildren = (value: unknown): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (typeof value === 'number') {
    return true;
  }

  if (Array.isArray(value)) {
    return value.some(hasTextChildren);
  }

  return false;
};

const ARROW_HEIGHT = 6;
const ARROW_WIDTH = 12;
const ARROW_GAP = 8;

export const Tooltip = ({
  label,
  placement = 'top',
  variant = 'dark',
  children,
  className,
  ...props
}: TooltipProps) => {
  // Internal story/test hook: read via cast so it stays out of the public TooltipProps.
  const dataForcedOpen = (props as Record<string, unknown>)[
    'data-forced-open'
  ] as string | undefined;
  const [isOpen, setIsOpen] = useState(false);
  const isForcedOpen = dataForcedOpen !== undefined;
  const isTooltipOpen = isForcedOpen || isOpen;
  // useState (not useRef) is intentional: updating the state triggers a re-render
  // so Floating UI re-measures the arrow element after it mounts.
  const [arrowEl, setArrowEl] = useState<SVGSVGElement | null>(null);

  // Runtime fallback — warn in dev and use defaults for invalid values.
  // useEffect keeps warnings from repeating on internal open/close state renders.
  useEffect(() => {
    if (
      import.meta.env.DEV &&
      !allowedPlacements.includes(placement as TooltipPlacement)
    ) {
      console.warn(
        `[MDS Tooltip] Invalid placement "${placement}". Falling back to "top". Allowed: ${allowedPlacements.join(', ')}`,
      );
    }

    if (
      import.meta.env.DEV &&
      !allowedVariants.includes(variant as TooltipVariant)
    ) {
      console.warn(
        `[MDS Tooltip] Invalid variant "${variant}". Falling back to "dark". Allowed: ${allowedVariants.join(', ')}`,
      );
    }
  }, [placement, variant]);

  const resolvedPlacement = allowedPlacements.includes(
    placement as TooltipPlacement,
  )
    ? placement
    : 'top';
  const resolvedVariant = allowedVariants.includes(variant as TooltipVariant)
    ? variant
    : 'dark';

  const { refs, floatingStyles, context, isPositioned, update } = useFloating({
    open: isTooltipOpen,
    onOpenChange: (nextOpen) => {
      if (!isForcedOpen) {
        setIsOpen(nextOpen);
      }
    },
    placement: resolvedPlacement,
    middleware: [
      offset(ARROW_HEIGHT + ARROW_GAP),
      flip(),
      shift({ padding: 8, limiter: limitShift() }),
      arrow({ element: arrowEl, padding: 4 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { setReference, setFloating } = refs;

  // Force an immediate position recalculation when the tooltip opens.
  // autoUpdate handles continuous updates while mounted, but does not
  // guarantee a fresh measurement on the exact frame the tooltip becomes visible.
  useEffect(() => {
    if (isTooltipOpen) {
      update();
    }
  }, [isTooltipOpen, update]);

  const hover = useHover(context, {
    move: false,
    delay: { open: 200, close: 0 },
  });
  const focus = useFocus(context);
  // useClick enables tap-to-toggle on touch devices where hover never fires.
  // ignoreMouse prevents double-firing on pointer devices that also emit click.
  const click = useClick(context, { ignoreMouse: true });
  const dismiss = useDismiss(context, { outsidePress: true });
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    click,
    dismiss,
    role,
  ]);

  const wrapperClassName = [
    'mds-tooltip',
    `mds-tooltip--${resolvedVariant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const triggerElement = isValidElement(children)
    ? (children as ReactElement<{
        'aria-describedby'?: string;
        'aria-label'?: string;
        'aria-labelledby'?: string;
        label?: string;
        ref?: Ref<HTMLElement>;
        [key: string]: unknown;
      }>)
    : null;
  const childRef = triggerElement?.props.ref;
  const mergedTriggerRef = useMergeRefs([setReference, childRef]);

  if (!triggerElement) {
    if (import.meta.env.DEV) {
      console.error(
        '[MDS Tooltip] children must be a single React element that forwards refs.',
      );
    }

    return <div className={wrapperClassName} {...props} />;
  }

  const existingDescribedBy = triggerElement.props['aria-describedby'] ?? '';
  const describedByIds = new Set([
    ...existingDescribedBy.split(/\s+/).filter(Boolean),
    context.floatingId,
  ]);
  const existingAriaLabel = triggerElement.props['aria-label'];
  const hasLikelyAccessibleName =
    Boolean(existingAriaLabel) ||
    Boolean(triggerElement.props['aria-labelledby']) ||
    Boolean(triggerElement.props.label?.trim()) ||
    hasTextChildren(triggerElement.props.children);
  const resolvedAriaStrategy = hasLikelyAccessibleName
    ? 'description'
    : 'label';

  const trigger = cloneElement(triggerElement, {
    ...getReferenceProps(triggerElement.props),
    ...(resolvedAriaStrategy === 'description'
      ? {
          'aria-describedby': Array.from(describedByIds).join(' '),
        }
      : {
          // In label mode, the tooltip text becomes the trigger's accessible name.
          // Preserve a caller-supplied aria-label when present.
          'aria-label': existingAriaLabel ?? label,
        }),
    ref: mergedTriggerRef,
  });

  return (
    <div
      // mds-tooltip--{variant} on the wrapper is intentionally kept for
      // consumer-side targeting (e.g. styling the trigger area per variant).
      // Variant-specific bubble styles live on mds-tooltip__bubble--{variant}.
      className={wrapperClassName}
      {...props}
    >
      {trigger}
      <FloatingPortal>
        <div
          ref={setFloating}
          style={floatingStyles}
          className={[
            'mds-tooltip__bubble',
            `mds-tooltip__bubble--${resolvedVariant}`,
          ].join(' ')}
          id={context.floatingId}
          // data-open has no CSS effect — it is used only in tests to assert open state.
          data-open={isTooltipOpen ? '' : undefined}
          data-positioned={isTooltipOpen && isPositioned ? '' : undefined}
          data-forced-open={dataForcedOpen}
          {...getFloatingProps()}
        >
          <div className="mds-tooltip__content">
            <span className="mds-tooltip__text">{label}</span>
          </div>
          <FloatingArrow
            ref={setArrowEl}
            context={context}
            width={ARROW_WIDTH}
            height={ARROW_HEIGHT}
            className="mds-tooltip__arrow"
          />
        </div>
      </FloatingPortal>
    </div>
  );
};
