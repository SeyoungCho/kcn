import * as React from "react";
import type { Drawer } from "@base-ui/react/drawer";

/**
 * Base UI Drawer 를 끌다 놓았을 때의 판정을 SEED 의 기준으로 맞춘다.
 *
 * 끄는 동안의 일(손가락 따라가기 · 스크롤과의 다툼 · --drawer-swipe-movement-* · data-swiping)은 Drawer 가 그대로 한다.
 * Drawer 는 크기의 절반을 넘게 끌어야 닫는데 그 값을 바꾸는 prop 이 없어, 놓는 순간에만 끼어든다:
 *
 *   const swipeRelease = useDrawerSwipeRelease({ swipeDirection: 'down', popupRef, backdropRef, actionsRef });
 *   <Drawer.Root actionsRef={actionsRef}> … <Drawer.Viewport {...swipeRelease}>
 *
 * 놓은 뒤의 모양은 부품이 아래 값으로 그린다.
 *   닫힐 때 — 팝업의 --drawer-release-movement(놓은 자리, px) · 바탕의 --drawer-release-progress(0~1). 거기서부터 나가게 한다.
 *   되돌아갈 때 — 팝업 · 바탕의 data-swipe-settle. 되돌아가는 transition 을 여기에 건다.
 */

/** 크기의 이만큼 넘게 끌었으면 닫는다 */
const CLOSE_THRESHOLD = 0.25;
/** 누른 때부터 놓을 때까지 이보다 빨리(px/ms) 끌었으면 닫는다 */
const VELOCITY_THRESHOLD = 0.4;

const RELEASE_MOVEMENT = "--drawer-release-movement";
const RELEASE_PROGRESS = "--drawer-release-progress";
const SWIPE_SETTLE = "data-swipe-settle";

type SwipeDirection = NonNullable<Drawer.Root.Props["swipeDirection"]>;
type ViewportProps = Drawer.Viewport.Props;

export interface UseDrawerSwipeReleaseParameters {
  /** Drawer.Root 에 준 것과 같은 값 */
  swipeDirection: SwipeDirection;
  popupRef: React.RefObject<HTMLElement | null>;
  backdropRef: React.RefObject<HTMLElement | null>;
  actionsRef: React.RefObject<Drawer.Root.Actions | null>;
}

export type UseDrawerSwipeReleaseReturnValue = Pick<
  ViewportProps,
  | "onPointerDownCapture"
  | "onPointerUpCapture"
  | "onPointerCancelCapture"
  | "onPointerUp"
  | "onPointerCancel"
  | "onTouchStartCapture"
  | "onTouchEndCapture"
  | "onTouchCancelCapture"
  | "onTouchEnd"
  | "onTouchCancel"
>;

/** Drawer.Viewport 에 펼쳐 넣을 props 를 돌려준다. */
export function useDrawerSwipeRelease({
  swipeDirection,
  popupRef,
  backdropRef,
  actionsRef,
}: UseDrawerSwipeReleaseParameters): UseDrawerSwipeReleaseReturnValue {
  const gestureRef = React.useRef<{
    startTime: number;
    movement: number;
    size: number;
  } | null>(null);

  return React.useMemo(() => {
    const horizontal = swipeDirection === "left" || swipeDirection === "right";
    const towardDismiss =
      swipeDirection === "down" || swipeDirection === "right" ? 1 : -1;
    const swipeMovement = horizontal
      ? "--drawer-swipe-movement-x"
      : "--drawer-swipe-movement-y";

    const clearRelease = () => {
      for (const element of [popupRef.current, backdropRef.current]) {
        element?.removeAttribute(SWIPE_SETTLE);
        element?.style.removeProperty(RELEASE_MOVEMENT);
        element?.style.removeProperty(RELEASE_PROGRESS);
      }
    };

    const start = (event: React.SyntheticEvent) => {
      clearRelease();
      gestureRef.current = { startTime: event.timeStamp, movement: 0, size: 0 };
    };

    // Drawer 보다 먼저(capture) 끈 거리와 크기를 읽어 둔다 — Drawer 는 놓기를 처리하며 끈 거리를 0 으로 되돌린다.
    // 크기도 여기서 잰다: 처리한 뒤에 재면 그 순간 스타일이 확정되어, 되돌아가는 transition 을 걸기 전에 제자리로 가 버린다.
    const measure = () => {
      const [gesture, popup] = [gestureRef.current, popupRef.current];
      if (!gesture || !popup) return;
      gesture.movement =
        Number.parseFloat(popup.style.getPropertyValue(swipeMovement)) || 0;
      gesture.size = horizontal
        ? Math.min(popup.offsetWidth, window.innerWidth)
        : Math.min(popup.offsetHeight, window.innerHeight);
    };

    // Drawer 가 처리한 뒤에 불린다(Base UI 는 제 핸들러를 먼저, 넘겨받은 것을 나중에 부른다).
    const release = (event: React.SyntheticEvent) => {
      const [gesture, popup, backdrop] = [
        gestureRef.current,
        popupRef.current,
        backdropRef.current,
      ];
      gestureRef.current = null;
      if (!gesture || !popup || gesture.movement === 0) return;

      const { size } = gesture;
      const distance = gesture.movement * towardDismiss;
      const elapsed = event.timeStamp - gesture.startTime;
      const dismissedByDrawer = popup.hasAttribute("data-swipe-dismiss");
      const shouldDismiss =
        distance > 0 &&
        size > 0 &&
        elapsed > 0 &&
        (distance / elapsed > VELOCITY_THRESHOLD ||
          distance >= size * CLOSE_THRESHOLD);

      if (!dismissedByDrawer && !shouldDismiss) {
        popup.setAttribute(SWIPE_SETTLE, "");
        backdrop?.setAttribute(SWIPE_SETTLE, "");
        return;
      }

      popup.style.setProperty(RELEASE_MOVEMENT, `${gesture.movement}px`);
      backdrop?.style.setProperty(
        RELEASE_PROGRESS,
        String(Math.min(Math.max(distance / size, 0), 1)),
      );
      if (!dismissedByDrawer) actionsRef.current?.close();
      // 닫기를 받아들이지 않으면(바깥에서 open 을 쥔 경우) Drawer 가 한 박자 뒤에 되돌린다 — 적어 둔 값도 지운다.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (popup.hasAttribute("data-open")) clearRelease();
        }),
      );
    };

    // 터치는 touch 이벤트로만 다룬다(Drawer 와 같다) — 같은 손짓을 pointer 이벤트로 한 번 더 세지 않는다.
    const unlessTouch =
      (handler: (event: React.PointerEvent) => void) =>
      (event: React.PointerEvent) => {
        if (event.pointerType !== "touch") handler(event);
      };

    return {
      onPointerDownCapture: start,
      onPointerUpCapture: unlessTouch(measure),
      onPointerCancelCapture: unlessTouch(measure),
      onPointerUp: unlessTouch(release),
      onPointerCancel: unlessTouch(release),
      onTouchStartCapture: start,
      onTouchEndCapture: measure,
      onTouchCancelCapture: measure,
      onTouchEnd: release,
      onTouchCancel: release,
    };
  }, [swipeDirection, popupRef, backdropRef, actionsRef]);
}
