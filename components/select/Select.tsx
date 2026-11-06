import { type SelectHTMLAttributes, forwardRef, useId, useState } from 'react';
import { FieldInfoButton } from '../_internal/FieldInfoButton';

export interface SelectOption {
  /** Submitted form value. Use `''` for an instructional default option
   *  (e.g. "Select a country") so a `required` Select fails native validation
   *  until a real choice is made. */
  value: string;
  /** Pre-translated, plain-text option label. Native `<option>` elements
   *  cannot render icons, markup, or a second line. */
  label: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  /** Pre-translated group heading, rendered as a native `<optgroup>` label. */
  label: string;
  options: SelectOption[];
  disabled?: boolean;
}

export type SelectOptionItem = SelectOption | SelectOptionGroup;

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'children' | 'multiple' | 'size'
> {
  /** Options (and optional `<optgroup>` groups) rendered inside the native
   *  `<select>`. Select is single-choice only — multi-select belongs to
   *  Combobox. */
  options: SelectOptionItem[];
  /** Visible label text. When hideLabel is true this also serves as the
   *  aria-label fallback if no explicit aria-label prop is provided. */
  label?: string;
  /** When true, the visible label is hidden. The select is still labelled
   *  accessibly via aria-label (prop) → label (prop) in that order. */
  hideLabel?: boolean;
  /** Marks the field as invalid: danger border, trailing icon, aria-invalid.
   *  Has no effect when disabled — Figma doesn't define disabled + invalid. */
  invalid?: boolean;
  /** Pre-translated error message shown below the field while invalid.
   *  Replaces supportingText while shown. */
  invalidFeedback?: string;
  /** Pre-translated helper text shown below the field. */
  supportingText?: string;
  /** Pre-translated label for the info button beside the visible label. */
  infoTooltipLabel?: string;
}

const isOptionGroup = (item: SelectOptionItem): item is SelectOptionGroup =>
  'options' in item && Array.isArray(item.options);

const renderOption = (option: SelectOption) => (
  <option key={option.value} value={option.value} disabled={option.disabled}>
    {option.label}
  </option>
);

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      options,
      label,
      hideLabel = false,
      invalid = false,
      invalidFeedback,
      supportingText,
      infoTooltipLabel,
      className,
      id: idProp,
      required,
      disabled,
      onBlur,
      onInvalid,
      onChange,
      'aria-label': ariaLabelProp,
      'aria-describedby': ariaDescribedByProp,
      ...rest
    },
    ref,
  ) {
    // `multiple` and `size` are omitted from the public type (multi-select and
    // list-box rendering are out of scope — that's Combobox), but untyped JS
    // consumers can still pass them. Strip them so the field always renders as
    // a single-choice closed select matching the design.
    const {
      multiple,
      size,
      ...selectProps
    }: typeof rest & { multiple?: unknown; size?: unknown } = rest;

    const generatedId = useId();
    const id = idProp ?? generatedId;

    const hasVisibleLabel = !hideLabel;
    const ariaLabel = hideLabel ? (ariaLabelProp ?? label) : undefined;

    // Native constraint-validation message (e.g. "Please select an item in the
    // list") surfaced when `required` fails and the consumer didn't pass the
    // invalid prop — same model as Input's BaseInput.
    const [nativeMessage, setNativeMessage] = useState<string | undefined>(
      undefined,
    );

    // Disabled fields don't carry an invalid state — Figma only defines
    // invalid on top of default/hover/active/focus.
    const effectiveInvalid = (invalid || !!nativeMessage) && !disabled;

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

    const handleBlur: NonNullable<SelectProps['onBlur']> = (event) => {
      // Validate on blur rather than waiting for submit; fires the 'invalid'
      // event handled below when a required select still holds value="".
      event.currentTarget.checkValidity();
      onBlur?.(event);
    };

    const handleInvalid: NonNullable<SelectProps['onInvalid']> = (event) => {
      // Suppress the native bubble; the message is shown as invalid feedback.
      event.preventDefault();
      setNativeMessage(event.currentTarget.validationMessage);
      onInvalid?.(event);
    };

    const handleChange: NonNullable<SelectProps['onChange']> = (event) => {
      if (nativeMessage && event.currentTarget.checkValidity()) {
        setNativeMessage(undefined);
      }
      onChange?.(event);
    };

    if (import.meta.env.DEV) {
      if (multiple || size != null) {
        console.warn(
          '[MDS Select] `multiple` and `size` are not supported and were ignored. Use a Combobox for multi-select.',
        );
      }
      if (
        hideLabel &&
        !ariaLabelProp &&
        !label &&
        !selectProps['aria-labelledby']
      ) {
        console.warn(
          '[MDS Select] label prop, aria-label, or aria-labelledby attribute is required for accessibility when hideLabel is true.',
        );
      }
      if (!hideLabel && !label) {
        console.warn(
          '[MDS Select] label prop is required when hideLabel is false. An empty label creates an inaccessible form control.',
        );
      }
      if (!hideLabel && label && ariaLabelProp) {
        console.warn(
          '[MDS Select] aria-label is ignored when a visible label is shown (hideLabel is false). The visible label is used as the accessible name instead.',
        );
      }
      if (disabled && !supportingText?.trim()) {
        console.warn(
          '[MDS Select] disabled fields should include supportingText that explains why the field is unavailable.',
        );
      }
    }

    const wrapperClasses = ['mds-select'];
    if (className) wrapperClasses.push(className);

    const fieldClasses = ['mds-select-field', 'form-select'];
    if (effectiveInvalid) fieldClasses.push('is-invalid');

    return (
      <div className={wrapperClasses.join(' ')}>
        {hasVisibleLabel && (
          <div className="mds-select-label-row">
            <label className="mds-select-label form-label" htmlFor={id}>
              <span className="mds-select-label-text">{label}</span>
              {required && (
                <span className="mds-select-required" aria-hidden="true">
                  *
                </span>
              )}
            </label>
            {infoTooltipLabel && <FieldInfoButton label={infoTooltipLabel} />}
          </div>
        )}

        <div className="mds-select-field-wrapper">
          <select
            ref={ref}
            id={id}
            className={fieldClasses.join(' ')}
            required={required}
            disabled={disabled}
            aria-invalid={effectiveInvalid ? true : undefined}
            aria-label={ariaLabel}
            aria-describedby={describedBy}
            onBlur={handleBlur}
            onInvalid={handleInvalid}
            onChange={handleChange}
            {...selectProps}
          >
            {options.map((item) =>
              isOptionGroup(item) ? (
                <optgroup
                  key={`group-${item.label}`}
                  label={item.label}
                  disabled={item.disabled}
                >
                  {item.options.map(renderOption)}
                </optgroup>
              ) : (
                renderOption(item)
              ),
            )}
          </select>

          {/* Decorative icons sit over the select's reserved end padding with
              pointer-events: none, so the whole field stays the native
              <select> hit target and focus never lands on an icon. */}
          <span className="mds-select-icons" aria-hidden="true">
            {effectiveInvalid && (
              /* Invalid must not rely on colour alone (WCAG 1.4.1). */
              <i className="mds-select-invalid-icon fa-solid fa-circle-exclamation" />
            )}
            <span className="mds-select-chevron" />
          </span>
        </div>

        {footerText && (
          <div
            id={feedbackId}
            className={
              showInvalidFeedback
                ? 'mds-select-invalid-feedback'
                : 'mds-select-supporting-text'
            }
          >
            {footerText}
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
