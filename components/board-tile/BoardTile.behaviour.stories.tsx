import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect } from 'storybook/test';
import type { BoardTileInteraction } from './BoardTile';
import { BoardTile } from './BoardTile';
import {
  actions,
  content,
  editingArgs,
  frameStyle,
  labels,
} from './story-fixtures';

const meta = {
  title: 'Components/BoardTile/Behaviour',
  component: BoardTile,
  parameters: {
    layout: 'centered',
  },
  tags: ['test', 'beta'],
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

const reducedMotionList = (query: string): MediaQueryList =>
  ({
    matches: true,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }) as MediaQueryList;

const forceReducedMotion = () => {
  const original = window.matchMedia.bind(window);
  window.matchMedia = (query: string) =>
    query.includes('prefers-reduced-motion')
      ? reducedMotionList(query)
      : original(query);
  return () => {
    window.matchMedia = original;
  };
};

export const AfterDrop: Story = {
  name: 'After drop',
  args: {
    ...editingArgs,
    dropped: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          'After a drop, the tile moves into place and an outline animation fades. It plays once when the story loads.',
      },
    },
  },
  play: async ({ canvas }) => {
    const tile = canvas.getByRole('region', { name: 'Block title' });
    await expect(tile).toHaveClass('mds-board-tile--dropped');
    await expect(
      tile.querySelector('.mds-board-tile-drop-outline'),
    ).not.toBeNull();
  },
};

export const AfterDropReducedMotion: Story = {
  name: 'After drop, reduced motion',
  args: {
    ...editingArgs,
    dropped: true,
  },
  beforeEach: forceReducedMotion,
  parameters: {
    chromatic: { prefersReducedMotion: 'reduce', pauseAnimationAtEnd: true },
    docs: {
      description: {
        story:
          'With reduced motion, the tile still moves into place. The outline is not shown.',
      },
    },
  },
  play: async ({ canvas }) => {
    const tile = canvas.getByRole('region', { name: 'Block title' });
    await expect(tile).toHaveClass('mds-board-tile--dropped');
    await expect(tile).not.toHaveClass('mds-board-tile--hidden');
    await expect(tile.querySelector('.mds-board-tile-drop-outline')).toBeNull();
  },
};

export const AfterDropVisualTest: Story = {
  name: 'After drop (visual test)',
  tags: ['!dev', '!autodocs'],
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
          'Visual test for the outline animation. Hidden from the sidebar. Not a prop and not a Figma state.',
      },
    },
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
  name: 'Keyboard interaction',
  parameters: {
    docs: {
      description: {
        story:
          'Tab focuses a handle. Enter or Space picks the tile up, and again drops it. Arrow keys move or resize. Escape cancels.',
      },
    },
  },
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
  name: 'Right to left',
  args: {
    ...editingArgs,
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Edit, mirrored. Handles, actions, and the resize grip sit on the mirrored sides. Not a Figma state, and not Hidden.',
      },
    },
  },
  play: async ({ canvas }) => {
    const tile = canvas.getByRole('region', { name: 'Block title' });
    await expect(tile).toHaveClass('mds-board-tile--editing');
    await expect(tile).not.toHaveClass('mds-board-tile--hidden');
    await expect(getComputedStyle(tile).borderTopStyle).not.toBe('dashed');
    await expect(canvas.queryByText(labels.hidden)).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: labels.move }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: labels.resize }),
    ).toBeVisible();
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

export const DragTheHeader: Story = {
  name: 'Drag the header',
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          'Drag the header or the move handle to move a tile. A press on the title that travels at least 4px calls onHeaderDragStart. Presses on Remove, actions, links, and the handles do not.',
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

const handleColumns = (
  type: 'move' | 'resize',
): Array<['move' | 'resize', string | undefined]> => [
  [type, undefined],
  [type, `${type}-hover`],
  [type, `${type}-focus`],
  [type, undefined],
];

export const HandleStates: Story = {
  name: 'Handle types and states',
  parameters: {
    docs: {
      description: {
        story:
          'Handle Type is Move or Resize. Handle State is Rest, Hover, Focus, or Active. These are nested handle properties, not extra Board tile states.',
      },
    },
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
        {(['Move', 'Resize'] as const).map((type) =>
          handleColumns(type === 'Move' ? 'move' : 'resize').map(
            ([mode, state], index) => (
              <div
                key={`${type}-${index}`}
                data-matrix-state={state}
                style={cellStyle}
              >
                <div style={{ inlineSize: '16rem', blockSize: '10rem' }}>
                  <BoardTile
                    title={`${type} handle ${index + 1}`}
                    labels={labels}
                    content={content}
                    editing
                    active={index === 3 ? mode : null}
                    onRemove={() => undefined}
                    actions={actions}
                  />
                </div>
                <span>{type}</span>
              </div>
            ),
          ),
        )}
      </div>
    </div>
  ),
};
