# kcn

A Turborepo monorepo that publishes and documents multiple [shadcn/ui-style component registries](https://ui.shadcn.com/docs/registry), each with its own design tokens, color system, components, themes, and utility functions, alongside a Fumadocs-powered documentation site that showcases them side-by-side.

## Repository Overview

```text
/ (Root)
├── apps/
│   └── website/              # Next.js documentation site (Fumadocs)
└── packages/
    ├── eslint-config/        # Shared ESLint configuration
    ├── typescript-config/    # Shared TypeScript configuration
    └── registries/
        ├── seed/             # Seed Design registry
        ├── montage/          # Montage registry
        └── t-flavored/       # T-flavored registry
```

The deeper architectural conventions, component-preview pipeline, and per-registry skill workflows live in [`AGENTS.md`](./AGENTS.md). Read that first if you're adding registries or docs pages.

## Tech Stack

**Monorepo & tooling**

- [pnpm](https://pnpm.io/) workspaces — version pinned in `.mise.toml`
- [Turborepo](https://turbo.build/) — task orchestration
- [mise](https://mise.jdx.dev/) — runtime version manager (Node + pnpm)
- Node **22+**
- TypeScript **5.9+**

**Documentation site** (`apps/website`)

- [Next.js](https://nextjs.org/) **16**
- [React](https://react.dev/) **19**
- [Fumadocs](https://fumadocs.dev/docs) (core, UI, MDX pipeline)
- [Tailwind CSS](https://tailwindcss.com/) **4**
- MDX, [@base-ui/react](https://base-ui.com/)

**Registry packages** (`packages/registries/*`)

- React **19**, @base-ui/react, Tailwind CSS **4**
- [class-variance-authority](https://cva.style/), `clsx`, `tailwind-merge`
- Scoped/theme CSS per registry — workspace-imported by the docs app

## Getting Started

This repo uses [mise](https://mise.jdx.dev/) to pin the Node and pnpm versions for the project. After cloning:

```sh
# 1. Install mise (https://mise.jdx.dev/getting-started.html), then:
mise install            # downloads the Node / pnpm versions in .mise.toml

# 2. Install dependencies
pnpm install

# 3. Run the docs site
pnpm dev                # turbo run dev — runs every dev task in parallel
# or, scope to the docs app:
pnpm dev --filter=kcn-website
```

The docs site listens on http://localhost:3000.

## Common Tasks

```sh
pnpm build              # turbo run build  — builds every package/app
pnpm lint               # turbo run lint
pnpm format             # prettier across **/*.{ts,tsx,md}
pnpm check-types        # turbo run check-types
pnpm registries:add <package-name> <options>
# adds a dependency to every package under packages/registries/*
```

Use Turborepo filters to scope to a single workspace:

```sh
pnpm --filter @repo/seed check-types
pnpm --filter kcn-website dev
```

## Documenting a Registry Component

Component previews in the docs site render inside **isolated iframes** under `/preview/<registry>/...` so each registry's theme tokens cannot collide with the docs site or with the other registries. Docs writers embed previews with the `<Preview>` MDX component:

```mdx
{/* Simple component with text label and props */}

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

{/* Composed preview with nested elements / icons via a demo file */}

<Preview registry="seed" demo="button-with-icon" />
```

Each preview also has a Code tab. Simple component previews generate copyable usage code from the `<Preview>` props, while composed demo previews load the matching demo file and show reader-facing imports like `@/components/ui/button`.

For the full architecture (route structure, demo files, registry wiring), see [`AGENTS.md`](./AGENTS.md). For step-by-step workflows, see the agent skills under [`.agents/skills/`](./.agents/skills/).

## Adding a Shared Dependency

1. **Registry** (devDep + catalog):

   ```sh
   pnpm --filter @repo/<registry-name> add -D <package>@<version> --save-catalog
   # or let the version resolve and still record in catalog:
   pnpm --filter @repo/<registry-name> add -D <package> --save-catalog
   ```

2. **Website** (runtime, catalog specifier):

   ```sh
   pnpm --filter kcn-website add <package>@catalog:
   ```

## Useful Links

- [Turborepo Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Turborepo Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Fumadocs](https://fumadocs.dev)
- [Tailwind CSS v4 — `@theme` directive](https://tailwindcss.com/docs/v4-beta#theme-customization)
- [shadcn/ui registry model](https://ui.shadcn.com/docs/registry)
