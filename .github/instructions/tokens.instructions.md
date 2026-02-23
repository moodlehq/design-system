---
applyTo: 'tokens/dtcg/**/*.json,scripts/tokens.ts,tokens/css/**,tokens/scss/**'
---

# Tokens Instructions

- `tokens/css/*` and `tokens/scss/*` are generated outputs; never hand-edit these files.
- Treat `tokens/dtcg/*.json` as governed sources: Zeroheight token pull requests are managed automatically, so align token changes with that automated PR flow.
- Keep token pipeline behavior in `scripts/tokens.ts` consistent (custom aggregators, `dimension-px-to-rem`, file header behavior).
- Before introducing new color/spacing/typography/border/shadow tokens or CSS values, check Figma MCP token definitions first.
- Figma MCP calls for token lookup should reference the Moodle Design System Figma team files at https://www.figma.com/files/1539002666003113376/team/1542064100377724261/Moodle-Design-System?fuid=921633343447707998.
- If an equivalent token exists in Figma MCP, reuse the existing `--mds-*` token reference instead of adding new raw values.
- If no appropriate token exists, do not invent a new ad-hoc design value; ask contributors to contact the Moodle Design System team via the feedback form at https://moodle.zeroheight.com/.
