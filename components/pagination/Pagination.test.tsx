import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { PaginationProps } from './Pagination';
import { Pagination } from './Pagination';

const defaultProps: PaginationProps = {
  totalPages: 5,
  currentPage: 1,
  onPageChange: () => {},
};

function renderPagination(overrides: Partial<PaginationProps> = {}) {
  return render(<Pagination {...defaultProps} {...overrides} />);
}

describe('Pagination: Unit Tests', () => {
  it('applies base mds class names', () => {
    const { container } = renderPagination();
    const nav = container.querySelector('nav');
    expect(nav?.classList.contains('mds-pagination')).toBe(true);
    expect(nav?.classList.contains('mds-pagination--full')).toBe(true);
  });

  it.each([
    {
      caseName: 'full variant by default',
      props: {},
      expectedClass: 'mds-pagination--full',
    },
    {
      caseName: 'full variant when variant prop is full',
      props: { variant: 'full' as const },
      expectedClass: 'mds-pagination--full',
    },
    {
      caseName: 'grouped variant when variant prop is grouped',
      props: { totalPages: 10, currentPage: 5, variant: 'grouped' as const },
      expectedClass: 'mds-pagination--grouped',
    },
    {
      caseName: 'full variant for totalPages = 2 (no auto-grouped behavior)',
      props: { totalPages: 2 },
      expectedClass: 'mds-pagination--full',
    },
  ])('applies $expectedClass for $caseName', ({ props, expectedClass }) => {
    const { container } = renderPagination(props);
    const nav = container.querySelector('nav');
    expect(nav?.classList.contains(expectedClass)).toBe(true);
  });

  it('falls back to the full variant when an invalid variant is provided', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { container } = renderPagination({ variant: 'invalid' });
    const nav = container.querySelector('nav');

    expect(nav?.classList.contains('mds-pagination--full')).toBe(true);
    expect(container.querySelector('.mds-pagination__pages')).not.toBeNull();

    warnSpy.mockRestore();
  });

  it('falls back to the default page label formatter when an invalid formatter is provided', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    renderPagination({
      currentPage: 3,
      pageLabelFormatter:
        'invalid' as unknown as PaginationProps['pageLabelFormatter'],
    });

    expect(screen.getByRole('button', { name: 'Page 3' })).toBeInTheDocument();

    warnSpy.mockRestore();
  });

  it('returns null when total pages is less than 2', () => {
    const { container } = renderPagination({ totalPages: 1 });
    expect(container.firstChild).toBeNull();
  });

  it('renders previous and next buttons', () => {
    renderPagination({ currentPage: 3 });
    const prevBtn = screen.getByRole('button', { name: /previous page/i });
    const nextBtn = screen.getByRole('button', { name: /next page/i });
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
  });

  it.each([
    {
      caseName: 'previous button on first page',
      currentPage: 1,
      buttonName: /previous page/i,
    },
    {
      caseName: 'next button on last page',
      currentPage: 5,
      buttonName: /next page/i,
    },
  ])('disables $caseName', ({ currentPage, buttonName }) => {
    renderPagination({ currentPage });
    const button = screen.getByRole('button', { name: buttonName });
    expect(button).toBeDisabled();
  });

  it('renders page numbers in full variant', () => {
    renderPagination({ currentPage: 3 });
    expect(
      screen.getByRole('button', { name: /^page 1$/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 3/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 5/i })).toBeInTheDocument();
  });

  it('marks only the current page with current-state attributes', () => {
    renderPagination({ currentPage: 3 });

    const currentPageBtn = screen.getByRole('button', { name: /page 3/i });
    const page1Btn = screen.getByRole('button', { name: /page 1/i });

    expect(currentPageBtn).toHaveAttribute('aria-current', 'page');
    expect(currentPageBtn).toHaveAttribute('data-current', 'true');
    expect(page1Btn).not.toHaveAttribute('aria-current');
  });

  it('keeps a single current page when the ellipsis layout changes across threshold navigation', () => {
    const { container, rerender } = renderPagination({
      totalPages: 15,
      currentPage: 5,
    });

    expect(screen.getByRole('button', { name: /page 5/i })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(
      container.querySelectorAll('.mds-pagination__ellipsis'),
    ).toHaveLength(1);

    rerender(
      <Pagination
        {...defaultProps}
        totalPages={15}
        currentPage={6}
        onPageChange={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: /page 6/i })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('button', { name: /page 5/i })).not.toHaveAttribute(
      'aria-current',
    );
    expect(
      container.querySelectorAll('.mds-pagination__ellipsis'),
    ).toHaveLength(2);
    expect(container.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
  });

  it('updates visible selected page immediately while waiting for a delayed controlled update', async () => {
    function DelayedParentPagination() {
      const [page, setPage] = useState(5);

      return (
        <Pagination
          totalPages={15}
          currentPage={page}
          onPageChange={(nextPage) => {
            setTimeout(() => setPage(nextPage), 60);
          }}
        />
      );
    }

    render(<DelayedParentPagination />);

    await userEvent.click(screen.getByRole('button', { name: /page 6/i }));

    expect(screen.getByRole('button', { name: /page 6/i })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('button', { name: /page 5/i })).not.toHaveAttribute(
      'aria-current',
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /page 6/i })).toHaveAttribute(
        'aria-current',
        'page',
      );
    });
  });

  it('does not render page numbers when variant is grouped', () => {
    const { container } = renderPagination({
      totalPages: 10,
      currentPage: 5,
      variant: 'grouped',
    });
    expect(container.querySelector('.mds-pagination__pages')).toBeNull();
  });

  it('renders page numbers with full variant for totalPages 2', () => {
    renderPagination({ totalPages: 2 });
    expect(
      screen.getByRole('button', { name: /^page 1$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /^page 2$/i }),
    ).toBeInTheDocument();
  });

  it.each([
    {
      caseName: 'page button is clicked',
      currentPage: 1,
      targetName: /page 3/i,
      expectedPage: 3,
    },
    {
      caseName: 'next button is clicked',
      currentPage: 2,
      targetName: /next page/i,
      expectedPage: 3,
    },
    {
      caseName: 'previous button is clicked',
      currentPage: 3,
      targetName: /previous page/i,
      expectedPage: 2,
    },
  ])(
    'calls onPageChange when $caseName',
    async ({ currentPage, targetName, expectedPage }) => {
      const handlePageChange = vi.fn();
      renderPagination({ currentPage, onPageChange: handlePageChange });

      await userEvent.click(screen.getByRole('button', { name: targetName }));
      expect(handlePageChange).toHaveBeenCalledWith(expectedPage);
    },
  );

  it.each([
    {
      caseName: 'disabled previous button on first page is clicked',
      currentPage: 1,
      targetName: /previous page/i,
    },
    {
      caseName: 'disabled next button on last page is clicked',
      currentPage: 5,
      targetName: /next page/i,
    },
  ])(
    'does not call onPageChange when $caseName',
    async ({ currentPage, targetName }) => {
      const handlePageChange = vi.fn();
      renderPagination({ currentPage, onPageChange: handlePageChange });

      await userEvent.click(screen.getByRole('button', { name: targetName }));
      expect(handlePageChange).not.toHaveBeenCalled();
    },
  );

  it('forwards extra props to nav element', () => {
    renderPagination({ 'data-testid': 'custom-pagination' });
    expect(screen.getByTestId('custom-pagination')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderPagination({ className: 'custom-class' });
    const nav = container.querySelector('nav');
    expect(nav?.classList.contains('custom-class')).toBe(true);
  });

  it('clamps current page to valid range', () => {
    renderPagination({ currentPage: 10 });
    // Should show page 5 as current (clamped from 10 to 5)
    const currentPageBtn = screen.getByRole('button', { name: /page 5/i });
    expect(currentPageBtn).toHaveAttribute('aria-current', 'page');
  });

  it('has aria-label on nav element', () => {
    const { container } = renderPagination();
    const nav = container.querySelector('nav');
    expect(nav).toHaveAttribute('aria-label', 'Pagination');
  });

  it('uses custom accessible labels when provided', () => {
    const { container } = renderPagination({
      currentPage: 3,
      ariaLabel: 'Course pagination',
      previousPageLabel: 'Go to previous results page',
      nextPageLabel: 'Go to next results page',
      pageLabelFormatter: (page) => `Results page ${page}`,
    });

    const nav = container.querySelector('nav');
    expect(nav).toHaveAttribute('aria-label', 'Course pagination');
    expect(
      screen.getByRole('button', { name: 'Go to previous results page' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to next results page' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Results page 3' }),
    ).toBeInTheDocument();
  });

  it.each([
    {
      caseName: 'previous button when it can be used',
      currentPage: 3,
      buttonName: /previous page/i,
      expectedTabIndex: '0',
    },
    {
      caseName: 'next button when it can be used',
      currentPage: 3,
      buttonName: /next page/i,
      expectedTabIndex: '0',
    },
    {
      caseName: 'previous button when it is disabled by page boundary',
      currentPage: 1,
      buttonName: /previous page/i,
      expectedTabIndex: '-1',
    },
  ])(
    'sets correct tabindex for $caseName',
    ({ currentPage, buttonName, expectedTabIndex }) => {
      renderPagination({ currentPage });
      const button = screen.getByRole('button', { name: buttonName });
      expect(button).toHaveAttribute('tabindex', expectedTabIndex);
    },
  );

  it('disables all buttons and removes prev/next tab focus when the disabled prop is set', () => {
    renderPagination({ currentPage: 3, disabled: true });

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach((button) => expect(button).toBeDisabled());

    expect(
      screen.getByRole('button', { name: /previous page/i }),
    ).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('button', { name: /next page/i })).toHaveAttribute(
      'tabindex',
      '-1',
    );
  });

  it.each([
    { caseName: 'page button', targetName: /page 1/i },
    { caseName: 'next button', targetName: /next page/i },
  ])(
    'does not call onPageChange when $caseName is clicked while disabled',
    async ({ targetName }) => {
      const handlePageChange = vi.fn();
      renderPagination({
        currentPage: 3,
        disabled: true,
        onPageChange: handlePageChange,
      });

      await userEvent.click(screen.getByRole('button', { name: targetName }));
      expect(handlePageChange).not.toHaveBeenCalled();
    },
  );

  it('does not submit a surrounding form when a pagination button is clicked', async () => {
    const handleSubmit = vi.fn((e: SubmitEvent) => e.preventDefault());
    render(
      <form onSubmit={handleSubmit}>
        <Pagination {...defaultProps} currentPage={2} />
      </form>,
    );

    const pageButton = screen.getByRole('button', { name: /page 1/i });
    await userEvent.click(pageButton);

    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
