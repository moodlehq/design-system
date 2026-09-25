import {
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CloseButton } from '../close-button/CloseButton';
import type { BaseInputProps } from './BaseInput';
import { BaseInput } from './BaseInput';

// Shared default so instant search has a consistent firing rate rather than
// each consumer inventing (or omitting) its own; overridable via debounceMs.
const DEFAULT_DEBOUNCE_MS = 300;

export interface SearchInputProps extends Omit<
  BaseInputProps,
  | 'inputType'
  | 'startIcon'
  | 'trailingAction'
  | 'type'
  | 'readOnly'
  | 'suppressNativeInvalid'
> {
  /** Accessible label for the button that clears the field's current value. */
  clearLabel: string;
  /**
   * Called with the field's current value `debounceMs` after the user stops
   * typing — use this (not `onChange`) to trigger the actual search/filter
   * request so instant search doesn't fire on every keystroke. Fires
   * immediately, bypassing the debounce, when the value is cleared.
   */
  onDebouncedChange?: (value: string) => void;
  /**
   * Debounce interval, in milliseconds, for `onDebouncedChange`.
   * @default 300
   */
  debounceMs?: number;
}

// Fixed per design: search fields always show a magnifying-glass icon at the start of the field.
const searchIcon = (
  <i
    className="fa-solid fa-magnifying-glass mds-input-search-icon"
    aria-hidden="true"
  />
);

// Merges the ref this component needs (to imperatively clear the native
// input's value) with whatever ref the consumer forwarded in.
function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        // RefObject.current is technically read-only from the consumer's
        // perspective, but forwardRef/useRef both hand back a mutable object.
        (ref as { current: T | null }).current = node;
      }
    }
  };
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      className,
      disabled,
      clearLabel,
      value,
      defaultValue,
      onChange,
      onKeyDown,
      onDebouncedChange,
      debounceMs = DEFAULT_DEBOUNCE_MS,
      invalid,
      ...props
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    // inputRef is a stable ref object, so it's safe to omit from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setRefs = useCallback(mergeRefs(ref, inputRef), [ref]);
    const isControlled = value !== undefined;
    const [uncontrolledHasValue, setUncontrolledHasValue] = useState(() =>
      Boolean(String(defaultValue ?? '').trim()),
    );
    // Whitespace-only input (e.g. a single space) shouldn't count as "has a
    // value" — it drives the clear button and invalid-state display, and a
    // field that visually looks empty shouldn't show a clear action.
    const hasValue = isControlled
      ? Boolean(String(value ?? '').trim())
      : uncontrolledHasValue;

    // Uncontrolled hasValue must track the DOM node directly rather than
    // only React's onChange path, since autofill and any consumer holding
    // the forwarded ref can change input.value (including via the native
    // setter handleClear itself uses) without going through a React change
    // handler — an onChange-only state update would then go stale.
    useEffect(() => {
      if (isControlled) return;

      const input = inputRef.current;
      if (!input) return;

      const syncFromDom = () =>
        setUncontrolledHasValue(input.value.trim().length > 0);

      syncFromDom();
      input.addEventListener('input', syncFromDom);
      return () => input.removeEventListener('input', syncFromDom);
    }, [isControlled]);

    const classes = ['mds-search-input'];
    if (className) classes.push(className);

    const debounceTimeoutRef = useRef<
      ReturnType<typeof setTimeout> | undefined
    >(undefined);
    const clearPendingDebounce = () => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = undefined;
    };
    // Cancel any in-flight debounce on unmount so it can't fire after the
    // field is gone.
    useEffect(() => clearPendingDebounce, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledHasValue(event.currentTarget.value.trim().length > 0);
      }
      onChange?.(event);

      if (onDebouncedChange) {
        // Trimmed so a whitespace-only value doesn't trigger a search —
        // onChange above still receives the raw value untouched.
        const nextValue = event.currentTarget.value.trim();
        clearPendingDebounce();
        debounceTimeoutRef.current = setTimeout(() => {
          onDebouncedChange(nextValue);
        }, debounceMs);
      }
    };

    const handleClear = (event?: MouseEvent<HTMLButtonElement>) => {
      const input = inputRef.current;
      if (!input) return;

      // Sets the value through the native setter (bypassing React's tracked
      // value) so the 'input' event dispatched below is treated as a real
      // change — this notifies both controlled and uncontrolled consumers
      // through the standard onChange path.
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set;
      nativeSetter?.call(input, '');
      input.dispatchEvent(new Event('input', { bubbles: true }));

      // A real mouse click carries a non-zero detail (click count); a
      // keyboard-activated click (Enter/Space on the button, or the Escape
      // path below which passes no event) has detail 0. For a mouse click,
      // replay a pointerdown on the input first so BaseInput's own
      // pointer-focus tracking (see BaseInput's onPointerDown/onFocus) picks
      // it up and applies mds-input-field--pointer-focus — otherwise
      // refocusing the input here reads as a fresh, non-pointer focus and
      // the wrapper flashes the full keyboard focus-visible ring even though
      // the user just clicked.
      if (event && event.detail !== 0) {
        input.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      }
      input.focus();

      // Clearing should surface results immediately rather than waiting out
      // the debounce interval.
      clearPendingDebounce();
      onDebouncedChange?.('');
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);

      // Escape clears the field. Handled here (rather than relying on the
      // browser's native type="search" Escape-to-clear) because the native
      // cancel button is hidden via CSS, and native clearing bypasses
      // handleClear's immediate onDebouncedChange('') — leaving a stale
      // debounced call pending and desyncing consumers from the shadow state.
      if (event.key === 'Escape' && hasValue) {
        event.preventDefault();
        handleClear();
      }

      // Enter on an empty (or whitespace-only) field would otherwise trigger
      // the parent form's implicit submission and send a blank query.
      // Cancelling the keydown blocks that, and reads the live DOM value so
      // it holds for both controlled and uncontrolled use.
      if (event.key === 'Enter' && !event.currentTarget.value.trim()) {
        event.preventDefault();
      }
    };

    // Per design, invalid only applies while the field is empty — once the
    // user has typed something, the invalid treatment drops even if the
    // consumer still passes invalid.
    const showInvalid = invalid && !hasValue;

    const showClearButton = hasValue && !disabled;

    const clearButton = showClearButton ? (
      <CloseButton
        size="sm"
        className="mds-input-search-clear"
        aria-label={clearLabel}
        onClick={handleClear}
      />
    ) : undefined;

    return (
      <BaseInput
        ref={setRefs}
        inputType="search"
        startIcon={searchIcon}
        trailingAction={clearButton}
        className={classes.join(' ')}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        invalid={showInvalid}
        suppressNativeInvalid={hasValue}
        {...props}
      />
    );
  },
);

SearchInput.displayName = 'SearchInput';
