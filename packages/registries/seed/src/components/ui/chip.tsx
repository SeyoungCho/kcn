"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

// 켜짐은 data-checked(Base UI 의 체크박스)로 가린다. 바탕색이 바뀌는 순서는 SEED 와 같다: 켜짐 < 손을 댐 < 켜진 채 손을 댐.
const chipVariants = cva(
  [
    `group/chip relative box-border inline-flex shrink-0 cursor-pointer
    items-center justify-center rounded-full border-0`,
    `font-[inherit] leading-none whitespace-nowrap normal-case text-start
    antialiased`,
    `pressed:not-data-disabled:scale-(--feedback-scale)
    data-disabled:cursor-not-allowed data-disabled:opacity-50`,
    `outline-solid outline-(length:--dimension-x0_5)
    outline-offset-(--dimension-x0_5) outline-transparent
    focused:outline-stroke-focus-ring`,
    "[transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),color_var(--motion-duration-color-transition)_var(--motion-ease-easing),border-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),box-shadow_var(--motion-duration-color-transition)_var(--motion-ease-easing),outline-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),var(--feedback-scale-transition)]",
  ],
  {
    variants: {
      variant: {
        solid: [
          "bg-bg-neutral-weak-alpha [--icon-color:var(--fg-neutral)]",
          `data-checked:bg-bg-neutral-solid data-checked:shadow-none
          data-checked:[--icon-color:var(--fg-on-neutral-solid)]`,
          `engaged:not-data-disabled:bg-bg-neutral-weak-alpha-pressed
          data-checked:engaged:not-data-disabled:bg-bg-neutral-solid-pressed`,
        ],
        outlineStrong: [
          `bg-bg-transparent inset-ring inset-ring-stroke-neutral-muted
          [--icon-color:var(--fg-neutral)]`,
          `data-checked:bg-bg-neutral-solid
          data-checked:[--icon-color:var(--fg-on-neutral-solid)]`,
          `engaged:not-data-disabled:bg-bg-transparent-pressed
          data-checked:engaged:not-data-disabled:bg-bg-neutral-solid-pressed`,
        ],
        outlineWeak: [
          `bg-bg-transparent inset-ring inset-ring-stroke-neutral-muted
          [--icon-color:var(--fg-neutral)]`,
          `data-checked:bg-bg-neutral-weak
          data-checked:inset-ring-stroke-neutral-contrast`,
          `engaged:not-data-disabled:bg-bg-transparent-pressed
          data-checked:engaged:not-data-disabled:bg-bg-neutral-weak-pressed`,
        ],
      },
      size: {
        large: "h-10 px-x2.5",
        medium: "h-9 px-x2",
        small: "h-8 px-x1.5",
      },
      /** 글자가 있는 칩 · 아이콘만 있는 칩 — 가장 좁은 폭이 다르다 */
      layout: { withText: "", iconOnly: "" },
    },
    compoundVariants: [
      { size: "small", layout: "withText", className: "min-w-11" },
      { size: "medium", layout: "withText", className: "min-w-x12" },
      { size: "large", layout: "withText", className: "min-w-x13" },
      { size: "small", layout: "iconOnly", className: "min-w-x8" },
      { size: "medium", layout: "iconOnly", className: "min-w-x9" },
      { size: "large", layout: "iconOnly", className: "min-w-x10" },
    ],
    defaultVariants: { variant: "solid", size: "medium", layout: "withText" },
  },
);

const chipLabelVariants = cva(
  `inline-flex items-center justify-center px-x1.5 text-t4 font-medium
  text-fg-neutral`,
  {
    variants: {
      variant: {
        solid: "group-data-checked/chip:text-fg-on-neutral-solid",
        outlineStrong: "group-data-checked/chip:text-fg-on-neutral-solid",
        outlineWeak: "",
      },
    },
    defaultVariants: { variant: "solid" },
  },
);

const chipPrefixIconVariants = cva(
  "inline-flex shrink-0 items-center pl-x1.5 text-fg-neutral",
  {
    variants: {
      size: {
        large: "[--icon-size:var(--dimension-x4)]",
        medium: "[--icon-size:var(--dimension-x4)]",
        small: "[--icon-size:var(--dimension-x3_5)]",
      },
    },
    defaultVariants: { size: "medium" },
  },
);

const chipSuffixIconVariants = cva(
  "inline-flex shrink-0 items-center pr-x1.5 text-fg-neutral",
  {
    variants: {
      size: {
        large: "[--icon-size:var(--dimension-x4)]",
        medium: "[--icon-size:var(--dimension-x3_5)]",
        small: "[--icon-size:var(--dimension-x3_5)]",
      },
    },
    defaultVariants: { size: "medium" },
  },
);

type ChipVariants = VariantProps<typeof chipVariants>;

// 칩이 정한 크기 · 변형을 안의 글자 · 아이콘이 물려받는다.
const ChipContext = React.createContext<Pick<ChipVariants, "variant" | "size">>(
  {},
);

