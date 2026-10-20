import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Separator 에 montage 의 모양을 입혔다 — 1px 선, 색은 line-neutral-primary.
// 더 옅은 선은 className 으로 색만 바꾸고(bg-line-neutral-secondary · bg-line-neutral-tertiary),
// 두께 · 길이도 className 으로 바꾼다(h-0.5 · w-1/2).
const separatorVariants = cva("shrink-0 bg-line-neutral-primary", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px self-stretch",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

type SeparatorProps = SeparatorPrimitive.Props &
  VariantProps<typeof separatorVariants>;

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation ?? "horizontal"}
      className={cn(separatorVariants({ orientation }), className)}
      {...props}
    />
  );
}

export { Separator, separatorVariants, type SeparatorProps };
