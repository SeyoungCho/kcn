import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Switch 에 montage 의 모양을 입혔다 — 회색(켜지면 파란) 길 위의 흰 손잡이.
// 누르는 동안 손잡이가 옆으로 늘어난다(켜져 있으면 왼쪽으로).
// 마우스를 올리거나 누르면 길 위에 옅은 막(::after)이 깔린다 — 꺼져 있으면 검게, 켜져 있으면 희게.
const switchVariants = cva(
  `group/switch peer relative inline-flex shrink-0 cursor-pointer items-center
  rounded-full bg-surface-neutral-strong outline-none
  transition-[background-color] duration-200 select-none
  after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]
  after:bg-fg-neutral-primary after:opacity-0
  after:transition-[opacity,background-color] after:duration-200
  hover:after:opacity-5 focus-visible:outline-2 focus-visible:outline-ring
  focus-visible:outline-solid focus-visible:after:opacity-0
  active:after:opacity-5 data-checked:bg-primary data-checked:after:bg-white
  data-disabled:pointer-events-none data-disabled:opacity-43`,
  {
    variants: {
      size: {
        default: "w-13 p-1",
        sm: "w-9.75 p-0.75",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const switchThumbVariants = cva(
  `pointer-events-none relative z-1 block shrink-0 rounded-full bg-white
  transition-[translate,width] duration-200`,
  {
    variants: {
      size: {
        default: `size-6 group-active/switch:w-7 data-checked:translate-x-5
        group-active/switch:data-checked:translate-x-4`,
        sm: `size-4.5 group-active/switch:w-5.25 data-checked:translate-x-3.75
        group-active/switch:data-checked:translate-x-3`,
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type SwitchProps = SwitchPrimitive.Root.Props &
  VariantProps<typeof switchVariants>;

function Switch({ className, size = "default", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={switchThumbVariants({ size })}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch, switchVariants, switchThumbVariants, type SwitchProps };
