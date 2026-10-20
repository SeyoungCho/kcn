import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// shadcn Checkbox 에 montage 의 모양을 입혔다. variant 는 default(네모 칸) · circle(동그란 칸) · check(칸 없이 체크만).
// 칸 둘레에 여백(margin)을 두어 정사각형 자리를 차지하고, tight 는 좌우 여백을 줄여 위아래 글자와 줄을 맞춘다.
// 마우스를 올리거나 누르면 칸 위에 옅은 원(::after)이 살짝 커지며 깔린다 — 이 원까지 누를 수 있는 자리다.
const checkboxVariants = cva(
  `group/checkbox peer relative inline-flex shrink-0 cursor-pointer items-center
  justify-center outline-none select-none after:absolute after:top-1/2
  after:left-1/2 after:-translate-1/2 after:scale-95 after:rounded-full
  after:bg-fg-neutral-primary after:opacity-0 after:transition-[opacity,scale]
  after:duration-150 after:ease-[ease] hover:after:scale-100
  hover:after:opacity-5 focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-ring focus-visible:outline-solid
  focus-visible:after:scale-95 focus-visible:after:opacity-0
  active:after:scale-100 active:after:opacity-12
  data-disabled:pointer-events-none data-disabled:opacity-43`,
  {
    variants: {
      variant: {
        // 모서리 5px 는 반경 토큰에 없다
        default: `rounded-[5px]
        data-checked:shadow-[inset_0_0_0_1.5px_var(--color-primary)]
        data-indeterminate:shadow-[inset_0_0_0_1.5px_var(--color-primary)]`,
        circle:
          "rounded-full data-checked:shadow-none data-indeterminate:shadow-none",
        check: `rounded-full text-fg-neutral-quaternary transition-colors
        duration-150 ease-[ease] data-checked:text-fg-brand-primary
        data-indeterminate:text-fg-brand-primary`,
      },
      size: {
        default: "after:size-8",
        sm: "after:size-7",
      },
      tight: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // 칸이 있는 모양 — 흰 칸에 회색 테, 켜지면 파랗게 찬다
      {
        variant: ["default", "circle"],
        className: `bg-bg-neutral-primary text-white
        shadow-[inset_0_0_0_1.5px_var(--color-line-neutral-primary)]
        transition-[background-color,box-shadow] duration-200 ease-[ease]
        data-checked:bg-primary data-indeterminate:bg-primary`,
      },
      { variant: "default", size: "default", className: "m-0.75 size-4.5" },
      { variant: "default", size: "sm", className: "m-0.5 size-4" },
      { variant: "circle", size: "default", className: "m-0.5 size-5" },
      { variant: "circle", size: "sm", className: "m-0.5 size-4" },
      { variant: "check", size: "default", className: "size-6" },
      { variant: "check", size: "sm", className: "size-5" },
      // tight — 좌우 여백만 줄인다(check 는 아이콘이 양옆으로 조금 넘친다)
      { variant: "default", size: "default", tight: true, className: "mx-px" },
      { variant: "default", size: "sm", tight: true, className: "mx-0" },
      { variant: "circle", tight: true, className: "mx-0" },
      { variant: "check", tight: true, className: "-mx-0.5" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      tight: false,
    },
  },
);

// 칸 안의 체크는 켜질 때 작은 크기에서 커지며 나타나고, 끌 때 거꾸로 사라진다.
// check 는 체크가 늘 보이고 색만 바뀐다.
const checkboxIndicatorVariants = cva("flex items-center justify-center", {
  variants: {
    variant: {
      default: "",
      circle: "",
      check: "",
    },
  },
  compoundVariants: [
    {
      variant: ["default", "circle"],
      className: `transition-[opacity,scale] duration-[150ms,200ms] ease-[ease]
      data-ending-style:scale-75 data-ending-style:opacity-0
      data-starting-style:scale-75 data-starting-style:opacity-0`,
    },
  ],
  defaultVariants: {
    variant: "default",
  },
});

const checkboxIconVariants = cva("pointer-events-none shrink-0 stroke-3", {
  variants: {
    variant: {
      default: "",
      circle: "",
      check: "",
    },
    size: {
      default: "",
      sm: "",
    },
  },
  compoundVariants: [
    { variant: ["default", "circle"], size: "default", className: "size-3.5" },
    { variant: ["default", "circle"], size: "sm", className: "size-3" },
    { variant: "check", size: "default", className: "size-5" },
    { variant: "check", size: "sm", className: "size-4.25" },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type CheckboxProps = CheckboxPrimitive.Root.Props &
  VariantProps<typeof checkboxVariants>;

function Checkbox({
  className,
  variant = "default",
  size = "default",
  tight = false,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-variant={variant}
      data-size={size}
      className={cn(checkboxVariants({ variant, size, tight }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        // check 는 꺼져 있어도 회색 체크를 그린다
        keepMounted={variant === "check"}
        className={checkboxIndicatorVariants({ variant })}
      >
        <CheckIcon
          data-slot="checkbox-icon"
          aria-hidden
          className={cn(
            checkboxIconVariants({ variant, size }),
            "group-data-indeterminate/checkbox:hidden",
          )}
        />
        <MinusIcon
          data-slot="checkbox-icon"
          aria-hidden
          className={cn(
            checkboxIconVariants({ variant, size }),
            "hidden group-data-indeterminate/checkbox:block",
          )}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export {
  Checkbox,
  checkboxVariants,
  checkboxIndicatorVariants,
  checkboxIconVariants,
  type CheckboxProps,
};
