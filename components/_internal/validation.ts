import { useEffect } from 'react';

// Form controls that cancel `invalid` (to show their own message instead of
// the native bubble) also stop the browser focusing the first invalid control
// on submit, so a failed submit would change nothing for keyboard and screen
// reader users. These helpers put that focus move back, for submit attempts
// only: validation on blur or a programmatic checkValidity() never moves focus.

let submitAttemptForm: HTMLFormElement | null = null;
const trackedDocuments = new WeakSet<Document>();

const isSubmitter = (
  element: Element | null,
): element is HTMLButtonElement | HTMLInputElement =>
  (element instanceof HTMLButtonElement && element.type === 'submit') ||
  (element instanceof HTMLInputElement &&
    (element.type === 'submit' || element.type === 'image'));

// A submit button click validates the form synchronously as its default
// action, so the attempt only needs to outlive the current task.
const handleClick = (event: MouseEvent) => {
  const submitter =
    event.target instanceof Element
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
  if (
    event.key === 'Enter' &&
    event.target instanceof HTMLInputElement &&
    event.target.form
  ) {
    submitAttemptForm = event.target.form;
  }
};

const handleKeyUp = () => {
  submitAttemptForm = null;
};

/**
 * Starts recording submit attempts (submit button clicks, Enter in a field)
 * for the document. Call it in every form control that cancels `invalid`.
 * Listeners are added once per document and kept for the page's lifetime.
 */
export const useSubmitAttemptTracking = () => {
  useEffect(() => {
    if (trackedDocuments.has(document)) return;
    trackedDocuments.add(document);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keyup', handleKeyUp, true);
  }, []);
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
  const firstInvalid = Array.from(form.elements).find(isInvalidControl);
  if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
};
