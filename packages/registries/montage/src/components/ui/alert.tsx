import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Alert 에 montage 의 모양을 입혔다.
//   바탕 — 뒤를 흐리게(backdrop-blur) 하고 반투명 흰 면을 깐 뒤, variant 색을 아주 옅게 한 겹(::before) 더 깐다.
//   variant — default(안내) · positive · cautionary · destructive · neutral. 아이콘(svg 자식)도 이 색으로 칠한다.
//   자리 — [아이콘][제목 · 설명][AlertAction]. 아이콘과 AlertAction 은 제목 줄에 맞춘다.
// neutral 의 옅은 면은 알파를 뺀 회색에서 뽑아서 밝게 · 어둡게 팔레트 색을 따로 적는다.
const alertVariants = cva(
  `relative isolate grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start
  gap-y-1 rounded-12 bg-bg-neutral-primary/88 p-3 text-left backdrop-blur-[32px]
  before:pointer-events-none before:absolute before:inset-0 before:-z-1
  before:rounded-[inherit] [&>svg]:col-start-1 [&>svg]:row-start-1 [&>svg]:my-px
  [&>svg]:me-2 [&>svg]:size-5 [&>svg]:shrink-0`,
  {
    variants: {
      variant: {
        default:
          "before:bg-surface-brand-primary/5 [&>svg]:text-fg-brand-primary",
        positive:
          "before:bg-fg-positive-primary/5 [&>svg]:text-fg-positive-primary",
        cautionary:
          "before:bg-fg-cautionary-primary/5 [&>svg]:text-fg-cautionary-primary",
        destructive:
          "before:bg-fg-negative-primary/5 [&>svg]:text-fg-negative-primary",
        neutral: `before:bg-cool-neutral-25/5 dark:before:bg-cool-neutral-80/5
        [&>svg]:text-fg-neutral-tertiary`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type AlertProps = React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants>;

function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        `col-start-2 text-body2 font-medium text-fg-neutral-primary
        wrap-anywhere break-keep`,
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        `col-start-2 text-label1-reading text-fg-neutral-secondary wrap-anywhere
        break-keep`,
        className,
      )}
      {...props}
    />
  );
}

// 제목 줄 높이에 고정하고 넘치는 버튼은 위아래로 삐져나오게 둔다 — 버튼이 있어도 알림의 높이가 그대로다.
// 글자 버튼(link)은 양옆에 누름 막이 들어갈 여백을 두고, 이어 놓으면 사이를 한 번만 띄운다.
// 닫기 같은 icon-sm 버튼은 자리를 아이콘 크기로 줄여 누름 막만 둘레로 넘치게 한다.
function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn(
        `col-start-3 row-start-1 ms-2 flex h-5.5 shrink-0 items-center gap-2
        [&>[data-size=icon-sm]]:-m-1.5 [&>[data-variant=link]]:mx-2
        [&>[data-variant=link]+[data-variant=link]]:ms-0`,
        className,
      )}
      {...props}
    />
  );
}

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
  alertVariants,
  type AlertProps,
};
