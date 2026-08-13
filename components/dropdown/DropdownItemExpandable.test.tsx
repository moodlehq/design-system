import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DropdownItemAction } from './DropdownItemAction';
import { DropdownItemExpandable } from './DropdownItemExpandable';

describe('DropdownItemExpandable: Unit Test', () => {
  it('opens and closes its submenu on click', async () => {
    const user = userEvent.setup();
    render(
      <DropdownItemExpandable label="Expand">
        <DropdownItemAction label="Sub action" />
      </DropdownItemExpandable>,
    );
    const item = screen.getByRole('menuitem', { name: 'Expand' });
    expect(item).toHaveAttribute('aria-expanded', 'false');

    await user.click(item);
    expect(item).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() =>
      expect(
        screen.getByRole('menuitem', { name: 'Sub action' }),
      ).toBeInTheDocument(),
    );

    await user.click(item);
    expect(item).toHaveAttribute('aria-expanded', 'false');
    await waitFor(() =>
      expect(
        screen.queryByRole('menuitem', { name: 'Sub action' }),
      ).not.toBeInTheDocument(),
    );
  });

  it('closes the submenu on Escape', async () => {
    const user = userEvent.setup();
    render(
      <DropdownItemExpandable label="Expand" defaultOpen>
        <DropdownItemAction label="Sub action" />
      </DropdownItemExpandable>,
    );
    await waitFor(() =>
      expect(
        screen.getByRole('menuitem', { name: 'Sub action' }),
      ).toBeInTheDocument(),
    );
    await user.keyboard('{Escape}');
    await waitFor(() =>
      expect(
        screen.queryByRole('menuitem', { name: 'Sub action' }),
      ).not.toBeInTheDocument(),
    );
  });

  it('notifies onOpenChange', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <DropdownItemExpandable label="Expand" onOpenChange={onOpenChange}>
        <DropdownItemAction label="Sub action" />
      </DropdownItemExpandable>,
    );
    await user.click(screen.getByRole('menuitem', { name: 'Expand' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('does not open when no submenu children are provided', async () => {
    const user = userEvent.setup();
    render(<DropdownItemExpandable label="Expand" />);
    const item = screen.getByRole('menuitem', { name: 'Expand' });
    // No children - no popup semantics should be exposed.
    expect(item).not.toHaveAttribute('aria-haspopup');
    expect(item).not.toHaveAttribute('aria-expanded');
    await user.click(item);
    // Still no expanded state after click.
    expect(item).not.toHaveAttribute('aria-expanded');
  });
});
