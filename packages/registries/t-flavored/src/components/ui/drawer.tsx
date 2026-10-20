"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";

import { useDrawerSwipeRelease } from "@/lib/use-drawer-swipe-release";
import { cn } from "@/lib/utils";

// shadcn Drawer 에 t-flavored 의 모양을 입혔다. 아래에서 올라오는 시트만 있다.
// 머리는 DrawerHeader(DrawerTitle · DrawerDescription), 버튼 줄은 DrawerFooter, 위쪽 손잡이는 DrawerSwipeHandle 이다.
// 시트는 화면 양옆 · 아래에서 10px 떠 있고 네 모서리가 28px 로 둥글며, 화면 높이의 70% 까지 커진다. 넘치면 본문이 스크롤되고
// 머리 · 버튼 줄은 남는다. 버튼 줄 위 36px 은 그라데이션이라 그 밑으로 본문이 비쳐 사라진다.
// 열릴 때 — 바탕이 옅게 깔리고 시트가 160px 아래에서 옅게 올라온다(260ms). 안의 제목 · 설명 · 본문은 80px 아래에서
//   30ms 씩 차례로 천천히(800ms) 따라 올라오고, 버튼 줄은 0.67초에 걸쳐 나타난다.
// 닫힐 때 — 시트는 제 높이만큼 내려가며 옅어지고(200ms) 바탕은 260ms 에 걸쳐 사라진다.
// 끌어내리면 시트가 0.98 로 줄고 바탕은 끈 만큼 옅어진다. 놓았을 때 손가락이 50px 넘게 내려왔으면 또는 빠르게 튕겼으면
//   놓은 자리에서부터 닫힌다.

type DrawerProps = Omit<DrawerPrimitive.Root.Props, "swipeDirection">;

// DrawerContent 가 놓는 순간 시트를 닫을 수 있게 Root 의 actionsRef 를 건넨다
const DrawerActionsContext =
  React.createContext<React.RefObject<DrawerPrimitive.Root.Actions | null> | null>(
    null,
  );

function Drawer({ actionsRef: actionsRefProp, ...props }: DrawerProps) {
  const innerActionsRef = React.useRef<DrawerPrimitive.Root.Actions | null>(
    null,
  );
  const actionsRef = actionsRefProp ?? innerActionsRef;

  return (
    <DrawerActionsContext value={actionsRef}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        swipeDirection="down"
        actionsRef={actionsRef}
        {...props}
      />
    </DrawerActionsContext>
  );
}

function DrawerTrigger(props: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal(props: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose(props: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        `fixed inset-0 z-50 bg-overlay
        opacity-[calc(1-max(var(--drawer-swipe-progress,0),var(--drawer-release-progress,0)))]
        transition-opacity duration-260 ease-[cubic-bezier(0.25,1,0.5,1)]
        data-ending-style:opacity-0 data-starting-style:opacity-0
        data-swiping:duration-0`,
        className,
      )}
      {...props}
    />
  );
}

// 높이 16px 띠의 위에서 12px 아래에 48 × 4px 막대
function DrawerSwipeHandle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      className={cn(
        `relative h-4 shrink-0 cursor-grab after:absolute after:top-3
        after:left-1/2 after:h-1 after:w-12 after:-translate-x-1/2
        after:rounded-full after:bg-grey-200 active:cursor-grabbing`,
        className,
      )}
      {...props}
    />
  );
}

type DrawerContentProps = DrawerPrimitive.Popup.Props & {
  /** 위쪽 가운데의 손잡이. 기본으로 보인다. */
  showSwipeHandle?: boolean;
};

