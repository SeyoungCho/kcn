---
name: wire-registry-to-fumadocs-docs
description: Wire an existing shadcn registry package from /packages into the Fumadocs website package by following the current code-level pattern. Use when the user asks to display, add, connect, or integrate a registry (for example seed, t-flavored, montage) in docs website/fumadocs, without running install/build scripts.
---

# Wire Registry To Fumadocs Docs

Integrate one existing registry package from `packages/registries/<registry-name>` into `apps/website` using the repository's existing pattern.

## Non-goals

- Do not run `pnpm install`.
- Do not run build scripts.
- Do not run dev servers.
- Always skip `pnpm install`, build scripts, and dev server commands unless the user explicitly asks.

## Workflow

1. Discover the current pattern from existing integrated registries.
   - Read:
     - `apps/website/src/app/[lang]/docs/layout.tsx`
     - `apps/website/src/components/mdx.tsx`
     - `apps/website/src/app/global.css`
     - `apps/website/package.json`
   - Check docs content pattern under:
     - `apps/website/content/docs/<existing-registry>/`
   - Mirror style and naming already used in the repo.

2. Ensure website dependency is wired.
   - Add `@repo/<registry-name>: "workspace:*"` to `apps/website/package.json` dependencies when missing.

3. Wire registry components for MDX usage.
   - Follow the current architecture in the repo:
     - If website consumes `@repo/<registry-name>/mdx`, export `mdxComponents` in `packages/registries/<registry-name>/src/mdx.ts` and expose it via package `exports`.
     - If website still uses direct component imports, mirror that pattern exactly.
   - Keep naming consistent with existing convention (example: `SeedButton`, `TFlavoredInput`, `MontageButton`).

4. Wire registry styles for Tailwind/class scanning.
   - In `apps/website/src/app/global.css`:
     - Add `@import "@repo/<registry-name>/styles/global.scoped.css";` if missing.
     - Add `@source "../../node_modules/@repo/<registry-name>";` if missing.
   - Keep existing comments and ordering style consistent.

5. Add docs tab entry.
   - In `apps/website/src/app/[lang]/docs/layout.tsx`, add a tab object:
     - `title`: `<registry-name>`
     - `description`: `<registry-name>-desc` (or current local convention)
     - `url`: `/${lang}/docs/<registry-name>`
     - icon image from `apps/website/public/<registry-name>-logo.png` when available.

6. Add docs content pages if absent.
   - Determine component scope first:
     - If the user explicitly names target components, document only those components.
     - If the user does not specify components, scan `packages/registries/<registry-name>/src/components/ui/*.tsx` and document all discovered UI components.
   - Create `apps/website/content/docs/<registry-name>/` with:
     - `meta.json`, `meta.ko.json`
     - `index.mdx`, `index.ko.mdx`
     - one component page pair per selected/discovered component:
       - `<component-kebab>.mdx`
       - `<component-kebab>.ko.mdx`
   - Update `meta.json` and `meta.ko.json` `pages` lists to include all generated component page slugs.
   - Reuse same structure/text style as existing docs and swap registry/component-specific identifiers.

7. Keep changes minimal and pattern-matching.
   - Do not refactor unrelated files.
   - Do not rename existing symbols unless required for consistency.

## Validation

- Run lints/diagnostics only for touched files (for example `ReadLints`).
- Report unresolved module errors as expected when dependency linking is pending.
- Provide a concise list of changed files and what was wired.

## Response Format

- State that registry wiring is complete.
- List integration points updated:
  - website dependency
  - MDX component wiring
  - global CSS import/source
  - docs layout tab
  - docs content directory
- Explicitly mention that install/build was not run.
