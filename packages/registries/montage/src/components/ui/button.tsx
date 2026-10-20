import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Button 에 montage 의 모양을 입혔다. outline-primary 는 shadcn 에 없는 variant 다.
// 마우스를 올리거나 누르면 위에 옅은 막(::after)이 깔린다 — 진하기는 variant 마다 --interaction-hover · --interaction-active 로 정한다.
// loading 은 글자를 감추고(폭은 그대로) 가운데에 도는 원을 띄운다.
const buttonVariants = cva(
  `group/button relative isolate inline-flex shrink-0 cursor-pointer
  items-center justify-center whitespace-nowrap outline-none select-none
  after:pointer-events-none after:absolute after:inset-0 after:-z-10
  after:rounded-[inherit] after:bg-fg-neutral-primary after:opacity-0
  after:transition-opacity after:duration-150
  hover:after:opacity-(--interaction-hover) focus-visible:outline-2
  focus-visible:outline-ring focus-visible:outline-solid
  active:after:opacity-(--interaction-active) disabled:pointer-events-none
  aria-busy:cursor-wait aria-busy:after:opacity-0 [&_svg]:pointer-events-none
  [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: `bg-primary text-primary-foreground [--interaction-active:0.18]
        [--interaction-hover:0.075] disabled:bg-surface-disable-primary
        disabled:text-fg-disable-primary`,
        secondary: `bg-secondary text-secondary-foreground backdrop-blur-[32px]
        [--interaction-active:0.12] [--interaction-hover:0.05]
        disabled:bg-surface-disable-primary disabled:text-fg-disable-primary
        disabled:backdrop-blur-none`,
        destructive: `bg-surface-negative-strong text-fg-negative-strong
        [--interaction-active:0.18] [--interaction-hover:0.075]
        disabled:bg-surface-disable-primary disabled:text-fg-disable-primary`,
        outline: `bg-transparent text-fg-neutral-primary
        shadow-[inset_0_0_0_1px_var(--color-line-neutral-secondary)]
        [--interaction-active:0.09] [--interaction-hover:0.0375]
        disabled:text-fg-disable-primary`,
        "outline-primary": `bg-transparent text-fg-brand-primary
        shadow-[inset_0_0_0_1px_var(--color-line-neutral-secondary)]
        [--interaction-active:0.09] [--interaction-hover:0.0375]
        disabled:text-fg-disable-primary`,
        ghost: `bg-transparent text-fg-neutral-primary
        [--interaction-active:0.12] [--interaction-hover:0.05]
        disabled:text-fg-disable-primary`,
        link: `bg-transparent text-fg-brand-primary [--interaction-active:0.12]
        [--interaction-hover:0.05] disabled:text-fg-disable-primary`,
      },
      size: {
        xs: `min-h-7 gap-1 rounded-8 px-2.5 py-1.5 text-caption1 font-semibold
        [&_svg:not([class*='size-'])]:size-3.5`,
        sm: `min-h-8 gap-1 rounded-10 px-3 py-2 text-caption1 font-semibold
        [&_svg:not([class*='size-'])]:size-4`,
        default: `min-h-10 gap-1 rounded-12 px-4 py-2.5 text-label1
        font-semibold [&_svg:not([class*='size-'])]:size-[18px]`,
        lg: `min-h-12 gap-1.5 rounded-14 px-5 py-[13px] text-body2 font-semibold
        [&_svg:not([class*='size-'])]:size-5`,
        "icon-xs": "size-7 rounded-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-8 rounded-10 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-10 rounded-12 [&_svg:not([class*='size-'])]:size-[18px]",
        "icon-lg": "size-12 rounded-14 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    compoundVariants: [
      // link 는 글자 버튼이다 — 좌우 여백 없이 글자만, 누르는 막은 글자보다 양옆으로 조금 넓게
      {
        variant: "link",
        size: ["xs", "sm"],
        className: "min-h-7 rounded-8 px-0 py-1 text-label1 after:-inset-x-1.5",
      },
      {
        variant: "link",
        size: ["default", "lg"],
        className:
          "min-h-8 rounded-10 px-0 py-[5px] text-body2 after:-inset-x-2",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /** 글자를 감추고 가운데에 도는 원을 띄운다. 폭은 그대로이고 누를 수 없다. */
    loading?: boolean;
  };

function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? (
        <>
          <span className="invisible contents">{children}</span>
          <svg
            data-slot="button-loader"
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            className="absolute top-1/2 left-1/2 size-[1.1em] -translate-1/2
              animate-spin"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="3"
            />
            <path
              d="M21 12a9 9 0 0 0-9-9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants, type ButtonProps };
