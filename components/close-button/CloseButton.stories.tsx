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

const matrixContainerStyle = {
  display: 'grid',
  gap: 'var(--mds-spacing-xs)',
  justifyContent: 'center',
};

const matrixGridStyle = {
  display: 'grid',
  gridTemplateColumns: '7rem repeat(3, 3rem)',
  alignItems: 'center',
  columnGap: 'var(--mds-spacing-xs)',
  rowGap: 'var(--mds-spacing-xxs)',
  width: 'max-content',
};

const matrixLabelCellStyle = {
  color: 'var(--mds-text-subtle)',
  fontSize: 'var(--mds-font-size-paragraph-small)',
  fontFamily: 'var(--mds-font-family-base)',
  fontWeight: 'var(--mds-font-weight-medium)',
};

const matrixCenteredCellStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const matrixStates = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover' },
  { key: 'focus-visible', label: 'Focus visible' },
  { key: 'disabled', label: 'Disabled' },
] as const;

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

export const StateMatrix = {
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      canvas: { sourceState: 'none' as const },
      description: {
        story:
          'State matrix for visual regression review across CloseButton sizes. Hover and focus-visible cells are driven by the Storybook pseudo-states addon.',
      },
    },
    pseudo: {
      hover: "[data-matrix-state='hover'] .mds-close-button",
      focusVisible: "[data-matrix-state='focus-visible'] .mds-close-button",
    },
  },
  render: () => (
    <div style={matrixContainerStyle}>
      <div style={matrixGridStyle}>
        <span style={matrixLabelCellStyle}>State</span>
        <span style={{ ...matrixLabelCellStyle, textAlign: 'center' }}>
          Small
        </span>
        <span style={{ ...matrixLabelCellStyle, textAlign: 'center' }}>
          Medium
        </span>
        <span style={{ ...matrixLabelCellStyle, textAlign: 'center' }}>
          Large
        </span>
      </div>
      {matrixStates.map((state) => {
        const isDisabled = state.key === 'disabled';
        return (
          <div
            key={state.key}
            data-matrix-state={state.key}
            style={matrixGridStyle}
          >
            <span style={matrixLabelCellStyle}>{state.label}</span>
            <div style={matrixCenteredCellStyle}>
              <CloseButton
                aria-label={`Close small ${state.label}`}
                size="sm"
                disabled={isDisabled}
              />
            </div>
            <div style={matrixCenteredCellStyle}>
              <CloseButton
                aria-label={`Close medium ${state.label}`}
                size="md"
                disabled={isDisabled}
              />
            </div>
            <div style={matrixCenteredCellStyle}>
              <CloseButton
                aria-label={`Close large ${state.label}`}
                size="lg"
                disabled={isDisabled}
              />
            </div>
          </div>
        );
      })}
    </div>
  ),
  play: async ({ canvas }) => {
    const smallEnabled = canvas.getByRole('button', {
      name: 'Close small Default',
    });
    const mediumEnabled = canvas.getByRole('button', {
      name: 'Close medium Default',
    });
    const largeEnabled = canvas.getByRole('button', {
      name: 'Close large Default',
    });
    const smallDisabled = canvas.getByRole('button', {
      name: 'Close small Disabled',
    });
    const mediumDisabled = canvas.getByRole('button', {
      name: 'Close medium Disabled',
    });
    const largeDisabled = canvas.getByRole('button', {
      name: 'Close large Disabled',
    });

    await expect(smallEnabled).toBeEnabled();
    await expect(smallEnabled).toHaveClass('mds-close-button--sm');
    await expect(mediumEnabled).toBeEnabled();
    await expect(mediumEnabled).toHaveClass('mds-close-button--md');
    await expect(largeEnabled).toBeEnabled();
    await expect(largeEnabled).toHaveClass('mds-close-button--lg');

    await expect(smallDisabled).toBeDisabled();
    await expect(smallDisabled).toHaveClass('mds-close-button--sm');
    await expect(mediumDisabled).toBeDisabled();
    await expect(mediumDisabled).toHaveClass('mds-close-button--md');
    await expect(largeDisabled).toBeDisabled();
    await expect(largeDisabled).toHaveClass('mds-close-button--lg');
  },
} satisfies Story;
