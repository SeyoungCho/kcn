import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Spinner 에 montage 의 모양을 입혔다. 크기는 className 의 size-* 로 정한다(기본 size-8).
//   default — 옅은 회색 원호가 늘었다 줄었다 하며 돈다. 선이 currentColor 라 text-* 로 색을 바꾼다.
//   brand — 원 · 세모 · 네모가 차례로 부풀었다 줄며 돌고, 색이 브랜드 파랑 → 분홍 → 주황으로 오간다.
// 키프레임(spinner-*)은 global.css 에 있다.
const spinnerVariants = cva("size-8 shrink-0", {
  variants: {
    variant: {
      default: "text-line-neutral-primary-opaque",
      // 분홍 · 주황은 어두운 화면에서 한 단계 밝은 색을 쓴다
      brand: `fill-fg-brand-primary
      [--spinner-accent-orange:var(--color-red-orange-50)]
      [--spinner-accent-pink:var(--color-pink-60)]
      animate-[spinner-color_3.6s_linear_0.45s_infinite]
      dark:[--spinner-accent-orange:var(--color-red-orange-60)]
      dark:[--spinner-accent-pink:var(--color-pink-70)]`,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// brand 의 세 도형 — 한 바퀴(2.7s)의 1/3 씩 늦게 차례로 부푼다
const BRAND_SHAPES = [
  {
    name: "circle",
    // 첫 바퀴는 부드럽게 들어오고, 그다음부터 같은 박자로 되풀이한다
    className:
      "animate-[spinner-pop_2.7s_cubic-bezier(0.5,0,0.5,1),spinner-pop_2.7s_cubic-bezier(0.8,0,0.2,1)_2.7s_infinite]",
    d: "M2.1 12C2.1 6.53 6.53 2.1 12 2.1C17.47 2.1 21.9 6.53 21.9 12C21.9 17.47 17.47 21.9 12 21.9C6.53 21.9 2.1 17.47 2.1 12Z",
  },
  {
    name: "triangle",
    className:
      "animate-[spinner-pop_2.7s_cubic-bezier(0.8,0,0.2,1)_0.9s_infinite]",
    d: "M8.54 5C9.67 3.03 10.24 2.05 10.98 1.72C11.63 1.43 12.37 1.43 13.02 1.72C13.76 2.05 14.33 3.03 15.46 5L19.79 12.5C20.93 14.47 21.5 15.45 21.41 16.26C21.34 16.97 20.97 17.61 20.4 18.02C19.74 18.5 18.6 18.5 16.33 18.5H7.67C5.4 18.5 4.26 18.5 3.6 18.02C3.03 17.61 2.66 16.97 2.59 16.26C2.5 15.45 3.07 14.47 4.21 12.5L8.54 5Z",
  },
  {
    name: "square",
    className:
      "animate-[spinner-pop_2.7s_cubic-bezier(0.8,0,0.2,1)_1.8s_infinite]",
    d: "M8.51 2.85H15.49C16.3 2.85 16.96 2.85 17.49 2.89C18.05 2.94 18.55 3.04 19.02 3.28C19.75 3.65 20.35 4.25 20.72 4.98C20.96 5.45 21.06 5.95 21.11 6.51C21.15 7.04 21.15 7.7 21.15 8.51V15.49C21.15 16.3 21.15 16.96 21.11 17.49C21.06 18.05 20.96 18.55 20.72 19.02C20.35 19.75 19.75 20.35 19.02 20.72C18.55 20.96 18.05 21.06 17.49 21.11C16.96 21.15 16.3 21.15 15.49 21.15H8.51C7.7 21.15 7.04 21.15 6.51 21.11C5.95 21.06 5.45 20.96 4.98 20.72C4.25 20.35 3.65 19.75 3.28 19.02C3.04 18.55 2.94 18.05 2.89 17.49C2.85 16.96 2.85 16.3 2.85 15.49V8.51C2.85 7.7 2.85 7.04 2.89 6.51C2.94 5.95 3.04 5.45 3.28 4.98C3.65 4.25 4.25 3.65 4.98 3.28C5.45 3.04 5.95 2.94 6.51 2.89C7.04 2.85 7.7 2.85 8.51 2.85Z",
  },
] as const;

type SpinnerProps = React.ComponentProps<"svg"> &
  VariantProps<typeof spinnerVariants>;

function Spinner({ className, variant = "default", ...props }: SpinnerProps) {
  if (variant === "brand") {
    return (
      <svg
        data-slot="spinner"
        data-variant={variant}
        role="status"
        aria-label="Loading"
        viewBox="0 0 24 24"
        className={cn(spinnerVariants({ variant }), className)}
        {...props}
      >
        <g
          data-slot="spinner-shapes"
          className="origin-center
            animate-[spinner-fade-in_0.45s_cubic-bezier(0.5,0,0.5,1),spinner-rotate_1.8s_linear_infinite]"
        >
          {BRAND_SHAPES.map((shape) => (
            <path
              key={shape.name}
              data-slot="spinner-shape"
              d={shape.d}
              className={cn("origin-center scale-0", shape.className)}
            />
          ))}
        </g>
      </svg>
    );
  }

  return (
    <svg
      data-slot="spinner"
      data-variant={variant}
      role="status"
      aria-label="Loading"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      className={cn(spinnerVariants({ variant }), className)}
      {...props}
    >
      <circle
        data-slot="spinner-arc"
        cx="14"
        cy="14"
        r="12.5"
        strokeWidth="3"
        strokeLinecap="round"
        className="origin-center
          animate-[spinner-dash_5.333s_ease_infinite,spinner-rotate_2.2s_linear_infinite]"
      />
    </svg>
  );
}

export { Spinner, spinnerVariants, type SpinnerProps };
