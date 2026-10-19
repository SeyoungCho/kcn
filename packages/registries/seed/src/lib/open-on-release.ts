import type * as React from "react";
import type { BaseUIEvent } from "@base-ui/react/types";

/**
 * 트리거를 누를 때가 아니라 뗄 때 열리게 한다(SEED 와 같다).
 *
 * Base UI 의 Menu · Select 는 누르는 순간(mousedown) 연다 — 누른 채 끌어 항목 위에서 떼면 고르게 하려는 것이다.
 * 누를 때의 Base UI 처리를 건너뛰면(`preventBaseUIHandler`) 뗄 때의 click 으로 열고 닫는다. 키보드 · 터치는 그대로다.
 *
 *   <Menu.Trigger {...openOnRelease(props)} />
 */
export function openOnRelease<Props extends PressProps>(props: Props): Props {
  return {
    ...props,
    onPointerDown(event) {
      props.onPointerDown?.(event);
      event.preventBaseUIHandler();
    },
    onMouseDown(event) {
      props.onMouseDown?.(event);
      event.preventBaseUIHandler();
    },
  };
}

interface PressProps {
  onPointerDown?: (
    event: BaseUIEvent<React.PointerEvent<HTMLButtonElement>>,
  ) => void;
  onMouseDown?: (
    event: BaseUIEvent<React.MouseEvent<HTMLButtonElement>>,
  ) => void;
}
