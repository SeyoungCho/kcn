import { useCallback, useSyncExternalStore } from "react";

// 화면 폭 조건(CSS 미디어 쿼리)이 지금 맞는지. 창 크기가 바뀌면 따라 바뀐다.
// 서버와 첫 그림(hydration)에서는 맞지 않는 것으로 그리고, 그다음에 실제 값으로 바뀐다 — 서버 HTML 과 어긋나지 않게.

/** 모바일(767px 이하) — 사이드 메뉴 대신 햄버거 버튼 + 사이드 패널을 쓴다 */
export const MOBILE = "(max-width: 767px)";

const canMatch = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function";

const getServerSnapshot = () => false;

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!canMatch()) return () => {};
      const list = window.matchMedia(query);
      list.addEventListener?.("change", onChange);
      return () => list.removeEventListener?.("change", onChange);
    },
    [query],
  );
  const getSnapshot = useCallback(
    () => canMatch() && window.matchMedia(query).matches,
    [query],
  );
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
