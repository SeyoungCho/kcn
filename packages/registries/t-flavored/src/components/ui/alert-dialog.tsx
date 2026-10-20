"use client";

import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// shadcn AlertDialog 에 t-flavored 의 모양을 입혔다. 쓰임에 따라 버튼 줄만 다르다.
//   알림 — <AlertDialogAction variant="link"> 하나. 굵은 파란 글자 버튼이 오른쪽에 붙는다.
//   확인 — <AlertDialogCancel>(secondary) + <AlertDialogAction>(primary).
// 창은 화면 양옆 32px · 위아래 80px 을 비우고 폭은 320px 까지다. 길면 머리(제목 · 설명)만 스크롤된다.
// 움직임 — 바탕은 옅게 깔리고, 창은 버튼이 하나면 0.8 배에서 커지며, 취소 버튼이 있으면 100px 아래에서 올라온다(260ms).
//   사라질 때는 둘 다 옅어지기만 한다(200ms). 바깥(딤)을 눌러도 닫히지 않고 좌우로 한 번 흔들린다.

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

function AlertDialogContent({
  className,
  onAnimationEnd,
  ...props
}: AlertDialogPrimitive.Popup.Props) {
  // 딤을 누를 때마다 흔든다 — 흔들기가 끝나면 표시를 떼어 다음에 다시 걸 수 있게 한다
  const [wiggling, setWiggling] = React.useState(false);

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay onClick={() => setWiggling(true)} />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-wiggle={wiggling || undefined}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) setWiggling(false);
          onAnimationEnd?.(event);
        }}
        className={cn(
          `fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100%-160px)]
          w-[calc(100%-64px)] max-w-80 -translate-x-1/2 -translate-y-1/2
          flex-col overflow-hidden rounded-3xl bg-background text-foreground
          transition-[opacity,scale,translate] duration-260
          ease-[cubic-bezier(0.25,1,0.5,1)] outline-none
          data-ending-style:opacity-0 data-ending-style:duration-200
          data-starting-style:scale-80 data-starting-style:opacity-0
          has-data-[slot=alert-dialog-cancel]:data-starting-style:scale-100
          has-data-[slot=alert-dialog-cancel]:data-starting-style:translate-y-[calc(-50%+100px)]
          data-wiggle:animate-[alert-dialog-wiggle_350ms_ease-in-out]`,
          className,
        )}
        {...props}
      />
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
      className={cn(
        "flex min-h-0 flex-col gap-2 overflow-y-auto px-5.5 pt-5.5",
        className,
      )}
      {...props}
    />
  );
}

// 글자 버튼(link) 하나뿐이면 위 여백이 14px 로 준다(버튼의 위아래 여백 6px 만큼)
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        `mx-4 mt-5 mb-4 flex shrink-0 flex-wrap justify-end gap-2
        has-data-[variant=link]:mt-3.5`,
        className,
      )}
      {...props}
    />
  );
}

// 줄 높이 1.35 · 1.5 는 타이포그래피 값 위에 덮어쓰는 다이얼로그 전용 값이다
function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.Title.Props) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        `text-t4 leading-[1.35] font-bold break-keep whitespace-pre-wrap
        text-grey-800`,
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
        `text-t6 font-medium break-keep whitespace-pre-wrap
        text-muted-foreground`,
        className,
      )}
      {...props}
    />
  );
}

// 버튼 줄의 버튼은 max(80px, 글자 폭)에서 남는 폭을 똑같이 나눠 갖고, 한 줄에 안 들어가면 한 줄씩 쌓인다.
// 글자 버튼(link)은 알림용 확인 버튼 — 굵은 파란 17px 글자에 6 · 12px 여백, 줄 높이 1.252.
const alertDialogButtonClassName = `min-w-max grow basis-20
  data-[variant=link]:flex-none data-[variant=link]:rounded-sm
  data-[variant=link]:px-3
  data-[variant=link]:py-1.5 data-[variant=link]:leading-[1.252]
  data-[variant=link]:font-bold data-[variant=link]:text-primary`;

type AlertDialogActionProps = React.ComponentProps<typeof Button>;

function AlertDialogAction({
  className,
  size = "lg",
  ...props
}: AlertDialogActionProps) {
  return (
    <Button
      data-slot="alert-dialog-action"
      size={size}
      className={cn(alertDialogButtonClassName, className)}
      {...props}
    />
  );
}

type AlertDialogCancelProps = AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">;

function AlertDialogCancel({
  className,
  variant = "secondary",
  size = "lg",
  ...props
}: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(alertDialogButtonClassName, className)}
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
