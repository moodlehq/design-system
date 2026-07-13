import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  DropdownItemAction,
  DropdownItemCustom,
  DropdownItemDivider,
  DropdownItemExpandable,
  DropdownItemGroup,
  DropdownItemHeader,
  DropdownItemMultiselect,
  DropdownItemSelect,
} from './DropdownItem';

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

  it('falls back to default and warns in development for an invalid variant', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <DropdownItemAction
        label="Action item"
        // @ts-expect-error — runtime validation path for JS consumers
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
    // Not natively disabled — item stays in the tab sequence and is
    // reachable by AT users who can still discover it is unavailable.
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

describe('DropdownItemSelect: Unit Test', () => {
  it('exposes radio-like semantics with the selected state', () => {
    render(<DropdownItemSelect label="Selectable" selected />);
    const item = screen.getByRole('menuitemradio');
    expect(item).toHaveAttribute('aria-checked', 'true');
    expect(item).toHaveClass('mds-dropdown-item--selected');
  });

  it('always renders the check span in the DOM (visibility toggled by CSS)', () => {
    const { container, rerender } = render(
      <DropdownItemSelect label="Selectable" selected />,
    );
    // Present when selected
    expect(
      container.querySelector('.mds-dropdown-item__check'),
    ).toBeInTheDocument();
    // Still present (not removed) when unselected — visibility is CSS-driven
    // so trailing-column width stays constant and labels don't jitter.
    rerender(<DropdownItemSelect label="Selectable" />);
    expect(
      container.querySelector('.mds-dropdown-item__check'),
    ).toBeInTheDocument();
  });
});

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
    // No children — no popup semantics should be exposed.
    expect(item).not.toHaveAttribute('aria-haspopup');
    expect(item).not.toHaveAttribute('aria-expanded');
    await user.click(item);
    // Still no expanded state after click.
    expect(item).not.toHaveAttribute('aria-expanded');
  });
});

describe('DropdownItemHeader / Divider / Custom: Unit Test', () => {
  it('renders the header as non-interactive presentation', () => {
    render(<DropdownItemHeader label="Group label" data-testid="header" />);
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('mds-dropdown-item--header');
    expect(header).toHaveTextContent('Group label');
    expect(header).not.toHaveAttribute('tabindex');
  });

  it('renders the divider as a separator', () => {
    render(<DropdownItemDivider data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('mds-dropdown-divider');
    expect(divider).toHaveAttribute('role', 'separator');
  });

  it('renders custom slot content', () => {
    render(
      <DropdownItemCustom>
        <span>Anything</span>
      </DropdownItemCustom>,
    );
    expect(screen.getByText('Anything')).toBeInTheDocument();
  });
});

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
    // The Checkbox input is inside an inert wrapper — inert prevents it from
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
