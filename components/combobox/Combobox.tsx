import type { Placement } from '@floating-ui/react';
import type {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import {
  forwardRef,
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { TagContentAvatar } from '../_internal/TagContent';
import type { SearchInputProps } from '../input/SearchInput';
import { SearchInput } from '../input/SearchInput';
import { Tag } from '../tag';
import { defaultFilterOptions } from './comboboxFilter';
import { ComboboxListbox } from './ComboboxListbox';
import {
  useComboboxPopup,
  useComboboxRenderLimit,
  useComboboxValues,
} from './useCombobox';

/** A single selectable row. Shapes both the listbox row and the tag it becomes. */
export interface ComboboxOption {
  /** Stable identifier submitted with the form and used as the value. */
  value: string;
  /** Name/category label. Required. Used for filtering (first) and as the tag text. */
  label: string;
  /** Username, or a course/group/site short name. Shown as a supporting line. */
  username?: string;
  /** Email address. Person-only. Divider-separated from `username`. */
  email?: string;
  /** Institution. Person-only. Shown as a second supporting line. */
  institution?: string;
  /** Leading photo/logo. Rendered `aria-hidden`; the text already names it. */
  avatar?: TagContentAvatar;
  /** Keeps the row visible but unavailable. It can't be highlighted or chosen. */
  disabled?: boolean;
}

interface ComboboxBaseProps
  extends
    Pick<
      SearchInputProps,
      | 'hideLabel'
      | 'invalid'
      | 'invalidFeedback'
      | 'supportingText'
      | 'infoTooltipLabel'
    >,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      | 'value'
      | 'defaultValue'
      | 'onChange'
      | 'type'
      | 'role'
      | 'list'
      | 'children'
      | 'name'
      // No read-only state: design uses `disabled` for a field people can't
      // change, as SearchInput does.
      | 'readOnly'
    > {
  /** Visible label. Required — every combobox is named, even with `hideLabel`. */
  label: string;
  /**
   * Options that can be chosen. Already-chosen options are left out of the listbox.
   * With nothing typed they are listed in the order given, so pass them
   * alphabetically unless there is a clear reason not to; once the user types,
   * the filter ranks them by how well they match.
   * Long lists render a page of rows at a time as the user scrolls, so thousands
   * of options stay responsive; for server-sized sets, search on the server.
   */
  options: ComboboxOption[];
  /**
   * Full options for values that are chosen but not in `options`, so their tags
   * can still be drawn with a label. Needed when options load as the user types:
   * an edit form opens with values already chosen and `options` still empty.
   * Without it a value with no matching option submits but shows no tag.
   */
  selectedOptions?: ComboboxOption[];
  /** Controlled text typed into the field. */
  inputValue?: string;
  /**
   * Called when the typed text changes, including when it is cleared after a
   * choice or on blur. Use it to fetch options from a server as the user types.
   */
  onInputChange?: (inputValue: string) => void;
  /**
   * Replaces the built-in filter (case- and accent-insensitive; matches anywhere
   * in the label, username, email or institution; label prefix matches first,
   * then other label matches, then supporting-field matches). Pass
   * `(options) => options` when the server has already filtered the list.
   * @default built-in filter
   */
  filterOptions?: (
    options: ComboboxOption[],
    inputValue: string,
  ) => ComboboxOption[];
  /** Shows the loading message in the listbox while options are being fetched. */
  loading?: boolean;
  /**
   * Field name. Each chosen value is submitted as its own hidden input with this
   * name. With `multiple`, end the name in `[]` (e.g. `members[]`) when the form
   * is read by PHP, as Moodle's forms are, or only the last value arrives. The
   * visible text field is never submitted.
   */
  name?: string;
  /** Listbox placement relative to the field. flip() and shift() still apply. @default 'bottom-start' */
  placement?: Placement;
  /** Accessible label for the clear button shown once values are chosen. */
  clearLabel: string;
  /** Accessible label for the chevron button that opens and closes the listbox. */
  showOptionsLabel: string;
  /** Accessible label for a tag's remove button, e.g. `(name) => t('remove', { name })`. */
  removeLabel: (optionLabel: string) => string;
  /** Message shown while `loading`, e.g. "Loading results…". */
  loadingLabel: string;
  /** Message for an empty result, e.g. "No matches for 'Jsoe'. Check the spelling." */
  noResultsLabel: (inputValue: string) => string;
  /** Spoken (live region) as the result count changes, e.g. "5 results available". */
  resultsAnnouncement: (count: number) => string;
}

/** One value: `value` is the chosen option's `value`, or `null` for none. */
interface ComboboxSingleProps {
  /**
   * Allow several values. Chosen options keep the listbox open. When false,
   * choosing an option replaces the current value and closes the listbox.
   * @default false
   */
  multiple?: false;
  /** Controlled chosen value (an option `value`), or `null` for none. */
  value?: string | null;
  /** Initial chosen value when uncontrolled. */
  defaultValue?: string | null;
  /** Called with the chosen value, or `null` when it is cleared or removed. */
  onValueChange?: (value: string | null) => void;
}

/** Several values: `value` is the list of chosen option `value`s. */
interface ComboboxMultipleProps {
  /** Allow several values. Chosen options keep the listbox open. */
  multiple: true;
  /** Controlled chosen values (option `value`s). */
  value?: string[];
  /** Initial chosen values when uncontrolled. */
  defaultValue?: string[];
  /** Called with the full list of chosen values whenever it changes. */
  onValueChange?: (value: string[]) => void;
}

export type ComboboxProps = ComboboxBaseProps &
  (ComboboxSingleProps | ComboboxMultipleProps);

// Rows from the end of the rendered page at which arrowing adds the next page.
const ARROW_GROW_MARGIN = 5;

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  function Combobox(
    {
      label,
      options,
      selectedOptions,
      multiple = false,
      value: valueProp,
      defaultValue,
      onValueChange,
      inputValue: inputValueProp,
      onInputChange,
      filterOptions = defaultFilterOptions,
      loading = false,
      name,
      placement = 'bottom-start',
      clearLabel,
      showOptionsLabel,
      removeLabel,
      loadingLabel,
      noResultsLabel,
      resultsAnnouncement,
      className,
      id: idProp,
      disabled,
      required,
      onKeyDown,
      onBlur,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const listboxId = `${id}-listbox`;
    const popupId = `${id}-popup`;
    const optionId = (index: number) => `${id}-option-${index}`;

    const { values, chosen, choose, remove, clear } = useComboboxValues({
      multiple,
      value: valueProp,
      defaultValue,
      onValueChange,
      options,
      selectedOptions,
    });

    const [uncontrolledInput, setUncontrolledInput] = useState('');
    const inputValue = inputValueProp ?? uncontrolledInput;

    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    // Whether the highlight was last moved with the keyboard rather than the
    // pointer — only keyboard movement gets the focus ring.
    const [keyboardNav, setKeyboardNav] = useState(false);

    const selectedSet = useMemo(() => new Set(values), [values]);
    const filtered = useMemo(
      () =>
        filterOptions(
          options.filter((option) => !selectedSet.has(option.value)),
          inputValue,
        ),
      [filterOptions, options, selectedSet, inputValue],
    );
    const disabledIndices = useMemo(
      () => filtered.flatMap((option, i) => (option.disabled ? [i] : [])),
      [filtered],
    );

    const hasQuery = inputValue.trim() !== '';
    const hasContent = filtered.length > 0 || loading || hasQuery;
    const expanded = open && !disabled && hasContent;
    const showListbox = expanded && filtered.length > 0;
    // The popup the field controls: the listbox, or — while it only holds a
    // loading / no-results message — the popup itself, so the field never
    // points at an empty listbox.
    const controlsId = expanded
      ? showListbox
        ? listboxId
        : popupId
      : undefined;

    // Only the first page of a long list is rendered; more rows are added as the
    // user scrolls or arrows near the end. Short lists render in full.
    const { renderLimit, grow } = useComboboxRenderLimit(
      `${expanded}\u0000${inputValue}`,
    );
    const rendered = useMemo(
      () =>
        filtered.length > renderLimit
          ? filtered.slice(0, renderLimit)
          : filtered,
      [filtered, renderLimit],
    );
    const hasMoreRows = rendered.length < filtered.length;

    const {
      inputRef,
      registerOption,
      setFieldRef,
      portalRoot,
      setInputRef,
      setFloating,
      floatingStyles,
      direction,
      getReferenceProps,
      getListboxProps,
      getOptionProps,
    } = useComboboxPopup({
      expanded,
      onOpenChange: setOpen,
      placement,
      activeIndex,
      onNavigate: setActiveIndex,
      disabledIndices,
      optionCount: rendered.length,
      forwardedRef: ref,
    });

    const setInputValue = (next: string) => {
      setUncontrolledInput(next);
      onInputChange?.(next);
    };

    const select = (option: ComboboxOption) => {
      if (option.disabled) return;
      choose(option);
      setInputValue('');
      setActiveIndex(null);
      if (!multiple) setOpen(false);
      inputRef.current?.focus();
    };

    // The rows are memoised, so they get a callback whose identity never
    // changes. It always calls the latest `select`, which closes over the
    // current values and handlers.
    const selectRef = useRef(select);
    useLayoutEffect(() => {
      selectRef.current = select;
    });
    const handleSelect = useCallback(
      (option: ComboboxOption) => selectRef.current(option),
      [],
    );

    // A tag's remove button, or the tag itself, is focused when a key is pressed.
    const handleTagKeyDown = (
      event: KeyboardEvent<HTMLElement>,
      optionValue: string,
    ) => {
      if (disabled) return;
      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
        handleRemove(optionValue);
      }
    };

    const handleRemove = (optionValue: string, event?: { detail: number }) => {
      remove(optionValue);
      // Focus returns to the field once the tag is gone.
      focusInput(event);
    };

    // SearchInput has already cleared the typed text and refocused the field;
    // the chosen values are cleared with it.
    const handleClear = () => {
      clear();
      setActiveIndex(null);
      setOpen(false);
    };

    // Moves focus to the text box for a mouse click. BaseInput only treats a
    // focus as pointer-driven when a pointerdown reached the input first, and
    // the chevron, tag × and field padding aren't the input — so replay one
    // (as SearchInput's clear button does). Otherwise a click draws the
    // keyboard-only focus ring. Keyboard activation has detail 0.
    const focusInput = (event?: { detail: number }) => {
      const input = inputRef.current;
      if (!input) return;
      if (event && event.detail !== 0) {
        input.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      }
      input.focus();
    };

    const toggleListbox = (event: MouseEvent<HTMLButtonElement>) => {
      setOpen(!expanded);
      focusInput(event);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.currentTarget.value);
      setActiveIndex(null);
      setOpen(true);
    };

    // Not a menu: DOM focus stays in the text box while the list is open, so
    // typing filters the list and Home/End move the text cursor. Don't "fix" this
    // into the menu pattern (typeahead, Home/End on items) used by Dropdown; it
    // would break typing. See components.instructions.md.
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      // Floating UI's navigation handler runs before this one and has already
      // marked arrow keys as handled, so `defaultPrevented` can't be used to
      // spot a consumer that handled them. Note it first.
      const handledBefore = event.defaultPrevented;
      onKeyDown?.(event);

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        setKeyboardNav(true);
        // Arrowing near the last rendered row adds the next page before it is
        // reached, so navigation never stalls at the end of a page.
        if (
          event.key === 'ArrowDown' &&
          hasMoreRows &&
          (activeIndex ?? -1) + 1 >= rendered.length - ARROW_GROW_MARGIN
        ) {
          grow();
        }
        return;
      }
      // A consumer that handled the key owns it.
      if (!handledBefore && event.defaultPrevented) return;

      if (event.key === 'Enter' && expanded && activeIndex !== null) {
        const option = filtered[activeIndex];
        if (option) {
          // Choosing must not also submit the surrounding form.
          event.preventDefault();
          select(option);
        }
      } else if (
        event.key === 'Backspace' &&
        inputValue === '' &&
        chosen.length > 0 &&
        !disabled
      ) {
        // An empty text box and Backspace removes the last tag, as in other
        // tag inputs. The caret is at the start, so no text is lost.
        handleRemove(chosen[chosen.length - 1].value);
      } else if (event.key === 'Escape') {
        if (expanded) {
          event.preventDefault();
          setOpen(false);
          setActiveIndex(null);
        } else if (inputValue) {
          event.preventDefault();
          setInputValue('');
        }
      }
    };

    // Leaving the field closes the listbox. Text that never became a value is
    // discarded; chosen tags stay.
    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
      // The browser also blurs the field when its window or tab is deactivated
      // (focus stays on it, so it is still the active element). That isn't the
      // user leaving the field, so keep the typed text and the open listbox.
      if (document.activeElement === event.currentTarget) return;
      setOpen(false);
      setActiveIndex(null);
      if (inputValue) setInputValue('');
    };

    // Clicking the padding or the gaps between tags focuses the field.
    const handleFieldMouseDown = (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget && !disabled) {
        event.preventDefault();
        // A mousedown always has detail >= 1, so this is always pointer focus.
        focusInput({ detail: 1 });
        return;
      }
      // Pressing a tag's × must not move focus off the text box: the blur would
      // close the listbox and discard typed text. The click still fires, and
      // removing the tag returns focus to the field anyway.
      if (
        event.target instanceof Element &&
        event.target.closest('.mds-tag__remove')
      ) {
        event.preventDefault();
      }
    };

    const listboxLabelledBy = props['aria-labelledby'];
    const listboxLabel = listboxLabelledBy
      ? undefined
      : (props['aria-label'] ?? label);

    // The loading or no-results message: shown in the listbox and, with the result
    // count, announced through the live region.
    const statusMessage = loading
      ? loadingLabel
      : filtered.length === 0
        ? noResultsLabel(inputValue)
        : undefined;
    const liveMessage = !expanded
      ? ''
      : (statusMessage ?? resultsAnnouncement(filtered.length));

    if (import.meta.env.DEV && !label) {
      console.warn(
        'Combobox: label prop is required. An unnamed combobox is inaccessible.',
      );
    }

    const classes = ['mds-combobox'];
    if (className) classes.push(className);

    // Only in the empty state: once text is typed or values are chosen,
    // SearchInput's clear button is the one trailing control.
    const trailingAction = values.length === 0 && inputValue === '' && (
      <button
        type="button"
        className="mds-combobox__action mds-combobox__chevron"
        aria-label={showOptionsLabel}
        aria-expanded={expanded}
        aria-controls={controlsId}
        disabled={disabled}
        onMouseDown={(event) => event.preventDefault()}
        onClick={toggleListbox}
      >
        <i className="fa-solid fa-chevron-down" aria-hidden="true" />
      </button>
    );

    const referenceProps = getReferenceProps({
      role: 'combobox',
      'aria-autocomplete': 'list',
      'aria-haspopup': 'listbox',
      'aria-expanded': expanded,
      'aria-controls': controlsId,
      autoComplete: 'off',
      value: inputValue,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      onBlur: handleBlur,
    }) as InputHTMLAttributes<HTMLInputElement>;

    return (
      <>
        <SearchInput
          ref={setInputRef}
          fieldWrapperRef={setFieldRef}
          id={id}
          label={label}
          className={classes.join(' ')}
          disabled={disabled}
          required={required}
          // Required stays visible as the asterisk, but only blocks submission
          // while nothing has been chosen — the text field itself stays empty.
          inputRequired={required && values.length === 0}
          clearLabel={clearLabel}
          // The clear button also clears chosen values, so it stays available
          // when values are chosen even with no text typed.
          showClear={values.length > 0 ? true : undefined}
          onClear={handleClear}
          // Escape and Enter are handled here when the listbox is involved.
          respectDefaultPrevented
          trailingAction={trailingAction || undefined}
          // The magnifier goes once something is chosen (per design review).
          hideSearchIcon={values.length > 0}
          wrapField={(input) => (
            <div
              role="presentation"
              className="mds-combobox__field"
              onMouseDown={handleFieldMouseDown}
            >
              {chosen.map((option) => (
                <Tag
                  key={option.value}
                  type="removable"
                  content={option.label}
                  username={option.username}
                  email={option.email}
                  institution={option.institution}
                  avatar={option.avatar}
                  disabled={disabled}
                  removeLabel={removeLabel(option.label)}
                  onRemove={(event) => handleRemove(option.value, event)}
                  onKeyDown={(event) => handleTagKeyDown(event, option.value)}
                />
              ))}
              {input}
              {name &&
                values.map((v) => (
                  // Disabled hidden inputs are left out of form submission, so a
                  // disabled combobox submits nothing, like every other field.
                  <input
                    key={v}
                    type="hidden"
                    name={name}
                    value={v}
                    disabled={disabled}
                  />
                ))}
              <span className="mds-combobox__live" role="status">
                {liveMessage}
              </span>
            </div>
          )}
          {...props}
          {...referenceProps}
          aria-activedescendant={
            showListbox && activeIndex !== null
              ? optionId(activeIndex)
              : undefined
          }
        />
        {expanded && (
          <ComboboxListbox
            popupId={popupId}
            listboxId={listboxId}
            portalRoot={portalRoot}
            setFloating={setFloating}
            floatingStyles={floatingStyles}
            direction={direction}
            filtered={rendered}
            total={filtered.length}
            onReachEnd={hasMoreRows ? grow : undefined}
            showListbox={showListbox}
            activeIndex={activeIndex}
            keyboardNav={keyboardNav}
            onPointerMove={() => {
              if (keyboardNav) setKeyboardNav(false);
            }}
            listboxLabel={listboxLabel}
            listboxLabelledBy={listboxLabelledBy}
            listboxProps={getListboxProps()}
            getOptionProps={getOptionProps}
            registerOption={registerOption}
            optionId={optionId}
            onSelect={handleSelect}
            statusMessage={statusMessage}
          />
        )}
      </>
    );
  },
);

Combobox.displayName = 'Combobox';
