import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Toggle 에 montage 의 모양을 입혔다. 눌린(pressed) 토글은 옅은 파란 바탕에 파란 글자가 된다.
// default 는 회색 바탕, outline 은 테두리만 있다. icon 은 바탕 없이 아이콘만 있는 토글로, 눌리면 아이콘이 파래진다(shadcn 에 없는 variant).
// 아이콘 옆 여백은 아이콘에 data-icon="inline-start" · "inline-end" 를 달면 맞춰진다.
// 마우스를 올리거나 누르면 위에 옅은 막(::after)이 깔린다 — 진하기는 --interaction-hover · --interaction-active 로 정한다.
// 못 쓰는 토글은 눌려 있어도 회색으로 그린다 — data-pressed: 가 disabled: 보다 뒤에 생기므로 disabled:data-pressed: 로 한 번 더 적는다.
const toggleVariants = cva(
  `group/toggle relative isolate inline-flex shrink-0 cursor-pointer
  items-center justify-center whitespace-nowrap outline-none
  transition-[background-color,color,box-shadow] duration-300 ease-[ease]
  select-none after:pointer-events-none after:absolute after:inset-0 after:-z-10
  after:rounded-[inherit] after:bg-fg-neutral-primary after:opacity-0
  after:transition-opacity after:duration-150 after:ease-[ease]
  hover:after:opacity-(--interaction-hover) focus-visible:outline-2
  focus-visible:outline-ring focus-visible:outline-solid
  focus-visible:after:opacity-0 active:after:opacity-(--interaction-active)
  disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: `bg-muted text-fg-neutral-primary [--interaction-active:0.09]
        [--interaction-hover:0.0375] data-pressed:bg-surface-brand-subtle
        data-pressed:text-fg-brand-primary
        data-pressed:after:bg-fg-brand-primary
        data-pressed:[--interaction-active:0.12]
        data-pressed:[--interaction-hover:0.05]
        disabled:bg-surface-disable-primary disabled:text-fg-disable-primary
        disabled:data-pressed:bg-surface-disable-primary
        disabled:data-pressed:text-fg-disable-primary`,
        outline: `bg-transparent text-fg-neutral-primary
        shadow-[inset_0_0_0_1px_var(--color-line-neutral-secondary)]
        [--interaction-active:0.09] [--interaction-hover:0.0375]
        data-pressed:bg-surface-brand-subtle data-pressed:text-fg-brand-primary
        data-pressed:shadow-[inset_0_0_0_1px_var(--color-line-brand-primary)]
        data-pressed:after:bg-fg-brand-primary
        data-pressed:[--interaction-active:0.12]
        data-pressed:[--interaction-hover:0.05] disabled:text-fg-disable-primary
        disabled:data-pressed:bg-transparent
        disabled:data-pressed:text-fg-disable-primary
        disabled:data-pressed:shadow-[inset_0_0_0_1px_var(--color-line-neutral-secondary)]`,
        // 막은 아이콘보다 조금 넓은 원이고, 올리거나 누르면 살짝 커진다
        icon: `rounded-full bg-transparent text-fg-neutral-quaternary
        transition-none after:-inset-1 after:z-0 after:scale-95
        after:rounded-full after:transition-[opacity,scale]
        [--interaction-active:0.12] [--interaction-hover:0.05]
        hover:after:scale-100 focus-visible:after:scale-95
        active:after:scale-100 data-pressed:text-fg-brand-primary
        disabled:text-fg-disable-primary
        disabled:data-pressed:text-fg-disable-primary`,
      },
      // 아이콘이 있는 쪽은 바깥 여백이 조금 줄어든다
      size: {
        xs: `min-h-6 gap-0.5 rounded-8 px-2 py-1.25 text-caption2 font-medium
        has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5
        [&_svg:not([class*='size-'])]:size-3`,
        sm: `min-h-8 gap-1 rounded-10 px-2.5 py-2 text-caption1 font-medium
        has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2
        [&_svg:not([class*='size-'])]:size-3.5`,
        default: `min-h-9 gap-1 rounded-10 px-3 py-2.25 text-label2 font-medium
        has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5
        [&_svg:not([class*='size-'])]:size-3.5`,
        lg: `min-h-10 gap-1 rounded-12 px-3.5 py-2.5 text-label1 font-medium
        has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3
        [&_svg:not([class*='size-'])]:size-4`,
      },
    },
    compoundVariants: [
      // icon 은 크기가 곧 아이콘 크기다
      {
        variant: "icon",
        className: `min-h-0 gap-0 rounded-full p-0
        [&_svg:not([class*='size-'])]:size-full`,
      },
      { variant: "icon", size: "xs", className: "size-4" },
      { variant: "icon", size: "sm", className: "size-5" },
      { variant: "icon", size: "default", className: "size-6" },
      { variant: "icon", size: "lg", className: "size-7" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ToggleProps = TogglePrimitive.Props & VariantProps<typeof toggleVariants>;

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Toggle, toggleVariants, type ToggleProps };
