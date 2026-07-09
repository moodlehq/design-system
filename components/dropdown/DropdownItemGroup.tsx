import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId } from 'react';

export interface DropdownItemGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Group section label. Rendered as visible text and used as the
   *  accessible name for role="group" via aria-labelledby. */
  label: string;
  /** Dropdown item components to include in this group. */
  children?: ReactNode;
}

/**
 * Dropdown.item.group — a semantic wrapper that correctly groups related items.
 *
 * Uses role="group" with aria-labelledby so AT users hear the group's name
 * when they navigate into it. The label is rendered as a visible header row.
 *
 * Prefer this over placing DropdownItemHeader alongside ungrouped siblings:
 * role="group" requires that grouped items are DOM children of the group
 * element — sibling placement does not satisfy the ARIA grouping contract.
 * DropdownItemHeader is a visual label only and should be used only when
 * semantic AT-announced grouping is not required.
 *
 * display:contents removes the wrapper div from the visual layout so the
 * menu panel's own gap applies uniformly across all items and group labels.
 */
export const DropdownItemGroup = forwardRef<
  HTMLDivElement,
  DropdownItemGroupProps
>(function DropdownItemGroup({ label, children, className, ...props }, ref) {
  const labelId = useId();

  const classes = ['mds-dropdown-item-group'];
  if (className) classes.push(className);

  return (
    <div
      ref={ref}
      role="group"
      aria-labelledby={labelId}
      className={classes.join(' ')}
      {...props}
    >
      <span id={labelId} className="mds-dropdown-item-group__label">
        {label}
      </span>
      {children}
    </div>
  );
});
DropdownItemGroup.displayName = 'DropdownItemGroup';
