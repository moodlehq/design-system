import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  DropdownItemAction,
  DropdownItemCustom,
  DropdownItemDivider,
  DropdownItemExpandable,
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

  it('renders as disabled when disabled is true', () => {
    render(<DropdownItemAction label="Action item" disabled />);
    expect(screen.getByRole('menuitem')).toBeDisabled();
  });

  it('forwards extra props and the ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <DropdownItemAction label="Action item" data-testid="item" ref={ref} />,
    );
    expect(screen.getByTestId('item')).toBe(screen.getByRole('menuitem'));
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

describe('DropdownItemSelect: Unit Test', () => {
  it('exposes radio-like semantics with the selected state', () => {
    render(<DropdownItemSelect label="Selectable" selected />);
    const item = screen.getByRole('menuitemradio');
    expect(item).toHaveAttribute('aria-checked', 'true');
    expect(item).toHaveClass('mds-dropdown-item--selected');
  });

  it('renders the check mark only when selected', () => {
    const { container, rerender } = render(
      <DropdownItemSelect label="Selectable" selected />,
    );
    expect(
      container.querySelector('.mds-dropdown-item__check'),
    ).toBeInTheDocument();
    rerender(<DropdownItemSelect label="Selectable" />);
    expect(
      container.querySelector('.mds-dropdown-item__check'),
    ).not.toBeInTheDocument();
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
    expect(
      screen.getByRole('menuitem', { name: 'Sub action' }),
    ).toBeInTheDocument();

    await user.click(item);
    expect(item).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByRole('menuitem', { name: 'Sub action' }),
    ).not.toBeInTheDocument();
  });

  it('closes the submenu on Escape', async () => {
    const user = userEvent.setup();
    render(
      <DropdownItemExpandable label="Expand" defaultOpen>
        <DropdownItemAction label="Sub action" />
      </DropdownItemExpandable>,
    );
    expect(
      screen.getByRole('menuitem', { name: 'Sub action' }),
    ).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(
      screen.queryByRole('menuitem', { name: 'Sub action' }),
    ).not.toBeInTheDocument();
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
    await user.click(item);
    expect(item).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('DropdownItemMultiselect: Unit Test', () => {
  it('toggles through the row click without closing semantics', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <DropdownItemMultiselect
        label="Label text"
        checked={false}
        onCheckedChange={onCheckedChange}
      />,
    );
    const item = screen.getByRole('menuitemcheckbox');
    expect(item).toHaveAttribute('aria-checked', 'false');
    await user.click(item);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles with the keyboard', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <DropdownItemMultiselect
        label="Label text"
        checked
        onCheckedChange={onCheckedChange}
      />,
    );
    screen.getByRole('menuitemcheckbox').focus();
    await user.keyboard(' ');
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('ignores interaction when disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <DropdownItemMultiselect
        label="Label text"
        disabled
        onCheckedChange={onCheckedChange}
      />,
    );
    const item = screen.getByRole('menuitemcheckbox');
    expect(item).toHaveAttribute('aria-disabled', 'true');
    await user.click(item);
    expect(onCheckedChange).not.toHaveBeenCalled();
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
    expect(screen.getByTestId('divider')).toHaveClass('mds-dropdown-divider');
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
