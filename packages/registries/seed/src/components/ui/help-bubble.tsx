"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

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

// 화살촉의 높이 — 말풍선은 기준 요소에서 간격(gutter)에 이만큼을 더해 띄운다.
const ARROW_TIP_HEIGHT = 8;

interface HelpBubblePositioningProps {
  /** 뜨는 자리 @default "top" */
  placement?: Placement;
  /** 화살촉 끝과 기준 요소의 간격(px) @default 4 */
  gutter?: number;
  /** 화면 가장자리와 띄울 간격(px) @default 16 */
  overflowPadding?: number;
  /** 화살촉이 말풍선의 모서리에서 떨어져 있을 가장 작은 거리(px) @default 14 */
  arrowPadding?: number;
  /** @default "absolute" */
  strategy?: "absolute" | "fixed";
}

interface HelpBubbleSettings extends Required<HelpBubblePositioningProps> {
  /** 눌러서 여는 말풍선(popover)인지, 올리면 뜨는 말풍선(tooltip)인지 — 안쪽 부품이 맞는 Base UI 부품을 고른다 */
  kind: "popover" | "tooltip";
  autoFocus: boolean;
  interactive: boolean;
}

const HelpBubbleContext = React.createContext<HelpBubbleSettings>({
  kind: "popover",
  placement: "top",
  gutter: 4,
  overflowPadding: 16,
  arrowPadding: 14,
  strategy: "absolute",
  autoFocus: false,
  interactive: true,
});

const useSettings = (
  kind: HelpBubbleSettings["kind"],
  {
    placement = "top",
    gutter = 4,
    overflowPadding = 16,
    arrowPadding = 14,
    strategy = "absolute",
  }: HelpBubblePositioningProps,
  autoFocus: boolean,
  interactive: boolean,
) =>
  React.useMemo(
    () => ({
      kind,
      placement,
      gutter,
      overflowPadding,
      arrowPadding,
      strategy,
      autoFocus,
      interactive,
    }),
    [
      kind,
      placement,
      gutter,
      overflowPadding,
      arrowPadding,
      strategy,
      autoFocus,
      interactive,
    ],
  );

// ── 눌러서 여는 말풍선 ─────────────────────────────────────────────────────────

export interface HelpBubbleRootProps
  extends PopoverPrimitive.Root.Props, HelpBubblePositioningProps {
  /** 열릴 때 초점을 말풍선으로 옮길지 — 화면이 열리며 같이 뜨는 말풍선이 초점을 가져가지 않게 기본은 옮기지 않는다 @default false */
  autoFocus?: boolean;
}

function HelpBubbleRoot({
  placement,
  gutter,
  overflowPadding,
  arrowPadding,
  strategy,
  autoFocus = false,
  ...props
}: HelpBubbleRootProps) {
  const settings = useSettings(
    "popover",
    { placement, gutter, overflowPadding, arrowPadding, strategy },
    autoFocus,
    true,
  );
  return (
    <HelpBubbleContext.Provider value={settings}>
      <PopoverPrimitive.Root {...props} />
    </HelpBubbleContext.Provider>
  );
}

export type HelpBubbleTriggerProps = PopoverPrimitive.Trigger.Props;

function HelpBubbleTrigger(props: HelpBubbleTriggerProps) {
  return (
    <PopoverPrimitive.Trigger data-slot="help-bubble-trigger" {...props} />
  );
}

// ── 두 말풍선이 같이 쓰는 부품 ───────────────────────────────────────────────────

export interface HelpBubblePositionerProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  /** 말풍선을 그려 넣을 곳 — 안 주면 body */
  container?: PopoverPrimitive.Portal.Props["container"];
  /** 층 순서(99)에 더할 값 */
  zIndexOffset?: number;
}

function HelpBubblePositioner({
  container,
  zIndexOffset,
  className,
  style,
  ...props
}: HelpBubblePositionerProps) {
  const {
    kind,
    placement,
    gutter,
    overflowPadding,
    arrowPadding,
    strategy,
    interactive,
  } = React.useContext(HelpBubbleContext);
  const Primitive = kind === "tooltip" ? TooltipPrimitive : PopoverPrimitive;
  return (
    <Primitive.Portal container={container}>
      <Primitive.Positioner
        data-slot="help-bubble-positioner"
        {...splitPlacement(placement)}
        sideOffset={gutter + ARROW_TIP_HEIGHT}
        collisionPadding={overflowPadding}
        // 자리가 모자라면 맞은편으로만 뒤집는다(옆으로 돌아가지 않는다).
        collisionAvoidance={{ fallbackAxisSide: "none" }}
        arrowPadding={arrowPadding}
        positionMethod={strategy}
        className={cn(
          "z-[calc(99+var(--z-index-offset,0))] max-w-(--available-width)",
          // 올리면 뜨는 말풍선은 마우스를 받지 않는다 — 말풍선 위에 올려 둔다고 계속 떠 있지 않게.
          !interactive && "pointer-events-none",
          className,
        )}
        style={
          { "--z-index-offset": zIndexOffset, ...style } as React.CSSProperties
        }
        {...props}
      />
    </Primitive.Portal>
  );
}

