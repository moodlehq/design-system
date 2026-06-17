import type { ComponentPropsWithoutRef } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  calculateVisiblePageNumbers,
  resolvePaginationInputs,
  useViewportMaxVisible,
  type PageLabelFormatter,
} from './pagination.helpers';

const MAX_VISIBLE_ELEMENTS = 9;

export interface PaginationProps extends ComponentPropsWithoutRef<'nav'> {
  /** Total number of pages */
  totalPages: number;

  /** Current page number (1-indexed) */
  currentPage: number;

  /** Callback fired when the page changes */
  onPageChange: (page: number) => void;

  /** Accessible name for the pagination landmark. */
  ariaLabel?: string;

  /** Accessible label used for the previous-page button. */
  previousPageLabel?: string;

  /** Accessible label used for the next-page button. */
  nextPageLabel?: string;

  /** Returns the accessible label for each numbered page button. */
  pageLabelFormatter?: PageLabelFormatter;

  /**
   * Controls which variant of pagination to render.
   * Accepts a broad string so JS consumers can be validated at runtime.
   * - `'full'` (default): Shows page numbers between previous and next controls.
   *   The visible page count reduces automatically as the viewport width narrows
   *   (9 → 7 → 5 items), and collapses to grouped appearance when the viewport
   *   is too narrow to fit any page numbers. First and last pages are always shown
   *   when needed.
   * - `'grouped'`: Shows only previous and next controls without page numbers.
   */
  variant?: string;

  /** Disables all interactive elements, preventing focus, hover, and page-change events. */
  disabled?: boolean;
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  ariaLabel = 'Pagination',
  previousPageLabel = 'Previous page',
  nextPageLabel = 'Next page',
  pageLabelFormatter,
  variant = 'full',
  disabled = false,
  className,
  ...props
}: PaginationProps) => {
  const {
    resolvedVariant,
    resolvedPageLabelFormatter,
    sanitizedTotalPages,
    sanitizedCurrentPage,
  } = resolvePaginationInputs(
    variant,
    pageLabelFormatter,
    totalPages,
    currentPage,
  );
  const viewportMaxVisible = useViewportMaxVisible();

  const [pendingCurrentPage, setPendingCurrentPage] = useState<number | null>(
    null,
  );

  // Derive effective variant and page-slot count from viewport width.
  // Explicit 'grouped' is never auto-upgraded; only 'full' adapts.
  const adaptiveResult =
    resolvedVariant === 'full' ? viewportMaxVisible : MAX_VISIBLE_ELEMENTS;
  const effectiveVariant =
    resolvedVariant === 'full' && adaptiveResult === null
      ? 'grouped'
      : resolvedVariant;
  const maxVisible = adaptiveResult ?? MAX_VISIBLE_ELEMENTS;

  // Clamp current page to valid range
  const validCurrentPage = Math.max(
    1,
    Math.min(sanitizedCurrentPage, sanitizedTotalPages),
  );

  const previousValidCurrentPageRef = useRef(validCurrentPage);

  // Keep the visual current page responsive while parent state catches up.
  // Once a controlled currentPage update arrives, return to controlled rendering.
  useEffect(() => {
    const didControlledPageChange =
      previousValidCurrentPageRef.current !== validCurrentPage;

    if (
      pendingCurrentPage !== null &&
      (pendingCurrentPage === validCurrentPage || didControlledPageChange)
    ) {
      setPendingCurrentPage(null);
    }

    previousValidCurrentPageRef.current = validCurrentPage;
  }, [validCurrentPage, pendingCurrentPage]);

  const visualCurrentPage = pendingCurrentPage ?? validCurrentPage;

  const canGoPrevious = visualCurrentPage > 1;
  const canGoNext = visualCurrentPage < sanitizedTotalPages;

  const {
    showBoundaryPages,
    pageNumbers,
    showLeftEllipsis,
    showRightEllipsis,
  } = useMemo(
    () =>
      calculateVisiblePageNumbers(
        visualCurrentPage,
        sanitizedTotalPages,
        maxVisible,
      ),
    [visualCurrentPage, sanitizedTotalPages, maxVisible],
  );

  // Only show pagination if there are 2 or more pages
  if (sanitizedTotalPages < 2) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (
      page !== visualCurrentPage &&
      page >= 1 &&
      page <= sanitizedTotalPages
    ) {
      setPendingCurrentPage(page);
      onPageChange(page);
    }
  };

  const classes = ['mds-pagination', `mds-pagination--${effectiveVariant}`];
  if (className) {
    classes.push(className);
  }

  // First, middle, and last page buttons share identical behavior; keeping the
  // markup here avoids three nearly identical JSX branches below.
  const renderPageButton = (page: number) => (
    <button
      key={page}
      type="button"
      className="mds-pagination__page"
      onClick={() => handlePageChange(page)}
      disabled={disabled}
      aria-label={resolvedPageLabelFormatter(page)}
      aria-current={page === visualCurrentPage ? 'page' : undefined}
      data-current={page === visualCurrentPage}
    >
      {page}
    </button>
  );

  return (
    <nav className={classes.join(' ')} aria-label={ariaLabel} {...props}>
      {/* Previous button */}
      <button
        type="button"
        className="mds-pagination__button mds-pagination__button--prev"
        onClick={() => handlePageChange(visualCurrentPage - 1)}
        disabled={disabled || !canGoPrevious}
        aria-label={previousPageLabel}
        tabIndex={!disabled && canGoPrevious ? 0 : -1}
      >
        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
      </button>

      {/* Page numbers are hidden in the grouped variant. */}
      {effectiveVariant === 'full' && (
        <div className="mds-pagination__pages">
          {showBoundaryPages && renderPageButton(1)}

          {/* Left ellipsis */}
          {showLeftEllipsis && (
            <span
              key="left-ellipsis"
              className="mds-pagination__ellipsis"
              aria-hidden="true"
            >
              …
            </span>
          )}

          {/* Page numbers */}
          {pageNumbers.map(renderPageButton)}

          {/* Right ellipsis */}
          {showRightEllipsis && (
            <span
              key="right-ellipsis"
              className="mds-pagination__ellipsis"
              aria-hidden="true"
            >
              …
            </span>
          )}

          {showBoundaryPages && renderPageButton(sanitizedTotalPages)}
        </div>
      )}

      {/* Next button */}
      <button
        type="button"
        className="mds-pagination__button mds-pagination__button--next"
        onClick={() => handlePageChange(visualCurrentPage + 1)}
        disabled={disabled || !canGoNext}
        aria-label={nextPageLabel}
        tabIndex={!disabled && canGoNext ? 0 : -1}
      >
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
      </button>
    </nav>
  );
};
