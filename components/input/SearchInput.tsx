import {
  type ChangeEvent,
  type Ref,
  forwardRef,
  useRef,
  useState,
} from 'react';
import { CloseButton } from '../close-button/CloseButton';
import type { BaseInputProps } from './BaseInput';
import { BaseInput } from './BaseInput';

export interface SearchInputProps extends Omit<
  BaseInputProps,
  'inputType' | 'startIcon' | 'trailingAction' | 'type'
> {
  /** Accessible label for the button that clears the field's current value. */
  clearLabel: string;
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
      readOnly,
      clearLabel,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isControlled = value !== undefined;
    const [uncontrolledHasValue, setUncontrolledHasValue] = useState(() =>
      Boolean(defaultValue),
    );
    const hasValue = isControlled ? Boolean(value) : uncontrolledHasValue;

    const classes = ['mds-search-input'];
    if (className) classes.push(className);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledHasValue(event.currentTarget.value.length > 0);
      }
      onChange?.(event);
    };

    const handleClear = () => {
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
      input.focus();
    };

    const showClear = hasValue && !disabled && !readOnly;

    const clearButton = showClear ? (
      <CloseButton
        size="sm"
        className="mds-input-search-clear"
        aria-label={clearLabel}
        onClick={handleClear}
      />
    ) : undefined;

    return (
      <BaseInput
        ref={mergeRefs(ref, inputRef)}
        inputType="search"
        startIcon={searchIcon}
        trailingAction={clearButton}
        className={classes.join(' ')}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...props}
      />
    );
  },
);

SearchInput.displayName = 'SearchInput';
