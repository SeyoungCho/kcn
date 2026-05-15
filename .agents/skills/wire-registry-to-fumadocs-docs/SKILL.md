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

## Background — Where Registry Components Render

Registry components render exclusively inside per-registry preview iframes at `/preview/<registry-name>/...`. Each iframe is its own document, with its own root layout, loading ONLY that registry's CSS bundle. MDX content embeds these iframes via the `<Preview>` MDX component — it never renders registry components inline in the docs page itself.

This means adding a new registry to the docs site is primarily about creating the new preview route tree (`/app/preview/<registry-name>/...`) and registering the registry's `mdxComponents` map so `<Preview>` can resolve component names against it.

The `<Preview>` component also owns the Code tab. Component previews generate copyable usage snippets from `<Preview>` props. Demo previews load the matching `apps/website/src/app/preview/<registry-name>/demos/<slug>/page.tsx` source through `/api/preview-code`, then rewrite `@repo/<registry-name>/ui/*` imports to reader-facing `@/components/ui/*` imports.

## Workflow

1. Discover the current pattern from existing integrated registries.
   - Read:
     - `apps/website/src/app/[lang]/docs/layout.tsx`
     - `apps/website/src/components/mdx.tsx`
     - `apps/website/src/components/preview.tsx`
     - `apps/website/src/app/global.css`
     - `apps/website/src/app/preview/<existing-registry>/layout.tsx`
     - `apps/website/src/app/preview/<existing-registry>/preview.css`
     - `apps/website/src/app/preview/<existing-registry>/[component]/page.tsx`
     - `apps/website/src/lib/preview.tsx`
     - `apps/website/next.config.mjs`
     - `apps/website/src/proxy.ts`
     - `apps/website/package.json`
   - Check docs content pattern under:
     - `apps/website/content/docs/<existing-registry>/`
   - Mirror style and naming already used in the repo.

2. Ensure website dependency is wired.
   - Add `@repo/<registry-name>: "workspace:*"` to `apps/website/package.json` dependencies when missing.
   - Add `@repo/<registry-name>` to the `transpilePackages` array in `apps/website/next.config.mjs` when missing. All three current registries (`@repo/montage`, `@repo/seed`, `@repo/t-flavored`) appear there.
   - Add `<registry-name>` to `PREVIEW_REGISTRIES` in `apps/website/src/types/preview.ts` so `<Preview>` and `/api/preview-code` accept the new registry slug.

3. Ensure the registry exposes the styles entry points the iframe pattern expects.
   - In `packages/registries/<registry-name>/package.json`, the `exports` field MUST include both of:
     - `./styles/global.css` — full-app theme on `:root`, imported by the per-registry preview iframe CSS bundle.
     - `./styles/theme.css` — `@theme inline` token mappings (imported transitively by `global.css`).
   - If `./styles/global.css` is missing from `exports`, add it.

4. Wire registry components for the `<Preview>` lookup map.
   - Follow the current architecture in the repo:
     - Export `mdxComponents` in `packages/registries/<registry-name>/src/mdx.ts` with keys following the registry-prefix convention (`SeedButton`, `TFlavoredInput`, `MontageButton`, ...).
     - Expose it via package `exports` as `./mdx`.
   - This map is the runtime lookup table consumed by `apps/website/src/app/preview/<registry-name>/[component]/page.tsx` to resolve `<Preview registry="..." component="..." />`. Every component the docs site needs to embed must be listed here.

5. Create the per-registry preview iframe route tree.

   This is the surface where `<Preview>` actually renders the component. Mirror the existing `apps/website/src/app/preview/seed/` shape:

   ```
   apps/website/src/app/preview/<registry-name>/
   ├── preview.css                  # imports @repo/<registry-name>/styles/global.css and sets @source
   ├── layout.tsx                   # minimal root <html>/<body>; imports ./preview.css
   ├── [component]/
   │   └── page.tsx                 # dynamic component preview; uses renderPreview()
   └── demos/                       # OPTIONAL; create when a doc page needs a composed demo
       └── <slug>/page.tsx
   ```

   Files:
   - `preview.css`:
     ```css
     @import "@repo/<registry-name>/styles/global.css";
     @source "../../../../node_modules/@repo/<registry-name>";
     @source "../../../../../../packages/registries/<registry-name>";
     ```
   - `layout.tsx`: render `<html><body className="bg-background text-foreground">{children}</body></html>` and import `./preview.css`. Do NOT pull in Fumadocs providers or the docs theme.
   - `[component]/page.tsx`: import `mdxComponents` from `@repo/<registry-name>/mdx` and call the shared `renderPreview` helper from `@/lib/preview` with the appropriate `registryPrefix` (e.g. `"Seed"`, `"Montage"`, `"TFlavored"`).
   - `demos/<slug>/page.tsx`: import registry components from `@repo/<registry-name>/ui/<component>` so they render with the isolated registry package. The Code tab will rewrite those imports to `@/components/ui/<component>` for readers.

6. Confirm the i18n middleware excludes `/preview` paths.
   - `apps/website/src/proxy.ts` should already have `preview` listed in the negative-lookahead matcher group. If not, add it. The current matcher is:
     `"/((?!api|preview|_next/static|_next/image|.*\\..*|favicon.ico).*)"`.

7. Add docs tab entry.
   - In `apps/website/src/app/[lang]/docs/layout.tsx`, add a tab object:
     - `title`: `<registry-name>`
     - `description`: `<registry-name>-desc` (or current local convention)
     - `url`: `/${lang}/docs/<registry-name>`
     - icon image from `apps/website/public/<registry-name>-logo.png` when available.
     - always add at the end of the tab list.

8. Add docs content pages if absent.
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
   - For each component page, embed the live preview via `<Preview registry="<registry-name>" component="..." />`. Defer to the `add-registry-component-docs` skill for exact MDX page shape.

9. Keep changes minimal and pattern-matching.
   - Do not refactor unrelated files.
   - Do not rename existing symbols unless required for consistency.

## Validation

- Run lints/diagnostics only for touched files (for example `ReadLints`).
- Report unresolved module errors as expected when dependency linking is pending.
- Provide a concise list of changed files and what was wired.

## Response Format

- State that registry wiring is complete.
- List integration points updated:
  - website dependency (`package.json`)
  - `transpilePackages` in `next.config.mjs`
  - `PREVIEW_REGISTRIES` in `apps/website/src/types/preview.ts`
  - registry's `package.json` exports (`./styles/global.css`, `./styles/theme.css`)
  - MDX lookup map (`src/mdx.ts`)
  - per-registry preview route tree (`apps/website/src/app/preview/<registry-name>/`)
  - docs layout tab
  - docs content directory
- Explicitly mention that install/build was not run.
