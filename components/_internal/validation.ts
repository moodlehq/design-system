import { type RefObject, useEffect } from 'react';

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
 */
export const focusFirstInvalidOnSubmit = (control: {
  form: HTMLFormElement | null;
}) => {
  const form = control.form;
  if (!form || form !== submitAttemptForm) return;
  // One focus move per attempt, like the browser. Cleared first, because
  // moving focus can blur another control that validates itself on blur.
  submitAttemptForm = null;
  // form.elements only holds form-associated HTML elements, all focusable.
  const firstInvalid = Array.from(form.elements).find(isInvalidControl) as
    HTMLElement | undefined;
  firstInvalid?.focus();
};
