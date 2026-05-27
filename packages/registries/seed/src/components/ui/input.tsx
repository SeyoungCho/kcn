import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function InputField({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-field"
      className={cn("group/input-field flex flex-col gap-md", className)}
      {...props}
    />
  );
}

function InputFieldHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-field-header"
      className={cn("flex", className)}
      {...props}
    />
  );
}

function InputFieldLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="input-field-label"
      className={cn("text-fg-neutral w-fit text-lg font-medium", className)}
      {...props}
    />
  );
}

function InputFieldFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-field-footer"
      className={cn("flex justify-between", className)}
      {...props}
    />
  );
}

function InputFieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="input-field-description"
      className={cn(
        `text-fg-neutral group-[:invalid,[data-invalid]]:text-fg-critical w-fit
        font-regular`,
        className,
      )}
      {...props}
    />
  );
}

const inputRootBaseClassNames = [
  "flex relative w-full items-center overflow-hidden",
  "after:content-[''] after:absolute after:inset-0 after:border-transparent",
  "after:transition-[border-color] after:duration-(--duration-d2) after:ease-easing",
  "after:border-solid",
  "pointer-events-none",
  "[:invalid,[data-invalid]]:after:border-stroke-critical-solid",
  "[:invalid,[data-invalid]]:[:focus,[data-focus]]:after:border-stroke-critical-solid",
  "not-data-readonly:[:focus,[data-focus]]:after:border-stroke-neutral-contrast",
].join(" ");

const inputRootVariants = cva(inputRootBaseClassNames, {
  variants: {
    variant: {
      outline: `rounded-xl shadow-[inset_0_0_0_1px_var(--stroke-neutral-weak)]
      [:disabled,[data-disabled]]:bg-bg-disabled!
      readonly:not-[:disabled,[data-disabled]]:bg-bg-disabled after:border-2
      after:border-stroke-neutral-weak `,
      underline: `gap-lg min-h-10xl
      shadow-[inset_0_calc(1px*-1)_0_0_var(--stroke-neutral-weak)]
      after:border-b-2 `,
    },
  },
  defaultVariants: {
    variant: "outline",
  },
});

function InputRoot({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputRootVariants>) {
  return (
    <div
      data-slot="input-root"
      className={cn(inputRootVariants({ variant }), className)}
      {...props}
    />
  );
}

const inputValueBaseClassNames = [
  "border-none outline-none w-0 grow self-stretch",
  "text-fg-neutral font-regular",
  "placeholder:text-fg-placeholder placeholder:font-regular",
  // webkit-autofill style reset for Chrome, Safari, and Edge
  "autofill:[-webkit-text-fill-color:var(--fg-neutral)]",
  "autofill:transition-[background-color_2147483647s_2147483647s]",
  "supports-[background-clip:text]:autofill:bg-clip-text",
  "supports-[background-clip:text]:autofill:transition-none",
  // disabled style
  "[:disabled,[data-disabled]]:text-fg-disabled [:disabled,[data-disabled]]:cursor-not-allowed",
  "[:disabled,[data-disabled]]:placeholder:text-fg-disabled",
].join(" ");

const inputValueVariants = cva(inputValueBaseClassNames, {
  variants: {
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
      variant: "outline",
      size: "md",
      className: "",
    },
    {
      variant: "outline",
      size: "lg",
      className: "",
    },
  ],
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

function InputValue({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input-value"
      className={cn(
        `border-input file:text-foreground placeholder:text-muted-foreground
        focus-visible:border-ring focus-visible:ring-ring/50
        disabled:bg-input/50 aria-invalid:border-destructive
        aria-invalid:ring-destructive/20 dark:bg-input/30
        dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50
        dark:aria-invalid:ring-destructive/40 h-8 w-full min-w-0 rounded-lg
        border bg-transparent px-2.5 py-1 text-base transition-colors
        outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent
        file:text-sm file:font-medium focus-visible:ring-3
        disabled:pointer-events-none disabled:cursor-not-allowed
        disabled:opacity-50 aria-invalid:ring-3 md:text-sm`,
        className,
      )}
      {...props}
    />
  );
}

function InputPrefixText({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-prefix-text"
      className={cn("text-fg-neutral font-regular", className)}
      {...props}
    />
  );
}

function InputSuffixText({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-suffix-text"
      className={cn("text-fg-neutral font-regular", className)}
      {...props}
    />
  );
}

/** @TODO Add support for variants */
function Input() {
  return (
    <InputRoot>
      <InputValue />
    </InputRoot>
  );
}

export { Input };
