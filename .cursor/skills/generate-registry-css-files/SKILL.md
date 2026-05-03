---
name: generate-registry-css-files
description: Generate or update theme.css and global.scoped.css in packages/registries/<registry-name>/src/styles from an existing global.css. Use when the user asks to create or update registry scoped/theme style files for a shadcn registry package.
---

# Generate Registry CSS Files

Generate `theme.css` and `global.scoped.css` for `packages/registries/<registry-name>/src/styles` by mirroring existing registry style conventions in this repo.

Assume `global.css` already exists and is the source of truth.

## Default Behavior

- Do not create or modify `global.css`.
- Generate/update `theme.css` and `global.scoped.css` from existing `global.css`.
- If the user requests only one of them, update only that file.

## File Scope Rules

1. **`theme.css` requested**
   - Create/update `theme.css`.
   - Derive token mappings from the existing `global.css` token set.
   - Do not edit `global.css` unless the user explicitly asks.
   - Include:
     - `@import "tailwindcss";`
     - `@import "tw-animate-css";`
     - `@custom-variant dark (&:is(.dark *));`
     - `@theme inline` mappings from semantic Tailwind vars (for example `--color-primary`) to token vars (for example `--primary`)
     - `@layer base` with shared base styles (`*` and `body`; optional `html` font assignment if registry pattern already uses it)

2. **`global.scoped.css` requested**
   - Create/update `global.scoped.css`.
   - Include `@import "./theme.css";` at top.
   - Copy token keys/values from existing `global.css` and only change selector scoping.
   - Do not edit `global.css` unless the user explicitly asks.
   - Scope light tokens under `[data-registry="<registry-name>"]`.
   - Scope dark tokens under:
     - `html.dark[data-registry="<registry-name>"]`
     - `html.dark [data-registry="<registry-name>"]`
     - `[data-registry="<registry-name>"].dark`
   - Keep token names identical to `global.css` to avoid component breakage.

## Derivation Rules

- Treat `global.css` as the source of truth for token keys.
- `global.scoped.css` must use the same token set and values as `global.css`, only selector scope changes.
- `theme.css` should map the same token keys used by registry components and existing registries.
- When asked for `theme.css` and/or `global.scoped.css`, generate from existing `global.css` without rewriting `global.css` by default.
- Prefer copying structure/order from the nearest existing registry and changing only:
  - registry name in scoped selectors
  - requested token values
  - optional font/radius/shadow values when user provides new design tokens

## Consistency Rules

- Preserve existing file header comment style when present.
- Keep property order stable and close to other registries for maintainability.
- Use ASCII only unless existing file already contains non-ASCII.

## Validation

- Verify all requested files are under `packages/registries/<registry-name>/src/styles/`.
- Run diagnostics/lints for touched files when possible.
- Confirm token parity between `global.css` and `global.scoped.css` when both were generated.

## Response Requirements

- Clearly state which files were generated.
- Explicitly state that `global.css` was treated as input and was not modified (unless user explicitly asked for it).
