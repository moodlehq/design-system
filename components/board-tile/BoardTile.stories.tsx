import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import type { BoardTileInteraction, BoardTileProps } from './BoardTile';
import { BoardTile } from './BoardTile';
import { content, editingArgs, frameStyle, labels } from './story-fixtures';

const dashboardHook = (note: string) => ({
  control: false as const,
  description: `Behaviour hook. No Figma property. ${note}`,
  table: { category: 'Dashboard integration' },
});

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
          'Frame for one block on the Flexible dashboard. Figma states are View, Edit, Edit hover, Active, and Hidden. Title is the block name. Content is the block slot. After a drop, the tile moves into place and an outline animation fades. Reduced motion keeps that move and drops the outline. Props under Dashboard integration are behaviour hooks. They are not Figma properties.',
      },
    },
  },
  tags: ['autodocs', 'test', 'beta'],
  argTypes: {
    title: {
      table: { category: 'Figma' },
      description: 'Figma Title.',
    },
    content: {
      control: false,
      table: { category: 'Figma' },
      description: 'Figma Content slot. The tile does not restyle it.',
    },
    editing: {
      control: 'boolean',
      table: { category: 'State' },
      description:
        'Figma State Edit. Shows the move handle, resize handle, remove, and actions.',
    },
    hidden: {
      control: 'boolean',
      table: { category: 'State' },
      description:
        'Figma State Hidden. Dashed border, Hidden from students badge, and dimmed content.',
    },
    active: {
      control: 'select',
      options: ['move', 'resize'],
      table: { category: 'State' },
      description:
        'Figma State Active: 2px primary border and large shadow. No direction arrows. move or resize chooses the handle.',
    },
    children: { control: false, table: { disable: true } },
    label: {
      ...dashboardHook('Accessible name when it should differ from Title.'),
      control: 'text',
    },
    labels: {
      control: false,
      ...dashboardHook('Strings for the controls. Moodle supplies the copy.'),
    },
    actions: {
      control: false,
      ...dashboardHook('Block actions menu, excluding remove.'),
    },
    onRemove: {
      ...dashboardHook('Called when Remove is pressed.'),
    },
    onActivate: {
      ...dashboardHook(
        'Click, Enter, or Space picked a handle up. Set active to that mode and the tile shows its arrows.',
      ),
    },
    onCommit: {
      ...dashboardHook(
        'Second press, Enter, Space, or blur dropped the handle.',
      ),
    },
    onCancel: {
      ...dashboardHook('Escape cancelled the pickup.'),
    },
    onDirection: {
      ...dashboardHook('Arrow key or direction button.'),
    },
    onHandlePointerDown: {
      ...dashboardHook('A handle press moved at least 4px, so it is a drag.'),
    },
    onHeaderDragStart: {
      ...dashboardHook('A header press moved at least 4px.'),
    },
    pointerDragging: {
      ...dashboardHook('Pointer drag is in progress.'),
      control: 'boolean',
    },
    dropped: {
      ...dashboardHook(
        'Plays the move into place. The outline plays with it, except under reduced motion.',
      ),
      control: 'boolean',
    },
    onDropEnd: {
      ...dashboardHook(
        'Outline finished, or reduced motion skipped the outline.',
      ),
    },
    statusMessage: {
      ...dashboardHook('Polite live-region text. The wording stays in Moodle.'),
      control: 'text',
    },
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

export const View: Story = {
  name: 'View',
  parameters: {
    docs: {
      description: {
        story:
          'When people are not editing. Shows the block without handles or editing actions.',
      },
    },
  },
};

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
  name: 'Edit',
  args: editingArgs,
  parameters: {
    docs: {
      description: {
        story:
          'When the dashboard is in edit mode. Shows the move handle, Remove, Block actions, and the resize handle. A click on a handle picks that handle up.',
      },
    },
  },
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
  name: 'Edit hover',
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
          'When the pointer is over the tile. The border changes. Each handle responds only when the pointer is on that handle.',
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
  name: 'Active',
  parameters: {
    docs: {
      description: {
        story:
          'Figma State Active. A 2px primary border and large shadow, with no direction arrows. Arrows appear only after a click, Enter, or Space on a handle.',
      },
    },
  },
  args: {
    ...editingArgs,
    active: 'move',
  },
  play: async ({ canvas }) => {
    const move = canvas.getByRole('button', { name: labels.move });
    await expect(move).toHaveAttribute('aria-pressed', 'true');
    await expect(
      canvas.queryByRole('button', { name: labels.up }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: labels.resize }),
    ).toHaveAttribute('aria-pressed', 'false');
  },
};

export const Hidden: Story = {
  name: 'Hidden',
  parameters: {
    docs: {
      description: {
        story:
          'When the block is hidden from students. Dashed border, Hidden from students badge, and reduced content opacity.',
      },
    },
  },
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
