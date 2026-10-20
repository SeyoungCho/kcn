"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Badge 에 t-flavored 의 모양을 입혔다.
//   variant — 색과 세기(fill · weak)를 하나로 고른다. 이름은 Button 과 맞췄다:
//     default = blue/fill, weak = blue/weak, dark = grey/fill, secondary = grey/weak,
//     destructive = red/fill, destructive-weak = red/weak, 그 밖의 색은 teal · green · yellow 와 그 -weak.
//   size — xs · sm · default · lg.
// fill 의 색은 테마와 상관없이 같아야 한다. 어둡게(dark:)에서는 팔레트가 바뀌므로 가장 가까운 단계로 옮긴다.
const badgeVariants = cva(
  `inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden
  align-middle font-bold whitespace-nowrap outline-none focus-visible:ring-3
  focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3`,
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        weak: "bg-blue-500/16 text-blue-700 dark:text-blue-600",
        dark: "bg-grey-700 text-white dark:bg-grey-300",
        secondary: "bg-grey-700/16 text-grey-700",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-weak": "bg-red-500/16 text-red-700 dark:text-red-600",
        teal: "bg-teal-600 text-white dark:bg-teal-400",
        "teal-weak":
          "bg-teal-700/16 text-teal-700 dark:bg-teal-400/16 dark:text-teal-500",
        green: "bg-green-600 text-white dark:bg-green-400",
        "green-weak": "bg-green-600/16 text-green-700 dark:text-green-500",
        yellow:
          "bg-yellow-500 text-grey-800 dark:bg-yellow-600 dark:text-grey-200",
        "yellow-weak": "bg-yellow-600/16 text-yellow-900 dark:text-yellow-400",
      },
      // xs 의 10px 글자와 9 · 11 · 13px 둥글기는 토큰에 없어 값으로 적는다
      size: {
        xs: "rounded-[9px] px-1.75 py-0.75 text-[10px]/[15px] font-semibold",
        sm: "rounded-[11px] px-1.75 py-0.75 text-st12",
        default: "rounded-lg px-1.75 py-0.75 text-t7",
        lg: "rounded-[13px] px-2 py-1 text-st11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type BadgeProps = useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      { className: cn(badgeVariants({ variant, size }), className) },
      props,
    ),
    render,
    state: { slot: "badge", variant, size },
  });
}

export { Badge, badgeVariants, type BadgeProps };
