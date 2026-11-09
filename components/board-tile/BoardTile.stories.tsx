import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, waitFor } from 'storybook/test';
import type {
  BoardTileInteraction,
  BoardTileLabels,
  BoardTileProps,
} from './BoardTile';
import { BoardTile } from './BoardTile';

const labels: BoardTileLabels = {
  move: 'Move Timeline',
  resize: 'Resize Timeline',
  moveInstructions:
    'Press Enter or Space to pick up. Use the arrow keys to move. Press Enter or Space to drop, or Escape to cancel.',
  resizeInstructions:
    'Press Enter or Space to pick up. Use the arrow keys to resize. Press Enter or Space to drop, or Escape to cancel.',
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

const actions = [
  { id: 'configure', label: 'Configure Timeline block' },
  { id: 'hide', label: 'Hide Timeline block' },
];

const content = <p style={{ margin: 0 }}>Block content goes in this slot.</p>;

const frameStyle = {
  inlineSize: '38rem',
  blockSize: '20rem',
  display: 'flex',
  flexDirection: 'column' as const,
};

const editingArgs = {
  editing: true,
  onRemove: fn(),
  actions,
};

const borderColor = async (
  tile: HTMLElement,
  token: '--mds-border-default' | '--mds-border-interactive-primary-hover',
) => {
  const probe = document.createElement('div');
  probe.style.borderTop = `1px solid var(${token})`;
  document.body.appendChild(probe);
  const expected = getComputedStyle(probe).borderTopColor;
  probe.remove();
  return {
    actual: getComputedStyle(tile).borderTopColor,
    outline: getComputedStyle(tile).outlineColor,
    expected,
  };
};

const meta = {
  title: 'Components/BoardTile',
  component: BoardTile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Frame for one block on the Flexible dashboard. View shows the title and content. Edit adds the move handle, remove button, actions menu, and resize handle. The header uses a grab cursor in edit mode; a press that moves 4px calls `onHeaderDragStart`. A click on a handle picks that mode up and shows its arrows; a press that moves 4px is a drag and does not. Pickup is controlled with `active`. `dropped` plays the landing outline.',
      },
    },
  },
  tags: ['autodocs', 'test', 'beta'],
  argTypes: {
    content: { control: false },
    labels: { control: false },
    actions: { control: false },
    active: {
      control: 'select',
      options: ['move', 'resize'],
    },
    editing: { control: 'boolean' },
    hidden: { control: 'boolean' },
    showDirectionControls: { control: 'boolean' },
    pointerDragging: { control: 'boolean' },
    dropped: { control: 'boolean' },
  },
  args: {
    title: 'Block title',
    labels,
    content,
    editing: false,
    hidden: false,
  },
  render: (args) => (
    <div style={frameStyle}>
      <BoardTile {...args} />
    </div>
  ),
} satisfies Meta<typeof BoardTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const View: Story = {};

const ActivatingTile = ({
  active: activeProp,
  onActivate,
  onCommit,
  onCancel,
  ...props
}: BoardTileProps) => {
  const [active, setActive] = useState<BoardTileInteraction | null>(
    activeProp ?? null,
  );
  return (
    <BoardTile
      {...props}
      active={active}
      onActivate={(mode) => {
        setActive(mode);
        onActivate?.(mode);
      }}
      onCommit={(mode) => {
        setActive(null);
        onCommit?.(mode);
      }}
      onCancel={(mode) => {
        setActive(null);
        onCancel?.(mode);
      }}
    />
  );
};

