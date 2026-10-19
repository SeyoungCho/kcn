import type * as React from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

// 쪽 나눔의 이전 · 다음 버튼 — 아이콘 하나만 담는다.
const PAGINATION_BUTTON = [
  "relative isolate m-0 box-border inline-flex size-x10 shrink-0 cursor-pointer items-center justify-center rounded-r2 border-none bg-transparent p-0",
  "align-middle font-[inherit] whitespace-nowrap normal-case no-underline antialiased",
  "[--icon-color:var(--fg-neutral)] [--icon-size:var(--dimension-x4)]",
  // 바탕 — 손을 대면 칠해진다.
  "before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:bg-bg-transparent before:content-['']",
  "before:transition-[background-color] before:duration-color-transition before:ease-easing",
  "not-data-disabled:engaged:before:bg-bg-transparent-pressed",
  // 크기와 상관없이 같은 비율로 줄어든다(다른 버튼처럼 2px 만큼이 아니다).
  "scale-[1] not-data-disabled:pressed:scale-(--motion-scale-s97)",
  "outline-solid outline-(length:--dimension-x0_5) outline-offset-(--dimension-x0_5) outline-transparent focused:outline-stroke-focus-ring",
  "[transition:var(--feedback-scale-transition),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
  "data-disabled:cursor-not-allowed data-disabled:[--icon-color:var(--fg-disabled)]",
].join(" ");

export interface PaginationButtonProps extends Omit<
  React.ComponentProps<"button">,
  "children"
> {
  /** 그릴 아이콘 — `<IconChevronLeftLine />` 처럼 요소로 준다 */
  children: React.ReactElement;
}

function PaginationButton({
  children,
  className,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      data-slot="pagination-button"
      className={cn(PAGINATION_BUTTON, className)}
      {...props}
    >
      <Icon svg={children} />
    </button>
  );
}

export { PaginationButton };
