"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import IconXmarkLine from "@karrotmarket/react-monochrome-icon/IconXmarkLine";

import { Icon } from "@/components/ui/icon";
import { useDrawerSwipeRelease } from "@/lib/use-drawer-swipe-release";
import {
  OverlayOpenContext,
  useRetainedWhileClosed,
} from "@/lib/use-retained-while-closed";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

// 층 — 기본 2 에 layerIndex 를 더한다. 바탕 · 시트가 같은 값을 쓰고, 뒤에 그린 것이 위에 놓인다.
const LAYER = "z-[calc(var(--sheet-z-index)+var(--layer-index,0))]";

// 들어오는 움직임이 걸리는 시간(--motion-duration-d6). 이만큼 지나면 움직임의 이름을 뗀다(SEED 와 같다).
const ENTER_MS = 300;

// 들어오는 움직임은 열린 뒤 ENTER_MS 동안만 건다([data-animation-done] 이 붙기 전) — 원본이 그렇게 한다.
const BACKDROP_MOTION = [
  "[&[data-open]:not([data-animation-done])]:animate-[fade-in_var(--motion-duration-d6)_var(--motion-ease-enter)]",
  "data-closed:animate-[fade-out_var(--motion-duration-d4)_var(--motion-ease-exit)_forwards]",
  // 끌어내린 만큼 옅어진다 — Base UI 가 내린 거리 ÷ 시트 높이를 --drawer-swipe-progress 로 적어 준다.
  // 끌어내려 닫을 때는 Base UI 가 놓는 순간 그 값을 0 으로 되돌리므로, 놓은 자리의 값(--drawer-release-progress)에서부터 사라지게 한다.
  "opacity-[calc(1-max(var(--drawer-swipe-progress,0),var(--drawer-release-progress,0)))]",
  // 끌다 놓아 제자리로 돌아갈 때
  "data-swipe-settle:[transition:opacity_var(--motion-duration-d4)_var(--motion-ease-exit)]",
].join(" ");

const CONTENT_MOTION = [
  "[animation-duration:var(--motion-duration-d6)] [animation-timing-function:var(--motion-ease-enter-expressive)]",
  "[&[data-open]:not([data-animation-done])]:[animation-name:drawer-slide-from-bottom]",
  "data-closed:animate-[drawer-slide-to-bottom_var(--motion-duration-d4)_var(--motion-ease-exit)_forwards]",
  "[transition:transform_var(--motion-duration-d6)_var(--motion-ease-enter-expressive)]",
  // 끌다 놓아 제자리로 돌아갈 때
  "data-swipe-settle:[transition:transform_var(--motion-duration-d4)_var(--motion-ease-exit)]",
  // 끌어내려 닫을 때 — 손을 뗀 자리에서부터 내려가게 한다(Base UI 는 놓는 순간 인라인 transform 을 뗀다).
  "data-closed:transform-[translate3d(0,var(--drawer-release-movement,0px),0)]",
].join(" ");

const assignRef = <T,>(ref: React.Ref<T> | undefined, node: T | null) => {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
};

interface BottomSheetContextValue {
  animationDone: boolean;
  popupRef: React.RefObject<HTMLDivElement | null>;
  backdropRef: React.RefObject<HTMLDivElement | null>;
  actionsRef: React.RefObject<DrawerPrimitive.Root.Actions | null>;
}

const BottomSheetContext = React.createContext<BottomSheetContextValue | null>(
  null,
);

const useBottomSheetContext = () => {
  const context = React.useContext(BottomSheetContext);
  if (!context)
    throw new Error("BottomSheetContent 는 BottomSheetRoot 안에 둔다.");
  return context;
};

export interface BottomSheetRootProps extends Omit<
  DrawerPrimitive.Root.Props,
  "disablePointerDismissal" | "swipeDirection" | "children"
> {
  children?: React.ReactNode;
  /** 바깥을 눌러 닫는다 */
  closeOnInteractOutside?: boolean;
  /** Esc 로 닫는다 */
  closeOnEscape?: boolean;
}

