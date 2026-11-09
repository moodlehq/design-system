import type {
  HTMLAttributes,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  PointerEvent as ReactPointerEvent,
} from 'react';
import {
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
} from 'react';
import { Badge } from '../badge';
import { Button } from '../button';
import { Dropdown, DropdownItemAction } from '../dropdown';
import { Tooltip } from '../tooltip';

export type BoardTileInteraction = 'move' | 'resize';

export interface BoardTileLabels {
  /** Accessible name of the move handle. Caller-supplied, for example a translated "Move {name}". */
  move: string;
  /** Accessible name of the resize handle. Caller-supplied, for example a translated "Resize {name}". */
  resize: string;
  /** Visually hidden instructions announced with the move handle. */
  moveInstructions: string;
  /** Visually hidden instructions announced with the resize handle. */
  resizeInstructions: string;
  /** Accessible name of the upward direction button. */
  up: string;
  /** Accessible name of the downward direction button. */
  down: string;
  /** Accessible name of the left direction button. Screen left, including in RTL. */
  left: string;
  /** Accessible name of the right direction button. Screen right, including in RTL. */
  right: string;
  /** Accessible name of the group of move direction buttons. */
  moveControls: string;
  /** Accessible name of the group of resize direction buttons. */
  resizeControls: string;
  /** Visible label of the hidden-from-students badge. */
  hidden: string;
  /** Accessible name of the remove button. */
  remove: string;
  /** Accessible name of the block actions menu. */
  actions: string;
}

export interface BoardTileAction {
  /** Stable identity for the action. */
  id: string;
  /** Visible action label. Caller-supplied translated string. */
  label: string;
  /** When set, the action renders as a link. */
  href?: string;
  /** Called when the action is chosen. */
  onClick?: () => void;
  /** Visual tone inside the menu. Defaults to `default`. */
  variant?: 'default' | 'danger';
  /** Optional leading icon. Must be an `<i>` or `<svg>` element. */
  icon?: ReactElement<'i' | 'svg'>;
}

export interface BoardTileProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'content' | 'title'
> {
  /**
   * Not rendered. Block markup belongs in `content`.
   * Typed as `never` so TypeScript rejects it; a runtime value still warns.
   */
  children?: never;
  /** Visible block title. Caller-supplied translated string. Rendered as a heading. */
  title: string;
  /**
   * Block content. The tile does not restyle this slot.
   * Pass the block's own markup here. `children` are not rendered.
   */
  content?: ReactNode;
  /**
   * Accessible name for the tile when it should differ from `title`.
   * When omitted, the tile is named by its heading.
   */
  label?: string;
  /**
   * Strings for every control the tile can show. Required even for view mode,
   * so turning editing or hidden on never falls back to English.
   */
  labels: BoardTileLabels;
  /** Shows the move handle, resize handle, remove button, and actions menu. */
  editing?: boolean;
  /** Hidden from students: dashed border, badge, and dimmed content. */
  hidden?: boolean;
  /**
   * Which handle is picked up. Controlled by the dashboard: set it from
   * `onActivate`, and clear it from `onCommit` or `onCancel`. Arrow buttons
   * are shown for this handle. A drag reports `onHandlePointerDown` and does
   * not pick the handle up, so it does not show arrows.
   */
  active?: BoardTileInteraction | null;
  /**
   * Shows the four direction buttons while `active` is set.
   * The dashboard hides these during a pointer drag. Defaults to true.
   */
  showDirectionControls?: boolean;
  /** Block actions, excluding remove. Rendered in a Dropdown. Omit or pass `[]` to hide the menu. */
  actions?: BoardTileAction[];
  /** Shows the remove button and is called when it is pressed. */
  onRemove?: () => void;
  /**
   * A handle was picked up without a drag: Enter, Space, an assistive click,
   * or a pointer press released before it moved 4px. The dashboard sets
   * `active` so the direction arrows appear.
   */
  onActivate?: (mode: BoardTileInteraction) => void;
  /** The picked-up tile was dropped (Enter, Space, second press, or focus leaving the handle). */
  onCommit?: (mode: BoardTileInteraction) => void;
  /** Escape cancelled the pickup. The dashboard restores the previous place. */
  onCancel?: (mode: BoardTileInteraction) => void;
  /**
   * Arrow key or direction button.
   * `horizontal` is -1 for screen left and 1 for screen right.
   * `vertical` is -1 for up and 1 for down.
   * The dashboard interprets these against the grid, including RTL columns.
   */
  onDirection?: (
    mode: BoardTileInteraction,
    horizontal: number,
    vertical: number,
  ) => void;
  /**
   * A handle press moved at least 4px, so it is a drag rather than a click.
   * The event is the original press. Arrows are not shown for this gesture;
   * a click that does not cross the threshold calls `onActivate` instead.
   * Touch press-and-hold, when required, stays in the dashboard.
   * A header drag also calls this with mode `move`, after `onHeaderDragStart`.
   * Wire that listener or `onHeaderDragStart`, not both.
   */
  onHandlePointerDown?: (
    mode: BoardTileInteraction,
    event: PointerEvent,
  ) => void;
  /**
   * A press on the header background or title moved at least 4px while editing.
   * Presses on buttons, links, and other controls in the header are ignored.
   * The event is the pointer move that crossed the threshold. The dashboard
   * owns the drag coordinates and the grid.
   */
  onHeaderDragStart?: (event: PointerEvent) => void;
  /** Pointer drag is in progress. Holds the grabbing cursor and skips transitions. */
  pointerDragging?: boolean;
  /**
   * The dashboard is sliding a released tile into place. Keeps the active
   * border and shadow without showing direction buttons. The slide itself
   * stays in the dashboard.
   */
  landing?: boolean;
  /** Plays the drop outline once. Ignored when reduced motion is requested. */
  dropped?: boolean;
  /** Called when the drop outline finishes, or immediately when motion is reduced. */
  onDropEnd?: () => void;
  /**
   * Caller-supplied text announced through a polite live region while a tile
   * is moved or resized. The wording is not decided in the design system.
   */
  statusMessage?: string;
}

