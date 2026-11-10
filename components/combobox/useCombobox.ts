import type { Placement } from '@floating-ui/react';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useMergeRefs,
} from '@floating-ui/react';
import type {
  CSSProperties,
  ForwardedRef,
  RefCallback,
  RefObject,
} from 'react';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ComboboxOption } from './Combobox';

/*
 * State and wiring hooks for Combobox. Internal: not exported from the barrel.
 * - useComboboxValues: which options are chosen (controlled or not, one or many).
 * - useComboboxPopup: Floating UI positioning, dismissal and list navigation.
 * - useComboboxRenderLimit: how many rows are in the DOM for a long list.
 */

/** Rows rendered at first, and added each time the list is scrolled to its end. */
export const COMBOBOX_RENDER_PAGE = 100;

// --mds-spacing-xxs = var(--mds-scale-100) = 0.25rem = 4px
const MENU_OFFSET = 4;

// Bootstrap's modal, ARIA dialogs and native <dialog>.
const DIALOG_SELECTOR = 'dialog, [role="dialog"], [role="alertdialog"], .modal';

type ValueInput = string | string[] | null | undefined;

// `undefined` stays undefined so a field with no `value` prop is uncontrolled;
// `null` is a controlled, empty single-select.
const toValues = (value: ValueInput): string[] | undefined => {
  if (value === undefined) return undefined;
  if (value === null) return [];
  return Array.isArray(value) ? value : [value];
};

interface UseComboboxValuesOptions {
  multiple: boolean;
  value: ValueInput;
  defaultValue: ValueInput;
  /** Receives `string[]` with `multiple`, otherwise `string | null`. */
  onValueChange:
    ((value: string[]) => void) | ((value: string | null) => void) | undefined;
  options: ComboboxOption[];
}

/**
 * Chosen values. Internally always a list; a single-select field holds at most
 * one, and its public value is that item or `null`.
 */
export const useComboboxValues = ({
  multiple,
  value,
  defaultValue,
  onValueChange,
  options,
}: UseComboboxValuesOptions) => {
  const [uncontrolledValues, setUncontrolledValues] = useState<string[]>(
    () => toValues(defaultValue) ?? [],
  );
  // Memoised so a controlled single value (a string) doesn't make a new array,
  // and so recompute downstream, on every render.
  const controlledValues = useMemo(() => toValues(value), [value]);
  const values = controlledValues ?? uncontrolledValues;

  // Options the user has chosen, kept so a tag still has its label and
  // identity lines after a server-driven `options` update drops the row.
  const [chosenCache, setChosenCache] = useState<
    Record<string, ComboboxOption>
  >({});

  const chosen = useMemo(() => {
    const byValue = new Map(options.map((option) => [option.value, option]));
    return values.flatMap((v) => {
      const option = chosenCache[v] ?? byValue.get(v);
      return option ? [option] : [];
    });
  }, [options, values, chosenCache]);

  const commit = (next: string[]) => {
    setUncontrolledValues(next);
    if (multiple) {
      (onValueChange as ((value: string[]) => void) | undefined)?.(next);
    } else {
      (onValueChange as ((value: string | null) => void) | undefined)?.(
        next[0] ?? null,
      );
    }
  };

  const choose = (option: ComboboxOption) => {
    // Keep only options that are still chosen, plus this one, so the cache
    // doesn't grow with every pick in single mode.
    setChosenCache((cache) => ({
      ...Object.fromEntries(
        Object.entries(cache).filter(([key]) => values.includes(key)),
      ),
      [option.value]: option,
    }));
    commit(multiple ? [...values, option.value] : [option.value]);
  };
  const remove = (optionValue: string) =>
    commit(values.filter((v) => v !== optionValue));
  const clear = () => commit([]);

  return { values, chosen, choose, remove, clear };
};

type Interactions = ReturnType<typeof useInteractions>;

interface ComboboxPopup {
  inputRef: RefObject<HTMLInputElement | null>;
  /** Records an option row's element so keyboard navigation can reach it. */
  registerItem: (index: number, node: HTMLElement | null) => void;
  setFieldRef: (node: HTMLDivElement | null) => void;
  /** The dialog the field sits in, or null. The menu is portaled into it. */
  portalRoot: HTMLElement | null;
  setInputRef: RefCallback<HTMLInputElement> | null;
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: CSSProperties;
  direction: 'ltr' | 'rtl';
  getReferenceProps: Interactions['getReferenceProps'];
  getListboxProps: Interactions['getFloatingProps'];
  getItemProps: Interactions['getItemProps'];
}

