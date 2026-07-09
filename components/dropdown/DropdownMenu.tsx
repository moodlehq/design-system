import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type DropdownMenuProps = HTMLAttributes<HTMLDivElement>;

/**
 * Dropdown.menu — the panel that hosts Dropdown items.
 *
 * A passive container: interactive behavior lives on each item. Compose it
 * with DropdownItemAction, DropdownItemSelect, DropdownItemExpandable,
 * DropdownItemMultiselect, DropdownItemHeader, DropdownItemDivider and
 * DropdownItemCustom children.
 */
export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  function DropdownMenu({ className, children, ...props }, ref) {
    const classes = ['mds-dropdown-menu'];
    if (className) {
      classes.push(className);
    }

    return (
      <div ref={ref} role="menu" className={classes.join(' ')} {...props}>
        {children}
      </div>
    );
  },
);
DropdownMenu.displayName = 'DropdownMenu';
