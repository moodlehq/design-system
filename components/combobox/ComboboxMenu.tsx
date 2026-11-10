import type { useInteractions } from '@floating-ui/react';
import { FloatingPortal } from '@floating-ui/react';
import type { CSSProperties, HTMLAttributes, MouseEvent } from 'react';
import { memo } from 'react';
import { TagContent } from '../_internal/TagContent';
import type { ComboboxOption } from './Combobox';

/*
 * Display for Combobox's menu. Internal: not exported from the barrel. All
 * state lives in Combobox; this renders the portaled panel, the option rows,
 * and the loading / no-results message.
 */

// How close to the bottom (px, about three rows) the list must be scrolled
// before the next page of rows is added.
const SCROLL_END_MARGIN = 120;

type GetItemProps = ReturnType<typeof useInteractions>['getItemProps'];

interface ComboboxOptionRowProps {
  option: ComboboxOption;
  index: number;
  id: string;
  active: boolean;
  /** Total options, set when only some are rendered so assistive tech hears it. */
  setSize: number | undefined;
  registerItem: (index: number, node: HTMLElement | null) => void;
  getItemProps: GetItemProps;
  onSelect: (option: ComboboxOption) => void;
}

// Memoised: moving the highlight or typing re-renders only the rows whose own
// props changed (the two rows whose `active` flips), not every rendered row.
// This relies on `registerItem`, `getItemProps` and `onSelect` being stable.
const ComboboxOptionRow = memo(function ComboboxOptionRow({
  option,
  index,
  id,
  active,
  setSize,
  registerItem,
  getItemProps,
  onSelect,
}: ComboboxOptionRowProps) {
  return (
    <div
      {...getItemProps({
        ref(node: HTMLElement | null) {
          registerItem(index, node);
        },
        onClick() {
          onSelect(option);
        },
      })}
      id={id}
      role="option"
      // Follows the highlighted option (the one aria-activedescendant points at).
      aria-selected={active}
      aria-setsize={setSize}
      aria-posinset={setSize === undefined ? undefined : index + 1}
      aria-disabled={option.disabled || undefined}
      className={[
        'mds-combobox__option',
        active && 'mds-combobox__option--active',
        option.disabled && 'mds-combobox__option--disabled',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <TagContent
        content={option.label}
        username={option.username}
        email={option.email}
        institution={option.institution}
        avatar={option.avatar}
      />
    </div>
  );
});

export interface ComboboxMenuProps {
  menuId: string;
  listboxId: string;
  /** Where to portal the menu: the field's dialog, or the page body when null. */
  portalRoot: HTMLElement | null;
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: CSSProperties;
  direction: 'ltr' | 'rtl';
  /** Options to list. The listbox is omitted when `showListbox` is false. */
  filtered: ComboboxOption[];
  showListbox: boolean;
  activeIndex: number | null;
  /** Whether the highlight last moved by keyboard, which draws the focus ring. */
  keyboardNav: boolean;
  /** Called when the pointer moves over the list, ending keyboard navigation. */
  onPointerMove: () => void;
  /** Total options when `filtered` is only the first page of a longer list. */
  total: number;
  /** Called when the list is scrolled near its end, to render the next page. */
  onReachEnd: (() => void) | undefined;
  multiple: boolean;
  listboxLabel: string | undefined;
  listboxLabelledBy: string | undefined;
  listboxProps: HTMLAttributes<HTMLDivElement>;
  getItemProps: GetItemProps;
  registerItem: (index: number, node: HTMLElement | null) => void;
  optionId: (index: number) => string;
  onSelect: (option: ComboboxOption) => void;
  /** The loading or no-results message, shown below any rows. */
  statusMessage: string | undefined;
}

export const ComboboxMenu = ({
  menuId,
  listboxId,
  portalRoot,
  setFloating,
  floatingStyles,
  direction,
  filtered,
  showListbox,
  activeIndex,
  keyboardNav,
  onPointerMove,
  total,
  onReachEnd,
  multiple,
  listboxLabel,
  listboxLabelledBy,
  listboxProps,
  getItemProps,
  registerItem,
  optionId,
  onSelect,
  statusMessage,
}: ComboboxMenuProps) => {
  // Keeps DOM focus on the input while pressing inside the menu (including its
  // scrollbar), so a press never blurs the field and closes the menu.
  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    // `null` would make FloatingPortal wait for a root; undefined means the body.
    <FloatingPortal root={portalRoot ?? undefined}>
      <div
        ref={setFloating}
        id={menuId}
        className="mds-combobox__menu"
        dir={direction}
        style={floatingStyles}
        onMouseDown={handleMouseDown}
      >
        {showListbox && (
          // The navigation props (including aria-orientation) belong on the
          // listbox, where that attribute is valid, not on the panel around it.
          <div
            {...listboxProps}
            id={listboxId}
            role="listbox"
            aria-label={listboxLabel}
            aria-labelledby={listboxLabelledBy}
            aria-multiselectable={multiple || undefined}
            className={[
              'mds-combobox__listbox',
              keyboardNav && 'mds-combobox__listbox--keyboard',
            ]
              .filter(Boolean)
              .join(' ')}
            onMouseMove={onPointerMove}
            onScroll={(event) => {
              const list = event.currentTarget;
              if (
                onReachEnd &&
                list.scrollHeight - list.scrollTop - list.clientHeight <
                  SCROLL_END_MARGIN
              ) {
                onReachEnd();
              }
            }}
          >
            {filtered.map((option, index) => (
              <ComboboxOptionRow
                key={option.value}
                option={option}
                index={index}
                id={optionId(index)}
                active={index === activeIndex}
                setSize={filtered.length < total ? total : undefined}
                registerItem={registerItem}
                getItemProps={getItemProps}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
        {statusMessage && (
          <div className="mds-combobox__status">{statusMessage}</div>
        )}
      </div>
    </FloatingPortal>
  );
};
