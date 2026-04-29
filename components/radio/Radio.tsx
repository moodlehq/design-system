import { type InputHTMLAttributes, forwardRef, useId } from 'react';

// Extend InputHTMLAttributes to allow passing any valid input attributes, but also add our custom props like feedback and label.
export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visible label text. When hideLabel is true this also serves as the aria-label fallback
   *  if no explicit aria-label prop is provided. */
  label?: string;
  /** When true, the visible label element is hidden. The input is still labelled accessibly
   *  via aria-label (prop) → label (prop) in that order of precedence. Suppresses
   *  invalidFeedback — feedback text requires a visible label to provide context.
   *
   *  Use cases: hideLabel is appropriate when the visual label would be redundant or visually cluttered,
   *  such as in dense tables where the column header acts as the label, or in icon-only UIs. Always ensure
   *  an accessible name is provided via aria-label or label prop. */
  hideLabel?: boolean;
  /** Marks the input as invalid: applies danger border/label colour and sets aria-invalid.
   *  Independent of invalidFeedback — invalid styling can be shown without a message. */
  invalid?: boolean;
  /** Pre-translated error message rendered below the label. Requires invalid={true} and
   *  hideLabel={false} to be displayed. Only invalid feedback is supported; is-valid
   *  and neutral feedback states are intentionally not implemented. */
  invalidFeedback?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      invalidFeedback,
      invalid,
      className,
      label,
      hideLabel = false,
      ...props
    }: RadioProps,
    ref,
  ) => {
    const generatedId = useId();
    const id = props.id ?? generatedId;

    // The invalid state on the input (border, aria-invalid) is independent of
    // hideLabel — a label-less input can still be invalid. Only the feedback text
    // requires a visible label for context and is suppressed when hideLabel is true.
    const isInvalid = !!invalid;

    if (import.meta.env.DEV) {
      if (hideLabel && !props['aria-label'] && !label) {
        console.warn(
          'Radio: label prop or aria-label attribute is required for accessibility when hideLabel is true.',
        );
      }
      if (!hideLabel && !label) {
        console.warn(
          'Radio: label prop is required when hideLabel is false. An empty label creates an inaccessible form control.',
        );
      }
      if (hideLabel && invalidFeedback) {
        console.warn(
          'Radio: invalidFeedback is ignored when hideLabel is true. Feedback text requires a visible label to provide context.',
        );
      }
      if (!hideLabel && invalidFeedback && !invalid) {
        console.warn(
          'Radio: invalidFeedback is provided without invalid={true}. Pass invalid={true} to apply invalid styling alongside the feedback text.',
        );
      }
    }
    // Build the class list for the radio wrapper div. mds-form-check is always applied
    // as a stable hook for consumers; form-check and layout classes are added only when
    // the label is visible (Bootstrap label/feedback styling and grid layout).
    const classes = ['mds-form-check'];
    if (!hideLabel) {
      classes.push('form-check');
    }
    if (className) {
      classes.push(className);
    }

    // When the label is hidden, derive aria-label from: caller's aria-label → label prop → undefined (warned above).
    const ariaLabel = hideLabel ? (props['aria-label'] ?? label) : undefined;

    // Link the input to its feedback text so screen readers announce the error message.
    // The ID is only generated when feedback will actually be rendered.
    const feedbackId =
      invalidFeedback && !hideLabel && invalid ? `${id}-feedback` : undefined;

    return (
      <div className={classes.join(' ')}>
        <input
          className={[
            'mds-form-check-input',
            'form-check-input',
            isInvalid ? 'is-invalid' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          type="radio"
          ref={ref}
          {...props}
          aria-invalid={isInvalid ? true : undefined}
          aria-label={ariaLabel}
          aria-describedby={feedbackId}
          id={id} // Ensure we use the generated ID if no ID is provided, so the label can be properly associated with the input for accessibility.
        />
        {!hideLabel && (
          <label className="mds-form-check-label form-check-label" htmlFor={id}>
            {label}
          </label>
        )}
        {feedbackId && (
          <div
            id={feedbackId}
            className="mds-form-check-feedback invalid-feedback"
          >
            {invalidFeedback}
          </div>
        )}
      </div>
    );
  },
);
Radio.displayName = 'Radio';
