import {
  type ChangeEvent,
  type TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
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

/** A pre-translated counter message, or a callback that builds one from the
 *  current value and maxLength (e.g. `(n, max) => t('chars', { n, max })`). */
export type TextareaCounterMessageFormatter =
  string | ((value: number, maxLength: number) => string);

/** Props for Textarea. */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label text. When hideLabel is true this also serves as the aria-label
   *  fallback if no explicit aria-label prop is provided. */
  label?: string;
  /** When true, the visible label element is hidden. The textarea is still labelled
   *  accessibly via aria-label (prop) → label (prop) in that order of precedence. */
  hideLabel?: boolean;
  /** Marks the field as invalid: applies danger border colour and sets aria-invalid.
   *  Independent of invalidFeedback — invalid styling can be shown without a message.
   *  Native constraint-validation failures (e.g. `required`, `minLength`) also mark
   *  it invalid. Has no effect when disabled or readOnly — those states don't carry
   *  an invalid state. */
  invalid?: boolean;
  /** Pre-translated error message rendered below the field while it is invalid.
   *  Also shown when native validation fails, in place of the browser's message
   *  (which follows the browser's language, not the user's), so pass it whenever
   *  `required` or `minLength` is set. */
  invalidFeedback?: string;
  /** Optional supporting/helper text shown in the footer row when the field is not
   *  in the invalid+feedback state. */
  supportingText?: string;
  /** Use disabled only when the field is unavailable for input.
   *  Provide supportingText to explain why the control is disabled. */
  disabled?: boolean;
  /** Use readOnly when existing content must remain readable/copyable
   *  but should not be editable. */
  readOnly?: boolean;
  /** When true the textarea renders a native resize handle (CSS resize: vertical).
   *  Defaults to true. */
  resizable?: boolean;
  /** When true, shows a live character counter (current / maxLength) in the footer row.
   *  Requires maxLength to be set. */
  showCounter?: boolean;
  /** Pre-translated label for the info tooltip shown beside the field label.
   *  When provided, a `circle-info` icon button appears next to the label; hovering
   *  or focusing it reveals a tooltip with this text. Only shown when the label is
   *  visible (`hideLabel` is false or omitted). */
  infoTooltipLabel?: string;
  /** Accessible label for the visible counter text (for example,
   *  "12 of 100 characters") as a translated string or formatter callback. */
  counterAriaLabel?: TextareaCounterMessageFormatter;
  /** Live-region announcement for remaining-character milestones (20, 10, 5, 0)
   *  as a translated string or formatter callback. */
  counterRemainingAnnouncement?: TextareaCounterMessageFormatter;
  /** Live-region announcement for over-limit state as a translated string or
   *  formatter callback. */
  counterOverLimitAnnouncement?: TextareaCounterMessageFormatter;
}

