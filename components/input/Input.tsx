import { type InputHTMLAttributes, type ReactElement, forwardRef } from 'react';
import { BaseInput } from './BaseInput';

export type InputType = 'email' | 'number' | 'tel' | 'text' | 'url';

const allowedTypes: InputType[] = ['email', 'number', 'tel', 'text', 'url'];

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visible label text. */
  label?: string;
  /** Hides the visible label while preserving accessible labelling via aria-label or label. */
  hideLabel?: boolean;
  /** Marks the field as invalid and applies danger styling. */
  invalid?: boolean;
  /** Error message shown below the field when invalid is true. */
  invalidFeedback?: string;
  /** Helper text shown below the field when no invalid feedback is displayed. */
  supportingText?: string;
  /** Pre-translated label for the info tooltip icon next to the visible label.
   *  Ignored when hideLabel is true. */
  infoTooltipLabel?: string;
  /** Restricts input type to design-system-supported non-password text-like types. */
  type?: InputType;
  /** Decorative icon rendered at the start of the field. Accepts only intrinsic `<i>` or `<svg>` elements. */
  startIcon?: ReactElement<'i' | 'svg'>;
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
