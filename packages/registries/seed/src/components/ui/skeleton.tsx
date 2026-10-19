import type * as React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// 불러오는 동안 올 자리의 윤곽 — 바탕 위로 밝은 띠(시머)가 왼쪽에서 오른쪽으로 지나간다.
const skeletonVariants = cva(
  [
    // 폭 · 높이는 props 로 받은 값 — 안 주면 변수가 비어 auto 가 된다
    `box-border inline-block w-(--skeleton-width) h-(--skeleton-height)
    overflow-hidden`,
    "after:block after:size-full after:bg-no-repeat after:content-['']",
    "after:animate-[slide-x_1.5s_var(--motion-ease-easing)_infinite_forwards]",
  ],
  {
    variants: {
      /** 0 기본 · 8 글 · 16 카드와 썸네일 · full 아바타 */
      radius: {
        "0": "rounded-none",
        "8": "rounded-r2",
        "16": "rounded-r4",
        full: "rounded-full",
      },
      /** neutral 일반 · magic AI 기능 */
      tone: {
        neutral: `bg-gray-200
        after:bg-[linear-gradient(90deg,var(--gradient-shimmer-neutral))]`,
        magic: `bg-bg-magic-weak
        after:bg-[linear-gradient(90deg,var(--gradient-shimmer-magic))]`,
      },
    },
    defaultVariants: { radius: "8", tone: "neutral" },
  },
);

type Length = number | string;

// 치수 토큰('x12') · 줄 높이 토큰('lineHeight.t4') · 'full' · px 숫자 · CSS 값을 받는다.
const toLength = (value: Length | undefined) => {
  if (value === undefined) return undefined;
  if (typeof value === "number") return `${value}px`;
  if (value === "full") return "100%";
  if (value.startsWith("lineHeight."))
    return `var(--line-height-${value.slice("lineHeight.".length)})`;
  return /^x\d/.test(value) ? `var(--dimension-${value})` : value;
};

export interface SkeletonProps
  extends React.ComponentProps<"div">, VariantProps<typeof skeletonVariants> {
  /** 폭 — 안 주면 내용만큼(auto) */
  width?: Length;
  /** 높이 — 글 대신 놓을 때는 그 글의 줄 높이 토큰('lineHeight.t4') */
  height?: Length;
}

function Skeleton({
  className,
  radius,
  tone,
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ radius, tone }), className)}
      style={
        {
          "--skeleton-width": toLength(width),
          "--skeleton-height": toLength(height),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
