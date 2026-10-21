# GitHub Copilot Instructions

All agent guidance for this repo lives in [AGENTS.md](../AGENTS.md). Read it before starting work. It covers setup and commands, commit conventions, guardrails and the index of scoped instruction files. This file is a thin wrapper so Copilot surfaces that don't read `AGENTS.md` still find it. Edit `AGENTS.md`, not this file.

The scoped files in `.github/instructions/` load automatically in VS Code/Copilot when a matching file is open.

Non-negotiables if you read nothing else:

- Don't edit token files (`tokens/**`) or run `npm run build-tokens`. They come from the ZeroHeight PR flow.
- Don't change the version in `package.json` or edit `CHANGELOG.md`.
- Use existing `--mds-*` tokens via `var(--mds-*)`. Never invent ad-hoc values.
- Commits follow Conventional Commits with a sentence-case subject.
