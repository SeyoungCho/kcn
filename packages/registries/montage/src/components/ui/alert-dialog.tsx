"use client";

import type * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// shadcn AlertDialog 에 montage 의 얼럿 모양을 입혔다.
// 창은 화면 가운데에 뜨고 폭은 글에 맞춰 늘고 준다(좁은 화면에서는 꽉 찬다). 바탕은 Dialog 보다 옅다.
// 버튼 줄은 오른쪽에 붙은 글자 버튼(link)들이다 — Action 은 파랗고 Cancel 은 옅은 회색이다.
// 여닫는 움직임은 없다 — 바로 나타나고 바로 사라진다.
// Cancel 은 render 로 Button 을 그려 클래스를 Button 의 cn 으로 합쳐야 해서 클라이언트 부품이다.

type AlertDialogProps = AlertDialogPrimitive.Root.Props;

function AlertDialog(props: AlertDialogProps) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger(props: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

function AlertDialogPortal(props: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn("fixed inset-0 z-50 bg-cool-neutral-10/43", className)}
      {...props}
    />
  );
}

// 좁은 화면의 기준 폭은 맞는 토큰이 없어 값을 그대로 쓴다
function AlertDialogContent({
  className,
  ...props
}: AlertDialogPrimitive.Popup.Props) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Viewport
        data-slot="alert-dialog-viewport"
        className="fixed inset-0 z-50 flex items-center justify-center p-5"
      >
        <AlertDialogPrimitive.Popup
          data-slot="alert-dialog-content"
          className={cn(
            `flex max-h-full max-w-100 min-w-80 flex-col overflow-y-auto
            rounded-12 bg-popover text-popover-foreground outline-none
            max-[360px]:min-w-full`,
            className,
          )}
          {...props}
        />
      </AlertDialogPrimitive.Viewport>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-1.5 p-5", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex shrink-0 items-center justify-end gap-6 px-5 pb-3",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.Title.Props) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "text-headline1 font-semibold break-keep wrap-anywhere text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: AlertDialogPrimitive.Description.Props) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-body2 font-normal break-keep wrap-anywhere text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

type AlertDialogActionProps = ButtonProps;

// 누른 뒤 닫는 일은 쓰는 쪽이 한다(onClick 에서 open 을 끈다)
function AlertDialogAction({
  variant = "link",
  ...props
}: AlertDialogActionProps) {
  return (
    <Button data-slot="alert-dialog-action" variant={variant} {...props} />
  );
}

type AlertDialogCancelProps = AlertDialogPrimitive.Close.Props &
  Pick<ButtonProps, "variant" | "size">;

function AlertDialogCancel({
  className,
  variant = "link",
  size = "default",
  ...props
}: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(variant === "link" && "text-muted-foreground", className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  type AlertDialogActionProps,
  type AlertDialogCancelProps,
  type AlertDialogProps,
};
