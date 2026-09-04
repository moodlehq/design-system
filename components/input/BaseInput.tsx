import {
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  forwardRef,
  isValidElement,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FieldInfoButton } from '../_internal/FieldInfoButton';

type IconElement = ReactElement<'i' | 'svg'>;

// Runtime guard — prop for icons must be <i> or <svg> elements
const isIconElement = (el: unknown, propName: string): el is IconElement => {
  const valid = isValidElement(el) && (el.type === 'i' || el.type === 'svg');
  if (!valid && el != null && import.meta.env.DEV) {
    console.error(`Input: \`${propName}\` must be an <i> or <svg> element.`);
  }
  return valid;
};

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hideLabel?: boolean;
  invalid?: boolean;
  invalidFeedback?: string;
  supportingText?: string;
  infoTooltipLabel?: string;
  inputType?: InputHTMLAttributes<HTMLInputElement>['type'];
  startIcon?: IconElement;
  trailingAction?: ReactNode;
}

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

    // Native validation failures (e.g. required, type mismatch) mark the field invalid
    // even if the consumer never passed the invalid prop.
    // Disabled and read-only fields don't carry an invalid state — invalid is only
    // ever a modifier on top of default/hover/active/focus per the design spec.
    const effectiveInvalid =
      (invalid || !!nativeMessage) && !disabled && !readOnly;

    const showInvalidFeedback =
      effectiveInvalid && !!(invalidFeedback || nativeMessage);
    const footerText = showInvalidFeedback
      ? (invalidFeedback ?? nativeMessage)
      : supportingText;
    const feedbackId = footerText ? `${id}-feedback` : undefined;

    const describedBy =
      [ariaDescribedByProp, feedbackId]
        .filter((entry): entry is string =>
          Boolean(entry && entry.trim().length > 0),
        )
        .join(' ') || undefined;

    const isPointerDownRef = useRef(false);
    const [isPointerFocus, setIsPointerFocus] = useState(false);

    const handlePointerDown: NonNullable<BaseInputProps['onPointerDown']> = (
      event,
    ) => {
      isPointerDownRef.current = true;
      onPointerDown?.(event);
    };

    const handleFocus: NonNullable<BaseInputProps['onFocus']> = (event) => {
      setIsPointerFocus(isPointerDownRef.current);
      isPointerDownRef.current = false;
      onFocus?.(event);
    };

    const handleBlur: NonNullable<BaseInputProps['onBlur']> = (event) => {
      isPointerDownRef.current = false;
      setIsPointerFocus(false);
      // Trigger native constraint validation on blur rather than waiting for
      // form submit — synchronously fires the 'invalid' event handleInvalid
      // already listens for.
      event.currentTarget.checkValidity();
      onBlur?.(event);
    };

    const handleInvalid: NonNullable<BaseInputProps['onInvalid']> = (event) => {
      // Suppress the native validation bubble; the message is surfaced via invalidFeedback instead.
      event.preventDefault();
      setNativeMessage(event.currentTarget.validationMessage);
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
      if (hideLabel && !ariaLabelProp && !label) {
        console.warn(
          'Input: label prop or aria-label attribute is required for accessibility when hideLabel is true.',
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
    }

    return (
      <div className={wrapperClasses}>
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

        <div className="mds-input-field-wrapper">
          {resolvedStartIcon && (
            <span className="mds-input-start-icon" aria-hidden="true">
              {resolvedStartIcon}
            </span>
          )}

          <input
            ref={ref}
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
      </div>
    );
  },
);

BaseInput.displayName = 'BaseInput';
