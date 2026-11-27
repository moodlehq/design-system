import {
  type SelectHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FieldInfoButton } from '../_internal/FieldInfoButton.js';
import { mergeRefs } from '../_internal/mergeRefs.js';
import {
  focusFirstInvalidOnSubmit,
  useSubmitAttemptTracking,
} from '../_internal/validation.js';

/** A single choice, rendered as a native `<option>`. */
export interface SelectOption {
  /** Submitted form value. Use `''` for an instructional default option
   *  (e.g. "Select a country") so a `required` Select fails native validation
   *  until a real choice is made. */
  value: string;
  /** Pre-translated, plain-text option label. Native `<option>` elements
   *  cannot render icons, markup, or a second line. */
  label: string;
  /** Prevents this option from being chosen. It stays visible in the list. */
  disabled?: boolean;
  /** BCP 47 language tag, set when the label is in a different language
   *  from the page (e.g. a language picker listing "Deutsch", "日本語") so
   *  screen readers switch pronunciation. Required for WCAG 3.1.2
   *  Language of Parts. */
  lang?: string;
}

/** A labelled group of options, rendered as a native `<optgroup>`. */
export interface SelectOptionGroup {
  /** Pre-translated group heading, rendered as a native `<optgroup>` label. */
  label: string;
  /** Options in the group. Groups cannot be nested. */
  options: SelectOption[];
  /** Prevents every option in the group from being chosen. */
  disabled?: boolean;
}

