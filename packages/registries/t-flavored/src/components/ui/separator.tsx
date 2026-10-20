import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Separator 에 t-flavored 의 모양을 입혔다.
//   variant — default · inset 은 항목을 나누는 머리카락 선이고 inset 은 앞을 24px 띄운다. section 은 구간을 나누는 16px 회색 띠다(두께는 h-* 로 바꾼다).
// 머리카락 선은 1px 칸의 앞쪽 절반(0.5px)만 보인다.
const separatorVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "bg-grey-opacity-200/70",
      inset: "bg-grey-opacity-200/70",
      section: "bg-surface-grey",
    },
    orientation: {
      horizontal: "w-full",
      vertical: "self-stretch",
    },
  },
  compoundVariants: [
    {
      variant: ["default", "inset"],
      orientation: "horizontal",
      className: "h-px origin-top scale-y-50",
    },
    {
      variant: ["default", "inset"],
      orientation: "vertical",
      className: "w-px origin-left scale-x-50",
    },
    // 앞의 여백만큼 폭을 줄인다 — 가운데 정렬된 부모 안에서도 오른쪽 끝이 맞는다
    {
      variant: "inset",
      orientation: "horizontal",
      className: "ms-6 w-[calc(100%-24px)]",
    },
    { variant: "inset", orientation: "vertical", className: "mt-6" },
    { variant: "section", orientation: "horizontal", className: "h-4" },
    { variant: "section", orientation: "vertical", className: "w-4" },
  ],
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
  },
});

type SeparatorProps = SeparatorPrimitive.Props &
  VariantProps<typeof separatorVariants>;

function Separator({
  className,
  variant = "default",
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      data-variant={variant}
      orientation={orientation ?? "horizontal"}
      className={cn(separatorVariants({ variant, orientation }), className)}
      {...props}
    />
  );
}

export { Separator, separatorVariants, type SeparatorProps };
