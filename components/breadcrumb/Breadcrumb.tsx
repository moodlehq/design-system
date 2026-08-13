import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Dropdown, DropdownItemAction } from '../dropdown';
import { Link } from '../link';
import { Tooltip } from '../tooltip';

export interface BreadcrumbItem {
  /** Visible label text. Must be a caller-supplied translated string. */
  label: string;
  /** Destination URL for this breadcrumb item. Omit or leave undefined for the current page. */
  href?: string;
}

export interface BreadcrumbProps extends ComponentPropsWithoutRef<'nav'> {
  /**
   * Ordered list of breadcrumb items from root to current page.
   * The last item is always the current page and is rendered as plain text.
   * Must have at least 2 entries.
   */
  items: BreadcrumbItem[];

  /**
   * Accessible label for the `<nav>` landmark element.
   * Must be a caller-supplied translated string — the default is English only.
   */
  ariaLabel?: string;

  /**
   * Visible-to-assistive-tech label for the overflow "…" button.
   * Only relevant when the component renders with more than 4 items.
   * Must be a caller-supplied translated string — the default is English only.
   */
  overflowAriaLabel?: string;
}

// Wraps a breadcrumb Link in a Tooltip only when its label is actually
// truncated by overflow. Uses a ResizeObserver on the inner label span so the
// tooltip appears/disappears automatically as the viewport width changes.
// The span wrapper uses display:contents so it is transparent to the parent
// flex layout — Tooltip or Link remain the direct flex items as before.
function TruncatingTooltip({
  label,
  placement,
  // Defaults to Link's inner label span; the current-page item passes its
  // own span selector since it isn't rendered by the Link component.
  labelSelector = '.mds-link__label',
  children,
}: {
  label: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
  labelSelector?: string;
  children: ReactElement | ((isTruncated: boolean) => ReactElement);
}) {
  const [isTruncated, setIsTruncated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let resizeObserver: ResizeObserver | null = null;

    const check = () => {
      const labelSpan = container.querySelector<HTMLElement>(labelSelector);
      if (labelSpan) {
        setIsTruncated(labelSpan.scrollWidth > labelSpan.offsetWidth);
      }
    };

    const connectResizeObserver = () => {
      resizeObserver?.disconnect();
      const labelSpan = container.querySelector<HTMLElement>(labelSelector);
      if (labelSpan) {
        resizeObserver = new ResizeObserver(check);
        resizeObserver.observe(labelSpan);
      }
    };

    check();
    connectResizeObserver();

    // Re-connect the ResizeObserver when the DOM inside the container changes.
    // This happens when isTruncated flips and the Link re-mounts inside or
    // outside the Tooltip wrapper.
    const mutationObserver = new MutationObserver(() => {
      check();
      connectResizeObserver();
    });
    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
    };
  }, [labelSelector]);

  const content =
    typeof children === 'function' ? children(isTruncated) : children;

  return (
    <span ref={containerRef} style={{ display: 'contents' }}>
      {isTruncated ? (
        <Tooltip label={label} placement={placement}>
          {content}
        </Tooltip>
      ) : (
        content
      )}
    </span>
  );
}

export const Breadcrumb = function Breadcrumb({
  items,
  ariaLabel = 'Breadcrumb',
  overflowAriaLabel = 'Show more items',
  className,
  ...props
}: BreadcrumbProps) {
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);

  // Pure computation used both for rendering and the dev-mode warning below.
  const showOverflow = Boolean(items && items.length > 4);
  const overflowItems = showOverflow ? items.slice(1, items.length - 3) : [];

  if (import.meta.env.DEV) {
    if (!items || items.length < 2) {
      console.warn(
        '[MDS Breadcrumb] `items` must have at least 2 entries (a root page and the current page).',
      );
    }
  }

  if (!items || items.length < 2) {
    return null;
  }

  const currentItem = items[items.length - 1];

  // When overflow is active:
  //   items[0]                           → always visible (root)
  //   items[1 … length-4]                → hidden in overflow dropdown
  //   items[length-3] and items[length-2] → visible ancestors closest to current
  //   items[length-1]                    → current page
  // (showOverflow and overflowItems are pre-computed before the hooks above.)
  const visibleMiddleItems = showOverflow
    ? items.slice(items.length - 3, items.length - 1)
    : items.slice(1, items.length - 1);

  const classes = ['mds-breadcrumb'];
  if (className) {
    classes.push(className);
  }

  const itemClasses = ['breadcrumb-item'];
  // Count the items and set a maxwidth and set flex grow?
  if (items.length === 2) {
    itemClasses.push('items-2');
  }
  if (items.length === 3) {
    itemClasses.push('items-3');
  }
  if (items.length === 4 || showOverflow) {
    itemClasses.push('items-4');
  }
  return (
    <nav aria-label={ariaLabel} className={classes.join(' ')} {...props}>
      <ol className="breadcrumb mds-breadcrumb__list">
        {/* Root item - always visible */}
        <li className={itemClasses.join(' ')}>
          <TruncatingTooltip label={items[0].label} placement="bottom">
            <Link
              href={items[0].href}
              label={items[0].label}
              className="mds-breadcrumb__link"
            />
          </TruncatingTooltip>
        </li>

        {/* Overflow trigger - only when items.length > 4 */}
        {showOverflow && (
          <li
            className={itemClasses
              .concat(['mds-breadcrumb__item--overflow'])
              .join(' ')}
          >
            <Dropdown
              open={isOverflowOpen}
              onOpenChange={setIsOverflowOpen}
              placement="bottom-start"
              allowPlacementFlip={false}
              trigger={
                <button
                  type="button"
                  className="mds-breadcrumb__overflow-trigger"
                >
                  {/* Screen-reader text precedes the visual ellipsis so the button
                    has a meaningful accessible name while the visual "…" is
                    suppressed from the a11y tree. */}
                  <span className="visually-hidden">{overflowAriaLabel}</span>
                  <span aria-hidden="true">…</span>
                </button>
              }
            >
              {overflowItems.map((item, index) => (
                <DropdownItemAction
                  key={index}
                  href={item.href}
                  label={item.label}
                  className="mds-breadcrumb__overflow-link"
                  onClick={() => setIsOverflowOpen(false)}
                />
              ))}
            </Dropdown>
          </li>
        )}

        {/* Visible ancestors between root (or overflow) and current page */}
        {visibleMiddleItems.map((item, index) => (
          <li key={index} className={itemClasses.join(' ')}>
            <TruncatingTooltip label={item.label} placement="bottom">
              <Link
                href={item.href}
                label={item.label}
                className="mds-breadcrumb__link"
              />
            </TruncatingTooltip>
          </li>
        ))}

        {/* Current page - not a link, but focusable so its tooltip is
            reachable by keyboard when the label is truncated. */}
        <li
          className={itemClasses
            .concat('mds-breadcrumb__item--current')
            .join(' ')}
          aria-current="page"
        >
          <TruncatingTooltip
            label={currentItem.label}
            placement="bottom"
            labelSelector=".mds-breadcrumb__label"
          >
            {(isTruncated) => (
              <span
                className="mds-breadcrumb__label"
                tabIndex={isTruncated ? 0 : undefined}
              >
                {currentItem.label}
              </span>
            )}
          </TruncatingTooltip>
        </li>
      </ol>
    </nav>
  );
};
