import { forwardRef, useState } from 'react';
import { Button } from '../button/Button';
import { Tooltip } from '../tooltip/Tooltip';
import type { BaseInputProps } from './BaseInput';
import { BaseInput } from './BaseInput';

export interface PasswordInputProps extends Omit<
  BaseInputProps,
  'inputType' | 'startIcon' | 'trailingAction'
> {
  /** Accessible label for the visibility toggle when the password is hidden. */
  passwordToggleShowLabel: string;
  /** Accessible label for the visibility toggle when the password is visible. */
  passwordToggleHideLabel: string;
}

// Fixed per design: password fields always show a lock icon at the start of the field.
const lockIcon = (
  <i
    className="fa-solid fa-lock mds-input-password-lock-icon"
    aria-hidden="true"
  />
);

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      className,
      disabled,
      passwordToggleShowLabel,
      passwordToggleHideLabel,
      ...props
    },
    ref,
  ) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const classes = ['mds-password-input'];
    if (className) classes.push(className);

    const toggleLabel = isPasswordVisible
      ? passwordToggleHideLabel
      : passwordToggleShowLabel;

    const toggleButton = (
      <Tooltip label={toggleLabel} variant="light">
        <Button
          type="button"
          variant="ghost"
          className="mds-input-password-toggle"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
          aria-label={toggleLabel}
          disabled={disabled}
          startIcon={
            <i
              className={
                isPasswordVisible
                  ? 'mds-input-password-toggle-icon mds-input-password-toggle-icon--visible'
                  : 'mds-input-password-toggle-icon mds-input-password-toggle-icon--hidden'
              }
              aria-hidden="true"
            />
          }
        />
      </Tooltip>
    );

    return (
      <BaseInput
        ref={ref}
        inputType={isPasswordVisible ? 'text' : 'password'}
        startIcon={lockIcon}
        trailingAction={toggleButton}
        className={classes.join(' ')}
        disabled={disabled}
        {...props}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
