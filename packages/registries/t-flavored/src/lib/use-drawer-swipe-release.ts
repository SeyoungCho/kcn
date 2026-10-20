import * as React from "react";
import type { Drawer } from "@base-ui/react/drawer";

// Base UI Drawer(아래 시트)를 끌다 놓았을 때, 시트 높이와 상관없이 일정 거리만 끌어내려도 닫히게 한다.
// 끄는 동안의 일(손가락 따라가기 · 본문 스크롤과의 다툼 · --drawer-swipe-movement-y · data-swiping)은 Drawer 가 그대로 한다.
// Drawer 는 높이의 절반을 넘게 끌거나 빠르게 튕겨야 닫고 그 기준을 바꾸는 prop 이 없어, 놓는 순간에만 끼어든다:
//
//   const swipeRelease = useDrawerSwipeRelease({ popupRef, backdropRef, actionsRef });
//   <Drawer.Root actionsRef={actionsRef}> … <Drawer.Viewport {...swipeRelease}>
//
// 이 기준으로 닫을 때는 놓은 자리에서부터 나가도록 팝업에 --drawer-release-movement(px),
// 바탕에 --drawer-release-progress(0~1)를 적는다 — Drawer 는 놓는 순간 끈 거리를 0 으로 되돌리기 때문이다.

/** 손가락이 이만큼(px) 내려왔으면 시트 높이와 상관없이 닫는다. */
const CLOSE_DISTANCE = 50;

const SWIPE_MOVEMENT = "--drawer-swipe-movement-y";
const RELEASE_MOVEMENT = "--drawer-release-movement";
const RELEASE_PROGRESS = "--drawer-release-progress";

type UseDrawerSwipeReleaseReturnValue = Pick<
  Drawer.Viewport.Props,
  | "onPointerDownCapture"
  | "onPointerUpCapture"
  | "onPointerUp"
  | "onPointerCancel"
  | "onTouchStartCapture"
  | "onTouchEndCapture"
  | "onTouchEnd"
  | "onTouchCancel"
>;

interface UseDrawerSwipeReleaseParameters {
  popupRef: React.RefObject<HTMLElement | null>;
  backdropRef: React.RefObject<HTMLElement | null>;
  actionsRef: React.RefObject<Drawer.Root.Actions | null>;
}

/** Drawer.Viewport 에 펼쳐 넣을 props 를 돌려준다. */
function useDrawerSwipeRelease({
  popupRef,
  backdropRef,
  actionsRef,
}: UseDrawerSwipeReleaseParameters): UseDrawerSwipeReleaseReturnValue {
  const gestureRef = React.useRef<{
    startY: number;
    movement: number;
    height: number;
  } | null>(null);

  return React.useMemo(() => {
    const clearRelease = () => {
      popupRef.current?.style.removeProperty(RELEASE_MOVEMENT);
      backdropRef.current?.style.removeProperty(RELEASE_PROGRESS);
    };

    const start = (clientY: number) => {
      clearRelease();
      gestureRef.current = { startY: clientY, movement: 0, height: 0 };
    };

    // Drawer 보다 먼저(capture) 끈 거리와 높이를 읽어 둔다 — Drawer 는 놓기를 처리하며 끈 거리를 0 으로 되돌린다
    const measure = () => {
      const [gesture, popup] = [gestureRef.current, popupRef.current];
      if (!gesture || !popup) return;
      gesture.movement =
        Number.parseFloat(popup.style.getPropertyValue(SWIPE_MOVEMENT)) || 0;
      gesture.height = popup.offsetHeight;
    };

    // Drawer 가 처리한 뒤에 불린다(Base UI 는 제 핸들러를 먼저, 넘겨받은 것을 나중에 부른다)
    const release = (clientY: number) => {
      const [gesture, popup] = [gestureRef.current, popupRef.current];
      gestureRef.current = null;
      // 시트를 끌지 않은 손짓(누르기 · 본문 스크롤)이거나 Drawer 가 이미 닫고 있으면 그대로 둔다
      if (!gesture || !popup || gesture.movement <= 0) return;
      if (popup.hasAttribute("data-ending-style")) return;
      if (clientY - gesture.startY < CLOSE_DISTANCE) return;

      popup.style.setProperty(RELEASE_MOVEMENT, `${gesture.movement}px`);
      backdropRef.current?.style.setProperty(
        RELEASE_PROGRESS,
        String(Math.min(gesture.movement / Math.max(gesture.height, 1), 1)),
      );
      actionsRef.current?.close();
      // 닫기를 받아들이지 않으면(바깥에서 open 을 쥔 경우) 적어 둔 값을 지워 제자리로 돌아가게 한다
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (popup.hasAttribute("data-open")) clearRelease();
        }),
      );
    };

    const cancel = () => {
      gestureRef.current = null;
    };

    // 터치는 touch 이벤트로만 다룬다(Drawer 와 같다) — 같은 손짓을 pointer 이벤트로 한 번 더 세지 않는다
    const unlessTouch =
      (handler: (event: React.PointerEvent) => void) =>
      (event: React.PointerEvent) => {
        if (event.pointerType !== "touch") handler(event);
      };

    return {
      onPointerDownCapture: unlessTouch((event) => start(event.clientY)),
      onPointerUpCapture: unlessTouch(measure),
      onPointerUp: unlessTouch((event) => release(event.clientY)),
      onPointerCancel: unlessTouch(cancel),
      onTouchStartCapture: (event) => {
        const touch = event.touches[0];
        if (touch) start(touch.clientY);
      },
      onTouchEndCapture: measure,
      onTouchEnd: (event) => {
        const touch = event.changedTouches[0];
        if (touch) release(touch.clientY);
        else cancel();
      },
      onTouchCancel: cancel,
    };
  }, [popupRef, backdropRef, actionsRef]);
}

export { useDrawerSwipeRelease };
