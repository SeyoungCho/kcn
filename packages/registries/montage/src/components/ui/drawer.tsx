import type * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";

import { cn } from "@/lib/utils";

// shadcn Drawer 에 montage 의 바텀 시트 모양을 입혔다. 아래에서 올라오는 시트만 있다.
// 시트는 화면 아래 가운데에 놓이고 위쪽 모서리만 둥글며, 화면 위를 조금 남기고 커진다. 넘치면 본문이 스크롤되고
// 버튼 줄(DrawerFooter)은 아래에 붙어 남는다. 본문 블록 사이는 띄우고, 버튼 줄의 버튼은 폭을 똑같이 나눠 갖는다.
// 열릴 때 — 바탕은 바로 깔리고 시트가 아래에서 올라온다. 닫힐 때 — 시트는 내려가고 바탕은 옅어진다.
// 끌어내리면 바탕이 끈 만큼 옅어지고, 놓았을 때 절반 넘게 내려왔거나 빠르게 튕겼으면 닫힌다.

type DrawerProps = Omit<DrawerPrimitive.Root.Props, "swipeDirection">;

function Drawer(props: DrawerProps) {
  return (
    <DrawerPrimitive.Root data-slot="drawer" swipeDirection="down" {...props} />
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

// 이징 ease 는 Tailwind 눈금에 없어 [] 로 적는다
function DrawerOverlay({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        `fixed inset-0 z-50 bg-overlay
        opacity-[calc(1-var(--drawer-swipe-progress,0))] transition-opacity
        duration-280 ease-[ease] data-ending-style:opacity-0
        data-swiping:duration-0`,
        className,
      )}
      {...props}
    />
  );
}

type DrawerContentProps = DrawerPrimitive.Popup.Props & {
  /** 위쪽 가운데의 손잡이. 기본으로 보인다. */
  showHandle?: boolean;
};

// 끄는 동안 Drawer 가 적는 --drawer-swipe-movement-y 만큼 내려 둔다.
// 화면 위 여백 · 안전 영역은 맞는 토큰이 없어 값을 그대로 쓴다.
function DrawerContent({
  className,
  children,
  showHandle = true,
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        className="fixed inset-0 z-50 flex items-end justify-center"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          className={cn(
            `flex max-h-[calc(100%-env(safe-area-inset-top,0px)-40px)] w-full
            max-w-120 translate-y-[var(--drawer-swipe-movement-y,0px)] flex-col
            overflow-hidden rounded-t-32 bg-popover
            pb-[env(safe-area-inset-bottom,0px)] text-popover-foreground
            transition-[translate] duration-280 ease-[ease] outline-none
            data-ending-style:translate-y-full
            data-starting-style:translate-y-full data-swiping:duration-0
            data-swiping:select-none`,
            className,
          )}
          {...props}
        >
          {showHandle && (
            <div
              data-slot="drawer-handle"
              aria-hidden="true"
              className="relative h-3 shrink-0 touch-pan-y select-none
                after:absolute after:top-1.75 after:left-1/2 after:h-1.25
                after:w-10 after:-translate-x-1/2 after:rounded-full
                after:bg-surface-neutral-strong"
            />
          )}
          <DrawerPrimitive.Content
            data-slot="drawer-body"
            className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto
              overscroll-contain px-7 pt-6"
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

// 앞 블록과의 간격을 버튼 줄 위 여백으로 바꾼다.
// 위 여백은 바탕색으로 짙어지는 띠(그라데이션은 값을 그대로 쓴다)라 스크롤되는 본문이 그 밑으로 사라진다.
function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        `sticky bottom-0 isolate z-10 -mx-1 -mt-6 flex shrink-0 gap-3 pt-5 pb-6
        *:flex-1 before:absolute before:inset-0 before:-z-10
        before:bg-[linear-gradient(to_bottom,transparent,var(--color-popover)_20px)]`,
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
        "text-heading2 font-semibold break-keep wrap-break-word text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(
        `text-body2 font-normal break-keep wrap-break-word
        text-muted-foreground`,
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
  DrawerTitle,
  DrawerTrigger,
  type DrawerContentProps,
  type DrawerProps,
};
