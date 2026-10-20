"use client";

import * as React from "react";
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { cva, type VariantProps } from "class-variance-authority";
import { MinusIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// Base UI NumberField 로 만든 숫자 스피너. size 는 xs · sm · default · lg.
//   회색 바탕 위에 −, 흰 숫자 칸, + 가 놓인다. 숫자 칸 폭은 max 의 자릿수만큼(기본 0 ~ 999 → 3자리)이라 값이 바뀌어도 그대로다.
//   끝에 닿은 쪽 버튼은 흐린 회색이 된다(Base UI 가 그 버튼을 막는다).
// 버튼을 누르면 그쪽 절반에 옅은 바탕이 깔리며(0.92 배) 아이콘과 숫자 칸이 0.9 배로 줄고,
// 떼면 아이콘은 1.1 배까지 튀었다가, 숫자 칸은 1.02 배까지 넘쳤다가 돌아온다(스프링을 linear() 로 그린다).
const numberFieldGroupVariants = cva(
  `group/number-field-group relative isolate flex w-fit items-center bg-grey-100
  data-disabled:opacity-30`,
  {
    variants: {
      size: {
        xs: "rounded-sm py-0.75",
        sm: "rounded-md py-0.75",
        default: "rounded-xl py-1",
        lg: "rounded-2xl py-1",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

// 눌렀을 때 깔리는 바탕(::before)은 Group 기준으로 놓인다 — 버튼 바깥 끝에서 숫자 칸 너머까지 덮는다.
// 아이콘만 줄이고 버튼은 그대로 두어야 ::before 가 버튼이 아닌 Group 에 붙는다.
const numberFieldButtonVariants = cva(
  `flex shrink-0 cursor-pointer items-center self-stretch text-grey-700
  outline-none select-none before:pointer-events-none before:absolute
  before:inset-y-0 before:-z-10 before:bg-grey-opacity-100 before:opacity-0
  before:transition-[opacity,scale,translate] before:duration-160
  before:ease-[ease] data-disabled:cursor-default data-disabled:text-grey-300
  active:before:scale-[0.92] active:before:opacity-100
  active:before:duration-170 active:before:ease-out [&_svg]:shrink-0
  [&_svg]:stroke-[2.5] [&_svg]:transition-[scale] [&_svg]:duration-700
  [&_svg]:ease-[linear(0,1.02_8%,1.61_13%,1.95_20%,2_27%,1.86_34%,1.39_41%,1.09_46%,0.79_53%,0.78_58%,0.87_67%,0.97_80%,1)]
  active:[&_svg]:scale-90 active:[&_svg]:duration-170 active:[&_svg]:ease-out`,
  {
    variants: {
      side: {
        start:
          "before:left-0 [&_svg]:origin-right active:before:-translate-x-0.5",
        end: "before:right-0 [&_svg]:origin-left active:before:translate-x-0.5",
      },
      size: {
        xs: "before:rounded-sm [&_svg]:size-3",
        sm: "before:rounded-md [&_svg]:size-3",
        default: "before:rounded-xl [&_svg]:size-4",
        lg: "before:rounded-2xl [&_svg]:size-4",
      },
    },
    compoundVariants: [
      // 바깥 여백, 그리고 바탕이 끝나는 곳 = 반대쪽 버튼 폭 + 숫자 칸 바깥 여백 − 숫자 칸 너머로 덮는 폭
      { side: "start", size: "xs", className: "pl-2 before:right-5.25" },
      { side: "end", size: "xs", className: "pr-2 before:left-5.25" },
      { side: "start", size: "sm", className: "pl-3 before:right-6.5" },
      { side: "end", size: "sm", className: "pr-3 before:left-6.5" },
      { side: "start", size: "default", className: "pl-3 before:right-7.75" },
      { side: "end", size: "default", className: "pr-3 before:left-7.75" },
      { side: "start", size: "lg", className: "pl-4 before:right-9.5" },
      { side: "end", size: "lg", className: "pr-4 before:left-9.5" },
    ],
    defaultVariants: {
      side: "start",
      size: "default",
    },
  },
);

// 흰 숫자 칸 — 폭은 자릿수(--number-field-digits) × 1ch. 그림자는 토큰에 없어 그대로 적는다.
const numberFieldInputVariants = cva(
  `relative z-10 box-content w-[calc(var(--number-field-digits)*1ch)] bg-white
  text-center font-semibold text-grey-800 tabular-nums
  shadow-[0_1px_3px_0_rgba(0,0,0,0.09)] outline-none transition-[scale]
  duration-650
  ease-[linear(0,0.29_9%,0.61_14%,1.03_22%,1.17_27%,1.21_32%,1.19_37%,1.09_42%,0.96_55%,0.95_63%,0.97_70%,1)]
  focus-visible:ring-3 focus-visible:ring-ring/50
  group-has-[button:active]/number-field-group:scale-90
  group-has-[button:active]/number-field-group:duration-170
  group-has-[button:active]/number-field-group:ease-out dark:bg-grey-300`,
  {
    variants: {
      size: {
        xs: "mx-1.5 rounded-[6px] px-1.25 py-0.75 text-t7",
        sm: "mx-2 rounded-sm px-1.5 py-1.25 text-t6",
        default: "mx-2.5 rounded-md p-2 text-t5",
        lg: "mx-3.5 rounded-xl px-3.5 py-3 text-t5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type NumberFieldSize = NonNullable<
  VariantProps<typeof numberFieldGroupVariants>["size"]
>;

const NumberFieldContext = React.createContext<{ size: NumberFieldSize }>({
  size: "default",
});

type NumberFieldProps = Omit<NumberFieldPrimitive.Root.Props, "style"> & {
  size?: NumberFieldSize;
  style?: React.CSSProperties;
};

function NumberField({
  className,
  size = "default",
  min = 0,
  max = 999,
  style,
  ...props
}: NumberFieldProps) {
  return (
    <NumberFieldContext.Provider value={{ size }}>
      <NumberFieldPrimitive.Root
        data-slot="number-field"
        data-size={size}
        min={min}
        max={max}
        className={cn("flex flex-col items-start gap-2", className)}
        style={
          {
            "--number-field-digits": String(Math.trunc(max)).length,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      />
    </NumberFieldContext.Provider>
  );
}

function NumberFieldGroup({
  className,
  ...props
}: NumberFieldPrimitive.Group.Props) {
  const { size } = React.useContext(NumberFieldContext);

  return (
    <NumberFieldPrimitive.Group
      data-slot="number-field-group"
      className={cn(numberFieldGroupVariants({ size }), className)}
      {...props}
    />
  );
}

function NumberFieldDecrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Decrement.Props) {
  const { size } = React.useContext(NumberFieldContext);

  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      className={cn(
        numberFieldButtonVariants({ side: "start", size }),
        className,
      )}
      {...props}
    >
      {children ?? <MinusIcon data-slot="number-field-decrement-icon" />}
    </NumberFieldPrimitive.Decrement>
  );
}

function NumberFieldInput({
  className,
  ...props
}: NumberFieldPrimitive.Input.Props) {
  const { size } = React.useContext(NumberFieldContext);

  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      className={cn(numberFieldInputVariants({ size }), className)}
      {...props}
    />
  );
}

function NumberFieldIncrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Increment.Props) {
  const { size } = React.useContext(NumberFieldContext);

  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      className={cn(
        numberFieldButtonVariants({ side: "end", size }),
        className,
      )}
      {...props}
    >
      {children ?? <PlusIcon data-slot="number-field-increment-icon" />}
    </NumberFieldPrimitive.Increment>
  );
}

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldInput,
  NumberFieldIncrement,
  numberFieldGroupVariants,
  numberFieldButtonVariants,
  numberFieldInputVariants,
  type NumberFieldProps,
};
