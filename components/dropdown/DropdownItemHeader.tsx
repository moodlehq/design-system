import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export interface DropdownItemHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Visible label text. Must be a caller-supplied translated string. */
  label: string;
}

/**
 * Dropdown.item.header — a non-interactive section label for visual grouping only.
 * Excluded from keyboard navigation.
 *
 * For semantic grouping where AT announces the group name as users navigate
 * into it, use `DropdownItemGroup` instead — it wraps its children in a proper
 * `role="group"` element satisfying the ARIA ownership contract.
 */
export const DropdownItemHeader = forwardRef<
  HTMLDivElement,
  DropdownItemHeaderProps
>(function DropdownItemHeader({ label, className, ...props }, ref) {
  const classes = ['mds-dropdown-item', 'mds-dropdown-item--header'];
  if (className) {
    classes.push(className);
  }

  return (
    <div ref={ref} role="none" className={classes.join(' ')} {...props}>
      <span className="mds-dropdown-item__label">{label}</span>
    </div>
  );
});
DropdownItemHeader.displayName = 'DropdownItemHeader';
