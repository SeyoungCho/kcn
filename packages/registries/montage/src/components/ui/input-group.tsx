"use client";

import type * as React from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// shadcn InputGroup 에 montage 의 텍스트 필드 · 검색 필드 모양을 입혔다.
// 상자(InputGroup)가 Input 의 모양을 지고, 안의 칸(InputGroupInput · InputGroupTextarea)은 맨 글자만 남긴다.
// 앞뒤의 아이콘 · 글 · 버튼은 InputGroupAddon 에 담는다. 상태는 칸에서 읽는다 — 초점 · aria-invalid · disabled.
//   variant — default = 테두리 상자(텍스트 필드), secondary = 회색으로 채운 상자(검색 필드).
// 검색 칸(type="search")은 초점 고리를 그리지 않고, 비활성이면 글자 · 아이콘까지 흐려진다. 상자의 빈 곳을 눌러도 칸에 초점이 간다.
// 흐림 32px 과 이징 ease 는 Tailwind 눈금에 없어 [] 로 적는다.
const inputGroupVariants = cva(
  `group/input-group relative flex w-full min-w-0 cursor-text items-center
  gap-0.5 font-normal backdrop-blur-[32px] transition-shadow duration-200
  ease-[ease] has-[>textarea]:h-auto has-[>textarea]:flex-col
  has-[>textarea]:items-stretch has-[>textarea]:gap-3 has-[>textarea]:p-3
  has-[[data-slot=input-group-control]:disabled]:cursor-default`,
  {
    variants: {
      variant: {
        default: `bg-effect-transparent-primary
        shadow-[inset_0_0_0_1px_var(--color-line-neutral-secondary)]
        has-[[data-slot=input-group-control]:focus:not([type=search],[aria-invalid=true])]:shadow-[inset_0_0_0_1px_var(--color-line-brand-strong),0_0_0_4px_var(--color-line-brand-focus)]
        has-[[data-slot=input-group-control][aria-invalid=true]]:shadow-[inset_0_0_0_1px_var(--color-line-negative-primary)]
        has-[[data-slot=input-group-control][aria-invalid=true]:focus]:shadow-[inset_0_0_0_1px_var(--color-line-negative-strong),0_0_0_4px_var(--color-line-negative-focus)]
        has-[[data-slot=input-group-control]:disabled]:bg-surface-neutral-tertiary
        has-[[data-slot=input-group-control]:disabled]:shadow-[inset_0_0_0_1px_var(--color-line-neutral-tertiary)]
        has-[[data-slot=input-group-control]:disabled]:backdrop-blur-none`,
        secondary: "bg-surface-neutral-secondary",
      },
      size: {
        default: "h-12 rounded-14 px-3 text-body2",
        sm: "h-10 rounded-12 px-2.5 text-label1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type InputGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupVariants>;

function InputGroup({
  className,
  variant = "default",
  size = "default",
  onClick,
  ...props
}: InputGroupProps) {
  return (
    <div
      role="group"
      data-slot="input-group"
      data-variant={variant}
      data-size={size}
      className={cn(inputGroupVariants({ variant, size }), className)}
      onClick={(event) => {
        onClick?.(event);
        if (
          (event.target as HTMLElement).closest(
            "input, textarea, button, a, [contenteditable]",
          )
        ) {
          return;
        }
        event.currentTarget
          .querySelector<HTMLElement>("[data-slot=input-group-control]")
          ?.focus();
      }}
      {...props}
    />
  );
}

// 아이콘은 칸 크기에 맞춘 상자(24 · 20px) 가운데에 선다. 글자 버튼만 담은 뒤쪽 칸은 상자 끝으로 조금 붙는다.
// textarea 위아래 칸은 높이가 다른 것끼리 아래 끝을 맞춘다.
const inputGroupAddonVariants = cva(
  `flex shrink-0 items-center gap-2 text-fg-neutral-tertiary select-none
  [&>svg]:pointer-events-none [&>svg]:mx-0.5
  [&>svg:not([class*='size-'])]:size-5
  group-data-[size=sm]/input-group:[&>svg]:mx-px
  group-data-[size=sm]/input-group:[&>svg:not([class*='size-'])]:size-4.5
  group-has-[[data-slot=input-group-control][type=search]:disabled]/input-group:text-fg-disable-primary`,
  {
    variants: {
      align: {
        "inline-start": "order-first",
        "inline-end": `order-last
        has-[>[data-slot=input-group-button]:is([data-size=sm],[data-size=xs])]:-mr-1
        has-[>[data-slot=input-group-button]:is([data-size=sm],[data-size=xs])]:ml-1`,
        "block-start": `order-first w-full items-end
        group-data-[size=sm]/input-group:gap-1.5`,
        "block-end": `order-last w-full items-end
        group-data-[size=sm]/input-group:gap-1.5`,
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
      {...props}
    />
  );
}

// xs · sm = 칸 끝의 글자 버튼(Button 의 xs · sm 과 같다).
// icon-xs · icon-sm = 지우기 · 비밀번호 보기 같은 맨 아이콘 버튼 — 누르면 아이콘보다 넓은 막이 깔린다.
// 상자가 size="sm" 이면 sm · icon-sm 은 한 단계 작아진다.
const inputGroupButtonVariants = cva("", {
  variants: {
    size: {
      xs: "",
      sm: `group-data-[size=sm]/input-group:min-h-7
      group-data-[size=sm]/input-group:rounded-8
      group-data-[size=sm]/input-group:px-2.5
      group-data-[size=sm]/input-group:py-1.5
      group-data-[size=sm]/input-group:[&_svg:not([class*='size-'])]:size-3.5`,
      "icon-xs": `mx-px size-4.5 rounded-8 text-fg-neutral-tertiary
      [--interaction-active:0.09] [--interaction-hover:0.0375] after:-inset-1.25
      after:scale-95 after:transition-[opacity,scale] hover:after:scale-100
      active:after:scale-100 [&_svg:not([class*='size-'])]:size-4.5`,
      "icon-sm": `mx-0.5 size-5 rounded-10 text-fg-neutral-tertiary
      [--interaction-active:0.09] [--interaction-hover:0.0375] after:-inset-1.5
      after:scale-95 after:transition-[opacity,scale] hover:after:scale-100
      active:after:scale-100 [&_svg:not([class*='size-'])]:size-5
      group-data-[size=sm]/input-group:mx-px
      group-data-[size=sm]/input-group:size-4.5
      group-data-[size=sm]/input-group:rounded-8
      group-data-[size=sm]/input-group:after:-inset-1.25
      group-data-[size=sm]/input-group:[&_svg:not([class*='size-'])]:size-4.5
      group-data-[size=sm]/input-group:group-has-[>textarea]/input-group:m-0.5`,
    },
  },
  defaultVariants: {
    size: "icon-sm",
  },
});

type InputGroupButtonProps = Omit<ButtonProps, "size"> &
  VariantProps<typeof inputGroupButtonVariants>;

function InputGroupButton({
  className,
  type = "button",
  size = "icon-sm",
  // 글자 버튼은 테두리, 아이콘 버튼은 바탕 없이
  variant = size === "xs" || size === "sm" ? "outline" : "ghost",
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      type={type}
      data-slot="input-group-button"
      variant={variant}
      size={size}
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
        `flex items-center gap-2 px-1 text-fg-neutral-primary
        [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5
        group-data-[size=sm]/input-group:[&_svg:not([class*='size-'])]:size-4.5`,
        className,
      )}
      {...props}
    />
  );
}

const CONTROL = `min-w-0 bg-transparent px-1 text-fg-neutral-primary
caret-fg-brand-primary outline-none placeholder:text-fg-neutral-tertiary
disabled:cursor-default disabled:placeholder:text-fg-disable-primary`;

type InputGroupInputProps = InputPrimitive.Props;

function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <InputPrimitive
      data-slot="input-group-control"
      className={cn(
        CONTROL,
        `flex-1 self-stretch [&[type=search]:disabled]:text-fg-disable-primary
        [&::-webkit-inner-spin-button]:appearance-none
        [&::-webkit-search-cancel-button]:hidden
        [&::-webkit-search-decoration]:hidden`,
        className,
      )}
      {...props}
    />
  );
}

type InputGroupTextareaProps = React.ComponentProps<"textarea">;

// Base UI 에는 textarea 가 따로 없어 Field.Control 을 textarea 로 그린다 — Field 안에서 이름표 · 도움말 · invalid 가 이어진다.
// 처음에는 두 줄 높이이고, 글이 늘면 따라 커진다.
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
        `block min-h-12 w-full resize-none field-sizing-content
        text-body2-reading group-data-[size=sm]/input-group:min-h-11
        group-data-[size=sm]/input-group:text-label1-reading`,
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
