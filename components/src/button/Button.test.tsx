import { composeStories } from '@storybook/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';
import { fuzzComponent } from '../../../tests/utils/fuzzComponent';
import { Button, ButtonProps } from './Button';
import * as stories from './Button.stories';

// Compose all stories from the Button.stories file for testing
const { Primary } = composeStories(stories);

// Helper to get only valid story components (skip non-stories and metadata)
type StoryComponent = React.FC<Record<string, unknown>> & {
  args?: ButtonProps;
};
const getValidStories = (storiesObj: Record<string, unknown>) =>
  Object.entries(composeStories(storiesObj)).filter(
    ([key, Story]) =>
      key !== 'default' && key !== '__esModule' && typeof Story === 'function',
  ) as [string, StoryComponent][];

// --- Storybook Stories Test Suite ---
describe('Button (Storybook stories)', () => {
  // Dynamically test all valid stories for rendering and label
  getValidStories(stories).forEach(([storyName, Story]) => {
    it(`renders ${storyName} button with default args`, () => {
      // Render the story as a component
      render(<Story />);
      // Use the label from story args, fallback to 'Button' if not set
      const label = (Story.args && Story.args.label) || 'Button';
      // Check that the label is rendered
      expect(screen.getByText(label)).toBeInTheDocument();
      // Check for accessible role
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  // Explicit tests for the Primary story with custom props and edge cases
  it('renders Primary button with overridden label', () => {
    // Test that the label prop overrides the default label
    render(<Primary label="Hello world" />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    // Test that the onClick handler is called when the button is clicked
    const handleClick = vi.fn();
    render(<Primary onClick={handleClick} />);
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    // Test that the onClick handler is not called when the button is disabled
    const handleClick = vi.fn();
    render(<Primary disabled onClick={handleClick} />);
    screen.getByRole('button').click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies the correct variant and size classes', () => {
    // Test that the correct CSS classes are applied for variant and size
    render(<Primary variant="danger" size="lg" />);
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/btn-danger/);
    expect(btn.className).toMatch(/btn-lg/);
  });

  it('forwards aria-label and other aria props', () => {
    // Test that aria-label and other aria props are forwarded to the button
    render(<Primary aria-label="custom label" />);
    expect(screen.getByLabelText('custom label')).toBeInTheDocument();
  });

  it('renders with the correct type attribute', () => {
    // Test that the type attribute is set correctly
    render(<Primary type="submit" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('forwards extra props to the button element', () => {
    // Test that extra props like data-testid are forwarded to the button
    render(<Primary data-testid="my-btn" />);
    expect(screen.getByTestId('my-btn')).toBeInTheDocument();
  });

  it('respects disabled prop', () => {
    render(<Primary disabled />);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('renders with empty label', () => {
    render(<Primary label="" />);
    // Should still render a button
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with long label', () => {
    const longLabel = 'L'.repeat(100);
    render(<Primary label={longLabel} />);
    expect(screen.getByText(longLabel)).toBeInTheDocument();
  });

  it('renders with special characters in label', () => {
    const special = "!@#$%^&*()_+-=[]{}|;:'<>,.?/";
    render(<Primary label={special} />);
    expect(screen.getByText(special)).toBeInTheDocument();
  });
});

// --- Fuzz Testing Suite ---
describe('Fuzz Button', () => {
  // Fuzz with each valid story's args as a seed to ensure real-world coverage
  getValidStories(stories).forEach(([storyName, Story]) => {
    if (Story.args) {
      it(`fuzzes Button with story args for ${storyName}`, () => {
        // Use the story's args as a fixed input for the fuzzer to ensure all real-world story props are tested
        fuzzComponent(
          Button,
          fc.constant(Story.args),
          (props: ButtonProps) => props.label,
          { numRuns: 1 },
        );
      });
    }
  });

  // Fuzz with 100 random prop combinations for broad edge case coverage
  it('should render and display label for random props', () => {
    // Use fast-check to generate 100 random prop combinations for Button
    fuzzComponent(
      Button,
      fc.record<ButtonProps>({
        label: fc.stringOf(
          fc.constantFrom(
            ...("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'<>.,.?/".split(
              '',
            ) as [string, ...string[]]),
          ),
          { minLength: 1, maxLength: 50 },
        ),
        variant: fc.constantFrom(
          'primary',
          'secondary',
          'danger',
          'outline-primary',
          'outline-secondary',
          'outline-danger',
        ) as unknown as fc.Arbitrary<ButtonProps['variant']>,
        size: fc.option(fc.constantFrom('sm', 'lg'), {
          nil: undefined,
        }) as unknown as fc.Arbitrary<ButtonProps['size']>,
        disabled: fc.boolean(),
      }),
      (props: ButtonProps) => props.label,
      { numRuns: 100 },
    );
  });
});
