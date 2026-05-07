---
name: add-registry-component-docs
description: Add or update Fumadocs MDX pages for components in an existing shadcn/ui registry package. Use when the user added a registry component and wants docs pages, MDX examples, sidebar meta entries, or required MDX component wiring for that component.
---

# Add Registry Component Docs

Document newly added components from `packages/registries/<registry-name>` in the Fumadocs site at `apps/website`.

## Scope

- Target existing registries only: `packages/registries/<registry-name>`.
- Add docs for the requested component(s). If none are named, scan `src/components/ui/*.tsx` and compare against existing docs pages.
- Keep the existing docs style simple and pattern-matched. Do not redesign the docs system.
- Do not run `pnpm install`, build scripts, or dev servers unless the user explicitly asks.

## Workflow

1. Discover the component and current docs pattern.
   - Read the component file under `packages/registries/<registry-name>/src/components/ui/<component>.tsx`.
   - Read `packages/registries/<registry-name>/src/mdx.ts`.
   - Read examples under `apps/website/content/docs/<registry-name>/`, especially `button.mdx`, `input.mdx`, and their `.ko.mdx` versions when present.
   - Read `apps/website/content/docs/<registry-name>/meta.json`.

2. Ensure the component is available to MDX.
   - If `src/mdx.ts` does not export a tag for the component, add it.
   - Follow the existing tag naming convention:
     - `t-flavored` -> `TFlavored<ComponentName>`
     - `seed` -> `Seed<ComponentName>`
     - `montage` -> `Montage<ComponentName>`
   - Import the component from `./components/ui/<component>`.

3. Create or update docs pages.
   - Add `apps/website/content/docs/<registry-name>/<component-kebab>.mdx`.
   - Add `apps/website/content/docs/<registry-name>/<component-kebab>.ko.mdx` when the registry already has Korean pages.
   - Match existing frontmatter:
     - `title: <ComponentName>`
     - `description: <ComponentName> Component` for English.
     - `description: <ComponentName> 컴포넌트` for Korean.
   - Include a small live MDX example using the exported tag inside:
     - `<div data-registry="<registry-name>">`
   - Use the component's real props only after checking the component source. Prefer a minimal valid example over invented API.

4. Update sidebar metadata.
   - Add `<component-kebab>` to `apps/website/content/docs/<registry-name>/meta.json` `pages`.
   - Preserve the existing order. Usually append new component pages after current component slugs.
   - If a localized meta file exists for that registry, update it too.

5. Validate minimally.
   - Read lints/diagnostics for touched TS/TSX/MDX files when available.
   - If no validation was run, say so clearly.

## MDX Page Shape

Use this as a starting point and adapt labels to match nearby pages:

```mdx
---
title: ComponentName
description: ComponentName Component
---

## ComponentName (MDX)

<div data-registry="registry-name">
  <RegistryPrefixComponentName />
</div>
```

For Korean pages:

```mdx
---
title: ComponentName
description: ComponentName 컴포넌트
---

## ComponentName (MDX)

<div data-registry="registry-name">
  <RegistryPrefixComponentName />
</div>
```

## Response Format

- State which registry/component docs were added or updated.
- Mention MDX component wiring if `src/mdx.ts` changed.
- Mention sidebar/meta updates.
- Note whether validation was run.
- Notify the user at the end of all work, which command they need to run, if any. (etc. pnpm install)
