import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { BoardTileLabels, BoardTileProps } from './BoardTile';
import { BoardTile } from './BoardTile';

const labels: BoardTileLabels = {
  move: 'Move Timeline',
  resize: 'Resize Timeline',
  moveInstructions: 'Move with the arrow keys.',
  resizeInstructions: 'Resize with the arrow keys.',
  up: 'Up',
  down: 'Down',
  left: 'Left',
  right: 'Right',
  moveControls: 'Move controls',
  resizeControls: 'Resize controls',
  hidden: 'Hidden from students',
  remove: 'Remove Timeline',
  actions: 'Timeline actions',
};

const renderTile = (props: Partial<BoardTileProps> = {}) =>
  render(
    <BoardTile
      title="Block title"
      labels={labels}
      content="Block content goes in this slot."
      {...props}
    />,
  );

describe('BoardTile', () => {
  it('applies the mds-board-tile class and renders the title and content', () => {
    renderTile();
    const tile = screen.getByRole('region', { name: 'Block title' });
    expect(tile).toHaveClass('mds-board-tile');
    expect(
      screen.getByRole('heading', { name: 'Block title' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Block content goes in this slot.'),
    ).toBeInTheDocument();
  });

  it('forwards extra props and the ref to the section', () => {
    const ref = { current: null as HTMLElement | null };
    renderTile({ ref, 'data-testid': 'tile', 'aria-describedby': 'hint' });
    const tile = screen.getByTestId('tile');
    expect(tile.tagName).toBe('SECTION');
    expect(ref.current).toBe(tile);
    expect(tile).toHaveAttribute('aria-describedby', 'hint');
  });

  it('uses a caller label as the accessible name', () => {
    renderTile({ label: 'Timeline block' });
    expect(
      screen.getByRole('region', { name: 'Timeline block' }),
    ).toBeInTheDocument();
  });

  it('hides editing controls in view mode', () => {
    renderTile();
    expect(
      screen.queryByRole('button', { name: labels.move }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: labels.resize }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(labels.hidden)).not.toBeInTheDocument();
  });

  it('shows handles, remove, and actions while editing', () => {
    renderTile({
      editing: true,
      onRemove: vi.fn(),
      actions: [{ id: 'configure', label: 'Configure Timeline block' }],
    });
    const tile = screen.getByRole('region', { name: 'Block title' });
    expect(tile).toHaveClass('mds-board-tile--editing');
    expect(screen.getByRole('button', { name: labels.move })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(screen.getByRole('button', { name: labels.resize })).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('resize-instructions'),
    );
    expect(
      screen.getByRole('button', { name: labels.remove }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: labels.actions }),
    ).toBeInTheDocument();
  });

  it('applies the hidden class and badge', () => {
    renderTile({ hidden: true, editing: true });
    expect(screen.getByRole('region', { name: 'Block title' })).toHaveClass(
      'mds-board-tile--hidden',
    );
    expect(screen.getByText(labels.hidden)).toBeInTheDocument();
  });

  it('applies the active class and shows direction buttons for that handle', () => {
    renderTile({ editing: true, active: 'move' });
    const tile = screen.getByRole('region', { name: 'Block title' });
    expect(tile).toHaveClass('mds-board-tile--active');
    expect(tile).toHaveClass('mds-board-tile--move');
    expect(screen.getByRole('button', { name: labels.move })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: labels.up })).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: labels.moveControls }),
    ).toBeInTheDocument();
  });

  it('hides direction buttons when showDirectionControls is false', () => {
    renderTile({
      editing: true,
      active: 'resize',
      showDirectionControls: false,
    });
    expect(
      screen.queryByRole('button', { name: labels.up }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: labels.resize })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('falls back when active is invalid and warns in development', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderTile({
      editing: true,
      // @ts-expect-error — intentional invalid value
      active: 'drag',
    });
    const tile = screen.getByRole('region', { name: 'Block title' });
    expect(tile).not.toHaveClass('mds-board-tile--active');
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('Invalid active'),
    );
    warn.mockRestore();
  });

  it('warns when children are passed and does not render them', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <BoardTile title="Block title" labels={labels}>
        {'Ignored child'}
      </BoardTile>,
    );
    expect(screen.queryByText('Ignored child')).not.toBeInTheDocument();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('children'));
    warn.mockRestore();
  });

  it('appends a consumer className', () => {
    renderTile({ className: 'custom-tile' });
    expect(screen.getByRole('region', { name: 'Block title' })).toHaveClass(
      'custom-tile',
    );
  });

  it('calls onRemove when the remove button is pressed', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    renderTile({ editing: true, onRemove });
    await user.click(screen.getByRole('button', { name: labels.remove }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('picks up, moves, and cancels from the keyboard', async () => {
    const user = userEvent.setup();
    const onActivate = vi.fn();
    const onDirection = vi.fn();
    const onCancel = vi.fn();
    const onCommit = vi.fn();

    const Harness = () => {
      const [active, setActive] = useState<BoardTileProps['active']>(null);
      return (
        <BoardTile
          title="Block title"
          labels={labels}
          editing
          active={active}
          onActivate={(mode) => {
            onActivate(mode);
            setActive(mode);
          }}
          onDirection={onDirection}
          onCancel={(mode) => {
            onCancel(mode);
            setActive(null);
          }}
          onCommit={(mode) => {
            onCommit(mode);
            setActive(null);
          }}
        />
      );
    };

    render(<Harness />);
    const move = screen.getByRole('button', { name: labels.move });
    move.focus();
    await user.keyboard('{Enter}');
    expect(onActivate).toHaveBeenCalledWith('move');
    expect(move).toHaveAttribute('aria-pressed', 'true');
    await user.keyboard('{ArrowLeft}');
    expect(onDirection).toHaveBeenCalledWith('move', -1, 0);
    await user.keyboard('{Escape}');
    expect(onCancel).toHaveBeenCalledWith('move');
    expect(move).toHaveAttribute('aria-pressed', 'false');
    await user.keyboard(' ');
    expect(onActivate).toHaveBeenCalledTimes(2);
    await user.keyboard('{Enter}');
    expect(onCommit).toHaveBeenCalledWith('move');
  });

  it('commits when focus leaves the pressed handle', () => {
    const onCommit = vi.fn();
    renderTile({ editing: true, active: 'move', onCommit });
    screen.getByRole('button', { name: labels.move }).focus();
    screen.getByRole('button', { name: labels.resize }).focus();
    expect(onCommit).toHaveBeenCalledWith('move');
  });

  it('nudges from a direction button', async () => {
    const user = userEvent.setup();
    const onDirection = vi.fn();
    renderTile({ editing: true, active: 'resize', onDirection });
    await user.click(screen.getByRole('button', { name: labels.down }));
    expect(onDirection).toHaveBeenCalledWith('resize', 0, 1);
    expect(screen.getByRole('button', { name: labels.down })).toHaveAttribute(
      'tabindex',
      '-1',
    );
  });

  it('starts a move from a header drag past the threshold', () => {
    const onHandlePointerDown = vi.fn();
    const onHeaderDragStart = vi.fn();
    renderTile({ editing: true, onHandlePointerDown, onHeaderDragStart });
    const header = document.querySelector('.mds-board-tile-header');
    expect(header).not.toBeNull();
    fireEvent.pointerDown(header as Element, {
      button: 0,
      clientX: 0,
      clientY: 0,
    });
    fireEvent.pointerMove(window, { clientX: 2, clientY: 0 });
    expect(onHeaderDragStart).not.toHaveBeenCalled();
    expect(onHandlePointerDown).not.toHaveBeenCalled();
    fireEvent.pointerMove(window, { clientX: 8, clientY: 1 });
    expect(onHeaderDragStart).toHaveBeenCalledWith(
      expect.objectContaining({ clientX: 0, clientY: 0 }),
    );
    expect(onHandlePointerDown).toHaveBeenCalledWith(
      'move',
      expect.objectContaining({ clientX: 0, clientY: 0 }),
    );
  });

  it('does not start a header drag from a control or outside edit mode', () => {
    const onHandlePointerDown = vi.fn();
    const onHeaderDragStart = vi.fn();
    const { unmount } = renderTile({
      editing: true,
      onRemove: vi.fn(),
      onHandlePointerDown,
      onHeaderDragStart,
    });
    fireEvent.pointerDown(screen.getByRole('button', { name: labels.remove }), {
      button: 0,
      clientX: 0,
      clientY: 0,
    });
    fireEvent.pointerMove(window, { clientX: 20, clientY: 0 });
    expect(onHeaderDragStart).not.toHaveBeenCalled();
    expect(onHandlePointerDown).not.toHaveBeenCalled();
    unmount();

    onHeaderDragStart.mockClear();
    renderTile({ onHeaderDragStart });
    const header = document.querySelector('.mds-board-tile-header');
    fireEvent.pointerDown(header as Element, {
      button: 0,
      clientX: 0,
      clientY: 0,
    });
    fireEvent.pointerMove(window, { clientX: 20, clientY: 0 });
    expect(onHeaderDragStart).not.toHaveBeenCalled();
  });

  it('applies the landing look without direction buttons', () => {
    renderTile({ editing: true, landing: true });
    const tile = screen.getByRole('region', { name: 'Block title' });
    expect(tile).toHaveClass('mds-board-tile--landing');
    expect(tile).not.toHaveClass('mds-board-tile--active');
    expect(
      screen.queryByRole('button', { name: labels.up }),
    ).not.toBeInTheDocument();
  });

  it('clears the pointer-focus mark when the handle blurs', () => {
    renderTile({ editing: true });
    const move = screen.getByRole('button', { name: labels.move });
    fireEvent.pointerDown(move, { button: 0, clientX: 1, clientY: 1 });
    expect(move).toHaveAttribute('data-pointer-focus', 'true');
    fireEvent.blur(move);
    expect(move).not.toHaveAttribute('data-pointer-focus');
  });

  it('reports a pointer press on the move handle', () => {
    const onHandlePointerDown = vi.fn();
    renderTile({ editing: true, onHandlePointerDown });
    fireEvent.pointerDown(screen.getByRole('button', { name: labels.move }), {
      button: 0,
      clientX: 4,
      clientY: 6,
    });
    expect(onHandlePointerDown).toHaveBeenCalledWith(
      'move',
      expect.objectContaining({ clientX: 4, clientY: 6 }),
    );
  });

  it('drops a pressed handle on a second pointer press', () => {
    const onCommit = vi.fn();
    renderTile({ editing: true, active: 'move', onCommit });
    fireEvent.pointerDown(screen.getByRole('button', { name: labels.move }), {
      button: 0,
    });
    expect(onCommit).toHaveBeenCalledWith('move');
  });

  it('renders the drop outline and ends it when the spin finishes', () => {
    const onDropEnd = vi.fn();
    const { container } = renderTile({ dropped: true, onDropEnd });
    const outline = container.querySelector('.mds-board-tile-drop-outline');
    expect(outline).not.toBeNull();
    const end = new Event('animationend', { bubbles: true });
    Object.defineProperty(end, 'animationName', {
      value: 'mds-board-tile-drop-spin-2',
    });
    outline?.dispatchEvent(end);
    expect(onDropEnd).toHaveBeenCalledOnce();
  });

  it('skips the drop outline when reduced motion is requested', () => {
    const onDropEnd = vi.fn();
    const original = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as typeof window.matchMedia;
    const { container } = renderTile({ dropped: true, onDropEnd });
    expect(container.querySelector('.mds-board-tile-drop-outline')).toBeNull();
    expect(onDropEnd).toHaveBeenCalledOnce();
    window.matchMedia = original;
  });

  it('announces a caller-supplied status message', () => {
    renderTile({ statusMessage: 'Timeline moved right' });
    expect(screen.getByRole('status')).toHaveTextContent(
      'Timeline moved right',
    );
  });
});
