import type * as React from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Textarea 에 montage 의 텍스트 영역 모양을 입혔다. 테두리 · 초점 고리 · invalid · 비활성은 Input 과 같다.
// 처음에는 두 줄 높이이고, 글이 늘면 칸이 따라 커진다(field-sizing). 더 커지지 않게 하려면 max-h-* 를 준다.
// 아래쪽의 아이콘 · 버튼 · 글자 수는 InputGroup(InputGroupTextarea + align="block-end" 인 InputGroupAddon)으로 붙인다.
// Base UI 에는 textarea 가 따로 없어 Field.Control 을 textarea 로 그린다 — Field 안에서 이름표 · 도움말 · invalid 가 이어진다.
// 흐림 32px 과 이징 ease 는 Tailwind 눈금에 없어 [] 로 적는다.
const textareaVariants = cva(
  `block w-full min-w-0 resize-none field-sizing-content
  bg-effect-transparent-primary px-4 py-3 font-normal text-fg-neutral-primary
  caret-fg-brand-primary
  shadow-[inset_0_0_0_1px_var(--color-line-neutral-secondary)] outline-none
  backdrop-blur-[32px] transition-shadow duration-200 ease-[ease]
  placeholder:text-fg-neutral-tertiary
  focus:shadow-[inset_0_0_0_1px_var(--color-line-brand-strong),0_0_0_4px_var(--color-line-brand-focus)]
  aria-invalid:shadow-[inset_0_0_0_1px_var(--color-line-negative-primary)]
  aria-invalid:focus:shadow-[inset_0_0_0_1px_var(--color-line-negative-strong),0_0_0_4px_var(--color-line-negative-focus)]
  disabled:cursor-default disabled:bg-surface-neutral-tertiary
  disabled:shadow-[inset_0_0_0_1px_var(--color-line-neutral-tertiary)]
  disabled:backdrop-blur-none disabled:placeholder:text-fg-disable-primary`,
  {
    variants: {
      // 높이 = 위아래 여백 + 두 줄
      size: {
        default: "min-h-18 rounded-14 text-body2-reading",
        sm: "min-h-17 rounded-12 text-label1-reading",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type TextareaProps = React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants>;

function Textarea({
  className,
  size = "default",
  ref,
  id,
  name,
  value,
  defaultValue,
  disabled,
  ...props
}: TextareaProps) {
  return (
    <FieldPrimitive.Control
      ref={ref}
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      data-slot="textarea"
      data-size={size}
      className={cn(textareaVariants({ size }), className)}
      render={<textarea {...props} />}
    />
  );
}

export { Textarea, textareaVariants, type TextareaProps };
