import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  `w-full resize-none rounded-xl px-3xl font-regular text-fg-neutral ring-1
  ring-stroke-neutral-weak transition-shadow duration-(--duration-d2)
  ease-easing outline-none placeholder:font-regular
  placeholder:text-fg-placeholder not-read-only:focus-visible:inset-ring-2
  not-read-only:focus-visible:inset-ring-stroke-neutral-contrast
  invalid:inset-ring-2! invalid:inset-ring-stroke-critical-solid!
  disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:text-fg-disabled
  disabled:placeholder:text-fg-disabled disabled:select-none
  read-only:bg-bg-disabled`,
  {
    variants: {
      size: {
        md: "min-h-22.5 py-2.75 text-base",
        lg: "min-h-23.75 py-2xl text-lg",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

type TextareaVariantProps = VariantProps<typeof textareaVariants>;
type TextareaProps = React.ComponentProps<"textarea"> & TextareaVariantProps;

function Textarea({ className, size, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ size, className }))}
      {...props}
    />
  );
}

export { Textarea, textareaVariants };
export type { TextareaProps, TextareaVariantProps };
