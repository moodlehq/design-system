import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { type JSX } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fuzzComponent } from '../../tests/utils/fuzzComponent';
import { type CheckboxProps, Checkbox } from './Checkbox';

describe('Checkbox: Unit Test', () => {
  const expectDevWarning = (
    ui: JSX.Element,
    expectedMessageSubstring: string,
  ) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(ui);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining(expectedMessageSubstring),
    );
    vi.restoreAllMocks();
  };

  const renderWithWarnSuppressed = (ui: JSX.Element) => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(ui);
    vi.restoreAllMocks();
  };

  it.each([
    {
      name: 'applies form-check class when hideLabel is false',
      props: {} as Partial<CheckboxProps>,
      hasFormCheck: true,
    },
    {
      name: 'does not apply form-check class when hideLabel is true',
      props: { hideLabel: true } as Partial<CheckboxProps>,
      hasFormCheck: false,
    },
  ])('$name', ({ props, hasFormCheck }) => {
    const { container } = render(<Checkbox label="Option" {...props} />);
    expect(container.firstChild).toHaveClass('mds-checkbox');
    if (hasFormCheck) {
      expect(container.firstChild).toHaveClass('form-check');
    } else {
      expect(container.firstChild).not.toHaveClass('form-check');
    }
  });

  it('applies mds-checkbox-input class to the input', () => {
    render(<Checkbox label="Option" />);
    expect(screen.getByRole('checkbox')).toHaveClass('mds-checkbox-input');
  });

  it('renders the label text', () => {
    render(<Checkbox label="My option" />);
    expect(screen.getByText('My option')).toBeInTheDocument();
  });

  it('associates the label with the input via htmlFor', () => {
    render(<Checkbox label="My option" />);
    expect(screen.getByLabelText('My option')).toBeInTheDocument();
  });

  it('uses a provided id on the input', () => {
    render(<Checkbox label="Option" id="my-checkbox" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'my-checkbox');
  });

  it('generates an id when none is provided so the label association still works', () => {
    render(<Checkbox label="Option" />);
    const input = screen.getByRole('checkbox');
    const id = input.getAttribute('id');
    expect(id).toBeTruthy();
    expect(screen.getByLabelText('Option')).toBe(input);
  });

  it('respects the disabled prop', () => {
    render(<Checkbox label="Option" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('forwards extra props to the input element', () => {
    render(<Checkbox label="Option" data-testid="my-checkbox" />);
    expect(screen.getByTestId('my-checkbox')).toBeInTheDocument();
  });

  it('always renders type=checkbox even when a consumer passes a different type', () => {
    render(<Checkbox label="Option" type="radio" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'checkbox');
  });

  it.each([
    {
      name: 'forwards the name prop to the input',
      props: { name: 'my-group' } as Partial<CheckboxProps>,
      assert: (el: HTMLElement) =>
        expect(el).toHaveAttribute('name', 'my-group'),
    },
    {
      name: 'forwards the value prop to the input',
      props: { value: 'my-value' } as Partial<CheckboxProps>,
      assert: (el: HTMLElement) =>
        expect(el).toHaveAttribute('value', 'my-value'),
    },
    {
      name: 'forwards the required prop to the input',
      props: { required: true } as Partial<CheckboxProps>,
      assert: (el: HTMLElement) => expect(el).toBeRequired(),
    },
    {
      name: 'renders as checked when defaultChecked is true',
      props: { defaultChecked: true } as Partial<CheckboxProps>,
      assert: (el: HTMLElement) => expect(el).toBeChecked(),
    },
  ])('$name', ({ props, assert }) => {
    render(<Checkbox label="Option" {...props} />);
    assert(screen.getByRole('checkbox'));
  });

  it('forwards a ref to the underlying input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Checkbox label="Option" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies className to the wrapper', () => {
    const { container } = render(<Checkbox label="Option" className="extra" />);
    expect(container.firstChild).toHaveClass('extra');
  });

  describe('indeterminate state', () => {
    it('sets native indeterminate state and aria-checked=mixed when indeterminate is true', () => {
      render(<Checkbox label="Option" indeterminate />);
      const checkbox = screen.getByRole('checkbox');
      expect((checkbox as HTMLInputElement).indeterminate).toBe(true);
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    });
  });

  describe('supporting text', () => {
    it('renders supporting text when provided', () => {
      render(<Checkbox label="Option" supportingText="Helper copy" />);
      expect(screen.getByText('Helper copy')).toBeInTheDocument();
    });

    it('sets aria-describedby to supporting text when no invalid feedback is active', () => {
      render(
        <Checkbox
          id="supporting-checkbox"
          label="Option"
          supportingText="Helper copy"
        />,
      );
      expect(screen.getByRole('checkbox')).toHaveAttribute(
        'aria-describedby',
        'supporting-checkbox-feedback',
      );
    });

    it('does not render supporting text when hideLabel is true', () => {
      render(
        <Checkbox
          label="Option"
          hideLabel
          supportingText="Helper copy"
          aria-label="Option"
        />,
      );
      expect(screen.queryByText('Helper copy')).not.toBeInTheDocument();
    });
  });

  describe('required marker', () => {
    it.each([
      {
        name: 'renders a required marker next to label text when required is true',
        props: { required: true } as Partial<CheckboxProps>,
        exists: true,
      },
      {
        name: 'does not render a required marker when required is false',
        props: {} as Partial<CheckboxProps>,
        exists: false,
      },
    ])('$name', ({ props, exists }) => {
      render(<Checkbox label="Option" {...props} />);
      if (exists) {
        expect(screen.getByText('*')).toBeInTheDocument();
      } else {
        expect(screen.queryByText('*')).not.toBeInTheDocument();
      }
    });
  });

  describe('invalid state', () => {
    it.each([
      {
        name: 'without feedback',
        props: { invalid: true } as Partial<CheckboxProps>,
      },
      {
        name: 'with feedback',
        props: {
          invalid: true,
          invalidFeedback: 'Required',
        } as Partial<CheckboxProps>,
      },
    ])(
      'applies invalid input semantics when invalid is set ($name)',
      ({ props }) => {
        render(<Checkbox label="Option" {...props} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toHaveClass('is-invalid');
        expect(checkbox).toHaveAttribute('aria-invalid', 'true');
      },
    );

    it('does not render feedback text or set aria-describedby when invalid is set without invalidFeedback', () => {
      render(<Checkbox label="Option" invalid />);
      expect(screen.queryByRole('note')).not.toBeInTheDocument();
      expect(screen.getByRole('checkbox')).not.toHaveAttribute(
        'aria-describedby',
      );
    });

    it('renders feedback text and sets aria-describedby when invalid and invalidFeedback are provided', () => {
      render(
        <Checkbox
          id="test-checkbox"
          label="Option"
          invalid
          invalidFeedback="Required"
        />,
      );
      expect(screen.getByText('Required')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toHaveAttribute(
        'aria-describedby',
        'test-checkbox-feedback',
      );
    });

    it('prefers invalid feedback over supporting text when both are provided', () => {
      render(
        <Checkbox
          label="Option"
          invalid
          invalidFeedback="Required"
          supportingText="Helper copy"
        />,
      );
      expect(screen.getByText('Required')).toBeInTheDocument();
      expect(screen.queryByText('Helper copy')).not.toBeInTheDocument();
    });

    it('does not apply invalid styling or render feedback when only invalidFeedback is provided without invalid', () => {
      renderWithWarnSuppressed(
        <Checkbox label="Option" invalidFeedback="Required" />,
      );
      expect(screen.getByRole('checkbox')).not.toHaveClass('is-invalid');
      expect(screen.queryByText('Required')).not.toBeInTheDocument();
    });
  });

  describe('hideLabel', () => {
    it('hides the visible label element', () => {
      render(<Checkbox label="Option" hideLabel />);
      expect(screen.queryByText('Option')).not.toBeInTheDocument();
    });

    it.each([
      {
        name: 'uses the aria-label prop as the accessible name',
        props: { hideLabel: true, ['aria-label']: 'Custom name' },
        accessibleName: 'Custom name',
      },
      {
        name: 'falls back to the label prop as aria-label when no aria-label is given',
        props: { label: 'Option', hideLabel: true },
        accessibleName: 'Option',
      },
    ])('$name', ({ props, accessibleName }) => {
      render(<Checkbox {...props} />);
      expect(screen.getByRole('checkbox')).toHaveAccessibleName(accessibleName);
    });

    it('applies invalid semantics when hideLabel and invalid are both set', () => {
      render(<Checkbox label="Option" hideLabel invalid />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('is-invalid');
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not render feedback text when hideLabel and invalidFeedback are both set', () => {
      renderWithWarnSuppressed(
        <Checkbox
          label="Option"
          hideLabel
          invalid
          invalidFeedback="Required"
        />,
      );
      expect(screen.queryByText('Required')).not.toBeInTheDocument();
    });
  });

  describe('development warnings', () => {
    it.each([
      {
        name: 'invalidFeedback is provided without invalid',
        ui: <Checkbox label="Option" invalidFeedback="Required" />,
        message: 'invalidFeedback is provided without invalid={true}',
      },
      {
        name: 'hideLabel is true and no accessible name is available',
        ui: <Checkbox hideLabel />,
        message: 'label prop or aria-label attribute is required',
      },
      {
        name: 'hideLabel and invalidFeedback are both set',
        ui: <Checkbox label="Option" hideLabel invalidFeedback="Required" />,
        message: 'invalidFeedback is ignored when hideLabel is true',
      },
      {
        name: 'label is not provided and hideLabel is false',
        ui: <Checkbox />,
        message: 'label prop is required when hideLabel is false',
      },
    ])('warns in development when $name', ({ ui, message }) => {
      expectDevWarning(ui, message);
    });
  });

  describe('fuzz', () => {
    const visibleChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'<>,.?/";
    const visibleString = fc
      .array(fc.constantFrom(...visibleChars.split('')), {
        minLength: 1,
        maxLength: 100,
      })
      .map((chars) => chars.join(''));

    it('renders label text for arbitrary label strings', () => {
      fuzzComponent(
        Checkbox,
        fc.record<CheckboxProps>({
          label: visibleString,
          invalid: fc.constant(false),
        }) as unknown as fc.Arbitrary<CheckboxProps>,
        (props: CheckboxProps) => props.label as string,
        { numRuns: 100 },
      );
    });

    it('renders feedback text for arbitrary invalidFeedback strings', () => {
      fc.assert(
        fc.property(visibleString, visibleString, (label, feedback) => {
          const { unmount } = render(
            <Checkbox label={label} invalid invalidFeedback={feedback} />,
          );
          expect(screen.getByText(feedback)).toBeInTheDocument();
          unmount();
        }),
        { numRuns: 100 },
      );
    });
  });
});
