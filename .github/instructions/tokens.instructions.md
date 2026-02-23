---
applyTo: 'tokens/dtcg/**/*.json,scripts/tokens.ts,tokens/css/**,tokens/scss/**'
---

# Tokens Instructions

## Agent guardrail — do not modify token files

**Agents must not edit any token files.** `tokens/dtcg/**/*.json`, `tokens/css/**`, and `tokens/scss/**` are all managed externally:

- `tokens/dtcg/*.json` — governed by an automated ZeroHeight PR flow. Changes must go through that process, not be made locally by an agent.
- `tokens/css/*` and `tokens/scss/*` — generated outputs rebuilt from DTCG sources. Never edit directly.

If a token change is needed, direct the contributor to request it via https://design.moodle.com/.

## Token sources

`tokens/dtcg/*.json` are the governed sources in [DTCG format](https://www.designtokens.org/). They are managed by an automated ZeroHeight PR flow — align token changes with that process rather than editing locally.

## Regenerating tokens

> **Agents: do not follow these steps.** Token changes must go through the ZeroHeight PR flow. This section is for human contributors only.

After any change to `tokens/dtcg/*.json`, run:

```bash
npm run build-tokens
```

Then commit **both** the source changes and the regenerated outputs in `tokens/css/` and `tokens/scss/` together in the same commit.

This invokes `scripts/tokens.ts` via Style Dictionary and produces:

- `tokens/css/` — CSS custom properties prefixed `--mds-`, plus `index.css` that imports them all
- `tokens/scss/` — SCSS variables prefixed `$mds-` with `!default`, plus `_index.scss` (`@forward`) and `_index.legacy.scss` (`@import` for `scssphp` — tag: `MDS_LEGACY_SCSSPHP_COMPAT`)

A custom transform (`dimension-px-to-rem`) converts `$type: "number"` dimension tokens from px to rem (÷16), excluding font-weight tokens.

## Token naming convention

Tokens follow a hierarchical naming pattern: `--mds-{category}-{subcategory}-{modifier}`

| Category | Examples |
|---|---|
| Background | `--mds-bg-interactive-primary-default`, `--mds-bg-interactive-primary-hover`, `--mds-bg-interactive-primary-disabled` |
| Text | `--mds-text-default`, `--mds-text-inverse`, `--mds-text-muted`, `--mds-text-danger` |
| Border | `--mds-border-translucent`, `--mds-border-interactive-primary-default`, `--mds-border-radius-lg` |
| Spacing | `--mds-spacing-xxs`, `--mds-spacing-xs`, `--mds-spacing-sm`, `--mds-spacing-md` |
| Typography | `--mds-font-family-base`, `--mds-font-weight-regular`, `--mds-font-size-paragraph-default`, `--mds-line-height-paragraph-small`, `--mds-letter-spacing-default` |
| Stroke | `--mds-stroke-weight-sm` |
| Shadow | `--mds-shadow-lg` |

State variants follow the pattern `...-default`, `...-hover`, `...-active`, `...-disabled`.

## Discovering available tokens

Browse the generated files in `tokens/css/` (e.g. `colors.css`, `spacing.css`, `typography.css`) or use the Figma MCP token definitions via `get_design_context` or `get_variable_defs` against the Moodle Design System Figma team files.

## Using tokens in component CSS

Use CSS custom properties via `var()`. Never hardcode color, spacing, typography, border, or shadow values. Do not add fallback values to `var()` calls — tokens are always defined via the `index.ts` import chain, so a fallback would only mask a missing token that should be fixed at the source.

See `components/button/button.css` for a concrete example of correct token usage in component styles.

## Breaking change guardrail

Renaming or removing a token is a breaking change — consumer code referencing the old name will silently lose its value (the `var()` resolves to nothing with no error).

The following changes must not be made without a major version bump:

| Change | Why it breaks |
|---|---|
| Renaming a token | Any `var(--mds-old-name)` in consumer CSS stops resolving |
| Removing a token | Same as above |
| Changing a token's type or unit (e.g. `px` → `rem` at the source level) | Changes computed values in consumer layouts |

Safe (non-breaking) changes: adding a new token, changing a token's value within the same type and unit.

## If no token exists

Do not invent an ad-hoc CSS variable or hardcode a raw value. Ask contributors to request a token via https://design.moodle.com/.
