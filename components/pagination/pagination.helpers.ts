import { useEffect, useState } from 'react';

export type PaginationVariant = 'full' | 'grouped';
export type PageLabelFormatter = (page: number) => string;

interface ResolvedPaginationInputs {
  resolvedVariant: PaginationVariant;
  resolvedPageLabelFormatter: PageLabelFormatter;
  sanitizedTotalPages: number;
  sanitizedCurrentPage: number;
}

export const MAX_VISIBLE_ELEMENTS = 9;

const allowedVariants: PaginationVariant[] = ['full', 'grouped'];
const VIEWPORT_BREAKPOINT_MEDIA_QUERIES = [
  '(min-width: 576px)',
  '(min-width: 768px)',
  '(min-width: 992px)',
] as const;
const defaultPageLabelFormatter: PageLabelFormatter = (page) => `Page ${page}`;

/**
 * Returns how many page-number slots to show based on the current viewport width.
 * Returns null when the viewport is too narrow for even a minimal 5-item row,
 * which signals an auto-collapse to grouped appearance.
 *
 * Thresholds align with MDS / Bootstrap 5 breakpoints:
 *   xxs  < 576 px → null  (grouped, no page numbers)
 *   sm  ≥ 576 px →    5
 *   md  ≥ 768 px →    7
 *   lg  ≥ 992 px →    9
 */
function getViewportMaxVisible(): number | null {
  if (typeof window === 'undefined') return MAX_VISIBLE_ELEMENTS;
  const w = window.innerWidth;
  if (w >= 992) return 9;
  if (w >= 768) return 7;
  if (w >= 576) return 5;
  return null;
}

/**
 * Calculate which page numbers to display given the current page, total pages,
 * and the maximum number of visible slots (boundaries + ellipses + center pages).
 *
 * Slot accounting for any maxVisible M:
 *   Near start / near end (1 ellipsis): 1 boundary + M-3 center + 1 ellipsis + 1 boundary
 *   Middle (2 ellipses):                1 boundary + 1 ellipsis + M-4 center + 1 ellipsis + 1 boundary
 */
export function calculateVisiblePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number,
): {
  showBoundaryPages: boolean;
  showLeftEllipsis: boolean;
  showRightEllipsis: boolean;
  pageNumbers: number[];
} {
  // All pages fit within budget — no boundary markers or ellipses needed.
  if (totalPages <= maxVisible) {
    return {
      showBoundaryPages: false,
      showLeftEllipsis: false,
      showRightEllipsis: false,
      pageNumbers: Array.from({ length: totalPages }, (_, i) => i + 1),
    };
  }

  // Center pages when a single ellipsis is visible (near start or near end).
  const middleForSingle = maxVisible - 3;
  // Center pages when both ellipses are visible (middle position).
  const middleForDouble = maxVisible - 4;
  const halfMiddle = Math.floor(middleForDouble / 2);

  // Page at which the left ellipsis first appears (near-start → middle transition).
  const nearStartThreshold = 1 + middleForSingle - halfMiddle;
  // Page at which the right ellipsis disappears (middle → near-end transition).
  const nearEndThreshold = totalPages - nearStartThreshold + 1;

  if (currentPage <= nearStartThreshold) {
    const startPage = 2;
    const endPage = 1 + middleForSingle;
    return {
      showBoundaryPages: true,
      showLeftEllipsis: false,
      showRightEllipsis: true,
      pageNumbers: Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i,
      ),
    };
  }

  if (currentPage >= nearEndThreshold) {
    const endPage = totalPages - 1;
    const startPage = endPage - middleForSingle + 1;
    return {
      showBoundaryPages: true,
      showLeftEllipsis: true,
      showRightEllipsis: false,
      pageNumbers: Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i,
      ),
    };
  }

  // Middle position — both ellipses visible.
  const startPage = currentPage - halfMiddle;
  const endPage = currentPage + middleForDouble - halfMiddle - 1;
  return {
    showBoundaryPages: true,
    showLeftEllipsis: true,
    showRightEllipsis: true,
    pageNumbers: Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    ),
  };
}

