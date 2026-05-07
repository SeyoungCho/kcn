---
name: integrate-external-design-tokens
description: Integrate an external design system's independent token set into a shadcn registry's global.css, global.scoped.css, and theme.css in a Tailwind CSS v4-friendly way. Use when adding colors, typography, spacing, radius, motion, elevation, gradients, or similar tokens to registry styles.
---

# Integrate External Design Tokens

Adapt external design-system tokens into a registry package under `packages/registries/<registry-name>/src/styles`.

## Goal

External token sets often do not follow Tailwind or shadcn naming. Preserve the source design-system meaning while exposing low-friction Tailwind utilities through `@theme`.

## Workflow

1. Read the target registry style files:
   - `global.css`
   - `global.scoped.css`
   - `theme.css`

2. Extract token groups from the external reference.
   - Identify primitive tokens (palette, font size, spacing, radius, duration).
   - Identify semantic tokens (foreground/background/stroke roles, layer colors, text styles).
   - Identify composite tokens (gradients, shadows).
   - Record light/dark differences explicitly.

3. Add source tokens to `global.css`.
   - Use stable CSS variable names that preserve design-system meaning, for example:
     - `--palette-carrot-600`
     - `--fg-brand`
     - `--dimension-x4`
     - `--motion-duration-d3`
     - `--elevation-shadow-s2`
   - Avoid self-referencing names when a Tailwind namespace will use the same name.
   - Put dark overrides under the registry's existing dark selector.

4. Mirror source tokens in `global.scoped.css`.
   - Keep values and token keys in parity with `global.css`.
   - Only change selectors to the scoped registry selectors:
     - `[data-registry="<registry-name>"]`
     - `html.dark[data-registry="<registry-name>"]`
     - `html.dark [data-registry="<registry-name>"]`
     - `[data-registry="<registry-name>"].dark`

5. Map tokens in `theme.css` using Tailwind CSS v4 namespaces.
   - Colors: `--color-*` so consumers can use `bg-*`, `text-*`, `border-*`, `outline-*`.
   - Text: `--text-*` and `--text-*--line-height`.
   - Font weights: `--font-weight-*`.
   - Spacing: `--spacing-*` so `p-*`, `m-*`, `gap-*`, `space-*`, `size-*`, `w-*`, `h-*` work.
   - Radius: `--radius-*` so `rounded-*` works.
   - Shadows: `--shadow-*` so `shadow-*` works.
   - Motion: `--duration-*`, `--ease-*`, `--default-transition-duration`, and `--default-transition-timing-function`.
   - Fonts: `--font-*`.

6. Use custom utilities only when no native Tailwind namespace fits.
   - Good use cases:
     - semantic text-style bundles combining size, line-height, and weight
     - gradient background-image utilities
   - Prefer `@theme` over hand-written utilities for tokens that Tailwind already understands.

7. Preserve shadcn compatibility.
   - Keep aliases like `--background`, `--foreground`, `--primary`, `--border`, `--ring`, and sidebar tokens.
   - Point these aliases at the new semantic design-system tokens when there is a clear match.

## Naming Guidance

- Preserve source vocabulary for raw tokens: `--fg-critical`, `--bg-brand-solid`, `--stroke-neutral-weak`.
- Expose Tailwind-friendly names through namespaces:
  - `--color-fg-critical` -> `text-fg-critical`
  - `--color-bg-brand-solid` -> `bg-bg-brand-solid`
  - `--color-stroke-neutral-weak` -> `border-stroke-neutral-weak`
  - `--spacing-global-gutter` -> `px-global-gutter`, `gap-global-gutter`
  - `--radius-xxs` -> `rounded-xxs`
  - `--duration-d3` -> `duration-d3`
  - `--ease-enter` -> `ease-enter`

The repeated prefix in classes like `bg-bg-brand-solid` is acceptable when the external system uses `bg` as a semantic property.

## Validation

- Run Prettier on touched CSS and Markdown files.
- Search for accidental self-references such as `--radius-full: var(--radius-full)`.
- Check that `global.css` and `global.scoped.css` contain the same source token set.
- Report any tokens that were intentionally omitted or approximated.

## Response Format

- List token groups integrated.
- Mention Tailwind utility examples for each major namespace.
- State whether formatting/validation ran.
