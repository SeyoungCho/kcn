import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Skeleton 에 montage 의 모양을 입혔다. 너비는 기본으로 꽉 차고, 크기 · 둥글기 · 색은 className 으로 바꾼다.
//   text — 글자 한 줄 높이에 위아래를 조금 비운 막대. rectangle — 사각형(둥글기 없음). circle — 원(아바타 자리).
// 반쯤 비쳤다 또렷해졌다를 천천히 되풀이한다. 멈추려면 animate-none.
const skeletonVariants = cva(
  "w-full shrink-0 animate-[skeleton-pulse_2s_ease-in-out_infinite]",
  {
    variants: {
      variant: {
        // 배경을 content 상자에만 칠해 위아래 2px 을 비운다. 세로 반경을 그만큼 키워야 막대 모서리가 3px 이 된다
        // (3px 은 맞는 반경 토큰이 없다)
        text: "h-5.5 rounded-[3px/5px] bg-accent bg-clip-content py-0.5",
        rectangle: "bg-muted",
        circle: "rounded-full bg-accent",
      },
    },
    defaultVariants: {
      variant: "text",
    },
  },
);

type SkeletonProps = React.ComponentProps<"div"> &
  VariantProps<typeof skeletonVariants>;

function Skeleton({ className, variant = "text", ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      data-variant={variant}
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants, type SkeletonProps };
