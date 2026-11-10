import {
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
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
  /**
   * Ref to the field wrapper (the bordered box around the start icon, input
   * and trailing action). Lets consumers such as Combobox anchor a floating
   * surface to the whole field rather than just the native `<input>`.
   */
  fieldWrapperRef?: Ref<HTMLDivElement>;
  /**
   * Wraps the native `<input>` inside the field wrapper, between the start
   * icon and the trailing action. Lets consumers such as Combobox render
   * chosen values as siblings of the input within one wrapping flex row.
   */
  wrapField?: (input: ReactElement) => ReactNode;
  /**
   * Overrides the native `required` attribute on the `<input>` without
   * changing the required asterisk, which follows `required`. Lets
   * consumers such as Combobox keep the field marked required visually while
   * only enforcing it natively when no value has been chosen.
   */
  inputRequired?: boolean;
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
      fieldWrapperRef,
      wrapField,
      inputRequired,
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
    // even if the consumer never passed the invalid prop — unless the consumer opts out
    // via suppressNativeInvalid (e.g. SearchInput's "invalid only while Empty" rule).
    // Disabled and read-only fields don't carry an invalid state — invalid is only
    // ever a modifier on top of default/hover/active/focus per the design spec.
    const activeNativeMessage = suppressNativeInvalid
      ? undefined
      : nativeMessage;
    const effectiveInvalid =
      (invalid || !!activeNativeMessage) && !disabled && !readOnly;

    const showInvalidFeedback =
      effectiveInvalid && !!(invalidFeedback || activeNativeMessage);
    const footerText = showInvalidFeedback
      ? (invalidFeedback ?? activeNativeMessage)
      : supportingText;
    const feedbackId = footerText ? `${id}-feedback` : undefined;

    const describedBy =
      [ariaDescribedByProp, feedbackId]
        .filter((entry): entry is string =>
          Boolean(entry && entry.trim().length > 0),
        )
        .join(' ') || undefined;

    const nativeRequired = inputRequired ?? required;

    // BaseInput needs its own handle on the <input> to re-run validation when
    // the native `required` attribute changes, while still forwarding the
    // consumer's ref.
    const localInputRef = useRef<HTMLInputElement | null>(null);
    const setInputRef = useCallback(
      (node: HTMLInputElement | null) => {
        localInputRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    // A message raised by an earlier failed validation otherwise lingers until
    // the next change event. When the constraint changes without one (e.g. a
    // Combobox value is chosen and `inputRequired` drops to false), clear it
    // as soon as the input is valid again. Reads `validity` rather than
    // calling checkValidity() so no extra 'invalid' event is fired.
    useEffect(() => {
      // Only for consumers that drive `inputRequired`; plain inputs keep their
      // existing validation timing.
      if (inputRequired === undefined) return;
      if (nativeMessage && localInputRef.current?.validity.valid) {
        setNativeMessage(undefined);
      }
    }, [inputRequired, nativeRequired, nativeMessage]);

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
    }

    const inputElement = (
      <input
        ref={setInputRef}
        id={id}
        className={fieldClasses}
        type={inputType}
        required={nativeRequired}
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
    );

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

          {wrapField ? wrapField(inputElement) : inputElement}

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
