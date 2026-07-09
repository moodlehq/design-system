import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export interface DropdownItemCustomProps extends HTMLAttributes<HTMLDivElement> {
  /** Arbitrary slot content. The custom item is the escape hatch for item
   *  layouts not covered by the typed variants; interactivity and ARIA for
   *  the content are the consumer's responsibility. */
  children?: ReactNode;
}

/** Dropdown.item.custom — a slot container for bespoke item content. */
export const DropdownItemCustom = forwardRef<
  HTMLDivElement,
  DropdownItemCustomProps
>(function DropdownItemCustom({ className, children, ...props }, ref) {
  const classes = ['mds-dropdown-item', 'mds-dropdown-item--custom'];
  if (className) {
    classes.push(className);
  }

  return (
    <div ref={ref} role="presentation" className={classes.join(' ')} {...props}>
      <span className="mds-dropdown-item__slot">{children}</span>
    </div>
  );
});
DropdownItemCustom.displayName = 'DropdownItemCustom';
