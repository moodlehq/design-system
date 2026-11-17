import { useCallback, useRef, useState } from 'react';

/**
 * Tracks whether a field's current focus was started by a pointer (mouse,
 * touch or pen) rather than the keyboard.
 *
 * Browsers match :focus-visible on click for text fields and selects, so the
 * keyboard focus ring would also show for pointer users. Fields add a
 * `--pointer-focus` modifier class while `isPointerFocus` is true to suppress
 * the ring: the border change alone shows the active state, and the ring is
 * kept for keyboard navigation (WCAG 2.4.11 is still met for keyboard users).
 *
 * Call the returned functions from the field's own onPointerDown, onFocus and
 * onBlur handlers, alongside the consumer's handlers and any field-specific
 * work such as blur validation.
 */
export const usePointerFocus = () => {
  const isPointerDownRef = useRef(false);
  const [isPointerFocus, setIsPointerFocus] = useState(false);

  const markPointerDown = useCallback(() => {
    isPointerDownRef.current = true;
  }, []);

  // pointerdown always precedes the focus it causes, so the flag tells the
  // two kinds of focus apart. It's cleared here so a later keyboard focus
  // isn't mistaken for a pointer one.
  const handleFocus = useCallback(() => {
    setIsPointerFocus(isPointerDownRef.current);
    isPointerDownRef.current = false;
  }, []);

  // Also cleared on blur: a pointerdown that never focused the field (e.g.
  // dragging off it) mustn't carry over to the next focus.
  const handleBlur = useCallback(() => {
    isPointerDownRef.current = false;
    setIsPointerFocus(false);
  }, []);

  return { isPointerFocus, markPointerDown, handleFocus, handleBlur };
};
