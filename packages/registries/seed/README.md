# Seed Registry

This registry adapts Seed Design tokens into Tailwind CSS v4 theme variables. Import one of the styles entry points listed below, then write normal Tailwind utilities — color, typography, spacing, radius, elevation, motion, and gradient utilities are all generated from Seed tokens.

## Choosing a Styles Entry Point

The package exports two CSS files. Pick the one that matches how you intend to render Seed:

```jsonc
// packages/registries/seed/package.json — exports
{
  "./styles/global.css": "...",
  "./styles/theme.css": "..."
}
```

### 1. Full-app — `global.css`

The standard import. Sets all token CSS variables on `:root` (and dark variants on `.dark`).

```css
@import "@repo/seed/styles/global.css";
```

This is also what the kcn docs site loads inside its **isolated preview iframe** at `/preview/seed/...`, where Seed renders without any other registry's tokens in scope. If you need to render multiple registries in the same project, follow that iframe pattern — see `apps/website/src/app/preview/seed/` for a reference implementation.

### 2. Tokens only — `theme.css`

The `@theme inline` mappings without the underlying CSS variable definitions. Imported transitively by `global.css`; you usually don't import this directly unless you're authoring an alternate global stylesheet.

```css
@import "@repo/seed/styles/theme.css";
```

Dark mode follows the existing `.dark` convention across both entry points.

## Color

Seed palette colors are available as Tailwind color utilities:

```tsx
<div className="bg-carrot-600 text-gray-1000 border-gray-300" />
<div className="bg-red-500 text-blue-700" />
```

Semantic colors preserve Seed's property prefixes:

```tsx
<button className="bg-bg-brand-solid text-fg-neutral-inverted">
  Continue
</button>

<div className="bg-bg-critical-weak text-fg-critical border border-stroke-critical-weak" />
<div className="bg-layer-floating text-fg-neutral shadow-s2" />
```

The double `bg-bg-*` is intentional: the first `bg-` is Tailwind's background utility, and the second `bg` is Seed's semantic token property.

Useful semantic groups:

- Foreground: `text-fg-brand`, `text-fg-neutral-muted`, `text-fg-critical`, `text-fg-positive`, `text-fg-warning`, `text-fg-informative`
- Background: `bg-bg-brand-solid`, `bg-bg-neutral-weak`, `bg-bg-critical-weak`, `bg-bg-overlay`, `bg-layer-default`, `bg-layer-floating`
- Stroke: `border-stroke-neutral-weak`, `border-stroke-brand-solid`, `outline-stroke-focus-ring`

## Typography

Seed's `t1` through `t10` scale is mapped from smallest to largest:

```tsx
<p className="text-xxs">Seed t1</p>
<p className="text-base">Seed t4</p>
<p className="text-lg">Seed t5</p>
<h1 className="text-5xl font-bold">Seed t10</h1>
```

Static size tokens are also available:

```tsx
<p className="text-sm-static">Fixed 13px text</p>
```

Semantic text styles:

```tsx
<h1 className="text-screen-title">Screen title</h1>
<article className="text-article-body">Article body</article>
<p className="text-article-note">Article note</p>
```

Font weights use normal Tailwind names:

```tsx
<span className="font-regular" />
<span className="font-medium" />
<span className="font-bold" />
```

## Spacing

Seed dimensions are mapped into Tailwind's spacing namespace, so they work with `p-*`, `m-*`, `gap-*`, `space-*`, `size-*`, `w-*`, and `h-*`.

```tsx
<div className="p-md gap-between-chips">
  <div className="px-global-gutter pb-screen-bottom" />
</div>
```

Common scale:

```text
xxs = 2px
xs  = 4px
sm  = 6px
md  = 8px
lg  = 10px
xl  = 12px
2xl = 14px
3xl = 16px
5xl = 20px
6xl = 24px
16xl = 64px
```

Semantic spacing tokens include `between-chips`, `global-gutter`, `component-default`, `nav-to-title`, `screen-bottom`, and `between-text`.

## Radius

Seed radius tokens start at `rounded-xxs`:

```tsx
<div className="rounded-xxs" />
<div className="rounded-md" />
<div className="rounded-5xl" />
<div className="rounded-full" />
```

Scale:

```text
xxs = 2px
xs  = 4px
sm  = 6px
md  = 8px
lg  = 10px
xl  = 12px
2xl = 14px
3xl = 16px
4xl = 20px
5xl = 24px
full = 9999px
```

## Elevation

Layer colors and shadows are mapped to Tailwind namespaces:

```tsx
<section className="bg-layer-basement" />
<div className="bg-layer-floating shadow-s2" />
<div className="shadow-s1" />
<div className="shadow-s3" />
```

## Motion

Motion tokens are mapped to Tailwind's duration and easing namespaces:

```tsx
<div className="transition duration-d3 ease-easing" />
<div className="transition duration-d6 ease-enter-expressive" />
<button className="transition-colors duration-color-transition ease-easing" />
```

The default transition duration is Seed `d3` (`150ms`), and the default transition timing function is Seed `easing`.

## Gradients

Use the provided background-image utilities:

```tsx
<div className="bg-gradient-glow-magic" />
<div className="bg-gradient-highlight-magic" />
<div className="bg-gradient-shimmer-neutral" />
<div className="bg-gradient-fade-layer-floating" />
```

The raw `--gradient-*-stops` variables remain available if a component needs a custom direction.
