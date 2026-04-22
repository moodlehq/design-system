// Required: TypeScript >= 5.6 with moduleResolution "bundler" and
// noUncheckedSideEffectImports: true treats a missing `types` condition on a
// package export as a hard error. This declaration satisfies that check for
// the side-effect-only CSS import: import '@moodlehq/design-system/css'
declare module '@moodlehq/design-system/css' {}
