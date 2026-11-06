import {
  type ChangeEvent,
  type FocusEvent,
  type FocusEventHandler,
  type HTMLAttributes,
  type InvalidEvent,
  type PointerEvent,
  type Ref,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FieldInfoButton } from '../_internal/FieldInfoButton';
import {
  focusFirstInvalidOnSubmit,
  useSubmitAttemptTracking,
} from '../_internal/validation';
import { Radio } from './Radio';

export type RadioGroupOrientation = 'vertical' | 'horizontal';

const allowedOrientations: RadioGroupOrientation[] = ['vertical', 'horizontal'];

// Figma's Options slot accepts 2 to 5 Radio Buttons; outside that range the
// design calls for Checkbox/Switch (one option) or Select (six or more).
const MIN_OPTIONS = 2;
const MAX_OPTIONS = 5;

// Horizontal never wraps (Figma/ZeroHeight: "Switch to Vertical when the
// options no longer fit"), so the group makes that switch itself instead of
// overflowing sideways at narrow widths or high zoom (WCAG 1.4.10 Reflow).
//
// The horizontal row is laid out with flex-wrap, which lets the group shrink
// inside a container sized to its content, and it fits when every option
// lands on the first line. A wrapped row is measured in a layout effect and
// swapped for the vertical layout before the browser paints it. While
// vertical, the group can't tell how much room it has, so whenever it or an
// ancestor resizes it tries horizontal again the same way.
const isOnOneLine = (element: HTMLElement) => {
  const { firstElementChild: first, lastElementChild: last } = element;
  // flex-wrap fills lines in order, so the row has wrapped exactly when the
  // last option sits on a different line from the first.
  if (!first || !last || first === last) return true;
  // Half a pixel absorbs sub-pixel rounding.
  return (
    Math.abs(
      last.getBoundingClientRect().top - first.getBoundingClientRect().top,
    ) < 0.5
  );
};

function useFitsOnOneLine(enabled: boolean, contentKey: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [measured, setMeasured] = useState({ key: contentKey, fits: true });
  // New options render horizontal again until they've been measured.
  const fits = !enabled || measured.key !== contentKey || measured.fits;

  const setFits = useCallback(
    (nextFits: boolean) =>
      setMeasured((previous) =>
        previous.key === contentKey && previous.fits === nextFits
          ? previous
          : { key: contentKey, fits: nextFits },
      ),
    [contentKey],
  );

  // Every horizontal render is measured before paint.
  useLayoutEffect(() => {
    if (enabled && fits && ref.current) setFits(isOnOneLine(ref.current));
  }, [enabled, fits, setFits]);

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element || typeof ResizeObserver === 'undefined') return;

    // Only a change in width can change whether the row fits. Ancestors grow
    // taller over and over while a page loads, so height-only changes are
    // skipped rather than re-measuring the options for each one.
    const widths = new WeakMap<Element, number>();
    const observer = new ResizeObserver((entries) => {
      let widthChanged = false;
      for (const { target, contentRect } of entries) {
        if (widths.get(target) !== contentRect.width) widthChanged = true;
        widths.set(target, contentRect.width);
      }
      if (!widthChanged) return;

      const horizontal = element.classList.contains(
        'mds-radio-group-options--horizontal',
      );
      // Horizontal: check it still fits. Vertical: try horizontal again.
      setFits(horizontal ? isOnOneLine(element) : true);
    });
    // The group and every ancestor: in a container sized to its content, a
    // change in the space available only shows further up the tree.
    for (let node: Element | null = element; node; node = node.parentElement) {
      observer.observe(node);
    }
    // Options resize too when web fonts load or labels change. setFits
    // changes with contentKey, so new options re-run this effect and are
    // observed in turn.
    for (const option of Array.from(element.children)) observer.observe(option);
    return () => observer.disconnect();
  }, [enabled, setFits]);

  return [ref, fits] as const;
}

export interface RadioGroupOption {
  /** Value submitted with the form when this option is selected. */
  value: string;
  /** Pre-translated visible label for the option. */
  label: string;
  /**
   * Disables this option only. It stays visible, arrow keys skip it, and it
   * isn't submitted with the form even when selected. Explain why it's
   * unavailable in the group's `supportingText`. To disable every option, use
   * the group's `disabled` instead.
   */
  disabled?: boolean;
}

