import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ActivityIconSize, ActivityIconVariant } from './ActivityIcon';
import { ActivityIcon } from './ActivityIcon';

describe('ActivityIcon: Unit Test', () => {
  it('applies mds class name', () => {
    render(<ActivityIcon data-testid="icon" icon="assignment" />);
    expect(
      screen.getByTestId('icon').classList.contains('mds-activity-icon'),
    ).toBe(true);
  });

  it('renders the requested icon asset', async () => {
    render(<ActivityIcon icon="assignment" alt="assignment icon" />);

    const image = screen.getByRole('img', { name: 'assignment icon' });
    await waitFor(() => {
      expect(image.getAttribute('src')).toContain('data:image/svg+xml');
    });
  });

  it('applies default variant by default', () => {
    render(<ActivityIcon data-testid="icon" icon="assignment" />);
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--default'),
    ).toBe(true);
  });

  it('applies md size by default', () => {
    render(<ActivityIcon data-testid="icon" icon="assignment" />);
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--size-md'),
    ).toBe(true);
  });

  it('applies explicit size variants', () => {
    const { rerender } = render(
      <ActivityIcon data-testid="icon" icon="assignment" size="sm" />,
    );
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--size-sm'),
    ).toBe(true);

    rerender(<ActivityIcon data-testid="icon" icon="assignment" size="md" />);
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--size-md'),
    ).toBe(true);

    rerender(<ActivityIcon data-testid="icon" icon="assignment" size="lg" />);
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--size-lg'),
    ).toBe(true);

    rerender(<ActivityIcon data-testid="icon" icon="assignment" size="xl" />);
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--size-xl'),
    ).toBe(true);
  });

  it('applies none background variant', () => {
    render(
      <ActivityIcon data-testid="icon" icon="assignment" variant="none" />,
    );
    expect(
      screen.getByTestId('icon').classList.contains('mds-activity-icon--none'),
    ).toBe(true);
  });

  it('applies default background variant', () => {
    render(
      <ActivityIcon data-testid="icon" icon="assignment" variant="default" />,
    );
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--default'),
    ).toBe(true);
  });

  it('applies large background variant', () => {
    render(
      <ActivityIcon data-testid="icon" icon="assignment" variant="large" />,
    );
    expect(
      screen.getByTestId('icon').classList.contains('mds-activity-icon--large'),
    ).toBe(true);
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--size-md'),
    ).toBe(true);
  });

  it('falls back to file-unknown for an invalid icon name', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { rerender } = render(
      <ActivityIcon icon="file-unknown" alt="unknown icon" />,
    );
    let expectedFallbackSrc = '';

    await waitFor(() => {
      expectedFallbackSrc =
        screen.getByRole('img', { name: 'unknown icon' }).getAttribute('src') ??
        '';
      expect(expectedFallbackSrc).toContain('data:image/svg+xml');
    });

    rerender(<ActivityIcon icon="invalid" alt="fallback icon" />);

    const image = screen.getByRole('img', { name: 'fallback icon' });
    await waitFor(() => {
      expect(image.getAttribute('src')).toBe(expectedFallbackSrc);
    });

    expect(error).toHaveBeenCalledWith(
      expect.stringContaining('[MDS ActivityIcon] Invalid icon "invalid"'),
    );
    error.mockRestore();
  });

  it('falls back to default for an invalid variant', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <ActivityIcon
        data-testid="icon"
        icon="assignment"
        variant={'invalid' as unknown as ActivityIconVariant}
      />,
    );

    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--default'),
    ).toBe(true);
    vi.restoreAllMocks();
  });

  it('warns in development when an invalid variant is passed', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <ActivityIcon
        icon="assignment"
        variant={'invalid' as unknown as ActivityIconVariant}
      />,
    );

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[MDS ActivityIcon] Invalid variant "invalid"'),
    );
    warn.mockRestore();
  });

  it('falls back to md for an invalid size', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <ActivityIcon
        data-testid="icon"
        icon="assignment"
        size={'invalid' as unknown as ActivityIconSize}
      />,
    );

    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--size-md'),
    ).toBe(true);
    vi.restoreAllMocks();
  });

  it('warns in development when an invalid size is passed', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <ActivityIcon
        icon="assignment"
        size={'invalid' as unknown as ActivityIconSize}
      />,
    );

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[MDS ActivityIcon] Invalid size "invalid"'),
    );
    warn.mockRestore();
  });

  it('forwards extra props to the root element', () => {
    render(
      <ActivityIcon
        aria-label="quiz activity"
        data-testid="activity-icon"
        icon="quiz"
      />,
    );

    const root = screen.getByTestId('activity-icon');
    expect(root.getAttribute('aria-label')).toBe('quiz activity');
  });

  it('defaults to decorative image when alt is omitted', () => {
    const { container } = render(<ActivityIcon icon="quiz" />);
    const image = container.querySelector('img');

    expect(image?.getAttribute('alt')).toBe('');
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('infers category from icon name', () => {
    render(<ActivityIcon data-testid="icon" icon="forum" />);
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--category-collaboration'),
    ).toBe(true);
  });

  it('applies category-assessment class for assessment icons', () => {
    render(<ActivityIcon data-testid="icon" icon="quiz" />);
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--category-assessment'),
    ).toBe(true);
  });

  it('applies category-resource class for file icons', () => {
    render(<ActivityIcon data-testid="icon" icon="file-pdf" />);
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--category-resource'),
    ).toBe(true);
  });

  it('defaults to other category for unmapped icons', () => {
    // subsection is registered with the 'other' category.
    render(<ActivityIcon data-testid="icon" icon="subsection" />);

    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--category-other'),
    ).toBe(true);
  });
});
