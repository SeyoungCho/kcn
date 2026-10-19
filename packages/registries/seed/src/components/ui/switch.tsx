import type * as React from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

const switchVariants = cva(
  `group/switch relative isolate box-border inline-flex cursor-pointer
  items-start justify-between align-top has-data-disabled:cursor-not-allowed`,
  {
    variants: {
      size: {
        "16": "min-h-x6 gap-x1.5",
        "24": "min-h-x6 gap-x2",
        "32": "min-h-x8 gap-x2.5",
      },
    },
    defaultVariants: { size: "32" },
  },
);

const switchLabelVariants = cva(
  `font-medium text-fg-neutral transition-opacity duration-d1 ease-easing
  group-has-data-disabled/switch:opacity-[0.58]`,
  {
    variants: {
      size: {
        "16": "mt-[calc(var(--dimension-x6)/2-var(--line-height-t3)/2)] text-t3",
        "24": "mt-[calc(var(--dimension-x6)/2-var(--line-height-t4)/2)] text-t4",
        "32": "mt-[calc(var(--dimension-x8)/2-var(--line-height-t5)/2)] text-t5",
      },
    },
    defaultVariants: { size: "32" },
  },
);

// 손잡이가 움직이는 길. 켜짐(checked) · 못 씀(disabled)은 Base UI 의 상태를 받아 고른다.
// 누르는 것은 글자까지 포함한 줄 전체(group/switch)에서도 걸린다.
const switchmarkVariants = cva(
  [
    "relative box-border block rounded-full",
    `outline-2 outline-offset-2 outline-transparent
    focused:outline-stroke-focus-ring`,
    "transition-[background-color,opacity,scale,outline-color]",
    "duration-[var(--motion-duration-d1),var(--motion-duration-d1),var(--motion-duration-pressed-scale),var(--motion-duration-d3)]",
    "ease-[var(--motion-ease-easing),var(--motion-ease-easing),var(--motion-ease-pressed-scale),var(--motion-ease-easing)]",
    "[transition-delay:20ms,0s,0s,0s]",
  ],
  {
    variants: {
      tone: { neutral: "", brand: "" },
      size: {
        "16": "my-[calc((var(--dimension-x6)-16px)/2)] min-h-4 min-w-6.5 p-0.5",
        "24": "my-[calc((var(--dimension-x6)-24px)/2)] min-h-6 min-w-9.5 p-0.5",
        "32": "my-[calc((var(--dimension-x8)-32px)/2)] min-h-8 min-w-13 p-0.75",
      },
      checked: { true: "", false: "bg-gray-600" },
      disabled: {
        true: "opacity-[0.38]",
        false: `pressed:scale-(--feedback-scale)
        group-pressed/switch:scale-(--feedback-scale)`,
      },
    },
    compoundVariants: [
      {
        tone: "neutral",
        checked: true,
        disabled: false,
        className: "bg-bg-neutral-solid",
      },
      {
        tone: "neutral",
        checked: true,
        disabled: true,
        className: "bg-gray-600",
      },
      { tone: "brand", checked: true, className: "bg-bg-brand-solid" },
    ],
    defaultVariants: {
      tone: "brand",
      size: "32",
      checked: false,
      disabled: false,
    },
  },
);

const switchThumbVariants = cva(
  `block rounded-full transition-[transform,background-color]
  duration-[var(--motion-duration-d3),var(--motion-duration-d1)]
  ease-[var(--motion-ease-easing),var(--motion-ease-easing)]
  [transition-delay:0s,20ms]`,
  {
    variants: {
      tone: { neutral: "", brand: "bg-static-white" },
      size: { "16": "size-3", "24": "size-5", "32": "size-6.5" },
      checked: { true: "", false: "transform-[scale(0.8)]" },
      disabled: { true: "", false: "" },
    },
    compoundVariants: [
      { tone: "neutral", disabled: false, className: "bg-fg-on-neutral-solid" },
      {
        tone: "neutral",
        disabled: true,
        className: "bg-static-black-alpha-700",
      },
      // 켜면 길의 폭 − 높이만큼 옆으로 간다
      {
        size: "16",
        checked: true,
        className: "transform-[scale(1)_translateX(calc(26px-16px))]",
      },
      {
        size: "24",
        checked: true,
        className: "transform-[scale(1)_translateX(calc(38px-24px))]",
      },
      {
        size: "32",
        checked: true,
        className: "transform-[scale(1)_translateX(calc(52px-32px))]",
      },
    ],
    defaultVariants: {
      tone: "brand",
      size: "32",
      checked: false,
      disabled: false,
    },
  },
);

type SwitchSize = NonNullable<VariantProps<typeof switchmarkVariants>["size"]>;

export interface SwitchProps
  extends
    Omit<
      BaseSwitch.Root.Props,
      "className" | "style" | "children" | "render" | "ref"
    >,
    Pick<VariantProps<typeof switchmarkVariants>, "tone"> {
  /** 손잡이 길의 높이(px) — 기본은 32 */
  size?: SwitchSize | 16 | 24 | 32;
  label?: React.ReactNode;
  /** 줄 전체(label 요소)에 붙는다 */
  className?: string;
  style?: React.CSSProperties;
  /** 읽어 주는 이름 같은 접근성 속성 — 실제로 초점을 받는 스위치에 붙는다 */
  inputProps?: React.AriaAttributes;
  /** 줄 전체(label 요소) */
  rootRef?: React.Ref<HTMLLabelElement>;
  /** 폼에 값을 싣는 숨은 input */
  ref?: React.Ref<HTMLInputElement>;
}

function Switch({
  label,
  size: sizeProp,
  tone,
  className,
  style,
  inputProps,
  rootRef,
  ref,
  ...props
}: SwitchProps) {
  const size =
    sizeProp === undefined ? undefined : (String(sizeProp) as SwitchSize);
  const { scaleFeedbackRef, scaleFeedbackClassName } = useScaleFeedback();
  return (
    <label
      ref={rootRef}
      data-slot="switch"
      className={cn(switchVariants({ size }), className)}
      style={style}
    >
      <BaseSwitch.Root
        ref={scaleFeedbackRef}
        data-slot="switch-control"
        inputRef={ref}
        {...inputProps}
        {...props}
        className={(state) =>
          cn(
            scaleFeedbackClassName,
            switchmarkVariants({
              tone,
              size,
              checked: state.checked,
              disabled: state.disabled,
            }),
          )
        }
      >
        <BaseSwitch.Thumb
          data-slot="switch-thumb"
          className={(state) =>
            switchThumbVariants({
              tone,
              size,
              checked: state.checked,
              disabled: state.disabled,
            })
          }
        />
      </BaseSwitch.Root>
      {label ? (
        <span
          data-slot="switch-label"
          className={switchLabelVariants({ size })}
        >
          {label}
        </span>
      ) : null}
    </label>
  );
}

export { Switch, switchVariants, switchmarkVariants };