export const Edit: Story = {
  args: editingArgs,
  render: (args) => (
    <div style={frameStyle}>
      <ActivatingTile {...args} />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const tile = canvas.getByRole('region', { name: 'Block title' });
    const border = await borderColor(tile, '--mds-border-default');
    await expect(border.actual).toBe(border.expected);
    await expect(border.outline).toBe('rgba(0, 0, 0, 0)');
    const move = canvas.getByRole('button', { name: labels.move });
    const resize = canvas.getByRole('button', { name: labels.resize });
    await expect(move).toBeVisible();
    await expect(resize).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: labels.remove }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: labels.actions }),
    ).toBeVisible();
    await expect(
      canvas.queryByRole('button', { name: labels.up }),
    ).not.toBeInTheDocument();

    await userEvent.click(move);
    await expect(move).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByRole('button', { name: labels.up })).toBeVisible();
    await userEvent.click(move);
    await expect(move).toHaveAttribute('aria-pressed', 'false');
    await expect(
      canvas.queryByRole('button', { name: labels.up }),
    ).not.toBeInTheDocument();

    await userEvent.click(resize);
    await expect(resize).toHaveAttribute('aria-pressed', 'true');
    await expect(move).toHaveAttribute('aria-pressed', 'false');
    await expect(
      canvas.getByRole('button', { name: labels.down }),
    ).toBeVisible();
    await userEvent.click(resize);
    await expect(resize).toHaveAttribute('aria-pressed', 'false');
    await expect(
      canvas.queryByRole('button', { name: labels.down }),
    ).not.toBeInTheDocument();

    await userEvent.pointer([
      { keys: '[MouseLeft>]', target: move, coords: { x: 4, y: 4 } },
      { coords: { x: 28, y: 4 } },
      { keys: '[/MouseLeft]' },
    ]);
    await expect(move).toHaveAttribute('aria-pressed', 'false');
    await expect(
      canvas.queryByRole('button', { name: labels.up }),
    ).not.toBeInTheDocument();
    move.blur();
  },
};

export const EditHover: Story = {
  args: {
    ...editingArgs,
    // The pseudo-states addon also adds this class. Setting it here keeps the
    // hover border visible when that rewrite does not run.
    className: 'pseudo-hover',
  },
  decorators: [
    (Story) => (
      <div data-edit-hover>
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Scoped so the selector cannot paint every tile once the addon stores
    // it in Storybook globals.
    pseudo: {
      hover: '[data-edit-hover] .mds-board-tile',
    },
    docs: {
      description: {
        story:
          'Edit at rest uses the neutral default border. This story forces the hover border with the pseudo-states addon. A real pointer hover does the same.',
      },
    },
  },
  play: async ({ canvas }) => {
    const tile = canvas.getByRole('region', { name: 'Block title' });
    await waitFor(
      async () => {
        const border = await borderColor(
          tile,
          '--mds-border-interactive-primary-hover',
        );
        await expect(border.actual).toBe(border.expected);
        const rest = await borderColor(tile, '--mds-border-default');
        await expect(border.actual).not.toBe(rest.expected);
      },
      { timeout: 2000 },
    );
  },
};

export const Active: Story = {
  args: {
    ...editingArgs,
    active: 'move',
  },
  play: async ({ canvas }) => {
    const move = canvas.getByRole('button', { name: labels.move });
    await expect(move).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByRole('button', { name: labels.up })).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: labels.resize }),
    ).toHaveAttribute('aria-pressed', 'false');
  },
};

export const ActiveResize: Story = {
  args: {
    ...editingArgs,
    active: 'resize',
  },
};

export const Hidden: Story = {
  args: {
    ...editingArgs,
    hidden: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(labels.hidden)).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Block title' }),
    ).toBeVisible();
  },
};

const KeyboardDemo = () => {
  const [active, setActive] = useState<BoardTileInteraction | null>(null);
  const [log, setLog] = useState('idle');
  return (
    <div style={frameStyle}>
      <BoardTile
        title="Block title"
        labels={labels}
        content={content}
        editing
        active={active}
        onActivate={(mode) => {
          setActive(mode);
          setLog(`activate ${mode}`);
        }}
        onCommit={(mode) => {
          setActive(null);
          setLog(`commit ${mode}`);
        }}
        onCancel={(mode) => {
          setActive(null);
          setLog(`cancel ${mode}`);
        }}
        onDirection={(mode, horizontal, vertical) => {
          setLog(`direction ${mode} ${horizontal} ${vertical}`);
        }}
      />
      <p className="visually-hidden" data-testid="board-tile-log">
        {log}
      </p>
    </div>
  );
};