export interface ToggleChipProps
  extends
    Omit<
      CheckboxPrimitive.Root.Props,
      "className" | "render" | "ref" | "inputRef"
    >,
    ChipVariants {
  className?: string;
  /** 읽어 주는 이름 같은 접근성 속성 — 실제로 초점을 받는 칩에 붙는다 */
  inputProps?: React.AriaAttributes;
  /** 칩 요소 */
  rootRef?: React.Ref<HTMLElement>;
  /** 폼에 값을 싣는 숨은 input */
  ref?: React.Ref<HTMLInputElement>;
}

/** 켜고 끄는 칩(체크박스) — 안에 `ChipLabel` · `ChipPrefixIcon` · `ChipSuffixIcon` 을 넣는다. */
function ToggleChip({
  className,
  variant = "solid",
  size = "medium",
  layout,
  inputProps,
  rootRef,
  ref,
  ...props
}: ToggleChipProps) {
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLElement>(rootRef);
  const context = React.useMemo(() => ({ variant, size }), [variant, size]);
  return (
    <ChipContext.Provider value={context}>
      <CheckboxPrimitive.Root
        ref={scaleFeedbackRef}
        inputRef={ref}
        data-slot="chip"
        className={cn(
          scaleFeedbackClassName,
          chipVariants({ variant, size, layout }),
          className,
        )}
        {...inputProps}
        {...props}
      />
    </ChipContext.Provider>
  );
}

export interface ButtonChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, ChipVariants {
  ref?: React.Ref<HTMLButtonElement>;
}

/** 누르는 칩(버튼). */
function ButtonChip({
  className,
  variant = "solid",
  size = "medium",
  layout,
  ref,
  disabled,
  ...props
}: ButtonChipProps) {
  const { scaleFeedbackRef, scaleFeedbackClassName } = useScaleFeedback(ref);
  const context = React.useMemo(() => ({ variant, size }), [variant, size]);
  return (
    <ChipContext.Provider value={context}>
      <button
        ref={scaleFeedbackRef}
        data-slot="chip"
        disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        className={cn(
          scaleFeedbackClassName,
          chipVariants({ variant, size, layout }),
          className,
        )}
        {...props}
      />
    </ChipContext.Provider>
  );
}

export interface RadioChipRootProps extends Omit<
  RadioGroupPrimitive.Props<string>,
  "className"
> {
  className?: string;
}

/** 하나만 고르는 칩 묶음(라디오 그룹) — 안에 `RadioChipItem` 을 놓는다. 배치(가로 · 간격)는 className 으로 준다. */
function RadioChipRoot({ className, ...props }: RadioChipRootProps) {
  return (
    <RadioGroupPrimitive<string>
      data-slot="chip-radio-group"
      className={className}
      {...props}
    />
  );
}

export interface RadioChipItemProps
  extends
    Omit<
      RadioPrimitive.Root.Props<string>,
      "className" | "render" | "ref" | "inputRef"
    >,
    ChipVariants {
  className?: string;
  /** 읽어 주는 이름 같은 접근성 속성 — 실제로 초점을 받는 칩에 붙는다 */
  inputProps?: React.AriaAttributes;
  /** 칩 요소 */
  rootRef?: React.Ref<HTMLElement>;
  /** 폼에 값을 싣는 숨은 input */
  ref?: React.Ref<HTMLInputElement>;
}

/** 묶음 안에서 하나만 켜지는 칩(라디오) — 모양은 켜고 끄는 칩과 같다. 안에 `ChipLabel` · `ChipPrefixIcon` · `ChipSuffixIcon` 을 넣는다. */
function RadioChipItem({
  className,
  variant = "solid",
  size = "medium",
  layout,
  inputProps,
  rootRef,
  ref,
  ...props
}: RadioChipItemProps) {
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLElement>(rootRef);
  const context = React.useMemo(() => ({ variant, size }), [variant, size]);
  return (
    <ChipContext.Provider value={context}>
      <RadioPrimitive.Root<string>
        ref={scaleFeedbackRef}
        inputRef={ref}
        data-slot="chip"
        className={cn(
          scaleFeedbackClassName,
          chipVariants({ variant, size, layout }),
          className,
        )}
        {...inputProps}
        {...props}
      />
    </ChipContext.Provider>
  );
}

function ChipLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { variant } = React.useContext(ChipContext);
  return (
    <span
      data-slot="chip-label"
      className={cn(chipLabelVariants({ variant }), className)}
      {...props}
    />
  );
}

/** 글자 앞의 아이콘 자리 — 안에 `<Icon svg={…} />` 을 넣는다(크기 · 색은 칩이 정한다). */
function ChipPrefixIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { size } = React.useContext(ChipContext);
  return (
    <div
      data-slot="chip-prefix-icon"
      className={cn(chipPrefixIconVariants({ size }), className)}
      {...props}
    />
  );
}

/** 글자 뒤의 아이콘 자리. */
function ChipSuffixIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { size } = React.useContext(ChipContext);
  return (
    <div
      data-slot="chip-suffix-icon"
      className={cn(chipSuffixIconVariants({ size }), className)}
      {...props}
    />
  );
}

export {
  ToggleChip,
  ButtonChip,
  RadioChipRoot,
  RadioChipItem,
  ChipLabel,
  ChipPrefixIcon,
  ChipSuffixIcon,
  chipVariants,
};
