import { type RefObject, useEffect, useLayoutEffect, useRef } from 'react';

// Form controls that cancel `invalid` (to show their own message instead of
// the native bubble) also stop the browser focusing the first invalid control
// on submit, so a failed submit would change nothing for keyboard and screen
// reader users. These helpers put that focus move back, for submit attempts
// only: validation on blur or a programmatic checkValidity() never moves focus.
//
// A control can live in another document than the one this module was loaded
// in (e.g. a React tree portaled into an iframe), so listeners go on the
// control's ownerDocument, and element checks avoid `instanceof`: an iframe's
// elements are built from that iframe's own HTMLElement constructors.

let submitAttemptForm: HTMLFormElement | null = null;
const trackedDocuments = new WeakSet<Document>();

const isElement = (target: EventTarget | null): target is Element =>
  (target as Node | null)?.nodeType === Node.ELEMENT_NODE;

const isInput = (target: EventTarget | null): target is HTMLInputElement =>
  isElement(target) && target.localName === 'input';

const isSubmitter = (
  element: Element | null,
): element is HTMLButtonElement | HTMLInputElement =>
  (element?.localName === 'button' &&
    (element as HTMLButtonElement).type === 'submit') ||
  (isInput(element) && (element.type === 'submit' || element.type === 'image'));

// A submit button click validates the form synchronously as its default
// action, so the attempt only needs to outlive the current task.
const handleClick = (event: MouseEvent) => {
  const submitter = isElement(event.target)
    ? event.target.closest('button, input')
    : null;
  if (!isSubmitter(submitter) || !submitter.form) return;
  const form = submitter.form;
  submitAttemptForm = form;
  setTimeout(() => {
    if (submitAttemptForm === form) submitAttemptForm = null;
  }, 0);
};

// Enter in a field submits the form implicitly (keypress), which can fall in
// a later task than keydown, so the attempt lasts until the key is released.
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && isInput(event.target) && event.target.form) {
    submitAttemptForm = event.target.form;
  }
};

const handleKeyUp = () => {
  submitAttemptForm = null;
};

/**
 * Starts recording submit attempts (submit button clicks, Enter in a field)
 * for the document the control is rendered in. Call it in every form control
 * that cancels `invalid`, with a ref to any element the control always renders.
 * Listeners are added once per document and kept for the page's lifetime.
 */
export const useSubmitAttemptTracking = (ref: RefObject<Element | null>) => {
  useEffect(() => {
    const ownerDocument = ref.current?.ownerDocument;
    if (!ownerDocument || trackedDocuments.has(ownerDocument)) return;
    trackedDocuments.add(ownerDocument);
    ownerDocument.addEventListener('click', handleClick, true);
    ownerDocument.addEventListener('keydown', handleKeyDown, true);
    ownerDocument.addEventListener('keyup', handleKeyUp, true);
  }, [ref]);
};

const isInvalidControl = (element: Element) =>
  (element as HTMLInputElement).willValidate &&
  !(element as HTMLInputElement).validity.valid;

/**
 * Call from a cancelled `invalid` handler. During a submit attempt, focuses
 * the form's first invalid control, as the browser would have, whichever
 * component it belongs to. Does nothing outside a submit attempt.
 *
 * Returns the control focus moved to, or null when focus didn't move (no
 * submit attempt, or the first invalid control already had focus). Callers
 * use it to tell whether the screen reader is about to announce the control.
 */
export const focusFirstInvalidOnSubmit = (control: {
  form: HTMLFormElement | null;
}): HTMLElement | null => {
  const form = control.form;
  if (!form || form !== submitAttemptForm) return null;
  // One focus move per attempt, like the browser. Cleared first, because
  // moving focus can blur another control that validates itself on blur.
  submitAttemptForm = null;
  // form.elements only holds form-associated HTML elements, all focusable.
  const firstInvalid = Array.from(form.elements).find(isInvalidControl) as
    HTMLElement | undefined;
  if (!firstInvalid) return null;
  const ownerDocument = form.ownerDocument;
  const previouslyFocused = ownerDocument.activeElement;
  firstInvalid.focus();
  return previouslyFocused !== firstInvalid &&
    ownerDocument.activeElement === firstInvalid
    ? firstInvalid
    : null;
};

/**
 * Calls `onReset` after the form that owns `ref`'s control is reset, unless
 * a consumer's onReset handler cancelled it. `ref` is the control itself, or
 * an element that contains it (e.g. a radio group's wrapper).
 *
 * form.reset() restores default values without firing change, so controls
 * that keep their own native error use this to drop it: a reset form is
 * pristine, and required errors only surface on the next submit.
 *
 * Pass the control's `form` attribute as `formAttribute`, since it can
 * re-associate the control with another form.
 */
export const useFormReset = (
  ref: RefObject<Element | null>,
  onReset: () => void,
  formAttribute?: string,
) => {
  // Kept in a ref so an inline callback doesn't re-subscribe every render.
  const onResetRef = useRef(onReset);
  useLayoutEffect(() => {
    onResetRef.current = onReset;
  });

  useEffect(() => {
    const element = ref.current;
    const control = (
      element && 'form' in element
        ? element
        : element?.querySelector('input, select, textarea')
    ) as { form: HTMLFormElement | null } | null | undefined;
    const form = control?.form;
    if (!form) return;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const handleReset = (event: Event) => {
      // Deferred because React's onReset handlers run after this native
      // listener (they're delegated to the root), so a consumer's
      // preventDefault() isn't visible yet.
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (!event.defaultPrevented) onResetRef.current();
      });
    };
    form.addEventListener('reset', handleReset);
    return () => {
      form.removeEventListener('reset', handleReset);
      clearTimeout(timeout);
    };
  }, [ref, formAttribute]);
};
