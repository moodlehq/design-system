import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Link } from './Link';

describe('Link: Unit Test', () => {
  describe('rendering', () => {
    it('applies the mds-link class name', () => {
      render(<Link label="Link" href="#docs" />);
      expect(screen.getByRole('link')).toHaveClass('mds-link');
    });

    it('renders the label correctly', () => {
      render(<Link label="Read docs" href="#docs" />);
      expect(screen.getByRole('link')).toHaveTextContent('Read docs');
    });

    it('renders the selected variant class', () => {
      render(<Link label="Subtle link" href="#docs" variant="secondary" />);
      expect(screen.getByRole('link')).toHaveClass('mds-link--secondary');
    });

    it('falls back to primary and warns in development for an invalid variant', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(<Link label="Link" href="#docs" variant="invalid" />);

      expect(screen.getByRole('link')).toHaveClass('mds-link--primary');
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('[MDS Link] Invalid variant "invalid"'),
      );

      warnSpy.mockRestore();
    });
  });

  describe('icons', () => {
    it('renders a start icon when provided', () => {
      render(
        <Link
          label="Back"
          href="#docs"
          startIcon={<i data-testid="start-icon" aria-hidden="true" />}
        />,
      );

      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    });

    it('renders an end icon when provided', () => {
      render(
        <Link
          label="Next"
          href="#docs"
          endIcon={<i data-testid="end-icon" aria-hidden="true" />}
        />,
      );

      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });

    it('renders only the start icon and warns when both icons are passed', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <Link
          label="Link"
          href="#docs"
          startIcon={<i data-testid="start-icon" aria-hidden="true" />}
          endIcon={
            <svg data-testid="end-icon" aria-hidden="true" viewBox="0 0 1 1" />
          }
        />,
      );

      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument();
      expect(warnSpy).toHaveBeenCalledWith(
        'Link: pass either startIcon or endIcon, not both. Rendering startIcon only.',
      );

      warnSpy.mockRestore();
    });

    it('logs a console.error and drops non-<i>/<svg> elements passed as icons at runtime', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Link
          label="Link"
          href="#docs"
          startIcon={
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (<span data-testid="bad-start-icon" />) as any
          }
          endIcon={
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (<div data-testid="bad-end-icon" />) as any
          }
        />,
      );

      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(screen.queryByTestId('bad-start-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('bad-end-icon')).not.toBeInTheDocument();

      errorSpy.mockRestore();
    });
  });

  describe('disabled state', () => {
    it('applies disabled accessibility and interaction attributes', () => {
      render(<Link label="Disabled" href="#docs" disabled />);

      const link = screen.getByRole('link', { name: 'Disabled' });
      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');
      expect(link).not.toHaveAttribute('href');
      expect(link).toHaveClass('mds-link--disabled');
    });

    it('prevents click handlers from firing when disabled', () => {
      const onClick = vi.fn();
      render(<Link label="Disabled" href="#docs" disabled onClick={onClick} />);

      fireEvent.click(screen.getByRole('link', { name: 'Disabled' }));

      expect(onClick).not.toHaveBeenCalled();
    });

    it('component aria-disabled is not overridden by a consumer-passed prop', () => {
      // Spread order: {...props} comes before our computed aria-disabled so
      // the component's controlled value always wins.
      render(
        <Link
          label="Disabled"
          href="#docs"
          disabled
          aria-disabled={false as unknown as boolean}
        />,
      );

      expect(screen.getByRole('link', { name: 'Disabled' })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });
  });

  describe('HTML attributes', () => {
    it('forwards the href and extra props to the anchor element', () => {
      render(<Link label="Docs" href="#docs" data-testid="docs-link" />);

      const link = screen.getByTestId('docs-link');
      expect(link).toHaveAttribute('href', '#docs');
    });

    it('auto-adds noopener noreferrer when target="_blank" is given without rel', () => {
      render(
        <Link
          label="Docs"
          href="#docs"
          data-testid="docs-link"
          target="_blank"
        />,
      );

      const link = screen.getByTestId('docs-link');
      expect(link).toHaveAttribute('target', '_blank');
      const rel = link.getAttribute('rel') ?? '';
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    });

    it('merges existing rel tokens with noopener noreferrer when target="_blank"', () => {
      render(
        <Link
          label="Docs"
          href="#docs"
          data-testid="docs-link"
          target="_blank"
          rel="noreferrer"
        />,
      );

      const link = screen.getByTestId('docs-link');
      const rel = link.getAttribute('rel') ?? '';
      // noreferrer was already present; noopener must be added; no duplicates
      expect(rel.split(/\s+/)).toContain('noopener');
      expect(rel.split(/\s+/)).toContain('noreferrer');
      expect(rel.split(/\s+/).filter((t) => t === 'noreferrer')).toHaveLength(
        1,
      );
    });

    it('does not force rel when target is not "_blank"', () => {
      render(
        <Link
          label="Docs"
          href="#docs"
          data-testid="docs-link"
          target="_self"
        />,
      );

      expect(screen.getByTestId('docs-link')).not.toHaveAttribute('rel');
    });

    it('forwards ref to the anchor element', () => {
      const ref = { current: null as HTMLAnchorElement | null };
      render(<Link label="Docs" href="#docs" ref={ref} />);
      expect(ref.current).toBe(screen.getByRole('link', { name: 'Docs' }));
    });
  });
});
