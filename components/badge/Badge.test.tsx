import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Badge } from './Badge';

describe('Badge: Unit Test', () => {
  it('renders the label text', () => {
    render(<Badge label="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies mds-badge and badge base classes', () => {
    render(<Badge label="Label" />);
    const badge = screen.getByText('Label');
    expect(badge).toHaveClass('mds-badge');
    expect(badge).toHaveClass('badge');
  });

  it.each([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
  ] as const)('applies variant class for variant=%s', (variant) => {
    render(<Badge label="Label" variant={variant} />);
    expect(screen.getByText('Label')).toHaveClass(`mds-badge--${variant}`);
  });

  it('defaults to primary variant when no variant is supplied', () => {
    render(<Badge label="Label" />);
    expect(screen.getByText('Label')).toHaveClass('mds-badge--primary');
  });

  it('falls back to primary when an invalid variant is passed', () => {
    // @ts-expect-error — intentional invalid value to verify runtime fallback
    render(<Badge label="Label" variant="invalid" />);
    expect(screen.getByText('Label')).toHaveClass('mds-badge--primary');
    expect(screen.getByText('Label')).not.toHaveClass('mds-badge--invalid');
  });

  it('warns in development when an invalid variant is passed', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    // @ts-expect-error — intentional invalid value
    render(<Badge label="Label" variant="invalid" />);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('Invalid variant "invalid"'),
    );
    vi.restoreAllMocks();
  });

  it('does not apply subtle class by default', () => {
    render(<Badge label="Label" />);
    expect(screen.getByText('Label')).not.toHaveClass('mds-badge--subtle');
  });

  it('applies subtle class when subtle=true', () => {
    render(<Badge label="Label" subtle />);
    expect(screen.getByText('Label')).toHaveClass('mds-badge--subtle');
  });

  it('does not apply pill class by default', () => {
    render(<Badge label="Label" />);
    expect(screen.getByText('Label')).not.toHaveClass('mds-badge--pill');
  });

  it('applies pill class when pill=true', () => {
    render(<Badge label="Label" pill />);
    expect(screen.getByText('Label')).toHaveClass('mds-badge--pill');
  });

  it('renders startIcon before the label', () => {
    const icon = (
      <i className="fa fa-star" data-testid="start-icon" aria-hidden="true" />
    );
    render(<Badge label="Label" startIcon={icon} />);
    const badge = screen.getByText('Label');
    const firstChild = badge.firstChild as HTMLElement;
    expect(firstChild).not.toBeNull();
    expect(firstChild.dataset?.testid).toBe('start-icon');
  });

  it('renders svg startIcon before the label', () => {
    const icon = (
      <svg
        data-testid="start-icon-svg"
        aria-hidden="true"
        viewBox="0 0 16 16"
      />
    );
    render(<Badge label="Label" startIcon={icon} />);
    const badge = screen.getByText('Label');
    const firstChild = badge.firstChild as HTMLElement;
    expect(firstChild).not.toBeNull();
    expect(firstChild.dataset?.testid).toBe('start-icon-svg');
  });

  it('renders endIcon after the label', () => {
    const icon = (
      <i className="fa fa-star" data-testid="end-icon" aria-hidden="true" />
    );
    render(<Badge label="Label" endIcon={icon} />);
    const badge = screen.getByText('Label');
    const lastChild = badge.lastChild as HTMLElement;
    expect(lastChild).not.toBeNull();
    expect(lastChild.dataset?.testid).toBe('end-icon');
  });

  it('renders svg endIcon after the label', () => {
    const icon = (
      <svg data-testid="end-icon-svg" aria-hidden="true" viewBox="0 0 16 16" />
    );
    render(<Badge label="Label" endIcon={icon} />);
    const badge = screen.getByText('Label');
    const lastChild = badge.lastChild as HTMLElement;
    expect(lastChild).not.toBeNull();
    expect(lastChild.dataset?.testid).toBe('end-icon-svg');
  });

  it('renders only startIcon when both startIcon and endIcon are provided', () => {
    const start = (
      <i className="fa fa-star" data-testid="start-icon" aria-hidden="true" />
    );
    const end = (
      <i className="fa fa-star" data-testid="end-icon" aria-hidden="true" />
    );

    render(<Badge label="Label" startIcon={start} endIcon={end} />);

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument();
  });

  it('warns when both startIcon and endIcon are valid icons', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const start = (
      <i className="fa fa-star" data-testid="start-icon" aria-hidden="true" />
    );
    const end = (
      <i className="fa fa-star" data-testid="end-icon" aria-hidden="true" />
    );

    render(<Badge label="Label" startIcon={start} endIcon={end} />);

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining(
        '`startIcon` and `endIcon` are mutually exclusive',
      ),
    );
    vi.restoreAllMocks();
  });

  it('does not warn about icon conflict when only one icon resolves as valid', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const end = (
      <i className="fa fa-star" data-testid="end-icon" aria-hidden="true" />
    );

    // @ts-expect-error — intentional invalid icon to verify resolved-only conflict warning
    render(<Badge label="Label" startIcon={<div />} endIcon={end} />);

    expect(warn).not.toHaveBeenCalledWith(
      expect.stringContaining(
        '`startIcon` and `endIcon` are mutually exclusive',
      ),
    );
    expect(error).toHaveBeenCalledWith(expect.stringContaining('startIcon'));
    vi.restoreAllMocks();
  });

  it('ignores an invalid startIcon value and logs an error', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    // @ts-expect-error — intentional invalid icon
    render(<Badge label="Label" startIcon={<div />} />);
    expect(error).toHaveBeenCalledWith(expect.stringContaining('startIcon'));
    vi.restoreAllMocks();
  });

  it('ignores an invalid endIcon value and logs an error', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    // @ts-expect-error — intentional invalid icon
    render(<Badge label="Label" endIcon={<div />} />);
    expect(error).toHaveBeenCalledWith(expect.stringContaining('endIcon'));
    expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it('forwards extra props to the span element', () => {
    render(<Badge label="Label" data-testid="my-badge" />);
    expect(screen.getByTestId('my-badge')).toBeInTheDocument();
  });

  it('appends consumer className after the mds classes', () => {
    render(<Badge label="Label" className="custom-class" />);
    const span = screen.getByText('Label');
    const classes = span.getAttribute('class') ?? '';
    expect(classes.indexOf('mds-badge')).toBeLessThan(
      classes.indexOf('custom-class'),
    );
  });

  it('renders a span element as the host', () => {
    render(<Badge label="Label" />);
    expect(screen.getByText('Label').tagName).toBe('SPAN');
  });
});
