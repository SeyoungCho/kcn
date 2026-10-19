import { useEffect, useState } from "react";

// 화면 폭 조건(CSS 미디어 쿼리)이 지금 맞는지. 창 크기가 바뀌면 따라 바뀐다.

/** 모바일(767px 이하) — 사이드 메뉴 대신 햄버거 버튼 + 사이드 패널을 쓴다 */
export const MOBILE = "(max-width: 767px)";

const matches = (query: string) =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(query).matches;

export function useMediaQuery(query: string) {
  const [matched, setMatched] = useState(() => matches(query));
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    )
      return undefined;
    const list = window.matchMedia(query);
    const update = () => setMatched(list.matches);
    update();
    list.addEventListener?.("change", update);
    return () => list.removeEventListener?.("change", update);
  }, [query]);
  return matched;
}
