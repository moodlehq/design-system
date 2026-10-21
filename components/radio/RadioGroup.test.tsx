import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactNode, createRef, useState } from 'react';
import { afterEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { Input } from '../input';
import { RadioGroup, type RadioGroupOption } from './RadioGroup';

const options: RadioGroupOption[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

// The error is also mirrored into a hidden live region, so text queries for
// the visible message are scoped to the footer.
const FOOTER = '.mds-radio-group-supporting-text';

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

    // WebKit, with keyboard focus on a radio, fires focusout with a null
    // relatedTarget when another option is clicked.
    it('is not called when clicking another option blurs with no relatedTarget', () => {
      const onBlur = vi.fn();
      render(
        <RadioGroup label="Frequency" options={options} onBlur={onBlur} />,
      );
      const daily = screen.getByRole('radio', { name: 'Daily' });
      const weekly = screen.getByRole('radio', { name: 'Weekly' });
      daily.focus();

      fireEvent.pointerDown(weekly);
      fireEvent.focusOut(daily, { relatedTarget: null });
      fireEvent.pointerUp(weekly);

      expect(onBlur).not.toHaveBeenCalled();
    });

    it('is called when focus leaves with no relatedTarget after a press has ended', () => {
      const onBlur = vi.fn();
      render(
        <RadioGroup label="Frequency" options={options} onBlur={onBlur} />,
      );
      const daily = screen.getByRole('radio', { name: 'Daily' });
      daily.focus();

      fireEvent.pointerDown(screen.getByRole('radio', { name: 'Weekly' }));
      fireEvent.pointerUp(document.body);
      fireEvent.focusOut(daily, { relatedTarget: null });

      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    // A press released in an iframe fires pointerup on the iframe's window, so
    // the release listeners must go on the group's own document.
    it('is called when focus leaves after a press ended inside an iframe', () => {
      const onBlur = vi.fn();
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      onTestFinished(() => iframe.remove());
      const frameDocument = iframe.contentDocument!;
      const container = frameDocument.createElement('div');
      frameDocument.body.appendChild(container);
      render(
        <RadioGroup label="Frequency" options={options} onBlur={onBlur} />,
        {
          container,
        },
      );
      const frame = within(frameDocument.body);
      const daily = frame.getByRole('radio', { name: 'Daily' });
      daily.focus();

      fireEvent.pointerDown(frame.getByRole('radio', { name: 'Weekly' }));
      fireEvent.pointerUp(frameDocument.body);
      fireEvent.focusOut(daily, { relatedTarget: null });

      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('still calls a consumer onPointerDown', () => {
      const onPointerDown = vi.fn();
      render(
        <RadioGroup
          label="Frequency"
          options={options}
          onPointerDown={onPointerDown}
        />,
      );
      fireEvent.pointerDown(screen.getByRole('radio', { name: 'Weekly' }));
      expect(onPointerDown).toHaveBeenCalledTimes(1);
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

    it('announces the error through a pre-mounted live region', () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { container, rerender } = render(
        <RadioGroup label="Frequency" options={options} />,
      );
      const liveRegion = container.querySelector('[aria-live="polite"]');
      expect(liveRegion).toBeInTheDocument();
      expect(liveRegion).toBeEmptyDOMElement();

      rerender(
        <RadioGroup
          label="Frequency"
          options={options}
          invalid
          invalidFeedback="Choose how often we email you"
        />,
      );
      // Same node, so assistive tech already tracks it when the text lands.
      expect(container.querySelector('[aria-live="polite"]')).toBe(liveRegion);
      expect(liveRegion).toHaveTextContent('Choose how often we email you');
    });

    it('keeps resting supporting text out of the live region', () => {
      const { container } = render(
        <RadioGroup
          label="Frequency"
          options={options}
          supportingText="Guidance"
        />,
      );
      expect(
        container.querySelector('[aria-live="polite"]'),
      ).toBeEmptyDOMElement();
    });

    it('warns when invalid is set without invalidFeedback', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<RadioGroup label="Frequency" options={options} invalid />);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('invalid is set without invalidFeedback'),
      );
    });

    it('warns when required is set without invalidFeedback', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<RadioGroup label="Frequency" options={options} required />);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('required is set without invalidFeedback'),
      );
    });

    it('does not warn about invalidFeedback when required is set with it, or while disabled', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <>
          <RadioGroup
            label="Frequency"
            options={options}
            required
            invalidFeedback="Choose how often we email you"
          />
          <RadioGroup label="Frequency" options={options} required disabled />
        </>,
      );
      expect(warn).not.toHaveBeenCalled();
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
        screen.getByText('Choose how often we email you', { selector: FOOTER }),
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

    describe('focus on a failed submit', () => {
      const renderForm = (before?: ReactNode) =>
        render(
          <form data-testid="form" onSubmit={(event) => event.preventDefault()}>
            {before}
            <RadioGroup label="Frequency" options={options} required />
            <button type="submit">Save</button>
          </form>,
        );

      it('focuses the first radio when Save is clicked', async () => {
        renderForm();
        await userEvent.click(screen.getByRole('button', { name: 'Save' }));
        expect(screen.getByRole('radio', { name: 'Daily' })).toHaveFocus();
      });

      it('focuses the first radio when Save is clicked without taking focus (Safari)', () => {
        renderForm(<input aria-label="Name" defaultValue="Sam" />);
        const name = screen.getByRole('textbox', { name: 'Name' });
        name.focus();
        // fireEvent.click doesn't move focus, like WebKit clicking a button.
        act(() => {
          fireEvent.click(screen.getByRole('button', { name: 'Save' }));
        });
        expect(screen.getByRole('radio', { name: 'Daily' })).toHaveFocus();
      });

      it('focuses the first radio when Enter submits from a text field', () => {
        renderForm(<input aria-label="Name" defaultValue="Sam" />);
        const name = screen.getByRole('textbox', { name: 'Name' });
        name.focus();
        // Browser order for implicit submission: keydown, validation, keyup.
        act(() => {
          fireEvent.keyDown(name, { key: 'Enter' });
          (screen.getByTestId('form') as HTMLFormElement).requestSubmit();
          fireEvent.keyUp(name, { key: 'Enter' });
        });
        expect(screen.getByRole('radio', { name: 'Daily' })).toHaveFocus();
      });

      it('focuses an earlier invalid Input rather than the group', async () => {
        renderForm(<Input label="Name" required />);
        await userEvent.click(screen.getByRole('button', { name: 'Save' }));
        expect(screen.getByRole('textbox', { name: 'Name' })).toHaveFocus();
        // Both fields still show their errors.
        expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute(
          'aria-invalid',
          'true',
        );
        expect(screen.getByRole('radio', { name: 'Daily' })).toHaveAttribute(
          'aria-invalid',
          'true',
        );
      });

      it('does not take focus when validity is checked outside a submit', () => {
        renderForm(<input aria-label="Name" defaultValue="Sam" />);
        const name = screen.getByRole('textbox', { name: 'Name' });
        name.focus();
        act(() => {
          (screen.getByTestId('form') as HTMLFormElement).checkValidity();
        });
        expect(name).toHaveFocus();
      });

      describe('in an iframe document', () => {
        // React from this window rendering into an iframe (a portal or an
        // iframe-mounted root): listeners must go on the iframe's document,
        // and its elements fail `instanceof` against this window's classes.
        const renderInIframe = (before?: ReactNode) => {
          const iframe = document.createElement('iframe');
          document.body.appendChild(iframe);
          const frameDocument = iframe.contentDocument!;
          const container = frameDocument.createElement('div');
          frameDocument.body.appendChild(container);
          render(
            <form onSubmit={(event) => event.preventDefault()}>
              {before}
              <RadioGroup label="Frequency" options={options} required />
              <button type="submit">Save</button>
            </form>,
            { container },
          );
          const frame = within(frameDocument.body);
          return { iframe, frameDocument, frame };
        };

        it('focuses the first radio when Save is clicked', () => {
          const { iframe, frameDocument, frame } = renderInIframe();
          act(() => {
            fireEvent.click(frame.getByRole('button', { name: 'Save' }));
          });
          expect(frameDocument.activeElement).toBe(
            frame.getByRole('radio', { name: 'Daily' }),
          );
          iframe.remove();
        });

        it('focuses an earlier invalid Input when Enter submits from a text field', () => {
          const { iframe, frameDocument, frame } = renderInIframe(
            <>
              <input aria-label="Nickname" defaultValue="Sam" />
              <Input label="Name" required />
            </>,
          );
          const nickname = frame.getByRole('textbox', { name: 'Nickname' });
          nickname.focus();
          act(() => {
            fireEvent.keyDown(nickname, { key: 'Enter' });
            nickname.form!.requestSubmit();
            fireEvent.keyUp(nickname, { key: 'Enter' });
          });
          expect(frameDocument.activeElement).toBe(
            frame.getByRole('textbox', { name: 'Name' }),
          );
          iframe.remove();
        });
      });

      it('lets focus leave an invalid Input that validates on blur', async () => {
        renderForm(<Input label="Name" required />);
        await userEvent.click(screen.getByRole('textbox', { name: 'Name' }));
        await userEvent.tab();
        expect(screen.getByRole('radio', { name: 'Daily' })).toHaveFocus();
      });
    });

    it('clears the native invalid state once an option is selected', async () => {
      render(<RadioGroup label="Frequency" options={options} required />);
      const [first] = screen.getAllByRole('radio');
      fireEvent.invalid(first);
      await userEvent.click(first);
      expect(first).not.toHaveAttribute('aria-invalid');
    });

    it('keeps a caller-set invalid state after selection until the caller clears it', async () => {
      const props = {
        label: 'Frequency',
        options,
        supportingText: 'Guidance',
        invalidFeedback: 'Choose how often we email you',
      };
      const { rerender } = render(<RadioGroup {...props} invalid />);
      await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
      for (const radio of screen.getAllByRole('radio')) {
        expect(radio).toHaveAttribute('aria-invalid', 'true');
      }
      expect(
        screen.getByText('Choose how often we email you', { selector: FOOTER }),
      ).toBeInTheDocument();

      rerender(<RadioGroup {...props} invalid={false} />);
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

    it('keeps the error when the caller re-validates a new selection as still invalid', async () => {
      // e.g. a rule beyond "required": the new choice is also rejected, so the
      // caller passes the same invalid + message and the error must stay.
      render(
        <RadioGroup
          label="Frequency"
          options={options}
          invalid
          invalidFeedback="Weekly isn't available"
        />,
      );
      await userEvent.click(screen.getByRole('radio', { name: 'Monthly' }));
      expect(screen.getByRole('radio', { name: 'Monthly' })).toHaveAttribute(
        'aria-invalid',
        'true',
      );
      expect(
        screen.getByText("Weekly isn't available", { selector: FOOTER }),
      ).toBeInTheDocument();
    });

    it('clears when the caller resets invalid in onChange', async () => {
      function Harness() {
        const [invalid, setInvalid] = useState(true);
        return (
          <RadioGroup
            label="Frequency"
            options={options}
            invalid={invalid}
            invalidFeedback="Choose how often we email you"
            onChange={() => setInvalid(false)}
          />
        );
      }
      render(<Harness />);
      await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
      for (const radio of screen.getAllByRole('radio')) {
        expect(radio).not.toHaveAttribute('aria-invalid');
      }
      expect(
        screen.queryByText('Choose how often we email you'),
      ).not.toBeInTheDocument();
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

  describe('disabled option', () => {
    const withDisabled: RadioGroupOption[] = [
      { value: 'daily', label: 'Daily', disabled: true },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
    ];

    it('disables only that option', () => {
      render(<RadioGroup label="Frequency" options={withDisabled} />);
      expect(screen.getByRole('radio', { name: 'Daily' })).toBeDisabled();
      expect(screen.getByRole('radio', { name: 'Weekly' })).toBeEnabled();
      expect(screen.getByRole('radio', { name: 'Monthly' })).toBeEnabled();
      expect(screen.getByRole('radiogroup')).not.toHaveAttribute(
        'aria-disabled',
      );
    });

    it('cannot be selected by clicking', async () => {
      const onChange = vi.fn();
      render(
        <RadioGroup
          label="Frequency"
          options={withDisabled}
          onChange={onChange}
        />,
      );
      await userEvent.click(screen.getByRole('radio', { name: 'Daily' }));
      expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('is overridden by the group disabled prop', () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <RadioGroup
          label="Frequency"
          options={[
            { value: 'daily', label: 'Daily', disabled: false },
            { value: 'weekly', label: 'Weekly' },
          ]}
          disabled
        />,
      );
      for (const radio of screen.getAllByRole('radio')) {
        expect(radio).toBeDisabled();
      }
    });

    it('forwards inputRef to the first enabled radio', () => {
      const inputRef = createRef<HTMLInputElement>();
      render(
        <RadioGroup
          label="Frequency"
          options={withDisabled}
          inputRef={inputRef}
        />,
      );
      expect(inputRef.current).toBe(
        screen.getByRole('radio', { name: 'Weekly' }),
      );
    });

    it('focuses the first enabled radio on a failed submit', async () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <form onSubmit={(event) => event.preventDefault()}>
          <RadioGroup
            label="Frequency"
            options={withDisabled}
            required
            invalidFeedback="Choose a frequency"
          />
          <button type="submit">Save</button>
        </form>,
      );
      await userEvent.click(screen.getByRole('button', { name: 'Save' }));
      expect(screen.getByRole('radio', { name: 'Weekly' })).toHaveFocus();
    });

    it('is not submitted with the form even when selected', () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <form data-testid="form">
          <RadioGroup
            label="Frequency"
            name="freq"
            options={withDisabled}
            defaultValue="daily"
          />
        </form>,
      );
      const form = screen.getByTestId('form') as HTMLFormElement;
      expect(new FormData(form).get('freq')).toBeNull();
    });

    it('warns when the selected value belongs to a disabled option', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <RadioGroup
          label="Frequency"
          options={withDisabled}
          defaultValue="daily"
        />,
      );
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('belongs to a disabled option'),
      );
    });

    it('warns when every option is disabled', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <RadioGroup
          label="Frequency"
          options={options.map((option) => ({ ...option, disabled: true }))}
        />,
      );
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('every option is disabled'),
      );
    });

    it('does not warn when only some options are disabled', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <RadioGroup
          label="Frequency"
          options={withDisabled}
          defaultValue="weekly"
        />,
      );
      expect(warn).not.toHaveBeenCalled();
    });
  });
});
