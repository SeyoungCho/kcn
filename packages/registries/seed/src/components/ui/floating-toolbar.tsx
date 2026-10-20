"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import IconXmarkLine from "@karrotmarket/react-monochrome-icon/IconXmarkLine";
import { ActionButton } from "@/components/ui/action-button";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

// 떠 있는 도구 줄 — 고른 줄에 할 일을 화면 아래 가운데에 알약 모양으로 띄운다(SEED 에 없는 부품이라 SEED 의 부품 · 토큰으로 새로 만들었다).
// SEED 에 없는 부품이라 모양은 SEED 의 떠 있는 바탕(메뉴 · 스낵바)을 따른다: 바탕 bg-layer-floating · 그림자 s2 · 둥글기 full.
//   <FloatingToolbar open={n > 0} onDismiss={clear} aria-label="고른 회원에 할 일">
//     <FloatingToolbarLabel>3명 고름</FloatingToolbarLabel>
//     <FloatingToolbarSeparator />
//     <FloatingToolbarButton onClick={…}>시스템 차단</FloatingToolbarButton>
//   </FloatingToolbar>
// 본문(main)의 가운데에 뜬다(사이드 메뉴를 빼고). body 에 그려 표 · 스크롤 상자에 잘리지 않는다. 좁으면 옆으로 밀고(막대 없이) 마우스로 끌 수 있다.

const DRAG_THRESHOLD = 4;

const noopSubscribe = () => () => {};

/** 브라우저에서 그리는 중인지 — 서버와 하이드레이션 첫 그림에서는 false 라 body 포털을 그 뒤에 붙인다 */
function useIsClient() {
  return React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** 막대 없이 옆으로 밀기 — 휠을 옆으로 돌리고, 마우스로 잡아 끈다. 끈 뒤의 누름은 삼킨다 */
function useDragScroll<T extends HTMLElement>() {
  const drag = React.useRef<{
    pointerId: number;
    startX: number;
    scrollLeft: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = React.useRef(false);
  const [dragging, setDragging] = React.useState(false);
  const [overflowing, setOverflowing] = React.useState(false);

  // 줄은 open 과 함께 붙었다 떨어지므로 콜백 ref 로 관찰을 건다
  const ref = React.useCallback((element: T | null) => {
    if (!element) return;
    const observer = new ResizeObserver(() =>
      setOverflowing(element.scrollWidth > element.clientWidth + 1),
    );
    observer.observe(element);
    const onWheel = (event: WheelEvent) => {
      if (element.scrollWidth <= element.clientWidth) return;
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        element.scrollLeft += event.deltaY;
        event.preventDefault();
      }
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      observer.disconnect();
      element.removeEventListener("wheel", onWheel);
    };
  }, []);

  const end = (event: React.PointerEvent<T>) => {
    const current = drag.current;
    if (!current || event.pointerId !== current.pointerId) return;
    if (current.moved) {
      suppressClick.current = true;
      if (event.currentTarget.hasPointerCapture(event.pointerId))
        event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drag.current = null;
    setDragging(false);
  };

  return {
    ref,
    dragging,
    overflowing,
    handlers: {
      onPointerDown: (event: React.PointerEvent<T>) => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        const element = event.currentTarget;
        if (element.scrollWidth <= element.clientWidth) return;
        drag.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          scrollLeft: element.scrollLeft,
          moved: false,
        };
      },
      onPointerMove: (event: React.PointerEvent<T>) => {
        const current = drag.current;
        if (!current || event.pointerId !== current.pointerId) return;
        const delta = event.clientX - current.startX;
        if (!current.moved) {
          if (Math.abs(delta) < DRAG_THRESHOLD) return;
          current.moved = true;
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }
        event.currentTarget.scrollLeft = current.scrollLeft - delta;
      },
      onPointerUp: end,
      onPointerCancel: end,
      onClickCapture: (event: React.MouseEvent<T>) => {
        if (!suppressClick.current) return;
        suppressClick.current = false;
        event.stopPropagation();
        event.preventDefault();
      },
    },
  };
}

