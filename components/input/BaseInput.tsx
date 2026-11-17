import {
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  forwardRef,
  isValidElement,
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FieldInfoButton } from '../_internal/FieldInfoButton';
import { mergeRefs } from '../_internal/mergeRefs';
import { usePointerFocus } from '../_internal/usePointerFocus';
import {
  focusFirstInvalidOnSubmit,
  useFormReset,
  useSubmitAttemptTracking,
} from '../_internal/validation';

type IconElement = ReactElement<'i' | 'svg'>;

// Runtime guard — prop for icons must be <i> or <svg> elements
const isIconElement = (el: unknown, propName: string): el is IconElement => {
  const valid = isValidElement(el) && (el.type === 'i' || el.type === 'svg');
  if (!valid && el != null && import.meta.env.DEV) {
    console.error(`Input: \`${propName}\` must be an <i> or <svg> element.`);
  }
  return valid;
};

/** Props for BaseInput, the shared field shell behind Input, PasswordInput and SearchInput. */
export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visible label text. Must be a caller-supplied translated string. */
  label?: string;
  /**
   * Hides the label visually while keeping it as the accessible name.
   * @default false
   */
  hideLabel?: boolean;
  /**
   * Marks the field as invalid. Native constraint-validation failures also
   * mark it invalid unless `suppressNativeInvalid` is set. Ignored while the
   * field is disabled or read-only.
   * @default false
   */
  invalid?: boolean;
  /**
   * Error text shown below the field while it is invalid. Falls back to the
   * browser's validation message when omitted.
   */
  invalidFeedback?: string;
  /** Helper text shown below the field while it is not showing an error. */
  supportingText?: string;
  /** Tooltip text for an info button beside the label. Omit to hide the button. */
  infoTooltipLabel?: string;
  /**
   * Native `type` of the underlying `<input>`.
   * @default 'text'
   */
  inputType?: InputHTMLAttributes<HTMLInputElement>['type'];
  /** Icon shown at the start of the field. Must be an `<i>` or `<svg>` element. */
  startIcon?: IconElement;
  /** Control rendered at the end of the field, such as a clear or show-password button. */
  trailingAction?: ReactNode;
  /**
   * When true, native constraint-validation failures (e.g. `pattern`,
   * `required`) don't drive the invalid state — only the `invalid` prop
   * does. Lets consumers (e.g. SearchInput's "invalid only while Empty"
   * rule) gate ALL invalid sources consistently, since native validation
   * attrs pass straight through `...props` to the native `<input>` outside
   * any consumer-level gate.
   */
  suppressNativeInvalid?: boolean;
  /**
   * Attributes for the root wrapper rather than the native `<input>` (which
   * receives `...props`). Lets consumers such as SearchInput turn the root
   * into a landmark without adding an extra element around the field.
   */
  wrapperProps?: Pick<
    HTMLAttributes<HTMLDivElement>,
    'role' | 'aria-label' | 'aria-labelledby'
  >;
}

