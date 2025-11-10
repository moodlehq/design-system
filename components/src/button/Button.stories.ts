import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fireEvent, fn, within } from 'storybook/test';
import { Button } from './Button';
import { act } from 'react';

const meta = {
  component: Button,
  title: 'Components/Button',
  parameters: {
    layout: 'centered',
  },
  play: async ({ canvasElement }) => {
    await act(async() => {
      const canvas = within(canvasElement);
      // Simulates clicking the button
      await fireEvent.click(canvas.getByText('Button'));
      await expect(canvas.getByText('Button')).toBeVisible();
    });


  },
  tags: ['autodocs', 'test', 'stable'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    primary: true,
    label: 'Button',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {} satisfies Story;

export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
} satisfies Story;

export const Secondary = {
  args: {
    label: 'Button',
  },
} satisfies Story;

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
} satisfies Story;

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulates clicking the button
    await fireEvent.click(canvas.getByText('Button'));
    await expect(canvas.getByText('Button').classList).toContain('storybook-button--small');
  },
} satisfies Story;

// // It appears that if any tests fail, coverage report is not generated after the run.
// export const FailingInteractionButton = {
//   args: {
//     primary: true,
//     label: '',
//   },
// } satisfies Story;
//
// // It appears that if the interaction test fails, the accessibility test is not run thus assumed to pass tests.
// export const FailingAccessibilityButton = {
//   args: {
//     primary: true,
//     label: '',
//   },
//   play: async () => {},
// } satisfies Story;
