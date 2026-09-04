import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './Input';

describe('Input: Unit Test', () => {
  it('applies the mds-input class name', () => {
    const { container } = render(<Input label="Label" />);
    expect(container.firstElementChild).toHaveClass('mds-input');
  });

  it('forwards ref to the input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input label="Label" ref={ref} />);
    expect(ref.current).toBe(screen.getByRole('textbox', { name: 'Label' }));
  });

  it('renders email input when type is email', () => {
    render(<Input label="Email" type="email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  it('falls back to text and warns in development for invalid runtime type', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <Input
        label="Label"
        // @ts-expect-error deliberate runtime invalid type test
        type="date"
      />,
    );

    expect(screen.getByRole('textbox', { name: 'Label' })).toHaveAttribute(
      'type',
      'text',
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('[MDS Input] Invalid type "date"'),
    );
    warnSpy.mockRestore();
  });

  it('uses aria-label fallback when hideLabel is true', () => {
    render(<Input hideLabel label="Hidden label" />);
    expect(
      screen.getByRole('textbox', { name: 'Hidden label' }),
    ).toBeInTheDocument();
  });

  it('renders supporting text in non-invalid state', () => {
    render(<Input label="Label" supportingText="Supporting text" />);
    expect(screen.getByText('Supporting text')).toBeInTheDocument();
  });

  it('disables the input when disabled is true', () => {
    render(<Input label="Label" disabled supportingText="Unavailable" />);
    expect(screen.getByRole('textbox', { name: 'Label' })).toBeDisabled();
  });

  it('makes the input read-only when readOnly is true', () => {
    render(<Input label="Label" readOnly />);
    const input = screen.getByRole('textbox', { name: 'Label' });

    expect(input).toHaveAttribute('readonly');
    expect(input).not.toHaveAttribute('aria-readonly');
    expect(input).toHaveClass('mds-input-field--readonly');
  });

  it('renders the info tooltip button when infoTooltipLabel is provided', () => {
    render(<Input label="Label" infoTooltipLabel="More about this field" />);
    expect(
      screen.getByRole('button', { name: 'More about this field' }),
    ).toHaveClass('mds-field-info-button');
  });

  it('does not render the info tooltip button when the label is hidden', () => {
    render(
      <Input
        hideLabel
        label="Label"
        infoTooltipLabel="More about this field"
      />,
    );

    expect(
      screen.queryByRole('button', { name: 'More about this field' }),
    ).not.toBeInTheDocument();
  });

  it('renders invalid feedback and aria-invalid when invalid is true', () => {
    render(
      <Input label="Label" invalid invalidFeedback="This field is required." />,
    );

    expect(screen.getByRole('textbox', { name: 'Label' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.getByText('This field is required.')).toBeInTheDocument();
  });

  it('does not apply invalid styling when invalid is true and disabled', () => {
    const { container } = render(
      <Input label="Label" disabled invalid supportingText="Unavailable" />,
    );

    const input = screen.getByRole('textbox', { name: 'Label' });
    expect(input).not.toHaveClass('is-invalid');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(container.querySelector('.mds-input-invalid-icon')).toBeNull();
  });

  it('does not apply invalid styling when invalid is true and readOnly', () => {
    const { container } = render(<Input label="Label" readOnly invalid />);

    const input = screen.getByRole('textbox', { name: 'Label' });
    expect(input).not.toHaveClass('is-invalid');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(container.querySelector('.mds-input-invalid-icon')).toBeNull();
  });

  it('does not render invalidFeedback when invalid is true and readOnly', () => {
    render(
      <Input
        label="Label"
        readOnly
        invalid
        invalidFeedback="Error message"
        supportingText="Guidance text"
      />,
    );

    expect(screen.getByText('Guidance text')).toBeInTheDocument();
    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
  });

  it('renders telephone input when type is tel', () => {
    render(<Input label="Telephone" type="tel" />);
    expect(screen.getByLabelText('Telephone')).toHaveAttribute('type', 'tel');
  });

  it('forwards extra props to the input element', () => {
    render(<Input label="Label" data-testid="input-test-id" />);
    expect(screen.getByTestId('input-test-id')).toBeInTheDocument();
  });

  it('renders startIcon and applies the with-start-icon field class', () => {
    render(
      <Input
        label="Label"
        startIcon={<i data-testid="start-icon" aria-hidden="true" />}
      />,
    );

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Label' })).toHaveClass(
      'mds-input-field--with-start-icon',
    );
  });

  it('does not render start icon markup when startIcon is omitted', () => {
    const { container } = render(<Input label="Label" />);
    expect(container.querySelector('.mds-input-start-icon')).toBeNull();
  });

  it('logs a console.error and drops non-<i>/<svg> elements passed as startIcon at runtime', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Input
        label="Label"
        startIcon={
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (<span data-testid="bad-start-icon" />) as any
        }
      />,
    );

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy.mock.calls[0][0]).toMatch(/startIcon/);
    expect(screen.queryByTestId('bad-start-icon')).not.toBeInTheDocument();

    errorSpy.mockRestore();
  });

  it('surfaces the native validation message on blur when invalidFeedback is not supplied, then clears it once the value becomes valid', () => {
    render(<Input label="Label" required />);
    const input = screen.getByRole('textbox', { name: 'Label' });

    fireEvent.blur(input);

    expect(input).toHaveAttribute('aria-invalid', 'true');
    const nativeMessage = input.validationMessage;
    expect(nativeMessage).not.toBe('');
    expect(screen.getByText(nativeMessage)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'some value' } });

    expect(input).not.toHaveAttribute('aria-invalid');
    expect(screen.queryByText(nativeMessage)).not.toBeInTheDocument();
  });

  it('applies the pointer-focus class when focus follows a pointerdown', () => {
    render(<Input label="Label" />);
    const input = screen.getByRole('textbox', { name: 'Label' });

    fireEvent.pointerDown(input);
    fireEvent.focus(input);

    expect(input).toHaveClass('mds-input-field--pointer-focus');
  });

  it('does not apply the pointer-focus class for a plain keyboard focus', () => {
    render(<Input label="Label" />);
    const input = screen.getByRole('textbox', { name: 'Label' });

    fireEvent.focus(input);

    expect(input).not.toHaveClass('mds-input-field--pointer-focus');
  });
});
