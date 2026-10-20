import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Button 에 t-flavored 의 모양을 입혔다. weak · dark · destructive-weak 는 shadcn 에 없는 variant 다.
// 누르면 살짝 줄어들고 위에 딤(::after)이 깔린다. loading 은 글자를 감추고(폭은 그대로) 점 세 개를 띄운다.
const buttonVariants = cva(
  `group/button relative isolate inline-flex shrink-0 items-center
  justify-center overflow-hidden border border-transparent font-semibold
  whitespace-nowrap
  transition-[color,background-color,border-color,opacity,scale] duration-100
  ease-in-out outline-none select-none after:pointer-events-none after:absolute
  after:inset-0 after:-z-10 after:bg-(--button-dimmer) after:opacity-0
  after:transition-opacity after:duration-100 focus-visible:ring-3
  focus-visible:ring-ring/50 active:scale-[0.96] [--button-dimmer-opacity:0.26]
  active:after:opacity-(--button-dimmer-opacity) disabled:pointer-events-none
  disabled:opacity-30 aria-busy:pointer-events-none [&_svg]:pointer-events-none
  [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: `bg-primary text-primary-foreground
        [--button-dimmer:var(--color-black)]
        [--button-loader:var(--color-white)]`,
        weak: `bg-blue-300/15 text-blue-600
        [--button-dimmer:var(--color-blue-500)]
        [--button-loader:var(--color-blue-500)]`,
        dark: `bg-grey-700 text-white [--button-dimmer:var(--color-black)]
        [--button-loader:var(--color-white)]`,
        secondary: `bg-secondary text-secondary-foreground
        [--button-dimmer:var(--color-grey-700)]
        [--button-loader:var(--color-grey-700)]`,
        destructive: `bg-destructive text-destructive-foreground
        [--button-dimmer:var(--color-black)]
        [--button-loader:var(--color-white)]`,
        "destructive-weak": `bg-red-300/15 text-red-600
        [--button-dimmer:var(--color-red-500)]
        [--button-loader:var(--color-red-500)]`,
        outline: `border-grey-opacity-100 bg-transparent text-grey-700
        [--button-dimmer-opacity:1]
        [--button-dimmer:var(--color-grey-opacity-100)]
        [--button-loader:var(--color-grey-700)]`,
        ghost: `bg-transparent text-grey-700 [--button-dimmer-opacity:1]
        [--button-dimmer:var(--color-grey-opacity-100)]
        [--button-loader:var(--color-grey-700)]`,
        link: `overflow-visible border-0 font-medium text-grey-600
        after:-inset-x-[9px] after:-inset-y-1 after:rounded-[9px]
        [--button-dimmer-opacity:1]
        [--button-dimmer:var(--color-grey-opacity-100)]
        [--button-loader:var(--color-grey-600)] active:scale-100`,
      },
      size: {
        sm: `min-h-8 min-w-13 gap-1 rounded-sm px-2.5 text-t7
        [&_svg:not([class*='size-'])]:size-4`,
        default: `min-h-[38px] min-w-16 gap-1.5 rounded-md px-4 text-t6
        [&_svg:not([class*='size-'])]:size-[18px]`,
        lg: `min-h-12 min-w-20 gap-1.5 rounded-xl px-4 text-t5
        [&_svg:not([class*='size-'])]:size-5`,
        xl: `min-h-14 min-w-24 gap-2 rounded-2xl px-7 text-t5
        [&_svg:not([class*='size-'])]:size-5`,
        icon: "size-12 rounded-lg p-3 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    compoundVariants: [
      // link 는 글자 크기만 갖는다 — 높이 · 여백 · 최소 폭을 떼고 크기별 글자 크기만 남긴다
      {
        variant: "link",
        className: "min-h-0 min-w-0 rounded-none px-0",
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
    /** 글자를 감추고 점 세 개를 띄운다. 폭은 그대로이고 누를 수 없다. */
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
          <span
            data-slot="button-loader"
            aria-hidden
            className="absolute inset-0 flex items-center justify-center
              gap-[7px]"
          >
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className="size-2
                  animate-[button-loader_0.9s_ease-in-out_infinite_alternate]
                  rounded-full bg-(--button-loader)"
                style={{ animationDelay: `${index * 150}ms` }}
              />
            ))}
          </span>
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants, type ButtonProps };
