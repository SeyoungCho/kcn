import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuProps,
} from "@repo/t-flavored/ui/dropdown-menu";

export type MDXDropdownMenuProps = {
  /** Controlled open state. Pair it with `onOpenChange`. */
  open?: DropdownMenuProps["open"];
  /** Initial open state when uncontrolled.
   * @default false
   */
  defaultOpen?: DropdownMenuProps["defaultOpen"];
  /** Called when the menu opens or closes. */
  onOpenChange?: DropdownMenuProps["onOpenChange"];
  /** Locks page scroll and outside pointer interaction while open.
   * @default true
   */
  modal?: DropdownMenuProps["modal"];
};

export type MDXDropdownMenuPropsKO = {
  /** 열림 상태를 바깥에서 정해요. `onOpenChange` 와 함께 써요. */
  open?: DropdownMenuProps["open"];
  /** 바깥에서 정하지 않을 때의 처음 열림 상태예요.
   * @default false
   */
  defaultOpen?: DropdownMenuProps["defaultOpen"];
  /** 메뉴가 열리거나 닫힐 때 불려요. */
  onOpenChange?: DropdownMenuProps["onOpenChange"];
  /** 열려 있는 동안 페이지 스크롤과 바깥 누르기를 막아요.
   * @default true
   */
  modal?: DropdownMenuProps["modal"];
};

export type MDXDropdownMenuContentProps = {
  /** Side of the trigger the menu opens on. Flips when there is no room.
   * @default "bottom"
   */
  side?: DropdownMenuContentProps["side"];
  /** Alignment against the trigger.
   * @default "start"
   */
  align?: DropdownMenuContentProps["align"];
  /** Gap between the trigger and the menu in px.
   * @default 0
   */
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  /** Offset along the alignment axis in px.
   * @default 0
   */
  alignOffset?: DropdownMenuContentProps["alignOffset"];
};

export type MDXDropdownMenuContentPropsKO = {
  /** 트리거의 어느 쪽에 열지 정해요. 자리가 모자라면 반대쪽으로 뒤집혀요.
   * @default "bottom"
   */
  side?: DropdownMenuContentProps["side"];
  /** 트리거에 맞추는 방법이에요.
   * @default "start"
   */
  align?: DropdownMenuContentProps["align"];
  /** 트리거와 메뉴 사이 간격(px)이에요.
   * @default 0
   */
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  /** 맞춤 방향으로 옮기는 거리(px)예요.
   * @default 0
   */
  alignOffset?: DropdownMenuContentProps["alignOffset"];
};

export type MDXDropdownMenuItemProps = {
  /** `destructive` paints the label red.
   * @default "default"
   */
  variant?: DropdownMenuItemProps["variant"];
  /** Indents the label to line up with checkbox and radio items.
   * @default false
   */
  inset?: DropdownMenuItemProps["inset"];
  /** Closes the menu when the item is clicked.
   * @default true
   */
  closeOnClick?: DropdownMenuItemProps["closeOnClick"];
  /** @default false */
  disabled?: DropdownMenuItemProps["disabled"];
  onClick?: DropdownMenuItemProps["onClick"];
};

export type MDXDropdownMenuItemPropsKO = {
  /** `destructive` 는 글자를 빨갛게 칠해요.
   * @default "default"
   */
  variant?: DropdownMenuItemProps["variant"];
  /** 체크 · 라디오 항목과 글자 시작을 맞춰요.
   * @default false
   */
  inset?: DropdownMenuItemProps["inset"];
  /** 누르면 메뉴를 닫아요.
   * @default true
   */
  closeOnClick?: DropdownMenuItemProps["closeOnClick"];
  /** @default false */
  disabled?: DropdownMenuItemProps["disabled"];
  onClick?: DropdownMenuItemProps["onClick"];
};

export type MDXDropdownMenuCheckboxItemProps = {
  /** Controlled checked state. */
  checked?: DropdownMenuCheckboxItemProps["checked"];
  /** Initial checked state when uncontrolled.
   * @default false
   */
  defaultChecked?: DropdownMenuCheckboxItemProps["defaultChecked"];
  /** Called when the checked state changes. */
  onCheckedChange?: DropdownMenuCheckboxItemProps["onCheckedChange"];
  /** Closes the menu when the item is clicked.
   * @default false
   */
  closeOnClick?: DropdownMenuCheckboxItemProps["closeOnClick"];
};

export type MDXDropdownMenuCheckboxItemPropsKO = {
  /** 체크 상태를 바깥에서 정해요. */
  checked?: DropdownMenuCheckboxItemProps["checked"];
  /** 바깥에서 정하지 않을 때의 처음 체크 상태예요.
   * @default false
   */
  defaultChecked?: DropdownMenuCheckboxItemProps["defaultChecked"];
  /** 체크 상태가 바뀔 때 불려요. */
  onCheckedChange?: DropdownMenuCheckboxItemProps["onCheckedChange"];
  /** 누르면 메뉴를 닫아요.
   * @default false
   */
  closeOnClick?: DropdownMenuCheckboxItemProps["closeOnClick"];
};
