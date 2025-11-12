/// <reference types="vitest" />
import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as stories from './Button.stories';

const { Primary, Secondary, Large, Small } = composeStories(stories);

describe('Button (Storybook stories)', () => {
  it('renders Primary button with default args', () => {
    render(<Primary />);
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('renders Secondary button with default args', () => {
    render(<Secondary />);
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('renders Large button with default args', () => {
    render(<Large />);
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('renders Small button with default args', () => {
    render(<Small />);
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('renders Primary button with overridden label', () => {
    render(<Primary label="Hello world" />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});
