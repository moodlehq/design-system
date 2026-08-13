import { useListItem, useMergeRefs } from '@floating-ui/react';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useDropdownContext } from './Dropdown';
import type { IconElement } from './dropdownItemUtils';
import { isIconElement } from './dropdownItemUtils';

export interface DropdownItemSelectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visible label text. Must be a caller-supplied translated string. */
  label: string;
  /** Single-select state: shows the surface-subtle fill and trailing check. */
  selected?: boolean;
  /** Optional leading icon. Accepts only intrinsic `<i>` or `<svg>` elements. */
  startIcon?: IconElement;
  /** Optional secondary line below the label. Caller-supplied translated string. */
  description?: string;
}

/**
 * Dropdown.item.select — a single-select option row. Only one item in the
 * group should be selected at a time; selection state is controlled by the
 * consumer (role="menuitemradio" for AT semantics).
 */
export const DropdownItemSelect = forwardRef<
  HTMLButtonElement,
  DropdownItemSelectProps
>(function DropdownItemSelect(
  {
    label,
    selected = false,
    startIcon,
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

  const resolvedStartIcon = isIconElement(startIcon) ? startIcon : null;

  if (import.meta.env.DEV && startIcon != null && !resolvedStartIcon) {
    console.error(
      '[MDS DropdownItemSelect] `startIcon` must be an <i> or <svg> element.',
    );
  }

  const classes = ['mds-dropdown-item', 'mds-dropdown-item--select'];
  if (selected) {
    classes.push('mds-dropdown-item--selected');
  }
  if (description) {
    classes.push('mds-dropdown-item--with-description');
  }
  if (className) {
    classes.push(className);
  }

  return (
    <button
      ref={ref}
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      aria-disabled={disabled || undefined}
      tabIndex={activeIndex === index ? 0 : -1}
      className={classes.join(' ')}
      {...(getItemProps({
        ...(restProps as React.HTMLProps<HTMLElement>),
        onClick: disabled
          ? (e: React.MouseEvent) => e.preventDefault()
          : onClick,
      }) as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {resolvedStartIcon && (
        <span className="mds-dropdown-item__icon">{resolvedStartIcon}</span>
      )}
      <span className="mds-dropdown-item__label-wrap">
        <span className="mds-dropdown-item__label">{label}</span>
        {description && (
          <span className="mds-dropdown-item__description">{description}</span>
        )}
      </span>
      {/* Always in DOM — CSS hides the glyph when unselected to preserve
          trailing-column width and prevent label jitter on selection change
          (ZeroHeight spec: "the label alignment is preserved"). */}
      <span className="mds-dropdown-item__check-wrap" aria-hidden="true">
        <span className="mds-dropdown-item__check" />
      </span>
    </button>
  );
});
DropdownItemSelect.displayName = 'DropdownItemSelect';
