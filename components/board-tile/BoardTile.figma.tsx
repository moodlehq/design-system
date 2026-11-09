import figma from '@figma/code-connect';
import { BoardTile } from './BoardTile';

const url =
  'https://www.figma.com/design/mrbROleDjBVBBQENbK8gXw/Block-tile?node-id=16975-287';

const sharedProps = {
  title: figma.string('Title'),
  content: figma.slot('Content'),
};

// Placeholder copy for the snippet. The component does not default these.
const exampleLabels = {
  move: 'Move block',
  resize: 'Resize block',
  moveInstructions:
    'Press Enter or Space to pick up. Arrow keys move. Enter or Space drops. Escape cancels.',
  resizeInstructions:
    'Press Enter or Space to pick up. Arrow keys resize. Enter or Space drops. Escape cancels.',
  up: 'Up',
  down: 'Down',
  left: 'Left',
  right: 'Right',
  moveControls: 'Move controls',
  resizeControls: 'Resize controls',
  hidden: 'Hidden from students',
  remove: 'Remove block',
  actions: 'Block actions',
};

const exampleActions = [
  { id: 'configure', label: 'Configure block' },
  { id: 'hide', label: 'Hide block' },
];

figma.connect(BoardTile, url, {
  variant: { State: 'View' },
  props: sharedProps,
  example: ({ title, content }) => (
    <BoardTile title={title} content={content} labels={exampleLabels} />
  ),
});

figma.connect(BoardTile, url, {
  variant: { State: 'Edit' },
  props: sharedProps,
  example: ({ title, content }) => (
    <BoardTile
      title={title}
      content={content}
      labels={exampleLabels}
      editing
      onRemove={() => undefined}
      actions={exampleActions}
    />
  ),
});

figma.connect(BoardTile, url, {
  variant: { State: 'Edit hover' },
  props: sharedProps,
  example: ({ title, content }) => (
    <BoardTile
      title={title}
      content={content}
      labels={exampleLabels}
      editing
      onRemove={() => undefined}
      actions={exampleActions}
    />
  ),
});

figma.connect(BoardTile, url, {
  variant: { State: 'Active' },
  props: sharedProps,
  example: ({ title, content }) => (
    <BoardTile
      title={title}
      content={content}
      labels={exampleLabels}
      editing
      active="move"
      onRemove={() => undefined}
      actions={exampleActions}
    />
  ),
});

figma.connect(BoardTile, url, {
  variant: { State: 'Hidden' },
  props: sharedProps,
  example: ({ title, content }) => (
    <BoardTile
      title={title}
      content={content}
      labels={exampleLabels}
      editing
      hidden
      onRemove={() => undefined}
      actions={exampleActions}
    />
  ),
});
