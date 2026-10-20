import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Input 에 montage 의 텍스트 필드 모양을 입혔다.
// 얇은 안쪽 테두리를 두르고, 초점이 오면 테두리가 파래지며 바깥으로 옅은 고리가 번진다. aria-invalid 면 빨간 테두리 · 고리.
// 비활성이면 바탕이 회색이 되지만 입력된 글자는 그대로 진하게 둔다.
// 이름표 · 도움말 · 오류 글은 Field 로, 앞뒤의 아이콘 · 글 · 버튼(지우기 · 비밀번호 보기 …)은 InputGroup 으로 붙인다.
// 흐림 32px 과 이징 ease 는 Tailwind 눈금에 없어 [] 로 적는다.
const inputVariants = cva(
  `w-full min-w-0 bg-effect-transparent-primary font-normal
  text-fg-neutral-primary caret-fg-brand-primary
  shadow-[inset_0_0_0_1px_var(--color-line-neutral-secondary)] outline-none
  backdrop-blur-[32px] transition-shadow duration-200 ease-[ease]
  placeholder:text-fg-neutral-tertiary
  focus:shadow-[inset_0_0_0_1px_var(--color-line-brand-strong),0_0_0_4px_var(--color-line-brand-focus)]
  aria-invalid:shadow-[inset_0_0_0_1px_var(--color-line-negative-primary)]
  aria-invalid:focus:shadow-[inset_0_0_0_1px_var(--color-line-negative-strong),0_0_0_4px_var(--color-line-negative-focus)]
  disabled:cursor-default disabled:bg-surface-neutral-tertiary
  disabled:shadow-[inset_0_0_0_1px_var(--color-line-neutral-tertiary)]
  disabled:backdrop-blur-none disabled:placeholder:text-fg-disable-primary
  [&::-webkit-inner-spin-button]:appearance-none
  [&::-webkit-search-cancel-button]:hidden
  [&::-webkit-search-decoration]:hidden`,
  {
    variants: {
      size: {
        default: "h-12 rounded-14 px-4 text-body2",
        sm: "h-10 rounded-12 px-3.5 text-label1",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type InputProps = Omit<InputPrimitive.Props, "size"> &
  VariantProps<typeof inputVariants>;

function Input({ className, type, size = "default", ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-size={size}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants, type InputProps };
