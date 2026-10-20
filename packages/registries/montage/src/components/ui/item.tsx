"use client";

import type * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

// shadcn Item 에 montage 의 모양을 입혔다.
//   variant — default 는 좌우 여백 없이 쓰고, 누를 수 있는 줄이면 둥근 막이 양옆으로 조금 넓게 깔린다.
//             full 은 좌우 여백을 두고 막이 줄 너비를 꽉 채운다.
//   size — 위아래 여백 sm · default · lg (8 · 12 · 16px).
// render 로 <a> · <button> 을 그리면 누를 수 있는 줄이 된다 — 마우스를 올리거나 누르면 옅은 막(::after)이 깔린다.
// 고른 줄은 aria-current="true" 를 달면 제목이 파랗고 굵어진다. 끈 줄은 aria-disabled 를 단다.
// 움직임의 시간 · 이징은 토큰이 없어 값을 바로 적었다.

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex w-full flex-col", className)}
      {...props}
    />
  );
}

// 줄 사이의 구분선 — 바로 위 줄에 마우스를 올리거나 누르면 사라진다. full 줄들 사이에서는 좌우 여백만큼 들어간다.
function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn(
        `bg-line-neutral-tertiary transition-opacity duration-150 ease-[ease]
        group-has-[[data-slot=item][data-variant=full]]/item-group:mx-5
        [:is(a,button)[data-slot=item]:active+&]:opacity-0
        [:is(a,button)[data-slot=item]:hover+&]:opacity-0`,
        className,
      )}
      {...props}
    />
  );
}

const itemVariants = cva(
  `group/item relative isolate flex w-full flex-wrap items-start gap-2 text-left
  outline-none [--interaction-active:0.09] [--interaction-hover:0.0375]
  after:pointer-events-none after:absolute after:inset-y-0 after:-z-10
  after:rounded-[inherit] after:bg-fg-neutral-primary after:opacity-0
  after:transition-opacity after:duration-150 after:ease-[ease]
  focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-solid
  disabled:pointer-events-none aria-disabled:pointer-events-none
  [a,button]:cursor-pointer [a,button]:hover:after:opacity-(--interaction-hover)
  [a,button]:active:after:opacity-(--interaction-active)`,
  {
    variants: {
      variant: {
        default: "rounded-16 after:-inset-x-3",
        full: "px-5 after:inset-x-0",
      },
      size: {
        sm: "py-2",
        default: "py-3",
        lg: "py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ItemProps = useRender.ComponentProps<"div"> &
  VariantProps<typeof itemVariants>;

function Item({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: ItemProps) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(itemVariants({ variant, size }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "item",
      variant,
      size,
    },
  });
}

// 그림과 글 사이는 줄의 간격(8px)에 더 띄운다 — default 아이콘은 4px, icon · image 는 8px.
//   default — 22px 회색 아이콘. icon — 옅은 회색 둥근 판 위의 파란 아이콘. image — 둥글게 자른 40px 그림.
const itemMediaVariants = cva(
  `flex min-h-6 shrink-0 items-center justify-center
  group-aria-disabled/item:text-fg-disable-primary [&_svg]:pointer-events-none
  [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: `me-1 [&_svg:not([class*='size-'])]:size-5.5
        [&>svg:not([class*='text-'])]:text-fg-neutral-tertiary`,
        icon: `me-2 rounded-12 bg-surface-neutral-secondary p-2
        text-fg-brand-primary [&_svg:not([class*='size-'])]:size-5`,
        image: `me-2 size-10 overflow-hidden rounded-8
        group-aria-disabled/item:opacity-43 [&_img]:size-full
        [&_img]:object-cover`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ItemMediaProps = React.ComponentProps<"div"> &
  VariantProps<typeof itemMediaVariants>;

function ItemMedia({
  className,
  variant = "default",
  ...props
}: ItemMediaProps) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant }), className)}
      {...props}
    />
  );
}

// 두 번째 ItemContent 는 오른쪽 값이 되어 오른쪽에 붙는다.
function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        `flex min-w-0 flex-1 flex-col [&+[data-slot=item-content]]:flex-none
        [&+[data-slot=item-content]]:items-end
        [&+[data-slot=item-content]]:text-right`,
        className,
      )}
      {...props}
    />
  );
}

// 제목 줄은 24px 높이 안에 글자를 가운데 둔다. 제목 뒤에 배지 · 아이콘을 이어 붙일 수 있다.
function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        `flex min-h-6 w-fit items-center gap-1 py-px text-body2 font-medium
        text-fg-neutral-primary break-keep wrap-break-word
        group-aria-[current=true]/item:font-semibold
        group-aria-[current=true]/item:text-fg-brand-primary
        group-aria-disabled/item:text-fg-disable-primary`,
        className,
      )}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        `text-label2 text-fg-neutral-tertiary break-keep wrap-break-word
        group-aria-disabled/item:text-fg-disable-primary [&>a]:underline
        [&>a]:underline-offset-4 [&>a:hover]:text-fg-brand-primary`,
        className,
      )}
      {...props}
    />
  );
}

// 오른쪽 끝 — 글자는 회색 값, 아이콘은 20px 짙은 회색.
function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn(
        `flex min-h-6 shrink-0 items-center gap-2 text-body2
        text-fg-neutral-tertiary
        group-aria-disabled/item:text-fg-disable-primary
        [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-5
        [&>svg:not([class*='text-'])]:text-fg-neutral-secondary
        group-aria-disabled/item:[&>svg]:text-fg-disable-primary`,
        className,
      )}
      {...props}
    />
  );
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  );
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  );
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
  itemVariants,
  itemMediaVariants,
  type ItemProps,
  type ItemMediaProps,
};
