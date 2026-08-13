import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DropdownItemHeader } from './DropdownItemHeader';

describe('DropdownItemHeader: Unit Test', () => {
  it('renders the header as non-interactive presentation', () => {
    render(<DropdownItemHeader label="Group label" data-testid="header" />);
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('mds-dropdown-item--header');
    expect(header).toHaveTextContent('Group label');
    expect(header).not.toHaveAttribute('tabindex');
  });
});
