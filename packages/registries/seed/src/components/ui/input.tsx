"use client";

import { Input as InputPrimitive, type InputProps } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const baseClassNames = [
  "w-full font-regular resize-none text-fg-neutral",
  "transition-[box-shadow] duration-(--duration-d2) ease-easing",
  "focus:outline-none focus-visible:outline-none",
  "disabled:text-fg-disabled disabled:placeholder:text-fg-disabled disabled:cursor-not-allowed",
  "disabled:select-none",
  "autofill:[-webkit-text-fill-color:var(--fg-neutral)]",
  "autofill:transition-[background-color_2147483647s_2147483647s]",
  "supports-[background-clip:text]:autofill:bg-clip-text",
  "supports-[background-clip:text]:autofill:transition-none",
].join(" ");

const inputVariants = cva(baseClassNames, {
  variants: {
    variant: {
      outline: `ring-1 ring-stroke-neutral-weak rounded-xl px-3xl
      not-read-only:focus-visible:inset-ring-2
      not-read-only:focus-visible:inset-ring-stroke-neutral-contrast
      invalid:inset-ring-stroke-critical-solid! invalid:inset-ring-2!
      disabled:bg-bg-disabled read-only:bg-bg-disabled`,
      underline: `min-h-10xl
      shadow-[inset_0_-1px_0_0_var(--color-stroke-neutral-weak)]
      not-read-only:focus-visible:shadow-[inset_0_-2px_0_0_var(--color-stroke-neutral-contrast)]
      invalid:shadow-[inset_0_-2px_0_0_var(--color-stroke-critical-solid)]!
      read-only:not-disabled:text-fg-neutral-muted
      read-only:not-disabled:placeholder:text-fg-neutral-muted text-xl`,
    },
    size: {
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      variant: "outline",
      size: "md",
      class: "min-h-10xl text-base",
    },
    {
      variant: "outline",
      size: "lg",
      class: "min-h-13xl text-lg",
    },
  ],
  defaultVariants: {
    variant: "outline",
    size: "lg",
  },
});

function Input({
  className,
  type,
  variant,
  size,
  ...props
}: InputProps & VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ className, variant, size }))}
      {...props}
    />
  );
}

export { Input };
