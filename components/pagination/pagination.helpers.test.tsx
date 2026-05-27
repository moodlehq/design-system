import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  calculateVisiblePageNumbers,
  resolvePaginationInputs,
  useViewportMaxVisible,
} from './pagination.helpers';

function ViewportProbe() {
  const viewportMaxVisible = useViewportMaxVisible();

  return (
    <output data-testid="viewport-max-visible">
      {String(viewportMaxVisible)}
    </output>
  );
}

describe('pagination.helpers', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns all pages without ellipses when everything fits within the visible budget', () => {
    expect(calculateVisiblePageNumbers(3, 5, 9)).toEqual({
      showBoundaryPages: false,
      showLeftEllipsis: false,
      showRightEllipsis: false,
      pageNumbers: [1, 2, 3, 4, 5],
    });
  });

  it('returns the expected page windows for near-start, middle, and near-end positions', () => {
    expect(calculateVisiblePageNumbers(1, 15, 9)).toEqual({
      showBoundaryPages: true,
      showLeftEllipsis: false,
      showRightEllipsis: true,
      pageNumbers: [2, 3, 4, 5, 6, 7],
    });

    expect(calculateVisiblePageNumbers(8, 15, 9)).toEqual({
      showBoundaryPages: true,
      showLeftEllipsis: true,
      showRightEllipsis: true,
      pageNumbers: [6, 7, 8, 9, 10],
    });

    expect(calculateVisiblePageNumbers(15, 15, 9)).toEqual({
      showBoundaryPages: true,
      showLeftEllipsis: true,
      showRightEllipsis: false,
      pageNumbers: [9, 10, 11, 12, 13, 14],
    });
  });

  it('resolves valid inputs without warnings', () => {
    const formatter = vi.fn((page: number) => `Results page ${page}`);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const resolvedInputs = resolvePaginationInputs('grouped', formatter, 10, 3);

    expect(resolvedInputs.resolvedVariant).toBe('grouped');
    expect(resolvedInputs.sanitizedTotalPages).toBe(10);
    expect(resolvedInputs.sanitizedCurrentPage).toBe(3);
    expect(resolvedInputs.resolvedPageLabelFormatter(4)).toBe('Results page 4');
    expect(formatter).toHaveBeenCalledWith(4);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('falls back and warns for invalid runtime inputs', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const resolvedInputs = resolvePaginationInputs(
      'invalid',
      'bad formatter' as never,
      5.8,
      -3,
    );

    expect(resolvedInputs.resolvedVariant).toBe('full');
    expect(resolvedInputs.sanitizedTotalPages).toBe(5);
    expect(resolvedInputs.sanitizedCurrentPage).toBe(1);
    expect(resolvedInputs.resolvedPageLabelFormatter(2)).toBe('Page 2');
    expect(warnSpy).toHaveBeenCalledWith(
      '[MDS Pagination] Invalid variant "invalid". Falling back to "full". Allowed: full, grouped',
    );
    expect(warnSpy).toHaveBeenCalledWith(
      '[MDS Pagination] Invalid pageLabelFormatter "bad formatter". Falling back to the default page label formatter.',
    );
    expect(warnSpy).toHaveBeenCalledWith(
      '[MDS Pagination] Invalid totalPages "5.8". Falling back to 5.',
    );
    expect(warnSpy).toHaveBeenCalledWith(
      '[MDS Pagination] Invalid currentPage "-3". Falling back to 1.',
    );
  });

  it('tracks viewport changes via resize events when matchMedia is unavailable', () => {
    const originalMatchMedia = window.matchMedia;

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: undefined,
    });

    window.innerWidth = 500;
    render(<ViewportProbe />);
    expect(screen.getByTestId('viewport-max-visible')).toHaveTextContent(
      'null',
    );

    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByTestId('viewport-max-visible')).toHaveTextContent('7');

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: originalMatchMedia,
    });
  });

  it('tracks breakpoint changes via media query listeners and cleans them up on unmount', () => {
    const originalMatchMedia = window.matchMedia;
    const listeners: Array<() => void> = [];
    const addEventListener = vi.fn((_event: string, listener: () => void) => {
      listeners.push(listener);
    });
    const removeEventListener = vi.fn();

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: vi.fn(() => ({
        addEventListener,
        removeEventListener,
        matches: false,
        media: '',
      })),
    });

    window.innerWidth = 500;
    const { unmount } = render(<ViewportProbe />);
    expect(screen.getByTestId('viewport-max-visible')).toHaveTextContent(
      'null',
    );
    expect(addEventListener).toHaveBeenCalledTimes(3);

    act(() => {
      window.innerWidth = 1000;
      listeners.forEach((listener) => listener());
    });

    expect(screen.getByTestId('viewport-max-visible')).toHaveTextContent('9');

    unmount();
    expect(removeEventListener).toHaveBeenCalledTimes(3);

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: originalMatchMedia,
    });
  });

  it('supports the legacy media query listener API', () => {
    const originalMatchMedia = window.matchMedia;
    const listeners: Array<() => void> = [];
    const addListener = vi.fn((listener: () => void) => {
      listeners.push(listener);
    });
    const removeListener = vi.fn();

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: vi.fn(() => ({
        addListener,
        removeListener,
        matches: false,
        media: '',
      })),
    });

    window.innerWidth = 700;
    const { unmount } = render(<ViewportProbe />);
    expect(screen.getByTestId('viewport-max-visible')).toHaveTextContent('5');
    expect(addListener).toHaveBeenCalledTimes(3);

    act(() => {
      window.innerWidth = 1000;
      listeners.forEach((listener) => listener());
    });

    expect(screen.getByTestId('viewport-max-visible')).toHaveTextContent('9');

    unmount();
    expect(removeListener).toHaveBeenCalledTimes(3);

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: originalMatchMedia,
    });
  });
});
