import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { DropdownItemList } from './DropdownItemList';

describe('DropdownItemList: Unit Test', () => {
  it('applies list classes and menuitemradio semantics', () => {
    render(<DropdownItemList label="List item" />);
    const item = screen.getByRole('menuitemradio', { name: 'List item' });
    expect(item).toHaveClass('mds-dropdown-item');
    expect(item).toHaveClass('mds-dropdown-item--list');
    expect(item).toHaveAttribute('aria-disabled', 'true');
    expect(item).toHaveAttribute('aria-checked', 'false');
  });

  it('marks done variant as selected and checked', () => {
    render(<DropdownItemList label="List item" variant="done" />);
    const item = screen.getByRole('menuitemradio', { name: 'List item' });
    expect(item).toHaveClass('mds-dropdown-item--selected');
    expect(item).toHaveAttribute('aria-checked', 'true');
  });

  it('always renders the check span in the DOM', () => {
    const { container, rerender } = render(
      <DropdownItemList label="List item" variant="done" />,
    );
    expect(
      container.querySelector('.mds-dropdown-item__check'),
    ).toBeInTheDocument();

    rerender(<DropdownItemList label="List item" variant="todo" />);
    expect(
      container.querySelector('.mds-dropdown-item__check'),
    ).toBeInTheDocument();
  });

  it('renders the label text', () => {
    render(<DropdownItemList label="My task" />);
    expect(screen.getByRole('menuitemradio')).toHaveTextContent('My task');
  });

  it('forwards extra props and the ref to the div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<DropdownItemList label="List item" data-testid="list" ref={ref} />);
    expect(screen.getByTestId('list')).toBe(
      screen.getByRole('menuitemradio', { name: 'List item' }),
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
