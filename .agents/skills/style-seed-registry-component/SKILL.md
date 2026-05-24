---
name: style-seed-registry-component
description: given a seed design system's raw component's css file and a js file containing the component's variant map, define relevant variants and style an existing seed registry component (probably just a basic shadcn component that's directly copy-pasted from plain shadcn registry), with Tailwind CSS v4 and cva variants.
disable-model-invocation: true
---

**Important Note**

- If any of the following is true, ask the user for additional resources or ask questions before proceeding.
  - [ ] You are NOT given a css file defining the component's style from the user.
  - [ ] You are NOT given a js file that contains variant map from the user.
  - [ ] The user is asking for styling a component that doesn't exist in seed registry's directory.
  - [ ] The user is asking to style a component that is NOT a seed registry component, but this skill was invoked(ex. user prompts: 'style me a montage registry's input component')

- Even if the registry component itself already has variants and Tailwind classes, start from scratch and reset the existing stuff if the component looks like just-copy-pasted from plain shadcn component registry.
- Always inspect `packages/registries/seed/src/styles/theme.css` and `packages/registries/seed/src/styles/global.css` while converting the original css file. The original css variables are interpreted through `theme.css`, and the Tailwind class names come from the `@theme inline` aliases and custom utilities/variants in `global.css`.

### Step-By-Step Guide

> Example: Assume that the user asked you to style seed registry's button component, with seed design system's original button css file and variant map js file.

1. Look at the given variant map js file and determine which variants we need to define.

```mjs
const defaultVariant = {
  variant: "brandSolid",
  size: "medium",
  layout: "withText",
};

const compoundVariants = [
  {
    size: "xsmall",
    layout: "withText",
  },
  {
    size: "xsmall",
    layout: "iconOnly",
  },
  {
    size: "small",
    layout: "withText",
  },
  {
    size: "small",
    layout: "iconOnly",
  },
  {
    size: "medium",
    layout: "withText",
  },
  {
    size: "medium",
    layout: "iconOnly",
  },
  {
    size: "large",
    layout: "withText",
  },
  {
    size: "large",
    layout: "iconOnly",
  },
];

export const actionButtonVariantMap = {
  variant: [
    "brandSolid",
    "neutralSolid",
    "neutralWeak",
    "criticalSolid",
    "brandOutline",
    "neutralOutline",
    "ghost",
  ],
  size: ["xsmall", "small", "medium", "large"],
  layout: ["withText", "iconOnly"],
};
```

Seed registry's button component's variants structure should look like:

```tsx
// packages/registries/seed/src/components/ui/button.tsx
const buttonVariant = cva("...", {
  variants: {
    variant: {
      brandSolid: "...",
      neutralSolid: "...",
      neutralWeak: "...",
      criticalSolid: "...",
      brandOutline: "...",
      neutralOutline: "...",
      ghost: "...",
    },
    size: {
      xs: "...", // although the original variant map says 'xsmall', 'large', etc, prefer short-hand notation like xs, sm, md, lg.
      sm: "...",
      md: "...",
      lg: "...",
    },
    layout: {
      withText: "...",
      iconOnly: "...",
    },
  },
  compoundVariants: [
    {
      size: "xs",
      layout: "withText",
      className: "..."
    },
    {
      size: "xs",
      layout: "iconOnly",
      className: "...",
    },
    ..., // sm-withText, sm-iconOnly, md-withText, md-iconOnly, lg-withText,
    {
      size: "lg",
      layout: "iconOnly",
      className: "...",
    }
  ],
  defaultVariants: {
    variant: "brandSolid",
    size: "md",
    layout: "withText",
  },
});
```

```css
.seed-action-button {
  ...
  outline: var(--seed-dimension-x0_5) solid transparent;
  outline-offset: var(--seed-dimension-x0_5);
  ...
}
```

2. Look at the css file and fill in the utility classes.

2-1. interpret the original css file.
**seed design system's original css class naming convention**

```css
/* base style */
.{component-name} {
  ...properties;
}
/* single varaint style */
.{component-name}--{variant-key}_{variant-value} {
  ...properties;
}
/* compound variants style */
.{component-name}--{variant1-key}_{variant1-value}-{variant2-key}_{variant2-value} {
  ...properties;
}
/* composition element selector pattern */
.{component-name}__{composition-role-name} {
  ...properties;
}

/* examples */
.seed-action-button {
  ...properties;
}
.seed-action-button--variant_ghost {
  ...properties;
}
.seed-action-button--size_large {
  ...properties;
}
.seed-action-button--size_large-layout_withText {
  ...properties;
}
.seed-checkbox__root {
  ...properties;
}
.seed-checkbox__label {
  ...properties;
}
```

2-2. Convert each css property into Tailwind CSS v4.
look at some examples and follow the same rule.

**Example 1: Converting outline styles**

In the original css file:

```css
.seed-action-button {
  ...
  outline: var(--seed-dimension-x0_5) solid transparent;
  outline-offset: var(--seed-dimension-x0_5);
  ...
}
```

In seed registry's tailwindcss:

```tsx
const buttonVariants = cva(
  `...
  outline-(length:--spacing-xxs) outline-transparent outline-offset-(--spacing-xxs)
  ...`,
  {...}
);
```

because in `global.css`:

```css
@theme inline{
  ...
  --spacing-xxs: var(--dimension-x0_5);
  ...
}
```

> Why not `outline-xxs` and `outline-offset-xxs`?
> because Tailwind CSS v4 docs say: `outline-(length:<custom-property>)` becomes `outline-width: var(<custom-property>)`. `outline-<value>` would resolve to `outline-color: var(--value)`. The same applies to `outline-offset`.

**Example 2: Converting backgroundColor**

In the original css file:

```css
.seed-action-button--variant_brandSolid {
  background: var(--seed-color-bg-brand-solid);
  ...
}
```

In seed registry's tailwindcss:

```tsx
const buttonVariants = cva(...,
  variants: {
    variant: {
      brandSolid: "bg-bg-brand-solid ...", // NOTE that this is NOT 'bg-brand-solid'!!
      ...
	  },
    ...
	},
  ...
);
```

because in global.css:

```css
@theme inline {
  ...
  --color-bg-brand-solid: var(--bg-brand-solid);
  /* NOTE that it is NOT --color-brand-solid */
  ...
}
```

**Example 3: Converting borderRadius**

In the original css file:

```css
.seed-action-button--size_medium {
  height: var(--seed-dimension-x10);
  border-radius: var(--seed-radius-r2);
  ...
}
```

In seed registry's tailwindcss:

```tsx
const buttonVariants = cva(..., {
  variants: {
    ...,
    size: {
      ...,
      md: "h-10xl rounded-md",
    }
  }
})
```

because in global.css:

```css
@theme inline {
  ...
  --radius-md: var(--radius-r2);
  /* NOTE that some theme variable names don't exactly match the original variable name.
    For example it's not --radius-r2, but --radius-md
  */
  ...
}
```

**Example 4: Converting transition**

In the original css file:

```css
.seed-action-button {
  transition:
    background-color var(--seed-duration-color-transition)
      var(--seed-timing-function-easing),
    outline-color var(--seed-duration-d3) var(--seed-timing-function-easing);
}
```

In seed registry's Tailwind CSS:

```tsx
const buttonVariants = cva(
  `...
  transition-colors duration-(--duration-d3) ease-easing
  ...`,
  {...}
);
```

because in global.css:

```css
@theme inline {
  ...
  --ease-easing: var(--motion-ease-easing);
  --duration-d3: var(--motion-duration-d3);
  --duration-color-transition: var(--motion-duration-color-transition);
  ...
}
```

> Prefer `transition-colors duration-(--duration-d3) ease-easing` for seed registry components when the original transition only concerns color-like properties such as `background-color`, `color`, `border-color`, or `outline-color`. Although the original css may assign a separate duration token like `--duration-color-transition`, using one readable Tailwind transition expression is preferred here because exact per-property transition declarations become too complex for component class strings.

3. Deal with pseudo-class selectors and media queries, using these rules below.

3-1. Tailwindcss custom-variant :engaged, for fine-pointer hover and touch-safe hover.

In the original css file:

```css
@media (hover: hover) and (pointer: fine) {
  .seed-action-button--variant_brandSolid:is(:hover, [data-hover]) {
    background: var(--seed-color-bg-brand-solid-pressed);
  }
}
@media not all and (hover: hover) and (pointer: fine) {
  .seed-action-button--variant_brandSolid:is(:active, [data-active]) {
    background: var(--seed-color-bg-brand-solid-pressed);
  }
}
```

In seed registry's tailwindcss:

```tsx
const buttonVariants = cva(..., {
  variants: {
    variant: {
      brandSolid: "... engaged:bg-bg-brand-solid-pressed ...",
      ...,
    },
    ...
  },
  ...
})
```

because in global.css:

```css
@custom-variant engaged {
  @media (hover: hover) and (pointer: fine) {
    &:is(:hover, [data-hover]) {
      @slot;
    }
  }

  @media not all and (hover: hover) and (pointer: fine) {
    &:is(:active, [data-active]) {
      @slot;
    }
  }
}

...

@theme inline {
  ...
  --color-bg-brand-solid-pressed: var(--bg-brand-solid-pressed);
  ...
}
```

3-2. Prefer Tailwind's built-in pseudo variants and arbitrary data variants over complex arbitrary selectors.

When the original css uses simple pseudo/data state selectors, write them in Tailwind's variant syntax, even if it repeats utilities.

In the original css file:

```css
.seed-action-button:is(:focus-visible, [data-focus-visible]) {
  outline: var(--seed-dimension-x0_5) solid var(--seed-color-stroke-focus-ring);
}

.seed-action-button:is(:disabled, [disabled], [data-disabled]) {
  cursor: not-allowed;
}

.seed-action-button--variant_brandSolid:is(
    :disabled,
    [disabled],
    [data-disabled]
  ) {
  background: var(--seed-color-bg-disabled);
  color: var(--seed-color-fg-disabled);
}
```

In seed registry's Tailwind CSS:

```tsx
const buttonVariants = cva(
  `...
  focus-visible:outline-stroke-focus-ring data-[focus-visible]:outline-stroke-focus-ring
  disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed
  ...`,
  {
    variants: {
      variant: {
        brandSolid: `...
          disabled:!bg-bg-disabled data-[disabled]:!bg-bg-disabled
          disabled:!text-fg-disabled data-[disabled]:!text-fg-disabled
          disabled:[&_svg]:!text-fg-disabled data-[disabled]:[&_svg]:!text-fg-disabled
        `,
      },
    },
  },
);
```

Avoid complex arbitrary selectors when a readable Tailwind variant exists:

```tsx
// avoid
"[&:is(:disabled,[disabled],[data-disabled])]:cursor-not-allowed";

// prefer
"disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed";
```

Use Tailwind's important modifier for disabled visual styles that must beat interactive variants such as `engaged:`. The `engaged:` custom variant can otherwise override disabled backgrounds while hovering or pressing a disabled component.

```tsx
// prefer for disabled visual overrides
"disabled:!bg-bg-disabled data-[disabled]:!bg-bg-disabled";
"disabled:!text-fg-disabled data-[disabled]:!text-fg-disabled";
"disabled:[&_svg]:!text-fg-disabled data-[disabled]:[&_svg]:!text-fg-disabled";
```

Also avoid building Tailwind class names dynamically:

```tsx
// avoid: Tailwind may not statically detect the generated classes
const disabledSelector = "&:is(:disabled,[disabled],[data-disabled])";
const className = `[${disabledSelector}]:bg-bg-disabled`;
```

Use literal class strings instead. Tailwind must be able to see the complete class name in source files.