/** Props for `Select`, a single-choice native `<select>` field. */
export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'children' | 'multiple' | 'size'
> {
  /** Options, each a `SelectOption` (`<option>`) or a `SelectOptionGroup`
   *  (`<optgroup>`), rendered inside the native `<select>`. Select is
   *  single-choice only — multi-select belongs to Combobox. */
  options: (SelectOption | SelectOptionGroup)[];
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

const isOptionGroup = (
  option: SelectOption | SelectOptionGroup,
): option is SelectOptionGroup =>
  'options' in option && Array.isArray(option.options);

const renderOption = (option: SelectOption) => (
  <option
    key={option.value}
    value={option.value}
    disabled={option.disabled}
    lang={option.lang}
  >
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
      onFocus,
      onPointerDown,
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

    const selectRef = useRef<HTMLSelectElement | null>(null);
    // selectRef is a stable ref object, so it's safe to omit from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setRefs = useCallback(mergeRefs(ref, selectRef), [ref]);
    useSubmitAttemptTracking(selectRef);

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
    // The error a failed submit announced by moving focus onto this select.
    // Kept out of the live region: the focused select already reads it as its
    // description, and VoiceOver lets the live region cut off the focus
    // announcement (label, value and role) — same model as RadioGroup.
    const [errorReadOnFocus, setErrorReadOnFocus] = useState<
      string | undefined
    >(undefined);

    // Disabled fields don't carry an invalid state — Figma only defines
    // invalid on top of default/hover/active/focus.
    const effectiveInvalid = (invalid || !!nativeMessage) && !disabled;

    const errorText = invalidFeedback ?? nativeMessage;
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

    // Chromium matches :focus-visible when a <select> is clicked, so track
    // pointer-initiated focus and suppress the keyboard ring for it — same
    // pattern as Input's BaseInput and Textarea.
    const isPointerDownRef = useRef(false);
    const [isPointerFocus, setIsPointerFocus] = useState(false);

    const handlePointerDown: NonNullable<SelectProps['onPointerDown']> = (
      event,
    ) => {
      isPointerDownRef.current = true;
      onPointerDown?.(event);
    };

    const handleFocus: NonNullable<SelectProps['onFocus']> = (event) => {
      setIsPointerFocus(isPointerDownRef.current);
      isPointerDownRef.current = false;
      onFocus?.(event);
    };

    // Deliberately no validation on blur. The only native failure a select
    // can have is `required` with the empty instructional option, and tabbing
    // past an unanswered field isn't a mistake: flagging it would mark the
    // form red before the user is done and announce an error over the next
    // field's label. Required errors surface on submit; they clear once a valid
    // option is picked or set, or the form is reset.
    const handleBlur: NonNullable<SelectProps['onBlur']> = (event) => {
      isPointerDownRef.current = false;
      setIsPointerFocus(false);
      onBlur?.(event);
    };

    const handleInvalid: NonNullable<SelectProps['onInvalid']> = (event) => {
      // Suppress the native bubble; the message is shown as invalid feedback.
      event.preventDefault();
      const message = event.currentTarget.validationMessage;
      setNativeMessage(message);
      // Cancelling 'invalid' also stops the browser focusing the first invalid
      // control on submit; the shared helper restores that, for submit
      // attempts only, so a programmatic checkValidity() never steals focus.
      const focused = focusFirstInvalidOnSubmit(event.currentTarget);
      // Only a real focus move onto this select makes the screen reader read
      // its description. If it already had focus, nothing is read, so the
      // live region still has to announce the error.
      if (focused === event.currentTarget) {
        setErrorReadOnFocus(invalidFeedback ?? message);
      }
      onInvalid?.(event);
    };

    // handleChange only sees user picks. A controlled value set from outside
    // never fires change, so re-check validity whenever it changes. Layout
    // effect so the stale error is never painted. `validity.valid` rather
    // than checkValidity(), which would fire 'invalid' and flag the field.
    const controlledValue = selectProps.value;
    useLayoutEffect(() => {
      if (selectRef.current?.validity.valid) {
        setNativeMessage(undefined);
      }
    }, [controlledValue]);

    // form.reset() restores the default option without firing change, so
    // drop the native error with it: a reset form is pristine, and required
    // errors only surface on the next submit. Deferred because React's
    // onReset handlers run after this native listener (they're delegated to
    // the root), so a consumer's preventDefault() isn't visible yet.
    useEffect(() => {
      const form = selectRef.current?.form;
      if (!form) return;
      let timeout: ReturnType<typeof setTimeout> | undefined;
      const handleReset = (event: Event) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (!event.defaultPrevented) setNativeMessage(undefined);
        });
      };
      form.addEventListener('reset', handleReset);
      return () => {
        form.removeEventListener('reset', handleReset);
        clearTimeout(timeout);
      };
      // The `form` attribute can re-associate the select with another form.
    }, [selectProps.form]);

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
      // Without invalidFeedback, a failed `required` check falls back to the
      // browser's validationMessage, which is in the browser's UI language
      // rather than the page's (Moodle) language. Disabled selects are
      // barred from constraint validation, so they never show it.
      if (required && !disabled && !invalidFeedback?.trim()) {
        console.warn(
          '[MDS Select] required fields should pass invalidFeedback so the error is translated.',
        );
      }
    }

    const wrapperClasses = ['mds-select'];
    if (className) wrapperClasses.push(className);

    const fieldClasses = ['mds-select-field', 'form-select'];
    if (effectiveInvalid) fieldClasses.push('is-invalid');
    if (isPointerFocus) fieldClasses.push('mds-select-field--pointer-focus');

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
            ref={setRefs}
            id={id}
            className={fieldClasses.join(' ')}
            required={required}
            disabled={disabled}
            aria-invalid={effectiveInvalid ? true : undefined}
            aria-label={ariaLabel}
            aria-describedby={describedBy}
            onPointerDown={handlePointerDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInvalid={handleInvalid}
            onChange={handleChange}
            {...selectProps}
          >
            {options.map((option) =>
              isOptionGroup(option) ? (
                <optgroup
                  key={`group-${option.label}`}
                  label={option.label}
                  disabled={option.disabled}
                >
                  {option.options.map(renderOption)}
                </optgroup>
              ) : (
                renderOption(option)
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

        {/* Always mounted: screen readers skip live regions that appear in the
            same update as their content. Mirrors the error so it is announced
            when it shows without focus moving onto the select (e.g. a submit
            while it already had focus or while an earlier control is the
            first invalid one, or the consumer setting invalid after an async
            check). */}
        <span className="visually-hidden" aria-live="polite" aria-atomic="true">
          {liveText}
        </span>
      </div>
    );
  },
);

Select.displayName = 'Select';
