# Cold-retrieval eval

Measures whether an agent with no repo access picks the right MDS component, props and variant.

- `tasks.json`: v2 prop-level tasks. `tasks-intent.json`: intent-only tasks the `.d.ts` files cannot answer (when not to use, availability).
- Each answer is `<dir>/<taskId>.json`: `{ "components": [], "variant": null, "props": [], "notAvailable": false }`.
- Score: `node evals/cold-retrieval/score.mjs <answers-dir> [tasks-file]`.

Arms: cold (public web only), ZeroHeight MCP only, MCP plus installed package, package guidance (`dist/guidance`). Run each arm with 3+ trials in a clean directory and never let the agent read this repo. Update `shipped` in `tasks.json` when components are added.

Baselines (5.4.0): cold 8/8 on v2; MCP-only 1/8 on v2 (docs rarely name props).
