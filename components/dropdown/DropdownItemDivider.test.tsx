import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DropdownItemDivider } from './DropdownItemDivider';

describe('DropdownItemDivider: Unit Test', () => {
  it('renders the divider as a separator', () => {
    render(<DropdownItemDivider data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('mds-dropdown-divider');
    expect(divider).toHaveAttribute('role', 'separator');
  });
});