/**
 * `aria-label`, `aria-labelledby`, and `aria-describedby` apply to the inner
 * `radiogroup` element. `className`, `ref`, and every other attribute apply
 * to the root wrapper.
 */
export interface RadioGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  /** Pre-translated group label (the question). Also the accessible name fallback when hideLabel is true. */
  label?: string;
  /** Hides the visible label row (label, required marker, info button). Supply aria-label, aria-labelledby, or label so the group keeps an accessible name. */
  hideLabel?: boolean;
  /** The options to render, each as a Radio. Use 2 to 5 options. */
  options: RadioGroupOption[];
  /** Shared name for every radio input. Generated when omitted. */
  name?: string;
  /** Selected value (controlled). Pair with onChange. */
  value?: string;
  /** Initially selected value (uncontrolled). */
  defaultValue?: string;
  /**
   * Called with the newly selected value when the selection changes.
   *
   * The value comes first, so React Hook Form's `register()` (which expects an
   * event) isn't supported. Use `Controller` instead:
   * `<RadioGroup value={field.value} onChange={field.onChange} onBlur={field.onBlur} inputRef={field.ref} />`.
   */
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  /** Called when focus leaves the group. Moving between radios, or from the info button to a radio, doesn't count. */
  onBlur?: FocusEventHandler<HTMLDivElement>;
  /** Ref to the first enabled radio input, for programmatic focus (for example a form library focusing the field on error). `ref` targets the root wrapper. */
  inputRef?: Ref<HTMLInputElement>;
  /** Layout of the options. Defaults to 'vertical'. Horizontal does not wrap: it switches to vertical by itself when the options don't fit on one line. Use it only for a few short labels. */
  orientation?: RadioGroupOrientation;
  /** Marks the group as required: shows the asterisk and enables native required validation on the radios. */
  required?: boolean;
  /** Disables every radio and mutes the supporting text. Takes precedence over invalid. */
  disabled?: boolean;
  /**
   * Marks every radio invalid and turns the supporting text to the danger colour.
   *
   * Fully controlled: the group stays invalid until the caller sets `invalid`
   * to false, so the error on screen always matches the form's state. Clear it
   * in `onChange` (form libraries that re-validate on change, like React Hook
   * Form after a failed submit, do this for you). Only the native `required`
   * error clears by itself once an option is selected.
   */
  invalid?: boolean;
  /**
   * Pre-translated error message shown in place of supportingText while invalid.
   *
   * Also shown when native required validation fails, in place of the
   * browser's message (which follows the browser's language, not the user's).
   * Pass it whenever `required` is set, even while `invalid` is false.
   */
  invalidFeedback?: string;
  /** Pre-translated guidance shown below the options. */
  supportingText?: string;
  /** Pre-translated accessible name for the info button. The button is rendered only when this is set. */
  infoTooltipLabel?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      label,
      hideLabel = false,
      options,
      name: nameProp,
      value,
      defaultValue,
      onChange,
      onBlur,
      onPointerDown,
      inputRef,
      orientation,
      required,
      disabled = false,
      invalid = false,
      invalidFeedback,
      supportingText,
      infoTooltipLabel,
      className,
      id: idProp,
      'aria-label': ariaLabelProp,
      'aria-labelledby': ariaLabelledByProp,
      'aria-describedby': ariaDescribedByProp,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const name = nameProp ?? `${id}-name`;
    const labelId = `${id}-label`;

    // Mirrors BaseInput: a native `required` failure on submit shows the
    // browser's validation message in the supporting text row instead of the
    // native bubble, and clears as soon as an option is selected.
    const [nativeMessage, setNativeMessage] = useState<string | undefined>(
      undefined,
    );

    if (import.meta.env.DEV) {
      if (
        orientation &&
        !allowedOrientations.includes(orientation as RadioGroupOrientation)
      ) {
        console.warn(
          `[MDS RadioGroup] Invalid orientation "${orientation}". Falling back to "vertical". Allowed: ${allowedOrientations.join(', ')}`,
        );
      }
      if (hideLabel && !ariaLabelProp && !ariaLabelledByProp && !label) {
        console.warn(
          '[MDS RadioGroup] label prop, aria-label, or aria-labelledby is required for accessibility when hideLabel is true.',
        );
      }
      if (!hideLabel && !label) {
        console.warn(
          '[MDS RadioGroup] label prop is required when hideLabel is false. An unlabelled group creates an inaccessible form control.',
        );
      }
      if (options.length < MIN_OPTIONS || options.length > MAX_OPTIONS) {
        console.warn(
          `[MDS RadioGroup] received ${options.length} options. Use ${MIN_OPTIONS} to ${MAX_OPTIONS}; use Checkbox or Switch for a single option and Select for 6 or more.`,
        );
      }
      if (
        !disabled &&
        options.length > 0 &&
        options.every((option) => option.disabled)
      ) {
        console.warn(
          '[MDS RadioGroup] every option is disabled. Set disabled on the group instead, so the group is announced as disabled and its supporting text mutes.',
        );
      }
      const selectedValue = value ?? defaultValue;
      if (
        selectedValue !== undefined &&
        options.some(
          (option) => option.value === selectedValue && option.disabled,
        )
      ) {
        console.warn(
          `[MDS RadioGroup] the selected value "${selectedValue}" belongs to a disabled option. Disabled inputs aren't submitted, so the form won't receive it, and it still satisfies required.`,
        );
      }
      if (value !== undefined && !onChange) {
        console.warn(
          '[MDS RadioGroup] value is provided without onChange. The selection cannot change; use defaultValue for an uncontrolled group.',
        );
      }
      if (invalid && !disabled && !invalidFeedback) {
        console.warn(
          '[MDS RadioGroup] invalid is set without invalidFeedback. Pass an error message so the invalid state does not rely on colour alone.',
        );
      } else if (required && !disabled && !invalidFeedback) {
        console.warn(
          "[MDS RadioGroup] required is set without invalidFeedback. Pass a pre-translated error message so a failed submit does not fall back to the browser's message, which follows the browser's language rather than the user's.",
        );
      }
    }

    const resolvedOrientation: RadioGroupOrientation =
      orientation &&
      allowedOrientations.includes(orientation as RadioGroupOrientation)
        ? orientation
        : 'vertical';

    const [optionsRef, fitsOnOneLine] = useFitsOnOneLine(
      resolvedOrientation === 'horizontal',
      options
        .map((option) => `${option.value}\u0000${option.label}`)
        .join('\u0001'),
    );
    useSubmitAttemptTracking(optionsRef);
    const layoutOrientation: RadioGroupOrientation = fitsOnOneLine
      ? resolvedOrientation
      : 'vertical';

    // Disabled takes precedence: Figma doesn't define a disabled + invalid group.
    // Caller `invalid` is never overridden here; only the native message, which
    // the group owns, is cleared internally.
    const effectiveInvalid = (invalid || !!nativeMessage) && !disabled;
    const errorText = invalidFeedback ?? nativeMessage;
    const showInvalidFeedback = effectiveInvalid && !!errorText;
    const footerText = showInvalidFeedback ? errorText : supportingText;
    const feedbackId = footerText ? `${id}-feedback` : undefined;

    const describedBy =
      [ariaDescribedByProp, feedbackId].filter(Boolean).join(' ') || undefined;

    // The visible label names the group; when it's hidden, a consumer
    // aria-labelledby wins, then aria-label, then the label prop.
    const groupLabelledBy = hideLabel ? ariaLabelledByProp : labelId;

    const isControlled = value !== undefined;

    // A disabled radio can't take focus, so inputRef goes to the first one
    // that can. With every option disabled, it falls back to the first.
    const inputRefIndex = Math.max(
      0,
      options.findIndex((option) => !option.disabled),
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (nativeMessage) setNativeMessage(undefined);
      onChange?.(event.target.value, event);
    };

    const handleInvalid = (event: InvalidEvent<HTMLInputElement>) => {
      // Suppress the native bubble; the message is shown in the footer instead.
      event.preventDefault();
      setNativeMessage(event.currentTarget.validationMessage);
      // On submit, focus moves to the form's first invalid control. When that's
      // this group's first radio, which the footer describes, the error is
      // announced rather than appearing silently.
      focusFirstInvalidOnSubmit(event.currentTarget);
    };

    const pressingOptionRef = useRef(false);
    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
      onPointerDown?.(event);
      if (!optionsRef.current?.contains(event.target as Node)) return;
      pressingOptionRef.current = true;
      // The press can end outside the group, so listen on the window.
      const listeners = new AbortController();
      const release = () => {
        pressingOptionRef.current = false;
        listeners.abort();
      };
      const listenerOptions = { capture: true, signal: listeners.signal };
      window.addEventListener('pointerup', release, listenerOptions);
      window.addEventListener('pointercancel', release, listenerOptions);
    };

    // React's onBlur bubbles, so the root also hears focus moving inside the
    // group. Reporting only focus leaving it stops form libraries marking the
    // field touched, and validating it, before anyone has made a choice.
    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
      if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
        return;
      }
      // WebKit reports a null relatedTarget when a click on another option
      // takes focus off the current radio, and doesn't focus the clicked one.
      // A press on an option still means the user is choosing, not leaving.
      if (event.relatedTarget === null && pressingOptionRef.current) return;
      onBlur?.(event);
    };

    const classes = ['mds-radio-group'];
    if (className) classes.push(className);

    const footerClasses = ['mds-radio-group-supporting-text'];
    // Figma turns the whole support row danger while invalid, whether it holds
    // the error message or the resting supporting text.
    if (effectiveInvalid) {
      footerClasses.push('mds-radio-group-supporting-text--invalid');
    }
    if (disabled)
      footerClasses.push('mds-radio-group-supporting-text--disabled');

    // The radiogroup role sits on the options wrapper, not the root: ARIA only
    // lets a radiogroup own radios, and the label row holds the info button.
    return (
      <div
        ref={ref}
        id={id}
        className={classes.join(' ')}
        onBlur={handleBlur}
        onPointerDown={handlePointerDown}
        {...props}
      >
        {!hideLabel && (
          <div className="mds-radio-group-label-row">
            <span id={labelId} className="mds-radio-group-label">
              <span className="mds-radio-group-label-text">{label}</span>
              {required && (
                <span className="mds-radio-group-required" aria-hidden="true">
                  *
                </span>
              )}
            </span>
            {infoTooltipLabel && <FieldInfoButton label={infoTooltipLabel} />}
          </div>
        )}

        <div
          ref={optionsRef}
          role="radiogroup"
          className={`mds-radio-group-options mds-radio-group-options--${layoutOrientation}`}
          aria-labelledby={groupLabelledBy}
          aria-label={groupLabelledBy ? undefined : (ariaLabelProp ?? label)}
          aria-describedby={describedBy}
          aria-required={required ? true : undefined}
          aria-disabled={disabled ? true : undefined}
        >
          {options.map((option, index) => (
            <Radio
              key={option.value}
              ref={index === inputRefIndex ? inputRef : undefined}
              name={name}
              value={option.value}
              label={option.label}
              required={required}
              disabled={disabled || option.disabled}
              invalid={effectiveInvalid}
              {...(isControlled
                ? { checked: option.value === value }
                : { defaultChecked: option.value === defaultValue })}
              // Support for descriptions on grouping elements is uneven, so the
              // error is also on each radio and is read on every focus. Resting
              // supporting text stays on the group only, to avoid repeating it
              // on every arrow-key move.
              aria-describedby={showInvalidFeedback ? feedbackId : undefined}
              onChange={handleChange}
              onInvalid={handleInvalid}
            />
          ))}
        </div>

        {footerText && (
          <div id={feedbackId} className={footerClasses.join(' ')}>
            {footerText}
          </div>
        )}

        {/* Always mounted: screen readers skip live regions that appear in the
            same update as their content. Mirrors the error so it is announced
            when it shows without focus moving into the group (e.g. on blur). */}
        <span className="visually-hidden" aria-live="polite" aria-atomic="true">
          {showInvalidFeedback ? errorText : ''}
        </span>
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
