import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { DropdownItemAction } from './DropdownItemAction';
import { DropdownItemGroup } from './DropdownItemGroup';

describe('DropdownItemGroup: Unit Test', () => {
  it('renders role=group with the label as accessible name', () => {
    render(
      <DropdownItemGroup label="Section A">
        <DropdownItemAction label="Item 1" />
      </DropdownItemGroup>,
    );
    // getByRole('group') uses the accessible name supplied via aria-labelledby.
    expect(
      screen.getByRole('group', { name: 'Section A' }),
    ).toBeInTheDocument();
  });

  it('renders the label as visible text', () => {
    render(<DropdownItemGroup label="Section A" />);
    expect(screen.getByText('Section A')).toHaveClass(
      'mds-dropdown-item-group__label',
    );
  });

  it('contains grouped item children as DOM children', () => {
    render(
      <DropdownItemGroup label="Section A">
        <DropdownItemAction label="Item 1" />
        <DropdownItemAction label="Item 2" />
      </DropdownItemGroup>,
    );
    const group = screen.getByRole('group', { name: 'Section A' });
    expect(group.querySelectorAll('[role="menuitem"]')).toHaveLength(2);
  });

  it('forwards extra props and the ref to the group element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <DropdownItemGroup label="Section A" data-testid="group" ref={ref} />,
    );
    expect(screen.getByTestId('group')).toBe(
      screen.getByRole('group', { name: 'Section A' }),
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
