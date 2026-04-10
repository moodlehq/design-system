import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';
import { fuzzComponent } from '../../tests/utils/fuzzComponent';
import { Button, type ButtonProps } from './Button';

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
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });

  it('handles invalid variant prop as default variant', () => {
    render(<Button label="Button" variant="invalid" />);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });

  it('applies the size classes', () => {
    render(<Button label="Button" size="lg" />);
    expect(screen.getByRole('button')).toHaveClass('btn-lg');
  });

  it('renders startIcon before the label and endIcon after the label', () => {
    render(
      <Button
        label="Button"
        startIcon={<i data-testid="start-icon" aria-hidden="true" />}
        endIcon={
          <svg data-testid="end-icon" aria-hidden="true" viewBox="0 0 1 1" />
        }
      />,
    );

    const button = screen.getByRole('button');
    const startIcon = screen.getByTestId('start-icon');
    const endIcon = screen.getByTestId('end-icon');

    expect(button).toContainElement(startIcon);
    expect(button).toContainElement(endIcon);
    expect(
      startIcon.compareDocumentPosition(endIcon) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('supports icon-only usage with an aria-label', () => {
    render(
      <Button
        startIcon={<i data-testid="start-icon" aria-hidden="true" />}
        aria-label="Delete"
      />,
    );

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/^\s*$/);
  });

  it('renders only startIcon with no endIcon markup when endIcon is omitted', () => {
    render(
      <Button
        label="Save"
        startIcon={<i data-testid="start-icon" aria-hidden="true" />}
      />,
    );

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument();
  });

  it('renders only endIcon with no startIcon markup when startIcon is omitted', () => {
    render(
      <Button
        label="Next"
        endIcon={<i data-testid="end-icon" aria-hidden="true" />}
      />,
    );

    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument();
  });

  it('renders no icon elements when neither startIcon nor endIcon is provided', () => {
    render(<Button label="Submit" />);

    const button = screen.getByRole('button');
    const elementChildren = Array.from(button.childNodes).filter(
      (n) => n.nodeType === Node.ELEMENT_NODE,
    );
    expect(elementChildren).toHaveLength(0);
  });

  it('accessible name matches only the label when startIcon is aria-hidden', () => {
    render(
      <Button
        label="Download"
        startIcon={<i className="fa-solid fa-download" aria-hidden="true" />}
      />,
    );

    // Accessible name must be exactly the label — aria-hidden icon must not contribute.
    expect(
      screen.getByRole('button', { name: 'Download' }),
    ).toBeInTheDocument();
  });

  it('accepts only <i> and <svg> elements as icons', () => {
    // IconElement type is enforced at compile time; this test asserts the
    // rendered tag names are what the type constraint documents them to be.
    render(
      <Button
        label="Edit"
        startIcon={<i data-testid="start-icon" aria-hidden="true" />}
        endIcon={
          <svg data-testid="end-icon" aria-hidden="true" viewBox="0 0 1 1" />
        }
      />,
    );

    expect(screen.getByTestId('start-icon').tagName).toBe('I');
    expect(screen.getByTestId('end-icon').tagName).toBe('svg');
  });

  it('logs a console.error and drops non-<i>/<svg> elements passed as icons at runtime', () => {
    // TypeScript prevents this at compile time, but JS consumers can bypass
    // the type. The runtime guard must log an error and drop the element.
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Button
        label="Edit"
        startIcon={
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (<span data-testid="bad-start-icon" />) as any
        }
        endIcon={
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (<div data-testid="bad-end-icon" />) as any
        }
      />,
    );

    expect(errorSpy).toHaveBeenCalledTimes(2);
    expect(errorSpy.mock.calls[0][0]).toMatch(/startIcon/);
    expect(errorSpy.mock.calls[1][0]).toMatch(/endIcon/);
    expect(screen.queryByTestId('bad-start-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('bad-end-icon')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Edit');

    errorSpy.mockRestore();
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

  it('warns in dev when no label and no aria-label', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation();
    render(<Button />);
    expect(warnSpy).toHaveBeenCalledWith(
      'Button: label prop or aria-label attribute is required for accessibility.',
    );
    warnSpy.mockRestore();
  });
});
