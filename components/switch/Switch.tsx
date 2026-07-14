import { type InputHTMLAttributes, forwardRef, useId } from 'react';

export type SwitchVariant = 'enable' | 'visibility' | 'lock';
export type SwitchLabelSide = 'end' | 'start';

const allowedVariants: SwitchVariant[] = ['enable', 'visibility', 'lock'];
const allowedLabelSides: SwitchLabelSide[] = ['end', 'start'];

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  /** Visible label text. When hideLabel is true this also serves as the aria-label fallback
   *  if no explicit aria-label prop is provided. */
  label?: string;
  /** When true, hides the visible label text while preserving an accessible name on the input. */
  hideLabel?: boolean;
  /** Semantic variant that controls the thumb icon set. */
  variant?: SwitchVariant;
  /** Places the label after (end) or before (start) the switch indicator. */
  labelSide?: SwitchLabelSide;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      hideLabel = false,
      variant = 'enable',
      labelSide = 'end',
      className,
      id: idProp,
      'aria-label': ariaLabelProp,
      disabled,
      ...inputProps
    }: SwitchProps,
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    if (import.meta.env.DEV) {
      if (variant && !allowedVariants.includes(variant as SwitchVariant)) {
        console.warn(
          `[MDS Switch] Invalid variant "${variant}". Falling back to "enable". Allowed: ${allowedVariants.join(', ')}`,
        );
      }

      if (
        labelSide &&
        !allowedLabelSides.includes(labelSide as SwitchLabelSide)
      ) {
        console.warn(
          `[MDS Switch] Invalid labelSide "${labelSide}". Falling back to "end". Allowed: ${allowedLabelSides.join(', ')}`,
        );
      }

      if (hideLabel && !ariaLabelProp?.trim() && !label) {
        console.warn(
          'Switch: label prop or aria-label attribute is required for accessibility when hideLabel is true.',
        );
      }
      if (!hideLabel && !label) {
        console.warn(
          'Switch: label prop is required when hideLabel is false. An empty label creates an inaccessible form control.',
        );
      }

      if (
        inputProps.checked !== undefined &&
        !inputProps.onChange &&
        !inputProps.readOnly
      ) {
        console.warn(
          'Switch: checked prop was provided without onChange. Controlled inputs require onChange (or readOnly) to update state.',
        );
      }
    }

    const resolvedVariant =
      variant && allowedVariants.includes(variant as SwitchVariant)
        ? variant
        : 'enable';

    const resolvedLabelSide =
      labelSide && allowedLabelSides.includes(labelSide as SwitchLabelSide)
        ? labelSide
        : 'end';

    const classes = [
      'mds-switch',
      `mds-switch--variant-${resolvedVariant}`,
      `mds-switch--label-${resolvedLabelSide}`,
      hideLabel ? 'mds-switch--label-hidden' : '',
    ];

    if (className) {
      classes.push(className);
    }

    const nonEmptyAriaLabel = ariaLabelProp?.trim();
    const ariaLabel = hideLabel
      ? nonEmptyAriaLabel
        ? ariaLabelProp
        : label
      : undefined;
    const shouldRenderVisibleLabel = !hideLabel && !!label;

    return (
      <div className={classes.filter(Boolean).join(' ')}>
        <input
          {...inputProps}
          id={id}
          ref={ref}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className="mds-switch-input"
          aria-label={ariaLabel}
        />
        <label className="mds-switch-control" htmlFor={id}>
          <span className="mds-switch-indicator" aria-hidden="true">
            <span className="mds-switch-focus-ring">
              <span className="mds-switch-track">
                <span className="mds-switch-thumb">
                  {/* Keep both icon states mounted so checked/unchecked can crossfade smoothly. */}
                  <span className="mds-switch-icon">
                    <span className="mds-switch-icon-item mds-switch-icon-item--unchecked" />
                    <span className="mds-switch-icon-item mds-switch-icon-item--checked" />
                  </span>
                </span>
              </span>
            </span>
          </span>
          {/* Visible switch labels intentionally remain single-line; multiline label layout is unsupported. */}
          {shouldRenderVisibleLabel && (
            <span className="mds-switch-label">{label}</span>
          )}
        </label>
      </div>
    );
  },
);
Switch.displayName = 'Switch';
