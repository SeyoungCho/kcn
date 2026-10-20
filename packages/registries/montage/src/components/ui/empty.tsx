import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Empty 에 montage 의 모양을 입혔다.
//   size — default 는 넓은 화면, sm 은 좁은 화면. 폭 · 제목 글자 · 그림 · 버튼 사이 간격이 바뀐다.
//   padding — 위아래 여백. default 는 화면 하나를 채울 때, compact 는 목록 · 카드 안처럼 좁은 자리에서.
// 버튼은 EmptyContent 에 넣는다 — outline Button 을, size 는 default 에서 lg · sm 에서 default 로 쓴다.
// 335px 폭은 맞는 눈금이 없어 값으로 적는다.
const emptyVariants = cva(
  "group/empty flex max-w-full min-w-0 flex-col items-center gap-6 text-center",
  {
    variants: {
      size: {
        default: "w-100",
        sm: "w-[335px]",
      },
      padding: {
        default: "py-40",
        compact: "py-20",
      },
    },
    defaultVariants: {
      size: "default",
      padding: "default",
    },
  },
);

type EmptyProps = React.ComponentProps<"div"> &
  VariantProps<typeof emptyVariants>;

function Empty({
  className,
  size = "default",
  padding = "default",
  ...props
}: EmptyProps) {
  return (
    <div
      data-slot="empty"
      data-size={size}
      data-padding={padding}
      className={cn(emptyVariants({ size, padding }), className)}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-full flex-col items-center gap-3", className)}
      {...props}
    />
  );
}

//   variant — default 는 그림(일러스트)을 담는 정사각형 칸, icon 은 회색 면 위의 아이콘.
const emptyMediaVariants = cva(
  `flex shrink-0 items-center justify-center [&_svg]:pointer-events-none
  [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: `size-40 group-data-[size=sm]/empty:size-32 [&_img]:max-h-full
        [&_img]:max-w-full [&>svg]:size-full`,
        icon: `size-12 rounded-16 bg-surface-neutral-secondary
        text-fg-neutral-secondary [&_svg:not([class*='size-'])]:size-6`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type EmptyMediaProps = React.ComponentProps<"div"> &
  VariantProps<typeof emptyMediaVariants>;

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: EmptyMediaProps) {
  return (
    <div
      data-slot="empty-media"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant }), className)}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        `max-w-full text-heading2 font-semibold text-fg-neutral-primary
        wrap-anywhere break-keep group-data-[size=sm]/empty:text-headline1`,
        className,
      )}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn(
        `max-w-full text-body2-reading font-normal text-fg-neutral-secondary
        wrap-anywhere break-keep`,
        className,
      )}
      {...props}
    />
  );
}

//   orientation — horizontal 은 버튼을 한 줄에(하나일 때도), vertical 은 같은 폭으로 쌓는다.
const emptyContentVariants = cva("flex min-w-0", {
  variants: {
    orientation: {
      horizontal: "items-center gap-3 group-data-[size=sm]/empty:gap-2.5",
      vertical:
        "flex-col items-stretch gap-2.5 group-data-[size=sm]/empty:gap-2",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

type EmptyContentProps = React.ComponentProps<"div"> &
  VariantProps<typeof emptyContentVariants>;

function EmptyContent({
  className,
  orientation = "horizontal",
  ...props
}: EmptyContentProps) {
  return (
    <div
      data-slot="empty-content"
      data-orientation={orientation}
      className={cn(emptyContentVariants({ orientation }), className)}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  emptyVariants,
  emptyMediaVariants,
  emptyContentVariants,
  type EmptyProps,
  type EmptyMediaProps,
  type EmptyContentProps,
};
