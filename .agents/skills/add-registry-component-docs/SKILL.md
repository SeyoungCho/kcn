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

## Background — How Component Previews Work

Component previews are rendered inside **isolated iframes** under `/preview/<registry-name>/...` so each registry's theme tokens cannot collide with the docs site or with the other registries. Docs writers embed previews via the `<Preview>` MDX component, which has two modes:

- **Component mode** — `<Preview registry="..." component="Button">Click me</Preview>` — renders a single component. Children must be plain text. Custom props are passed via the `props={{ ... }}` attribute and serialized to the iframe URL.
- **Demo mode** — `<Preview registry="..." demo="<slug>" />` — loads a pre-built page at `apps/website/src/app/preview/<registry-name>/demos/<slug>/page.tsx` for nested JSX, icons, multi-component layouts, etc.

The dynamic preview page (`apps/website/src/app/preview/<registry-name>/[component]/page.tsx`) looks up the component in the registry's `mdxComponents` export by key `<RegistryPrefix><ComponentName>`. That lookup map MUST stay populated even though MDX content no longer references those tags directly.

## Workflow

1. Discover the component and current docs pattern.
   - Read the component file under `packages/registries/<registry-name>/src/components/ui/<component>.tsx`.
   - Read `packages/registries/<registry-name>/src/mdx.ts`.
   - Read examples under `apps/website/content/docs/<registry-name>/`, especially `button.mdx`, `input.mdx`, and their `.ko.mdx` versions when present.
   - Read `apps/website/content/docs/<registry-name>/meta.json`.

2. Ensure the component is registered in the registry's MDX lookup map.
   - In `packages/registries/<registry-name>/src/mdx.ts`, add the component to `mdxComponents` if missing.
   - Follow the existing tag-key naming convention:
     - `t-flavored` -> `TFlavored<ComponentName>`
     - `seed` -> `Seed<ComponentName>`
     - `montage` -> `Montage<ComponentName>`
   - Import the component from `./components/ui/<component>`.
   - This map is the lookup table used by `apps/website/src/app/preview/<registry-name>/[component]/page.tsx` — do not delete entries even though MDX no longer references these tag names directly.

3. Create or update docs pages.
   - Add `apps/website/content/docs/<registry-name>/<component-kebab>.mdx`.
   - Add `apps/website/content/docs/<registry-name>/<component-kebab>.ko.mdx` when the registry already has Korean pages.
   - Match existing frontmatter:
     - `title: <ComponentName>`
     - `description: <ComponentName> Component` for English.
     - `description: <ComponentName> 컴포넌트` for Korean.
   - Embed the live preview using the `<Preview>` component (see the page-shape templates below). Use the registry's existing `button.mdx` / `input.mdx` as the canonical reference.
   - Use the component's real props only after checking the component source. Prefer a minimal valid example over invented API.
   - For nested-element previews (icons, multiple components, composed layouts), create a demo file under `apps/website/src/app/preview/<registry-name>/demos/<slug>/page.tsx` and reference it with `<Preview registry="..." demo="<slug>" />`.

4. Update sidebar metadata.
   - Add `<component-kebab>` to `apps/website/content/docs/<registry-name>/meta.json` `pages`.
   - Preserve the existing order. Usually append new component pages after current component slugs.
   - If a localized meta file exists for that registry, update it too.

5. Validate minimally.
   - Read lints/diagnostics for touched TS/TSX/MDX files when available.
   - If no validation was run, say so clearly.

## MDX Page Shape

Use this as a starting point and adapt labels to match nearby pages. Note the `<Preview>` component is registered globally in `apps/website/src/components/mdx.tsx`, so no import is needed.

### Component with text children (e.g. Button)

English:

```mdx
---
title: ComponentName
description: ComponentName Component
---

## ComponentName (Isolated Iframe Preview)

<Preview registry="<registry-name>" component="ComponentName">Click me</Preview>

<Preview
  registry="<registry-name>"
  component="ComponentName"
  props={{ variant: "destructive", size: "lg" }}
>
  Delete Me
</Preview>
```

Korean:

```mdx
---
title: ComponentName
description: ComponentName 컴포넌트
---

## ComponentName (격리 iframe 미리보기)

<Preview registry="<registry-name>" component="ComponentName">클릭</Preview>

<Preview
  registry="<registry-name>"
  component="ComponentName"
  props={{ variant: "destructive", size: "lg" }}
>
  삭제
</Preview>
```

### Self-closing component (e.g. Input)

```mdx
---
title: ComponentName
description: ComponentName Component
---

## ComponentName (Isolated Iframe Preview)

<Preview registry="<registry-name>" component="ComponentName" />

<Preview
  registry="<registry-name>"
  component="ComponentName"
  props={{ placeholder: "Type something..." }}
/>
```

### Composed preview using a demo file

When a preview needs nested JSX (icons inside buttons, multiple components, layout wrappers), do not try to express it inline — create a demo file:

1. Create `apps/website/src/app/preview/<registry-name>/demos/<slug>/page.tsx` with a default-exported React component that imports from `@repo/<registry-name>/ui/<component>` and composes whatever is needed.
2. Reference it from MDX:

```mdx
<Preview registry="<registry-name>" demo="<slug>" height={160} />
```

Demo files inherit the registry's isolated theme via `apps/website/src/app/preview/<registry-name>/layout.tsx`, so any registry component imported inside them renders with the correct tokens.

## Authoring Constraints — `<Preview>` API

- `component` and `demo` are mutually exclusive. TypeScript enforces this in `apps/website/src/components/preview.tsx`.
- In component mode, `children` must flatten to plain text. Anything richer must move into a demo file.
- `props` is serialized to JSON in the URL — values must be JSON-safe (no functions, no React elements). Push richer scenarios into demo files.
- Default iframe height is 200px; pass `height={N}` for taller previews.
- Do NOT reference registry-prefixed tag names (e.g. `<SeedButton>`) directly in MDX content. Those names exist only as lookup keys in the registry's `mdxComponents` export, used by the dynamic preview page to resolve `<Preview component="..." />`. MDX content always goes through `<Preview>`.

## Response Format

- State which registry/component docs were added or updated.
- Mention MDX lookup-map wiring if `src/mdx.ts` changed.
- Mention any new demo files added under `apps/website/src/app/preview/<registry-name>/demos/`.
- Mention sidebar/meta updates.
- Note whether validation was run.
- Notify the user at the end of all work, which command they need to run, if any. (etc. pnpm install)
