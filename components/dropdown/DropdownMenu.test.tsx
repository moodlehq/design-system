import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { DropdownItemAction } from './DropdownItem';
import { DropdownMenu } from './DropdownMenu';

describe('DropdownMenu: Unit Test', () => {
  it('applies the mds-dropdown-menu class and menu role', () => {
    render(<DropdownMenu aria-label="Menu" />);
    expect(screen.getByRole('menu')).toHaveClass('mds-dropdown-menu');
  });

  it('renders item children', () => {
    render(
      <DropdownMenu aria-label="Menu">
        <DropdownItemAction label="Action item" />
      </DropdownMenu>,
    );
    expect(
      screen.getByRole('menuitem', { name: 'Action item' }),
    ).toBeInTheDocument();
  });

  it('forwards extra props and the ref to the menu element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<DropdownMenu aria-label="Menu" data-testid="menu" ref={ref} />);
    expect(screen.getByTestId('menu')).toBe(screen.getByRole('menu'));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
