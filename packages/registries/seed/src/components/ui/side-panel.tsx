import * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import IconXmarkLine from "@karrotmarket/react-monochrome-icon/IconXmarkLine";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { Icon } from "@/components/ui/icon";
import { useDrawerSwipeRelease } from "@/lib/use-drawer-swipe-release";
import {
  OverlayOpenContext,
  useOverlayOpen,
  useRetainedWhileClosed,
} from "@/lib/use-retained-while-closed";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

// 층 — 기본 2 에 layerIndex 를 더한다. 바탕 · 패널이 같은 값을 쓰고, 뒤에 그린 것이 위에 놓인다.
const LAYER = "z-[calc(var(--side-panel-z-index)+var(--layer-index,0))]";

// 열릴 때 · 닫힐 때 — Base UI 는 열려 있으면 data-open, 닫히는 동안 data-closed 를 붙이고 움직임이 끝나야 요소를 뗀다.
const BACKDROP_MOTION = [
  "[--seed-enter-opacity:0] [--seed-exit-opacity:0]",
  "data-open:animate-[seed-enter_var(--motion-duration-d6)_var(--motion-ease-enter)]",
  "data-closed:animate-[seed-exit_var(--motion-duration-d6)_var(--motion-ease-exit)_forwards]",
  // 가장자리 쪽으로 끈 만큼 옅어진다 — Base UI 가 끈 거리 ÷ 패널 폭을 --drawer-swipe-progress 로 적어 준다.
  // 끌어서 닫을 때는 놓은 자리의 값(--drawer-release-progress)에서부터 사라지게 한다.
  "opacity-[calc(1-max(var(--drawer-swipe-progress,0),var(--drawer-release-progress,0)))]",
  // 끌다 놓아 제자리로 돌아갈 때
  "data-swipe-settle:[transition:opacity_var(--motion-duration-d4)_var(--motion-ease-exit)]",
].join(" ");
// 패널은 흐려지지 않고 제 폭만큼 옆에서 밀려 들어온다. 방향은 --seed-enter-translate-x · --seed-exit-translate-x 로 정한다.
const CONTENT_MOTION = [
  "data-open:animate-[seed-enter_var(--motion-duration-d6)_var(--motion-ease-enter-expressive)]",
  "data-closed:animate-[seed-exit_var(--motion-duration-d6)_var(--motion-ease-exit-expressive)_forwards]",
  // 끌다 놓아 제자리로 돌아갈 때
  "data-swipe-settle:[transition:transform_var(--motion-duration-d4)_var(--motion-ease-exit)]",
  // 끌어서 닫을 때 — 손을 뗀 자리에서부터 나가게 한다(Base UI 는 놓는 순간 인라인 transform 을 뗀다).
  "data-closed:transform-[translate3d(var(--drawer-release-movement,0px),0,0)]",
].join(" ");

const sidePanelContentVariants = cva(
  [
    `absolute inset-y-0 box-border flex flex-col bg-bg-layer-floating break-all
    touch-none will-change-transform [outline:none]`,
    `w-[80vw] max-w-[80%] pb-[env(safe-area-inset-bottom,0px)]
    mobile:w-(--side-panel-size-width)`,
    // 튕기며 들어올 때 화면 가장자리 쪽이 비지 않게, 패널 바깥으로 같은 바탕을 이어 그린다
    `after:absolute after:inset-y-0 after:z-[-1] after:w-screen after:bg-inherit
    after:content-['']`,
    LAYER,
    CONTENT_MOTION,
  ],
  {
    variants: {
      size: {
        small: "[--side-panel-size-width:480px]",
        medium: "[--side-panel-size-width:720px]",
        large: "[--side-panel-size-width:960px]",
      },
      direction: {
        left: `left-0 pl-[env(safe-area-inset-left,0)]
        [--seed-enter-translate-x:-100%] [--seed-exit-translate-x:-100%]
        after:right-full`,
        right: `right-0 pr-[env(safe-area-inset-right,0)]
        [--seed-enter-translate-x:100%] [--seed-exit-translate-x:100%]
        after:left-full`,
      },
    },
    defaultVariants: { size: "medium", direction: "right" },
  },
);

type SidePanelVariants = VariantProps<typeof sidePanelContentVariants>;
type SidePanelSize = NonNullable<SidePanelVariants["size"]>;
type SidePanelDirection = NonNullable<SidePanelVariants["direction"]>;

interface SidePanelContextValue {
  size: SidePanelSize;
  direction: SidePanelDirection;
  popupRef: React.RefObject<HTMLDivElement | null>;
  backdropRef: React.RefObject<HTMLDivElement | null>;
  actionsRef: React.RefObject<DrawerPrimitive.Root.Actions | null>;
}

const SidePanelContext = React.createContext<SidePanelContextValue | null>(
  null,
);

