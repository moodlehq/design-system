import { useListItem, useMergeRefs } from '@floating-ui/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useDropdownContext } from './Dropdown';

export interface DropdownItemListProps extends HTMLAttributes<HTMLDivElement> {
  /** Visible label text. Must be a caller-supplied translated string. */
  label: string;
  /** Completion state of the item. */
  variant?: 'todo' | 'done';
}

/**
 * Dropdown.item.list — a read-only status row inside a Dropdown menu.
 * Represents a task or option with a binary completion indicator (done/todo).
 * Keyboard-navigable via arrow keys; not activatable (aria-disabled).
 */
export const DropdownItemList = forwardRef<
  HTMLDivElement,
  DropdownItemListProps
>(function DropdownItemList(
  { label, variant = 'todo', className, ...props },
  forwardedRef,
) {
  const { ref: listItemRef, index } = useListItem({ label });
  const { getItemProps, activeIndex } = useDropdownContext();
  const ref = useMergeRefs([listItemRef, forwardedRef]);

  const isDone = variant === 'done';
  const classes = ['mds-dropdown-item', 'mds-dropdown-item--list'];
  if (isDone) classes.push('mds-dropdown-item--selected');
  if (className) classes.push(className);

  return (
    <div
      ref={ref}
      role="menuitemradio"
      aria-checked={isDone}
      aria-disabled="true"
      tabIndex={activeIndex === index ? 0 : -1}
      className={classes.join(' ')}
      {...props}
      {...(getItemProps({
        // Swallow clicks — pointer-events:none in CSS blocks mouse, but
        // getItemProps may attach a click handler for keyboard activation.
        onClick: (e: React.MouseEvent) => e.preventDefault(),
      }) as HTMLAttributes<HTMLDivElement>)}
    >
      {/* Always in DOM — CSS hides it when unselected to preserve trailing-column
          width and prevent label jitter on state change. */}
      <span className="mds-dropdown-item__check" aria-hidden="true" />
      <span className="mds-dropdown-item__label-wrap">
        <span className="mds-dropdown-item__label">{label}</span>
      </span>
    </div>
  );
});
DropdownItemList.displayName = 'DropdownItemList';
