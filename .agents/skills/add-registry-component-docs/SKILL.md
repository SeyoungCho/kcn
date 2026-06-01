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
- **Demo mode** — `<Preview registry="..." demo="<component-name>/<demo-name>" />` — loads a pre-built page at `apps/website/src/app/preview/<registry-name>/demos/<component-name>/<demo-name>/page.tsx` for nested JSX, icons, multi-component layouts, etc.

The dynamic preview page (`apps/website/src/app/preview/<registry-name>/[component]/page.tsx`) looks up the component in the registry's `mdxComponents` export by key `<RegistryPrefix><ComponentName>`. That lookup map MUST stay populated even though MDX content no longer references those tags directly.

The `<Preview>` component also renders a Code tab:

- Component mode generates the snippet from `component`, `props`, and plain-text `children`, with imports like `@/components/ui/button`.
- Demo mode loads the matching demo file source through `/api/preview-code`. Demo files should import from `@repo/<registry-name>/ui/<component>` so they render in the isolated iframe; the Code tab rewrites those imports to `@/components/ui/<component>` before showing the code.

Registry component source files remain consumer-facing shadcn snippets. Keep imports such as `@/components/ui/textarea` intact in those source files. During docs bundling, `apps/website/loaders/registry-preview-imports.cjs` rewrites consumer-facing component imports to the matching workspace registry package so previews remain registry-isolated. Do not add registry implementations under `apps/website/src/components/ui/` just to satisfy preview resolution. If the website type check needs a declaration for a new consumer-facing component alias, add a registry-neutral shim to `apps/website/src/types/registry-preview-aliases.d.ts`.

## Workflow

1. Discover the component and current docs pattern.
   - Read the component file under `packages/registries/<registry-name>/src/components/ui/<component>.tsx`.
   - Read `packages/registries/<registry-name>/src/mdx.ts`.
   - Read examples under `apps/website/content/docs/<registry-name>/`, especially `button.mdx`, `input.mdx`, and their `.ko.mdx` versions when present.
   - Read existing AutoTypeTable wrapper files under `apps/website/src/app/preview/<registry-name>/types/`, especially the matching component type file when present.
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
   - When one section contains multiple consecutive `<Preview>` components, wrap them in `<div className="space-y-4">...</div>` so the previews have consistent vertical spacing.
   - Use the component's real props only after checking the component source. Prefer a minimal valid example over invented API.
   - For nested-element previews (icons, multiple components, composed layouts), create a demo file under `apps/website/src/app/preview/<registry-name>/demos/<component-name>/<demo-name>/page.tsx` and reference it with `<Preview registry="..." demo="<component-name>/<demo-name>" />`.

4. Create or update AutoTypeTable API types.
   - Create `apps/website/src/app/preview/<registry-name>/types/<component-kebab>.ts` when the page needs an API Reference.
   - Do not point `<AutoTypeTable />` directly at the registry component source. Create MDX-facing wrapper types that describe the documented API shape.
   - Import the registry component's exported variant props and base props when available, for example:
     - `ButtonVariantProps` and `ButtonProps` from `@repo/seed/ui/button`.
   - Define a locale-neutral variant props type named `MDX<ComponentName>VariantProps`.
   - Define a Korean variant props type named `MDX<ComponentName>VariantPropsKO` when Korean docs exist.
   - Define the final English type as `MDX<ComponentName>Props`, usually as an intersection of the MDX variant props and the component's base props subset.
   - Define the final Korean type as `MDX<ComponentName>PropsKO`, using Korean JSDoc comments and the `KO` suffix.
   - If the component has no separate primitive/base props, the final MDX props type can just extend/intersect the MDX variant props plus any explicitly documented attributes/props.
   - Use JSDoc `@remarks` with backticks to control the collapsed Type column for unions, for example `@remarks \`"withText" | "iconOnly"\``.
   - Use `@default` for documented default values.
   - In MDX, `path` is relative to the website project directory (`apps/website` cwd), not relative to the MDX file. Use `path="src/app/preview/<registry-name>/types/<component-kebab>.ts"`.
   - In English MDX, pass `name="MDX<ComponentName>Props"`.
   - In Korean MDX, pass `name="MDX<ComponentName>PropsKO"`.

5. Update sidebar metadata.
   - Add `<component-kebab>` to `apps/website/content/docs/<registry-name>/meta.json` `pages`.
   - Preserve the existing order. Usually append new component pages after current component slugs.
   - If a localized meta file exists for that registry, update it too.

6. Validate minimally.
   - Read lints/diagnostics for touched TS/TSX/MDX files when available.
   - If no validation was run, say so clearly.

## MDX Page Shape

Use this as a starting point and adapt labels to match nearby pages. Note the `<Preview>` and `<AutoTypeTable>` components are registered globally in `apps/website/src/components/mdx.tsx`, so no imports are needed.

The top-level page order is fixed:

1. Frontmatter title and description.
2. One default component `<Preview>` immediately after frontmatter, with no heading.
3. `## Installation`.
4. `## Examples`.
5. Example subsections as `### <Example Name>` followed by a matching `<Preview />`.
6. `## API Reference`.
7. `<AutoTypeTable />` pointed at the MDX-facing type wrapper file.

The `## Examples` section is judgment-based. Add only examples that teach real usage or important states:

- Show variants when the component has meaningful visual or semantic variants. For Button, see `apps/website/content/docs/seed/button.mdx`: it includes a `### Variants` section because Button has many variants.
- Show important states when they affect usage or styling. For Button, the docs include `### Disabled` because disabled behavior is important and has dedicated styling.
- Show common compositions when users are likely to need them. For Button, the docs include `### With Icon`.
- Show sizing or layout examples when size/layout props change the component meaningfully. For Button, the docs include `### Sizes`.
- Keep examples focused; do not create decorative showcases that do not explain an API or real use case.

Use `apps/website/content/docs/seed/button.mdx` and `apps/website/content/docs/seed/button.ko.mdx` as the canonical examples for the current structure. They show:

- frontmatter with title/description,
- a default heading-less `<Preview>` immediately after frontmatter,
- `## Installation`,
- `## Examples` with h3 subsections,
- demo-mode previews using `demo="<component-name>/<demo-name>"`,
- component-mode previews for simple states,
- `## API Reference` with `<AutoTypeTable />`.

For components without text children, use the same page order but make the heading-less default preview self-closing when appropriate.

## AutoTypeTable Type Wrapper Shape

Use this shape for API Reference type files and adapt the imported prop names to the component.
Use `apps/website/src/app/preview/seed/types/button.ts` as the canonical example for the current wrapper naming, English/Korean JSDoc split, `@remarks` union display overrides, and final `MDX<ComponentName>Props` / `MDX<ComponentName>PropsKO` exports.
When documenting Base UI's `render` prop, always reuse the English and Korean descriptions from `apps/website/src/app/preview/seed/types/button.ts` exactly, adapting only the referenced component prop type and state type in `@remarks`.

````ts

import type {
  ComponentNameProps,
  ComponentNameVariantProps,
} from "@repo/<registry-name>/ui/<component-kebab>";

type MDXComponentNameVariantProps = {
  /**
   * English description.
   * @remarks `"valueA" | "valueB"`
   * @default "valueA"
   */
  variant?: ComponentNameVariantProps["variant"];
};

type MDXComponentNameVariantPropsKO = {
  /**
   * Korean description.
   * @remarks `"valueA" | "valueB"`
   * @default "valueA"
   */
  variant?: ComponentNameVariantProps["variant"];
};

export type MDXComponentNameProps = MDXComponentNameVariantProps & {
  /**
   * Base UI prop - [render](https://base-ui.com/react/handbook/composition#render-function)
   *
   * Allows you to replace the component's HTML element with a different tag, or compose it with another component.
   *
   * Accepts a ReactElement or a function that returns the element to render.
   * Similar to the ```asChild``` prop in Radix UI.
   * @remarks `ReactElement | ((props: HTMLProps, state: ComponentName.State) => ReactElement)`
   */
  render?: ComponentNameProps["render"];
};

export type MDXComponentNamePropsKO = MDXComponentNameVariantPropsKO & {
  /**
   * Base UI prop - [render](https://base-ui.com/react/handbook/composition#render-function)
   *
   * 컴포넌트의 HTML 요소를 다른 태그로 대체하거나 다른 컴포넌트와 함께 구성할 수 있습니다.
   *
   * ReactElement 또는 요소를 반환하는 함수를 받습니다. Radix UI의 ```asChild``` prop과 유사합니다.
   * @remarks `ReactElement | ((props: HTMLProps, state: ComponentName.State) => ReactElement)`
   */
  render?: ComponentNameProps["render"];
};
````

Only include base/primitive props that should appear in the public docs. If a component does not expose primitive props like `render`, omit them.

### Composed preview using a demo file

When a preview needs nested JSX (icons inside buttons, multiple components, layout wrappers), do not try to express it inline — create a demo file:

1. Create `apps/website/src/app/preview/<registry-name>/demos/<component-name>/<demo-name>/page.tsx` with a default-exported React component that imports from `@repo/<registry-name>/ui/<component>` and composes whatever is needed.
2. Reference it from MDX:

```mdx
<Preview
  registry="<registry-name>"
  demo="<component-name>/<demo-name>"
  height={160}
/>
```

Demo files inherit the registry's isolated theme via `apps/website/src/app/preview/<registry-name>/layout.tsx`, so any registry component imported inside them renders with the correct tokens.
The Code tab displays this same demo file with `@repo/<registry-name>/ui/*` imports rewritten to `@/components/ui/*`, so keep demo files focused on code a reader can understand.

## Authoring Constraints — `<Preview>` API

- `component` and `demo` are mutually exclusive. TypeScript enforces this in `apps/website/src/components/preview.tsx`.
- In component mode, `children` must flatten to plain text. Anything richer must move into a demo file.
- `props` is serialized to JSON in the URL — values must be JSON-safe (no functions, no React elements). Push richer scenarios into demo files.
- Default iframe height is 200px; pass `height={N}` for taller previews.
- The Code tab is automatic; do not add separate hardcoded code blocks for the same preview unless the page needs extra explanation.
- Do NOT reference registry-prefixed tag names (e.g. `<SeedButton>`) directly in MDX content. Those names exist only as lookup keys in the registry's `mdxComponents` export, used by the dynamic preview page to resolve `<Preview component="..." />`. MDX content always goes through `<Preview>`.

## Response Format

- State which registry/component docs were added or updated.
- Mention MDX lookup-map wiring if `src/mdx.ts` changed.
- Mention any new demo files added under `apps/website/src/app/preview/<registry-name>/demos/<component-name>/`.
- Mention any AutoTypeTable type wrapper files added or updated under `apps/website/src/app/preview/<registry-name>/types/`.
- Mention sidebar/meta updates.
- Note whether validation was run.
- Notify the user at the end of all work, which command they need to run, if any. (etc. pnpm install)