interface UseComboboxPopupOptions {
  expanded: boolean;
  onOpenChange: (open: boolean) => void;
  placement: Placement;
  activeIndex: number | null;
  onNavigate: (index: number | null) => void;
  disabledIndices: number[];
  /** How many rows are rendered, so navigation never lands on one that isn't. */
  itemCount: number;
  /** The consumer's ref to the native input. */
  forwardedRef: ForwardedRef<HTMLInputElement>;
}

/**
 * The menu's position, dismissal and keyboard navigation (Floating UI), plus
 * the refs they share. The menu is positioned and sized against the whole field
 * box while interaction props (keyboard, ARIA) attach to the native <input>.
 */
export const useComboboxPopup = ({
  expanded,
  onOpenChange,
  placement,
  activeIndex,
  onNavigate,
  disabledIndices,
  itemCount,
  forwardedRef,
}: UseComboboxPopupOptions): ComboboxPopup => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<(HTMLElement | null)[]>([]);

  const { refs, floatingStyles, context } = useFloating({
    open: expanded,
    onOpenChange,
    placement,
    middleware: [
      // Separate the menu from the field by --mds-spacing-xxs.
      offset(MENU_OFFSET),
      // Flip above the field when there isn't room below.
      flip(),
      shift({ padding: 8 }),
      // The menu matches the field's width, and never outgrows the viewport.
      size({
        padding: 8,
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            inlineSize: `${rects.reference.width}px`,
            maxBlockSize: `${availableHeight}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });
  const { setReference, setFloating, setPositionReference } = refs;

  // A menu portaled to <body> from a field inside a dialog would sit behind a
  // Bootstrap modal (z-index 1055, above the menu's 1000) and, for an
  // aria-modal or native <dialog>, outside the part of the page assistive tech
  // can reach. So it portals into the dialog instead. Found when the field
  // mounts, before the menu can open, so the menu never moves between roots.
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const setFieldRef = useCallback(
    (node: HTMLDivElement | null) => {
      fieldRef.current = node;
      setPositionReference(node);
      if (node) setPortalRoot(node.closest<HTMLElement>(DIALOG_SELECTOR));
    },
    [setPositionReference],
  );
  const setInputRef = useMergeRefs([setReference, inputRef, forwardedRef]);
  const registerItem = useCallback(
    (index: number, node: HTMLElement | null) => {
      listRef.current[index] = node;
    },
    [],
  );
  // Rows that unmount leave a null behind but the array keeps its length, which
  // navigation reads as the number of rows. Trim it so arrowing past the last
  // row (after the list narrows) can't land on a row that is gone.
  useLayoutEffect(() => {
    listRef.current.length = itemCount;
  }, [itemCount]);

  const dismiss = useDismiss(context, {
    // A press inside the field (tags, chevron) is not an outside press.
    outsidePress: (event) =>
      !fieldRef.current?.contains(event.target as Node | null),
  });
  // virtual: DOM focus stays on the input; the highlight is tracked with
  // aria-activedescendant. Focus never enters the menu, so no
  // FloatingFocusManager is needed. loop is off (the design has no wraparound).
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate,
    virtual: true,
    loop: false,
    disabledIndices,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [dismiss, listNavigation],
  );

  // FloatingPortal mounts under document.body, so the menu does not inherit
  // direction from a local dir wrapper. Read the field's computed direction
  // when the menu opens and mirror it.
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  useLayoutEffect(() => {
    if (!expanded || !fieldRef.current) return;
    setDirection(
      getComputedStyle(fieldRef.current).direction === 'rtl' ? 'rtl' : 'ltr',
    );
  }, [expanded]);

  return {
    inputRef,
    registerItem,
    setFieldRef,
    portalRoot,
    setInputRef,
    setFloating,
    floatingStyles,
    direction,
    getReferenceProps,
    getListboxProps: getFloatingProps,
    getItemProps,
  };
};

/**
 * Long lists render in pages: the first COMBOBOX_RENDER_PAGE rows, then another
 * page each time the user scrolls or arrows near the end. The limit starts over
 * whenever `resetKey` changes (the menu opens or closes, or the text changes).
 * Short lists are unaffected.
 */
export const useComboboxRenderLimit = (resetKey: string) => {
  const [state, setState] = useState({
    key: resetKey,
    limit: COMBOBOX_RENDER_PAGE,
  });
  let limit = state.limit;
  if (state.key !== resetKey) {
    limit = COMBOBOX_RENDER_PAGE;
    setState({ key: resetKey, limit });
  }
  const grow = useCallback(
    () =>
      setState((current) => ({
        ...current,
        limit: current.limit + COMBOBOX_RENDER_PAGE,
      })),
    [],
  );
  return { renderLimit: limit, grow };
};
