import { useListItem, useMergeRefs } from '@floating-ui/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { Checkbox } from '../checkbox';
import { useDropdownContext } from './Dropdown';

export interface DropdownItemMultiselectProps extends HTMLAttributes<HTMLDivElement> {
  /** Visible label text. Must be a caller-supplied translated string. */
  label: string;
  /** Whether this item is currently checked. Controlled by the consumer. */
  checked?: boolean;
  /** Optional secondary line below the label. Caller-supplied translated string. */
  description?: string;
  /** Prevents interaction and renders the item as unavailable. */
  disabled?: boolean;
}

/**
 * Dropdown.item.multiselect — a multi-select row embedding the Checkbox
 * component as its leading visual indicator. Supports independent
 * checked/unchecked toggling without closing the menu.
 *
 * The outer element carries `role="menuitemcheckbox"` so it participates
 * correctly in the ARIA menu model. The embedded `<Checkbox>` is
 * `aria-hidden` and `tabIndex={-1}` — it is purely visual; the div handles
 * all keyboard interaction and AT announcements.
 */
export const DropdownItemMultiselect = forwardRef<
  HTMLDivElement,
  DropdownItemMultiselectProps
>(function DropdownItemMultiselect(
  {
    label,
    checked = false,
    description,
    className,
    disabled,
    onClick,
    ...restProps
  },
  forwardedRef,
) {
  const { ref: listItemRef, index } = useListItem({ label });
  const { getItemProps, activeIndex } = useDropdownContext();
  const ref = useMergeRefs([listItemRef, forwardedRef]);

  const classes = ['mds-dropdown-item', 'mds-dropdown-item--multiselect'];
  if (description) {
    classes.push('mds-dropdown-item--with-description');
  }
  if (className) {
    classes.push(className);
  }

  return (
    <div
      ref={ref}
      role="menuitemcheckbox"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      tabIndex={activeIndex === index ? 0 : -1}
      className={classes.join(' ')}
      {...(getItemProps({
        ...(restProps as React.HTMLProps<HTMLElement>),
        onClick: disabled
          ? (e: React.MouseEvent) => e.preventDefault()
          : (onClick as React.MouseEventHandler),
        // Divs don't fire click on Space by default — handle it explicitly.
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === ' ') {
            e.preventDefault();
            if (!disabled) {
              (e.currentTarget as HTMLElement).click();
            }
          }
          (
            restProps.onKeyDown as
              React.KeyboardEventHandler<HTMLDivElement> | undefined
          )?.(e);
        },
      }) as HTMLAttributes<HTMLDivElement>)}
    >
      {/* Checkbox is purely visual. The outer `inert` span removes the <input>
          from both the tab sequence and the accessibility tree, preventing the
          nested-interactive axe violation. `aria-hidden` adds a second guard
          for ATs that traverse inert subtrees. */}
      <span inert aria-hidden="true" className="mds-dropdown-item__checkbox">
        <Checkbox
          hideLabel
          label={label}
          checked={checked}
          disabled={disabled}
          readOnly // purely visual; outer div handles all interaction
          tabIndex={-1}
        />
      </span>
      <span className="mds-dropdown-item__label-wrap">
        <span className="mds-dropdown-item__label">{label}</span>
        {description && (
          <span className="mds-dropdown-item__description">{description}</span>
        )}
      </span>
    </div>
  );
});
DropdownItemMultiselect.displayName = 'DropdownItemMultiselect';
