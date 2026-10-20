"use client";

import type * as React from "react";
import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import {
  CircleCheckIcon,
  CircleXIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

// Base UI Toast 에 montage 의 모양을 입혔다. 열고 닫기는 toast 관리자로 한다:
//   <Toaster /> 를 한 번 두고 toast.add({ title, type: "success" }).
// 화면 아래 가운데에 뒤를 흐리는 반투명한 어두운 상자로 뜬다. 새 토스트는 맨 아래에 붙으며 위의 것을 밀어 올리고,
// 닫히면 접히며 사라진다. 마우스를 올리면 닫히기를 멈춘다.
// type(success · warning · error)은 왼쪽 아이콘이고, data.icon 으로 그 자리에 그림 · 아바타를 둘 수 있다.
// description · actionProps · data.closeButton 을 주면 같은 상자가 제목 + 설명 + 액션 + 닫기 버튼 꼴이 된다.

/** toast.add 의 data 에 넣을 수 있는 값 */
type ToastData = {
  /** 왼쪽에 type 아이콘 대신 둘 요소(아이콘 · 그림 · 아바타). */
  icon?: React.ReactNode;
  /** 오른쪽 끝에 닫기 버튼을 둔다. */
  closeButton?: boolean;
};

const toast = ToastPrimitive.createToastManager<ToastData>();

function ToastProvider(props: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider data-slot="toast-provider" {...props} />;
}

function ToastPortal(props: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />;
}

// 아래 가운데에 세로로 쌓는다 — 새 토스트(목록의 앞)가 맨 아래에 온다. 누르기는 토스트에만 닿는다.
// 좁은 화면(md 아래)에서는 양옆 여백만 두고 꽉 채운다. 넓이 한도 1060px 은 맞는 토큰이 없다.
function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        `pointer-events-none fixed bottom-[env(safe-area-inset-bottom,0px)]
        left-1/2 z-50 flex w-fit max-w-[1060px] min-w-25 -translate-x-1/2
        flex-col-reverse items-center p-5 pb-10 outline-none max-md:min-w-full
        max-md:pb-5`,
        className,
      )}
      {...props}
    />
  );
}

type ToastProps = ToastPrimitive.Root.Props;

// 바깥 상자는 높이(grid 행) · 위 여백 · 투명도만 움직인다 — 0 에서 펼쳐지며 위의 토스트를 밀어 올리고, 닫힐 때 접힌다.
// 안의 ToastContent 는 접히는 동안에도 제 높이를 지켜 아래에서 떠오르는 듯 보인다.
// 넓은 화면에서 너비는 356px ~ 420px(맞는 토큰이 없다). 끌어서 닫지는 않는다.
function Toast({ className, swipeDirection = [], ...props }: ToastProps) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      swipeDirection={swipeDirection}
      className={cn(
        `pointer-events-auto mt-2.5 grid w-full grid-rows-[minmax(0,1fr)]
        rounded-12 outline-none
        transition-[grid-template-rows,margin-top,opacity] duration-200
        ease-[ease] focus-visible:outline-2 focus-visible:outline-ring
        focus-visible:outline-solid data-ending-style:mt-0
        data-ending-style:grid-rows-[minmax(0,0fr)] data-ending-style:opacity-0
        data-limited:hidden data-starting-style:mt-0
        data-starting-style:grid-rows-[minmax(0,0fr)]
        data-starting-style:opacity-0 md:w-auto md:max-w-[420px]
        md:min-w-[356px]`,
        className,
      )}
      {...props}
    />
  );
}

// 상자 — 반전 색을 반쯤 비치게 깔고 브랜드 색을 아주 옅게 한 겹(::before) 더 얹는다
function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        `relative isolate flex min-h-0 items-center gap-2 self-start
        overflow-hidden rounded-12 bg-surface-neutral-inverse/52 px-4 py-2.75
        text-white backdrop-blur-[32px] before:absolute before:inset-0
        before:-z-10 before:bg-surface-brand-primary/5`,
        className,
      )}
      {...props}
    />
  );
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn(
        "text-body2 font-semibold break-keep wrap-anywhere text-white/88",
        className,
      )}
      {...props}
    />
  );
}

