"use client";

import type * as React from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// shadcn InputGroup 에 t-flavored 의 모양을 입혔다 — 접두사 · 접미사, 오른쪽 버튼, 지우기 · 비밀번호 버튼, 검색창.
// 상자(InputGroup)가 Input 의 모양을 지고, 안의 칸(InputGroupInput)은 맨 글자만 남긴다. 앞뒤의 글 · 아이콘 · 버튼은
// InputGroupAddon 에 담는다. 상태는 칸에서 읽는다 — 초점이면 물들고, aria-invalid 면 빨개지며 흔들리고, disabled 면 흐려진다.
//   variant — default · line · big · hero 는 Input 과 같다. search = 검색창(회색 알약, 16px 글자).
const inputGroupVariants = cva(
  `group/input-group relative flex w-full min-w-0 items-center gap-2
  text-grey-800 has-[>textarea]:items-start
  has-[>[aria-invalid=true]]:animate-[input-shake_0.36s_linear]
  motion-reduce:has-[>[aria-invalid=true]]:animate-none
  has-[>:disabled]:text-grey-400`,
  {
    variants: {
      variant: {
        default: `rounded-xl border border-grey-opacity-100 bg-grey-opacity-50
        px-4 py-3.5 text-t5 shadow-[inset_0_0_0_100vmax_transparent]
        transition-shadow duration-200 ease-[ease]
        has-[>:focus:not([aria-invalid=true])]:shadow-blue-900/5
        has-[>[aria-invalid=true]]:shadow-red-900/5
        has-[>:disabled]:bg-grey-200`,
        line: `border-b-2 border-grey-100 pb-1 text-t3 font-semibold
        has-[>:focus:not([aria-invalid=true])]:border-blue-400
        has-[>[aria-invalid=true]]:border-red-600`,
        big: `border-b-2 border-grey-100 pb-1 text-t1 font-semibold
        has-[>:focus:not([aria-invalid=true])]:border-blue-400
        has-[>[aria-invalid=true]]:border-red-600`,
        hero: "text-t1 font-semibold",
        // 이 칸만 줄 높이를 1.252 로 덮어쓴다
        search: `min-h-11 rounded-lg bg-grey-opacity-100 px-2.5 py-2 text-st10
        leading-[1.252] text-grey-900`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type InputGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupVariants>;

function InputGroup({
  className,
  variant = "default",
  ...props
}: InputGroupProps) {
  return (
    <div
      role="group"
      data-slot="input-group"
      data-variant={variant}
      className={cn(inputGroupVariants({ variant }), className)}
      {...props}
    />
  );
}

// 뒤에 붙는 글(suffix · 단위)은 칸이 비어 있는 동안 placeholder 처럼 옅다
const inputGroupAddonVariants = cva(
  `flex h-auto shrink-0 cursor-text items-center justify-center gap-2
  select-none [&>svg:not([class*='size-'])]:size-6
  [&>svg:not([class*='text-'])]:text-grey-600`,
  {
    variants: {
      align: {
        "inline-start": "order-first",
        "inline-end": `order-last
        group-has-[>[data-slot=input-group-control]:placeholder-shown]/input-group:text-grey-500`,
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

type InputGroupAddonProps = React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupAddonVariants>;

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button")) {
          return;
        }
        event.currentTarget.parentElement
          ?.querySelector<HTMLElement>("[data-slot=input-group-control]")
          ?.focus();
      }}
      {...props}
    />
  );
}

// sm = 작은 Button(오른쪽 버튼). icon-xs · icon-sm 은 지우기 · 비밀번호 보기 같은 회색 아이콘 버튼(20 · 24px).
const inputGroupButtonVariants = cva("", {
  variants: {
    size: {
      sm: "",
      "icon-xs": `size-5 rounded-full border-0 p-0 text-grey-400
      [&_svg:not([class*='size-'])]:size-5`,
      "icon-sm": `size-6 rounded-full border-0 p-0 text-grey-400
      [&_svg:not([class*='size-'])]:size-6`,
    },
  },
  defaultVariants: {
    size: "icon-xs",
  },
});

type InputGroupButtonProps = Omit<ButtonProps, "size"> &
  VariantProps<typeof inputGroupButtonVariants>;

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "icon-xs",
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      type={type}
      data-slot="input-group-button"
      data-size={size}
      variant={variant}
      size={size === "sm" ? "sm" : "icon"}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        `flex items-center gap-2 [&_svg]:pointer-events-none
        [&_svg:not([class*='size-'])]:size-5`,
        className,
      )}
      {...props}
    />
  );
}

const CONTROL = `min-w-0 flex-1 bg-transparent p-0 caret-primary outline-none
placeholder:text-grey-500 disabled:cursor-not-allowed disabled:opacity-100
disabled:[-webkit-text-fill-color:var(--color-grey-400)]
disabled:placeholder:text-grey-400`;

type InputGroupInputProps = InputPrimitive.Props;

function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <InputPrimitive
      data-slot="input-group-control"
      className={cn(CONTROL, className)}
      {...props}
    />
  );
}

type InputGroupTextareaProps = React.ComponentProps<"textarea">;

// Base UI 에는 textarea 가 따로 없어 Field.Control 을 textarea 로 그린다 — Field 안에서 이름표 · 도움말 · invalid 가 이어진다
function InputGroupTextarea({
  className,
  ref,
  id,
  name,
  value,
  defaultValue,
  disabled,
  ...props
}: InputGroupTextareaProps) {
  return (
    <FieldPrimitive.Control
      ref={ref}
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      data-slot="input-group-control"
      className={cn(
        CONTROL,
        `resize-none field-sizing-content [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden`,
        className,
      )}
      render={<textarea {...props} />}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  inputGroupAddonVariants,
  inputGroupButtonVariants,
  inputGroupVariants,
  type InputGroupAddonProps,
  type InputGroupButtonProps,
  type InputGroupInputProps,
  type InputGroupProps,
  type InputGroupTextareaProps,
};