function BottomSheetRoot({
  open: openProp,
  defaultOpen = false,
  closeOnInteractOutside = true,
  closeOnEscape = true,
  actionsRef: actionsRefProp,
  onOpenChange,
  ...props
}: BottomSheetRootProps) {
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const open = openProp ?? innerOpen;
  const [animationDone, setAnimationDone] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement | null>(null);
  const backdropRef = React.useRef<HTMLDivElement | null>(null);
  const innerActionsRef = React.useRef<DrawerPrimitive.Root.Actions | null>(
    null,
  );
  const actionsRef = actionsRefProp ?? innerActionsRef;

  React.useEffect(() => {
    if (!open) return undefined;
    const timer = window.setTimeout(() => setAnimationDone(true), ENTER_MS);
    return () => {
      window.clearTimeout(timer);
      setAnimationDone(false);
    };
  }, [open]);

  const context = React.useMemo(
    () => ({ animationDone, popupRef, backdropRef, actionsRef }),
    [animationDone, actionsRef],
  );

  return (
    <BottomSheetContext value={context}>
      <OverlayOpenContext value={open}>
        <DrawerPrimitive.Root
          open={openProp}
          defaultOpen={defaultOpen}
          swipeDirection="down"
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
    </BottomSheetContext>
  );
}

export type BottomSheetTriggerProps = DrawerPrimitive.Trigger.Props;

function BottomSheetTrigger(props: BottomSheetTriggerProps) {
  return (
    <DrawerPrimitive.Trigger data-slot="bottom-sheet-trigger" {...props} />
  );
}

export interface BottomSheetContentProps extends Omit<
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
  /** 위쪽 가운데의 손잡이 */
  showHandle?: boolean;
}

function BottomSheetCloseButton() {
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLButtonElement>();
  return (
    <DrawerPrimitive.Close
      ref={scaleFeedbackRef}
      data-slot="bottom-sheet-close"
      aria-label="닫기"
      className={cn(
        scaleFeedbackClassName,
        `absolute top-x6 right-x4 flex size-7 cursor-pointer items-center
        justify-center rounded-full border-none bg-bg-neutral-weak`,
        "[--icon-color:var(--fg-neutral)] [--icon-size:14px]",
        `pressed:scale-(--feedback-scale)
        [transition:var(--feedback-scale-transition)] focus:[outline:none]`,
        // 초점 링은 누르는 영역(44px)만큼 넓혀 그린다
        `after:absolute after:inset-[calc((28px_-_44px)_/_2)] after:rounded-r1
        after:content-['']`,
        `after:outline-solid after:outline-(length:--dimension-x0_5)
        after:-outline-offset-(--dimension-x0_5) after:outline-transparent
        focused:after:outline-stroke-focus-ring`,
        "after:[transition:outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
      )}
    >
      <Icon svg={<IconXmarkLine />} />
    </DrawerPrimitive.Close>
  );
}

