import { forwardRef } from 'react';
import type { BaseInputProps } from './BaseInput';
import { BaseInput } from './BaseInput';

export type InputType = 'email' | 'number' | 'tel' | 'text' | 'url';

const allowedTypes: InputType[] = ['email', 'number', 'tel', 'text', 'url'];

export interface InputProps extends Omit<
  BaseInputProps,
  'inputType' | 'trailingAction'
> {
  /** Restricts input type to design-system-supported non-password text-like types. */
  type?: InputType;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { type, ...props },
  ref,
) {
  const resolvedType: InputType =
    type && allowedTypes.includes(type as InputType) ? type : 'text';

  if (import.meta.env.DEV) {
    if (type && !allowedTypes.includes(type as InputType)) {
      console.warn(
        `[MDS Input] Invalid type "${type}". Falling back to "text". Allowed: ${allowedTypes.join(', ')}`,
      );
    }
  }

  return <BaseInput ref={ref} inputType={resolvedType} {...props} />;
});

Input.displayName = 'Input';
