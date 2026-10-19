import type * as React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  `box-border inline-flex min-w-0 items-center overflow-hidden text-start
  normal-case no-underline antialiased`,
  {
    variants: {
      size: {
        medium: "min-h-x5 gap-x0.5 rounded-r1 px-x1.5 py-x0.5 text-t1",
        large: "min-h-x6 gap-x0.5 rounded-r1.5 px-x2 py-x1 text-t2",
      },
      variant: {
        weak: "font-medium",
        solid: "font-bold",
        outline: "font-bold inset-ring",
      },
      tone: {
        neutral: "",
        brand: "",
        informative: "",
        positive: "",
        warning: "",
        critical: "",
      },
    },
    compoundVariants: [
      {
        tone: "neutral",
        variant: "weak",
        className: "bg-bg-neutral-weak text-fg-neutral-muted",
      },
      {
        tone: "neutral",
        variant: "solid",
        className: "bg-gray-800 text-fg-on-neutral-solid",
      },
      {
        tone: "neutral",
        variant: "outline",
        className: "text-fg-neutral-muted inset-ring-stroke-neutral-muted",
      },
      {
        tone: "brand",
        variant: "weak",
        className: "bg-bg-brand-weak text-fg-brand-contrast",
      },
      {
        tone: "brand",
        variant: "solid",
        className: "bg-bg-brand-solid text-fg-on-brand-solid",
      },
      {
        tone: "brand",
        variant: "outline",
        className: "text-fg-brand inset-ring-stroke-brand-weak",
      },
      {
        tone: "informative",
        variant: "weak",
        className: "bg-bg-informative-weak text-fg-informative-contrast",
      },
      {
        tone: "informative",
        variant: "solid",
        className: "bg-bg-informative-solid text-fg-on-informative-solid",
      },
      {
        tone: "informative",
        variant: "outline",
        className: "text-fg-informative inset-ring-stroke-informative-weak",
      },
      {
        tone: "positive",
        variant: "weak",
        className: "bg-bg-positive-weak text-fg-positive-contrast",
      },
      {
        tone: "positive",
        variant: "solid",
        className: "bg-bg-positive-solid text-fg-on-positive-solid",
      },
      {
        tone: "positive",
        variant: "outline",
        className: "text-fg-positive inset-ring-stroke-positive-weak",
      },
      {
        tone: "warning",
        variant: "weak",
        className: "bg-bg-warning-weak text-fg-warning-contrast",
      },
      {
        tone: "warning",
        variant: "solid",
        className: "bg-bg-warning-solid text-fg-on-warning-solid",
      },
      {
        tone: "warning",
        variant: "outline",
        className: "text-fg-warning inset-ring-stroke-warning-weak",
      },
      {
        tone: "critical",
        variant: "weak",
        className: "bg-bg-critical-weak text-fg-critical-contrast",
      },
      {
        tone: "critical",
        variant: "solid",
        className: "bg-bg-critical-solid text-fg-on-critical-solid",
      },
      {
        tone: "critical",
        variant: "outline",
        className: "text-fg-critical inset-ring-stroke-critical-weak",
      },
    ],
    defaultVariants: { size: "medium", variant: "solid", tone: "neutral" },
  },
);

const prefixVariants = cva(
  `inline-flex shrink-0 items-center justify-center text-inherit
  [--icon-color:currentColor] [--icon-size:100%]`,
  {
    variants: { size: { medium: "size-x3", large: "size-x3.5" } },
    defaultVariants: { size: "medium" },
  },
);

export interface BadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "prefix">,
    VariantProps<typeof badgeVariants> {
  /** 글자 앞에 놓는 아이콘 — `<IconCheckmarkLine />` 처럼 요소로 준다 */
  prefix?: React.ReactElement;
}

function Badge({
  className,
  size,
  variant,
  tone,
  prefix,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ size, variant, tone }), className)}
      {...props}
    >
      {prefix != null ? (
        <span data-slot="badge-prefix" className={prefixVariants({ size })}>
          <Icon svg={prefix} size="full" />
        </span>
      ) : null}
      <span
        data-slot="badge-label"
        className="min-w-0 shrink overflow-hidden text-ellipsis
          whitespace-nowrap"
      >
        {children}
      </span>
    </span>
  );
}

export { Badge, badgeVariants };
