import type * as React from "react";
import { Button } from "@base-ui/react/button";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

// 바탕색이 바뀌는 순서는 SEED 와 같다: 처리 중 > 비활성 > 손을 댐. 조건이 겹치지 않게 not- 으로 갈라 적는다.
const SOLID =
  "[border:none] font-bold data-disabled:text-fg-disabled data-disabled:not-data-loading:bg-bg-disabled";
const OUTLINE =
  "border border-solid border-stroke-neutral-muted bg-bg-transparent font-bold engaged:not-data-disabled:not-data-loading:bg-bg-transparent-pressed data-disabled:text-fg-disabled";
// 버튼 안의 진행 표시(ProgressCircle)가 읽는 색
const PROGRESS_ON_SOLID =
  "[--progress-track-color:var(--palette-static-white-alpha-300)]";
const PROGRESS_NEUTRAL =
  "[--progress-track-color:var(--palette-gray-500)] [--progress-range-color:var(--fg-neutral)]";

const actionButtonVariants = cva(
  [
    `relative box-border inline-flex shrink-0 cursor-pointer items-center
    justify-center align-middle`,
    "font-[inherit] whitespace-nowrap normal-case no-underline antialiased",
    // 아이콘은 글자 색을 따른다(비활성일 때도)
    `[--icon-color:currentColor] [--prefix-icon-color:currentColor]
    [--suffix-icon-color:currentColor]`,
    `outline-solid outline-(length:--dimension-x0_5)
    outline-offset-(--dimension-x0_5) outline-transparent
    focused:outline-stroke-focus-ring`,
    `data-disabled:cursor-not-allowed
    pressed:not-data-disabled:scale-(--feedback-scale)`,
    "[transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),var(--feedback-scale-transition),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
  ],
  {
    variants: {
      variant: {
        brandSolid: [
          SOLID,
          `bg-bg-brand-solid text-fg-on-brand-solid
          engaged:not-data-disabled:not-data-loading:bg-bg-brand-solid-pressed
          data-loading:bg-bg-brand-solid-pressed`,
          PROGRESS_ON_SOLID,
          "[--progress-range-color:var(--fg-on-brand-solid)]",
        ],
        neutralSolid: [
          SOLID,
          `bg-bg-neutral-solid text-fg-on-neutral-solid
          engaged:not-data-disabled:not-data-loading:bg-bg-neutral-solid-pressed
          data-loading:bg-bg-neutral-solid-pressed`,
          PROGRESS_ON_SOLID,
          "[--progress-range-color:var(--fg-on-neutral-solid)]",
        ],
        neutralWeak: [
          SOLID,
          `bg-bg-neutral-weak text-fg-neutral
          engaged:not-data-disabled:not-data-loading:bg-bg-neutral-weak-pressed
          data-loading:bg-bg-neutral-weak-pressed`,
          PROGRESS_NEUTRAL,
        ],
        criticalSolid: [
          SOLID,
          `bg-bg-critical-solid text-fg-on-critical-solid
          engaged:not-data-disabled:not-data-loading:bg-bg-critical-solid-pressed
          data-loading:bg-bg-critical-solid-pressed`,
          PROGRESS_ON_SOLID,
          "[--progress-range-color:var(--fg-on-critical-solid)]",
        ],
        brandOutline: [
          OUTLINE,
          `text-fg-brand [--progress-track-color:var(--palette-brand-200)]
          [--progress-range-color:var(--bg-brand-solid)]`,
        ],
        neutralOutline: [OUTLINE, "text-fg-neutral", PROGRESS_NEUTRAL],
        ghost: [
          `[border:none] bg-bg-transparent font-bold text-fg-neutral
          data-disabled:text-fg-disabled`,
          `engaged:not-data-disabled:not-data-loading:bg-bg-transparent-pressed
          data-loading:bg-bg-transparent-pressed`,
          PROGRESS_NEUTRAL,
        ],
      },
      size: {
        xsmall: `h-x8 rounded-full [--progress-size:14px]
        [--progress-thickness:2px] [--prefix-icon-size:var(--dimension-x3_5)]
        [--suffix-icon-size:var(--dimension-x3_5)]
        [--icon-size:var(--dimension-x3_5)]`,
        small: `h-x9 rounded-r2 [--progress-size:14px]
        [--progress-thickness:2px] [--prefix-icon-size:var(--dimension-x3_5)]
        [--suffix-icon-size:var(--dimension-x3_5)]
        [--icon-size:var(--dimension-x4)]`,
        medium: `h-x10 rounded-r2 [--progress-size:16px]
        [--progress-thickness:2px] [--prefix-icon-size:var(--dimension-x4)]
        [--suffix-icon-size:var(--dimension-x4)] [--icon-size:18px]`,
        large: `h-x13 rounded-r3 [--progress-size:18px]
        [--progress-thickness:2px] [--prefix-icon-size:22px]
        [--suffix-icon-size:22px] [--icon-size:22px]`,
      },
      layout: { withText: "", iconOnly: "" },
    },
    compoundVariants: [
      {
        size: "xsmall",
        layout: "withText",
        className: "gap-x1 px-x3.5 py-x1.5 text-t3",
      },
      { size: "xsmall", layout: "iconOnly", className: "min-w-x8 p-x1.5" },
      {
        size: "small",
        layout: "withText",
        className: "gap-x1 px-x3.5 py-x2 text-t4",
      },
      { size: "small", layout: "iconOnly", className: "min-w-x9 p-x2" },
      {
        size: "medium",
        layout: "withText",
        className: "gap-x1.5 px-x4 py-x2.5 text-t4",
      },
      { size: "medium", layout: "iconOnly", className: "min-w-x10 p-x2.5" },
      {
        size: "large",
        layout: "withText",
        className: "gap-x2 px-x5 py-x3.5 text-t6",
      },
      { size: "large", layout: "iconOnly", className: "min-w-x13 p-x3.5" },
    ],
    defaultVariants: {
      variant: "brandSolid",
      size: "medium",
      layout: "withText",
    },
  },
);