export interface HelpBubbleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

function HelpBubbleContent({ className, ...props }: HelpBubbleContentProps) {
  const { kind, autoFocus } = React.useContext(HelpBubbleContext);
  const contentClassName = cn(
    // position 을 주지 않는다 — 화살은 자리 잡는 요소(positioner)를 기준으로 놓인다.
    "box-border flex max-w-70 items-start rounded-r3 bg-bg-neutral-solid px-x3 py-x2.5 outline-none",
    "data-open:animate-[seed-enter_var(--motion-duration-d4)_var(--motion-ease-enter)] [--seed-enter-opacity:0] [--seed-enter-scale:0.9]",
    "data-closed:animate-[seed-exit_var(--motion-duration-d4)_var(--motion-ease-easing)_forwards] [--seed-exit-opacity:0] [--seed-exit-scale:1]",
    // 묶음(DelayGroup) 안에서 옆 말풍선으로 옮겨 갈 때는 움직임 없이 바로 바꾼다.
    "data-[instant=delay]:[animation-duration:0s]!",
    className,
  );
  if (kind === "tooltip")
    return (
      <TooltipPrimitive.Popup
        data-slot="help-bubble-content"
        className={contentClassName}
        {...props}
      />
    );
  return (
    <PopoverPrimitive.Popup
      data-slot="help-bubble-content"
      initialFocus={autoFocus}
      className={contentClassName}
      {...props}
    />
  );
}

export interface HelpBubbleArrowProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

function HelpBubbleArrow({ className, ...props }: HelpBubbleArrowProps) {
  const { kind } = React.useContext(HelpBubbleContext);
  const Arrow =
    kind === "tooltip" ? TooltipPrimitive.Arrow : PopoverPrimitive.Arrow;
  return (
    <Arrow
      data-slot="help-bubble-arrow"
      className={cn(
        // 12px 상자의 위쪽 8px 에 아래를 가리키는 화살촉이 있다. 말풍선이 뜬 쪽의 반대편 바깥에 붙이고, 그쪽을 가리키게 돌린다.
        "size-3",
        "data-[side=top]:top-full",
        `data-[side=right]:right-full
        data-[side=right]:transform-[rotate(90deg)]`,
        `data-[side=bottom]:bottom-full
        data-[side=bottom]:transform-[rotate(180deg)]`,
        "data-[side=left]:left-full data-[side=left]:transform-[rotate(270deg)]",
        className,
      )}
      {...props}
    />
  );
}

export type HelpBubbleArrowTipProps = React.SVGAttributes<SVGSVGElement>;

function HelpBubbleArrowTip({ className, ...props }: HelpBubbleArrowTipProps) {
  return (
    <svg
      aria-hidden="true"
      data-slot="help-bubble-arrow-tip"
      viewBox="0 0 12 8"
      className={cn("block h-2 w-3 fill-bg-neutral-solid", className)}
      {...props}
    >
      {/* 끝을 반지름 2px 로 둥글린 세모 */}
      <path stroke="none" d="M0,0 H12 L8,6 Q6,8 4,6 Z" />
    </svg>
  );
}

export type HelpBubbleBodyProps = React.ComponentProps<"div">;

function HelpBubbleBody({ className, ...props }: HelpBubbleBodyProps) {
  return (
    <div
      data-slot="help-bubble-body"
      className={cn(
        "flex min-w-0 flex-col gap-x0.5 wrap-break-word break-keep",
        className,
      )}
      {...props}
    />
  );
}

const TEXT = "text-t3 whitespace-pre-wrap text-fg-on-neutral-solid";

export type HelpBubbleTitleProps = React.ComponentProps<"span">;

// 말풍선만 한 것에 제목 요소(h2) · 문단(p)은 과하다 — 글자 줄(span) · 상자(div)로 그리고, 누르는 말풍선에서는 창의 이름 · 설명으로 잇는다.
function HelpBubbleTitle({ className, ...props }: HelpBubbleTitleProps) {
  const { kind } = React.useContext(HelpBubbleContext);
  const title = (
    <span
      data-slot="help-bubble-title"
      className={cn(TEXT, "font-bold", className)}
      {...props}
    />
  );
  return kind === "tooltip" ? title : <PopoverPrimitive.Title render={title} />;
}

export type HelpBubbleDescriptionProps = React.ComponentProps<"div">;

function HelpBubbleDescription({
  className,
  ...props
}: HelpBubbleDescriptionProps) {
  const { kind } = React.useContext(HelpBubbleContext);
  const description = (
    <div
      data-slot="help-bubble-description"
      className={cn(TEXT, "font-regular", className)}
      {...props}
    />
  );
  return kind === "tooltip" ? (
    description
  ) : (
    <PopoverPrimitive.Description render={description} />
  );
}

