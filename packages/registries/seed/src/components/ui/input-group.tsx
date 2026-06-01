"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Input as InputPrimitive, type InputProps } from "@base-ui/react/input";
import { Textarea } from "@/components/ui/textarea";

const inputGroupVariants = cva(
  `group/input-group relative flex w-full min-w-0 items-center overflow-hidden
  transition-shadow duration-(--duration-d2) ease-easing
  has-[>[data-align=block-end]]:flex-col
  has-[>[data-align=block-start]]:flex-col`,
  {
    variants: {
      variant: {
        outline: `rounded-xl ring-1 ring-stroke-neutral-weak
        has-focused-control:inset-ring-2
        has-focused-control:inset-ring-stroke-neutral-contrast
        has-invalid:inset-ring-2! has-invalid:inset-ring-stroke-critical-solid!
        has-disabled:bg-bg-disabled
        has-[[data-slot=input-group-control]:read-only]:bg-bg-disabled
        has-[[data-slot=input-group-control]:read-only]:focus-within:inset-ring-0`,
        underline: `min-h-10xl
        shadow-[inset_0_-1px_0_0_var(--color-stroke-neutral-weak)]
        has-focused-control:shadow-[inset_0_-2px_0_0_var(--color-stroke-neutral-contrast)]
        has-invalid:shadow-[inset_0_-2px_0_0_var(--color-stroke-critical-solid)]!
        has-[[data-slot=input-group-control]:read-only]:focus-within:shadow-[inset_0_-1px_0_0_var(--color-stroke-neutral-weak)]`,
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
        className: "min-h-10xl gap-sm",
      },
      {
        variant: "outline",
        size: "lg",
        className: "min-h-13xl gap-lg",
      },
      {
        variant: "underline",
        className: "gap-lg",
      },
    ],
    defaultVariants: {
      variant: "outline",
      size: "lg",
    },
  },
);

type InputGroupContextValue = {
  variant: NonNullable<InputGroupVariantProps["variant"]>;
  size: NonNullable<InputGroupVariantProps["size"]>;
};

const InputGroupContext = React.createContext<InputGroupContextValue | null>(
  null,
);

function useInputGroupContext() {
  const context = React.useContext(InputGroupContext);

  if (!context) {
    throw new Error("InputGroup components must be used within InputGroup");
  }

  return context;
}

export type InputGroupVariantProps = VariantProps<typeof inputGroupVariants>;

export type InputGroupProps = React.ComponentProps<"div"> &
  InputGroupVariantProps;

function InputGroup({ className, variant, size, ...props }: InputGroupProps) {
  const resolvedVariant = variant ?? "outline";
  const resolvedSize = size ?? "lg";

  return (
    <InputGroupContext value={{ variant: resolvedVariant, size: resolvedSize }}>
      <div
        data-slot="input-group"
        role="group"
        className={cn(
          inputGroupVariants({
            variant: resolvedVariant,
            size: resolvedSize,
            className,
          }),
        )}
        {...props}
      />
    </InputGroupContext>
  );
}

const inputGroupAddonVariants = cva(
  `flex h-auto shrink-0 cursor-text items-center justify-center
  text-fg-neutral-muted select-none [&>svg]:shrink-0`,
  {
    variants: {
      align: {
        "inline-start": "order-first",
        "inline-end": "order-last",
        "block-start": "order-first w-full justify-start",
        "block-end": "order-last w-full justify-start",
      },
      variant: {
        outline: "",
        underline: "",
      },
      size: {
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      {
        align: "inline-start",
        variant: "outline",
        className: "ml-3xl",
      },
      {
        align: "inline-end",
        variant: "outline",
        className: "mr-3xl",
      },
      {
        align: ["block-start", "block-end"],
        variant: "outline",
        className: "px-3xl py-md",
      },
      {
        variant: "outline",
        size: "md",
        className: "[&>svg:not([class*='size-'])]:size-3xl",
      },
      {
        variant: "outline",
        size: "lg",
        className: "[&>svg:not([class*='size-'])]:size-5xl",
      },
      {
        variant: "underline",
        className: "[&>svg:not([class*='size-'])]:size-6xl",
      },
    ],
    defaultVariants: {
      align: "inline-start",
    },
  },
);

type InputGroupAddonVariantProps = VariantProps<typeof inputGroupAddonVariants>;

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & {
  align?: InputGroupAddonVariantProps["align"];
}) {
  const { variant, size } = useInputGroupContext();

  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        inputGroupAddonVariants({ align, variant, size }),
        className,
      )}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement
          ?.querySelector<
            HTMLInputElement | HTMLTextAreaElement
          >("input, textarea")
          ?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupTextVariants = cva(
  "flex items-center font-regular text-fg-neutral-muted",
  {
    variants: {
      variant: {
        outline: "",
        underline: "text-xl",
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
        className: "text-base",
      },
      {
        variant: "outline",
        size: "lg",
        className: "text-lg",
      },
    ],
  },
);

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  const { variant, size } = useInputGroupContext();

  return (
    <span
      data-slot="input-group-text"
      className={cn(inputGroupTextVariants({ variant, size }), className)}
      {...props}
    />
  );
}

const inputGroupControlVariants = cva(
  `box-border min-w-0 flex-1 self-stretch resize-none border-0 bg-transparent
  px-0 font-regular text-fg-neutral outline-none placeholder:font-regular
  placeholder:text-fg-placeholder disabled:cursor-not-allowed
  disabled:text-fg-disabled disabled:placeholder:text-fg-disabled
  autofill:[-webkit-text-fill-color:var(--fg-neutral)]
  autofill:transition-[background-color_2147483647s_2147483647s]
  supports-[background-clip:text]:autofill:bg-clip-text
  supports-[background-clip:text]:autofill:transition-none`,
  {
    variants: {
      variant: {
        outline: `group-has-data-[align=inline-start]/input-group:pl-0
        group-has-data-[align=inline-end]/input-group:pr-0`,
        underline: `read-only:not-disabled:text-fg-neutral-muted
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
        className: "px-3xl text-base",
      },
      {
        variant: "outline",
        size: "lg",
        className: "px-3xl text-lg",
      },
    ],
  },
);

function InputGroupInput({ className, ...props }: InputProps) {
  const { variant, size } = useInputGroupContext();

  return (
    <InputPrimitive
      data-slot="input-group-control"
      className={cn(
        "w-0",
        inputGroupControlVariants({ variant, size }),
        className,
      )}
      {...props}
    />
  );
}

const inputGroupTextareaVariants = cva("", {
  variants: {
    size: {
      md: "min-h-[90px] py-[11px]",
      lg: "min-h-[95px] py-2xl",
    },
  },
});

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  const { variant, size } = useInputGroupContext();

  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        inputGroupControlVariants({ variant, size }),
        inputGroupTextareaVariants({ size }),
        "rounded-none shadow-none ring-0 focus-visible:ring-0",
        className,
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  inputGroupVariants,
};