const allowedInteractions: BoardTileInteraction[] = ['move', 'resize'];
const allowedActionVariants: Array<NonNullable<BoardTileAction['variant']>> = [
  'default',
  'danger',
];

const DIRECTIONS = [
  { key: 'up', labelKey: 'up', icon: 'fa-arrow-up', x: 0, y: -1 },
  { key: 'down', labelKey: 'down', icon: 'fa-arrow-down', x: 0, y: 1 },
  { key: 'left', labelKey: 'left', icon: 'fa-arrow-left', x: -1, y: 0 },
  { key: 'right', labelKey: 'right', icon: 'fa-arrow-right', x: 1, y: 0 },
] as const;

// Presses on these, inside the header, belong to the control rather than a drag.
const HEADER_CONTROLS =
  'button, a, input, select, textarea, label, [role="button"]';
// A header press has to travel this far before it becomes a move. Figma does
// not bind the threshold to a token; it matches the dashboard's click-vs-drag gap.
const HEADER_DRAG_THRESHOLD = 4;

const isIconElement = (el: unknown): el is ReactElement<'i' | 'svg'> =>
  isValidElement(el) && (el.type === 'i' || el.type === 'svg');

const prefersReducedMotion = (): boolean => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const arrowDelta = (key: string): { x: number; y: number } | null => {
  switch (key) {
    case 'ArrowLeft':
      return { x: -1, y: 0 };
    case 'ArrowRight':
      return { x: 1, y: 0 };
    case 'ArrowUp':
      return { x: 0, y: -1 };
    case 'ArrowDown':
      return { x: 0, y: 1 };
    default:
      return null;
  }
};

/**
 * A rounded rectangle traced clockwise from the middle of the top-left corner,
 * with pathLength 1 so the drop animation can move a dash as a fraction of the
 * outline. SVG coordinates stay physical in RTL.
 */
const outlinePath = (width: number, height: number, radius: number): string => {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  const inset = r * (1 - Math.SQRT1_2);
  const arc = (x: number, y: number) => `A ${r} ${r} 0 0 1 ${x} ${y}`;
  return [
    `M ${inset} ${inset} ${arc(r, 0)}`,
    `H ${width - r} ${arc(width, r)}`,
    `V ${height - r} ${arc(width - r, height)}`,
    `H ${r} ${arc(0, height - r)}`,
    `V ${r} ${arc(inset, inset)}`,
  ].join(' ');
};

