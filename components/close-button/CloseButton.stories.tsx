import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { CloseButton } from './CloseButton';

const meta = {
  title: 'Components/CloseButton',
  component: CloseButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    'aria-label': {
      control: { type: 'text' },
      description:
        'Required accessible name for the close button. Pass a translated string from the consuming application.',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Close button size.',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Close button disabled state.',
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
    'aria-label': 'Close',
    size: undefined,
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
} satisfies Meta<typeof CloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const showcaseParameters = {
  controls: { disable: true },
  docs: {
    canvas: { sourceState: 'none' as const },
  },
};

const showcaseInlineStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--mds-spacing-sm)',
};

export const Default = {} satisfies Story;

export const Sizes = {
  parameters: showcaseParameters,
  render: (args) => (
    <div style={showcaseInlineStyle}>
      <CloseButton
        {...args}
        size="sm"
        aria-label={`${args['aria-label']} small`}
      />
      <CloseButton
        {...args}
        size="md"
        aria-label={`${args['aria-label']} medium`}
      />
      <CloseButton
        {...args}
        size="lg"
        aria-label={`${args['aria-label']} large`}
      />
    </div>
  ),
  play: async ({ args, canvas }) => {
    const smallButton = canvas.getByRole('button', {
      name: `${args['aria-label']} small`,
    });
    const mediumButton = canvas.getByRole('button', {
      name: `${args['aria-label']} medium`,
    });
    const largeButton = canvas.getByRole('button', {
      name: `${args['aria-label']} large`,
    });

    await expect(smallButton).toBeVisible();
    await expect(mediumButton).toBeVisible();
    await expect(largeButton).toBeVisible();
  },
} satisfies Story;

export const Disabled = {
  parameters: showcaseParameters,
  render: (args) => (
    <div style={showcaseInlineStyle}>
      <CloseButton
        {...args}
        disabled={false}
        aria-label={`${args['aria-label']} default`}
      />
      <CloseButton
        {...args}
        disabled
        aria-label={`${args['aria-label']} disabled`}
      />
    </div>
  ),
  play: async ({ args, canvas }) => {
    const defaultButton = canvas.getByRole('button', {
      name: `${args['aria-label']} default`,
    });
    const disabledButton = canvas.getByRole('button', {
      name: `${args['aria-label']} disabled`,
    });

    await expect(defaultButton).toBeEnabled();
    await expect(disabledButton).toBeDisabled();
  },
} satisfies Story;

export const Focus = {
  name: 'Focus (Tab to toggle)',
  parameters: {
    docs: {
      description: {
        story:
          'To preview focus-visible manually: click anywhere in the canvas, then press Tab until the close button is focused.',
      },
    },
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', {
      name: args['aria-label'] as string,
    });
    await userEvent.click(document.body);
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
} satisfies Story;