/** Internal field shell providing the label, feedback, icon and validation behaviour shared by the input components. Use Input, PasswordInput or SearchInput rather than rendering this directly. */
export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  function BaseInput(
    {
      label,
      hideLabel = false,
      invalid = false,
      invalidFeedback,
      supportingText,
      infoTooltipLabel,
      inputType = 'text',
      startIcon,
      trailingAction,
      suppressNativeInvalid = false,
      wrapperProps,
      className,
      id: idProp,
      required,
      disabled,
      readOnly,
      onPointerDown,
      onFocus,
      onBlur,
      onInvalid,
      onChange,
      'aria-label': ariaLabelProp,
      'aria-describedby': ariaDescribedByProp,
      ...inputProps
    },
    ref,
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const hasVisibleLabel = !hideLabel;
    const ariaLabel = hideLabel ? (ariaLabelProp ?? label) : undefined;

    const resolvedStartIcon = isIconElement(startIcon, 'startIcon')
      ? startIcon
      : null;

    // Falls back to the browser's own validationMessage (e.g. "Please fill out this field")
    // when the consumer marks the field invalid without supplying invalidFeedback text.
    const [nativeMessage, setNativeMessage] = useState<string | undefined>(
      undefined,
    );
    // The error a failed submit announced by moving focus onto this field.
    // Kept out of the live region: the focused field already reads it as its
    // description, and VoiceOver lets the live region cut off the focus
    // announcement (label, value and role). Same model as RadioGroup.
    const [errorReadOnFocus, setErrorReadOnFocus] = useState<
      string | undefined
    >(undefined);
    const fieldWrapperRef = useRef<HTMLDivElement>(null);
    useSubmitAttemptTracking(fieldWrapperRef);

    const inputRef = useRef<HTMLInputElement | null>(null);
    // inputRef is a stable ref object, so it's safe to omit from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setRefs = useCallback(mergeRefs(ref, inputRef), [ref]);

    // A reset form is pristine: drop the native error with it.
    useFormReset(inputRef, () => setNativeMessage(undefined), inputProps.form);

    // handleChange only sees user edits. A controlled value set from outside
    // (e.g. a form library) never fires change, so re-check validity whenever
    // it changes. Layout effect so the stale error is never painted.
    // `validity.valid` rather than checkValidity(), which would fire 'invalid'
    // and flag a field the user hasn't touched yet.
    const controlledValue = inputProps.value;
    useLayoutEffect(() => {
      if (inputRef.current?.validity.valid) {
        setNativeMessage(undefined);
      }
    }, [controlledValue]);

    // Native validation failures (e.g. required, type mismatch) mark the field invalid
    // even if the consumer never passed the invalid prop — unless the consumer opts out
    // via suppressNativeInvalid (e.g. SearchInput's "invalid only while Empty" rule).
    // Disabled and read-only fields don't carry an invalid state — invalid is only
    // ever a modifier on top of default/hover/active/focus per the design spec.
    const activeNativeMessage = suppressNativeInvalid
      ? undefined
      : nativeMessage;
    const effectiveInvalid =
      (invalid || !!activeNativeMessage) && !disabled && !readOnly;

    const errorText = invalidFeedback ?? activeNativeMessage;
    const showInvalidFeedback = effectiveInvalid && !!errorText;
    const footerText = showInvalidFeedback ? errorText : supportingText;
    const feedbackId = footerText ? `${id}-feedback` : undefined;

    // Forget the silenced error once it's gone, so a later error is announced.
    // Set during render (not in an effect) so the live region never briefly
    // holds a stale value.
    if (!showInvalidFeedback && errorReadOnFocus !== undefined) {
      setErrorReadOnFocus(undefined);
    }
    // A different message (e.g. the caller swaps invalidFeedback) is still
    // announced; only the one the focus move already read is skipped.
    const liveText =
      showInvalidFeedback && errorText !== errorReadOnFocus ? errorText : '';

    const describedBy =
      [ariaDescribedByProp, feedbackId]
        .filter((entry): entry is string =>
          Boolean(entry && entry.trim().length > 0),
        )
        .join(' ') || undefined;

    const pointerFocus = usePointerFocus();
    const { isPointerFocus } = pointerFocus;

    const handlePointerDown: NonNullable<BaseInputProps['onPointerDown']> = (
      event,
    ) => {
      pointerFocus.markPointerDown();
      onPointerDown?.(event);
    };

    const handleFocus: NonNullable<BaseInputProps['onFocus']> = (event) => {
      pointerFocus.handleFocus();
      onFocus?.(event);
    };

    const handleBlur: NonNullable<BaseInputProps['onBlur']> = (event) => {
      pointerFocus.handleBlur();
      // Check format errors (type, pattern, minLength) on blur rather than
      // waiting for submit: checkValidity() synchronously fires the 'invalid'
      // event handleInvalid listens for. An empty required field is skipped:
      // tabbing past an unanswered field isn't a mistake, and flagging it
      // would mark the form red before the user is done and announce an error
      // over the next field's label. Required errors surface on submit. An
      // empty value can't fail any other constraint, so nothing else is lost.
      const input = event.currentTarget;
      if (!input.validity.valueMissing) input.checkValidity();
      onBlur?.(event);
    };

    const handleInvalid: NonNullable<BaseInputProps['onInvalid']> = (event) => {
      // Suppress the native validation bubble; the message is surfaced via invalidFeedback instead.
      event.preventDefault();
      const message = event.currentTarget.validationMessage;
      setNativeMessage(message);
      // Cancelling also stops the browser focusing the first invalid control on submit.
      const focused = focusFirstInvalidOnSubmit(event.currentTarget);
      // Only a real focus move onto this field makes the screen reader read
      // its description. If it already had focus, or another control took
      // it, the live region still has to announce the error.
      if (focused === event.currentTarget) {
        setErrorReadOnFocus(invalidFeedback ?? message);
      }
      onInvalid?.(event);
    };

    const handleChange: NonNullable<BaseInputProps['onChange']> = (event) => {
      if (nativeMessage && event.currentTarget.checkValidity()) {
        setNativeMessage(undefined);
      }
      onChange?.(event);
    };

    const wrapperClasses = useMemo(() => {
      const classes = ['mds-input'];
      if (className) classes.push(className);
      return classes.join(' ');
    }, [className]);

    const fieldClasses = useMemo(() => {
      const classes = ['mds-input-field', 'form-control'];
      if (effectiveInvalid) classes.push('is-invalid');
      if (readOnly) classes.push('mds-input-field--readonly');
      if (isPointerFocus) classes.push('mds-input-field--pointer-focus');
      if (resolvedStartIcon) classes.push('mds-input-field--with-start-icon');
      if (trailingAction) classes.push('mds-input-field--with-action');
      if (effectiveInvalid) classes.push('mds-input-field--with-status');
      return classes.join(' ');
    }, [
      effectiveInvalid,
      isPointerFocus,
      readOnly,
      resolvedStartIcon,
      trailingAction,
    ]);

    if (import.meta.env.DEV) {
      if (
        hideLabel &&
        !ariaLabelProp &&
        !label &&
        !inputProps['aria-labelledby']
      ) {
        console.warn(
          'Input: label prop, aria-label, or aria-labelledby attribute is required for accessibility when hideLabel is true.',
        );
      }
      if (!hideLabel && !label) {
        console.warn(
          'Input: label prop is required when hideLabel is false. An empty label creates an inaccessible form control.',
        );
      }
      if (!hideLabel && label && ariaLabelProp) {
        console.warn(
          'Input: aria-label is ignored when a visible label is shown (hideLabel is false). The visible label is used as the accessible name instead.',
        );
      }
      if (disabled && !supportingText?.trim()) {
        console.warn(
          'Input: disabled fields should include supportingText that explains why input is unavailable.',
        );
      }
      // Without invalidFeedback, a failed `required` check falls back to the
      // browser's validationMessage, which follows the browser's UI language
      // rather than the page's (Moodle) language. Disabled and read-only
      // fields are barred from constraint validation, and
      // suppressNativeInvalid never shows the native message.
      if (
        required &&
        !disabled &&
        !readOnly &&
        !suppressNativeInvalid &&
        !invalidFeedback?.trim()
      ) {
        console.warn(
          "Input: required fields should pass invalidFeedback so a failed submit does not fall back to the browser's message, which follows the browser's language rather than the user's.",
        );
      }
    }

    return (
      <div {...wrapperProps} className={wrapperClasses}>
        {hasVisibleLabel && (
          <div className="mds-input-label-row">
            <label className="mds-input-label form-label" htmlFor={id}>
              <span className="mds-input-label-text">{label}</span>
              {required && (
                <span className="mds-input-required" aria-hidden="true">
                  *
                </span>
              )}
            </label>

            {infoTooltipLabel && <FieldInfoButton label={infoTooltipLabel} />}
          </div>
        )}

        <div ref={fieldWrapperRef} className="mds-input-field-wrapper">
          {resolvedStartIcon && (
            <span className="mds-input-start-icon" aria-hidden="true">
              {resolvedStartIcon}
            </span>
          )}

          <input
            ref={setRefs}
            id={id}
            className={fieldClasses}
            type={inputType}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={effectiveInvalid ? true : undefined}
            aria-label={ariaLabel}
            aria-describedby={describedBy}
            onPointerDown={handlePointerDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInvalid={handleInvalid}
            onChange={handleChange}
            {...inputProps}
          />

          {(effectiveInvalid || trailingAction) && (
            <div
              className="mds-input-actions"
              aria-hidden={trailingAction ? undefined : true}
            >
              {effectiveInvalid && (
                <i
                  className="mds-input-invalid-icon fa-solid fa-circle-exclamation"
                  aria-hidden="true"
                />
              )}

              {trailingAction}
            </div>
          )}
        </div>

        {footerText && (
          <div
            id={feedbackId}
            className={
              showInvalidFeedback
                ? 'mds-input-invalid-feedback'
                : 'mds-input-supporting-text'
            }
          >
            {footerText}
          </div>
        )}

        {/* Always mounted: screen readers skip live regions that appear in the
            same update as their content. Mirrors the error so it is announced
            when it shows without focus moving onto the field (e.g. a submit
            while it already had focus or while an earlier control is the
            first invalid one, a format error on blur, or the consumer setting
            invalid after an async check). */}
        <span className="visually-hidden" aria-live="polite" aria-atomic="true">
          {liveText}
        </span>
      </div>
    );
  },
);

BaseInput.displayName = 'BaseInput';
