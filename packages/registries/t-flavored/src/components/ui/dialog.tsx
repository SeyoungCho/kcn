import type * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// shadcn Dialog 에 t-flavored 의 모양을 입혔다. 머리 · 꼬리 · 제목 · 설명은 AlertDialog 와 치수가 같다.
// 창은 화면 양옆 32px · 위아래 80px 을 비우고 폭은 320px 까지다. 바깥(딤)을 누르면 닫힌다.
// 움직임 — 바탕과 창이 함께 옅게 나타나고(260ms) 더 빨리(200ms) 사라진다. 크기 · 위치는 바뀌지 않는다.

type DialogProps = DialogPrimitive.Root.Props;

function Dialog(props: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(props: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        `fixed inset-0 isolate z-50 bg-overlay transition-opacity duration-260
        ease-[cubic-bezier(0.25,1,0.5,1)] data-ending-style:opacity-0
        data-ending-style:duration-200 data-starting-style:opacity-0`,
        className,
      )}
      {...props}
    />
  );
}

type DialogContentProps = DialogPrimitive.Popup.Props & {
  /** 오른쪽 위의 닫기 버튼. 기본은 감춘다. */
  showCloseButton?: boolean;
};

function DialogContent({
  className,
  children,
  showCloseButton = false,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          `fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100%-160px)]
          w-[calc(100%-64px)] max-w-80 -translate-x-1/2 -translate-y-1/2
          flex-col overflow-hidden rounded-3xl bg-background text-foreground
          transition-opacity duration-260 ease-[cubic-bezier(0.25,1,0.5,1)]
          outline-none data-ending-style:opacity-0
          data-ending-style:duration-200 data-starting-style:opacity-0`,
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

// 길면 머리만 스크롤되고 버튼 줄은 남는다
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex min-h-0 flex-col gap-2 overflow-y-auto px-5.5 pt-5.5",
        className,
      )}
      {...props}
    />
  );
}

// 버튼은 max(80px, 글자 폭)에서 남는 폭을 똑같이 나눠 갖고, 한 줄에 안 들어가면 한 줄씩 쌓인다
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        `mx-4 mt-5 mb-4 flex shrink-0 flex-wrap justify-end gap-2 *:min-w-max
        *:grow *:basis-20`,
        className,
      )}
      {...props}
    />
  );
}

// 줄 높이 1.35 · 1.5 는 타이포그래피 값 위에 덮어쓰는 다이얼로그 전용 값이다
function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        `text-t4 leading-[1.35] font-bold break-keep whitespace-pre-wrap
        text-grey-800`,
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        `text-t6 font-medium break-keep whitespace-pre-wrap
        text-muted-foreground`,
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  type DialogContentProps,
  type DialogProps,
};
