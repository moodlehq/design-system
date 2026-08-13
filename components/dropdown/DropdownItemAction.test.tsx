import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { DropdownItemAction } from './DropdownItemAction';

describe('DropdownItemAction: Unit Test', () => {
  it('applies the mds-dropdown-item classes', () => {
    render(<DropdownItemAction label="Action item" />);
    const item = screen.getByRole('menuitem');
    expect(item).toHaveClass('mds-dropdown-item');
    expect(item).toHaveClass('mds-dropdown-item--action');
  });

  it('renders the label', () => {
    render(<DropdownItemAction label="Do the thing" />);
    expect(screen.getByRole('menuitem')).toHaveTextContent('Do the thing');
  });

  it('renders the description when provided', () => {
    render(
      <DropdownItemAction label="Action item" description="More detail" />,
    );
    expect(screen.getByText('More detail')).toHaveClass(
      'mds-dropdown-item__description',
    );
  });

  it('applies the danger variant class', () => {
    render(<DropdownItemAction label="Delete" variant="danger" />);
    expect(screen.getByRole('menuitem')).toHaveClass(
      'mds-dropdown-item--danger',
    );
  });

  it('suppresses the description on the danger variant and warns in development', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <DropdownItemAction
        label="Delete"
        variant="danger"
        description="This cannot be undone"
      />,
    );
    expect(screen.queryByText('This cannot be undone')).not.toBeInTheDocument();
    expect(screen.getByRole('menuitem')).not.toHaveClass(
      'mds-dropdown-item--with-description',
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('`description` is not supported'),
    );
    warnSpy.mockRestore();
  });

  it('falls back to default and warns in development for an invalid variant', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <DropdownItemAction
        label="Action item"
        // @ts-expect-error - runtime validation path for JS consumers
        variant="invalid"
      />,
    );
    expect(screen.getByRole('menuitem')).toHaveClass(
      'mds-dropdown-item--default',
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('[MDS DropdownItemAction] Invalid variant'),
    );
    warnSpy.mockRestore();
  });

  it('renders as aria-disabled when disabled is true', () => {
    render(<DropdownItemAction label="Action item" disabled />);
    const item = screen.getByRole('menuitem');
    expect(item).toHaveAttribute('aria-disabled', 'true');
    // Not natively disabled - item stays in the tab sequence and is
    // reachable by Assistive Technology users who can still discover it is unavailable.
    expect(item).not.toBeDisabled();
  });

  it('forwards extra props and the ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <DropdownItemAction label="Action item" data-testid="item" ref={ref} />,
    );
    expect(screen.getByTestId('item')).toBe(screen.getByRole('menuitem'));
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders as an anchor with href when the href prop is supplied', () => {
    render(<DropdownItemAction label="Go somewhere" href="/path" />);
    const item = screen.getByRole('menuitem');
    expect(item.tagName).toBe('A');
    expect(item).toHaveAttribute('href', '/path');
  });

  it('suppresses href and sets aria-disabled when disabled with href', () => {
    render(<DropdownItemAction label="Go somewhere" href="/path" disabled />);
    const item = screen.getByRole('menuitem');
    expect(item).toHaveAttribute('aria-disabled', 'true');
    expect(item).not.toHaveAttribute('href');
  });
});
