import type * as React from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { type VariantProps } from "class-variance-authority";

import { inputVariants } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// shadcn Textarea 에 t-flavored 의 모양을 입혔다. 모양 · 상태는 Input 과 같고(variant 도 같다), 글이 늘면 칸이 따라 커진다(field-sizing).
// 높이를 고정하려면 h-*, 최소 높이는 min-h-* 를 준다. 넘치면 스크롤하되 스크롤바는 감춘다.
// Base UI 에는 textarea 가 따로 없어 Field.Control 을 textarea 로 그린다 — Field 안에서 이름표 · 도움말 · invalid 가 이어진다.
type TextareaProps = React.ComponentProps<"textarea"> &
  VariantProps<typeof inputVariants>;

function Textarea({
  className,
  variant = "default",
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
      data-variant={variant}
      className={cn(
        inputVariants({ variant }),
        `block resize-none field-sizing-content [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden`,
        className,
      )}
      render={<textarea {...props} />}
    />
  );
}

export { Textarea, type TextareaProps };
