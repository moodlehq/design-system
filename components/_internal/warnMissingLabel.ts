// Required label props are enforced by TypeScript, but plain-JS consumers get
// no compile error — a missing label silently leaves a control with no
// accessible name. Warn in development so the gap is caught before it ships.
export const warnMissingLabel = (
  component: string,
  propName: string,
  value: string | undefined,
) => {
  if (!import.meta.env.DEV || value?.trim()) return;

  console.warn(
    `[MDS ${component}] ${propName} is required. Pass a translated string.`,
  );
};
