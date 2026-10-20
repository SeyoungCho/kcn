import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn RadioGroup 에 montage 의 모양을 입혔다 — 흰 원에 회색 테, 고르면 파란 원 가운데에 흰 점.
// 원 둘레에 여백(margin)을 두어 정사각형 자리를 차지하고, tight 는 좌우 여백을 없애 위아래 글자와 줄을 맞춘다.
// 마우스를 올리거나 누르면 원 위에 옅은 원(::after)이 깔린다 — 이 원까지 누를 수 있는 자리다.
type RadioGroupProps = RadioGroupPrimitive.Props;

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  );
}

const radioGroupItemVariants = cva(
  `group/radio-group-item peer relative m-0.5 inline-flex shrink-0
  cursor-pointer items-center justify-center rounded-full bg-bg-neutral-primary
  shadow-[inset_0_0_0_1.5px_var(--color-line-neutral-primary)] outline-none
  select-none after:absolute after:top-1/2 after:left-1/2 after:-translate-1/2
  after:rounded-full after:bg-fg-neutral-primary after:opacity-0
  after:transition-opacity after:duration-150 after:ease-[ease]
  hover:after:opacity-5 focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-ring focus-visible:outline-solid
  focus-visible:after:opacity-0 active:after:opacity-12 data-checked:bg-primary
  data-checked:shadow-none data-disabled:pointer-events-none
  data-disabled:opacity-43`,
  {
    variants: {
      size: {
        default: "size-5 after:size-8",
        sm: "size-4 after:size-7",
      },
      tight: {
        true: "mx-0",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      tight: false,
    },
  },
);

const radioGroupIndicatorVariants = cva("rounded-full bg-white", {
  variants: {
    size: {
      default: "size-2",
      // 7px 점은 간격 눈금에 없다
      sm: "size-[7px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type RadioGroupItemProps = RadioPrimitive.Root.Props &
  VariantProps<typeof radioGroupItemVariants>;

function RadioGroupItem({
  className,
  size = "default",
  tight = false,
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      data-size={size}
      className={cn(radioGroupItemVariants({ size, tight }), className)}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={radioGroupIndicatorVariants({ size })}
      />
    </RadioPrimitive.Root>
  );
}

export {
  RadioGroup,
  RadioGroupItem,
  radioGroupItemVariants,
  radioGroupIndicatorVariants,
  type RadioGroupProps,
  type RadioGroupItemProps,
};
