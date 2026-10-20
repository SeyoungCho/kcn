"use client";

import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import IconCheckmarkFatFill from "@karrotmarket/react-monochrome-icon/IconCheckmarkFatFill";
import IconMinusFatFill from "@karrotmarket/react-monochrome-icon/IconMinusFatFill";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import {
  Fieldset,
  FieldsetHeading,
  FieldsetMessages,
} from "@/components/ui/fieldset";
import type { FieldsetChromeProps } from "@/components/ui/fieldset";
import { Icon } from "@/components/ui/icon";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  `group/checkbox relative isolate inline-flex max-w-full cursor-pointer
  items-start gap-x2 align-top has-data-disabled:cursor-not-allowed`,
  {
    variants: { size: { medium: "min-h-x8", large: "min-h-x9" } },
    defaultVariants: { size: "medium" },
  },
);

const checkboxLabelVariants = cva(
  "text-fg-neutral group-has-data-disabled/checkbox:text-fg-disabled",
  {
    variants: {
      size: {
        medium:
          "mt-[calc(var(--dimension-x8)/2-var(--line-height-t4)/2)] text-t4",
        large:
          "mt-[calc(var(--dimension-x9)/2-var(--line-height-t5)/2)] text-t5",
      },
      weight: { regular: "font-regular", bold: "font-bold" },
    },
    defaultVariants: { size: "medium", weight: "regular" },
  },
);

// 네모 칸. 켜짐(on) · 못 씀(disabled)은 Base UI 의 상태를 받아 고른다 — 선택자로 적으면 '못 쓰지 않을 때만' 같은 조건이 겹겹이 붙는다.
// 마우스를 올리거나 누르는 것은 글자까지 포함한 줄 전체(group/checkbox)에서도 걸린다.
const checkmarkVariants = cva(
  [
    "relative box-border flex-none mt-x1.5 rounded-r1",
    `outline-2 outline-offset-2 outline-transparent
    focused:outline-stroke-focus-ring`,
    "transition-[background-color,scale,outline-color]",
    "duration-[var(--motion-duration-color-transition),var(--motion-duration-pressed-scale),var(--motion-duration-d3)]",
    "ease-[var(--motion-ease-easing),var(--motion-ease-pressed-scale),var(--motion-ease-easing)]",
    "[transition-delay:0s,0s,0s]",
  ],
  {
    variants: {
      variant: { square: "", ghost: "" },
      tone: { neutral: "", brand: "" },
      size: { medium: "size-x5", large: "size-x6" },
      on: { true: "", false: "" },
      disabled: {
        true: "[--icon-color:var(--fg-disabled)]",
        false: `pressed:scale-(--feedback-scale)
        group-pressed/checkbox:scale-(--feedback-scale)`,
      },
    },
    compoundVariants: [
      { variant: "square", size: "medium", className: "[--icon-size:12px]" },
      { variant: "square", size: "large", className: "[--icon-size:14px]" },
      { variant: "ghost", size: "medium", className: "[--icon-size:14px]" },
      { variant: "ghost", size: "large", className: "[--icon-size:18px]" },

      { variant: "square", on: false, className: "border border-solid" },
      {
        variant: "square",
        disabled: true,
        className: "border-stroke-neutral-muted bg-bg-disabled",
      },
      {
        variant: "square",
        on: false,
        disabled: false,
        className: `border-stroke-neutral-weak engaged:bg-bg-transparent-pressed
        group-engaged/checkbox:bg-bg-transparent-pressed`,
      },
      {
        variant: "square",
        tone: "neutral",
        on: true,
        disabled: false,
        className: `bg-bg-neutral-solid
        [--icon-color:var(--fg-on-neutral-solid)]
        engaged:bg-bg-neutral-solid-pressed
        group-engaged/checkbox:bg-bg-neutral-solid-pressed`,
      },
      {
        variant: "square",
        tone: "brand",
        on: true,
        disabled: false,
        className: `bg-bg-brand-solid [--icon-color:var(--fg-on-brand-solid)]
        engaged:bg-bg-brand-solid-pressed
        group-engaged/checkbox:bg-bg-brand-solid-pressed`,
      },

      {
        variant: "ghost",
        on: false,
        disabled: false,
        className: "[--icon-color:var(--fg-placeholder)]",
      },
      {
        variant: "ghost",
        on: false,
        disabled: false,
        className: `engaged:bg-bg-transparent-pressed
        group-engaged/checkbox:bg-bg-transparent-pressed`,
      },
      {
        variant: "ghost",
        tone: "neutral",
        on: true,
        disabled: false,
        className: `[--icon-color:var(--fg-neutral)] engaged:bg-gray-200
        group-engaged/checkbox:bg-gray-200`,
      },
      {
        variant: "ghost",
        tone: "brand",
        on: true,
        disabled: false,
        className: `[--icon-color:var(--fg-brand)] engaged:bg-brand-200
        group-engaged/checkbox:bg-brand-200`,
      },
    ],
    defaultVariants: {
      variant: "square",
      tone: "brand",
      size: "medium",
      on: false,
      disabled: false,
    },
  },
);

