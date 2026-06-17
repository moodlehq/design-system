import {
  type InputHTMLAttributes,
  type ReactElement,
  forwardRef,
  isValidElement,
  useId,
} from 'react';

type IconElement = ReactElement<'i' | 'svg'>;

export interface ChoiceboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  /**
   * Required primary label text identifying the option.
   * Keep to 1–5 words for readability.
   */
  label: string;
  /**
   * Optional supporting/descriptive text displayed below the label.
   * Used to add context the label alone cannot convey. Aim for 1–2 lines.
   */
  supportingText?: string;
  /**
   * Optional icon rendered before the label group.
   * Must be an <i> or <svg> element. Use only when the icon adds meaning.
   */
  icon?: IconElement;
}

// Runtime guard — icon must be an <i> or <svg> element.
const isIconElement = (el: unknown, propName: string): el is IconElement => {
  const valid = isValidElement(el) && (el.type === 'i' || el.type === 'svg');
  if (!valid && el != null && import.meta.env.DEV) {
    console.error(
      `Choicebox: \`${propName}\` must be an <i> or <svg> element.`,
    );
  }
  return valid;
};

export const Choicebox = forwardRef<HTMLInputElement, ChoiceboxProps>(
  function Choicebox(
    {
      label,
      supportingText,
      icon,
      className,
      id: idProp,
      'aria-describedby': ariaDescribedByProp,
      ...inputProps
    }: ChoiceboxProps,
    ref,
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    // ID used to associate supporting text with the input via aria-describedby
    // so screen readers announce the description after the label.
    const supportingTextId = supportingText
      ? `${id}-supporting-text`
      : undefined;

    const ariaDescribedBy =
      [supportingTextId, ariaDescribedByProp].filter(Boolean).join(' ') ||
      undefined;

    const resolvedIcon = isIconElement(icon, 'icon') ? icon : null;

    if (import.meta.env.DEV) {
      if (!label) {
        console.warn(
          'Choicebox: label prop is required. An empty label creates an inaccessible form control.',
        );
      }
    }

    const wrapperClasses = ['mds-choicebox-wrapper'];
    if (className) wrapperClasses.push(className);

    return (
      <div className={wrapperClasses.join(' ')}>
        {/* The input is visually hidden but participates in the DOM for form
            submission, keyboard navigation, and screen reader semantics.
            pointer-events: none prevents it from intercepting clicks — the
            <label> for= association handles click delegation instead. */}
        <input
          {...inputProps}
          type="radio"
          className="mds-choicebox-input"
          id={id}
          ref={ref}
          aria-describedby={ariaDescribedBy}
        />
        <label className="mds-choicebox" htmlFor={id}>
          {resolvedIcon && (
            <span className="mds-choicebox-icon" aria-hidden="true">
              {resolvedIcon}
            </span>
          )}
          <span className="mds-choicebox-labels">
            <span className="mds-choicebox-label">{label}</span>
            {supportingText && (
              <span
                id={supportingTextId}
                className="mds-choicebox-supporting-text"
              >
                {supportingText}
              </span>
            )}
          </span>
          {/* Decorative indicator — aria-hidden since the input provides all
              semantics. CSS drives the circle/check appearance via sibling
              state selectors on .mds-choicebox-input. */}
          <span className="mds-choicebox-indicator" aria-hidden="true" />
        </label>
      </div>
    );
  },
);
