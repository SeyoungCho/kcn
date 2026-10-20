import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Spinner 에 t-flavored 의 모양을 입혔다.
//   variant — default = primary(파랑), dark = 회색, light = 어두운 바탕 위의 흰색.
//     선은 currentColor 라 className 의 text-* 로도 색을 바꿀 수 있다.
//   size — sm · default · lg (24 · 36 · 48px).
// 원이 1.8s 에 한 바퀴 돌고 호가 늘었다 줄었다 한다. 짧은 로딩에 깜빡이지 않도록 0.7s 기다렸다가 0.3s 동안 나타난다.
// 레이블은 Spinner 아래에 글을 따로 놓아 만든다(사이 14px, text-t6 · grey-800 · 가운데 정렬).
const spinnerVariants = cva(
  `shrink-0
  animate-[spinner-fade-in_0.3s_ease-in-out_0.7s_both,spinner-rotate_1.8s_linear_infinite]`,
  {
    variants: {
      variant: {
        default: "text-blue-500",
        dark: "text-grey-600",
        light: "text-white",
      },
      size: {
        sm: "size-6",
        default: "size-9",
        lg: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type SpinnerProps = React.ComponentProps<"svg"> &
  VariantProps<typeof spinnerVariants>;

function Spinner({
  className,
  variant = "default",
  size = "default",
  ...props
}: SpinnerProps) {
  return (
    <svg
      data-slot="spinner"
      data-variant={variant}
      data-size={size}
      role="status"
      aria-label="Loading"
      viewBox="0 0 66 66"
      fill="none"
      stroke="currentColor"
      className={cn(spinnerVariants({ variant, size }), className)}
      {...props}
    >
      <circle
        data-slot="spinner-arc"
        cx="33"
        cy="33"
        r="30"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="180"
        className="origin-center
          animate-[spinner-dash_1.8s_ease-in-out_infinite]"
      />
    </svg>
  );
}

export { Spinner, spinnerVariants, type SpinnerProps };