/** 본문(main)의 왼쪽 · 폭 — 도구 줄을 본문 가운데에 놓는다(없으면 화면 전체) */
function useMainBox(active: boolean) {
  const [box, setBox] = React.useState<{ left: number; width: number } | null>(
    null,
  );
  React.useLayoutEffect(() => {
    if (!active) return;
    const main = document.querySelector("main");
    if (!main) return;
    const update = () => {
      const rect = main.getBoundingClientRect();
      setBox({ left: rect.left, width: rect.width });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(main);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [active]);
  return box;
}

export interface FloatingToolbarProps extends React.ComponentProps<"div"> {
  /** 보이기 — 아래에서 떠오르고 내려가며 사라진다 */
  open: boolean;
  /** 옆의 닫기 버튼 · Esc — 주지 않으면 닫기 버튼이 없다(보통 고르기 풀기) */
  onDismiss?: () => void;
  /** 닫기 버튼의 이름 */
  closeLabel?: string;
}

function FloatingToolbar({
  open,
  onDismiss,
  closeLabel = "선택 해제",
  className,
  children,
  ...props
}: FloatingToolbarProps) {
  // 닫힐 때 내려가는 움직임이 끝난 뒤에 뗀다
  const [present, setPresent] = React.useState(open);
  if (open && !present) setPresent(true);
  const box = useMainBox(present);
  const scroll = useDragScroll<HTMLDivElement>();
  const isClient = useIsClient();

  React.useEffect(() => {
    if (!open || !onDismiss) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      // 메뉴 · 창 · 목록이 열려 있으면 Esc 는 그것을 닫는 데 쓴다(고르기까지 풀지 않는다)
      if (
        document.querySelector(
          '[role="menu"], [role="dialog"], [role="alertdialog"], [role="listbox"]',
        )
      )
        return;
      onDismiss();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onDismiss]);

  if (!present || !isClient) return null;

  return createPortal(
    <div
      data-slot="floating-toolbar-viewport"
      className="pointer-events-none fixed bottom-x6 z-5 box-border flex
        justify-center px-x4"
      style={box ? { left: box.left, width: box.width } : { left: 0, right: 0 }}
    >
      <div
        data-slot="floating-toolbar-group"
        data-open={open ? "" : undefined}
        data-closed={open ? undefined : ""}
        onAnimationEnd={(event) => {
          if (!open && event.target === event.currentTarget) setPresent(false);
        }}
        className={cn(
          "flex max-w-full items-center gap-x2",
          `[--seed-enter-opacity:0] [--seed-enter-scale:0.96]
          [--seed-enter-translate-y:var(--dimension-x4)]`,
          `[--seed-exit-opacity:0] [--seed-exit-scale:0.98]
          [--seed-exit-translate-y:var(--dimension-x3)]`,
          "data-open:animate-[seed-enter_var(--motion-duration-d4)_var(--motion-ease-enter-expressive)]",
          "data-closed:animate-[seed-exit_var(--motion-duration-d2)_var(--motion-ease-exit)_forwards]",
        )}
      >
        <div
          ref={scroll.ref}
          role="toolbar"
          data-slot="floating-toolbar"
          data-overflowing={scroll.overflowing || undefined}
          data-dragging={scroll.dragging || undefined}
          className={cn(
            `pointer-events-auto box-border flex min-w-0 items-center gap-x1
            overflow-x-auto rounded-full border border-solid
            border-stroke-neutral-muted bg-bg-layer-floating p-x1.5 pl-x2
            font-sans text-t4 text-fg-neutral shadow-s2`,
            "scrollbar-none [&::-webkit-scrollbar]:hidden",
            `data-overflowing:cursor-grab data-dragging:cursor-grabbing
            data-dragging:select-none data-dragging:**:cursor-grabbing`,
            className,
          )}
          {...scroll.handlers}
          {...props}
        >
          {children}
        </div>
        {onDismiss ? (
          <ActionButton
            data-slot="floating-toolbar-close"
            variant="neutralWeak"
            size="small"
            layout="iconOnly"
            aria-label={closeLabel}
            onClick={onDismiss}
            className="pointer-events-auto size-x10 shrink-0 rounded-full border
              border-solid border-stroke-neutral-muted bg-bg-layer-floating
              shadow-s2"
          >
            <Icon svg={<IconXmarkLine />} />
          </ActionButton>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

/** 왼쪽의 이름 — '3명 고름' 같은 것(아이콘을 앞에 둘 수 있다) */
function FloatingToolbarLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="floating-toolbar-label"
      className={cn(
        `flex shrink-0 items-center gap-x1.5 pr-x2 pl-x1 font-bold
        whitespace-nowrap [--icon-size:var(--dimension-x4)]`,
        className,
      )}
      {...props}
    />
  );
}

/** 묶음 사이 세로 금 */
function FloatingToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Divider>) {
  return (
    <Divider
      data-slot="floating-toolbar-separator"
      orientation="vertical"
      className={cn("mx-x0.5 h-x4 shrink-0 self-center", className)}
      {...props}
    />
  );
}

/** 버튼 — 글자 버튼(ghost). 되돌릴 수 없는 일은 tone="critical"(글자 · 아이콘만 빨강) */
function FloatingToolbarButton({
  className,
  tone = "neutral",
  ...props
}: React.ComponentProps<typeof ActionButton> & {
  tone?: "neutral" | "critical";
}) {
  return (
    <ActionButton
      data-slot="floating-toolbar-button"
      variant="ghost"
      size="small"
      className={cn(
        "shrink-0 rounded-full [--icon-size:var(--dimension-x4)]",
        tone === "critical" &&
          "text-fg-critical [--icon-color:var(--fg-critical)]",
        className,
      )}
      {...props}
    />
  );
}

export {
  FloatingToolbar,
  FloatingToolbarButton,
  FloatingToolbarLabel,
  FloatingToolbarSeparator,
};
