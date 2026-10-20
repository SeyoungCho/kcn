"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// shadcn Checkbox 에 t-flavored 의 모양을 입혔다. variant 는 circle(테 안의 체크) · line(체크만).
// 꺼진 모습(회색 테 · 회색 체크)은 Root 가, 켜진 모습(파란 원 + 흰 체크 / 파란 체크)은 Indicator 가 그린다.
// 켜면 Indicator 가 0.18s 에 나타나며 1 → 1.09 → 0.98 → 1 로 튀고, 끄면 회색이 0.2s 에 돌아온다.
// 못 쓰는 체크박스는 흐려지고, 누르면 좌우로 흔들린다.
const checkboxVariants = cva(
  `group/checkbox peer relative inline-flex shrink-0 cursor-pointer items-center
  justify-center outline-none select-none transition-[border-color] duration-200
  ease-out focus-visible:ring-3 focus-visible:ring-ring/50
  data-disabled:cursor-not-allowed data-disabled:opacity-40`,
  {
    variants: {
      variant: {
        // 24px 칸 안의 지름 22px · 두께 2px 테
        circle: `m-px size-[22px] rounded-full border-2 border-grey-300
        data-checked:border-transparent`,
        line: "size-6 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "circle",
    },
  },
);

const checkboxIconVariants = cva(
  "pointer-events-none shrink-0 transition-opacity duration-200 ease-out",
  {
    variants: {
      variant: {
        // 원 안의 체크는 획 2px, 홀로 쓰는 체크는 획 2.7px
        circle: "size-3.5 stroke-[3.5]",
        line: "size-5 stroke-[3.25]",
      },
    },
    defaultVariants: {
      variant: "circle",
    },
  },
);

// 켜질 때만 나타난다(Base UI 가 그때 data-starting-style 을 건다 — 처음부터 켜져 있으면 움직이지 않는다).
// scale 은 0 → 1 로 가는 동안 linear() 가 값을 그대로 그린다: 1 에서 1.09 로 부풀었다가 0.98 로 줄고 1 로 돌아온다.
const checkboxIndicatorVariants = cva(
  `absolute flex items-center justify-center transition-[opacity,scale]
  duration-[180ms,700ms]
  ease-[ease,linear(1,1.07_9.5%,1.092_21%,1.037_33%,0.983_43%,0.979_49%,0.999_67%,1.004_76%,1)]
  data-starting-style:scale-0 data-starting-style:opacity-0`,
  {
    variants: {
      variant: {
        circle: "-inset-0.5 rounded-full bg-primary text-primary-foreground",
        // 홀로 쓰는 체크는 끌 때 파랑이 회색으로 0.18s 에 바래 간다
        line: "inset-0 text-primary data-ending-style:opacity-0",
      },
    },
    defaultVariants: {
      variant: "circle",
    },
  },
);

type CheckboxProps = CheckboxPrimitive.Root.Props &
  VariantProps<typeof checkboxVariants>;

// 못 쓰는 체크박스를 누르면 0.4s 동안 2px → -2px → 1px → -1px 로 흔든다
function shake(element: HTMLElement) {
  element.animate(
    {
      translate: ["0", "2px", "-2px", "1px", "-1px", "0"],
      easing: "ease-in-out",
    },
    { duration: 400 },
  );
}

function Checkbox({
  className,
  variant = "circle",
  onClickCapture,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-variant={variant}
      className={cn(checkboxVariants({ variant }), className)}
      // 못 쓸 때는 Base UI 가 onClick 을 막으므로 capture 에서 본다
      onClickCapture={(event) => {
        onClickCapture?.(event);
        if (event.currentTarget.hasAttribute("data-disabled")) {
          shake(event.currentTarget);
        }
      }}
      {...props}
    >
      <CheckIcon
        data-slot="checkbox-icon"
        aria-hidden
        className={cn(
          checkboxIconVariants({ variant }),
          "text-grey-300 group-data-checked/checkbox:opacity-0",
          // 못 쓰는 원형은 꺼진 체크가 한 단계 옅다
          variant === "circle" && "group-data-disabled/checkbox:text-grey-200",
        )}
      />
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={checkboxIndicatorVariants({ variant })}
      >
        <CheckIcon
          data-slot="checkbox-indicator-icon"
          aria-hidden
          className={checkboxIconVariants({ variant })}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export {
  Checkbox,
  checkboxVariants,
  checkboxIconVariants,
  checkboxIndicatorVariants,
  type CheckboxProps,
};
