import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';
import { fuzzComponent } from '../../tests/utils/fuzzComponent';
import { Button, type ButtonProps } from './Button';

const fuzzLabelCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'<>.,.?/";

describe('Button: Unit Test', () => {
  describe('rendering', () => {
    it('applies the mds-btn class name', () => {
      render(<Button label="Button" />);
      expect(screen.getByRole('button')).toHaveClass('mds-btn');
    });

    it('renders the label correctly', () => {
      render(<Button label="ThisIsAButton" />);
      expect(screen.getByRole('button')).toHaveTextContent('ThisIsAButton');
    });

    it('renders with empty label when accessible name is provided', () => {
      render(<Button label="" aria-label="empty label button" />);
      expect(
        screen.getByRole('button', { name: 'empty label button' }),
      ).toBeInTheDocument();
    });

    it('renders as disabled when disabled is true', () => {
      render(<Button label="Button" disabled />);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('variant', () => {
    it('applies the selected variant class', () => {
      render(<Button label="Button" variant="secondary" />);
      expect(screen.getByRole('button')).toHaveClass('btn-secondary');
    });

    it('applies the ghost variant class', () => {
      render(<Button label="Button" variant="ghost" />);
      expect(screen.getByRole('button')).toHaveClass('btn-ghost');
    });

    it('falls back to primary and warns in development for an invalid variant', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Button label="Button" variant="invalid" />);
      expect(screen.getByRole('button')).toHaveClass('btn-primary');
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('[MDS Button] Invalid variant "invalid"'),
      );
      warnSpy.mockRestore();
    });
  });

  describe('size', () => {
    it('applies the selected size class', () => {
      render(<Button label="Button" size="lg" />);
      expect(screen.getByRole('button')).toHaveClass('mds-btn--size-lg');
    });

    it('applies mds-btn--size-md by default and when size is explicitly md', () => {
      const { rerender } = render(<Button label="Button" size="md" />);
      const explicitMdClassName = screen.getByRole('button').className;
      expect(screen.getByRole('button')).toHaveClass('mds-btn--size-md');

      rerender(<Button label="Button" />);
      const defaultClassName = screen.getByRole('button').className;
      expect(screen.getByRole('button')).toHaveClass('mds-btn--size-md');
      expect(defaultClassName).toBe(explicitMdClassName);
    });

    it('falls back to md and warns in development for an invalid size', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Button label="Button" size="invalid" />);
      expect(screen.getByRole('button')).toHaveClass('mds-btn--size-md');
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('[MDS Button] Invalid size "invalid"'),
      );
      warnSpy.mockRestore();
    });
  });

  describe('icons', () => {
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

    it('renders both startIcon and endIcon simultaneously', () => {
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
      expect(button).toContainElement(screen.getByTestId('start-icon'));
      expect(button).toContainElement(screen.getByTestId('end-icon'));
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

    it('applies mds-btn--icon-only class when rendering icon-only', () => {
      render(
        <Button
          startIcon={<i data-testid="start-icon" aria-hidden="true" />}
          aria-label="Delete"
        />,
      );

      expect(screen.getByRole('button')).toHaveClass('mds-btn--icon-only');
    });

    it('accessible name matches only the label when startIcon is aria-hidden', () => {
      render(
        <Button
          label="Download"
          startIcon={<i className="fa-solid fa-download" aria-hidden="true" />}
        />,
      );

      expect(
        screen.getByRole('button', { name: 'Download' }),
      ).toBeInTheDocument();
    });

    it('accepts only <i> and <svg> elements as icons', () => {
      const { rerender } = render(
        <Button
          label="Edit"
          startIcon={<i data-testid="start-icon" aria-hidden="true" />}
        />,
      );

      expect(screen.getByTestId('start-icon').tagName).toBe('I');

      rerender(
        <Button
          label="Edit"
          endIcon={
            <svg data-testid="end-icon" aria-hidden="true" viewBox="0 0 1 1" />
          }
        />,
      );

      expect(screen.getByTestId('end-icon').tagName).toBe('svg');
    });

    it('logs a console.error and drops non-<i>/<svg> elements passed as icons at runtime', () => {
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
  });

  describe('HTML attributes', () => {
    it('defaults type prop to "button"', () => {
      render(<Button label="Button" />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('accepts custom type prop', () => {
      render(<Button label="Submit" type="submit" />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('forwards the className prop and appends it to computed classes', () => {
      render(<Button label="Button" className="custom-class" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('mds-btn');
      expect(button).toHaveClass('btn');
    });

    it('forwards ref to the button element', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Button label="Button" ref={ref} />);
      expect(ref.current).toBe(screen.getByRole('button'));
    });

    it('forwards extra props to the button element', () => {
      render(<Button label="Button" data-testid="my-btn" />);
      expect(screen.getByTestId('my-btn')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('warns in dev when no label, aria-label, or aria-labelledby', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation();
      render(<Button />);
      expect(warnSpy).toHaveBeenCalledWith(
        'Button: provide a label, aria-label, or aria-labelledby for accessibility.',
      );
      warnSpy.mockRestore();
    });

    it('warns in dev when no label and no icons (visually empty)', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation();
      render(<Button />);
      expect(warnSpy).toHaveBeenCalledWith(
        'Button: provide a label or icon so the button does not render as visually empty.',
      );
      warnSpy.mockRestore();
    });

    it('does not warn about visual emptiness when label is provided', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation();
      render(<Button label="Button" />);
      expect(warnSpy).not.toHaveBeenCalledWith(
        'Button: provide a label or icon so the button does not render as visually empty.',
      );
      warnSpy.mockRestore();
    });

    it('does not warn about visual emptiness when icon is provided', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation();
      render(
        <Button startIcon={<i aria-hidden="true" />} aria-label="Action" />,
      );
      expect(warnSpy).not.toHaveBeenCalledWith(
        'Button: provide a label or icon so the button does not render as visually empty.',
      );
      warnSpy.mockRestore();
    });

    it('does not warn when only aria-label is provided', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation();
      render(<Button aria-label="Close" />);
      expect(warnSpy).not.toHaveBeenCalledWith(
        'Button: provide a label, aria-label, or aria-labelledby for accessibility.',
      );
      warnSpy.mockRestore();
    });

    it('does not warn when only aria-labelledby is provided', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation();
      render(<Button aria-labelledby="some-id" />);
      expect(warnSpy).not.toHaveBeenCalledWith(
        'Button: provide a label, aria-label, or aria-labelledby for accessibility.',
      );
      warnSpy.mockRestore();
    });

    it('warns when aria-label is an empty string', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation();
      render(<Button aria-label="" />);
      expect(warnSpy).toHaveBeenCalledWith(
        'Button: provide a label, aria-label, or aria-labelledby for accessibility.',
      );
      warnSpy.mockRestore();
    });

    it('warns when aria-labelledby is an empty string', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation();
      render(<Button aria-labelledby="" />);
      expect(warnSpy).toHaveBeenCalledWith(
        'Button: provide a label, aria-label, or aria-labelledby for accessibility.',
      );
      warnSpy.mockRestore();
    });
  });

  describe('property-based testing', () => {
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
            'ghost',
            'outline-primary',
            'outline-secondary',
            'outline-danger',
          ) as unknown as fc.Arbitrary<ButtonProps['variant']>,
          disabled: fc.boolean(),
          size: fc.option(fc.constantFrom('sm', 'md', 'lg'), {
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
});
