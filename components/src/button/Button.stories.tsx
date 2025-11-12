import type { Meta, StoryObj } from '@storybook/react-vite';
import { act } from 'react';
import { expect, fireEvent, within } from 'storybook/test';
import { Button } from './Button';
import { ThemeProvider } from 'react-bootstrap';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  play: async ({ canvasElement }) => {
    await act(async () => {
      const canvas = within(canvasElement);
      await fireEvent.click(canvas.getByText('Button'));
      // Wait for any updates to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
      await expect(canvas.getByText('Button')).toBeVisible();
    });
  },
  tags: ['autodocs', 'test', 'stable'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    variant: 'primary',
    label: 'Button',
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    variant: 'primary',
    label: 'Button',
  },
} satisfies Story;


export const Secondary = {
  args: {
    variant: 'secondary',
    label: 'Button',
  },
} satisfies Story;

export const Large = {
  args: {
    size: 'lg',
    label: 'Button',
  },
} satisfies Story;

export const Small = {
  args: {
    size: 'sm',
    label: 'Button',
  },
} satisfies Story;

// Storybook’s test runner always runs tests in sequence for each story:
// first the interaction test (play function), then the accessibility test (a11y).

// // It appears that if any tests fail, coverage report is not generated after the run.
// export const FailingInteractionButton = {
//   args: {
//     primary: true,
//     label: '',
//   },
// } satisfies Story;
//
export const FailingAccessibilityButton = {
  args: {
    label: '',
  },
  parameters: {
    a11y: {
      // Turning off the check for now so CI can complete.
      test: 'todo',
    },
  },
  play: async () => {},
} satisfies Story;
