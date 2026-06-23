import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

export interface FavouriteButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> {
  /**
   * Whether the item is currently selected as a favourite.
   * Controls the filled/outlined icon state and `aria-pressed`.
   */
  selected?: boolean;

  /**
   * Accessible name announced by screen readers.
   * Must be a translated string provided by the caller.
   * Typically "Add to favourites" or "Remove from favourites".
   */
  'aria-label': string;
}

export const FavouriteButton = forwardRef<
  HTMLButtonElement,
  FavouriteButtonProps
>(function FavouriteButton(
  { selected = false, className, 'aria-label': ariaLabel, ...props },
  ref,
) {
  const classes = [
    'mds-favourite-button',
    selected ? 'mds-favourite-button--selected' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      className={classes}
      type="button"
      aria-label={ariaLabel}
      aria-pressed={selected}
      {...props}
    >
      <span className="mds-favourite-button__icon" aria-hidden="true" />
    </button>
  );
});