// 끄는 동안 Base UI 가 transform 을 직접 적으므로 위치는 transform 으로만 옮긴다.
// 놓은 뒤에는 끈 거리(--drawer-swipe-movement-y) 또는 useDrawerSwipeRelease 가 닫을 때 적어 둔 놓은 자리(--drawer-release-movement)에서 이어 간다.
// 28px 반경 · 화면 70% 높이는 맞는 토큰이 없어 값을 그대로 쓴다.
function DrawerContent({
  ref,
  className,
  children,
  showSwipeHandle = true,
  ...props
}: DrawerContentProps) {
  const actionsRef = React.useContext(DrawerActionsContext);
  const fallbackActionsRef = React.useRef<DrawerPrimitive.Root.Actions | null>(
    null,
  );
  const popupRef = React.useRef<HTMLDivElement | null>(null);
  const backdropRef = React.useRef<HTMLDivElement | null>(null);
  const swipeRelease = useDrawerSwipeRelease({
    popupRef,
    backdropRef,
    actionsRef: actionsRef ?? fallbackActionsRef,
  });

  return (
    <DrawerPortal>
      <DrawerOverlay ref={backdropRef} />
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        className="fixed inset-0 z-50"
        {...swipeRelease}
      >
        <DrawerPrimitive.Popup
          ref={(node) => {
            popupRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          data-slot="drawer-popup"
          className={cn(
            `fixed inset-x-2.5 bottom-2.5 flex max-h-[70vh] flex-col
            overflow-hidden rounded-[28px] bg-background text-foreground
            transform-[translate3d(0,calc(var(--drawer-swipe-movement-y,0px)+var(--drawer-release-movement,0px)),0)]
            transition-[transform,opacity,scale] duration-260
            ease-[cubic-bezier(0.25,1,0.5,1)] outline-none
            data-ending-style:transform-[translate3d(0,100%,0)]
            data-ending-style:opacity-0 data-ending-style:duration-200
            data-starting-style:transform-[translate3d(0,160px,0)]
            data-starting-style:opacity-0 data-swiping:scale-98`,
            className,
          )}
          {...props}
        >
          {showSwipeHandle && <DrawerSwipeHandle />}
          {/* 머리 · 버튼 줄이 아닌 본문 블록은 설명 다음 차례(60ms 뒤)로 올라온다 */}
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            className="flex min-h-0 flex-1 flex-col overflow-y-auto
              overscroll-contain
              [&>:not([data-slot=drawer-header]):not([data-slot=drawer-footer])]:animate-[drawer-content-rise_800ms_cubic-bezier(0.16,1,0.3,1)_60ms_backwards]"
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  );
}

// 본문이 스크롤돼도 위에 남는다. 여백은 위 25px · 아래 13px.
function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        `sticky top-0 z-10 flex shrink-0 flex-col gap-2 bg-background px-6
        pt-6.25 pb-3.25`,
        className,
      )}
      {...props}
    />
  );
}

// 위 36px 은 바탕색으로 짙어지는 띠(아래 9px 은 바탕색 그대로) — 본문이 그 밑으로 비쳐 사라진다. 버튼은 max(96px, 글자 폭)에서 남는 폭을 똑같이 나눠 갖는다.
function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        `sticky bottom-0 z-10 mt-auto flex shrink-0 animate-in gap-2
        bg-[linear-gradient(to_bottom,transparent,var(--color-background)_27px)]
        px-5 pt-9 pb-5 delay-40 duration-670 ease-[cubic-bezier(0.4,0,0.2,1)]
        fade-in fill-mode-backwards *:min-w-max *:grow *:basis-24`,
        className,
      )}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        `animate-[drawer-content-rise_800ms_cubic-bezier(0.16,1,0.3,1)] text-t4
        font-bold break-keep whitespace-pre-wrap text-foreground`,
        className,
      )}
      {...props}
    />
  );
}

// 오른쪽 44px 을 비운다
function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(
        `animate-[drawer-content-rise_800ms_cubic-bezier(0.16,1,0.3,1)_30ms_backwards]
        pr-5 text-t6 break-keep whitespace-pre-wrap text-muted-foreground`,
        className,
      )}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerSwipeHandle,
  DrawerTitle,
  DrawerTrigger,
  type DrawerContentProps,
  type DrawerProps,
};
