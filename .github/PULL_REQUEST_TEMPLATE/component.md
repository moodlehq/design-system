## Description

<!-- Describe the component, what it does, and the motivation for building or changing it -->

## Related Jira or GitHub Issue

<!-- Link to the related issue or ticket (e.g., https://moodle.atlassian.net/browse/MDS-191) -->

## Screenshots/Previews

<!-- Reference Chromatic visual diffs, add screenshots, or link to Storybook previews -->

## Author checklist

### File structure and exports

- [ ] All 5 required files present: `ComponentName.tsx`, `component-name.css`, `ComponentName.test.tsx`, `ComponentName.stories.tsx`, `index.tsx`
- [ ] Named and type exports added to `components/index.tsx`
- [ ] Component stylesheet imported in `components/index.css`

### TypeScript and props

- [ ] Props interface extends the correct React HTML element interface (e.g. `ButtonHTMLAttributes<HTMLButtonElement>`)
- [ ] JSDoc comment on each prop
- [ ] Constrained props use `allowedValues` runtime validation with a graceful fallback to a documented default
- [ ] `...props` spread last on the root element

### Internationalisation

- [ ] All user-facing strings accepted as props — no hardcoded text in JSX
- [ ] CSS uses logical properties (`margin-inline-*`, `padding-inline-*`, `inset-inline-*`) for any directional layout
- [ ] RTL story added if the component has directional layout

### CSS and tokens

- [ ] All CSS values use `var(--mds-*)` tokens — no hardcoded colours, spacing, or typography

### Tests and stories

- [ ] Unit tests cover: `mds-*` class on root, correct classes per variant/size, invalid prop fallback, prop forwarding, disabled state, and label rendering
- [ ] Storybook stories cover all documented variants, sizes, and states
- [ ] Accessibility tested — Axe WCAG AA scan runs automatically via CI on all stories tagged `test`

### Breaking changes

- [ ] Breaking change assessment complete — no prop, export, or token removed/renamed without a major version bump

### AI context

- [ ] Instruction files updated if this component introduces new patterns or anti-patterns

## Cross-system parity

- [ ] Component name, prop names, and variant names are consistent across code, Storybook, Figma, and Zeroheight

## Additional Notes

<!-- Add any other context or information reviewers should know -->
