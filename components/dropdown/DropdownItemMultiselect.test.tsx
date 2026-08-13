import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { DropdownItemMultiselect } from './DropdownItemMultiselect';

describe('DropdownItemMultiselect: Unit Test', () => {
  it('applies mds-dropdown-item--multiselect class and checkbox role', () => {
    render(<DropdownItemMultiselect label="Option A" />);
    const item = screen.getByRole('menuitemcheckbox', { name: 'Option A' });
    expect(item).toHaveClass('mds-dropdown-item');
    expect(item).toHaveClass('mds-dropdown-item--multiselect');
  });

  it('reflects checked state via aria-checked', () => {
    const { rerender } = render(
      <DropdownItemMultiselect label="Option" checked />,
    );
    const item = screen.getByRole('menuitemcheckbox');
    expect(item).toHaveAttribute('aria-checked', 'true');

    rerender(<DropdownItemMultiselect label="Option" checked={false} />);
    expect(item).toHaveAttribute('aria-checked', 'false');
  });

  it('renders an embedded Checkbox as the visual indicator', () => {
    const { container } = render(
      <DropdownItemMultiselect label="Option" checked />,
    );
    // The Checkbox input is inside an inert wrapper - inert prevents it from
    // being interactive and aria-hidden hides it from the accessibility tree.
    const wrapper = container.querySelector('span[inert]');
    expect(wrapper).toBeInTheDocument();
    const input = wrapper!.querySelector('input[type="checkbox"]');
    expect(input).toBeInTheDocument();
    expect(input).toBeChecked();
  });

  it('renders the description when provided', () => {
    render(
      <DropdownItemMultiselect label="Option" description="More detail" />,
    );
    expect(screen.getByText('More detail')).toHaveClass(
      'mds-dropdown-item__description',
    );
  });

  it('renders as aria-disabled when disabled is true', () => {
    render(<DropdownItemMultiselect label="Option" disabled />);
    const item = screen.getByRole('menuitemcheckbox');
    expect(item).toHaveAttribute('aria-disabled', 'true');
    expect(item).not.toBeDisabled();
  });

  it('forwards extra props and the ref to the div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <DropdownItemMultiselect
        label="Option"
        data-testid="multiselect"
        ref={ref}
      />,
    );
    expect(screen.getByTestId('multiselect')).toBe(
      screen.getByRole('menuitemcheckbox'),
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
