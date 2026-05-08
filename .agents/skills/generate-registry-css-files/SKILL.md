---
name: generate-registry-css-files
description: Generate or update theme.css in packages/registries/<registry-name>/src/styles from an existing global.css. Use when the user asks to create or update a registry's theme tokens for a shadcn registry package.
---

# Generate Registry CSS Files

Generate `theme.css` for `packages/registries/<registry-name>/src/styles` by mirroring existing registry style conventions in this repo.

Assume `global.css` already exists and is the source of truth for token values.

## Background — How These Files Are Consumed

Each registry exports two CSS files from its `package.json`:

- `theme.css` — `@theme inline` token mappings shared across the registry. Imported transitively via `global.css`.
- `global.css` — full-app theme on `:root` plus dark variant on `.dark`. **Imported by the per-registry iframe preview** under `apps/website/src/app/preview/<registry-name>/preview.css`, where it is the source of theme isolation. Each iframe loads exactly one registry's `global.css`, so token names cannot collide across registries.

When updating these files, keep the token names in `theme.css` aligned with the CSS variables defined in `global.css` so component classes (e.g. `bg-primary`) resolve correctly.

## Default Behavior

- Do not create or modify `global.css`.
- Generate/update `theme.css` from existing `global.css`.

## File Scope Rules

**`theme.css` requested**

- Create/update `theme.css`.
- Derive token mappings from the existing `global.css` token set.
- Do not edit `global.css` unless the user explicitly asks.
- Include:
  - `@import "tailwindcss";`
  - `@import "tw-animate-css";`
  - `@custom-variant dark (&:is(.dark *));`
  - `@theme inline` mappings from semantic Tailwind vars (for example `--color-primary`) to token vars (for example `--primary`)
  - `@layer base` with shared base styles (`*` and `body`; optional `html` font assignment if registry pattern already uses it)

## Derivation Rules

- Treat `global.css` as the source of truth for token keys.
- `theme.css` should map the same token keys used by registry components and existing registries.
- Generate `theme.css` from existing `global.css` without rewriting `global.css` by default.
- Prefer copying structure/order from the nearest existing registry and changing only:
  - requested token values
  - optional font/radius/shadow values when user provides new design tokens

## Consistency Rules

- Preserve existing file header comment style when present.
- Keep property order stable and close to other registries for maintainability.
- Use ASCII only unless existing file already contains non-ASCII.

## Validation

- Verify the generated file lives under `packages/registries/<registry-name>/src/styles/`.
- Run diagnostics/lints for touched files when possible.

## Response Requirements

- Clearly state that `theme.css` was generated.
- Explicitly state that `global.css` was treated as input and was not modified (unless user explicitly asked for it).
