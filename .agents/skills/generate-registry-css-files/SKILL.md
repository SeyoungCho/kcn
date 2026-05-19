---
name: generate-registry-css-files
description: Generate or update registry CSS files in packages/registries/<registry-name>/src/styles. Use when the user asks to create or update a registry's theme tokens or Tailwind theme wiring for a shadcn registry package.
---

# Generate Registry CSS Files

Generate or update CSS files for `packages/registries/<registry-name>/src/styles` by mirroring existing registry style conventions in this repo.

Assume `theme.css` is the source of truth for token values and `global.css` is the full app entry point.

## Background — How These Files Are Consumed

Each registry exports two CSS files from its `package.json`:

- `theme.css` — theme CSS variable definitions on `:root` and `.dark`. Imported transitively via `global.css`.
- `global.css` — full app entry point with Tailwind imports, `@theme inline` mappings, and base layer. **Imported by the per-registry iframe preview** under `apps/website/src/app/preview/<registry-name>/preview.css`, where it is the source of theme isolation. Each iframe loads exactly one registry's `global.css`, so token names cannot collide across registries.

When updating these files, keep the token names wired in `global.css` aligned with the CSS variables defined in `theme.css` so component classes (e.g. `bg-primary`) resolve correctly.

## Default Behavior

- Update `theme.css` when token values change.
- Update `global.css` only when Tailwind token mappings, imports, custom variants, or base layer behavior need to change.

## File Scope Rules

**`theme.css` requested**

- Create/update `theme.css`.
- Define token values on `:root` and `.dark`.
- Do not edit `global.css` unless new/renamed tokens require Tailwind wiring changes.

**`global.css` requested**

- Create/update `global.css`.
- Derive token mappings from the existing `theme.css` token set.
- Include:
  - `@import "tailwindcss";`
  - `@import "tw-animate-css";`
  - `@import "./theme.css";`
  - `@custom-variant dark (&:is(.dark *));`
  - `@theme inline` mappings from semantic Tailwind vars (for example `--color-primary`) to token vars (for example `--primary`)
  - `@layer base` with shared base styles (`*` and `body`; optional `html` font assignment if registry pattern already uses it)

**Both files requested**

- Keep `theme.css` as token definitions and `global.css` as the Tailwind wiring entry point.
- Include:
  - `:root` and `.dark` token values in `theme.css`
  - Tailwind imports, `@theme inline`, and base layer in `global.css`

## Derivation Rules

- Treat `theme.css` as the source of truth for token keys.
- `global.css` should map the same token keys used by registry components and existing registries.
- Generate `global.css` from existing `theme.css` without rewriting token values by default.
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

- Clearly state which CSS files were generated or updated.
- Explicitly state when `theme.css` token values were treated as input and were not modified.
