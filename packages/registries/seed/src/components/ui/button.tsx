import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const baseClassNames = [
  "relative inline-flex cursor-pointer items-center justify-center",
  "box-border shrink-0 align-middle whitespace-nowrap",
  "normal-case no-underline antialiased",
  "outline-(length:--spacing-xxs) outline-transparent outline-offset-(--spacing-xxs)",
  "transition-colors duration-(--duration-d3) ease-easing",
  "focus-visible:outline-stroke-focus-ring data-[focus-visible]:outline-stroke-focus-ring",
  "disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed",
  "[&_svg]:shrink-0",
].join(" ");

const disabledSolidClassNames = [
  "disabled:!bg-bg-disabled data-[disabled]:!bg-bg-disabled",
  "disabled:!text-fg-disabled data-[disabled]:!text-fg-disabled",
  "disabled:[&_svg]:!text-fg-disabled data-[disabled]:[&_svg]:!text-fg-disabled",
].join(" ");

const disabledOutlineClassNames = [
  "disabled:!bg-bg-transparent data-[disabled]:!bg-bg-transparent",
  "disabled:!border-stroke-neutral-muted data-[disabled]:!border-stroke-neutral-muted",
  "disabled:!text-fg-disabled data-[disabled]:!text-fg-disabled",
  "disabled:[&_svg]:!text-fg-disabled data-[disabled]:[&_svg]:!text-fg-disabled",
].join(" ");

const buttonVariants = cva(baseClassNames, {
  variants: {
    variant: {
      brandSolid: `border-0 bg-bg-brand-solid font-bold text-static-white
      engaged:bg-bg-brand-solid-pressed data-loading:bg-bg-brand-solid-pressed
      [&_svg]:text-static-white ${disabledSolidClassNames}`,
      neutralSolid: `border-0 bg-bg-neutral-inverted font-bold
      text-fg-neutral-inverted engaged:bg-bg-neutral-inverted-pressed
      data-loading:bg-bg-neutral-inverted-pressed
      [&_svg]:text-fg-neutral-inverted ${disabledSolidClassNames}`,
      neutralWeak: `border-0 bg-bg-neutral-weak font-bold text-fg-neutral
      engaged:bg-bg-neutral-weak-pressed data-loading:bg-bg-neutral-weak-pressed
      [&_svg]:text-fg-neutral ${disabledSolidClassNames}`,
      criticalSolid: `border-0 bg-bg-critical-solid font-bold text-static-white
      engaged:bg-bg-critical-solid-pressed
      data-loading:bg-bg-critical-solid-pressed [&_svg]:text-static-white
      ${disabledSolidClassNames}`,
      brandOutline: `border border-solid border-stroke-neutral-muted
      bg-bg-transparent font-bold text-fg-brand
      engaged:bg-bg-transparent-pressed data-loading:bg-bg-transparent
      [&_svg]:text-fg-brand ${disabledOutlineClassNames}`,
      neutralOutline: `border border-solid border-stroke-neutral-muted
      bg-bg-transparent font-bold text-fg-neutral
      engaged:bg-bg-transparent-pressed data-loading:bg-bg-transparent
      [&_svg]:text-fg-neutral ${disabledOutlineClassNames}`,
      ghost: `border-0 bg-bg-transparent font-bold text-fg-neutral
      engaged:bg-bg-transparent-pressed data-loading:bg-bg-transparent-pressed
      [&_svg]:text-fg-neutral ${disabledOutlineClassNames}`,
    },
    size: {
      xs: "h-8xl rounded-full [&_svg:not([class*='size-'])]:size-2xl",
      sm: "h-9xl rounded-md [&_svg:not([class*='size-'])]:size-2xl",
      md: "h-10xl rounded-md [&_svg:not([class*='size-'])]:size-3xl",
      lg: "h-13xl rounded-xl [&_svg:not([class*='size-'])]:size-[22px]",
    },
    layout: {
      withText: "",
      iconOnly: "",
    },
  },
  compoundVariants: [
    {
      size: "xs",
      layout: "withText",
      className: "gap-xs px-2xl py-sm text-sm",
    },
    {
      size: "xs",
      layout: "iconOnly",
      className: "min-w-8xl px-sm py-sm",
    },
    {
      size: "sm",
      layout: "withText",
      className: "gap-xs px-2xl py-md text-base",
    },
    {
      size: "sm",
      layout: "iconOnly",
      className: "min-w-9xl px-md py-md [&_svg:not([class*='size-'])]:size-3xl",
    },
    {
      size: "md",
      layout: "withText",
      className: "gap-sm px-3xl py-lg text-base",
    },
    {
      size: "md",
      layout: "iconOnly",
      className:
        "min-w-10xl px-lg py-lg [&_svg:not([class*='size-'])]:size-4xl",
    },
    {
      size: "lg",
      layout: "withText",
      className: "gap-md px-5xl py-2xl text-xl",
    },
    {
      size: "lg",
      layout: "iconOnly",
      className: "min-w-13xl px-2xl py-2xl",
    },
  ],
  defaultVariants: {
    variant: "brandSolid",
    size: "md",
    layout: "withText",
  },
});

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export type ButtonProps = ButtonPrimitive.Props & ButtonVariantProps;

function Button({
  className,
  variant = "brandSolid",
  size = "md",
  layout = "withText",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, layout, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

export default Button;
