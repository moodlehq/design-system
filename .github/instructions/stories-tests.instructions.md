---
applyTo: 'components/**/*.{stories,test}.tsx,tests/**/*.ts'
---

# Stories and Tests Instructions

- For stories, include `tags: ['autodocs', 'test', 'stable']` unless intentionally excluded from Storybook Vitest runs.
- Keep stories in CSF with `satisfies Meta<typeof Component>` and use concise `play` assertions for interaction/a11y checks.
- Reuse existing story patterns from `components/button/Button.stories.tsx` and `components/alert/Alert.stories.tsx`.
- For unit tests, use Vitest + Testing Library patterns already used in component tests.
- Prefer `tests/utils/fuzzComponent.ts` with `fast-check` when prop permutations are broad.
- Validate behavior that defines public API contracts (fallback variants, prop forwarding, action callbacks, dismiss handling).