// ── 올리거나 초점이 가면 뜨는 말풍선 ─────────────────────────────────────────────

export interface HelpBubbleTooltipTriggerProps
  extends
    Omit<TooltipPrimitive.Root.Props, "children">,
    HelpBubblePositioningProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 말풍선을 띄울 요소 — 이 요소가 그대로 기준이 된다(감싸는 요소를 만들지 않는다) */
  children: React.ReactElement;
  contentProps?: HelpBubbleContentProps;
  zIndexOffset?: number;
  /** 말풍선을 그려 넣을 곳 — 안 주면 body */
  positionerRoot?: HelpBubblePositionerProps["container"];
  /** 올린 뒤 뜨기까지(ms) @default 200 */
  openDelay?: number;
  /** 벗어난 뒤 닫히기까지(ms) @default 100 */
  closeDelay?: number;
  /** 말풍선 위에 마우스를 올려 두면 계속 떠 있을지 @default false */
  keepOpenOnContentHover?: boolean;
}

function HelpBubbleTooltipTriggerPortal({
  title,
  description,
  children,
  contentProps,
  zIndexOffset,
  positionerRoot,
  openDelay = 200,
  closeDelay = 100,
  keepOpenOnContentHover = false,
  placement,
  gutter,
  overflowPadding,
  arrowPadding,
  strategy,
  ...props
}: HelpBubbleTooltipTriggerProps) {
  const settings = useSettings(
    "tooltip",
    { placement, gutter, overflowPadding, arrowPadding, strategy },
    false,
    keepOpenOnContentHover,
  );
  // 떠 있는 동안 기준 요소와 말풍선을 잇는다(aria-describedby · role="tooltip") — 화면 낭독기가 기준 요소에서 말풍선 글을 읽는다.
  // Base UI 의 툴팁은 이 연결을 붙이지 않아(보이기만 하는 힌트로 본다), 열림을 따라가며 직접 붙인다.
  const contentId = React.useId();
  const [innerOpen, setInnerOpen] = React.useState(props.defaultOpen ?? false);
  const open = props.open ?? innerOpen;
  return (
    <HelpBubbleContext.Provider value={settings}>
      <TooltipPrimitive.Root
        disableHoverablePopup={!keepOpenOnContentHover}
        {...props}
        open={open}
        onOpenChange={(next, details) => {
          props.onOpenChange?.(next, details);
          if (!details.isCanceled) setInnerOpen(next);
        }}
      >
        <TooltipPrimitive.Trigger
          data-slot="help-bubble-trigger"
          render={children}
          delay={openDelay}
          closeDelay={closeDelay}
          aria-describedby={open ? contentId : undefined}
        />
        <HelpBubblePositioner
          container={positionerRoot}
          zIndexOffset={zIndexOffset}
        >
          <HelpBubbleContent id={contentId} role="tooltip" {...contentProps}>
            <HelpBubbleArrow>
              <HelpBubbleArrowTip />
            </HelpBubbleArrow>
            <HelpBubbleBody>
              <HelpBubbleTitle>{title}</HelpBubbleTitle>
              {description ? (
                <HelpBubbleDescription>{description}</HelpBubbleDescription>
              ) : null}
            </HelpBubbleBody>
          </HelpBubbleContent>
        </HelpBubblePositioner>
      </TooltipPrimitive.Root>
    </HelpBubbleContext.Provider>
  );
}

// 새 부품은 늘 body 에 그린다 — 제자리에 그리던 스니펫의 이름도 같은 부품을 가리키게 남겨 둔다.
const HelpBubbleTooltipTrigger = HelpBubbleTooltipTriggerPortal;

export interface HelpBubbleTooltipDelayGroupProps {
  children?: React.ReactNode;
  /** @default 200 */
  openDelay?: number;
  /** @default 100 */
  closeDelay?: number;
}

/** 안의 말풍선들이 뜨는 시간을 나눠 쓴다 — 하나가 떠 있으면 옆의 것은 기다리지 않고 바로 뜬다. */
function HelpBubbleTooltipDelayGroup({
  openDelay = 200,
  closeDelay = 100,
  children,
}: HelpBubbleTooltipDelayGroupProps) {
  return (
    <TooltipPrimitive.Provider delay={openDelay} closeDelay={closeDelay}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

export {
  HelpBubbleRoot,
  HelpBubbleTrigger,
  HelpBubblePositioner,
  HelpBubbleContent,
  HelpBubbleArrow,
  HelpBubbleArrowTip,
  HelpBubbleBody,
  HelpBubbleTitle,
  HelpBubbleDescription,
  HelpBubbleTooltipTrigger,
  HelpBubbleTooltipTriggerPortal,
  HelpBubbleTooltipDelayGroup,
};
