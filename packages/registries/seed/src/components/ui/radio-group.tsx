"use client";

import * as React from "react";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
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

const radioVariants = cva(
  `group/radio relative isolate inline-flex max-w-full cursor-pointer
  items-start gap-x2 align-top has-data-disabled:cursor-not-allowed`,
  {
    variants: { size: { medium: "min-h-x8", large: "min-h-x9" } },
    defaultVariants: { size: "medium" },
  },
);

const radioLabelVariants = cva(
  "text-fg-neutral group-has-data-disabled/radio:text-fg-disabled",
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

// 동그라미. 골랐는지(checked) · 못 쓰는지(disabled)는 Base UI 의 상태를 받아 고른다.
// 마우스를 올리거나 누르는 것은 글자까지 포함한 줄 전체(group/radio)에서도 걸린다.
const radiomarkVariants = cva(
  [
    `relative box-border flex flex-none items-center justify-center mt-x1.5
    rounded-full border-solid`,
    `outline-2 outline-offset-2 outline-transparent
    focused:outline-stroke-focus-ring`,
    "transition-[background-color,scale,outline-color]",
    "duration-[var(--motion-duration-color-transition),var(--motion-duration-pressed-scale),var(--motion-duration-d3)]",
    "ease-[var(--motion-ease-easing),var(--motion-ease-pressed-scale),var(--motion-ease-easing)]",
    "[transition-delay:0s,0s,0s]",
  ],
  {
    variants: {
      tone: { neutral: "", brand: "" },
      size: { medium: "size-x5", large: "size-x6" },
      checked: { true: "", false: "border border-stroke-neutral-weak" },
      disabled: {
        true: "",
        false: `pressed:scale-(--feedback-scale)
        group-pressed/radio:scale-(--feedback-scale)`,
      },
    },
    compoundVariants: [
      // 못 쓸 때는 가운데 점이 한 단계 크다
      {
        size: "medium",
        disabled: false,
        className: "[--icon-size:var(--dimension-x2)]",
      },
      {
        size: "medium",
        disabled: true,
        className: "[--icon-size:var(--dimension-x2_5)]",
      },
      {
        size: "large",
        disabled: false,
        className: "[--icon-size:var(--dimension-x2_5)]",
      },
      {
        size: "large",
        disabled: true,
        className: "[--icon-size:var(--dimension-x3)]",
      },

      {
        checked: false,
        disabled: false,
        className: `engaged:bg-bg-transparent-pressed
        group-engaged/radio:bg-bg-transparent-pressed`,
      },
      { checked: false, disabled: true, className: "bg-gray-300" },
      { checked: true, disabled: false, className: "border-0" },
      {
        checked: true,
        disabled: true,
        className: `border border-gray-300 bg-bg-transparent
        [--icon-color:var(--palette-gray-300)]`,
      },
      {
        tone: "neutral",
        checked: true,
        disabled: false,
        className: `bg-bg-neutral-solid
        [--icon-color:var(--fg-on-neutral-solid)]
        engaged:bg-bg-neutral-solid-pressed
        group-engaged/radio:bg-bg-neutral-solid-pressed`,
      },
      {
        tone: "brand",
        checked: true,
        disabled: false,
        className: `bg-bg-brand-solid [--icon-color:var(--fg-on-brand-solid)]
        engaged:bg-bg-brand-solid-pressed
        group-engaged/radio:bg-bg-brand-solid-pressed`,
      },
    ],
    defaultVariants: {
      tone: "brand",
      size: "medium",
      checked: false,
      disabled: false,
    },
  },
);

export interface RadioGroupProps
  extends
    Omit<BaseRadioGroup.Props<string>, "className" | "render">,
    FieldsetChromeProps {
  /** 오류 글은 invalid 일 때만 보인다 */
  invalid?: boolean;
  /** 선택지를 담는 요소에 붙는다 — 가로로 놓는 것(`flex-row`)처럼 선택지의 배치를 바꿀 수 있게 */
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

/** 라디오 묶음 — 이름표 · 설명 · 오류 글을 두르고 선택지를 세로로 놓는다. */
function RadioGroup({
  label,
  labelWeight,
  indicator,
  showRequiredIndicator,
  description,
  errorMessage,
  invalid,
  className,
  children,
  ...props
}: RadioGroupProps) {
  const id = React.useId();
  const [labelId, descriptionId, errorMessageId] = [
    `${id}-label`,
    `${id}-description`,
    `${id}-error`,
  ];
  const shownError = invalid ? errorMessage : undefined;
  const describedBy = [
    description ? descriptionId : null,
    shownError ? errorMessageId : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Fieldset data-slot="radio-group-field">
      <FieldsetHeading
        id={labelId}
        label={label}
        labelWeight={labelWeight}
        indicator={indicator}
        showRequiredIndicator={showRequiredIndicator}
      />
      <BaseRadioGroup<string>
        data-slot="radio-group"
        aria-labelledby={label || indicator ? labelId : undefined}
        aria-describedby={describedBy || undefined}
        aria-invalid={invalid || undefined}
        className={cn("flex flex-col gap-x1", className)}
        {...props}
      >
        {children}
      </BaseRadioGroup>
      <FieldsetMessages
        descriptionId={descriptionId}
        errorMessageId={errorMessageId}
        description={description}
        errorMessage={shownError}
      />
    </Fieldset>
  );
}

export interface RadioGroupItemProps
  extends
    Omit<
      BaseRadio.Root.Props<string>,
      "className" | "style" | "children" | "render" | "ref"
    >,
    Pick<VariantProps<typeof radiomarkVariants>, "tone" | "size">,
    Pick<VariantProps<typeof radioLabelVariants>, "weight"> {
  label?: React.ReactNode;
  /** 줄 전체(label 요소)에 붙는다 */
  className?: string;
  style?: React.CSSProperties;
  /** 읽어 주는 이름 같은 접근성 속성 — 실제로 초점을 받는 동그라미에 붙는다 */
  inputProps?: React.AriaAttributes;
  /** 줄 전체(label 요소) */
  rootRef?: React.Ref<HTMLLabelElement>;
  /** 폼에 값을 싣는 숨은 input */
  ref?: React.Ref<HTMLInputElement>;
}

function RadioGroupItem({
  label,
  size,
  weight,
  tone,
  className,
  style,
  inputProps,
  rootRef,
  ref,
  ...props
}: RadioGroupItemProps) {
  const { scaleFeedbackRef, scaleFeedbackClassName } = useScaleFeedback();
  return (
    <label
      ref={rootRef}
      data-slot="radio"
      className={cn(radioVariants({ size }), className)}
      style={style}
    >
      <BaseRadio.Root<string>
        ref={scaleFeedbackRef}
        data-slot="radio-control"
        inputRef={ref}
        {...inputProps}
        {...props}
        className={(state) =>
          cn(
            scaleFeedbackClassName,
            radiomarkVariants({
              tone,
              size,
              checked: state.checked,
              disabled: state.disabled,
            }),
          )
        }
      >
        <BaseRadio.Indicator
          className="block rounded-full"
          render={
            <Icon
              svg={
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="currentColor" />
                </svg>
              }
            />
          }
        />
      </BaseRadio.Root>
      {label ? (
        <span
          data-slot="radio-label"
          className={radioLabelVariants({ size, weight })}
        >
          {label}
        </span>
      ) : null}
    </label>
  );
}

export { RadioGroup, RadioGroupItem, radioVariants, radiomarkVariants };
