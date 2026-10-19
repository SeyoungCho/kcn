import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import IconXmarkLine from "@karrotmarket/react-monochrome-icon/IconXmarkLine";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { ActionButton } from "@/components/ui/action-button";
import type { ActionButtonProps } from "@/components/ui/action-button";
import { Icon } from "@/components/ui/icon";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
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

const dialogContentVariants = cva(
  [
    `relative box-border flex flex-[0_0_auto] flex-col rounded-r5
    bg-bg-layer-floating break-all [outline:none]`,
    `max-h-[80dvh] w-[90vw] max-w-[90%] mobile:w-(--dialog-size-width)
    mobile:max-w-[calc(100vw-2*var(--dimension-x5))]`,
    LAYER,
    CONTENT_MOTION,
  ],
  {
    variants: {
      size: {
        medium: "[--dialog-size-width:480px]",
        large: "[--dialog-size-width:800px]",
      },
    },
    defaultVariants: { size: "medium" },
  },
);

type DialogSize = NonNullable<
  VariantProps<typeof dialogContentVariants>["size"]
>;

const DialogSizeContext = React.createContext<DialogSize>("medium");

const assignRef = <T,>(ref: React.Ref<T> | undefined, node: T | null) => {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
};

export interface DialogRootProps extends Omit<
  DialogPrimitive.Root.Props,
  "disablePointerDismissal" | "children"
> {
  children?: React.ReactNode;
  /** 창의 폭(768px 이상에서) — medium 480px · large 800px */
  size?: DialogSize;
  /** 바깥을 눌러 닫는다. 기본은 닫지 않는다(입력하던 것을 잃지 않게) */
  closeOnInteractOutside?: boolean;
  /** Esc 로 닫는다 */
  closeOnEscape?: boolean;
}

function DialogRoot({
  size = "medium",
  closeOnInteractOutside = false,
  closeOnEscape = true,
  onOpenChange,
  ...props
}: DialogRootProps) {
  const [open, setInnerOpen] = useOverlayOpen(props.open, props.defaultOpen);
  return (
    <DialogSizeContext value={size}>
      <OverlayOpenContext value={open}>
        <DialogPrimitive.Root
          disablePointerDismissal={!closeOnInteractOutside}
          onOpenChange={(nextOpen, details) => {
            if (
              !nextOpen &&
              !closeOnEscape &&
              details.reason === "escape-key"
            ) {
              details.cancel();
              return;
            }
            onOpenChange?.(nextOpen, details);
            if (!details.isCanceled) setInnerOpen(nextOpen);
          }}
          {...props}
        />
      </OverlayOpenContext>
    </DialogSizeContext>
  );
}

export type DialogTriggerProps = DialogPrimitive.Trigger.Props;

