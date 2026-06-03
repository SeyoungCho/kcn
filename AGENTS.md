# AGENTS.md (ROOT)

This file provides guidance to Claude Code (claude.ai/code) or any other relevant coding agents when working with code in this repository.

## General Rules

### always use absolute path for imports

### format after your work is done

```zsh
pnpm format
```

## Repository Overview

This repository is a monorepo created with Turborepo framework.
This repository is divided into two primary sections:

- **Documentation Website**: A Next.js application powered by Fumadocs.
- **Packages**: Individual package modules. The main ones are custom shadcn/ui registries under `packages/registries/`, while `eslint-config` and `typescript-config` hold shared tooling (rarely touched).

### Core folder structures

```text
/ (Root)
├── AGENTS.md                 # Agent guidance for this repo (this file)
├── apps/
│   └── website/              # Next.js documentation site (Fumadocs)
├── packages/
│   ├── eslint-config/        # Shared ESLint configuration
│   ├── typescript-config/    # Shared TypeScript configuration
│   └── registries/           # shadcn/ui registry packages (published/workspace)
│       ├── t-flavored/
│       ├── seed/
│       ├── montage/
│       └── [...other-registry]/
└── turbo.json                # Turborepo pipeline config
```

## Project Goals

The primary objective of this project is to publish and manage multiple shadcn/ui registries, each featuring its own unique design tokens, color systems, components, themes, and utility functions.

### Core Structure

- **Registries**: Located independently under /packages/registries/[registry-name]. Each registry is a self-contained unit with its own UI logic and configuration.
- **Documentation Site**: Located in /apps/website. This site serves as the official platform for introducing each registry, providing installation guides, usage instructions, and interactive component previews.

### Core Tech Stack

**Monorepo & tooling**:

