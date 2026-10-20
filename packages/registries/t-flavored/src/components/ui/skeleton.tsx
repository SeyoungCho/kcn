import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Skeleton 에 t-flavored 의 모양을 입혔다. 막대 하나이고 크기 · 둥글기는 className 으로 준다.
//   variant — default = grey, white = 흰 바탕(회색 위에 놓을 때), secondary = 반투명 회색.
// 흐린(0.2 · 0.96배) 상태와 또렷한(1 · 1배) 상태를 0.6s 씩 오간다.
// 위에서 아래로 차례로 깜빡이게 하려면 줄마다 --skeleton-delay 를 0.1s 씩 늘린다 — 조상에 두면 안의 막대가 모두 따른다.
const skeletonVariants = cva(
  `rounded-md
  animate-[skeleton-pulse_0.6s_cubic-bezier(0.6,0,0,0.6)_var(--skeleton-delay,0s)_infinite_alternate_both]`,
  {
    variants: {
      variant: {
        default: "bg-grey-100",
        white: "bg-background",
        secondary: "bg-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type SkeletonProps = React.ComponentProps<"div"> &
  VariantProps<typeof skeletonVariants>;

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
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
