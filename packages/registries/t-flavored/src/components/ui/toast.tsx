"use client";

import type * as React from "react";
import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  LoaderCircleIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

// Base UI Toast 에 t-flavored 의 모양을 입혔다. 열고 닫기는 toast 관리자로 한다:
//   <Toaster /> 를 한 번 두고 toast.add({ title, type, actionProps, data: { position: "top" } }).
// type 은 왼쪽 아이콘, actionProps 는 액션 버튼, data.position 은 뜨는 자리(없으면 Toaster 의 position)다.
// 위 토스트는 흰 알약에 그림자, 아래 토스트는 회색 알약에 흰 글자다. 화면 밖에서 미끄러져 들어오며 나타나고,
// 같은 길로 나가며 사라진다. 끌어서(위 토스트는 위로, 아래 토스트는 아래로) 닫을 수 있다.

const toast = ToastPrimitive.createToastManager();

type ToastPosition = "top" | "bottom";

/** toast.add 의 data 에 넣을 수 있는 값 */
type ToastData = {
  /** 이 토스트만 다른 자리에 띄운다. 없으면 Toaster 의 position. */
  position?: ToastPosition;
};

function ToastProvider(props: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider data-slot="toast-provider" {...props} />;
}

function ToastPortal(props: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />;
}

// 화면 전체를 덮지만 누르기는 토스트에만 닿는다
function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "pointer-events-none fixed inset-0 z-50 outline-none",
        className,
      )}
      {...props}
    />
  );
}

// 들어올 때 450ms, 나갈 때 320ms — 스프링 같은 움직임을 cubic-bezier 로 흉내 냈다.
// 위 토스트가 뜨는 높이(46px)와 너비 한도(375px · 390px, 양옆 18px · 20px)는 맞는 토큰이 없어 값을 그대로 쓴다.
const toastVariants = cva(
  `group/toast pointer-events-auto absolute inset-x-0 mx-auto flex w-max
  items-center rounded-full outline-none select-none
  [transform:translateY(var(--toast-swipe-movement-y))]
  transition-[transform,opacity] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]
  focus-visible:ring-3 focus-visible:ring-ring/50
  has-data-[slot=toast-icon]:pl-3 data-ending-style:opacity-0
  data-ending-style:duration-320 data-limited:pointer-events-none
  data-limited:opacity-0 data-starting-style:opacity-0`,
  {
    variants: {
      position: {
        top: `top-[46px] max-w-[min(375px,calc(100%-36px))] bg-popover px-4 py-3
        text-grey-opacity-800 shadow-sm
        data-ending-style:[transform:translateY(calc(-100%-46px))]
        data-starting-style:[transform:translateY(calc(-100%-46px))]`,
        bottom: `bottom-5 max-w-[min(390px,calc(100%-40px))] bg-grey-500 px-5
        py-3.5 text-white has-data-[slot=toast-action]:w-full
        has-data-[slot=toast-action]:pr-3.5 has-data-[slot=toast-action]:pl-4
        data-ending-style:[transform:translateY(calc(100%+20px))]
        data-starting-style:[transform:translateY(calc(100%+20px))]`,
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  },
);

type ToastProps = ToastPrimitive.Root.Props &
  VariantProps<typeof toastVariants>;

function Toast({
  className,
  position = "bottom",
  swipeDirection = position === "top" ? "up" : "down",
  ...props
}: ToastProps) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      data-position={position}
      swipeDirection={swipeDirection}
      className={cn(toastVariants({ position }), className)}
      {...props}
    />
  );
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn("flex w-full min-w-0 items-center gap-2", className)}
      {...props}
    />
  );
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("text-t6 font-semibold break-keep", className)}
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
      className={cn("text-t7 break-keep opacity-80", className)}
      {...props}
    />
  );
}

// 액션 버튼 — 글자와 20px 떨어진 작은 알약. 누르면 검은 딤(10%)이 깔린다.
function ToastAction({ className, ...props }: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      className={cn(
        `relative isolate ml-3 shrink-0 overflow-hidden rounded-full
        bg-grey-opacity-400 px-3 py-1.5 text-t7 font-semibold whitespace-nowrap
        text-white/89 outline-none select-none after:absolute after:inset-0
        after:-z-10 after:bg-black/10 after:opacity-0 after:transition-opacity
        after:duration-100 focus-visible:ring-3 focus-visible:ring-ring/50
        active:after:opacity-100
        group-data-[position=top]/toast:bg-grey-opacity-100
        group-data-[position=top]/toast:text-grey-700`,
        className,
      )}
      {...props}
    />
  );
}

// type 에 따라 색을 채운 원에 흰 기호를 그린다
const TOAST_ICONS = {
  success: <CircleCheckIcon className="text-green-400" />,
  error: <CircleXIcon className="text-red-500" />,
  warning: <CircleAlertIcon className="text-yellow-500" />,
  info: <InfoIcon className="text-blue-500" />,
  loading: <LoaderCircleIcon className="animate-spin text-grey-400" />,
} as const;

function ToastIcon({
  type,
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & { type?: string }) {
  const icon =
    children ?? (type ? TOAST_ICONS[type as keyof typeof TOAST_ICONS] : null);

  if (!icon) {
    return null;
  }

  return (
    <span
      data-slot="toast-icon"
      aria-hidden
      className={cn(
        `flex size-6 shrink-0 items-center justify-center
        [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6
        [&_svg>circle]:fill-current
        [&_svg:has(>circle)>:not(circle)]:stroke-white`,
        className,
      )}
      {...props}
    >
      {icon}
    </span>
  );
}

function ToastList({ position }: { position: ToastPosition }) {
  const { toasts } = ToastPrimitive.useToastManager<ToastData>();

  return toasts.map((item) => (
    <Toast
      key={item.id}
      toast={item}
      position={item.data?.position ?? position}
    >
      <ToastContent>
        <ToastIcon type={item.type} />
        <div className="flex min-w-0 flex-1 flex-col">
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
      </ToastContent>
    </Toast>
  ));
}

type ToasterProps = ToastPrimitive.Provider.Props & {
  /** 토스트가 뜨는 자리. 토스트마다 data.position 으로 바꿀 수 있다. */
  position?: ToastPosition;
};

// 한 번에 하나만 보이고(limit 1) 3초 뒤 닫힌다
function Toaster({
  children,
  position = "bottom",
  limit = 1,
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
          <ToastList position={position} />
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
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  toastVariants,
  useToastManager,
  type ToastData,
  type ToastPosition,
  type ToastProps,
  type ToasterProps,
};