function ToastDescription({
  className,
  ...props
}: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn(
        `line-clamp-2 text-label2 font-normal break-keep wrap-anywhere
        text-white/88`,
        className,
      )}
      {...props}
    />
  );
}

// 글자 버튼 — 누르는 막(::after)은 글자보다 양옆으로 8px 넓고 밝은 색이다
function ToastAction({ className, ...props }: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      className={cn(
        `relative isolate ms-1.5 me-0.5 inline-flex min-h-8 shrink-0
        cursor-pointer items-center justify-center rounded-10 py-1.25 text-body2
        font-semibold whitespace-nowrap text-white outline-none select-none
        after:pointer-events-none after:absolute after:inset-y-0
        after:-inset-x-2 after:-z-10 after:rounded-[inherit]
        after:bg-bg-neutral-primary after:opacity-0 after:transition-opacity
        after:duration-150 hover:after:opacity-5 focus-visible:outline-2
        focus-visible:outline-ring focus-visible:outline-solid
        active:after:opacity-12`,
        className,
      )}
      {...props}
    />
  );
}

// 닫기 버튼 — 아이콘(흐린 흰색) 둘레만 차지하고, 누르는 막은 그보다 크게 가운데에 깔린다
function ToastClose({
  className,
  children,
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close"
      className={cn(
        `relative isolate ms-1 flex size-6 shrink-0 cursor-pointer items-center
        justify-center rounded-10 p-0.5 text-white outline-none
        after:pointer-events-none after:absolute after:top-1/2 after:left-1/2
        after:-z-10 after:size-8 after:-translate-1/2 after:rounded-[inherit]
        after:bg-bg-neutral-primary after:opacity-0 after:transition-opacity
        after:duration-150 hover:after:opacity-5 focus-visible:outline-2
        focus-visible:outline-ring focus-visible:outline-solid
        active:after:opacity-12 [&_svg]:pointer-events-none [&_svg]:opacity-61
        [&_svg:not([class*='size-'])]:size-5`,
        className,
      )}
      {...props}
    >
      {children ?? <XIcon />}
    </ToastPrimitive.Close>
  );
}

// 원(세모)을 type 색으로 채우고 안의 기호는 흰 선으로 그린다
const filledIcon =
  "[&>:first-child]:fill-current [&>:not(:first-child)]:stroke-white";

const TOAST_ICONS = {
  success: <CircleCheckIcon className={cn(filledIcon, "text-green-60")} />,
  warning: <TriangleAlertIcon className={cn(filledIcon, "text-orange-60")} />,
  error: <CircleXIcon className={cn(filledIcon, "text-red-60")} />,
} as const;

type ToastIconProps = React.ComponentProps<"span"> & {
  /** toast.add 의 type. success · warning · error 면 그 아이콘을 그린다. */
  type?: string;
};

function ToastIcon({ type, className, children, ...props }: ToastIconProps) {
  const icon =
    children ?? (type ? TOAST_ICONS[type as keyof typeof TOAST_ICONS] : null);

  if (!icon) {
    return null;
  }

  return (
    <span
      data-slot="toast-icon"
      className={cn(
        `flex shrink-0 items-center justify-center
        [&_svg:not([class*='size-'])]:size-5`,
        className,
      )}
      {...props}
    >
      {icon}
    </span>
  );
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager<ToastData>();

  return toasts.map((item) => (
    <Toast key={item.id} toast={item}>
      <ToastContent>
        <ToastIcon type={item.type}>{item.data?.icon}</ToastIcon>
        <div
          data-slot="toast-message"
          className="flex min-w-0 flex-1 flex-col px-0.5 py-1.25"
        >
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        {item.data?.closeButton && <ToastClose />}
      </ToastContent>
    </Toast>
  ));
}

type ToasterProps = ToastPrimitive.Provider.Props;

// 세 개까지 보이고 3초 뒤 닫힌다. 액션이 있는 토스트는 timeout 을 길게 준다.
function Toaster({
  children,
  limit = 3,
  timeout = 3000,
  toastManager = toast,
  ...props
}: ToasterProps) {
  return (
    <ToastProvider
      toastManager={toastManager}
      limit={limit}
      timeout={timeout}
      {...props}
    >
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
  type ToastData,
  type ToastIconProps,
  type ToastProps,
  type ToasterProps,
};
