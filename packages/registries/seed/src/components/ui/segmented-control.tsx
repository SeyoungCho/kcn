"use client";

import * as React from "react";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

// 누를 때 바탕은 그대로 두고 안의 내용만 줄이는 상자(SEED 의 content scale) — 부모의 배치(flex · gap …)를 그대로 물려받아 없는 것처럼 놓인다.
// 줄이는 비율은 부모가 --content-scale 로 준다.
const CONTENT_SCALE = [
  "[display:inherit] [flex-direction:inherit] [flex-wrap:inherit] [align-items:inherit] [align-content:inherit]",
  "[justify-content:inherit] [justify-items:inherit] gap-[inherit]",
  "grid-cols-[inherit] grid-rows-[inherit] [grid-template-areas:inherit]",
  "[grid-auto-flow:inherit] [grid-auto-columns:inherit] [grid-auto-rows:inherit]",
  "min-h-0 min-w-0 flex-auto [grid-area:1/1/-1/-1] place-self-stretch",
  "scale-(--content-scale) [transition:var(--feedback-scale-transition)]",
].join(" ");

export interface SegmentedControlProps extends Omit<
  RadioGroupPrimitive.Props<string>,
  "className" | "style" | "render" | "value" | "defaultValue" | "onValueChange"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * 둘 · 셋 가운데 하나를 고르는 칸(라디오 묶음). 고른 칸의 흰 바탕(indicator)이 옆으로 미끄러진다.
 * 읽어 주는 이름(`aria-label` · `aria-labelledby`)을 준다.
 */
function SegmentedControl({
  className,
  style,
  children,
  value,
  defaultValue,
  onValueChange,
  ref,
  ...props
}: SegmentedControlProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  // 고른 칸이 몇 번째인지 · 칸이 몇 개인지는 그려진 요소에서 센다(칸을 다른 부품으로 감싸도 맞게).
  // 처음 값은 children 에서 미리 센다 — 그린 뒤에야 알면 흰 바탕이 왼쪽 밖에서 미끄러져 들어온다.
  const [segment, setSegment] = React.useState(() => {
    const items = React.Children.toArray(children).filter((child) =>
      React.isValidElement<{ value?: string }>(child),
    );
    const current = value ?? defaultValue;
    return {
      index: items.findIndex((item) => item.props.value === current),
      count: items.length,
    };
  });

  // 값을 밖에서 쥐지 않을 때는(defaultValue) 고른 칸이 바뀌어도 이 부품이 다시 그려지지 않는다 — 바뀔 때마다 다시 세게 한다.
  const [, recount] = React.useReducer((tick: number) => tick + 1, 0);

  React.useLayoutEffect(() => {
    const items = [
      ...(rootRef.current?.querySelectorAll(
        '[data-slot="segmented-control-item"]',
      ) ?? []),
    ];
    const next = {
      index: items.findIndex((item) => item.hasAttribute("data-checked")),
      count: items.length,
    };
    setSegment((previous) =>
      previous.index === next.index && previous.count === next.count
        ? previous
        : next,
    );
  });

  return (
    <RadioGroupPrimitive<string>
      ref={(node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      data-slot="segmented-control"
      className={cn(
        `relative isolate box-border grid max-w-full grid-flow-col
        auto-cols-[1fr] auto-rows-[1fr] items-center rounded-full
        bg-bg-neutral-weak-alpha p-x1`,
        className,
      )}
      value={value}
      defaultValue={defaultValue}
      style={
        {
          "--segment-index": String(segment.index),
          "--segment-count": String(segment.count),
          ...style,
        } as React.CSSProperties
      }
      onValueChange={(value) => {
        recount();
        onValueChange?.(value);
      }}
      {...props}
    >
      {children}
      <div
        data-slot="segmented-control-indicator"
        className={cn(
          `absolute inset-y-x1 left-x1 -z-1
          w-[calc((100%-var(--dimension-x1)*2)/var(--segment-count))]
          rounded-full bg-gray-00`,
          "inset-ring inset-ring-stroke-neutral-muted",
          `transform-[translateX(calc(var(--segment-index)*100%))]
          will-change-transform transition-[transform] duration-d4 ease-easing`,
        )}
      />
    </RadioGroupPrimitive>
  );
}

export interface SegmentedControlItemProps extends Omit<
  RadioPrimitive.Root.Props<string>,
  "className" | "render" | "ref" | "inputRef" | "value"
> {
  value: string;
  className?: string;
  /** 읽어 주는 이름 같은 접근성 속성 — 실제로 초점을 받는 칸에 붙는다 */
  inputProps?: React.AriaAttributes;
  /** 칸 요소 */
  rootRef?: React.Ref<HTMLElement>;
  /** 폼에 값을 싣는 숨은 input */
  ref?: React.Ref<HTMLInputElement>;
}

function SegmentedControlItem({
  className,
  children,
  inputProps,
  rootRef,
  ref,
  ...props
}: SegmentedControlItemProps) {
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLElement>(rootRef);
  return (
    <RadioPrimitive.Root<string>
      ref={scaleFeedbackRef}
      inputRef={ref}
      data-slot="segmented-control-item"
      className={cn(
        scaleFeedbackClassName,
        `box-border flex h-full min-h-8.5 min-w-21.5 cursor-pointer items-center
        justify-center gap-x1.5 rounded-full px-x6 py-x1.5`,
        `text-center text-t5 font-bold wrap-break-word text-fg-neutral-subtle
        select-none data-checked:text-fg-neutral`,
        `outline-solid outline-(length:--dimension-x0_5)
        outline-offset-(--dimension-x0_5) outline-transparent
        focused:outline-stroke-focus-ring`,
        "[transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),color_var(--motion-duration-color-transition)_var(--motion-ease-easing),box-shadow_var(--motion-duration-color-transition)_var(--motion-ease-easing),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
        "data-disabled:cursor-not-allowed data-disabled:text-fg-disabled",
        `data-disabled:data-checked:bg-bg-disabled
        data-disabled:data-checked:inset-ring
        data-disabled:data-checked:inset-ring-stroke-neutral-muted`,
        // 손을 댔을 때 — 고른 칸과 안 고른 칸의 바탕색이 다르다
        `engaged:not-data-disabled:inset-ring
        engaged:not-data-disabled:inset-ring-stroke-neutral-muted`,
        `engaged:not-data-disabled:data-checked:bg-gray-100
        engaged:not-data-disabled:not-data-checked:bg-bg-neutral-weak-pressed`,
        `[--content-scale:1]
        pressed:not-data-disabled:[--content-scale:var(--feedback-scale)]`,
        className,
      )}
      {...inputProps}
      {...props}
    >
      <span
        data-slot="segmented-control-item-content"
        className={CONTENT_SCALE}
      >
        {children}
      </span>
    </RadioPrimitive.Root>
  );
}

export { SegmentedControl, SegmentedControlItem };
