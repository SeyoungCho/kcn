import type {
  PopoverContentProps,
  PopoverProps,
} from "@repo/montage/ui/popover";

export type MDXPopoverProps = {
  /** Whether the popover is open. Use with `onOpenChange` to control it. */
  open?: PopoverProps["open"];
  /** Whether the popover starts open when uncontrolled.
   * @default false
   */
  defaultOpen?: PopoverProps["defaultOpen"];
  /** Called when the popover opens or closes. */
  onOpenChange?: PopoverProps["onOpenChange"];
  /** Locks page scroll and outside pointer interaction while open.
   * @default false
   */
  modal?: PopoverProps["modal"];
};

export type MDXPopoverPropsKO = {
  /** 열렸는지 여부예요. `onOpenChange` 와 함께 써서 제어해요. */
  open?: PopoverProps["open"];
  /** 제어하지 않을 때 처음에 열어 둘지 정해요.
   * @default false
   */
  defaultOpen?: PopoverProps["defaultOpen"];
  /** 열리거나 닫힐 때 불려요. */
  onOpenChange?: PopoverProps["onOpenChange"];
  /** 열려 있는 동안 페이지 스크롤과 바깥 누르기를 막아요.
   * @default false
   */
  modal?: PopoverProps["modal"];
};

export type MDXPopoverContentProps = {
  /** Shows a close button in the top-right corner. Use it with `PopoverHeader`.
   * @default false
   */
  showCloseButton?: PopoverContentProps["showCloseButton"];
  /** Side of the trigger the popover opens on. Flips when there is no room.
   * @default "bottom"
   */
  side?: PopoverContentProps["side"];
  /** Alignment against the trigger.
   * @default "center"
   */
  align?: PopoverContentProps["align"];
  /** Gap between the trigger and the popover in px.
   * @default 10
   */
  sideOffset?: PopoverContentProps["sideOffset"];
  /** Offset along the alignment axis in px.
   * @default 0
   */
  alignOffset?: PopoverContentProps["alignOffset"];
};

export type MDXPopoverContentPropsKO = {
  /** 오른쪽 위에 닫기 버튼을 보여 줘요. `PopoverHeader` 와 함께 써요.
   * @default false
   */
  showCloseButton?: PopoverContentProps["showCloseButton"];
  /** 트리거의 어느 쪽에 열지 정해요. 자리가 모자라면 반대쪽으로 뒤집혀요.
   * @default "bottom"
   */
  side?: PopoverContentProps["side"];
  /** 트리거에 맞추는 방법이에요.
   * @default "center"
   */
  align?: PopoverContentProps["align"];
  /** 트리거와 팝오버 사이 간격(px)이에요.
   * @default 10
   */
  sideOffset?: PopoverContentProps["sideOffset"];
  /** 맞춤 방향으로 옮기는 거리(px)예요.
   * @default 0
   */
  alignOffset?: PopoverContentProps["alignOffset"];
};
