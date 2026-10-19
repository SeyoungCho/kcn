import type * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// 크기 · 굵기 · 색은 변수로 둔다 — size · tone 이 'inherit' 이면 부모 부품(버튼 등)이 정한 값을 쓴다:
// --progress-size · --progress-thickness · --progress-track-color · --progress-range-color
const progressCircleVariants = cva(
  "relative box-border inline-flex size-(--progress-size)",
  {
    variants: {
      tone: {
        neutral: `[--progress-track-color:var(--palette-gray-200)]
        [--progress-range-color:var(--palette-gray-500)]`,
        brand: `[--progress-track-color:var(--palette-brand-200)]
        [--progress-range-color:var(--bg-brand-solid)]`,
        staticWhite: `[--progress-track-color:var(--palette-static-white-alpha-300)]
        [--progress-range-color:var(--palette-static-white)]`,
        inherit: "",
      },
      size: {
        "24": "[--progress-size:var(--dimension-x6)] [--progress-thickness:3px]",
        "40": `[--progress-size:var(--dimension-x10)]
        [--progress-thickness:5px]`,
        inherit: "",
      },
    },
    defaultVariants: { tone: "neutral", size: "40" },
  },
);

// 원의 자리와 반지름 — 크기에서 굵기의 절반을 뺀다(선이 잘리지 않게).
const circle = [
  "[--progress-radius:calc(var(--progress-size)/2-var(--progress-thickness)/2)]",
  "[cx:calc(var(--progress-size)/2)] [cy:calc(var(--progress-size)/2)] [r:var(--progress-radius)]",
  "fill-transparent [stroke-width:var(--progress-thickness)]",
].join(" ");

export interface ProgressCircleProps extends Omit<
  React.SVGAttributes<SVGSVGElement>,
  "children"
> {
  ref?: React.Ref<SVGSVGElement>;
  /** 지금 값. 안 주면 끝을 모르는 진행(빙글빙글 돈다) */
  value?: number;
  /** @default 0 */
  minValue?: number;
  /** @default 100 */
  maxValue?: number;
  /** @default 'neutral' */
  tone?: "neutral" | "brand" | "staticWhite" | "inherit";
  /** @default '40' */
  size?: "24" | "40" | "inherit" | 24 | 40;
}

function ProgressCircle({
  className,
  value,
  minValue = 0,
  maxValue = 100,
  tone,
  size,
  ...props
}: ProgressCircleProps) {
  const indeterminate = typeof value !== "number";
  const percent = indeterminate
    ? -1
    : ((value - minValue) / (maxValue - minValue)) * 100;
  const state =
    value === maxValue
      ? "complete"
      : indeterminate
        ? "indeterminate"
        : "loading";

  return (
    <svg
      data-slot="progress-circle"
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
      aria-valuetext={indeterminate ? "loading..." : `${percent} percent`}
      data-progress-state={state}
      className={cn(
        progressCircleVariants({
          tone,
          size:
            size === undefined
              ? undefined
              : (String(size) as "24" | "40" | "inherit"),
        }),
        indeterminate &&
          "animate-[rotate_1.2s_cubic-bezier(0.35,0.25,0.65,0.75)_infinite]",
        className,
      )}
      {...props}
    >
      <circle
        data-slot="progress-circle-track"
        className={cn(circle, "stroke-(--progress-track-color)")}
      />
      <circle
        data-slot="progress-circle-range"
        className={cn(
          circle,
          "stroke-(--progress-range-color) [stroke-linecap:round]",
          `transition-[stroke-dasharray] duration-300
          ease-[cubic-bezier(0,0,0.15,1)]`,
          // 12시 방향에서 시작하게 돌려 둔다
          "origin-center transform-[rotate(-90deg)]",
          "[--circumference:calc(2*3.14159*var(--progress-radius))]",
          "[stroke-dashoffset:calc(var(--circumference)*((100-var(--progress-percent))/100))]",
          indeterminate
            ? "animate-[progress-circle-head_1.2s_cubic-bezier(0.35,0,0.65,1)_infinite_normal_none_running,progress-circle-tail_1.2s_cubic-bezier(0.35,0,0.65,0.6)_infinite_normal_none_running]"
            : "[stroke-dasharray:var(--circumference)]",
          value === 0 && "opacity-0",
        )}
        style={{ "--progress-percent": percent } as React.CSSProperties}
      />
    </svg>
  );
}

export { ProgressCircle, progressCircleVariants };
