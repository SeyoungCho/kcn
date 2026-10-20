import type {
  TooltipContentProps,
  TooltipProps,
  TooltipProviderProps,
} from "@repo/montage/ui/tooltip";

export type MDXTooltipProviderProps = {
  /** Wait before opening on hover, in ms.
   * @default 200
   */
  delay?: TooltipProviderProps["delay"];
  /** Wait before closing after the pointer leaves, in ms.
   * @default 250
   */
  closeDelay?: TooltipProviderProps["closeDelay"];
  /** Another tooltip opens right away if the previous one closed within this time, in ms.
   * @default 350
   */
  timeout?: TooltipProviderProps["timeout"];
};

export type MDXTooltipProviderPropsKO = {
  /** 마우스를 올린 뒤 열리기까지 기다리는 시간(ms)이에요.
   * @default 200
   */
  delay?: TooltipProviderProps["delay"];
  /** 마우스가 떠난 뒤 닫히기까지 기다리는 시간(ms)이에요.
   * @default 250
   */
  closeDelay?: TooltipProviderProps["closeDelay"];
  /** 앞의 툴팁이 이 시간 안에 닫혔으면 다음 툴팁은 기다리지 않고 열려요(ms).
   * @default 350
   */
  timeout?: TooltipProviderProps["timeout"];
};

export type MDXTooltipProps = {
  /** Controlled open state. Without `onOpenChange` the tooltip only follows this value. */
  open?: TooltipProps["open"];
  /** Initial open state when uncontrolled.
   * @default false
   */
  defaultOpen?: TooltipProps["defaultOpen"];
  /** Called on hover, focus, trigger press, outside press and Escape. */
  onOpenChange?: TooltipProps["onOpenChange"];
  /** @default false */
  disabled?: TooltipProps["disabled"];
};

export type MDXTooltipPropsKO = {
  /** 열림 상태를 바깥에서 정해요. `onOpenChange` 가 없으면 이 값만 따라요. */
  open?: TooltipProps["open"];
  /** 바깥에서 정하지 않을 때의 처음 열림 상태예요.
   * @default false
   */
  defaultOpen?: TooltipProps["defaultOpen"];
  /** 마우스 올리기 · 포커스 · 트리거 누르기 · 바깥 누르기 · Esc 에 불려요. */
  onOpenChange?: TooltipProps["onOpenChange"];
  /** @default false */
  disabled?: TooltipProps["disabled"];
};

export type MDXTooltipContentProps = {
  /** Bubble size.
   * @remarks `"sm" | "default"`
   * @default "default"
   */
  size?: TooltipContentProps["size"];
  /** Side of the trigger the bubble opens on. Flips when there is no room.
   * @remarks `"top" | "bottom" | "left" | "right"`
   * @default "top"
   */
  side?: TooltipContentProps["side"];
  /** Gap between the trigger and the bubble in px, tail included. A bit smaller for `sm`.
   * @default 12
   */
  sideOffset?: TooltipContentProps["sideOffset"];
  /** @default "center" */
  align?: TooltipContentProps["align"];
  /** @default 0 */
  alignOffset?: TooltipContentProps["alignOffset"];
};

export type MDXTooltipContentPropsKO = {
  /** 말풍선 크기예요.
   * @remarks `"sm" | "default"`
   * @default "default"
   */
  size?: TooltipContentProps["size"];
  /** 트리거의 어느 쪽에 띄울지 정해요. 자리가 모자라면 반대쪽으로 뒤집혀요.
   * @remarks `"top" | "bottom" | "left" | "right"`
   * @default "top"
   */
  side?: TooltipContentProps["side"];
  /** 트리거와 말풍선 사이 거리(px)로, 꼬리를 포함해요. `sm` 은 조금 작아요.
   * @default 12
   */
  sideOffset?: TooltipContentProps["sideOffset"];
  /** @default "center" */
  align?: TooltipContentProps["align"];
  /** @default 0 */
  alignOffset?: TooltipContentProps["alignOffset"];
};
