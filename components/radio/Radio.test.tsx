import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';
import { fuzzComponent } from '../../tests/utils/fuzzComponent';
import { type RadioProps, Radio } from './Radio';

describe('Radio: Unit Test', () => {
  it('applies mds-form-check class to the root wrapper element', () => {
    const { container } = render(<Radio label="Option" />);
    expect(container.firstChild).toHaveClass('mds-form-check');
  });

  it('applies form-check class to the wrapper when hideLabel is false', () => {
    const { container } = render(<Radio label="Option" />);
    expect(container.firstChild).toHaveClass('form-check');
  });

  it('does not apply form-check class to the wrapper when hideLabel is true', () => {
    const { container } = render(<Radio label="Option" hideLabel />);
    expect(container.firstChild).not.toHaveClass('form-check');
  });

  it('applies mds-form-check-input class to the input', () => {
    render(<Radio label="Option" />);
    expect(screen.getByRole('radio')).toHaveClass('mds-form-check-input');
  });

  it('renders the label text', () => {
    render(<Radio label="My option" />);
    expect(screen.getByText('My option')).toBeInTheDocument();
  });

  it('associates the label with the input via htmlFor', () => {
    render(<Radio label="My option" />);
    expect(screen.getByLabelText('My option')).toBeInTheDocument();
  });

  it('uses a provided id on the input', () => {
    render(<Radio label="Option" id="my-radio" />);
    expect(screen.getByRole('radio')).toHaveAttribute('id', 'my-radio');
  });

  it('generates an id when none is provided so the label association still works', () => {
    render(<Radio label="Option" />);
    const input = screen.getByRole('radio');
    const id = input.getAttribute('id');
    expect(id).toBeTruthy();
    expect(screen.getByLabelText('Option')).toBe(input);
  });

  it('respects the disabled prop', () => {
    render(<Radio label="Option" disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('forwards extra props to the input element', () => {
    render(<Radio label="Option" data-testid="my-radio" />);
    expect(screen.getByTestId('my-radio')).toBeInTheDocument();
  });

  it('forwards the name prop to the input', () => {
    render(<Radio label="Option" name="my-group" />);
    expect(screen.getByRole('radio')).toHaveAttribute('name', 'my-group');
  });

  it('forwards the value prop to the input', () => {
    render(<Radio label="Option" value="my-value" />);
    expect(screen.getByRole('radio')).toHaveAttribute('value', 'my-value');
  });

  it('forwards the required prop to the input', () => {
    render(<Radio label="Option" required />);
    expect(screen.getByRole('radio')).toBeRequired();
  });

  it('renders as checked when defaultChecked is true', () => {
    render(<Radio label="Option" defaultChecked />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('forwards a ref to the underlying input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Radio label="Option" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies className to the wrapper', () => {
    const { container } = render(<Radio label="Option" className="extra" />);
    expect(container.firstChild).toHaveClass('extra');
  });

  describe('invalid state', () => {
    it('applies is-invalid class when invalid prop is set without feedback', () => {
      render(<Radio label="Option" invalid />);
      expect(screen.getByRole('radio')).toHaveClass('is-invalid');
    });

    it('sets aria-invalid when invalid prop is set without feedback', () => {
      render(<Radio label="Option" invalid />);
      expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not render feedback text when invalid is set without invalidFeedback', () => {
      render(<Radio label="Option" invalid />);
      expect(screen.queryByRole('note')).not.toBeInTheDocument();
    });

    it('applies is-invalid class when both invalid and invalidFeedback are provided', () => {
      render(<Radio label="Option" invalid invalidFeedback="Required" />);
      expect(screen.getByRole('radio')).toHaveClass('is-invalid');
    });

    it('sets aria-invalid when both invalid and invalidFeedback are provided', () => {
      render(<Radio label="Option" invalid invalidFeedback="Required" />);
      expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders the feedback text when both invalid and invalidFeedback are provided', () => {
      render(<Radio label="Option" invalid invalidFeedback="Required" />);
      expect(screen.getByText('Required')).toBeInTheDocument();
    });

    it('sets aria-describedby on the input pointing to the feedback element', () => {
      render(
        <Radio
          id="test-radio"
          label="Option"
          invalid
          invalidFeedback="Required"
        />,
      );
      expect(screen.getByRole('radio')).toHaveAttribute(
        'aria-describedby',
        'test-radio-feedback',
      );
    });

    it('does not set aria-describedby when invalid is set without feedback', () => {
      render(<Radio label="Option" invalid />);
      expect(screen.getByRole('radio')).not.toHaveAttribute('aria-describedby');
    });

    it('does not apply is-invalid when only invalidFeedback is provided without invalid', () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Radio label="Option" invalidFeedback="Required" />);
      expect(screen.getByRole('radio')).not.toHaveClass('is-invalid');
      vi.restoreAllMocks();
    });

    it('does not render feedback text when only invalidFeedback is provided without invalid', () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Radio label="Option" invalidFeedback="Required" />);
      expect(screen.queryByText('Required')).not.toBeInTheDocument();
      vi.restoreAllMocks();
    });

    it('warns in development when invalidFeedback is provided without invalid', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Radio label="Option" invalidFeedback="Required" />);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining(
          'invalidFeedback is provided without invalid={true}',
        ),
      );
      vi.restoreAllMocks();
    });
  });

  describe('hideLabel', () => {
    it('hides the visible label element', () => {
      render(<Radio label="Option" hideLabel />);
      expect(screen.queryByText('Option')).not.toBeInTheDocument();
    });

    it('uses the aria-label prop as the accessible name', () => {
      render(<Radio hideLabel aria-label="Custom name" />);
      expect(screen.getByRole('radio')).toHaveAccessibleName('Custom name');
    });

    it('falls back to the label prop as aria-label when no aria-label is given', () => {
      render(<Radio label="Option" hideLabel />);
      expect(screen.getByRole('radio')).toHaveAccessibleName('Option');
    });

    it('applies is-invalid when hideLabel and invalid are both set', () => {
      render(<Radio label="Option" hideLabel invalid />);
      expect(screen.getByRole('radio')).toHaveClass('is-invalid');
    });

    it('sets aria-invalid when hideLabel and invalid are both set', () => {
      render(<Radio label="Option" hideLabel invalid />);
      expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not render feedback text when hideLabel and invalidFeedback are both set', () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <Radio label="Option" hideLabel invalid invalidFeedback="Required" />,
      );
      expect(screen.queryByText('Required')).not.toBeInTheDocument();
      vi.restoreAllMocks();
    });

    it('warns in development when hideLabel is true and no accessible name is available', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Radio hideLabel />);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining(
          'label prop or aria-label attribute is required',
        ),
      );
      vi.restoreAllMocks();
    });

    it('warns in development when hideLabel and invalidFeedback are both set', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Radio label="Option" hideLabel invalidFeedback="Required" />);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining(
          'invalidFeedback is ignored when hideLabel is true',
        ),
      );
      vi.restoreAllMocks();
    });

    it('applies mds-form-check class to the wrapper even when hideLabel is true', () => {
      const { container } = render(<Radio label="Option" hideLabel />);
      expect(container.firstChild).toHaveClass('mds-form-check');
    });
  });

  describe('label warnings', () => {
    it('warns in development when label is not provided and hideLabel is false', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Radio />);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining(
          'label prop is required when hideLabel is false',
        ),
      );
      vi.restoreAllMocks();
    });
  });

  describe('fuzz', () => {
    // Restrict to visible characters so getByText can match rendered output
    // (whitespace-only strings pass through the component but don't assert usefully).
    const visibleChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'<>,.?/";
    const visibleString = fc
      .array(fc.constantFrom(...visibleChars.split('')), {
        minLength: 1,
        maxLength: 100,
      })
      .map((chars) => chars.join(''));

    it('renders label text for arbitrary label strings', () => {
      // Radio has no character restrictions on label — fuzz confirms it renders
      // without throwing and always surfaces the text in the DOM.
      fuzzComponent(
        Radio,
        fc.record<RadioProps>({
          label: visibleString,
          name: fc.constant('fuzz-group'),
          invalid: fc.constant(false),
        }) as unknown as fc.Arbitrary<RadioProps>,
        (props: RadioProps) => props.label as string,
        { numRuns: 100 },
      );
    });

    it('renders feedback text for arbitrary invalidFeedback strings', () => {
      // invalidFeedback is caller-supplied and untransformed — confirm arbitrary
      // strings always appear in the DOM when invalid and a label are also present.
      fc.assert(
        fc.property(visibleString, visibleString, (label, feedback) => {
          const { unmount } = render(
            <Radio label={label} invalid invalidFeedback={feedback} />,
          );
          expect(screen.getByText(feedback)).toBeInTheDocument();
          unmount();
        }),
        { numRuns: 100 },
      );
    });
  });
});
