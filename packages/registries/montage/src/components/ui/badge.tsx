"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Badge 에 montage 의 모양을 입혔다.
//   variant — default 는 옅게 칠한 바탕, outline 은 옅은 테두리만 두른다.
//   color — 글자 · 바탕 · 테두리를 한 색(--badge-color)에서 뽑는다. 바탕은 그 색의 8%, 테두리는 43% 다.
//     neutral 만 회색 면(surface)과 선(line) 토큰을 따로 쓴다.
// 누르는 동작이 없는 표시용 라벨이다 — 눌러야 하면 Button 을 쓴다.
const badgeVariants = cva(
  `inline-flex w-fit shrink-0 items-center justify-center overflow-hidden
  font-medium whitespace-nowrap text-(--badge-color) [&>svg]:pointer-events-none
  [&>svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: "bg-(--badge-color)/8",
        outline: "bg-transparent inset-ring inset-ring-(--badge-color)/43",
      },
      color: {
        neutral: "[--badge-color:var(--fg-neutral-tertiary)]",
        brand: "[--badge-color:var(--fg-brand-primary)]",
        positive: "[--badge-color:var(--fg-positive-primary)]",
        cautionary: "[--badge-color:var(--fg-cautionary-primary)]",
        destructive: "[--badge-color:var(--fg-negative-strong)]",
        lime: "[--badge-color:var(--fg-accent-lime)]",
        cyan: "[--badge-color:var(--fg-accent-cyan)]",
        "light-blue": "[--badge-color:var(--fg-accent-light-blue)]",
        violet: "[--badge-color:var(--fg-accent-violet)]",
        purple: "[--badge-color:var(--fg-accent-purple)]",
        pink: "[--badge-color:var(--fg-accent-pink)]",
      },
      size: {
        xs: `gap-0.5 rounded-8 px-1.5 py-0.75 text-caption2
        [&>svg:not([class*='size-'])]:size-3`,
        sm: `gap-1 rounded-8 px-1.5 py-1 text-caption1
        [&>svg:not([class*='size-'])]:size-3.5`,
        default: `gap-1 rounded-10 px-2 py-1.25 text-label2
        [&>svg:not([class*='size-'])]:size-3.5`,
      },
    },
    compoundVariants: [
      {
        color: "neutral",
        variant: "default",
        className: "bg-surface-neutral-secondary",
      },
      {
        color: "neutral",
        variant: "outline",
        className: "inset-ring-line-neutral-primary",
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "neutral",
      size: "default",
    },
  },
);

type BadgeProps = Omit<useRender.ComponentProps<"span">, "color"> &
  VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant = "default",
  color = "neutral",
  size = "default",
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, color, size }), className),
      },
      props,
    ),
    render,
    state: { slot: "badge", variant, color, size },
  });
}

export { Badge, badgeVariants, type BadgeProps };
