import { useCallback } from "react";

// 스크롤 상자의 가장자리 너머에 가려진 내용이 있는지를 상자에 data 속성으로 단다 — 포그(안개)를 CSS 로만 켜고 끄게.
//   data-overflow-top     위로 가려진 것이 있다(아래로 내려가 있다)
//   data-overflow-bottom  아래로 가려진 것이 있다
//   data-overflow-left    왼쪽으로 가려진 것이 있다(옆으로 밀려 있다)
//   data-overflow-right   오른쪽으로 가려진 것이 있다(끝까지 밀지 않았다)
//   --scrollport-width    보이는 폭(px) — 가로로 밀어도 보이는 자리에 붙어 있을 것(빈 상태 등)의 폭
// 스크롤할 때마다 다시 그리지 않게 React 상태가 아니라 요소에 직접 쓴다. 크기가 바뀌면(줄이 늘거나 창 폭이 바뀌면) 다시 잰다.
// 돌려주는 콜백을 상자의 ref 로 준다(다른 ref 와 합칠 때는 useMergedRefs).

const SLACK = 1; // 소수점 픽셀(확대 · 고해상도 화면)에서 끝에 닿았는데도 1px 덜 간 것으로 읽히는 것을 끝으로 친다

export function useScrollEdges<T extends HTMLElement = HTMLElement>() {
  return useCallback((element: T | null) => {
    if (!element) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const {
        scrollTop,
        scrollLeft,
        scrollHeight,
        scrollWidth,
        clientHeight,
        clientWidth,
      } = element;
      const left = Math.abs(scrollLeft); // 오른쪽에서 왼쪽으로 쓰는 문서는 음수
      element.toggleAttribute("data-overflow-top", scrollTop > SLACK);
      element.toggleAttribute(
        "data-overflow-bottom",
        scrollTop < scrollHeight - clientHeight - SLACK,
      );
      element.toggleAttribute("data-overflow-left", left > SLACK);
      element.toggleAttribute(
        "data-overflow-right",
        left < scrollWidth - clientWidth - SLACK,
      );
      element.style.setProperty("--scrollport-width", `${clientWidth}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    element.addEventListener("scroll", schedule, { passive: true });
    // 상자와 그 안의 것(표)의 크기 — 줄이 늘거나 칸이 넓어지면 넘치는지가 바뀐다
    const observer =
      typeof ResizeObserver === "function"
        ? new ResizeObserver(schedule)
        : null;
    observer?.observe(element);
    for (const child of element.children) observer?.observe(child);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      element.removeEventListener("scroll", schedule);
      observer?.disconnect();
    };
  }, []);
}
