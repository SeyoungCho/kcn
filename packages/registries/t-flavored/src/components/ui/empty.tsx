import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Empty 에 t-flavored 의 모양을 입혔다.
// 간격: 그림 아래 12px, 제목과 설명 사이 4px, 설명과 버튼 사이 16px. 둘레는 위 32 · 옆 40 · 아래 40px.
// 제목은 <h5> 라 읽어 주는 기기가 제목으로 읽는다.
function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        `flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-4
        px-10 pt-8 pb-10 text-center`,
        className,
      )}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-full flex-col items-center", className)}
      {...props}
    />
  );
}

//   variant — default 는 그림을 그대로(60px 그림이면 size-15), icon 은 24px 아이콘.
const emptyMediaVariants = cva(
  `mb-3 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none
  [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: "bg-transparent [&_img]:object-contain",
        icon: "text-grey-900 [&_svg:not([class*='size-'])]:size-6",
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

function EmptyTitle({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      data-slot="empty-title"
      className={cn(
        `max-w-full text-t5 font-semibold text-grey-900 wrap-anywhere
        break-keep`,
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
        `mt-1 max-w-full text-t6 text-grey-700 wrap-anywhere break-keep
        [&>a]:underline [&>a]:underline-offset-4`,
        className,
      )}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full min-w-0 flex-col items-center gap-4",
        className,
      )}
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
  emptyMediaVariants,
  type EmptyMediaProps,
};
