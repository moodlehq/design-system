import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RadioGroup, type RadioGroupOption } from './RadioGroup';

const options: RadioGroupOption[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

describe('RadioGroup: Unit Test', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('applies mds-radio-group class to the root element', () => {
    const { container } = render(
      <RadioGroup label="Frequency" options={options} />,
    );
    expect(container.firstChild).toHaveClass('mds-radio-group');
  });

  it('renders a radiogroup named by the visible label', () => {
    render(<RadioGroup label="Frequency" options={options} />);
    expect(
      screen.getByRole('radiogroup', { name: 'Frequency' }),
    ).toBeInTheDocument();
  });

  it('renders one radio per option with its label and value', () => {
    render(<RadioGroup label="Frequency" options={options} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    expect(screen.getByRole('radio', { name: 'Weekly' })).toHaveAttribute(
      'value',
      'weekly',
    );
  });

  it('gives every radio the same provided name', () => {
    render(<RadioGroup label="Frequency" name="freq" options={options} />);
    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).toHaveAttribute('name', 'freq');
    }
  });

  it('generates a shared name when none is provided', () => {
    render(<RadioGroup label="Frequency" options={options} />);
    const names = screen
      .getAllByRole('radio')
      .map((radio) => radio.getAttribute('name'));
    expect(names[0]).toBeTruthy();
    expect(new Set(names).size).toBe(1);
  });

  it('applies the vertical options class by default', () => {
    const { container } = render(
      <RadioGroup label="Frequency" options={options} />,
    );
    expect(container.querySelector('.mds-radio-group-options')).toHaveClass(
      'mds-radio-group-options--vertical',
    );
  });

  it('applies the horizontal options class when orientation is horizontal', () => {
    const { container } = render(
      <RadioGroup
        label="Frequency"
        options={options}
        orientation="horizontal"
      />,
    );
    expect(container.querySelector('.mds-radio-group-options')).toHaveClass(
      'mds-radio-group-options--horizontal',
    );
  });

  it('falls back to vertical and warns for an invalid orientation', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(
      <RadioGroup
        label="Frequency"
        options={options}
        orientation={'diagonal' as never}
      />,
    );
    expect(container.querySelector('.mds-radio-group-options')).toHaveClass(
      'mds-radio-group-options--vertical',
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('Invalid orientation "diagonal"'),
    );
  });

  it('forwards extra props to the root element', () => {
    render(
      <RadioGroup label="Frequency" options={options} data-testid="group" />,
    );
    expect(screen.getByTestId('group')).toHaveClass('mds-radio-group');
  });

  it('puts the radiogroup role on the options wrapper, not the root', () => {
    const { container } = render(
      <RadioGroup label="Frequency" options={options} />,
    );
    expect(container.firstChild).not.toHaveAttribute('role');
    expect(screen.getByRole('radiogroup')).toHaveClass(
      'mds-radio-group-options',
    );
  });

  it('keeps the info button outside the radiogroup', () => {
    render(
      <RadioGroup
        label="Frequency"
        options={options}
        infoTooltipLabel="More information about frequency"
      />,
    );
    expect(screen.getByRole('radiogroup')).not.toContainElement(
      screen.getByRole('button', { name: 'More information about frequency' }),
    );
    // The button's name stays out of the group's accessible name.
    expect(screen.getByRole('radiogroup')).toHaveAccessibleName('Frequency');
  });

  it('applies className to the root element', () => {
    const { container } = render(
      <RadioGroup label="Frequency" options={options} className="extra" />,
    );
    expect(container.firstChild).toHaveClass('extra');
  });

  it('forwards a ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<RadioGroup label="Frequency" options={options} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('mds-radio-group');
  });

  it('forwards inputRef to the first radio', () => {
    const inputRef = createRef<HTMLInputElement>();
    render(
      <RadioGroup label="Frequency" options={options} inputRef={inputRef} />,
    );
    expect(inputRef.current).toBe(screen.getByRole('radio', { name: 'Daily' }));
  });

  describe('onBlur', () => {
    it('is not called while focus moves inside the group', async () => {
      const onBlur = vi.fn();
      render(
        <RadioGroup
          label="Frequency"
          options={options}
          infoTooltipLabel="More information about frequency"
          onBlur={onBlur}
        />,
      );
      await userEvent.tab(); // info button
      await userEvent.tab(); // first radio
      await userEvent.keyboard('{ArrowDown}');
      expect(screen.getByRole('radio', { name: 'Weekly' })).toHaveFocus();
      expect(onBlur).not.toHaveBeenCalled();
    });

    it('is called once when focus leaves the group', async () => {
      const onBlur = vi.fn();
      render(
        <>
          <RadioGroup label="Frequency" options={options} onBlur={onBlur} />
          <button type="button">Next</button>
        </>,
      );
      await userEvent.tab();
      await userEvent.tab();
      expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('selection', () => {
    it('selects the defaultValue option when uncontrolled', () => {
      render(
        <RadioGroup
          label="Frequency"
          options={options}
          defaultValue="weekly"
        />,
      );
      expect(screen.getByRole('radio', { name: 'Weekly' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();
    });

    it('leaves every option unselected when no value is given', () => {
      render(<RadioGroup label="Frequency" options={options} />);
      for (const radio of screen.getAllByRole('radio')) {
        expect(radio).not.toBeChecked();
      }
    });

    it('reflects the controlled value', () => {
      render(
        <RadioGroup
          label="Frequency"
          options={options}
          value="monthly"
          onChange={() => {}}
        />,
      );
      expect(screen.getByRole('radio', { name: 'Monthly' })).toBeChecked();
    });

    it('calls onChange with the selected value', async () => {
      const onChange = vi.fn();
      render(
        <RadioGroup label="Frequency" options={options} onChange={onChange} />,
      );
      await userEvent.click(screen.getByRole('radio', { name: 'Daily' }));
      expect(onChange).toHaveBeenCalledWith('daily', expect.anything());
    });

    it('keeps only one option selected at a time', async () => {
      render(<RadioGroup label="Frequency" options={options} />);
      await userEvent.click(screen.getByRole('radio', { name: 'Daily' }));
      await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
      expect(screen.getByRole('radio', { name: 'Weekly' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();
    });

    it('warns when value is provided without onChange', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<RadioGroup label="Frequency" options={options} value="daily" />);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('value is provided without onChange'),
      );
    });
  });

  describe('label row', () => {
    it('shows the required asterisk, hidden from assistive technology', () => {
      const { container } = render(
        <RadioGroup label="Frequency" options={options} required />,
      );
      const asterisk = container.querySelector('.mds-radio-group-required');
      expect(asterisk).toHaveTextContent('*');
      expect(asterisk).toHaveAttribute('aria-hidden', 'true');
    });

    it('marks the group and every radio as required', () => {
      render(<RadioGroup label="Frequency" options={options} required />);
      expect(screen.getByRole('radiogroup')).toHaveAttribute(
        'aria-required',
        'true',
      );
      for (const radio of screen.getAllByRole('radio')) {
        expect(radio).toBeRequired();
      }
    });

    it('renders the info button only when infoTooltipLabel is set', () => {
      const { rerender } = render(
        <RadioGroup label="Frequency" options={options} />,
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      rerender(
        <RadioGroup
          label="Frequency"
          options={options}
          infoTooltipLabel="More information about frequency"
        />,
      );
      expect(
        screen.getByRole('button', {
          name: 'More information about frequency',
        }),
      ).toBeInTheDocument();
    });

    it('hides the label row and uses label as the accessible name when hideLabel is true', () => {
      render(
        <RadioGroup
          label="Frequency"
          options={options}
          hideLabel
          required
          infoTooltipLabel="More information"
        />,
      );
      expect(screen.queryByText('Frequency')).not.toBeInTheDocument();
      expect(screen.queryByText('*')).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(screen.getByRole('radiogroup')).toHaveAccessibleName('Frequency');
    });

    it('prefers aria-label over label when hideLabel is true', () => {
      render(
        <RadioGroup
          label="Frequency"
          aria-label="Email frequency"
          options={options}
          hideLabel
        />,
      );
      expect(screen.getByRole('radiogroup')).toHaveAccessibleName(
        'Email frequency',
      );
    });

    it('uses a consumer aria-labelledby when hideLabel is true', () => {
      render(
        <>
          <h2 id="heading">Email frequency</h2>
          <RadioGroup
            label="Frequency"
            aria-labelledby="heading"
            options={options}
            hideLabel
          />
        </>,
      );
      expect(screen.getByRole('radiogroup')).toHaveAccessibleName(
        'Email frequency',
      );
    });

    it('warns when hideLabel is true and no accessible name is available', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<RadioGroup options={options} hideLabel />);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('label prop, aria-label, or aria-labelledby'),
      );
    });

    it('warns when label is missing and hideLabel is false', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<RadioGroup options={options} />);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('label prop is required'),
      );
    });
  });

  it('prefixes every DEV warning with [MDS RadioGroup]', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <RadioGroup
        options={options.slice(0, 1)}
        orientation={'diagonal' as never}
        value="daily"
        invalid
      />,
    );
    expect(warn.mock.calls.length).toBeGreaterThanOrEqual(5);
    for (const [message] of warn.mock.calls) {
      expect(message).toMatch(/^\[MDS RadioGroup\] /);
    }
  });

  describe('option count', () => {
    it.each([
      [1, options.slice(0, 1)],
      [
        6,
        Array.from({ length: 6 }, (_, i) => ({
          value: `o${i}`,
          label: `Option ${i}`,
        })),
      ],
    ])('warns when given %i options', (_count, opts) => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<RadioGroup label="Frequency" options={opts} />);
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('Use 2 to 5'));
    });

    it('does not warn for 2 to 5 options', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<RadioGroup label="Frequency" options={options} />);
      expect(warn).not.toHaveBeenCalled();
    });
  });

  describe('supporting text', () => {
    it('renders supporting text and links it to the group', () => {
      render(
        <RadioGroup
          id="freq"
          label="Frequency"
          options={options}
          supportingText="How often we email you"
        />,
      );
      expect(screen.getByRole('radiogroup')).toHaveAttribute(
        'aria-describedby',
        'freq-feedback',
      );
      expect(screen.getByRole('radiogroup')).toHaveAccessibleDescription(
        'How often we email you',
      );
    });

    it('keeps a consumer aria-describedby alongside the supporting text', () => {
      render(
        <RadioGroup
          id="freq"
          label="Frequency"
          options={options}
          supportingText="Guidance"
          aria-describedby="external"
        />,
      );
      expect(screen.getByRole('radiogroup')).toHaveAttribute(
        'aria-describedby',
        'external freq-feedback',
      );
    });

    it('omits aria-describedby when there is no footer text', () => {
      render(<RadioGroup label="Frequency" options={options} />);
      expect(screen.getByRole('radiogroup')).not.toHaveAttribute(
        'aria-describedby',
      );
    });
  });

  describe('invalid state', () => {
    it('marks every radio invalid', () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<RadioGroup label="Frequency" options={options} invalid />);
      for (const radio of screen.getAllByRole('radio')) {
        expect(radio).toHaveAttribute('aria-invalid', 'true');
        expect(radio).toHaveClass('is-invalid');
      }
    });

    it('shows invalidFeedback in place of supportingText', () => {
      const { container } = render(
        <RadioGroup
          label="Frequency"
          options={options}
          supportingText="Guidance"
          invalid
          invalidFeedback="Choose how often we email you"
        />,
      );
      expect(screen.queryByText('Guidance')).not.toBeInTheDocument();
      const footer = container.querySelector(
        '.mds-radio-group-supporting-text',
      );
      expect(footer).toHaveTextContent('Choose how often we email you');
      expect(footer).toHaveClass('mds-radio-group-supporting-text--invalid');
    });

    it('warns when invalid is set without invalidFeedback', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<RadioGroup label="Frequency" options={options} invalid />);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('invalid is set without invalidFeedback'),
      );
    });

    it('describes every radio with the error message', () => {
      render(
        <RadioGroup
          label="Frequency"
          options={options}
          supportingText="Guidance"
          invalid
          invalidFeedback="Choose how often we email you"
        />,
      );
      for (const radio of screen.getAllByRole('radio')) {
        expect(radio).toHaveAccessibleDescription(
          'Choose how often we email you',
        );
      }
    });

    it('keeps resting supporting text on the group only', () => {
      render(
        <RadioGroup
          label="Frequency"
          options={options}
          supportingText="Guidance"
        />,
      );
      for (const radio of screen.getAllByRole('radio')) {
        expect(radio).not.toHaveAttribute('aria-describedby');
      }
    });

    it('shows invalidFeedback instead of the browser message on native failure', () => {
      render(
        <RadioGroup
          label="Frequency"
          options={options}
          required
          invalidFeedback="Choose how often we email you"
        />,
      );
      fireEvent.invalid(screen.getAllByRole('radio')[0]);
      expect(
        screen.getByText('Choose how often we email you'),
      ).toBeInTheDocument();
    });

    it('turns resting supporting text danger when invalid without feedback', () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { container } = render(
        <RadioGroup
          label="Frequency"
          options={options}
          supportingText="Guidance"
          invalid
        />,
      );
      expect(
        container.querySelector('.mds-radio-group-supporting-text'),
      ).toHaveClass('mds-radio-group-supporting-text--invalid');
    });

    it('does not render per-radio feedback', () => {
      const { container } = render(
        <RadioGroup
          label="Frequency"
          options={options}
          invalid
          invalidFeedback="Error"
        />,
      );
      expect(container.querySelector('.mds-radio-feedback')).toBeNull();
    });

    it('shows the native validation message when a required group fails validation', () => {
      const { container } = render(
        <RadioGroup label="Frequency" options={options} required />,
      );
      const [first] = screen.getAllByRole('radio');
      fireEvent.invalid(first);
      expect(
        container.querySelector('.mds-radio-group-supporting-text--invalid'),
      ).toBeInTheDocument();
      expect(first).toHaveAttribute('aria-invalid', 'true');
    });

    it('focuses the first radio when the group is the form’s first invalid control', () => {
      render(
        <form data-testid="form">
          <RadioGroup label="Frequency" options={options} required />
        </form>,
      );
      act(() => {
        (screen.getByTestId('form') as HTMLFormElement).reportValidity();
      });
      expect(screen.getByRole('radio', { name: 'Daily' })).toHaveFocus();
    });

    it('leaves focus alone when an earlier control is invalid', () => {
      render(
        <form data-testid="form">
          <input aria-label="Name" required />
          <RadioGroup label="Frequency" options={options} required />
        </form>,
      );
      act(() => {
        (screen.getByTestId('form') as HTMLFormElement).reportValidity();
      });
      for (const radio of screen.getAllByRole('radio')) {
        expect(radio).not.toHaveFocus();
      }
    });

    it('does not take focus from a field being edited', () => {
      render(
        <form data-testid="form">
          <input aria-label="Name" defaultValue="Sam" />
          <RadioGroup label="Frequency" options={options} required />
        </form>,
      );
      const name = screen.getByRole('textbox', { name: 'Name' });
      name.focus();
      act(() => {
        (screen.getByTestId('form') as HTMLFormElement).checkValidity();
      });
      expect(name).toHaveFocus();
    });

    it('clears the native invalid state once an option is selected', async () => {
      render(<RadioGroup label="Frequency" options={options} required />);
      const [first] = screen.getAllByRole('radio');
      fireEvent.invalid(first);
      await userEvent.click(first);
      expect(first).not.toHaveAttribute('aria-invalid');
    });

    it('clears a caller-set invalid state and message once an option is selected', async () => {
      render(
        <RadioGroup
          label="Frequency"
          options={options}
          supportingText="Guidance"
          invalid
          invalidFeedback="Choose how often we email you"
        />,
      );
      await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
      for (const radio of screen.getAllByRole('radio')) {
        expect(radio).not.toHaveAttribute('aria-invalid');
      }
      expect(
        screen.queryByText('Choose how often we email you'),
      ).not.toBeInTheDocument();
      expect(screen.getByText('Guidance')).not.toHaveClass(
        'mds-radio-group-supporting-text--invalid',
      );
    });

    it('shows the invalid state again when the caller toggles invalid', async () => {
      const props = {
        label: 'Frequency',
        options,
        invalidFeedback: 'Choose how often we email you',
      };
      const { rerender } = render(<RadioGroup {...props} invalid />);
      await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
      rerender(<RadioGroup {...props} invalid={false} />);
      rerender(<RadioGroup {...props} invalid />);
      expect(screen.getByRole('radio', { name: 'Weekly' })).toHaveAttribute(
        'aria-invalid',
        'true',
      );
      expect(
        screen.getByText('Choose how often we email you'),
      ).toBeInTheDocument();
    });

    it('shows the invalid state again when the caller passes a new message', async () => {
      const props = { label: 'Frequency', options, invalid: true };
      const { rerender } = render(
        <RadioGroup {...props} invalidFeedback="Choose an option" />,
      );
      await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
      rerender(
        <RadioGroup {...props} invalidFeedback="Weekly isn't available" />,
      );
      expect(screen.getByText("Weekly isn't available")).toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('disables every radio', () => {
      render(<RadioGroup label="Frequency" options={options} disabled />);
      for (const radio of screen.getAllByRole('radio')) {
        expect(radio).toBeDisabled();
      }
      expect(screen.getByRole('radiogroup')).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });

    it('mutes the supporting text', () => {
      const { container } = render(
        <RadioGroup
          label="Frequency"
          options={options}
          supportingText="Guidance"
          disabled
        />,
      );
      expect(
        container.querySelector('.mds-radio-group-supporting-text'),
      ).toHaveClass('mds-radio-group-supporting-text--disabled');
    });

    it('takes precedence over invalid', () => {
      const { container } = render(
        <RadioGroup
          label="Frequency"
          options={options}
          supportingText="Guidance"
          invalid
          invalidFeedback="Error"
          disabled
        />,
      );
      for (const radio of screen.getAllByRole('radio')) {
        expect(radio).not.toHaveAttribute('aria-invalid');
      }
      expect(screen.queryByText('Error')).not.toBeInTheDocument();
      expect(screen.getByText('Guidance')).toBeInTheDocument();
      expect(
        container.querySelector('.mds-radio-group-supporting-text'),
      ).not.toHaveClass('mds-radio-group-supporting-text--invalid');
    });
  });
});