const useSidePanelContext = () => {
  const context = React.useContext(SidePanelContext);
  if (!context) throw new Error("SidePanelContent 는 SidePanelRoot 안에 둔다.");
  return context;
};

const assignRef = <T,>(ref: React.Ref<T> | undefined, node: T | null) => {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
};

export interface SidePanelRootProps extends Omit<
  DrawerPrimitive.Root.Props,
  "disablePointerDismissal" | "swipeDirection" | "children"
> {
  children?: React.ReactNode;
  /** 패널의 폭(768px 이상에서) — small 480px · medium 720px · large 960px. 그보다 좁은 화면에서는 화면의 80% */
  size?: SidePanelSize;
  /** 들어오는 쪽 */
  direction?: SidePanelDirection;
  /** 바깥을 눌러 닫는다 */
  closeOnInteractOutside?: boolean;
  /** Esc 로 닫는다 */
  closeOnEscape?: boolean;
}

function SidePanelRoot({
  size = "medium",
  direction = "right",
  closeOnInteractOutside = true,
  closeOnEscape = true,
  actionsRef: actionsRefProp,
  onOpenChange,
  ...props
}: SidePanelRootProps) {
  const popupRef = React.useRef<HTMLDivElement | null>(null);
  const backdropRef = React.useRef<HTMLDivElement | null>(null);
  const innerActionsRef = React.useRef<DrawerPrimitive.Root.Actions | null>(
    null,
  );
  const actionsRef = actionsRefProp ?? innerActionsRef;
  const [open, setInnerOpen] = useOverlayOpen(props.open, props.defaultOpen);
  const context = React.useMemo(
    () => ({ size, direction, popupRef, backdropRef, actionsRef }),
    [size, direction, actionsRef],
  );
  return (
    <SidePanelContext value={context}>
      <OverlayOpenContext value={open}>
        <DrawerPrimitive.Root
          // 들어온 쪽으로 끌면 닫힌다
          swipeDirection={direction}
          disablePointerDismissal={!closeOnInteractOutside}
          actionsRef={actionsRef}
          onOpenChange={(nextOpen, details) => {
            if (
              !nextOpen &&
              !closeOnEscape &&
              details.reason === "escape-key"
            ) {
              details.cancel();
              return;
            }
            onOpenChange?.(nextOpen, details);
            if (!details.isCanceled) setInnerOpen(nextOpen);
          }}
          {...props}
        />
      </OverlayOpenContext>
    </SidePanelContext>
  );
}

export type SidePanelTriggerProps = DrawerPrimitive.Trigger.Props;

function SidePanelTrigger(props: SidePanelTriggerProps) {
  return <DrawerPrimitive.Trigger data-slot="side-panel-trigger" {...props} />;
}

export interface SidePanelContentProps extends Omit<
  DrawerPrimitive.Popup.Props,
  "title" | "className" | "style"
> {
  className?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** 다른 창 · 시트와 겹칠 때의 순서 — 클수록 위 */
  layerIndex?: number;
  /** 오른쪽 위의 닫기 버튼 */
  showCloseButton?: boolean;
}

function SidePanelCloseButton() {
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLButtonElement>();
  return (
    <DrawerPrimitive.Close
      ref={scaleFeedbackRef}
      data-slot="side-panel-close"
      aria-label="닫기"
      className={cn(
        scaleFeedbackClassName,
        `absolute top-[calc(28px+env(safe-area-inset-top,0px))] right-6 -m-3.75
        flex cursor-pointer items-center justify-center rounded-r3 border-none
        bg-bg-transparent p-3.75`,
        "[--icon-color:var(--fg-neutral-subtle)] [--icon-size:22px]",
        `outline-solid outline-(length:--dimension-x0_5)
        outline-offset-(--dimension-x0_5) outline-transparent
        focused:outline-stroke-focus-ring`,
        "engaged:bg-bg-transparent-pressed pressed:scale-(--feedback-scale)",
        "[transition:background_var(--motion-duration-color-transition)_var(--motion-ease-easing),var(--feedback-scale-transition),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
      )}
    >
      <Icon svg={<IconXmarkLine />} />
    </DrawerPrimitive.Close>
  );
}

