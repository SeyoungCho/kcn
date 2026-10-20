"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Item 에 t-flavored 의 모양을 입혔다.
//   ItemHeader · ItemFooter 는 ItemGroup 안에서 줄들의 위 · 아래에 두는 목록의 머리 · 꼬리다.
//   size — 위아래 여백 sm · default · lg · xl (8 · 12 · 16 · 24px).
// render 로 <a> · <button> 을 그리면 누를 수 있는 줄이 된다 — 0.96 으로 줄고 둥근 회색 바탕이 깔린다.
// 누름 효과의 시간 · 이징(250ms ease-out)은 토큰이 없어 클래스에 값을 바로 적었다.

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

// 줄 사이의 구분선 — 왼쪽 24px 을 띄운 머리카락 선
function ItemSeparator({ className, ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("ms-6 h-px shrink-0 bg-hairline", className)}
      {...props}
    />
  );
}

const itemVariants = cva(
  `group/item relative isolate flex min-h-11 w-full flex-wrap items-center gap-4
  px-6 text-left outline-none transition-[scale] duration-250 ease-[ease-out]
  after:pointer-events-none after:absolute after:inset-0 after:-z-1
  after:bg-grey-opacity-100 after:opacity-0 after:transition-opacity
  after:duration-250 after:ease-[ease-out] focus-visible:ring-3
  focus-visible:ring-ring/50 focus-visible:ring-inset
  disabled:pointer-events-none disabled:opacity-30
  aria-disabled:pointer-events-none aria-disabled:opacity-30
  [a,button]:cursor-pointer [a,button]:active:scale-[0.96]
  [a,button]:active:after:opacity-100`,
  {
    variants: {
      variant: {
        default: "bg-transparent after:rounded-lg",
        outline: "rounded-2xl border border-hairline after:rounded-2xl",
        muted: "rounded-2xl bg-grey-50 after:rounded-2xl",
      },
      size: {
        sm: "py-2",
        default: "py-3",
        lg: "py-4",
        xl: "py-6",
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
        className: cn(itemVariants({ variant, size, className })),
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

// 그림과 글 사이는 12px — 줄의 간격(16px)에서 4px 를 당긴다.
//   icon — 아이콘이나 글자를 회색 스쿼클(36px) 안에 둔다. 스쿼클은 둥근 모서리(10px)로 근사했다.
//   image — <img> 를 같은 스쿼클(36px)로 자른다.
const itemMediaVariants = cva(
  `-me-1 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none
  [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: "bg-transparent [&_svg:not([class*='size-'])]:size-6",
        icon: `size-9 rounded-md bg-grey-opacity-100 text-t7 font-bold
        text-primary [&_svg:not([class*='size-'])]:size-6`,
        image: `size-9 overflow-hidden rounded-md [&_img]:size-full
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
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  );
}

// 두 번째 ItemContent 는 오른쪽 글이 되어 오른쪽에 붙고 오른쪽으로 정렬된다.
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

// 줄의 제목 · 설명은 line-height 를 1.35 로 둔다.
function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        `flex w-fit items-center gap-2 text-t5 leading-[1.35] font-bold
        break-keep text-grey-800`,
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
        `text-t6 leading-[1.35] font-normal break-keep text-muted-foreground
        [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary`,
        className,
      )}
      {...props}
    />
  );
}

// 오른쪽 끝의 화살표는 24px 회색이고 줄의 오른쪽 여백으로 8px 들어간다.
function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn(
        `flex shrink-0 items-center gap-2 [&>svg]:text-grey-400
        [&>svg:last-child]:-me-2 [&>svg:not([class*='size-'])]:size-6`,
        className,
      )}
      {...props}
    />
  );
}

// 목록의 머리 — 보조 설명(ItemDescription)을 제목 위에, 오른쪽 글(ItemActions)을 끝에 둔다.
// 오른쪽 글은 제목 줄의 가운데에 오도록 아래에 붙이고 3px 띄운다.
function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        `flex basis-full items-end justify-between gap-4 px-6 pt-6 pb-2
        **:data-[slot=item-actions]:pb-0.75 **:data-[slot=item-actions]:text-t7
        **:data-[slot=item-actions]:text-grey-700
        **:data-[slot=item-content]:gap-1
        **:data-[slot=item-description]:text-t7
        **:data-[slot=item-description]:leading-normal
        **:data-[slot=item-title]:leading-normal`,
        className,
      )}
      {...props}
    />
  );
}

// 목록의 꼬리 — 위에 머리카락 선, 가운데에 파란 "더 보기". render 로 <button> 을 그리면 누를 때 회색 빛이 번진다.
function ItemFooter({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          `relative isolate flex min-h-14.75 basis-full items-center
          justify-center border-t border-hairline px-6 text-t5 leading-[1.252]
          font-medium text-primary outline-none transition-[scale]
          duration-250 ease-[ease-out] after:pointer-events-none after:absolute
          after:inset-0 after:-z-1
          after:bg-[radial-gradient(60%_300%,var(--color-grey-100),transparent)]
          after:opacity-0 after:transition-opacity after:duration-250 after:ease-[ease-out]
          focus-visible:ring-3 focus-visible:ring-ring/50
          focus-visible:ring-inset [&_svg]:pointer-events-none
          [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6
          [a,button]:w-full [a,button]:cursor-pointer
          [a,button]:active:scale-[0.96] [a,button]:active:after:opacity-100`,
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "item-footer",
    },
  });
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
