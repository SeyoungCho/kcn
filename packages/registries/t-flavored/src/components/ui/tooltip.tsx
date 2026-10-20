import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Tooltip 에 t-flavored 의 모양을 입혔다. side 는 top · bottom 만 있고, 크기는 sm · default · lg 다.
// 열고 닫는 방법(open · defaultOpen · onOpenChange, 누르면 닫기 등)은 Base UI 의 props 를 그대로 쓴다.
// 흰 말풍선 위(또는 아래)에 둥근 꼬리가 붙고, 열릴 때 꼬리 쪽을 축으로 0 에서 살짝 넘쳤다가(약 2%) 제자리로 커진다.

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
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

// 글자 줄 높이는 1.5 — t5 · t6 · t7 토큰의 줄 높이가 이미 1.5 배다.
// 커지는 축은 말풍선의 꼬리 쪽 가장자리 가운데다(트리거 쪽 끝이 아니다).
const tooltipContentVariants = cva(
  `relative w-fit max-w-[calc(100vw-96px)] bg-popover break-keep
  whitespace-pre-line text-grey-800 data-[side=bottom]:origin-top
  data-[side=top]:origin-bottom shadow-lg transition-[scale,opacity]
  duration-420 ease-[cubic-bezier(0.4,1,0.25,1.08)] data-ending-style:scale-0
  data-ending-style:opacity-0 data-instant:transition-none
  data-starting-style:scale-0 data-starting-style:opacity-0`,
  {
    variants: {
      size: {
        sm: "rounded-lg px-3 py-2 text-t7 font-semibold",
        default: "rounded-2xl px-4 py-3.25 text-t6 font-bold",
        // 반경 18px 은 맞는 토큰이 없어 값을 그대로 쓴다
        lg: "rounded-[18px] px-5 py-3.25 text-t5 font-bold",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

// 꼬리는 말풍선과 1px 겹쳐 이음매가 보이지 않게 한다. 위쪽에 뜨면 뒤집는다.
const tooltipArrowVariants = cva("fill-popover data-[side=top]:rotate-180", {
  variants: {
    size: {
      sm: "h-2.25 w-6 data-[side=bottom]:-top-2 data-[side=top]:-bottom-2",
      default:
        "h-3 w-9.5 data-[side=bottom]:-top-2.75 data-[side=top]:-bottom-2.75",
      lg: "h-3 w-9.5 data-[side=bottom]:-top-2.75 data-[side=top]:-bottom-2.75",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

// 끝이 둥근 삼각형 — 밑변 양 끝을 부드럽게 말아 말풍선 테두리로 이어지게 했다(맨 아래 1px 은 겹치는 부분)
const ARROW_PATHS = {
  sm: "M0 8c1.5 0 2.9-.5 4-1.5l6.6-5.9c.8-.7 2-.7 2.8 0l6.6 5.9c1.1 1 2.5 1.5 4 1.5v1H0Z",
  default:
    "M0 11c3 0 5.4-.8 7.3-2.3L17.6.6c.8-.6 2-.6 2.8 0l10.3 8.1c1.9 1.5 4.3 2.3 7.3 2.3v1H0Z",
} as const;

type TooltipContentProps = TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "sideOffset" | "arrowPadding"
  > &
  VariantProps<typeof tooltipContentVariants> & {
    /** 트리거의 위 · 아래에만 뜬다. 자리가 모자라면 반대쪽으로 뒤집힌다. */
    side?: "top" | "bottom";
  };

// 트리거와 말풍선 사이를 sm 18px, default · lg 24px 띄운다(꼬리 포함)
function TooltipContent({
  className,
  size = "default",
  side = "bottom",
  sideOffset = size === "sm" ? 18 : 24,
  align = "center",
  alignOffset = 0,
  arrowPadding = 16,
  children,
  ...props
}: TooltipContentProps) {
  const arrowSize = size === "sm" ? "sm" : "default";

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        data-slot="tooltip-positioner"
        className="isolate z-50"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        arrowPadding={arrowPadding}
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
              viewBox={arrowSize === "sm" ? "0 0 24 9" : "0 0 38 12"}
              className="block size-full"
            >
              <path d={ARROW_PATHS[arrowSize]} />
            </svg>
          </TooltipPrimitive.Arrow>
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  tooltipContentVariants,
  tooltipArrowVariants,
  type TooltipProps,
  type TooltipContentProps,
};
