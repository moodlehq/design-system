import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type DropdownItemDividerProps = HTMLAttributes<HTMLDivElement>;

/** Dropdown.item.divider — a horizontal rule separating groups of items. */
export const DropdownItemDivider = forwardRef<
  HTMLDivElement,
  DropdownItemDividerProps
>(function DropdownItemDivider({ className, ...props }, ref) {
  const classes = ['mds-dropdown-divider'];
  if (className) {
    classes.push(className);
  }

  return (
    <div ref={ref} role="separator" className={classes.join(' ')} {...props} />
  );
});
DropdownItemDivider.displayName = 'DropdownItemDivider';