export const Keyboard: Story = {
  render: () => <KeyboardDemo />,
  play: async ({ canvas, userEvent }) => {
    const move = canvas.getByRole('button', { name: labels.move });
    const log = canvas.getByTestId('board-tile-log');
    await userEvent.tab();
    await expect(move).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(log).toHaveTextContent('activate move');
    await expect(canvas.getByRole('button', { name: labels.up })).toBeVisible();
    await userEvent.keyboard('{ArrowRight}');
    await expect(log).toHaveTextContent('direction move 1 0');
    await userEvent.keyboard('{Escape}');
    await expect(log).toHaveTextContent('cancel move');
    await expect(
      canvas.queryByRole('button', { name: labels.up }),
    ).not.toBeInTheDocument();
    await userEvent.keyboard(' ');
    await expect(log).toHaveTextContent('activate move');
    await userEvent.keyboard('{Enter}');
    await expect(log).toHaveTextContent('commit move');

    const resize = canvas.getByRole('button', { name: labels.resize });
    await userEvent.tab();
    await expect(resize).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(log).toHaveTextContent('activate resize');
    await userEvent.keyboard('{ArrowDown}');
    await expect(log).toHaveTextContent('direction resize 0 1');
    await userEvent.keyboard(' ');
    await expect(log).toHaveTextContent('commit resize');
  },
};

export const RightToLeft: Story = {
  args: {
    ...editingArgs,
    active: 'move',
    hidden: true,
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  tags: ['test', 'beta'],
};

export const Landing: Story = {
  args: {
    ...editingArgs,
    landing: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Set `landing` while the dashboard slides a released tile into place. The border and shadow match Active. The slide itself stays in Moodle.',
      },
    },
  },
};

export const DropFeedback: Story = {
  args: {
    ...editingArgs,
    dropped: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          'After a drop, the tile lifts and settles while the held outline splits and fades. The animation plays once when the story loads. Reduced motion skips the outline. The stable picture of the outline is Drop feedback frame.',
      },
    },
  },
  play: async ({ canvas }) => {
    const tile = canvas.getByRole('region', { name: 'Block title' });
    await expect(
      tile.querySelector('.mds-board-tile-drop-outline'),
    ).not.toBeNull();
    await expect(
      canvas.queryByRole('button', { name: 'Replay drop' }),
    ).not.toBeInTheDocument();
  },
};

export const DropFeedbackFrame: Story = {
  args: {
    ...editingArgs,
    dropped: true,
    className: 'mds-board-tile--drop-frame',
  },
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
    docs: {
      description: {
        story:
          'The outline frozen at its first frame, with the settle raised by one extra-small spacing step. Chromatic pauses animations so this frame does not move.',
      },
    },
  },
};

export const DropFeedbackReducedMotion: Story = {
  args: {
    ...editingArgs,
    dropped: true,
  },
  parameters: {
    chromatic: { prefersReducedMotion: 'reduce', pauseAnimationAtEnd: true },
    docs: {
      description: {
        story:
          'With reduced motion, the outline is not shown. Chromatic captures this story with `prefers-reduced-motion: reduce`.',
      },
    },
  },
};

const HeaderDragDemo = () => {
  const [log, setLog] = useState('idle');
  return (
    <>
      <div style={frameStyle}>
        <BoardTile
          title="Block title"
          labels={labels}
          content={content}
          editing
          onRemove={() => undefined}
          actions={actions}
          onHeaderDragStart={() => setLog('header')}
        />
      </div>
      <p className="visually-hidden" data-testid="header-drag-log">
        {log}
      </p>
    </>
  );
};

