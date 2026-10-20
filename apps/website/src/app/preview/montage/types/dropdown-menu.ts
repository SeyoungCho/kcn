import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuProps,
  DropdownMenuRadioItemProps,
} from "@repo/montage/ui/dropdown-menu";

export type MDXDropdownMenuProps = {
  /** Whether the menu is open. Use with `onOpenChange` to control it. */
  open?: DropdownMenuProps["open"];
  /** Whether the menu starts open when uncontrolled.
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
  /** 열렸는지 여부예요. `onOpenChange` 와 함께 써서 제어해요. */
  open?: DropdownMenuProps["open"];
  /** 제어하지 않을 때 처음에 열어 둘지 정해요.
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
   * @default "center"
   */
  align?: DropdownMenuContentProps["align"];
  /** Gap between the trigger and the menu in px.
   * @default 10
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
   * @default "center"
   */
  align?: DropdownMenuContentProps["align"];
  /** 트리거와 메뉴 사이 간격(px)이에요.
   * @default 10
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
  /** Indents the label to line up with items that have a leading icon.
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
  /** 앞에 아이콘이 있는 항목과 글자 시작을 맞춰요.
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
  /** How the checked state shows. `checkbox` puts a checkbox in front of the label.
   * @default "default"
   */
  variant?: DropdownMenuCheckboxItemProps["variant"];
  /** Whether the item is checked. Use with `onCheckedChange` to control it. */
  checked?: DropdownMenuCheckboxItemProps["checked"];
  /** Whether the item starts checked when uncontrolled.
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
  /** 체크 상태를 보여 주는 방법이에요. `checkbox` 는 글자 앞에 체크박스를 둬요.
   * @default "default"
   */
  variant?: DropdownMenuCheckboxItemProps["variant"];
  /** 체크됐는지 여부예요. `onCheckedChange` 와 함께 써서 제어해요. */
  checked?: DropdownMenuCheckboxItemProps["checked"];
  /** 제어하지 않을 때 처음에 체크해 둘지 정해요.
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

export type MDXDropdownMenuRadioItemProps = {
  /** How the selected state shows. `radio` puts a radio in front of the label.
   * @default "default"
   */
  variant?: DropdownMenuRadioItemProps["variant"];
  /** Value the item selects in `DropdownMenuRadioGroup`. */
  value: DropdownMenuRadioItemProps["value"];
  /** Closes the menu when the item is clicked.
   * @default false
   */
  closeOnClick?: DropdownMenuRadioItemProps["closeOnClick"];
  /** @default false */
  disabled?: DropdownMenuRadioItemProps["disabled"];
};

export type MDXDropdownMenuRadioItemPropsKO = {
  /** 고른 상태를 보여 주는 방법이에요. `radio` 는 글자 앞에 라디오를 둬요.
   * @default "default"
   */
  variant?: DropdownMenuRadioItemProps["variant"];
  /** `DropdownMenuRadioGroup` 에서 이 항목이 고르는 값이에요. */
  value: DropdownMenuRadioItemProps["value"];
  /** 누르면 메뉴를 닫아요.
   * @default false
   */
  closeOnClick?: DropdownMenuRadioItemProps["closeOnClick"];
  /** @default false */
  disabled?: DropdownMenuRadioItemProps["disabled"];
};