/** Multi-line text field with optional character counter, supporting text and validation feedback. For single-line values use Input. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      hideLabel = false,
      invalid,
      invalidFeedback,
      supportingText,
      resizable = true,
      showCounter = false,
      infoTooltipLabel,
      counterAriaLabel,
      counterRemainingAnnouncement,
      counterOverLimitAnnouncement,
      className,
      id: idProp,
      required,
      disabled,
      readOnly,
      rows = 3,
      maxLength,
      value,
      defaultValue,
      onChange,
      onPointerDown,
      onFocus,
      onBlur,
      onInvalid,
      'aria-label': ariaLabelProp,
      'aria-describedby': ariaDescribedByProp,
      ...textareaProps
    }: TextareaProps,
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    // textareaRef is a stable ref object, so it's safe to omit from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setRefs = useCallback(mergeRefs(ref, textareaRef), [ref]);
    useSubmitAttemptTracking(textareaRef);

    // Native constraint-validation message (e.g. "Please fill out this field")
    // surfaced when `required` or `minLength` fails, in place of the native
    // bubble — same model as Input's BaseInput.
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

    // Disabled and read-only fields don't carry an invalid state — invalid is only
    // ever a modifier on top of default/hover/active/focus per the design spec.
    const isInvalid = (!!invalid || !!nativeMessage) && !disabled && !readOnly;
    const hasVisibleLabel = !hideLabel;
    const ariaLabel = hideLabel ? (ariaLabelProp ?? label) : undefined;

    // Invalid feedback is tied to invalid state, independent of label visibility.
    // Supporting text is replaced when feedback is shown.
    const errorText = invalidFeedback ?? nativeMessage;
    const showInvalidFeedback = isInvalid && !!errorText;
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

    // A reset form is pristine: drop the native error with it.
    useFormReset(
      textareaRef,
      () => setNativeMessage(undefined),
      textareaProps.form,
    );

    // handleChange only sees user edits. A controlled value set from outside
    // (e.g. a form library) never fires change, so re-check validity whenever
    // it changes. Layout effect so the stale error is never painted.
    // `validity.valid` rather than checkValidity(), which would fire 'invalid'
    // and flag a field the user hasn't touched yet.
    useLayoutEffect(() => {
      if (textareaRef.current?.validity.valid) {
        setNativeMessage(undefined);
      }
    }, [value]);

    // Character count is derived from controlled value length or defaultValue length at mount.
    // Counter only renders when showCounter=true and maxLength is provided.
    const showCounterEl = showCounter && maxLength != null;
    const counterId = showCounterEl ? `${id}-counter` : undefined;
    // Combine feedback and counter IDs so both are announced on field focus.
    const describedBy =
      [ariaDescribedByProp, feedbackId, counterId]
        .filter((id): id is string => Boolean(id && id.trim().length > 0))
        .join(' ') || undefined;

    const [currentLength, setCurrentLength] = useState(
      value != null
        ? String(value).length
        : defaultValue != null
          ? String(defaultValue).length
          : 0,
    );

    // Tracks the previous remaining count to detect milestone crossings.
    const prevRemainingRef = useRef<number | null>(null);

    const pointerFocus = usePointerFocus();
    const { isPointerFocus } = pointerFocus;
    // Announcement text for the visually-hidden live region. Updated only at
    // thresholds so the counter does not announce on every keystroke.
    const [announcement, setAnnouncement] = useState('');

    const resolveCounterMessage = (
      formatter: TextareaCounterMessageFormatter | undefined,
      value: number,
      max: number,
    ) => {
      if (!formatter) return undefined;
      return typeof formatter === 'function'
        ? formatter(value, max)
        : formatter;
    };

    const updateAnnouncementForRemaining = useCallback(
      (remaining: number, prev: number | null) => {
        if (prev === null || maxLength == null) return;

        // Announce only at meaningful milestones (ZeroHeight: throttle
        // announcements — not on every keystroke).
        if (remaining < 0) {
          const overLimitText = resolveCounterMessage(
            counterOverLimitAnnouncement,
            Math.abs(remaining),
            maxLength,
          );
          if (overLimitText) setAnnouncement(overLimitText);
          return;
        }

        const milestones = [20, 10, 5, 0];
        for (const threshold of milestones) {
          if (prev > threshold && remaining <= threshold) {
            const remainingText = resolveCounterMessage(
              counterRemainingAnnouncement,
              remaining,
              maxLength,
            );
            if (remainingText) setAnnouncement(remainingText);
            break;
          }
        }
      },
      [maxLength, counterOverLimitAnnouncement, counterRemainingAnnouncement],
    );

    useEffect(() => {
      if (value != null) {
        const nextLength = String(value).length;
        const nextRemaining =
          showCounterEl && maxLength != null ? maxLength - nextLength : null;
        const prevRemaining = prevRemainingRef.current;

        setCurrentLength(String(value).length);
        // Keep prevRemainingRef in sync with controlled value updates so the
        // milestone logic in handleChange uses the correct previous baseline.
        if (nextRemaining != null) {
          updateAnnouncementForRemaining(nextRemaining, prevRemaining);
          prevRemainingRef.current = nextRemaining;
        }
      }
    }, [value, maxLength, showCounterEl, updateAnnouncementForRemaining]);

    const handleInvalid: NonNullable<TextareaProps['onInvalid']> = (event) => {
      // Suppress the native bubble; the message is shown as invalid feedback.
      event.preventDefault();
      const message = event.currentTarget.validationMessage;
      setNativeMessage(message);
      // Cancelling also stops the browser focusing the first invalid control
      // on submit; the shared helper restores that, for submit attempts only.
      const focused = focusFirstInvalidOnSubmit(event.currentTarget);
      // Only a real focus move onto this field makes the screen reader read
      // its description. If it already had focus, or another control took
      // it, the live region still has to announce the error.
      if (focused === event.currentTarget) {
        setErrorReadOnFocus(invalidFeedback ?? message);
      }
      onInvalid?.(event);
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (nativeMessage && event.currentTarget.checkValidity()) {
        setNativeMessage(undefined);
      }
      if (showCounterEl) {
        const newLength = event.target.value.length;
        setCurrentLength(newLength);

        if (maxLength != null) {
          const remaining = maxLength - newLength;
          const prev = prevRemainingRef.current;
          prevRemainingRef.current = remaining;
          updateAnnouncementForRemaining(remaining, prev);
        }
      }

      onChange?.(event);
    };

    if (import.meta.env.DEV) {
      if (hideLabel && !ariaLabelProp && !label) {
        console.warn(
          'Textarea: label prop or aria-label attribute is required for accessibility when hideLabel is true.',
        );
      }
      if (!hideLabel && !label) {
        console.warn(
          'Textarea: label prop is required when hideLabel is false. An empty label creates an inaccessible form control.',
        );
      }
      if (!hideLabel && label && ariaLabelProp) {
        console.warn(
          'Textarea: aria-label is ignored when a visible label is shown (hideLabel is false). The visible label is used as the accessible name instead.',
        );
      }
      if (showCounter && maxLength == null) {
        console.warn(
          'Textarea: showCounter=true requires maxLength to be set so the counter can display a maximum.',
        );
      }
      if (disabled && !supportingText?.trim()) {
        console.warn(
          'Textarea: disabled fields should include supportingText that explains why input is unavailable.',
        );
      }
      // Without invalidFeedback, a failed native check falls back to the
      // browser's validationMessage, which follows the browser's UI language
      // rather than the page's (Moodle) language. Disabled and read-only
      // fields are barred from constraint validation.
      if (
        (required || textareaProps.minLength != null) &&
        !disabled &&
        !readOnly &&
        !invalidFeedback?.trim()
      ) {
        console.warn(
          "Textarea: required and minLength fields should pass invalidFeedback so a failed check does not fall back to the browser's message, which follows the browser's language rather than the user's.",
        );
      }
    }

    const wrapperClasses = ['mds-textarea'];
    if (className) wrapperClasses.push(className);

    const textareaClasses = ['mds-textarea-field', 'form-control'];
    if (isInvalid) textareaClasses.push('is-invalid');
    if (!resizable) textareaClasses.push('mds-textarea-field--no-resize');
    if (readOnly) textareaClasses.push('mds-textarea-field--readonly');
    if (isPointerFocus)
      textareaClasses.push('mds-textarea-field--pointer-focus');

    return (
      <div className={wrapperClasses.join(' ')}>
        {hasVisibleLabel && (
          <div className="mds-textarea-label-row">
            <label className="mds-textarea-label form-label" htmlFor={id}>
              <span className="mds-textarea-label-text">{label}</span>
              {required && (
                <span className="mds-textarea-required" aria-hidden="true">
                  *
                </span>
              )}
            </label>
            {infoTooltipLabel && <FieldInfoButton label={infoTooltipLabel} />}
          </div>
        )}
        <div className="mds-textarea-field-wrapper">
          <textarea
            ref={setRefs}
            id={id}
            className={textareaClasses.join(' ')}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            rows={rows}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            aria-invalid={isInvalid ? true : undefined}
            aria-label={ariaLabel}
            aria-describedby={describedBy}
            onChange={handleChange}
            onInvalid={handleInvalid}
            onPointerDown={(e) => {
              pointerFocus.markPointerDown();
              onPointerDown?.(e);
            }}
            onFocus={(e) => {
              pointerFocus.handleFocus();
              onFocus?.(e);
            }}
            onBlur={(e) => {
              pointerFocus.handleBlur();
              // Check minLength on blur rather than waiting for submit. An
              // empty required field is skipped: tabbing past an unanswered
              // field isn't a mistake, so required errors surface on submit.
              // An empty value can't fail any other constraint.
              const textarea = e.currentTarget;
              if (!textarea.validity.valueMissing) textarea.checkValidity();
              onBlur?.(e);
            }}
            {...textareaProps}
          />
          {isInvalid && (
            /* circle-exclamation icon: invalid state must not rely on colour alone (WCAG 1.4.1) */
            <i
              className="fa-solid fa-circle-exclamation mds-textarea-invalid-icon"
              aria-hidden="true"
            />
          )}
        </div>
        {(footerText || showCounterEl) && (
          <div className="mds-textarea-footer">
            {feedbackId ? (
              <span
                id={feedbackId}
                className={
                  showInvalidFeedback
                    ? 'mds-textarea-invalid-feedback'
                    : 'mds-textarea-supporting-text'
                }
              >
                {footerText}
              </span>
            ) : (
              /* Spacer keeps the counter right-aligned when there is no footer text */
              <span className="mds-textarea-footer-spacer" aria-hidden="true" />
            )}
            {showCounterEl && (
              <>
                <span
                  id={counterId}
                  className="mds-textarea-counter"
                  dir="ltr"
                  aria-label={resolveCounterMessage(
                    counterAriaLabel,
                    currentLength,
                    maxLength,
                  )}
                >
                  {currentLength} / {maxLength}
                </span>
                {/* Visually-hidden live region fires only at milestones so the
                    counter does not announce on every keystroke. */}
                <span
                  className="visually-hidden"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {announcement}
                </span>
              </>
            )}
          </div>
        )}

        {/* Always mounted: screen readers skip live regions that appear in the
            same update as their content. Mirrors the error so it is announced
            when it shows without focus moving onto the field (e.g. a submit
            while it already had focus or while an earlier control is the
            first invalid one, or the consumer setting invalid after an async
            check). Separate from the counter's milestone announcements. */}
        <span className="visually-hidden" aria-live="polite" aria-atomic="true">
          {liveText}
        </span>
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
