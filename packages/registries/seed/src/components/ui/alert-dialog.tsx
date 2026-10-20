"use client";

import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

import { ActionButton } from "@/components/ui/action-button";
import type { ActionButtonProps } from "@/components/ui/action-button";
import {
  OverlayOpenContext,
  useOverlayOpen,
  useRetainedWhileClosed,
} from "@/lib/use-retained-while-closed";
import { cn } from "@/lib/utils";

// 층 — 기본 2 에 layerIndex 를 더한다. 바탕 · 창이 같은 값을 쓰고, 뒤에 그린 것이 위에 놓인다.
const LAYER = "z-[calc(var(--dialog-z-index)+var(--layer-index,0))]";

// 열릴 때 · 닫힐 때 — Base UI 는 열려 있으면 data-open, 닫히는 동안 data-closed 를 붙이고 움직임이 끝나야 요소를 뗀다.
const BACKDROP_MOTION = [
  "[--seed-enter-opacity:0] [--seed-exit-opacity:0]",
  "data-open:animate-[seed-enter_var(--motion-duration-d2)_var(--motion-ease-enter)]",
  "data-closed:animate-[seed-exit_var(--motion-duration-d2)_var(--motion-ease-exit)_forwards]",
].join(" ");
const CONTENT_MOTION = [
  "[--seed-enter-opacity:0] [--seed-enter-scale:1.3] [--seed-exit-opacity:0]",
  "data-open:animate-[seed-enter_var(--motion-duration-d4)_var(--motion-ease-enter-expressive)]",
  "data-closed:animate-[seed-exit_var(--motion-duration-d2)_var(--motion-ease-exit)_forwards]",
].join(" ");

const assignRef = <T,>(ref: React.Ref<T> | undefined, node: T | null) => {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
};

export interface AlertDialogRootProps extends Omit<
  AlertDialogPrimitive.Root.Props,
  "children"
> {
  children?: React.ReactNode;
  /** Esc 로 닫는다 */
  closeOnEscape?: boolean;
}

/** 확인 창 — 답을 골라야 닫힌다(바깥을 눌러도 닫히지 않는다). */
function AlertDialogRoot({
  closeOnEscape = true,
  onOpenChange,
  ...props
}: AlertDialogRootProps) {
  const [open, setInnerOpen] = useOverlayOpen(props.open, props.defaultOpen);
  return (
    <OverlayOpenContext value={open}>
      <AlertDialogPrimitive.Root
        onOpenChange={(nextOpen, details) => {
          if (!nextOpen && !closeOnEscape && details.reason === "escape-key") {
            details.cancel();
            return;
          }
          onOpenChange?.(nextOpen, details);
          if (!details.isCanceled) setInnerOpen(nextOpen);
        }}
        {...props}
      />
    </OverlayOpenContext>
  );
}

export type AlertDialogTriggerProps = AlertDialogPrimitive.Trigger.Props;

function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

export interface AlertDialogContentProps extends Omit<
  AlertDialogPrimitive.Popup.Props,
  "className" | "style"
> {
  className?: string;
  style?: React.CSSProperties;
  /** 다른 창 · 시트와 겹칠 때의 순서 — 클수록 위 */
  layerIndex?: number;
}

/** 창 — body 에 그린다(탭 · 스크롤 영역 안에 갇혀 잘리지 않게). */
function AlertDialogContent({
  ref,
  className,
  layerIndex,
  children,
  ...props
}: AlertDialogContentProps) {
  const popupRef = React.useRef<HTMLDivElement | null>(null);
  // 닫히는 동안에는 마지막으로 열려 있던 때의 내용 그대로
  const shownChildren = useRetainedWhileClosed(children);

  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Viewport
        data-slot="alert-dialog-positioner"
        className="fixed inset-0
          z-[calc(var(--dialog-z-index)+var(--layer-index,0))] flex items-center
          justify-center overscroll-y-none [--dialog-z-index:2]"
        style={{ "--layer-index": layerIndex } as React.CSSProperties}
      >
        {/* 다른 창 안에서 열려도 바탕을 그린다(SEED 와 같게) */}
        <AlertDialogPrimitive.Backdrop
          forceRender
          data-slot="alert-dialog-backdrop"
          className={cn("fixed inset-0 bg-bg-overlay", LAYER, BACKDROP_MOTION)}
        />
        <AlertDialogPrimitive.Popup
          ref={(node) => {
            popupRef.current = node;
            assignRef(ref, node);
          }}
          data-slot="alert-dialog-content"
          // 첫 버튼이 아니라 창 자체에 초점을 둔다 — 열자마자 Enter 로 지우는 일이 없게(SEED 와 같다).
          initialFocus={popupRef}
          className={cn(
            `relative mx-x8 my-auto box-border flex max-w-68 flex-1 flex-col
            rounded-r5 bg-bg-layer-floating break-all [outline:none]`,
            LAYER,
            CONTENT_MOTION,
            className,
          )}
          {...props}
        >
          {shownChildren}
        </AlertDialogPrimitive.Popup>
      </AlertDialogPrimitive.Viewport>
    </AlertDialogPrimitive.Portal>
  );
}

export type AlertDialogHeaderProps = React.ComponentProps<"div">;

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-x1.5 px-x5 pt-x5", className)}
      {...props}
    />
  );
}

export interface AlertDialogTitleProps extends Omit<
  AlertDialogPrimitive.Title.Props,
  "className"
> {
  className?: string;
}

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("m-0 text-t7 font-bold text-fg-neutral", className)}
      {...props}
    />
  );
}

export interface AlertDialogDescriptionProps extends Omit<
  AlertDialogPrimitive.Description.Props,
  "className"
> {
  className?: string;
}

function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "m-0 text-t5 font-regular whitespace-pre-wrap text-fg-neutral",
        className,
      )}
      {...props}
    />
  );
}

export type AlertDialogFooterProps = React.ComponentProps<"div">;

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn("flex flex-col items-stretch px-x5 pt-x4 pb-x5", className)}
      {...props}
    />
  );
}

export type AlertDialogActionProps = ActionButtonProps;

/** 누르면 창이 닫히는 버튼 */
function AlertDialogAction(props: AlertDialogActionProps) {
  return <AlertDialogPrimitive.Close render={<ActionButton {...props} />} />;
}

export {
  AlertDialogRoot,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
};
