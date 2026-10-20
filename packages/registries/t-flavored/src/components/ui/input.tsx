import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Input 에 t-flavored 의 모양을 입혔다.
//   variant — default = 옅은 회색 상자, line = 밑줄, big = 큰 글씨 밑줄, hero = 밑줄 없는 큰 글씨.
// 초점이 오면 상자는 파랗게(5%) 물들고 밑줄은 파래진다. aria-invalid 면 빨갛게 바뀌고 한 번 좌우로 흔들린다.
// 상자의 물들임은 안쪽 그림자로 깐다 — <input> 에는 ::before 를 그릴 수 없다.
// 이름표 · 도움말 · 오류 글은 Field 로, 앞뒤의 글 · 버튼은 InputGroup 으로 붙인다.
const inputVariants = cva(
  `w-full min-w-0 bg-transparent text-grey-800 caret-primary outline-none
  placeholder:text-grey-500 aria-invalid:animate-[input-shake_0.36s_linear]
  motion-reduce:aria-invalid:animate-none disabled:cursor-not-allowed
  disabled:text-grey-400 disabled:opacity-100
  disabled:[-webkit-text-fill-color:var(--color-grey-400)]
  disabled:placeholder:text-grey-400`,
  {
    variants: {
      variant: {
        default: `rounded-xl border border-grey-opacity-100 bg-grey-opacity-50
        px-4 py-3.5 text-t5 shadow-[inset_0_0_0_100vmax_transparent]
        transition-shadow duration-200 ease-[ease]
        focus:not-aria-invalid:shadow-blue-900/5 aria-invalid:shadow-red-900/5
        disabled:bg-grey-200`,
        line: `border-b-2 border-grey-100 pb-1 text-t3 font-semibold
        focus:not-aria-invalid:border-blue-400 aria-invalid:border-red-600`,
        big: `border-b-2 border-grey-100 pb-1 text-t1 font-semibold
        focus:not-aria-invalid:border-blue-400 aria-invalid:border-red-600`,
        hero: "text-t1 font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type InputProps = InputPrimitive.Props & VariantProps<typeof inputVariants>;

function Input({ className, type, variant = "default", ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants, type InputProps };
