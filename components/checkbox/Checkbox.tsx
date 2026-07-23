import {
  type InputHTMLAttributes,
  forwardRef,
  useEffect,
  useId,
  useRef,
} from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visible label text. When hideLabel is true this also serves as the aria-label fallback
   *  if no explicit aria-label prop is provided. */
  label?: string;
  /** When true, the visible label element is hidden. The input is still labelled accessibly
   *  via aria-label (prop) → label (prop) in that order of precedence. Suppresses
   *  invalidFeedback — feedback text requires a visible label to provide context. */
  hideLabel?: boolean;
  /** Marks the input as invalid: applies danger border/label colour and sets aria-invalid.
   *  Independent of invalidFeedback — invalid styling can be shown without a message. */
  invalid?: boolean;
  /** Pre-translated error message rendered below the label. Requires invalid={true} and
   *  hideLabel={false} to be displayed. */
  invalidFeedback?: string;
  /** Renders the checkbox in a mixed state, typically for "select all" parent controls.
   *  This state is visual/semantic and should usually be controlled by parent logic. */
  indeterminate?: boolean;
  /** Optional supporting/helper text shown below the label in non-error state.
   *  Hidden when hideLabel is true. */
  supportingText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      invalidFeedback,
      invalid,
      indeterminate = false,
      supportingText,
      className,
      label,
      hideLabel = false,
      id: idProp,
      required,
      'aria-label': ariaLabelProp,
      ...inputProps
    }: CheckboxProps,
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const hasVisibleLabel = !hideLabel;
    const isInvalid = !!invalid;
    const isIndeterminate = !!indeterminate;
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = isIndeterminate;
    }, [isIndeterminate]);

    const warnDev = (condition: boolean, message: string) => {
      if (import.meta.env.DEV && condition) {
        console.warn(message);
      }
    };

    if (import.meta.env.DEV) {
      warnDev(
        hideLabel && !ariaLabelProp && !label,
        'Checkbox: label prop or aria-label attribute is required for accessibility when hideLabel is true.',
      );
      warnDev(
        !hideLabel && !label,
        'Checkbox: label prop is required when hideLabel is false. An empty label creates an inaccessible form control.',
      );
      warnDev(
        hideLabel && !!invalidFeedback,
        'Checkbox: invalidFeedback is ignored when hideLabel is true. Feedback text requires a visible label to provide context.',
      );
      warnDev(
        !hideLabel && !!invalidFeedback && !invalid,
        'Checkbox: invalidFeedback is provided without invalid={true}. Pass invalid={true} to apply invalid styling alongside the feedback text.',
      );
    }

    const classes = ['mds-checkbox'];
    if (hasVisibleLabel) classes.push('form-check');
    if (className) {
      classes.push(className);
    }

    const ariaLabel = hideLabel ? (ariaLabelProp ?? label) : undefined;
    const messageText = hasVisibleLabel
      ? isInvalid && invalidFeedback
        ? invalidFeedback
        : supportingText
      : undefined;
    const hasInvalidFeedback =
      hasVisibleLabel && isInvalid && !!invalidFeedback;
    const feedbackId = messageText ? `${id}-feedback` : undefined;

    return (
      <div className={classes.join(' ')}>
        <input
          className={[
            'mds-checkbox-input',
            'form-check-input',
            isInvalid ? 'is-invalid' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          ref={(node) => {
            // Keep a local ref for the native indeterminate property while still forwarding refs.
            inputRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          {...inputProps}
          type="checkbox"
          required={required}
          aria-invalid={isInvalid ? true : undefined}
          aria-label={ariaLabel}
          aria-checked={isIndeterminate ? 'mixed' : undefined}
          aria-describedby={feedbackId}
          id={id}
        />
        {hasVisibleLabel && (
          <label className="mds-checkbox-label form-check-label" htmlFor={id}>
            <span className="mds-checkbox-label-text">{label}</span>
            {required && (
              <span className="mds-checkbox-required" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        {feedbackId && (
          <div
            id={feedbackId}
            className={[
              'mds-checkbox-feedback',
              hasInvalidFeedback
                ? 'invalid-feedback'
                : 'mds-checkbox-supporting-text',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {messageText}
          </div>
        )}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';