function warnInvalidProp(
  propName: string,
  value: unknown,
  fallbackDescription: string,
) {
  if (!import.meta.env.DEV) {
    return;
  }

  console.warn(
    `[MDS Pagination] Invalid ${propName} "${String(value)}". Falling back to ${fallbackDescription}.`,
  );
}

function sanitizePositiveInteger(
  value: number,
  propName: 'totalPages' | 'currentPage',
  fallbackValue: number,
): number {
  if (!Number.isFinite(value)) {
    warnInvalidProp(propName, value, String(fallbackValue));
    return fallbackValue;
  }

  const normalizedValue = Math.trunc(value);
  if (normalizedValue < 1 || normalizedValue !== value) {
    const safeValue = Math.max(1, normalizedValue);
    warnInvalidProp(propName, value, String(safeValue));
    return safeValue;
  }

  return normalizedValue;
}

function addMediaQueryChangeListener(
  mediaQueryList: MediaQueryList,
  listener: () => void,
) {
  // Safari still supports the older addListener/removeListener pair, so keep
  // this compatibility layer until the library drops that browser range.
  if (typeof mediaQueryList.addEventListener === 'function') {
    mediaQueryList.addEventListener('change', listener);
    return;
  }

  mediaQueryList.addListener(listener);
}

function removeMediaQueryChangeListener(
  mediaQueryList: MediaQueryList,
  listener: () => void,
) {
  if (typeof mediaQueryList.removeEventListener === 'function') {
    mediaQueryList.removeEventListener('change', listener);
    return;
  }

  mediaQueryList.removeListener(listener);
}

export function useViewportMaxVisible() {
  // Initialise from current viewport width so the first render already matches the viewport.
  const [viewportMaxVisible, setViewportMaxVisible] = useState<number | null>(
    getViewportMaxVisible,
  );

  useEffect(() => {
    // window is available in browser environments; absent in jsdom / SSR.
    if (typeof window === 'undefined') return;

    const handler = () => setViewportMaxVisible(getViewportMaxVisible());

    if (typeof window.matchMedia !== 'function') {
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    }

    const mediaQueryLists = VIEWPORT_BREAKPOINT_MEDIA_QUERIES.map((query) =>
      window.matchMedia(query),
    );

    mediaQueryLists.forEach((mediaQueryList) => {
      addMediaQueryChangeListener(mediaQueryList, handler);
    });

    return () => {
      mediaQueryLists.forEach((mediaQueryList) => {
        removeMediaQueryChangeListener(mediaQueryList, handler);
      });
    };
  }, []);

  return viewportMaxVisible;
}

function resolvePaginationVariant(variant: string): PaginationVariant {
  if (
    import.meta.env.DEV &&
    variant &&
    !allowedVariants.includes(variant as PaginationVariant)
  ) {
    console.warn(
      `[MDS Pagination] Invalid variant "${variant}". Falling back to "full". Allowed: ${allowedVariants.join(', ')}`,
    );
  }

  return allowedVariants.includes(variant as PaginationVariant)
    ? (variant as PaginationVariant)
    : 'full';
}

function resolvePageLabelFormatter(pageLabelFormatter?: PageLabelFormatter) {
  if (
    pageLabelFormatter !== undefined &&
    typeof pageLabelFormatter !== 'function'
  ) {
    warnInvalidProp(
      'pageLabelFormatter',
      pageLabelFormatter,
      'the default page label formatter',
    );
  }

  return typeof pageLabelFormatter === 'function'
    ? pageLabelFormatter
    : defaultPageLabelFormatter;
}

export function resolvePaginationInputs(
  variant: string,
  pageLabelFormatter: PageLabelFormatter | undefined,
  totalPages: number,
  currentPage: number,
): ResolvedPaginationInputs {
  // Resolve every JS-facing input in one place so the render path can assume
  // normalized values and stay focused on layout decisions.
  return {
    resolvedVariant: resolvePaginationVariant(variant),
    resolvedPageLabelFormatter: resolvePageLabelFormatter(pageLabelFormatter),
    sanitizedTotalPages: sanitizePositiveInteger(totalPages, 'totalPages', 1),
    sanitizedCurrentPage: sanitizePositiveInteger(
      currentPage,
      'currentPage',
      1,
    ),
  };
}
