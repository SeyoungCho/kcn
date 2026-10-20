import type {
  TooltipContentProps,
  TooltipProps,
} from "@repo/t-flavored/ui/tooltip";

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
   * @default "default"
   */
  size?: TooltipContentProps["size"];
  /** Side of the trigger the bubble opens on. Flips when there is no room.
   * @default "bottom"
   */
  side?: TooltipContentProps["side"];
  /** Gap between the trigger and the bubble in px, tail included. A bit smaller for `sm`.
   * @default 24
   */
  sideOffset?: TooltipContentProps["sideOffset"];
  /** @default "center" */
  align?: TooltipContentProps["align"];
  /** @default 0 */
  alignOffset?: TooltipContentProps["alignOffset"];
  /** Minimum distance between the tail and the bubble's edges in px.
   * @default 16
   */
  arrowPadding?: TooltipContentProps["arrowPadding"];
};

export type MDXTooltipContentPropsKO = {
  /** 말풍선 크기예요.
   * @default "default"
   */
  size?: TooltipContentProps["size"];
  /** 트리거의 어느 쪽에 띄울지 정해요. 자리가 모자라면 반대쪽으로 뒤집혀요.
   * @default "bottom"
   */
  side?: TooltipContentProps["side"];
  /** 트리거와 말풍선 사이 간격(px, 꼬리 포함)이에요. `sm` 은 조금 더 좁아요.
   * @default 24
   */
  sideOffset?: TooltipContentProps["sideOffset"];
  /** @default "center" */
  align?: TooltipContentProps["align"];
  /** @default 0 */
  alignOffset?: TooltipContentProps["alignOffset"];
  /** 꼬리가 말풍선 가장자리에서 떨어질 최소 거리(px)예요.
   * @default 16
   */
  arrowPadding?: TooltipContentProps["arrowPadding"];
};
