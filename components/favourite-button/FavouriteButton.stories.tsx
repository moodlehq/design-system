import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect } from 'storybook/test';
import { FavouriteButton } from './FavouriteButton';

const meta = {
  title: 'Components/FavouriteButton',
  component: FavouriteButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    selected: {
      control: { type: 'boolean' },
      description:
        'Whether the item is currently selected as a favourite. Controls the filled/outlined star icon and `aria-pressed`.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'aria-label': {
      control: { type: 'text' },
      description:
        'Required accessible name for the button. Pass a translated string that reflects the current state, e.g. "Add to favourites" or "Remove from favourites".',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button and prevents interaction.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      description:
        'Callback fired when the button is clicked. Receives the native mouse event.',
      table: {
        type: {
          summary: '(event: React.MouseEvent<HTMLButtonElement>) => void',
        },
      },
    },
  },
  args: {
    selected: false,
    'aria-label': 'Add to favourites',
    disabled: false,
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', {
      name: args['aria-label'] as string,
    });
    await userEvent.click(button);
    await new Promise((resolve) => setTimeout(resolve, 0));
    await expect(button).toBeVisible();
  },
} satisfies Meta<typeof FavouriteButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const showcaseParameters = {
  controls: { disable: true },
  docs: {
    canvas: { sourceState: 'none' as const },
  },
};

const showcaseStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--mds-spacing-sm)',
};

export const Default = {
  render: function Render(args) {
    const [{ selected }, updateArgs] = useArgs<typeof args>();
    return (
      <FavouriteButton
        {...args}
        selected={selected}
        onClick={() => updateArgs({ selected: !selected })}
      />
    );
  },
} satisfies Story;

export const Selected = {
  parameters: showcaseParameters,
  render: () => (
    <div style={showcaseStyle}>
      <FavouriteButton aria-label="Add to favourites" />
      <FavouriteButton aria-label="Remove from favourites" selected />
    </div>
  ),
  play: async ({ canvas }) => {
    const unselectedButton = canvas.getByRole('button', {
      name: 'Add to favourites',
    });
    const selectedButton = canvas.getByRole('button', {
      name: 'Remove from favourites',
    });

    await expect(unselectedButton).toHaveAttribute('aria-pressed', 'false');
    await expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
  },
} satisfies Story;

export const Disabled = {
  parameters: showcaseParameters,
  render: () => (
    <div style={showcaseStyle}>
      <FavouriteButton aria-label="Add to favourites" disabled />
      <FavouriteButton aria-label="Remove from favourites" selected disabled />
    </div>
  ),
  play: async ({ canvas }) => {
    const disabledButton = canvas.getByRole('button', {
      name: 'Add to favourites',
    });
    const disabledSelectedButton = canvas.getByRole('button', {
      name: 'Remove from favourites',
    });

    await expect(disabledButton).toBeDisabled();
    await expect(disabledButton).toHaveAttribute('aria-pressed', 'false');
    await expect(disabledSelectedButton).toBeDisabled();
    await expect(disabledSelectedButton).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  },
} satisfies Story;
