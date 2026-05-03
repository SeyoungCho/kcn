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
