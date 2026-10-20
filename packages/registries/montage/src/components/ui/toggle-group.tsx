"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { cva, type VariantProps } from "class-variance-authority";

import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

// shadcn ToggleGroup 에 montage 의 모양을 입혔다 — Toggle 들을 떨어뜨려 늘어놓는다(붙여 놓지 않는다).
// 사이 간격은 크기를 따라 커진다. variant · size 는 그룹에 주면 모든 항목이 따른다.
const toggleGroupVariants = cva(
  `group/toggle-group flex w-fit flex-wrap items-center
  data-[orientation=vertical]:flex-col
  data-[orientation=vertical]:items-stretch`,
  {
    variants: {
      size: {
        xs: "gap-1",
        sm: "gap-1.5",
        default: "gap-2",
        lg: "gap-2.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  variant: "default",
  size: "default",
});

type ToggleGroupProps = ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants>;

function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(toggleGroupVariants({ size }), className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

type ToggleGroupItemProps = TogglePrimitive.Props &
  VariantProps<typeof toggleVariants>;

function ToggleGroupItem({
  className,
  variant,
  size,
  ...props
}: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext);
  const itemVariant = variant ?? context.variant;
  const itemSize = size ?? context.size;

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={itemVariant}
      data-size={itemSize}
      className={cn(
        toggleVariants({ variant: itemVariant, size: itemSize }),
        className,
      )}
      {...props}
    />
  );
}

export {
  ToggleGroup,
  ToggleGroupItem,
  toggleGroupVariants,
  type ToggleGroupProps,
  type ToggleGroupItemProps,
};
