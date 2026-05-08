# kcn-website

The Fumadocs-powered documentation site for the kcn monorepo. It showcases each registry under `packages/registries/*` with localized MDX content and isolated iframe previews so registries' design tokens never collide.

## Run

```sh
pnpm dev
# or, from the repo root:
pnpm dev --filter=kcn-website
```

Open http://localhost:3000.

## Architecture at a Glance

The site has two distinct rendering surfaces:

1. **Docs pages** (`/[lang]/docs/...`) — Fumadocs MDX content with i18n. Lives in `content/docs/<registry-name>/`.
2. **Preview iframes** (`/preview/<registry-name>/...`) — sibling routes whose **only purpose** is to host a single registry's component inside an isolated CSS environment. Each preview route has its own root layout, its own `preview.css` (importing only that registry's `global.css`), and its own dynamic `[component]` page.

Docs MDX never renders registry components inline. It always embeds them via the `<Preview>` MDX component, which builds an iframe URL pointing at the appropriate preview route.

```
src/app/
├── [lang]/                       # docs pages (i18n)
│   ├── (home)/
│   ├── docs/
│   ├── og/
│   └── layout.tsx                # imports app/global.css; Fumadocs <RootProvider>
├── preview/                      # isolated iframe routes (no i18n, no Fumadocs)
│   ├── seed/
│   │   ├── preview.css           # imports @repo/seed/styles/global.css
│   │   ├── layout.tsx            # minimal <html>/<body> root layout
│   │   ├── [component]/page.tsx  # dynamic single-component preview
│   │   └── demos/<slug>/page.tsx # composed previews (icons, multiple components)
│   ├── montage/                  # same shape
│   └── t-flavored/               # same shape
├── api/
└── global.css                    # docs theme + Tailwind sources
```

## Key Files

| File                                    | Purpose                                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------------------------- |
| `src/lib/source.ts`                     | Fumadocs content source adapter ([`loader()`](https://fumadocs.dev/docs/headless/source-api)) |
| `src/components/layout.shared.tsx`      | Shared layout options                                                                         |
| `src/components/mdx.tsx`                | Registers MDX components, including `<Preview>`                                               |
| `src/components/preview.tsx`            | The `<Preview>` MDX component (client; deferred src to avoid hydration mismatch)              |
| `src/lib/preview.tsx`                   | Server-side `renderPreview()` helper used by every per-registry `[component]/page.tsx`        |
| `src/proxy.ts`                          | i18n middleware — excludes `/preview` so iframes stay language-agnostic                       |
| `app/global.css`                        | Docs-page Tailwind entry; theme tokens for the docs site itself (no registry imports — registries render in iframes) |
| `app/preview/<registry>/preview.css`    | Per-registry Tailwind entry; imports that registry's `global.css` only                        |
| `next.config.mjs`                       | `transpilePackages` lists every registry; Fumadocs MDX wrapper                                |

## `<Preview>` MDX Component

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

{/* Self-closing components */}
<Preview registry="seed" component="Input" props={{ placeholder: "Type..." }} />

{/* Demo mode — pre-built page for nested elements / composition */}
<Preview registry="seed" demo="button-with-icon" height={160} />
```

**TypeScript-enforced constraints:**

- `component` and `demo` are mutually exclusive.
- In component mode, `children` must flatten to plain text.
- `props` is JSON-serialized into the URL — values must be JSON-safe (no functions, no React elements). Push richer scenarios into demo files.
- Default iframe height is 200px; pass `height={N}` for taller previews.

## Adding a Component Preview

1. Make sure the component is registered in the registry's MDX lookup map at `packages/registries/<registry-name>/src/mdx.ts`. Keys follow the `<RegistryPrefix><ComponentName>` convention (`SeedButton`, `MontageInput`, `TFlavoredButton`, ...). The dynamic preview page reads this map at runtime to resolve `<Preview component="Foo" />` → `<RegistryPrefix>Foo`.
2. Embed the live preview in your MDX page via `<Preview registry="..." component="..." />`.
3. For nested JSX (icons, multiple components, layout wrappers), create `src/app/preview/<registry-name>/demos/<slug>/page.tsx` and reference it with `<Preview registry="..." demo="<slug>" />`.

For step-by-step workflows, see [`add-registry-component-docs`](../../.agents/skills/add-registry-component-docs/SKILL.md) and [`wire-registry-to-fumadocs-docs`](../../.agents/skills/wire-registry-to-fumadocs-docs/SKILL.md).

## Why Iframes?

Tailwind v4's `@theme` directive merges all definitions globally. Different registries can ship overlapping or differently-named tokens (e.g. seed uses `--color-primary` while another might use `--color-brand`), so rendering multiple registries in the same document causes token collisions or visual leakage.

Each iframe is its own document. Loading only one registry's CSS bundle per iframe keeps the registries' theme namespaces from leaking into one another, and makes the docs site's own theme (Fumadocs + the docs `app/global.css`) fully separate from the registry being showcased.

## Fumadocs MDX

`source.config.ts` configures Fumadocs MDX (frontmatter schema, etc.). See the [Fumadocs MDX docs](https://fumadocs.dev/docs/mdx) for further details.

## Learn More

- [Next.js docs](https://nextjs.org/docs)
- [Fumadocs](https://fumadocs.dev)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Repo-level architecture: [`../../AGENTS.md`](../../AGENTS.md)
