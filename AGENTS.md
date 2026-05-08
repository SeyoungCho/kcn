# AGENTS.md (ROOT)

This file provides guidance to Claude Code (claude.ai/code) or any other relevant coding agents when working with code in this repository.

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
- Node **22+**
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

- `apps/website/src/components/preview.tsx` — the `<Preview>` MDX component. Builds the iframe URL on the client (post-mount) to avoid SSR/hydration mismatches caused by MDX children differing between server and client.
- `apps/website/src/lib/preview.tsx` — shared `renderPreview()` helper used by every per-registry `[component]/page.tsx`.
- `apps/website/src/components/mdx.tsx` — registers `<Preview>` globally so MDX files don't need to import it.
- `apps/website/src/proxy.ts` — i18n middleware excludes `/preview` so the iframe URL stays language-agnostic.
- `apps/website/next.config.mjs` — every registry must be in `transpilePackages`.

### MDX Authoring API

```mdx
{/* Component mode — single component with text children + JSON-safe props */}
<Preview registry="seed" component="Button">Click me</Preview>

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

### Adding a New Registry

When integrating a new registry into the docs site, beyond the standard MDX/CSS wiring, you must:

1. Export `./styles/global.css` and `./styles/theme.css` from the registry's `package.json`.
2. Add the registry to `transpilePackages` in `apps/website/next.config.mjs`.
3. Create the per-registry preview route tree under `apps/website/src/app/preview/<registry-name>/` (mirror the `seed/` shape).
4. Use a registry-prefix string like `"Seed"`, `"Montage"`, `"TFlavored"` when calling `renderPreview()`. The prefix is concatenated with the URL `[component]` segment to look up the actual component in the registry's `mdxComponents` map.

The registry's `mdxComponents` export (e.g. `{ SeedButton: Button, SeedInput: Input }`) is the **runtime lookup table** for the dynamic preview page. Keep it populated for every component you want to be embeddable via `<Preview>`, even though MDX content no longer references those tag names directly.

### Adding a Composed Demo

For previews that need nested JSX (icons inside buttons, multiple components, layout wrappers):

1. Create `apps/website/src/app/preview/<registry-name>/demos/<slug>/page.tsx` with a default-exported React component.
2. Inside, import from `@repo/<registry-name>/ui/<component>` and compose freely.
3. Reference it from MDX as `<Preview registry="<registry-name>" demo="<slug>" />`.

Demo files automatically inherit the registry's isolated theme via the parent `layout.tsx`.

### Adding a shared dependency

1. Registry (dev + catalog):

```zsh
pnpm --filter @repo/<registry-name> add -D <package>@<version> --save-catalog
# or let the version resolve and still record in catalog:
pnpm --filter @repo/<registry-name> add -D <package> --save-catalog
```

2. Website (runtime, catalog specifier):

```zsh
pnpm --filter kcn-website add <package>@catalog:
```