export interface ActionButtonProps
  extends
    Omit<Button.Props, "className" | "style">,
    VariantProps<typeof actionButtonVariants> {
  className?: string;
  style?: React.CSSProperties;
  /** 처리 중 — 내용 자리에 진행 표시를 겹쳐 그린다. 누르지 못하게 하려면 disabled 를 같이 준다 */
  loading?: boolean;
}

// 버튼이 아닌 요소(링크)로 그릴 때 — 버튼 노릇(role="button" · 키보드 흉내)을 입히지 않고 모양만 입힌다.
function Plain({
  render,
  disabled,
  ...props
}: { render: ActionButtonProps["render"]; disabled: boolean } & Record<
  string,
  unknown
>) {
  return useRender({ render, state: { disabled }, defaultTagName: "a", props });
}

/**
 * 버튼. 다른 요소로 그리려면 `render`(Base UI) —
 * 링크는 `<ActionButton nativeButton={false} render={<Link to="…" />}>글자</ActionButton>`.
 * 아이콘만 있는 버튼(layout="iconOnly")에는 aria-label 을 준다.
 */
function ActionButton({
  ref,
  className,
  variant,
  size,
  layout,
  loading = false,
  disabled = false,
  nativeButton = true,
  render,
  children,
  ...props
}: ActionButtonProps) {
  const { scaleFeedbackRef, scaleFeedbackClassName } = useScaleFeedback(ref);
  const shared = {
    ref: scaleFeedbackRef,
    "data-slot": "action-button",
    "data-loading": loading ? "" : undefined,
    className: cn(
      scaleFeedbackClassName,
      actionButtonVariants({ variant, size, layout }),
      className,
    ),
    children: loading ? (
      <LoadingIndicator>{children}</LoadingIndicator>
    ) : (
      children
    ),
    ...props,
  };

  if (!nativeButton) {
    return (
      <Plain
        render={render}
        disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        aria-disabled={disabled || undefined}
        {...shared}
      />
    );
  }
  return <Button disabled={disabled} render={render} {...shared} />;
}

export { ActionButton, actionButtonVariants };
