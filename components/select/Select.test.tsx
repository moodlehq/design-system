import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { SelectOptionItem } from './Select';
import { Select } from './Select';

const options: SelectOptionItem[] = [
  { value: '', label: 'Select a country' },
  { value: 'au', label: 'Australia' },
  { value: 'es', label: 'Spain' },
  { value: 'jp', label: 'Japan', disabled: true },
];

const groupedOptions: SelectOptionItem[] = [
  { value: '', label: 'Select a course' },
  {
    label: 'Science',
    options: [
      { value: 'bio', label: 'Biology' },
      { value: 'chem', label: 'Chemistry' },
    ],
  },
  {
    label: 'Archived',
    disabled: true,
    options: [{ value: 'hist', label: 'History' }],
  },
];

describe('Select: Unit Test', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('applies mds-select class to the wrapper', () => {
    const { container } = render(<Select label="Country" options={options} />);
    expect(container.firstChild).toHaveClass('mds-select');
  });

  it('applies mds-select-field and form-select classes to the select', () => {
    render(<Select label="Country" options={options} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('mds-select-field');
    expect(select).toHaveClass('form-select');
  });

  it('renders a native single-choice select element', () => {
    render(<Select label="Country" options={options} />);
    const select = screen.getByRole('combobox');
    expect(select.tagName).toBe('SELECT');
    expect(select).not.toHaveAttribute('multiple');
  });

  it('renders every option with its value and label', () => {
    render(<Select label="Country" options={options} />);
    const rendered = screen.getAllByRole('option');
    expect(rendered).toHaveLength(4);
    expect(rendered[1]).toHaveValue('au');
    expect(rendered[1]).toHaveTextContent('Australia');
  });

  it('disables individual options', () => {
    render(<Select label="Country" options={options} />);
    expect(screen.getByRole('option', { name: 'Japan' })).toBeDisabled();
  });

  it('renders option groups as optgroup elements', () => {
    render(<Select label="Course" options={groupedOptions} />);
    const groups = screen.getAllByRole('group');
    expect(groups).toHaveLength(2);
    expect(groups[0].tagName).toBe('OPTGROUP');
    expect(groups[0]).toHaveAttribute('label', 'Science');
    expect(within(groups[0]).getAllByRole('option')).toHaveLength(2);
  });

  it('disables a whole option group', () => {
    render(<Select label="Course" options={groupedOptions} />);
    const archived = screen
      .getAllByRole('group')
      .find((g) => g.getAttribute('label') === 'Archived');
    expect(archived).toBeDisabled();
  });

  it('pre-selects the first option by default', () => {
    render(<Select label="Country" options={options} />);
    expect(screen.getByRole('combobox')).toHaveValue('');
  });

  it('respects defaultValue', () => {
    render(<Select label="Country" options={options} defaultValue="es" />);
    expect(screen.getByRole('combobox')).toHaveValue('es');
  });

  it('calls onChange and updates the value when an option is chosen', async () => {
    const onChange = vi.fn();
    render(<Select label="Country" options={options} onChange={onChange} />);
    await userEvent.selectOptions(screen.getByRole('combobox'), 'au');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('combobox')).toHaveValue('au');
  });

  it('associates the visible label with the select', () => {
    render(<Select label="Country" options={options} />);
    expect(screen.getByLabelText('Country')).toBe(screen.getByRole('combobox'));
  });

  it('hides the label and uses it as aria-label when hideLabel is true', () => {
    render(<Select label="Country" hideLabel options={options} />);
    expect(screen.queryByText('Country')).not.toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'Country' }),
    ).toBeInTheDocument();
  });

  it('prefers explicit aria-label over label when hideLabel is true', () => {
    render(
      <Select
        label="Country"
        hideLabel
        aria-label="Country of residence"
        options={options}
      />,
    );
    expect(
      screen.getByRole('combobox', { name: 'Country of residence' }),
    ).toBeInTheDocument();
  });

  it('renders the required asterisk hidden from assistive tech', () => {
    render(<Select label="Country" required options={options} />);
    const asterisk = screen.getByText('*');
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('combobox')).toBeRequired();
  });

  it('does not render the asterisk when not required', () => {
    render(<Select label="Country" options={options} />);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('renders the info button when infoTooltipLabel is provided', () => {
    render(
      <Select
        label="Country"
        infoTooltipLabel="More information about this field"
        options={options}
      />,
    );
    expect(
      screen.getByRole('button', { name: 'More information about this field' }),
    ).toBeInTheDocument();
  });

  it('does not render the info button when hideLabel is true', () => {
    render(
      <Select
        label="Country"
        hideLabel
        infoTooltipLabel="More information"
        options={options}
      />,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders supportingText linked via aria-describedby', () => {
    render(
      <Select
        label="Country"
        supportingText="Where you live"
        options={options}
      />,
    );
    const select = screen.getByRole('combobox');
    const text = screen.getByText('Where you live');
    expect(text).toHaveClass('mds-select-supporting-text');
    expect(select).toHaveAttribute('aria-describedby', text.id);
  });

  it('applies invalid class, aria-invalid, and icon when invalid', () => {
    const { container } = render(
      <Select label="Country" invalid options={options} />,
    );
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('is-invalid');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(
      container.querySelector('.mds-select-invalid-icon'),
    ).toBeInTheDocument();
  });

  it('does not apply invalid state by default', () => {
    const { container } = render(<Select label="Country" options={options} />);
    const select = screen.getByRole('combobox');
    expect(select).not.toHaveClass('is-invalid');
    expect(select).not.toHaveAttribute('aria-invalid');
    expect(
      container.querySelector('.mds-select-invalid-icon'),
    ).not.toBeInTheDocument();
  });

  it('renders invalidFeedback in place of supportingText', () => {
    render(
      <Select
        label="Country"
        invalid
        invalidFeedback="Select a country to continue."
        supportingText="Where you live"
        options={options}
      />,
    );
    const feedback = screen.getByText('Select a country to continue.');
    expect(feedback).toHaveClass('mds-select-invalid-feedback');
    expect(screen.queryByText('Where you live')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-describedby',
      feedback.id,
    );
  });

  it('merges consumer aria-describedby with the generated feedback id', () => {
    render(
      <Select
        label="Country"
        id="country"
        aria-describedby="external-hint"
        supportingText="Where you live"
        options={options}
      />,
    );
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-describedby',
      'external-hint country-feedback',
    );
  });

  it('disables the select', () => {
    render(
      <Select
        label="Country"
        disabled
        supportingText="Locked by your administrator"
        options={options}
      />,
    );
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('suppresses invalid state when disabled', () => {
    const { container } = render(
      <Select
        label="Country"
        disabled
        invalid
        invalidFeedback="Error"
        supportingText="Locked"
        options={options}
      />,
    );
    const select = screen.getByRole('combobox');
    expect(select).not.toHaveClass('is-invalid');
    expect(select).not.toHaveAttribute('aria-invalid');
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
    expect(screen.getByText('Locked')).toBeInTheDocument();
    expect(
      container.querySelector('.mds-select-invalid-icon'),
    ).not.toBeInTheDocument();
  });

  it('shows the native validation message when a required select fails', () => {
    render(<Select label="Country" required options={options} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.blur(select);
    expect(select).toHaveClass('is-invalid');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(
      screen.getByText(select.validationMessage || /./, {
        selector: '.mds-select-invalid-feedback',
      }),
    ).toBeInTheDocument();
  });

  it('clears the native invalid state once a valid option is chosen', async () => {
    render(<Select label="Country" required options={options} />);
    const select = screen.getByRole('combobox');
    fireEvent.blur(select);
    expect(select).toHaveClass('is-invalid');
    await userEvent.selectOptions(select, 'au');
    expect(select).not.toHaveClass('is-invalid');
  });

  it('forwards extra props to the select element', () => {
    render(
      <Select
        label="Country"
        name="country"
        data-testid="country-select"
        options={options}
      />,
    );
    const select = screen.getByTestId('country-select');
    expect(select).toHaveAttribute('name', 'country');
  });

  it('appends consumer className to the wrapper', () => {
    const { container } = render(
      <Select label="Country" className="custom" options={options} />,
    );
    expect(container.firstChild).toHaveClass('mds-select', 'custom');
  });

  it('uses the provided id on the select', () => {
    render(<Select label="Country" id="country" options={options} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('id', 'country');
  });

  it('forwards ref to the underlying select element', () => {
    const ref = createRef<HTMLSelectElement>();
    render(<Select ref={ref} label="Country" options={options} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('strips multiple and size passed by untyped consumers and warns', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const untypedProps = { multiple: true, size: 4 } as Record<string, unknown>;
    render(<Select label="Country" options={options} {...untypedProps} />);
    const select = screen.getByRole('combobox');
    expect(select).not.toHaveAttribute('multiple');
    expect(select).not.toHaveAttribute('size');
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('`multiple` and `size` are not supported'),
    );
  });

  it('warns in dev mode when hideLabel is true without an accessible name', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Select hideLabel options={options} />);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('required for accessibility'),
    );
  });

  it('warns in dev mode when disabled without supportingText', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Select label="Country" disabled options={options} />);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('disabled fields should include supportingText'),
    );
  });

  it('does not render a footer element when there is no footer text', () => {
    const { container } = render(<Select label="Country" options={options} />);
    expect(
      container.querySelector(
        '.mds-select-supporting-text, .mds-select-invalid-feedback',
      ),
    ).not.toBeInTheDocument();
  });

  it('moves focus to the invalid select when its form is submitted', () => {
    render(
      <form>
        <Select label="Country" required options={options} />
        <button type="submit">Submit</button>
      </form>,
    );
    const select = screen.getByRole('combobox');
    const submit = screen.getByRole('button', { name: 'Submit' });
    submit.focus();

    act(() => {
      (submit.closest('form') as HTMLFormElement).requestSubmit(submit);
    });

    expect(select).toHaveFocus();
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });

  it('only focuses the first invalid control when several fail', () => {
    render(
      <form>
        <Select label="Country" required options={options} />
        <Select label="Region" required options={options} />
        <button type="submit">Submit</button>
      </form>,
    );
    const [first, second] = screen.getAllByRole('combobox');
    const submit = screen.getByRole('button', { name: 'Submit' });

    act(() => {
      (submit.closest('form') as HTMLFormElement).requestSubmit(submit);
    });

    expect(first).toHaveFocus();
    expect(second).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not take focus when an earlier control is the first invalid one', () => {
    render(
      <form>
        <input aria-label="Name" required />
        <Select label="Country" required options={options} />
        <button type="submit">Submit</button>
      </form>,
    );
    const select = screen.getByRole('combobox');
    const submit = screen.getByRole('button', { name: 'Submit' });
    submit.focus();

    act(() => {
      (submit.closest('form') as HTMLFormElement).requestSubmit(submit);
    });

    expect(select).not.toHaveFocus();
  });

  it('does not refocus the select when blur validation fails', () => {
    render(
      <form>
        <Select label="Country" required options={options} />
        <button type="submit">Submit</button>
      </form>,
    );
    const select = screen.getByRole('combobox');
    const submit = screen.getByRole('button', { name: 'Submit' });

    act(() => {
      select.focus();
      submit.focus();
    });

    expect(submit).toHaveFocus();
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });

  it('only applies the pointer-focus class for pointer-initiated focus', () => {
    render(<Select label="Country" options={options} />);
    const select = screen.getByRole('combobox');

    fireEvent.focus(select);
    expect(select).not.toHaveClass('mds-select-field--pointer-focus');

    fireEvent.blur(select);
    fireEvent.pointerDown(select);
    fireEvent.focus(select);
    expect(select).toHaveClass('mds-select-field--pointer-focus');

    fireEvent.blur(select);
    expect(select).not.toHaveClass('mds-select-field--pointer-focus');
  });

  it('still calls consumer onPointerDown and onFocus handlers', () => {
    const onPointerDown = vi.fn();
    const onFocus = vi.fn();
    render(
      <Select
        label="Country"
        options={options}
        onPointerDown={onPointerDown}
        onFocus={onFocus}
      />,
    );
    const select = screen.getByRole('combobox');
    fireEvent.pointerDown(select);
    fireEvent.focus(select);
    expect(onPointerDown).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('hides decorative icons from assistive tech', () => {
    const { container } = render(
      <Select label="Country" invalid options={options} />,
    );
    expect(container.querySelector('.mds-select-icons')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });
});
