import { fn } from 'storybook/test';
import type { BoardTileLabels } from './BoardTile';

export const labels: BoardTileLabels = {
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

export const actions = [
  { id: 'configure', label: 'Configure Timeline block' },
  { id: 'hide', label: 'Hide Timeline block' },
];

export const content = (
  <p style={{ margin: 0 }}>Block content goes in this slot.</p>
);

export const frameStyle = {
  inlineSize: '38rem',
  blockSize: '20rem',
  display: 'flex',
  flexDirection: 'column' as const,
};

export const editingArgs = {
  editing: true,
  onRemove: fn(),
  actions,
};