function DialogTrigger(props: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export interface DialogContentProps extends Omit<
  DialogPrimitive.Popup.Props,
  "title" | "className" | "style"
> {
  className?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** 다른 창 · 시트와 겹칠 때의 순서 — 클수록 위 */
  layerIndex?: number;
  /** 오른쪽 위의 닫기 버튼 */
  showCloseButton?: boolean;
}

function DialogCloseButton() {
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLButtonElement>();
  return (
    <DialogPrimitive.Close
      ref={scaleFeedbackRef}
      data-slot="dialog-close"
      aria-label="닫기"
      className={cn(
        scaleFeedbackClassName,
        `absolute top-x7 right-x6 -m-3.75 flex cursor-pointer items-center
        justify-center rounded-r3 border-none bg-bg-transparent p-3.75`,
        "[--icon-color:var(--fg-neutral-subtle)] [--icon-size:22px]",
        `outline-solid outline-(length:--dimension-x0_5)
        outline-offset-(--dimension-x0_5) outline-transparent
        focused:outline-stroke-focus-ring`,
        "engaged:bg-bg-transparent-pressed pressed:scale-(--feedback-scale)",
        "[transition:background_var(--motion-duration-color-transition)_var(--motion-ease-easing),var(--feedback-scale-transition),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
      )}
    >
      <Icon svg={<IconXmarkLine />} />
    </DialogPrimitive.Close>
  );
}

/** 창 — body 에 그린다(탭 · 스크롤 영역 안에 갇혀 잘리지 않게). 제목이 없으면 aria-label 을 준다. */
function DialogContent({
  ref,
  className,
  children,
  title,
  description,
  layerIndex,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  const size = React.useContext(DialogSizeContext);
  const popupRef = React.useRef<HTMLDivElement | null>(null);
  // 닫히는 동안에는 마지막으로 열려 있던 때의 내용 그대로(머리만 남고 쪼그라들지 않게)
  const shown = useRetainedWhileClosed({ title, description, children });
  const hasHeader =
    Boolean(shown.title) || Boolean(shown.description) || showCloseButton;

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Viewport
        data-slot="dialog-positioner"
        className="fixed inset-0 flex items-center justify-center
          overscroll-y-none [--dialog-z-index:2]
          z-[calc(var(--dialog-z-index)+var(--layer-index,0))]"
        style={{ "--layer-index": layerIndex } as React.CSSProperties}
      >
        {/* 다른 창 안에서 열려도 바탕을 그린다(SEED 와 같게) */}
        <DialogPrimitive.Backdrop
          forceRender
          data-slot="dialog-backdrop"
          className={cn("fixed inset-0 bg-bg-overlay", LAYER, BACKDROP_MOTION)}
        />
        <DialogPrimitive.Popup
          ref={(node) => {
            popupRef.current = node;
            assignRef(ref, node);
          }}
          data-slot="dialog-content"
          // 첫 버튼이 아니라 창 자체에 초점을 둔다 — 열자마자 닫기 버튼에 초점 링이 뜨지 않게.
          initialFocus={popupRef}
          className={cn(dialogContentVariants({ size }), className)}
          {...props}
        >
          {hasHeader ? (
            <div
              data-slot="dialog-header"
              className={cn(
                "flex shrink-0 flex-col gap-x1.5 pt-x6 pb-x4 pl-x6",
                // 닫기 버튼(22px)과 그 앞의 틈만큼 오른쪽을 비운다
                showCloseButton
                  ? "pr-[calc(var(--dimension-x6)_+_22px_+_var(--dimension-x1_5))]"
                  : "pr-x6",
              )}
            >
              {shown.title ? (
                <DialogPrimitive.Title
                  data-slot="dialog-title"
                  className="m-0 text-t8 font-bold text-fg-neutral"
                >
                  {shown.title}
                </DialogPrimitive.Title>
              ) : null}
              {shown.description ? (
                <DialogPrimitive.Description
                  data-slot="dialog-description"
                  className="m-0 text-t5 font-regular whitespace-pre-wrap
                    text-fg-neutral-muted"
                >
                  {shown.description}
                </DialogPrimitive.Description>
              ) : null}
              {showCloseButton ? <DialogCloseButton /> : null}
            </div>
          ) : null}
          {shown.children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  );
}

export type DialogBodyProps = React.ComponentProps<"div">;

/** 본문 — 길면 여기만 스크롤된다. 내린 만큼 위에 금이 생기고, 넘치면 아래가 흐려진다. */
function DialogBody({ ref, className, ...props }: DialogBodyProps) {
  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [overflowing, setOverflowing] = React.useState(false);

  React.useEffect(() => {
    if (!element) return undefined;
    const check = () => {
      setScrolled(element.scrollTop > 0);
      // 넘칠 때 더하는 아래 여백은 빼고 잰다 — 안 그러면 그 여백 때문에 늘 넘친 것으로 보인다.
      const paddingBottom =
        Number.parseFloat(getComputedStyle(element).paddingBottom) || 0;
      setOverflowing(
        element.scrollHeight - paddingBottom > element.clientHeight,
      );
    };
    check();
    element.addEventListener("scroll", check);
    const observer = new ResizeObserver(check);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", check);
      observer.disconnect();
    };
  }, [element]);

  return (
    <div
      ref={(node) => {
        setElement(node);
        assignRef(ref, node);
      }}
      data-slot="dialog-body"
      data-scrolled={scrolled ? "" : undefined}
      data-overflow={overflowing ? "" : undefined}
      className={cn(
        `box-border flex max-h-none min-h-0 flex-1 flex-col overflow-y-auto
        px-x6`,
        // 아래에 버튼 줄이 없어 창의 끝이면 창의 둥근 모서리를 따른다 — 본문에 바탕색을 주면 모서리가 네모로 삐져나왔다
        // (넘칠 때는 아래 흐림 가림이 모서리를 가려 둥글게 보였고, 짧을 때만 드러났다)
        "last:rounded-b-[inherit]",
        "[transition:box-shadow_var(--motion-duration-color-transition)_var(--motion-ease-easing)]",
        `outline-solid outline-(length:--dimension-x0_5)
        -outline-offset-(--dimension-x0_5) outline-transparent
        focused:outline-stroke-focus-ring`,
        "data-scrolled:not-first:[box-shadow:inset_0_1px_0_0_var(--stroke-neutral-muted)]",
        `data-overflow:pb-x12
        data-overflow:mask-[linear-gradient(to_top,transparent_0,black_var(--dimension-x12))]`,
        className,
      )}
      {...props}
    />
  );
}

export type DialogFooterProps = React.ComponentProps<"div">;

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex shrink-0 flex-col items-stretch px-x6 pt-x4 pb-x6",
        className,
      )}
      {...props}
    />
  );
}

export type DialogActionProps = ActionButtonProps;

/** 누르면 창이 닫히는 버튼 */
function DialogAction(props: DialogActionProps) {
  return <DialogPrimitive.Close render={<ActionButton {...props} />} />;
}

export {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogFooter,
  DialogAction,
  dialogContentVariants,
};