/** 옆에서 밀려 들어오는 패널 — body 에 그린다. 들어온 쪽으로 끌어 닫을 수 있다(폭의 1/4 넘게, 또는 빠르게). 제목이 없으면 aria-label 을 준다. */
function SidePanelContent({
  ref,
  className,
  children,
  title,
  description,
  layerIndex,
  showCloseButton = true,
  ...props
}: SidePanelContentProps) {
  const { size, direction, popupRef, backdropRef, actionsRef } =
    useSidePanelContext();
  const swipeRelease = useDrawerSwipeRelease({
    swipeDirection: direction,
    popupRef,
    backdropRef,
    actionsRef,
  });
  // 닫히는 동안에는 마지막으로 열려 있던 때의 내용 그대로(머리만 남고 쪼그라들지 않게)
  const shown = useRetainedWhileClosed({ title, description, children });
  const hasHeader =
    Boolean(shown.title) || Boolean(shown.description) || showCloseButton;

  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Viewport
        data-slot="side-panel-positioner"
        className="fixed inset-0
          z-[calc(var(--side-panel-z-index)+var(--layer-index,0))]
          overscroll-y-none [--side-panel-z-index:2]"
        style={{ "--layer-index": layerIndex } as React.CSSProperties}
        {...swipeRelease}
      >
        {/* 다른 창 안에서 열려도 바탕을 그린다(SEED 와 같게) */}
        <DrawerPrimitive.Backdrop
          ref={backdropRef}
          forceRender
          data-slot="side-panel-backdrop"
          className={cn("fixed inset-0 bg-bg-overlay", LAYER, BACKDROP_MOTION)}
        />
        <DrawerPrimitive.Popup
          ref={(node) => {
            popupRef.current = node;
            assignRef(ref, node);
          }}
          data-slot="side-panel-content"
          data-direction={direction}
          // 첫 버튼이 아니라 패널 자체에 초점을 둔다 — 열자마자 안쪽 항목에 초점 링이 뜨지 않게(SEED 와 같다).
          initialFocus={popupRef}
          className={cn(
            sidePanelContentVariants({ size, direction }),
            className,
          )}
          {...props}
        >
          {hasHeader ? (
            <div
              data-slot="side-panel-header"
              className={cn(
                `relative box-border flex
                  min-h-[calc(70px+env(safe-area-inset-top,0px))] flex-col
                  gap-x1.5
                  pt-[calc(var(--dimension-x6)+env(safe-area-inset-top,0px))]
                  pb-x4 pl-x6`,
                // 닫기 버튼(22px)과 그 앞의 틈만큼 오른쪽을 비운다
                showCloseButton
                  ? "pr-[calc(24px_+_22px_+_var(--dimension-x1_5))]"
                  : "pr-x6",
              )}
            >
              {shown.title ? (
                <DrawerPrimitive.Title
                  data-slot="side-panel-title"
                  className="m-0 text-t8 font-bold break-keep text-fg-neutral"
                >
                  {shown.title}
                </DrawerPrimitive.Title>
              ) : null}
              {shown.description ? (
                <DrawerPrimitive.Description
                  data-slot="side-panel-description"
                  className="m-0 text-t5 font-regular whitespace-pre-wrap
                    text-fg-neutral-muted"
                >
                  {shown.description}
                </DrawerPrimitive.Description>
              ) : null}
              {showCloseButton ? <SidePanelCloseButton /> : null}
            </div>
          ) : null}
          {shown.children}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
}

export type SidePanelBodyProps = React.ComponentProps<"div">;

/** 본문 — 길면 여기만 스크롤된다. 내린 만큼 위에 금이 생기고, 아래 끝은 늘 흐려진다. */
function SidePanelBody({ ref, className, ...props }: SidePanelBodyProps) {
  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    if (!element) return undefined;
    const check = () => setScrolled(element.scrollTop > 0);
    check();
    element.addEventListener("scroll", check);
    const observer = new ResizeObserver(check);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", check);
      observer.disconnect();
    };
  }, [element]);

  return (
    <div
      ref={(node) => {
        setElement(node);
        assignRef(ref, node);
      }}
      data-slot="side-panel-body"
      data-scrolled={scrolled ? "" : undefined}
      className={cn(
        "box-border flex flex-1 flex-col overflow-y-auto px-x6 pb-x12",
        "mask-[linear-gradient(to_top,transparent_0,black_var(--dimension-x12))]",
        "[transition:box-shadow_var(--motion-duration-color-transition)_var(--motion-ease-easing)]",
        `outline-solid outline-(length:--dimension-x0_5)
        -outline-offset-(--dimension-x0_5) outline-transparent
        focused:outline-stroke-focus-ring`,
        "data-scrolled:not-first:[box-shadow:inset_0_1px_0_0_var(--stroke-neutral-muted)]",
        className,
      )}
      {...props}
    />
  );
}

export type SidePanelFooterProps = React.ComponentProps<"div">;

function SidePanelFooter({ className, ...props }: SidePanelFooterProps) {
  return (
    <div
      data-slot="side-panel-footer"
      className={cn("flex flex-col px-x6 pt-x4 pb-x6", className)}
      {...props}
    />
  );
}

export {
  SidePanelRoot,
  SidePanelTrigger,
  SidePanelContent,
  SidePanelBody,
  SidePanelFooter,
  sidePanelContentVariants,
};