export const HeaderDrag: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          'In edit mode the header uses a grab cursor. A press on the title or header background that travels at least 4px calls `onHeaderDragStart`, and also `onHandlePointerDown` with mode `move`. Presses on the remove button, the actions menu, links, and the handles do not. The dashboard owns the drag coordinates. Wire one of those callbacks, not both.',
      },
    },
  },
  render: () => <HeaderDragDemo />,
  play: async ({ canvas, userEvent }) => {
    const log = canvas.getByTestId('header-drag-log');
    const title = canvas.getByRole('heading', { name: 'Block title' });
    await userEvent.pointer([
      { keys: '[MouseLeft>]', target: title, coords: { x: 8, y: 8 } },
      { coords: { x: 24, y: 10 } },
      { keys: '[/MouseLeft]' },
    ]);
    await expect(log).toHaveTextContent('header');
  },
};

const cellStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 'var(--mds-spacing-xs)',
  padding: 'var(--mds-spacing-xl)',
};

const tileStates = [
  { key: 'view', label: 'View', props: { editing: false } },
  { key: 'edit', label: 'Edit', props: { editing: true } },
  {
    key: 'edit-hover',
    label: 'Edit hover',
    props: { editing: true },
    state: 'tile-hover',
  },
  {
    key: 'active',
    label: 'Active',
    props: { editing: true, active: 'move' as const },
  },
  { key: 'hidden', label: 'Hidden', props: { editing: true, hidden: true } },
];

export const StateMatrix: Story = {
  parameters: {
    pseudo: {
      hover: [
        '[data-matrix-state="tile-hover"] .mds-board-tile',
        '[data-matrix-state="move-hover"] .mds-board-tile-handle--move .mds-board-tile-handle-control',
        '[data-matrix-state="resize-hover"] .mds-board-tile-handle--resize .mds-board-tile-handle-control',
      ],
      focusVisible: [
        '[data-matrix-state="move-focus"] .mds-board-tile-handle--move .mds-board-tile-handle-control',
        '[data-matrix-state="resize-focus"] .mds-board-tile-handle--resize .mds-board-tile-handle-control',
      ],
    },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--mds-spacing-xl)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--mds-spacing-lg)',
        }}
      >
        {tileStates.map((state) => (
          <div
            key={state.key}
            data-matrix-state={state.state}
            style={cellStyle}
          >
            <span>{state.label}</span>
            <div style={frameStyle}>
              <BoardTile
                title={`Block title, ${state.label}`}
                labels={labels}
                content={content}
                onRemove={() => undefined}
                actions={actions}
                {...state.props}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, auto)',
          gap: 'var(--mds-spacing-lg)',
          alignItems: 'start',
        }}
      >
        {(['Rest', 'Hover', 'Focus', 'Active'] as const).map((label) => (
          <span key={label}>{label}</span>
        ))}
        {(
          [
            ['move', undefined],
            ['move', 'move-hover'],
            ['move', 'move-focus'],
            ['move', undefined],
          ] as const
        ).map(([mode, state], index) => (
          <div
            key={`move-${index}`}
            data-matrix-state={state}
            style={cellStyle}
          >
            <div style={{ inlineSize: '16rem', blockSize: '10rem' }}>
              <BoardTile
                title={`Move handle ${index + 1}`}
                labels={labels}
                content={content}
                editing
                active={index === 3 ? 'move' : null}
                onRemove={() => undefined}
                actions={actions}
              />
            </div>
            <span>{mode}</span>
          </div>
        ))}
        {(
          [
            ['resize', undefined],
            ['resize', 'resize-hover'],
            ['resize', 'resize-focus'],
            ['resize', undefined],
          ] as const
        ).map(([mode, state], index) => (
          <div
            key={`resize-${index}`}
            data-matrix-state={state}
            style={cellStyle}
          >
            <div style={{ inlineSize: '16rem', blockSize: '10rem' }}>
              <BoardTile
                title={`Resize handle ${index + 1}`}
                labels={labels}
                content={content}
                editing
                active={index === 3 ? 'resize' : null}
                onRemove={() => undefined}
                actions={actions}
              />
            </div>
            <span>{mode}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
