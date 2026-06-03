"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const selectTriggerVariants = cva(
  `flex w-fit min-w-0 cursor-pointer items-center justify-between font-regular
  text-fg-neutral ring-1 ring-stroke-neutral-weak transition-shadow
  duration-(--duration-d2) ease-easing outline-none select-none
  data-placeholder:text-fg-placeholder focus-visible:inset-ring-2
  focus-visible:inset-ring-stroke-neutral-contrast invalid:inset-ring-2!
  invalid:inset-ring-stroke-critical-solid! disabled:cursor-not-allowed
  disabled:bg-bg-disabled disabled:text-fg-disabled
  disabled:[&_svg]:text-fg-disabled *:data-[slot=select-value]:line-clamp-1
  [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-fg-neutral-muted`,
  {
    variants: {
      size: {
        md: `h-10xl gap-md rounded-xl px-3xl text-base
        [&_svg:not([class*='size-'])]:size-3xl`,
        lg: `h-13xl gap-lg rounded-2xl px-5xl text-lg
        [&_svg:not([class*='size-'])]:size-4xl`,
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

type SelectSize = NonNullable<
  VariantProps<typeof selectTriggerVariants>["size"]
>;

type SelectContextValue = {
  size: SelectSize;
};

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = React.useContext(SelectContext);

  if (!context) {
    throw new Error("Select components must be used within Select");
  }

  return context;
}

type SelectProps<
  Value = string,
  Multiple extends boolean | undefined = false,
> = SelectPrimitive.Root.Props<Value, Multiple> & {
  size?: SelectSize;
};

function Select<Value = string, Multiple extends boolean | undefined = false>({
  size = "lg",
  ...props
}: SelectProps<Value, Multiple>) {
  return (
    <SelectContext value={{ size }}>
      <SelectPrimitive.Root {...props} />
    </SelectContext>
  );
}

function SelectGroup({
  className,
  children,
  ...props
}: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-xs p-xs", className)}
      {...props}
    >
      {children}
    </SelectPrimitive.Group>
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex min-w-0 flex-1 items-center text-left", className)}
      {...props}
    />
  );
}

type SelectTriggerProps = SelectPrimitive.Trigger.Props;

function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  const { size } = useSelectContext();

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({ size, className }))}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        className="data-popup-open:rotate-180 transition-transform
          duration-(--duration-d3) ease-easing"
        render={
          <ChevronDownIcon className="pointer-events-none text-fg-neutral-muted" />
        }
      />
    </SelectPrimitive.Trigger>
  );
}

const selectContentVariants = cva(
  `relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36
  origin-(--transform-origin) overflow-x-hidden overflow-y-auto
  bg-layer-floating text-fg-neutral shadow-s2 ring-1 ring-stroke-neutral-subtle
  duration-(--duration-d2) ease-easing data-[side=bottom]:slide-in-from-top-2
  data-[side=inline-end]:slide-in-from-left-2
  data-[side=inline-start]:slide-in-from-right-2
  data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
  data-[side=top]:slide-in-from-bottom-2 data-open:animate-in
  data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out
  data-closed:fade-out-0 data-closed:zoom-out-95`,
  {
    variants: {
      size: {
        md: "rounded-xl p-sm",
        lg: "rounded-2xl p-sm",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  const { size } = useSelectContext();

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-size={size}
          data-align-trigger={alignItemWithTrigger}
          className={cn(selectContentVariants({ size, className }))}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

const selectLabelVariants = cva("font-medium text-fg-neutral-subtle", {
  variants: {
    size: {
      md: "px-md py-sm text-sm",
      lg: "px-lg py-md text-base",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  const { size } = useSelectContext();

  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(selectLabelVariants({ size }), className)}
      {...props}
    />
  );
}

const selectItemVariants = cva(
  `relative flex w-full cursor-pointer items-center text-fg-neutral outline-none
  select-none focus:bg-bg-transparent-pressed transition-colors
  duration-(--duration-d2) ease-easing
  data-highlighted:bg-bg-transparent-pressed data-selected:font-medium
  data-selected:bg-bg-transparent-pressed data-disabled:pointer-events-none
  data-disabled:text-fg-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0`,
  {
    variants: {
      size: {
        md: `gap-sm rounded-md py-md pr-8xl pl-md text-base
        [&_svg:not([class*='size-'])]:size-3xl`,
        lg: `gap-md rounded-lg py-lg pr-9xl pl-lg text-lg
        [&_svg:not([class*='size-'])]:size-4xl`,
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

const selectItemIndicatorVariants = cva(
  "pointer-events-none absolute flex items-center justify-center",
  {
    variants: {
      size: {
        md: "right-md [&>svg:not([class*='size-'])]:size-2xl",
        lg: "right-lg [&>svg:not([class*='size-'])]:size-3xl",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  const { size } = useSelectContext();

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      data-size={size}
      className={cn(selectItemVariants({ size }), className)}
      {...props}
    >
      <SelectPrimitive.ItemText
        className="flex min-w-0 flex-1 items-center gap-lg whitespace-nowrap"
      >
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className={cn(selectItemIndicatorVariants({ size }))}>
            <CheckIcon className="pointer-events-none" />
          </span>
        }
      />
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "pointer-events-none -mx-sm my-sm h-px bg-stroke-neutral-subtle",
        className,
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        `top-0 z-10 flex w-full cursor-default items-center justify-center
        bg-layer-floating py-sm text-fg-neutral-muted
        [&_svg:not([class*='size-'])]:size-5xl`,
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        `bottom-0 z-10 flex w-full cursor-default items-center justify-center
        bg-layer-floating py-sm text-fg-neutral-muted
        [&_svg:not([class*='size-'])]:size-5xl`,
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

function CheckIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Weight=Fill">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.2424 3.55704C22.7631 3.96703 22.8528 4.72151 22.4428 5.24222L10.632 20.2422C10.4171 20.5151 10.0945 20.6816 9.7475 20.6984C9.40053 20.7153 9.06327 20.581 8.82289 20.3302L1.6337 12.8302C1.17509 12.3518 1.19116 11.5922 1.6696 11.1336C2.14804 10.675 2.90767 10.691 3.36628 11.1695L9.60029 17.673L20.5572 3.75749C20.9672 3.23679 21.7216 3.14705 22.2424 3.55704Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function ChevronDownIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Weight=Line">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.2612 7.27589C20.8613 6.89499 20.2283 6.9104 19.8474 7.31032L11.9996 15.55L4.15284 7.31037C3.77196 6.91043 3.13899 6.89497 2.73904 7.27584C2.3391 7.65671 2.32364 8.28969 2.70451 8.68963L11.2754 17.6896C11.4641 17.8878 11.7258 18 11.9995 18C12.2732 18 12.5349 17.8879 12.7236 17.6897L21.2956 8.68968C21.6765 8.28976 21.6611 7.65679 21.2612 7.27589Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function ChevronUpIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Weight=Line">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.2612 16.7241C20.8613 17.105 20.2283 17.0896 19.8474 16.6897L11.9996 8.45L4.15284 16.6896C3.77196 17.0896 3.13899 17.105 2.73904 16.7242C2.3391 16.3433 2.32364 15.7103 2.70451 15.3104L11.2754 6.31037C11.4641 6.11218 11.7258 6.00001 11.9995 6C12.2732 5.99999 12.5349 6.11215 12.7236 6.31032L21.2956 15.3103C21.6765 15.7102 21.6611 16.3432 21.2612 16.7241Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectContentVariants,
  selectItemVariants,
  selectLabelVariants,
  selectTriggerVariants,
};
export type { SelectProps, SelectSize, SelectTriggerProps };