const checkmarkIconVariants = cva(
  "absolute inset-0 m-auto block overflow-visible text-center",
  {
    variants: {
      variant: {
        square: "",
        ghost: "transition-[color] duration-color-transition ease-easing",
      },
    },
    defaultVariants: { variant: "square" },
  },
);

type CheckmarkVariants = Pick<
  VariantProps<typeof checkmarkVariants>,
  "variant" | "tone" | "size"
>;

export interface CheckboxProps
  extends
    Omit<
      BaseCheckbox.Root.Props,
      "className" | "style" | "children" | "render" | "ref"
    >,
    CheckmarkVariants,
    Pick<VariantProps<typeof checkboxLabelVariants>, "weight"> {
  label?: React.ReactNode;
  invalid?: boolean;
  /** 줄 전체(label 요소)에 붙는다 */
  className?: string;
  style?: React.CSSProperties;
  /** 읽어 주는 이름 같은 접근성 속성 — 실제로 초점을 받는 네모 칸에 붙는다 */
  inputProps?: React.AriaAttributes;
  /** 줄 전체(label 요소) */
  rootRef?: React.Ref<HTMLLabelElement>;
  /** 폼에 값을 싣는 숨은 input */
  ref?: React.Ref<HTMLInputElement>;
}

function Checkbox({
  label,
  size,
  weight,
  variant,
  tone,
  invalid,
  indeterminate,
  className,
  style,
  inputProps,
  rootRef,
  ref,
  ...props
}: CheckboxProps) {
  const { scaleFeedbackRef, scaleFeedbackClassName } = useScaleFeedback();
  return (
    <label
      ref={rootRef}
      data-slot="checkbox"
      className={cn(checkboxVariants({ size }), className)}
      style={style}
    >
      <BaseCheckbox.Root
        ref={scaleFeedbackRef}
        data-slot="checkbox-control"
        aria-invalid={invalid || undefined}
        indeterminate={indeterminate}
        inputRef={ref}
        {...inputProps}
        {...props}
        className={(state) =>
          cn(
            scaleFeedbackClassName,
            checkmarkVariants({
              variant,
              tone,
              size,
              on: state.checked || state.indeterminate,
              disabled: state.disabled,
            }),
          )
        }
      >
        {/* ghost 는 꺼져 있어도 흐린 체크를 보여 준다 */}
        <BaseCheckbox.Indicator
          keepMounted={variant === "ghost"}
          className={checkmarkIconVariants({ variant })}
          render={
            <Icon
              svg={
                indeterminate ? <IconMinusFatFill /> : <IconCheckmarkFatFill />
              }
            />
          }
        />
      </BaseCheckbox.Root>
      <span
        data-slot="checkbox-label"
        className={checkboxLabelVariants({ size, weight })}
      >
        {label}
      </span>
    </label>
  );
}

export interface CheckboxGroupProps
  extends React.HTMLAttributes<HTMLDivElement>, FieldsetChromeProps {
  ref?: React.Ref<HTMLDivElement>;
}

/** 체크박스 묶음 — 이름표 · 설명 · 오류 글을 두르고 체크박스를 세로로 놓는다. 값은 체크박스마다 따로 다룬다. */
function CheckboxGroup({
  label,
  labelWeight,
  indicator,
  showRequiredIndicator,
  description,
  errorMessage,
  className,
  children,
  ...props
}: CheckboxGroupProps) {
  const id = React.useId();
  const [labelId, descriptionId, errorMessageId] = [
    `${id}-label`,
    `${id}-description`,
    `${id}-error`,
  ];
  const describedBy = [
    description ? descriptionId : null,
    errorMessage ? errorMessageId : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Fieldset
      role="group"
      data-slot="checkbox-group"
      aria-labelledby={label || indicator ? labelId : undefined}
      aria-describedby={describedBy || undefined}
      className={className}
      {...props}
    >
      <FieldsetHeading
        id={labelId}
        label={label}
        labelWeight={labelWeight}
        indicator={indicator}
        showRequiredIndicator={showRequiredIndicator}
      />
      <div data-slot="checkbox-group-items" className="flex flex-col gap-x1">
        {children}
      </div>
      <FieldsetMessages
        descriptionId={descriptionId}
        errorMessageId={errorMessageId}
        description={description}
        errorMessage={errorMessage}
      />
    </Fieldset>
  );
}

export { Checkbox, CheckboxGroup, checkboxVariants, checkmarkVariants };
