"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import IconXmarkLine from "@karrotmarket/react-monochrome-icon/IconXmarkLine";

import { ActionButton } from "@/components/ui/action-button";
import type { ActionButtonProps } from "@/components/ui/action-button";
import { Icon } from "@/components/ui/icon";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";
type Placement = Side | `${Side}-${"start" | "end"}`;

/** 'top-start' → ['top', 'start'] — SEED 는 자리를 한 낱말로, Base UI 는 변과 맞춤으로 나눠 받는다. */
const splitPlacement = (placement: Placement) => {
  const [side, align = "center"] = placement.split("-") as [
    Side,
    Align | undefined,
  ];
  return { side, align };
};

interface PopoverPositioning {
  placement: Placement;
  gutter: number;
  overflowPadding: number;
  strategy: "absolute" | "fixed";
  autoFocus: boolean;
}

// SEED 는 자리 잡는 값을 Root 가 받고, Base UI 는 Positioner 가 받는다 — Root 가 받아 두었다가 Content 에 건넨다.
const PopoverPositioningContext = React.createContext<PopoverPositioning>({
  placement: "bottom",
  gutter: 8,
  overflowPadding: 16,
  strategy: "absolute",
  autoFocus: true,
});

export interface PopoverRootProps extends PopoverPrimitive.Root.Props {
  /** 뜨는 자리 @default "bottom" */
  placement?: Placement;
  /** 기준 요소와의 간격(px) @default 8 */
  gutter?: number;
  /** 화면 가장자리와 띄울 간격(px) @default 16 */
  overflowPadding?: number;
  /** @default "absolute" */
  strategy?: "absolute" | "fixed";
  /** 열릴 때 초점을 창으로 옮길지 @default true */
  autoFocus?: boolean;
}

function PopoverRoot({
  placement = "bottom",
  gutter = 8,
  overflowPadding = 16,
  strategy = "absolute",
  autoFocus = true,
  ...props
}: PopoverRootProps) {
  const positioning = React.useMemo(
    () => ({ placement, gutter, overflowPadding, strategy, autoFocus }),
    [placement, gutter, overflowPadding, strategy, autoFocus],
  );
  return (
    <PopoverPositioningContext.Provider value={positioning}>
      <PopoverPrimitive.Root {...props} />
    </PopoverPositioningContext.Provider>
  );
}

export type PopoverTriggerProps = PopoverPrimitive.Trigger.Props;

function PopoverTrigger(props: PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

// 커지고 줄어드는 기준점 — SEED 처럼 기준 요소 쪽 변, 맞춘 쪽 모서리.
const TRANSFORM_ORIGIN = [
  "data-[side=top]:origin-bottom data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left",
  "data-[side=top]:data-[align=start]:origin-bottom-left data-[side=top]:data-[align=end]:origin-bottom-right",
  "data-[side=bottom]:data-[align=start]:origin-top-left data-[side=bottom]:data-[align=end]:origin-top-right",
  "data-[side=left]:data-[align=start]:origin-top-right data-[side=left]:data-[align=end]:origin-bottom-right",
  "data-[side=right]:data-[align=start]:origin-top-left data-[side=right]:data-[align=end]:origin-bottom-left",
].join(" ");

const FOCUS_RING_TRANSITION =
  "outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)";

function PopoverCloseButton({
  className,
  ref,
  ...props
}: PopoverPrimitive.Close.Props) {
  const { scaleFeedbackRef, scaleFeedbackClassName } = useScaleFeedback(ref);
  return (
    <PopoverPrimitive.Close
      ref={scaleFeedbackRef}
      data-slot="popover-close-button"
      className={cn(
        scaleFeedbackClassName,
        // 누르는 자리는 52px, 보이는 아이콘은 22px — 여백을 음수 바깥 여백으로 되돌려 자리를 차지하지 않게 한다.
        `absolute top-6.75 right-6 -m-3.75 flex cursor-pointer items-center
        justify-center rounded-r3 border-none bg-bg-transparent p-3.75`,
        "[--icon-color:var(--fg-neutral-subtle)] [--icon-size:22px]",
        `[transition:background_var(--motion-duration-color-transition)_var(--motion-ease-easing),var(--feedback-scale-transition),${FOCUS_RING_TRANSITION}]`,
        `outline-(length:--dimension-x0_5) outline-offset-(--dimension-x0_5)
        outline-transparent outline-solid focused:outline-stroke-focus-ring`,
        "engaged:bg-bg-transparent-pressed pressed:scale-(--feedback-scale)",
        className,
      )}
      {...props}
    />
  );
}

export interface PopoverContentProps extends Omit<
  PopoverPrimitive.Popup.Props,
  "title"
> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** @default true */
  showCloseButton?: boolean;
  /** 창을 그려 넣을 곳 — 안 주면 body */
  positionerContainer?: PopoverPrimitive.Portal.Props["container"];
  /** 창을 붙일 요소 — 안 주면 트리거(PopoverTrigger 없이 바깥이 열고 닫는 칸에 붙일 때) */
  anchor?: PopoverPrimitive.Positioner.Props["anchor"];
}

