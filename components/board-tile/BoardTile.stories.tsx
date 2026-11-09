import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn } from 'storybook/test';
import type { BoardTileInteraction, BoardTileLabels } from './BoardTile';
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

const meta = {
  title: 'Components/BoardTile',
  component: BoardTile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Frame for one block on the Flexible dashboard. View shows the title and content. Edit adds the move handle, remove button, actions menu, and resize handle. Pickup is controlled with `active`.',
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

export const Edit: Story = {
  args: editingArgs,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: labels.move }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: labels.resize }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: labels.remove }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: labels.actions }),
    ).toBeVisible();
    await expect(
      canvas.queryByRole('button', { name: labels.up }),
    ).not.toBeInTheDocument();
  },
};

export const EditHover: Story = {
  args: editingArgs,
  parameters: {
    pseudo: {
      hover: '.mds-board-tile',
    },
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
