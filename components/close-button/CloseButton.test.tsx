import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CloseButton } from './CloseButton';

describe('CloseButton: Unit Test', () => {
  it.each(['sm', 'md', 'lg'] as const)(
    'applies mds, Bootstrap, and size classes for size=%s',
    (size) => {
      render(<CloseButton aria-label="Close" size={size} />);
      const btn = screen.getByRole('button', { name: 'Close' });
      expect(btn).toHaveClass('mds-close-button');
      expect(btn).toHaveClass('btn-close');
      expect(btn).toHaveClass(`mds-close-button--${size}`);
    },
  );

  it('falls back to md size class for an invalid size value', () => {
    render(<CloseButton aria-label="Close" size="invalid" />);
    expect(screen.getByRole('button', { name: 'Close' })).toHaveClass(
      'mds-close-button--md',
    );
  });

  it('uses the provided aria-label as the accessible name', () => {
    render(<CloseButton aria-label="Dismiss dialog" />);
    expect(
      screen.getByRole('button', { name: 'Dismiss dialog' }),
    ).toBeInTheDocument();
  });

  it('defaults button type to button to avoid implicit form submission', () => {
    render(<CloseButton aria-label="Close" />);
    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('always renders type button even if a type is passed unsafely', () => {
    // @ts-expect-error — intentionally bypassing Omit<..., 'type'> to verify
    // the runtime hard-lock (type="button" after {...props}) still holds.
    render(<CloseButton aria-label="Close" type="submit" />);
    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('warns in development when an invalid size is passed', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<CloseButton aria-label="Close" size="invalid" />);

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('Invalid size "invalid"'),
    );
    vi.restoreAllMocks();
  });

  it('respects disabled prop', () => {
    render(<CloseButton aria-label="Close" disabled />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeDisabled();
  });

  it('forwards extra props to the button element', () => {
    render(<CloseButton aria-label="Close" data-testid="close-btn" />);
    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute(
      'data-testid',
      'close-btn',
    );
  });

  it('forwards onClick to the button element', () => {
    const handleClick = vi.fn();
    render(<CloseButton aria-label="Close" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('appends consumer className after the mds classes', () => {
    render(<CloseButton aria-label="Close" className="custom-class" />);
    const btn = screen.getByRole('button', { name: 'Close' });
    const classes = btn.getAttribute('class') ?? '';
    // mds-* hook must come before consumer className
    expect(classes.indexOf('mds-close-button')).toBeLessThan(
      classes.indexOf('custom-class'),
    );
  });

  it('renders a button without an extra wrapper element', () => {
    const { container } = render(<CloseButton aria-label="Close" />);
    expect(container.firstElementChild).toBe(
      screen.getByRole('button', { name: 'Close' }),
    );
  });
});
