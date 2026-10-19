import type {
  SidePanelContentProps,
  SidePanelRootProps,
} from "@repo/seed/ui/side-panel";

export type MDXSidePanelProps = Pick<
  SidePanelRootProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** Width of the panel from 768px up — `small` 480px, `medium` 720px, `large` 960px. Narrower screens use 80% of the width.
   * @default "medium"
   */
  size?: SidePanelRootProps["size"];
  /** The edge the panel slides in from. Swiping toward that edge closes it.
   * @default "right"
   */
  direction?: SidePanelRootProps["direction"];
  /** Closes the panel when the user presses outside it.
   * @default true
   */
  closeOnInteractOutside?: SidePanelRootProps["closeOnInteractOutside"];
  /** Closes the panel with the Esc key.
   * @default true
   */
  closeOnEscape?: SidePanelRootProps["closeOnEscape"];
};

export type MDXSidePanelPropsKO = Pick<
  SidePanelRootProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** 768px 이상에서 패널의 폭 — `small` 480px · `medium` 720px · `large` 960px. 그보다 좁은 화면에서는 화면의 80% 입니다.
   * @default "medium"
   */
  size?: SidePanelRootProps["size"];
  /** 패널이 들어오는 쪽. 그쪽으로 끌면 닫힙니다.
   * @default "right"
   */
  direction?: SidePanelRootProps["direction"];
  /** 바깥을 누르면 닫습니다.
   * @default true
   */
  closeOnInteractOutside?: SidePanelRootProps["closeOnInteractOutside"];
  /** Esc 키로 닫습니다.
   * @default true
   */
  closeOnEscape?: SidePanelRootProps["closeOnEscape"];
};

export type MDXSidePanelContentProps = {
  /** Title in the header. Without a title, give the content an `aria-label`. */
  title?: SidePanelContentProps["title"];
  /** Description under the title. */
  description?: SidePanelContentProps["description"];
  /** Shows the close button in the top-right corner.
   * @default true
   */
  showCloseButton?: SidePanelContentProps["showCloseButton"];
  /** Stacking order when it overlaps other dialogs or sheets — higher is on top. */
  layerIndex?: SidePanelContentProps["layerIndex"];
};

export type MDXSidePanelContentPropsKO = {
  /** 머리의 제목. 제목이 없으면 `aria-label` 을 주세요. */
  title?: SidePanelContentProps["title"];
  /** 제목 아래의 설명. */
  description?: SidePanelContentProps["description"];
  /** 오른쪽 위의 닫기 버튼을 보여 줍니다.
   * @default true
   */
  showCloseButton?: SidePanelContentProps["showCloseButton"];
  /** 다른 창 · 시트와 겹칠 때의 순서 — 클수록 위에 놓입니다. */
  layerIndex?: SidePanelContentProps["layerIndex"];
};
