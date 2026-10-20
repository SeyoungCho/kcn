import type * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Tooltip 에 montage 의 모양을 입혔다. 크기는 sm · default 두 가지다.
// 뒤를 흐리는 반투명한 어두운 말풍선에 꼬리가 붙고, 열고 닫힐 때 서서히 나타나고 사라진다.
// 올린 뒤 잠깐 기다렸다 열리고, 떠난 뒤 잠깐 있다가 닫힌다 — TooltipProvider 의 기본값이라 앱에 한 번 둔다.
// 단축키는 TooltipShortcut 으로 글 뒤에 흐리게 붙인다.

type TooltipProviderProps = TooltipPrimitive.Provider.Props;

function TooltipProvider({
  delay = 200,
  closeDelay = 250,
  timeout = 350,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      closeDelay={closeDelay}
      timeout={timeout}
      {...props}
    />
  );
}

type TooltipProps = TooltipPrimitive.Root.Props;

function Tooltip(props: TooltipProps) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

// 바탕은 반전 색 위에 브랜드 색을 아주 옅게 한 겹(::before) 더 얹는다.
// 너비는 280px 까지(맞는 토큰이 없다), 화면이 좁으면 남은 너비까지.
const tooltipContentVariants = cva(
  `relative isolate w-fit max-w-[min(280px,var(--available-width))]
  bg-surface-neutral-inverse/88 break-keep wrap-anywhere text-fg-neutral-inverse
  backdrop-blur-[32px] transition-opacity duration-200 ease-[ease-in-out]
  before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]
  before:bg-surface-brand-primary/5 data-ending-style:opacity-0
  data-starting-style:opacity-0`,
  {
    variants: {
      size: {
        // 반경 6px 은 맞는 토큰이 없다
        sm: "rounded-[6px] px-2 py-1.25 text-caption2 font-medium",
        default: "rounded-8 px-3 py-2 text-label1 font-medium",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

// 꼬리는 아래를 향해 그려 두고 말풍선이 뜬 쪽에 따라 돌린다.
// 왼쪽 · 오른쪽에서는 돌린 만큼 (너비 - 높이)/2 를 말풍선 쪽으로 당긴다.
const tooltipArrowVariants = cva(
  `data-[side=bottom]:bottom-full data-[side=bottom]:rotate-180
  data-[side=left]:left-full data-[side=left]:-rotate-90
  data-[side=right]:right-full data-[side=right]:rotate-90
  data-[side=top]:top-full`,
  {
    variants: {
      size: {
        sm: `h-1.5 w-3.5 data-[side=left]:-translate-x-1
        data-[side=right]:translate-x-1`,
        default: `h-2 w-5 data-[side=left]:-translate-x-1.5
        data-[side=right]:translate-x-1.5`,
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

// 끝이 둥근 꼬리 — 말풍선과 같은 두 겹으로 칠한다
const ARROWS = {
  sm: {
    viewBox: "0 0 14 6",
    d: "M5.58 3.44L4.92 2.56C4.216 1.621 3.864 1.152 3.418 0.814C3.023 0.514 2.575 0.29 2.098 0.154C1.56 0 0.973 0 -0.2 0H15.2C14.027 0 13.44 0 12.902 0.154C12.425 0.29 11.977 0.514 11.582 0.814C11.136 1.152 10.784 1.621 10.08 2.56L9.42 3.44C8.769 4.308 8.443 4.743 8.044 4.898C7.694 5.034 7.306 5.034 6.956 4.898C6.557 4.743 6.231 4.308 5.58 3.44Z",
  },
  default: {
    viewBox: "0 0 20 8",
    d: "M8.07 4.165L6.416 2.235C5.711 1.413 5.359 1.002 4.93 0.707C4.551 0.445 4.129 0.251 3.683 0.133C3.18 0 2.639 0 1.556 0H19.444C18.361 0 17.82 0 17.317 0.133C16.871 0.251 16.449 0.445 16.07 0.707C15.641 1.002 15.289 1.413 14.584 2.235L12.93 4.165C12.093 5.142 11.674 5.63 11.176 5.809C10.739 5.966 10.261 5.966 9.824 5.809C9.326 5.63 8.907 5.142 8.07 4.165Z",
  },
} as const;

type TooltipContentProps = TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "side" | "sideOffset" | "align" | "alignOffset"
  > &
  VariantProps<typeof tooltipContentVariants>;

// 트리거와 말풍선 사이는 4px 에 꼬리 높이를 더한 만큼 띄운다
function TooltipContent({
  className,
  size = "default",
  side = "top",
  sideOffset = size === "sm" ? 10 : 12,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipContentProps) {
  const arrow = ARROWS[size ?? "default"];

  return (
    <TooltipPrimitive.Portal data-slot="tooltip-portal">
      <TooltipPrimitive.Positioner
        data-slot="tooltip-positioner"
        className="isolate z-50"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        arrowPadding={6}
        collisionPadding={20}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          data-size={size}
          className={cn(tooltipContentVariants({ size }), className)}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow
            data-slot="tooltip-arrow"
            className={tooltipArrowVariants({ size })}
          >
            <svg
              aria-hidden
              viewBox={arrow.viewBox}
              className="block size-full"
            >
              <path d={arrow.d} className="fill-surface-neutral-inverse/88" />
              <path d={arrow.d} className="fill-surface-brand-primary/5" />
            </svg>
          </TooltipPrimitive.Arrow>
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

function TooltipShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tooltip-shortcut"
      className={cn(
        "ms-1 whitespace-nowrap text-fg-neutral-inverse/61",
        className,
      )}
      {...props}
    />
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipShortcut,
  tooltipContentVariants,
  tooltipArrowVariants,
  type TooltipContentProps,
  type TooltipProps,
  type TooltipProviderProps,
};
