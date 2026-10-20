import type * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// shadcn Dialog 에 montage 의 팝업 모양을 입혔다.
// 창은 화면 가운데에 뜬다. 넘치면 창 안이 스크롤되고 머리(DialogHeader) · 버튼 줄(DialogFooter)은 붙어 남는다.
// 본문은 창의 좌우 여백 안에 놓인다. 버튼 줄의 버튼은 폭을 똑같이 나눠 갖고, 하나면 꽉 찬다.
// 여닫는 움직임은 없다 — 바로 나타나고 바로 사라진다.

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
      className={cn("fixed inset-0 z-50 bg-overlay", className)}
      {...props}
    />
  );
}

type DialogContentProps = DialogPrimitive.Popup.Props & {
  /** 오른쪽 위의 닫기 버튼. 기본으로 보인다. */
  showCloseButton?: boolean;
};

// 창 높이 상한 · 이징 ease 는 맞는 토큰이 없어 값을 그대로 쓴다
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Viewport
        data-slot="dialog-viewport"
        className="fixed inset-0 z-50 flex items-center justify-center p-5"
      >
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          className={cn(
            `group/dialog-content relative flex max-h-[min(760px,100%)] w-90
            max-w-full min-w-80 flex-col overflow-hidden rounded-24 bg-popover
            text-popover-foreground outline-none`,
            className,
          )}
          {...props}
        >
          <div
            data-slot="dialog-scroll-area"
            className="flex min-h-0 flex-1 flex-col overflow-y-auto
              overscroll-contain px-7"
          >
            {children}
          </div>
          {showCloseButton && (
            <DialogPrimitive.Close
              data-slot="dialog-close"
              className="absolute top-6.5 right-6 z-20 flex size-6
                cursor-pointer items-center justify-center rounded-10
                text-fg-neutral-primary transition-opacity duration-150
                ease-[ease] outline-none hover:opacity-52
                focus-visible:outline-2 focus-visible:outline-ring
                focus-visible:outline-solid active:opacity-22 [&_svg]:size-6
                [&_svg]:shrink-0"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPortal>
  );
}

// 제목 줄 — 본문이 밑으로 스크롤되면 옅게 비치는 흐린 판이 된다(흐림은 맞는 토큰이 없어 값을 그대로 쓴다)
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        `sticky top-0 z-10 flex shrink-0 flex-col gap-3 bg-popover/88 py-6
        backdrop-blur-[32px]`,
        className,
      )}
      {...props}
    />
  );
}

// 위 여백은 바탕색으로 짙어지는 띠(그라데이션은 값을 그대로 쓴다)라 스크롤되는 본문이 그 밑으로 사라진다
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        `sticky bottom-0 isolate z-10 -mx-1 flex shrink-0 gap-3 pt-5 pb-6
        *:flex-1 before:absolute before:inset-0 before:-z-10
        before:bg-[linear-gradient(to_bottom,transparent,var(--color-popover)_20px)]`,
        className,
      )}
      {...props}
    />
  );
}

// 한 줄로 줄이고, 닫기 버튼이 있으면 그 자리를 비운다
function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        `line-clamp-1 text-heading2 font-semibold break-keep wrap-anywhere
        text-fg-neutral-strong
        group-has-[>[data-slot=dialog-close]]/dialog-content:pr-10`,
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
        `text-body2 font-normal break-keep wrap-break-word
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
