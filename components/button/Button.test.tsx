import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { fuzzComponent } from '../../tests/utils/fuzzComponent';
import { Button, ButtonProps } from './Button';

const fuzzLabelCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'<>.,.?/";

describe('Button: Unit Test', () => {
  it('applies mds class name', () => {
    render(<Button label="Button" />);
    expect(screen.getByRole('button')).toHaveClass('mds-btn');
  });

  it('renders with empty label when accessible name is provided', () => {
    render(<Button label="" aria-label="empty label button" />);
    expect(
      screen.getByRole('button', { name: 'empty label button' }),
    ).toBeInTheDocument();
  });

  it('renders the label correctly', () => {
    render(<Button label="ThisIsAButton" />);
    expect(screen.getByRole('button')).toHaveTextContent('ThisIsAButton');
  });

  it('applies variant prop', () => {
    render(<Button label="Button" variant="secondary" />);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary'); // the class applied by react-bootstrap
  });

  it('handles invalid variant prop as default variant', () => {
    render(<Button label="Button" variant="invalid" />);
    expect(screen.getByRole('button')).toHaveClass('btn-primary'); // the class applied by react-bootstrap
  });

  it('applies the size classes', () => {
    render(<Button label="Button" size="lg" />);
    expect(screen.getByRole('button')).toHaveClass('btn-lg');
  });

  it('respects disabled prop', () => {
    render(<Button label="Button" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('forwards extra props to the button element', () => {
    render(<Button label="Button" data-testid="my-btn" />);
    expect(screen.getByTestId('my-btn')).toBeInTheDocument();
  });

  it('renders and displays label for random props', () => {
    // Property-based test: run the component against many random prop combinations
    // to catch edge cases that example-based tests may miss.
    fuzzComponent(
      Button,
      fc.record<ButtonProps>({
        // Generate labels from an explicit visible-character set (letters, numbers,
        // and symbols) to keep assertions stable while exercising richer inputs.
        label: fc
          .array(fc.constantFrom(...fuzzLabelCharacters.split('')), {
            minLength: 1,
            maxLength: 50,
          })
          .map((chars) => chars.join('')) as unknown as fc.Arbitrary<
          ButtonProps['label']
        >,
        // Restrict to supported variants to validate expected styling behavior.
        variant: fc.constantFrom(
          'primary',
          'secondary',
          'danger',
          'outline-primary',
          'outline-secondary',
          'outline-danger',
        ) as unknown as fc.Arbitrary<ButtonProps['variant']>,
        disabled: fc.boolean(),
        size: fc.option(fc.constantFrom('sm', 'lg'), {
          nil: undefined,
        }) as unknown as fc.Arbitrary<ButtonProps['size']>,
      }),
      // For each generated prop set, assert that the generated label text is present.
      (props: ButtonProps) => props.label,
      // Run 100 generated cases for a good speed/coverage balance.
      { numRuns: 100 },
    );
  });
});
