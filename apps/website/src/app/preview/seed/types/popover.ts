import type {
  PopoverContentProps,
  PopoverRootProps,
} from "@repo/seed/ui/popover";

export type MDXPopoverProps = Pick<
  PopoverRootProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** Where the popover opens relative to the trigger. It flips to the opposite side when there isn't room.
   * @default "bottom"
   */
  placement?: PopoverRootProps["placement"];
  /** Gap between the trigger and the popover, in px.
   * @default 8
   */
  gutter?: PopoverRootProps["gutter"];
  /** Minimum gap from the viewport edges, in px.
   * @default 16
   */
  overflowPadding?: PopoverRootProps["overflowPadding"];
  /** CSS positioning strategy.
   * @default "absolute"
   */
  strategy?: PopoverRootProps["strategy"];
  /** Moves focus into the popover when it opens.
   * @default true
   */
  autoFocus?: PopoverRootProps["autoFocus"];
};

export type MDXPopoverPropsKO = Pick<
  PopoverRootProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** 트리거를 기준으로 뜨는 자리. 자리가 모자라면 맞은편으로 뒤집습니다.
   * @default "bottom"
   */
  placement?: PopoverRootProps["placement"];
  /** 트리거와의 간격(px).
   * @default 8
   */
  gutter?: PopoverRootProps["gutter"];
  /** 화면 가장자리와 띄울 간격(px).
   * @default 16
   */
  overflowPadding?: PopoverRootProps["overflowPadding"];
  /** CSS 자리 잡기 방식.
   * @default "absolute"
   */
  strategy?: PopoverRootProps["strategy"];
  /** 열릴 때 초점을 창으로 옮깁니다.
   * @default true
   */
  autoFocus?: PopoverRootProps["autoFocus"];
};

export type MDXPopoverContentProps = {
  /** Title in the header. */
  title?: PopoverContentProps["title"];
  /** Description under the title. */
  description?: PopoverContentProps["description"];
  /** Shows the close button in the top-right corner.
   * @default true
   */
  showCloseButton?: PopoverContentProps["showCloseButton"];
  /** Element to anchor the popover to. Defaults to the trigger — use it when something else opens the popover. */
  anchor?: PopoverContentProps["anchor"];
  /** Where to render the popover. Defaults to `body`. */
  positionerContainer?: PopoverContentProps["positionerContainer"];
};

export type MDXPopoverContentPropsKO = {
  /** 머리의 제목. */
  title?: PopoverContentProps["title"];
  /** 제목 아래의 설명. */
  description?: PopoverContentProps["description"];
  /** 오른쪽 위의 닫기 버튼을 보여 줍니다.
   * @default true
   */
  showCloseButton?: PopoverContentProps["showCloseButton"];
  /** 창을 붙일 요소. 안 주면 트리거입니다 — 트리거 없이 바깥에서 열고 닫을 때 씁니다. */
  anchor?: PopoverContentProps["anchor"];
  /** 창을 그려 넣을 곳. 안 주면 `body` 입니다. */
  positionerContainer?: PopoverContentProps["positionerContainer"];
};