/** 아래에서 올라오는 시트 — body 에 그린다. 끌어내려 닫을 수 있다(높이의 1/4 넘게, 또는 빠르게). 제목이 없으면 aria-label 을 준다. */
function BottomSheetContent({
  ref,
  className,
  children,
  title,
  description,
  layerIndex,
  showCloseButton = true,
  showHandle = false,
  ...props
}: BottomSheetContentProps) {
  const { animationDone, popupRef, backdropRef, actionsRef } =
    useBottomSheetContext();
  const swipeRelease = useDrawerSwipeRelease({
    swipeDirection: "down",
    popupRef,
    backdropRef,
    actionsRef,
  });
  const done = animationDone ? "" : undefined;
  // 닫히는 동안에는 마지막으로 열려 있던 때의 내용 그대로(머리만 남고 쪼그라들지 않게)
  const shown = useRetainedWhileClosed({ title, description, children });

  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Viewport
        data-slot="bottom-sheet-positioner"
        className="fixed inset-0
          z-[calc(var(--sheet-z-index)+var(--layer-index,0))] flex items-end
          justify-center overscroll-y-none [--sheet-z-index:2]"
        style={{ "--layer-index": layerIndex } as React.CSSProperties}
        {...swipeRelease}
      >
        {/* 다른 창 · 시트 안에서 열려도 바탕을 그린다(SEED 와 같게) */}
        <DrawerPrimitive.Backdrop
          ref={backdropRef}
          forceRender
          data-slot="bottom-sheet-backdrop"
          data-animation-done={done}
          className={cn("fixed inset-0 bg-bg-overlay", LAYER, BACKDROP_MOTION)}
        />
        <DrawerPrimitive.Popup
          ref={(node) => {
            popupRef.current = node;
            assignRef(ref, node);
          }}
          data-slot="bottom-sheet-content"
          data-animation-done={done}
          // 첫 버튼이 아니라 시트 자체에 초점을 둔다 — 열자마자 안쪽 항목에 초점 링이 뜨지 않게(SEED 와 같다).
          initialFocus={popupRef}
          className={cn(
            `relative box-border flex flex-1 flex-col rounded-t-r6
            bg-bg-layer-floating break-all touch-none will-change-transform
            focus:[outline:none]`,
            "max-w-120 pb-[env(safe-area-inset-bottom,0px)]",
            // 튕기며 올라오거나 위로 끌어올릴 때 시트 아래가 비지 않게, 같은 바탕을 아래로 이어 그린다
            `after:absolute after:inset-x-0 after:top-full after:z-[-1]
            after:h-[200vh] after:bg-inherit after:content-['']`,
            LAYER,
            CONTENT_MOTION,
            className,
          )}
          {...props}
        >
          {showHandle ? (
            <div
              data-slot="bottom-sheet-handle"
              aria-hidden="true"
              className={cn(
                `absolute top-1.5 left-1/2 h-[4px] w-9 touch-pan-y rounded-full
                  bg-gray-400 transform-[translateX(-50%)] engaged:bg-gray-500`,
                "[transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing)]",
              )}
            >
              {/* 손가락으로 잡기 쉽게 넓힌 영역 */}
              <div
                data-slot="bottom-sheet-handle-touch-area"
                className="absolute top-1/2 left-1/2 size-11
                  [touch-action:inherit] transform-[translate(-50%,-50%)]"
              />
            </div>
          ) : null}
          {shown.title || shown.description ? (
            <div
              data-slot="bottom-sheet-header"
              className="flex flex-col justify-start gap-x2 pt-x6 pb-x4"
            >
              {shown.title ? (
                <DrawerPrimitive.Title
                  data-slot="bottom-sheet-title"
                  // 닫기 버튼이 있으면 그 폭만큼 오른쪽을 비운다
                  className={cn(
                    "m-0 pl-x4 text-t8 font-bold break-keep text-fg-neutral",
                    showCloseButton ? "pr-14" : "pr-x4",
                  )}
                >
                  {shown.title}
                </DrawerPrimitive.Title>
              ) : null}
              {shown.description ? (
                <DrawerPrimitive.Description
                  data-slot="bottom-sheet-description"
                  className="m-0 px-x4 text-t5 font-regular whitespace-pre-wrap
                    text-fg-neutral-muted"
                >
                  {shown.description}
                </DrawerPrimitive.Description>
              ) : null}
            </div>
          ) : null}
          {shown.children}
          {showCloseButton ? <BottomSheetCloseButton /> : null}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
}

export type BottomSheetBodyProps = React.ComponentProps<"div">;

function BottomSheetBody({ className, ...props }: BottomSheetBodyProps) {
  return (
    <div
      data-slot="bottom-sheet-body"
      className={cn("flex flex-col px-x4", className)}
      {...props}
    />
  );
}

export type BottomSheetFooterProps = React.ComponentProps<"div">;

function BottomSheetFooter({ className, ...props }: BottomSheetFooterProps) {
  return (
    <div
      data-slot="bottom-sheet-footer"
      className={cn("flex flex-col px-x4 pt-x3 pb-x4", className)}
      {...props}
    />
  );
}

export {
  BottomSheetRoot,
  BottomSheetTrigger,
  BottomSheetContent,
  BottomSheetBody,
  BottomSheetFooter,
};
