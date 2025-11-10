// TODO: This is a sample test file for a Button component using Storybook stories and Vitest but not currently run.
import { composeStories } from '@storybook/react-vite';
import { screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import * as stories from './Button.stories'; // 👈 Our stories imported here.

const { Primary, Secondary, Small } = composeStories(stories);

test('renders primary button with default args', async () => {
  await Primary.run();
  const buttonElement = screen.getByText(
    'Text coming from args in stories file!',
  );

  await waitFor(() => {
    expect(buttonElement).not.toBeNull();
  });
});

test('renders secondary button with default args', async () => {
  await Secondary.run();
  const buttonElement = screen.getByText(
    'Text coming from args in stories file!',
  );
  await waitFor(() => {
    expect(buttonElement).not.toBeNull();
  });
});

test('renders primary button with overridden props', async () => {
  // You can override props by passing them in the context argument of the run function
  await Primary.run({ args: { ...Primary.args, label: 'Hello world' } });
  const buttonElement = screen.getByText(/Hello world/i);
  await waitFor(() => {
    expect(buttonElement).not.toBeNull();
  });
});

test('renders small button with default args', async () => {
  await Small.run();
  const buttonElement = screen.getByText(
    'Text coming from args in stories file!',
  );

  await waitFor(() => {
    expect(buttonElement).not.toBeNull();
  });
});
