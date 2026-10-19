import type {
  HelpBubbleRootProps,
  HelpBubbleTooltipTriggerProps,
} from "@repo/seed/ui/help-bubble";

export type MDXHelpBubbleProps = Pick<
  HelpBubbleRootProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** Where the bubble opens relative to the trigger. It flips to the opposite side when there isn't room.
   * @default "top"
   */
  placement?: HelpBubbleRootProps["placement"];
  /** Gap between the arrow tip and the trigger, in px.
   * @default 4
   */
  gutter?: HelpBubbleRootProps["gutter"];
  /** Minimum gap from the viewport edges, in px.
   * @default 16
   */
  overflowPadding?: HelpBubbleRootProps["overflowPadding"];
  /** Minimum distance between the arrow and the bubble's corners, in px.
   * @default 14
   */
  arrowPadding?: HelpBubbleRootProps["arrowPadding"];
  /** CSS positioning strategy.
   * @default "absolute"
   */
  strategy?: HelpBubbleRootProps["strategy"];
  /** Moves focus into the bubble when it opens. Off by default so a bubble that opens with the page doesn't steal focus.
   * @default false
   */
  autoFocus?: HelpBubbleRootProps["autoFocus"];
};

export type MDXHelpBubblePropsKO = Pick<
  HelpBubbleRootProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** 트리거를 기준으로 뜨는 자리. 자리가 모자라면 맞은편으로 뒤집습니다.
   * @default "top"
   */
  placement?: HelpBubbleRootProps["placement"];
  /** 화살촉 끝과 트리거의 간격(px).
   * @default 4
   */
  gutter?: HelpBubbleRootProps["gutter"];
  /** 화면 가장자리와 띄울 간격(px).
   * @default 16
   */
  overflowPadding?: HelpBubbleRootProps["overflowPadding"];
  /** 화살촉이 말풍선 모서리에서 떨어져 있을 가장 작은 거리(px).
   * @default 14
   */
  arrowPadding?: HelpBubbleRootProps["arrowPadding"];
  /** CSS 자리 잡기 방식.
   * @default "absolute"
   */
  strategy?: HelpBubbleRootProps["strategy"];
  /** 열릴 때 초점을 말풍선으로 옮깁니다. 화면과 함께 뜨는 말풍선이 초점을 가져가지 않게 기본은 옮기지 않습니다.
   * @default false
   */
  autoFocus?: HelpBubbleRootProps["autoFocus"];
};

export type MDXHelpBubbleTooltipTriggerProps = Pick<
  HelpBubbleTooltipTriggerProps,
  "placement" | "open" | "defaultOpen" | "onOpenChange"
> & {
  /** Title of the bubble. */
  title: HelpBubbleTooltipTriggerProps["title"];
  /** Text under the title. */
  description?: HelpBubbleTooltipTriggerProps["description"];
  /** The element that shows the bubble. It is used as the anchor as-is, without a wrapper. */
  children: HelpBubbleTooltipTriggerProps["children"];
  /** Delay before opening after hover, in ms.
   * @default 200
   */
  openDelay?: HelpBubbleTooltipTriggerProps["openDelay"];
  /** Delay before closing after the pointer leaves, in ms.
   * @default 100
   */
  closeDelay?: HelpBubbleTooltipTriggerProps["closeDelay"];
  /** Keeps the bubble open while the pointer is over it.
   * @default false
   */
  keepOpenOnContentHover?: HelpBubbleTooltipTriggerProps["keepOpenOnContentHover"];
};

export type MDXHelpBubbleTooltipTriggerPropsKO = Pick<
  HelpBubbleTooltipTriggerProps,
  "placement" | "open" | "defaultOpen" | "onOpenChange"
> & {
  /** 말풍선의 제목. */
  title: HelpBubbleTooltipTriggerProps["title"];
  /** 제목 아래의 글. */
  description?: HelpBubbleTooltipTriggerProps["description"];
  /** 말풍선을 띄울 요소. 감싸는 요소 없이 이 요소가 그대로 기준이 됩니다. */
  children: HelpBubbleTooltipTriggerProps["children"];
  /** 올린 뒤 뜨기까지의 시간(ms).
   * @default 200
   */
  openDelay?: HelpBubbleTooltipTriggerProps["openDelay"];
  /** 벗어난 뒤 닫히기까지의 시간(ms).
   * @default 100
   */
  closeDelay?: HelpBubbleTooltipTriggerProps["closeDelay"];
  /** 말풍선 위에 마우스를 올려 두면 계속 떠 있습니다.
   * @default false
   */
  keepOpenOnContentHover?: HelpBubbleTooltipTriggerProps["keepOpenOnContentHover"];
};
