import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput: Unit Test', () => {
  it('applies the mds-password-input class name', () => {
    const { container } = render(
      <PasswordInput
        label="Password"
        passwordToggleShowLabel="Show password"
        passwordToggleHideLabel="Hide password"
      />,
    );

    expect(
      container.firstElementChild?.classList.contains('mds-password-input'),
    ).toBe(true);
  });

  it('always renders a decorative lock icon at the start of the field', () => {
    const { container } = render(
      <PasswordInput
        label="Password"
        passwordToggleShowLabel="Show password"
        passwordToggleHideLabel="Hide password"
      />,
    );

    const icon = container.querySelector('.mds-input-start-icon .fa-lock');
    expect(icon).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toHaveClass(
      'mds-input-field--with-start-icon',
    );
  });

  it('forces input type=password and toggles to text when the visibility button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <PasswordInput
        label="Password"
        passwordToggleShowLabel="Show password"
        passwordToggleHideLabel="Hide password"
      />,
    );

    const input = screen.getByLabelText('Password');
    expect(input.getAttribute('type')).toBe('password');

    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(input.getAttribute('type')).toBe('text');

    await user.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(input.getAttribute('type')).toBe('password');
  });

  it('disables the input and the visibility toggle button when disabled is true', () => {
    render(
      <PasswordInput
        label="Password"
        disabled
        supportingText="Unavailable"
        passwordToggleShowLabel="Show password"
        passwordToggleHideLabel="Hide password"
      />,
    );

    expect(screen.getByLabelText('Password')).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Show password' }),
    ).toBeDisabled();
  });

  it('forwards extra props to the underlying input element', () => {
    render(
      <PasswordInput
        label="Password"
        data-testid="password-input"
        passwordToggleShowLabel="Show password"
        passwordToggleHideLabel="Hide password"
      />,
    );

    expect(screen.queryByTestId('password-input')).not.toBeNull();
  });

  it('forwards refs to the underlying input element', () => {
    const ref = { current: null as HTMLInputElement | null };

    render(
      <PasswordInput
        label="Password"
        ref={ref}
        passwordToggleShowLabel="Show password"
        passwordToggleHideLabel="Hide password"
      />,
    );

    expect(ref.current).toBe(screen.getByLabelText('Password'));
  });

  it('wraps the visibility toggle in a light-variant tooltip showing the current action label', async () => {
    const user = userEvent.setup();

    render(
      <PasswordInput
        label="Password"
        passwordToggleShowLabel="Show password"
        passwordToggleHideLabel="Hide password"
      />,
    );

    const toggle = screen.getByRole('button', { name: 'Show password' });
    expect(toggle.closest('.mds-tooltip')).toHaveClass('mds-tooltip--light');

    const tooltip = screen.getByRole('tooltip', { hidden: true });
    expect(tooltip).toHaveTextContent('Show password');

    await user.click(toggle);
    expect(screen.getByRole('tooltip', { hidden: true })).toHaveTextContent(
      'Hide password',
    );
  });
});