- [pnpm](https://pnpm.io/) workspaces @10.33.1
- [Turborepo](https://turbo.build/)
- Node **22+** (pinned in `mise.toml` and `package.json` `engines`; run shell commands as `mise exec -- <command>` so agents use the project version)
- TypeScript **5.9+**

**Documentation site** (`apps/website`):

- [Next.js](https://nextjs.org/) **16**
- [React](https://react.dev/) **19**
- [Fumadocs](https://fumadocs.dev/docs) (core, UI, MDX pipeline),
- [Tailwind CSS](https://tailwindcss.com/) **4**
- MDX
- [@base-ui/react](https://base-ui.com/)

**Registry packages** (`packages/registries/*`):

- React **19**
- @base-ui/react
- Tailwind CSS **4**
- [class-variance-authority](https://cva.style/), `clsx`, `tailwind-merge`, scoped/theme CSS for each registry—workspace packages imported by the docs app.

## More on registries

Each registry is a workspace package under `packages/registries/<name>`, structured for the [shadcn/ui registry](https://ui.shadcn.com/docs/registry) model (CLI, snippets, deployment). Treating it as a package here is for **monorepo layout and tooling**, not because end users install the registry as a normal npm library.

**Why registry deps are `devDependencies`**: those packages are for authoring and type-checking locally; the registry artifact is not published like an app dependency tree. **`kcn-website`** mirrors anything needed at runtime for docs previews under **`dependencies`**, typically pinned via the workspace **pnpm catalog** so versions stay in sync.

## Docs Component Previews — Iframe-Isolated `<Preview>`

Different registries can ship overlapping or differently-named theme tokens (e.g. seed uses `--color-primary`, another might use `--color-brand`). Tailwind v4's `@theme` directive merges all definitions globally, so rendering multiple registries in the same document would cause token collisions or visual leakage.

**Solution**: every component preview in the docs site is rendered inside an iframe that loads ONLY that registry's CSS bundle. Each iframe is a separate document, so token namespaces cannot leak between registries.

### Architecture

```
apps/website/src/app/preview/<registry-name>/
├── preview.css              # imports @repo/<registry-name>/styles/global.css + @source
├── layout.tsx               # minimal root <html>/<body>; no Fumadocs provider, no docs theme
├── [component]/page.tsx     # dynamic preview; uses renderPreview() with the registry prefix
└── demos/<slug>/page.tsx    # OPTIONAL — pre-built compositions for nested-element previews
```

Supporting pieces:

- `apps/website/src/components/preview.tsx` — the `<Preview>` MDX component. Builds the iframe URL on the client (post-mount) to avoid SSR/hydration mismatches caused by MDX children differing between server and client, and renders the Preview/Code tabs.
- `apps/website/src/hooks/preview/use-preview-src.ts` — builds the iframe URL for component or demo mode, and forwards the active docs language (from the parent `[lang]/docs` route, read via `useParams`) as a `lang` search param so the isolated iframe can localize.
- `apps/website/src/components/preview/preview-dictionary-provider.tsx` — client `PreviewDictionaryProvider` (reads the forwarded `?lang=` via `useSearchParams`, resolves the dictionary) + `usePreviewDictionary()` hook. Mounted in each registry preview `layout.tsx` (inside a `<Suspense>`), so demo client components can localize their labels.
- `apps/website/src/dictionaries/client.ts` — client-safe `getClientDictionary(lang)` used by the provider (the server-only `getDictionary` can't be imported into client components).
- `apps/website/src/hooks/preview/use-preview-code.ts` — builds the Code tab snippet for component mode and fetches demo file source for demo mode, forwarding the active `lang` so the demo source is resolved to that language.
- `apps/website/src/app/api/preview-code/route.ts` — reads demo preview files for the Code tab, rewrites `@repo/<registry>/ui/*` → `@/components/ui/*`, AND inlines i18n for copy-paste: it strips the `usePreviewDictionary` import + `const t = …` line and resolves every `t.<path>` reference to the literal value from the requested language's dictionary (longest-existing-prefix, so `t.variants[variant]` → `{…}[variant]`).
- `apps/website/src/lib/preview.tsx` — shared `renderPreview()` helper used by every per-registry `[component]/page.tsx`.
- `apps/website/src/components/mdx.tsx` — registers `<Preview>` globally so MDX files don't need to import it.
- `apps/website/src/types/preview.ts` — shared list/type guard for registries accepted by `<Preview>` and the preview-code API.
- `apps/website/src/utils/preview/index.ts` — shared preview helpers such as MDX/React children flattening.
- `apps/website/src/proxy.ts` — i18n middleware excludes `/preview`, so preview routes have no `[lang]` segment. The active language is instead forwarded by `<Preview>` as a `?lang=` search param (see `use-preview-src.ts` / `preview-dictionary-provider.tsx`).
- `apps/website/src/dictionaries/{en,ko}.json` — the `demos` section holds the static labels rendered inside demo previews (fruit names, placeholders, variant/state labels). The `Dictionary` type is derived from `en.json`, so both locales must stay in sync.
- `apps/website/loaders/registry-preview-imports.cjs` — preview-only transform that rewrites consumer-facing imports from registry source files (such as `@/components/ui/textarea`) to the matching workspace registry package (such as `@repo/seed/ui/textarea`) while bundling the docs app.
- `apps/website/src/types/registry-preview-aliases.d.ts` — registry-neutral type declarations for consumer-facing component aliases referenced by registry source files. These declarations are type-checking shims only; runtime resolution is handled by the preview import transform.
- `apps/website/next.config.mjs` — every registry must be in `transpilePackages`; its Turbopack and webpack rules apply the preview-only registry import transform.

Registry component source files are also the consumer-facing shadcn snippets. Keep imports such as `@/components/ui/textarea` in that source. Do not add registry implementations under `apps/website/src/components/ui/` to make previews compile: that would make previews from different registries resolve to the same docs-site component. When a registry source file introduces a new `@/components/ui/*` import, add a registry-neutral declaration to `apps/website/src/types/registry-preview-aliases.d.ts` if the website type check needs one.

### MDX Authoring API

```mdx
{/* Component mode — single component with text children + JSON-safe props */}

<Preview registry="seed" component="Button">
  Click me
</Preview>

<Preview
  registry="seed"
  component="Button"
  props={{ variant: "destructive", size: "lg" }}
>
  Delete Me
</Preview>

<Preview registry="seed" component="Input" props={{ placeholder: "Type..." }} />

{/* Demo mode — pre-built page for nested elements / composition */}

<Preview registry="seed" demo="button-with-icon" height={160} />
```

**Constraints (TypeScript-enforced):**

- `component` and `demo` are mutually exclusive.
- In component mode, `children` must flatten to plain text.
- `props` is JSON-serialized into the URL — values must be JSON-safe (no functions, no React elements). Use a demo file for richer scenarios.
- Default iframe height is 200px; pass `height={N}` for taller previews.

**Code tab behavior:**

- Component mode generates a copyable usage snippet from the `component`, `props`, and plain-text `children` passed to `<Preview>`. The snippet uses user-facing imports like `@/components/ui/button`.
- Demo mode loads the matching `apps/website/src/app/preview/<registry-name>/demos/<slug>/page.tsx` source through `/api/preview-code`. Demo files should still import registry components from `@repo/<registry-name>/ui/<component>` so they render inside the isolated iframe, but the Code tab rewrites those imports to `@/components/ui/<component>` for readers.

### Adding a New Registry

When integrating a new registry into the docs site, beyond the standard MDX/CSS wiring, you must:

1. Export `./styles/global.css` and `./styles/theme.css` from the registry's `package.json`.
2. Add the registry to `transpilePackages` in `apps/website/next.config.mjs`.
3. Add the registry slug to `PREVIEW_REGISTRIES` in `apps/website/src/types/preview.ts`.
4. Create the per-registry preview route tree under `apps/website/src/app/preview/<registry-name>/` (mirror the `seed/` shape).
5. Use a registry-prefix string like `"Seed"`, `"Montage"`, `"TFlavored"` when calling `renderPreview()`. The prefix is concatenated with the URL `[component]` segment to look up the actual component in the registry's `mdxComponents` map.

The registry's `mdxComponents` export (e.g. `{ SeedButton: Button, SeedInput: Input }`) is the **runtime lookup table** for the dynamic preview page. Keep it populated for every component you want to be embeddable via `<Preview>`, even though MDX content no longer references those tag names directly.

### Adding a Composed Demo

For previews that need nested JSX (icons inside buttons, multiple components, layout wrappers):

1. Create `apps/website/src/app/preview/<registry-name>/demos/<slug>/page.tsx` with a default-exported React component.
2. Inside, import from `@repo/<registry-name>/ui/<component>` and compose freely.
3. Reference it from MDX as `<Preview registry="<registry-name>" demo="<slug>" />`.

Demo files automatically inherit the registry's isolated theme via the parent `layout.tsx`.

**i18n in demos.** Demo previews follow the parent docs language automatically (`<Preview>` forwards it as `?lang=`, and each registry preview `layout.tsx` mounts `PreviewDictionaryProvider`). Localize a demo's static labels instead of hardcoding them:

1. Add the strings to the `demos` section of `apps/website/src/dictionaries/{en,ko}.json` (keep both locales in sync; the `Dictionary` type is derived from `en.json`).
2. Make the demo a `"use client"` component that reads the dictionary via the hook, then use `t.*` for every user-facing label:

   ```tsx
   "use client";
   
   import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";
   
   export default function Demo() {
     const t = usePreviewDictionary().demos.<component>;
     return /* ...use t.* for labels... */;
   }
   ```

   This keeps each demo a single file, so function-children demos (e.g. `select/select-format-function`) stay inline with no server/client split.

**Code tab stays copy-paste clean.** Do NOT worry that `usePreviewDictionary`/`t.*` will leak into the Code tab. `/api/preview-code` strips the hook import + `const t = …` line and resolves every `t.<path>` to the literal dictionary value for the active language (so `<SelectItem>{t.fruits.apple}</SelectItem>` shows `{"Apple"}`, and `t.variants[variant]` shows `{…}[variant]`). Always reference labels through the single `const t = usePreviewDictionary().demos.<section>;` binding named `t` so the transform can resolve them.

Locale-neutral tokens (units, URLs like `https://`, currency codes, size codes such as `md`/`lg`) can stay literal.

### Adding a shared dependency

1. Registry (dev + catalog):

```zsh
pnpm --filter @repo/<registry-name> add -D <package>@<version> --save-catalog
# or let the version resolve and still record in catalog:
pnpm --filter @repo/<registry-name> add -D <package> --save-catalog
```

For a dev dependency needed by every registry package:

```zsh
pnpm registries:add -D <package> --save-catalog
```

2. Website (runtime, catalog specifier):

```zsh
pnpm --filter kcn-website add <package>@catalog:
```
