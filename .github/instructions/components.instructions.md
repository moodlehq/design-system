---
applyTo: 'components/**/*.{ts,tsx,css}'
---

# Components Instructions

- Keep the existing component shape: `Component.tsx`, `component.css`, `Component.test.tsx`, `Component.stories.tsx`, and `index.tsx` in the same folder.
- Wrap React-Bootstrap primitives and keep props typed with `interface ... extends` RB props where appropriate.
- Keep runtime validation for constrained public props (for example `allowedVariants` fallback pattern used by `Button` and `Alert`).
- Always include a stable `mds-*` class hook in rendered markup, then style in the local CSS file.
- Use existing `--mds-*` tokens in CSS; do not introduce ad-hoc CSS variables or hardcoded design values when a token exists.
- Re-export from the local `index.tsx` and from `components/index.tsx` when adding a new component.