function PopoverContent({
  children,
  title,
  description,
  showCloseButton = true,
  positionerContainer,
  anchor,
  className,
  ref,
  ...props
}: PopoverContentProps) {
  const { placement, gutter, overflowPadding, strategy, autoFocus } =
    React.useContext(PopoverPositioningContext);
  const popupRef = React.useRef<HTMLDivElement | null>(null);
  const mergedRef = useMergedRefs(popupRef, ref);
  const hasHeader = Boolean(title || description || showCloseButton);

  return (
    <PopoverPrimitive.Portal container={positionerContainer}>
      <PopoverPrimitive.Positioner
        data-slot="popover-positioner"
        anchor={anchor}
        {...splitPlacement(placement)}
        sideOffset={gutter}
        collisionPadding={overflowPadding}
        // 자리가 모자라면 맞은편으로만 뒤집는다(옆으로 돌아가지 않는다) — 그래도 모자라면 제자리에서 높이를 줄인다.
        collisionAvoidance={{ fallbackAxisSide: "none" }}
        positionMethod={strategy}
        className="z-[calc(99999+var(--z-index-offset,0))]
          max-w-(--available-width) outline-none"
      >
        <PopoverPrimitive.Popup
          ref={mergedRef}
          data-slot="popover-content"
          // 첫 버튼(닫기)이 아니라 창 자체가 초점을 받는다 — SEED 와 같다.
          initialFocus={autoFocus ? popupRef : false}
          className={cn(
            `relative box-border flex w-auto flex-col rounded-r5
            bg-bg-layer-floating shadow-s3 outline-none`,
            `max-h-[min(600px,var(--available-height,600px))]
            max-w-[min(480px,var(--available-width,480px))]
            min-w-[min(320px,var(--available-width,320px))]`,
            TRANSFORM_ORIGIN,
            `data-open:animate-[seed-enter_var(--motion-duration-d3)_var(--motion-ease-enter)]
            [--seed-enter-opacity:0] [--seed-enter-scale:0.95]`,
            `data-closed:animate-[seed-exit_var(--motion-duration-d2)_var(--motion-ease-exit)_forwards]
            [--seed-exit-opacity:0] [--seed-exit-scale:0.95]`,
            className,
          )}
          {...props}
        >
          {hasHeader ? (
            <div
              data-slot="popover-header"
              className={cn(
                "box-border flex shrink-0 flex-col gap-x1.5 px-x6 pt-x6 pb-x4",
                showCloseButton &&
                  "pr-[calc(24px_+_22px_+_var(--dimension-x1_5))]",
              )}
            >
              {title ? (
                <PopoverPrimitive.Title
                  data-slot="popover-title"
                  className="m-0 text-t7 font-bold break-keep text-fg-neutral"
                >
                  {title}
                </PopoverPrimitive.Title>
              ) : null}
              {description ? (
                <PopoverPrimitive.Description
                  data-slot="popover-description"
                  className="m-0 text-t4 font-regular whitespace-pre-wrap
                    text-fg-neutral-muted"
                >
                  {description}
                </PopoverPrimitive.Description>
              ) : null}
              {showCloseButton ? (
                <PopoverCloseButton aria-label="닫기">
                  <Icon svg={<IconXmarkLine />} />
                </PopoverCloseButton>
              ) : null}
            </div>
          ) : null}
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export type PopoverBodyProps = React.ComponentProps<"div">;

function PopoverBody({ className, ref, ...props }: PopoverBodyProps) {
  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const mergedRef = useMergedRefs(bodyRef, ref);
  const [scrolled, setScrolled] = React.useState(false);
  const [overflowing, setOverflowing] = React.useState(false);

  React.useEffect(() => {
    const element = bodyRef.current;
    if (!element) return undefined;

    const check = () => {
      setScrolled(element.scrollTop > 0);
      // 넘칠 때 붙이는 아래 여백은 빼고 잰다 — 안 그러면 여백 때문에 넘친 것으로 보여 상태가 가라앉지 않는다.
      const paddingBottom =
        Number.parseFloat(getComputedStyle(element).paddingBottom) || 0;
      setOverflowing(
        element.scrollHeight - paddingBottom > element.clientHeight,
      );
    };
    check();
    element.addEventListener("scroll", check);
    const observer = new ResizeObserver(check);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", check);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={mergedRef}
      data-slot="popover-body"
      data-scrolled={scrolled ? "" : undefined}
      data-overflow={overflowing ? "" : undefined}
      className={cn(
        `box-border flex h-auto max-h-none min-h-0 flex-1 flex-col
        overflow-y-auto px-x6`,
        "transition-shadow duration-color-transition ease-easing",
        `outline-(length:--dimension-x0_5) -outline-offset-(--dimension-x0_5)
        outline-transparent outline-solid focused:outline-stroke-focus-ring`,
        // 스크롤하면 머리글과의 사이에 선을, 넘치면 아래를 흐리게 한다.
        "[&[data-scrolled]:not(:first-child)]:shadow-[inset_0_1px_0_0_var(--stroke-neutral-muted)]",
        `data-overflow:pb-x12
        data-overflow:mask-[linear-gradient(to_top,transparent_0,black_var(--dimension-x12))]`,
        className,
      )}
      {...props}
    />
  );
}

export type PopoverFooterProps = React.ComponentProps<"div">;

function PopoverFooter({ className, ...props }: PopoverFooterProps) {
  return (
    <div
      data-slot="popover-footer"
      className={cn("flex shrink-0 flex-col px-x6 pt-x4 pb-x6", className)}
      {...props}
    />
  );
}

export type PopoverActionProps = ActionButtonProps;

/** 누르면 창이 닫히는 버튼 — 아래 줄(PopoverFooter)에 놓는다. */
function PopoverAction(props: PopoverActionProps) {
  return <PopoverPrimitive.Close render={<ActionButton {...props} />} />;
}

export {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverAction,
};