const ResizeGrip = () => (
  <svg
    className="mds-board-tile-resize-grip"
    viewBox="0 0 12 12"
    aria-hidden="true"
    focusable="false"
  >
    {/* Geometry is the Figma custom grip (two diagonal strokes), not a token. */}
    <path
      d="M10.8 1.2L1.2 10.8M10.8 6L6 10.8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface HandleProps {
  mode: BoardTileInteraction;
  label: string;
  instructionsId: string;
  controlsLabel: string;
  labels?: BoardTileLabels;
  pressed: boolean;
  showDirectionControls: boolean;
  onActivate?: BoardTileProps['onActivate'];
  onCommit?: BoardTileProps['onCommit'];
  onCancel?: BoardTileProps['onCancel'];
  onDirection?: BoardTileProps['onDirection'];
  onHandlePointerDown?: BoardTileProps['onHandlePointerDown'];
}

const Handle = ({
  mode,
  label,
  instructionsId,
  controlsLabel,
  labels,
  pressed,
  showDirectionControls,
  onActivate,
  onCommit,
  onCancel,
  onDirection,
  onHandlePointerDown,
}: HandleProps) => {
  const gestureStop = useRef<(() => void) | null>(null);
  useEffect(() => () => gestureStop.current?.(), []);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      target.classList.contains('mds-board-tile-handle-control')
    ) {
      // Keyboard use clears a pointer-press mark so the focus ring returns.
      delete target.dataset.pointerFocus;
    }

    const fromHandle =
      target instanceof HTMLElement &&
      target.classList.contains('mds-board-tile-handle-control');
    const delta = arrowDelta(event.key);

    if ((event.key === 'Enter' || event.key === ' ') && fromHandle) {
      event.preventDefault();
      if (pressed) onCommit?.(mode);
      else onActivate?.(mode);
      return;
    }

    if (!pressed) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onCancel?.(mode);
      return;
    }

    if (delta) {
      event.preventDefault();
      onDirection?.(mode, delta.x, delta.y);
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    if (pressed) {
      event.preventDefault();
      onCommit?.(mode);
      return;
    }
    // A pointer press focuses the handle so blur can drop it, without the
    // keyboard focus ring. Some browsers still match :focus-visible after a
    // scripted focus, so the press is marked and the ring is suppressed in CSS.
    event.currentTarget.dataset.pointerFocus = 'true';
    event.currentTarget.focus({ focusVisible: false });

    const startX = event.clientX;
    const startY = event.clientY;
    const startEvent = event.nativeEvent;
    let dragged = false;
    const stop = () => {
      gestureStop.current = null;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', cancel);
    };
    const move = (moveEvent: PointerEvent) => {
      if (
        Math.abs(moveEvent.clientX - startX) < HEADER_DRAG_THRESHOLD &&
        Math.abs(moveEvent.clientY - startY) < HEADER_DRAG_THRESHOLD
      ) {
        return;
      }
      if (dragged) return;
      dragged = true;
      // A drag keeps the press coordinates. Arrows stay hidden because this
      // is not a click pickup.
      onHandlePointerDown?.(mode, startEvent);
    };
    const up = () => {
      stop();
      if (!dragged) onActivate?.(mode);
    };
    const cancel = () => stop();
    gestureStop.current?.();
    gestureStop.current = stop;
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', cancel);
  };

  return (
    <div
      className={`mds-board-tile-handle mds-board-tile-handle--${mode}${pressed ? ' mds-board-tile-handle--pressed' : ''}`}
      onKeyDown={(event) => {
        // The handle's own keydown runs on the button, inside the tooltip,
        // so Escape is handled before the tooltip dismisses it.
        const target = event.target;
        if (
          target instanceof HTMLElement &&
          target.classList.contains('mds-board-tile-handle-control')
        ) {
          return;
        }
        onKeyDown(event);
      }}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (
          pressed &&
          (!(next instanceof Node) || !event.currentTarget.contains(next))
        ) {
          onCommit?.(mode);
        }
      }}
    >
      <Tooltip label={label}>
        <button
          type="button"
          className="mds-board-tile-handle-control"
          aria-label={label}
          aria-describedby={instructionsId}
          aria-pressed={pressed}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onBlur={(event) => {
            // The pointer-press mark lasts only for that focus, so a later
            // keyboard visit still shows the focus ring.
            delete event.currentTarget.dataset.pointerFocus;
          }}
          onClick={(event) => {
            // A real pointer click is decided on pointerup, so a drag is not
            // also a pickup. A zero-detail click is assistive technology,
            // which does not produce a pointer gesture.
            if (event.detail !== 0 || pressed) return;
            onActivate?.(mode);
          }}
        >
          {mode === 'move' ? (
            <i className="fa-solid fa-grip-vertical" aria-hidden="true" />
          ) : (
            <ResizeGrip />
          )}
        </button>
      </Tooltip>
      {pressed && showDirectionControls && (
        <div
          className="mds-board-tile-directions"
          role="group"
          aria-label={controlsLabel}
        >
          {DIRECTIONS.map((direction) => (
            <Button
              key={direction.key}
              type="button"
              variant="secondary"
              size="lg"
              className={`mds-board-tile-direction mds-board-tile-direction--${direction.key}`}
              aria-label={labels?.[direction.labelKey] ?? ''}
              tabIndex={-1}
              onPointerDown={(event) => {
                // Keep focus on the handle. A direction button taking focus
                // would look like the handle had been left.
                event.preventDefault();
                event.stopPropagation();
              }}
              startIcon={
                <i
                  className={`fa-solid ${direction.icon}`}
                  aria-hidden="true"
                />
              }
              onClick={() => onDirection?.(mode, direction.x, direction.y)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DropOutline = ({ onEnd }: { onEnd?: () => void }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const onEndRef = useRef(onEnd);
  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const tile = svg?.parentElement;
    if (!svg || !tile) return undefined;
    // One measurement when the outline mounts, so the stroke sits on the
    // tile's border. A transform (the dashboard's slide) is removed first,
    // and the box is snapped to device pixels. Not a resize loop.
    const style = getComputedStyle(tile);
    const transform = style.transform;
    const shift =
      transform &&
      transform !== 'none' &&
      typeof DOMMatrixReadOnly !== 'undefined'
        ? new DOMMatrixReadOnly(transform)
        : null;
    const box = tile.getBoundingClientRect();
    const left = box.left - (shift?.e ?? 0);
    const top = box.top - (shift?.f ?? 0);
    const ratio = window.devicePixelRatio || 1;
    const snap = (value: number) => Math.round(value * ratio) / ratio;
    const width = snap(left + box.width) - snap(left);
    const height = snap(top + box.height) - snap(top);
    const border = Number.parseFloat(style.borderTopWidth) || 0;
    const innerWidth = Math.max(0, width - border * 2);
    const innerHeight = Math.max(0, height - border * 2);
    svg.style.width = `${innerWidth}px`;
    svg.style.height = `${innerHeight}px`;
    svg.style.transform = `translate(${snap(left) - left}px, ${snap(top) - top}px)`;
    const radius = (Number.parseFloat(style.borderTopLeftRadius) || 0) - border;
    const path = outlinePath(innerWidth, innerHeight, radius);
    svg
      .querySelectorAll('path')
      .forEach((node) => node.setAttribute('d', path));

    // The slower piece ends the outline. A native listener is used because
    // the animation name has to be read in tests, where React does not
    // deliver animation events.
    const handleEnd = (event: Event) => {
      const name =
        'animationName' in event
          ? (event as { animationName?: string }).animationName
          : undefined;
      if (name === 'mds-board-tile-drop-spin-2') onEndRef.current?.();
    };
    svg.addEventListener('animationend', handleEnd);
    return () => svg.removeEventListener('animationend', handleEnd);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="mds-board-tile-drop-outline"
      aria-hidden="true"
      focusable="false"
    >
      <path className="mds-board-tile-drop-outline-path" pathLength={1} />
      <path className="mds-board-tile-drop-outline-path" pathLength={1} />
    </svg>
  );
};

/**
 * Board tile is the frame for one block on the Flexible dashboard.
 * The dashboard keeps grid placement, drag coordinates, and persistence.
 */
export const BoardTile = forwardRef<HTMLElement, BoardTileProps>(
  function BoardTile(
    {
      title,
      content,
      label,
      labels,
      editing = false,
      hidden = false,
      active,
      showDirectionControls = true,
      actions,
      onRemove,
      onActivate,
      onCommit,
      onCancel,
      onDirection,
      onHandlePointerDown,
      onHeaderDragStart,
      pointerDragging = false,
      landing = false,
      dropped = false,
      onDropEnd,
      statusMessage,
      className,
      id: idProp,
      children,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const titleId = `${id}-title`;
    const moveInstructionsId = `${id}-move-instructions`;
    const resizeInstructionsId = `${id}-resize-instructions`;
    const onDropEndRef = useRef(onDropEnd);
    useEffect(() => {
      onDropEndRef.current = onDropEnd;
    }, [onDropEnd]);

    const resolvedActive =
      active && allowedInteractions.includes(active as BoardTileInteraction)
        ? active
        : null;
    const reduceMotion = dropped && prefersReducedMotion();

    useEffect(() => {
      if (reduceMotion) onDropEndRef.current?.();
    }, [reduceMotion]);

    if (import.meta.env.DEV) {
      if (
        active &&
        !allowedInteractions.includes(active as BoardTileInteraction)
      ) {
        console.warn(
          `[MDS BoardTile] Invalid active "${String(active)}". Falling back to idle. Allowed: ${allowedInteractions.join(', ')}`,
        );
      }
      if (children != null) {
        console.warn(
          '[MDS BoardTile] `children` are not rendered. Pass block content through the `content` prop.',
        );
      }
      if (!title?.trim()) {
        console.warn(
          '[MDS BoardTile] `title` is required so the tile has a visible name.',
        );
      }
      const requiredWhenEditing: Array<keyof BoardTileLabels> = [
        'move',
        'resize',
        'moveInstructions',
        'resizeInstructions',
        'up',
        'down',
        'left',
        'right',
        'moveControls',
        'resizeControls',
      ];
      if (editing) {
        requiredWhenEditing.forEach((key) => {
          if (!labels?.[key]?.trim()) {
            console.warn(
              `[MDS BoardTile] labels.${key} is required when editing is true.`,
            );
          }
        });
      }
      if (hidden && !labels?.hidden?.trim()) {
        console.warn(
          '[MDS BoardTile] labels.hidden is required when hidden is true.',
        );
      }
      if (onRemove && !labels?.remove?.trim()) {
        console.warn(
          '[MDS BoardTile] labels.remove is required when onRemove is set.',
        );
      }
      if (actions?.length && !labels?.actions?.trim()) {
        console.warn(
          '[MDS BoardTile] labels.actions is required when actions are passed.',
        );
      }
    }

    const classes = ['mds-board-tile'];
    if (editing) classes.push('mds-board-tile--editing');
    if (hidden) classes.push('mds-board-tile--hidden');
    if (resolvedActive) {
      classes.push(
        'mds-board-tile--active',
        `mds-board-tile--${resolvedActive}`,
      );
    }
    if (landing) classes.push('mds-board-tile--landing');
    if (pointerDragging) classes.push('mds-board-tile--dragging');
    if (className) classes.push(className);

    const accessibleName = label?.trim() ? label : undefined;
    const menuActions = actions ?? [];

    const headerDragStop = useRef<(() => void) | null>(null);
    useEffect(() => () => headerDragStop.current?.(), []);

    const onHeaderPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
      if (!editing || event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element) || target.closest(HEADER_CONTROLS)) {
        return;
      }
      event.preventDefault();
      const startX = event.clientX;
      const startY = event.clientY;
      const startEvent = event.nativeEvent;
      const stop = () => {
        headerDragStop.current = null;
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', stop);
        window.removeEventListener('pointercancel', stop);
      };
      const move = (moveEvent: PointerEvent) => {
        if (
          Math.abs(moveEvent.clientX - startX) < HEADER_DRAG_THRESHOLD &&
          Math.abs(moveEvent.clientY - startY) < HEADER_DRAG_THRESHOLD
        ) {
          return;
        }
        stop();
        onHeaderDragStart?.(startEvent);
        onHandlePointerDown?.('move', startEvent);
      };
      headerDragStop.current = stop;
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', stop);
      window.addEventListener('pointercancel', stop);
    };

    return (
      <section
        ref={ref}
        id={id}
        className={classes.join(' ')}
        aria-label={accessibleName}
        aria-labelledby={accessibleName ? undefined : titleId}
        {...props}
      >
        {editing && (
          <>
            <span id={moveInstructionsId} className="visually-hidden">
              {labels?.moveInstructions}
            </span>
            <span id={resizeInstructionsId} className="visually-hidden">
              {labels?.resizeInstructions}
            </span>
          </>
        )}
        <header
          className="mds-board-tile-header"
          onPointerDown={onHeaderPointerDown}
        >
          {editing && (
            <Handle
              mode="move"
              label={labels?.move ?? ''}
              instructionsId={moveInstructionsId}
              controlsLabel={labels?.moveControls ?? ''}
              labels={labels}
              pressed={resolvedActive === 'move'}
              showDirectionControls={showDirectionControls}
              onActivate={onActivate}
              onCommit={onCommit}
              onCancel={onCancel}
              onDirection={onDirection}
              onHandlePointerDown={onHandlePointerDown}
            />
          )}
          <h2 id={titleId} className="mds-board-tile-title">
            {title}
          </h2>
          {hidden && (
            <Badge
              className="mds-board-tile-badge"
              label={labels?.hidden ?? ''}
              variant="secondary"
              subtle
              pill
              startIcon={
                <i className="fa-solid fa-eye-slash" aria-hidden="true" />
              }
            />
          )}
          {editing && (onRemove || menuActions.length > 0) && (
            <div className="mds-board-tile-actions">
              {onRemove && (
                <Button
                  variant="secondary"
                  size="lg"
                  className="mds-board-tile-remove"
                  aria-label={labels?.remove ?? ''}
                  startIcon={
                    <i className="fa-solid fa-minus" aria-hidden="true" />
                  }
                  onClick={onRemove}
                />
              )}
              {menuActions.length > 0 && (
                <Dropdown
                  className="mds-board-tile-menu"
                  label={labels?.actions ?? ''}
                  iconOnly
                  appearance="subtle"
                  placement="bottom-end"
                  startIcon={
                    <i
                      className="fa-solid fa-ellipsis-vertical"
                      aria-hidden="true"
                    />
                  }
                >
                  {menuActions.map((action) => {
                    const variant = allowedActionVariants.includes(
                      action.variant as 'default' | 'danger',
                    )
                      ? action.variant
                      : 'default';
                    const icon = isIconElement(action.icon)
                      ? action.icon
                      : undefined;
                    if (import.meta.env.DEV && action.icon != null && !icon) {
                      console.warn(
                        '[MDS BoardTile] action.icon must be an <i> or <svg> element.',
                      );
                    }
                    const item = {
                      label: action.label,
                      variant,
                      startIcon: icon,
                      onClick: action.onClick,
                    };
                    return action.href ? (
                      <DropdownItemAction
                        key={action.id}
                        href={action.href}
                        {...item}
                      />
                    ) : (
                      <DropdownItemAction key={action.id} {...item} />
                    );
                  })}
                </Dropdown>
              )}
            </div>
          )}
        </header>
        <div className="mds-board-tile-content">{content}</div>
        {dropped && !reduceMotion && (
          <DropOutline onEnd={() => onDropEndRef.current?.()} />
        )}
        {editing && (
          <div className="mds-board-tile-resize">
            <Handle
              mode="resize"
              label={labels?.resize ?? ''}
              instructionsId={resizeInstructionsId}
              controlsLabel={labels?.resizeControls ?? ''}
              labels={labels}
              pressed={resolvedActive === 'resize'}
              showDirectionControls={showDirectionControls}
              onActivate={onActivate}
              onCommit={onCommit}
              onCancel={onCancel}
              onDirection={onDirection}
              onHandlePointerDown={onHandlePointerDown}
            />
          </div>
        )}
        <span className="visually-hidden" role="status">
          {statusMessage}
        </span>
      </section>
    );
  },
);
BoardTile.displayName = 'BoardTile';
