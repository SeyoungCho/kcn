import * as React from "react";

// 닫히는 동안의 내용 — 창 · 확인 창 · 시트 · 패널은 닫힐 때 움직임(사라지기)이 끝나야 떼어진다. 그 사이에 화면이 열림 상태를
// 지우면(고른 줄을 null 로 · 닫힌 창의 조회를 멈춤) 내용이 먼저 비어, 창이 머리만 남은 채 높이가 뚝 줄었다가 사라진다.
// 그래서 Root 가 열림 상태를 알리고(통제 · 비통제 모두), Content 는 닫히는 동안 마지막으로 열려 있던 때의 내용을 그대로 그린다.

/** 가장 가까운 Root 의 열림 상태 — 창 안에 창을 열어도 Content 는 제 Root 의 값을 읽는다 */
export const OverlayOpenContext = React.createContext(true);

/** Root 의 열림 상태 — 통제(open)면 그 값, 아니면 안에서 들고 있는 값(defaultOpen 에서 시작해 onOpenChange 로 바뀐다) */
export function useOverlayOpen(open: boolean | undefined, defaultOpen = false) {
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  return [open ?? innerOpen, setInnerOpen] as const;
}

/** 열려 있으면 받은 값을, 닫히는 동안에는 마지막으로 열려 있던 때의 값을 돌려준다 */
export function useRetainedWhileClosed<T>(value: T): T {
  const open = React.useContext(OverlayOpenContext);
  const last = React.useRef(value);
  // 그리는 중에 적는다 — 닫히는 첫 그림부터 마지막 내용이어야 한다(효과에서 적으면 한 번은 빈 내용이 그려진다)
  if (open) last.current = value;
  return open ? value : last.current;
}
