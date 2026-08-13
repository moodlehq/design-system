import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Dropdown, DropdownMenu } from './Dropdown';
import { DropdownItemAction } from './DropdownItem';

const renderDropdown = (props = {}) =>
  render(
    <Dropdown label="Label" {...props}>
      <DropdownItemAction label="Action item" />
    </Dropdown>,
  );

describe('Dropdown: Unit Test', () => {
  it('applies the mds-dropdown class name', () => {
    const { container } = renderDropdown();
    expect(container.firstChild).toHaveClass('mds-dropdown');
  });

  it('starts closed and opens on trigger click', async () => {
    const user = userEvent.setup();
    renderDropdown();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Label' }));
    // Menu is portaled — use waitFor to let Floating UI position settle.
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Label' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('labels the menu from the trigger', async () => {
    const user = userEvent.setup();
    renderDropdown();
    await user.click(screen.getByRole('button', { name: 'Label' }));
    await waitFor(() =>
      expect(screen.getByRole('menu', { name: 'Label' })).toBeInTheDocument(),
    );
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    renderDropdown({ defaultOpen: true });
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());
    await user.keyboard('{Escape}');
    await waitFor(() =>
      expect(screen.queryByRole('menu')).not.toBeInTheDocument(),
    );
  });

  it('closes on an outside pointer press', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Dropdown label="Label" defaultOpen>
          <DropdownItemAction label="Action item" />
        </Dropdown>
        <button type="button">Outside</button>
      </>,
    );
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    await waitFor(() =>
      expect(screen.queryByRole('menu')).not.toBeInTheDocument(),
    );
  });

  it('supports controlled open state', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderDropdown({ open: false, onOpenChange });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Label' }));
    // Controlled: the menu stays closed until the consumer flips `open`.
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('forwards trigger configuration', () => {
    renderDropdown({ appearance: 'emphasis', size: 'sm' });
    const trigger = screen.getByRole('button', { name: 'Label' });
    expect(trigger).toHaveClass('btn-secondary');
    expect(trigger).toHaveClass('mds-btn--size-sm');
  });

  it('forwards extra props and the ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Dropdown label="Label" data-testid="dropdown" ref={ref}>
        <DropdownItemAction label="Action item" />
      </Dropdown>,
    );
    expect(screen.getByTestId('dropdown')).toHaveClass('mds-dropdown');
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

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
