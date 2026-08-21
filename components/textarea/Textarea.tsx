import {
  type ChangeEvent,
  type TextareaHTMLAttributes,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { Button } from '../button';
import { Tooltip } from '../tooltip';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label text. When hideLabel is true this also serves as the aria-label
   *  fallback if no explicit aria-label prop is provided. */
  label?: string;
  /** When true, the visible label element is hidden. The textarea is still labelled
   *  accessibly via aria-label (prop) → label (prop) in that order of precedence. */
  hideLabel?: boolean;
  /** Marks the field as invalid: applies danger border colour and sets aria-invalid.
   *  Independent of invalidFeedback — invalid styling can be shown without a message. */
  invalid?: boolean;
  /** Pre-translated error message rendered below the field. Requires invalid={true}
   *  to be displayed. */
  invalidFeedback?: string;
  /** Optional supporting/helper text shown in the footer row when the field is not
   *  in the invalid+feedback state. */
  supportingText?: string;
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
}

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
      'aria-label': ariaLabelProp,
      ...textareaProps
    }: TextareaProps,
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const isInvalid = !!invalid;
    const hasVisibleLabel = !hideLabel;
    const ariaLabel = hideLabel ? (ariaLabelProp ?? label) : undefined;

    // Invalid feedback is suppressed when the label is hidden — it requires a
    // visible label to provide context. Supporting text and the counter are
    // independent of label visibility and remain shown.
    const showFeedback =
      hasVisibleLabel && isInvalid && !disabled && !!invalidFeedback;
    const footerText = showFeedback ? invalidFeedback : supportingText;
    const feedbackId = footerText ? `${id}-feedback` : undefined;

    // Character count is derived from controlled value length or defaultValue length at mount.
    // Counter only renders when showCounter=true and maxLength is provided.
    const showCounterEl = showCounter && maxLength != null;
    const counterId = showCounterEl ? `${id}-counter` : undefined;
    // Combine feedback and counter IDs so both are announced on field focus.
    const describedBy =
      [feedbackId, counterId].filter(Boolean).join(' ') || undefined;

    const [currentLength, setCurrentLength] = useState(
      value != null
        ? String(value).length
        : defaultValue != null
          ? String(defaultValue).length
          : 0,
    );

    // Tracks the previous remaining count to detect milestone crossings.
    const prevRemainingRef = useRef<number | null>(null);

    // Tracks whether the current focus was initiated by a pointer (mouse/touch).
    // Used to suppress the focus ring for pointer-initiated focus — the border
    // change alone indicates the typing/selected state; the ring is reserved for
    // keyboard navigation (WCAG 2.4.11 focus appearance is still satisfied because
    // the focus ring is always shown for keyboard users).
    const isPointerDownRef = useRef(false);
    const [isPointerFocus, setIsPointerFocus] = useState(false);
    // Announcement text for the visually-hidden live region. Updated only at
    // thresholds so the counter does not announce on every keystroke.
    const [announcement, setAnnouncement] = useState('');

    useEffect(() => {
      if (value != null) {
        setCurrentLength(String(value).length);
        // Keep prevRemainingRef in sync with controlled value updates so the
        // milestone logic in handleChange uses the correct previous baseline.
        if (showCounterEl && maxLength != null) {
          prevRemainingRef.current = maxLength - String(value).length;
        }
      }
    }, [value, maxLength, showCounterEl]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (showCounterEl) {
        const newLength = event.target.value.length;
        setCurrentLength(newLength);

        if (maxLength != null) {
          const remaining = maxLength - newLength;
          const prev = prevRemainingRef.current;
          prevRemainingRef.current = remaining;

          // Announce only at meaningful milestones (ZeroHeight: throttle
          // announcements — not on every keystroke).
          if (prev !== null) {
            if (remaining < 0) {
              setAnnouncement(
                `${Math.abs(remaining)} over the ${maxLength} character limit`,
              );
            } else {
              const milestones = [20, 10, 5, 0];
              for (const threshold of milestones) {
                if (prev > threshold && remaining <= threshold) {
                  setAnnouncement(
                    `${remaining} of ${maxLength} characters remaining`,
                  );
                  break;
                }
              }
            }
          }
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
      if (showCounter && maxLength == null) {
        console.warn(
          'Textarea: showCounter=true requires maxLength to be set so the counter can display a maximum.',
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
            {infoTooltipLabel && (
              <Tooltip label={infoTooltipLabel} variant="light">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mds-textarea-info-button"
                  aria-label={infoTooltipLabel}
                  startIcon={
                    <i className="fa-solid fa-circle-info" aria-hidden="true" />
                  }
                />
              </Tooltip>
            )}
          </div>
        )}
        <div className="mds-textarea-field-wrapper">
          <textarea
            ref={ref}
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
            aria-readonly={readOnly ? true : undefined}
            onChange={handleChange}
            onPointerDown={(e) => {
              isPointerDownRef.current = true;
              onPointerDown?.(e);
            }}
            onFocus={(e) => {
              if (isPointerDownRef.current) {
                setIsPointerFocus(true);
                isPointerDownRef.current = false;
              }
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsPointerFocus(false);
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
                  showFeedback
                    ? 'mds-textarea-feedback invalid-feedback'
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
                  aria-label={`${currentLength} of ${maxLength} characters`}
                >
                  {currentLength} / {maxLength}
                </span>
                {/* Visually-hidden live region fires only at milestones so the
                    counter does not announce on every keystroke. */}
                <span
                  className="mds-textarea-counter-announcement"
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
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
