import type { ButtonHTMLAttributes } from 'react';

type CloseButtonSize = 'sm' | 'md' | 'lg';

export interface CloseButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> {
  /**
   * Accessible name announced by screen readers for the close button control.
   * Must be a translated string provided by the caller.
   */
  'aria-label': string;

  /**
   * Visual size variant for the close icon button.
   * Invalid values fall back to the default `md` size at runtime.
   */
  size?: string;
}

const allowedSizes: CloseButtonSize[] = ['sm', 'md', 'lg'];

export const CloseButton = ({
  'aria-label': ariaLabel,
  size,
  className,
  ...props
}: CloseButtonProps) => {
  if (
    import.meta.env.DEV &&
    size &&
    !allowedSizes.includes(size as CloseButtonSize)
  ) {
    console.warn(
      `[MDS CloseButton] Invalid size "${size}". Falling back to "md". Allowed: ${allowedSizes.join(', ')}`,
    );
  }

  const resolvedSize =
    size && allowedSizes.includes(size as CloseButtonSize) ? size : 'md';

  const classes = [
    'mds-close-button',
    'btn-close',
    `mds-close-button--${resolvedSize}`,
  ];
  if (className) {
    classes.push(className);
  }

  return (
    <button
      className={classes.join(' ')}
      aria-label={ariaLabel}
      {...props}
      type="button"
    ></button>
  );
};
