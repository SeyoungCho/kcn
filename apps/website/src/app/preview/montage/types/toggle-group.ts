import type {
  ToggleGroupItemProps,
  ToggleGroupProps,
} from "@repo/montage/ui/toggle-group";

export type MDXToggleGroupProps = {
  /** Visual style passed to every item.
   * @default "default"
   */
  variant?: ToggleGroupProps["variant"];
  /** Size passed to every item. The gap between items grows with it.
   * @default "default"
   */
  size?: ToggleGroupProps["size"];
  /** Values of the pressed items (controlled). Use with `onValueChange`. */
  value?: ToggleGroupProps["value"];
  /** Values of the initially pressed items (uncontrolled). */
  defaultValue?: ToggleGroupProps["defaultValue"];
  /** Called when an item is pressed or released. */
  onValueChange?: ToggleGroupProps["onValueChange"];
  /** Lets more than one item be pressed at once.
   * @default false
   */
  multiple?: ToggleGroupProps["multiple"];
  /** @default "horizontal" */
  orientation?: ToggleGroupProps["orientation"];
  /** Disables every item in the group.
   * @default false
   */
  disabled?: ToggleGroupProps["disabled"];
};

export type MDXToggleGroupPropsKO = {
  /** 모든 항목에 주는 모양.
   * @default "default"
   */
  variant?: ToggleGroupProps["variant"];
  /** 모든 항목에 주는 크기. 크기를 따라 사이 간격도 커져요.
   * @default "default"
   */
  size?: ToggleGroupProps["size"];
  /** 눌린 항목들의 값(외부에서 관리). `onValueChange` 와 같이 써요. */
  value?: ToggleGroupProps["value"];
  /** 처음 눌린 항목들의 값(내부에서 관리). */
  defaultValue?: ToggleGroupProps["defaultValue"];
  /** 항목을 누르거나 풀 때 불려요. */
  onValueChange?: ToggleGroupProps["onValueChange"];
  /** 여러 항목을 함께 누를 수 있게 해요.
   * @default false
   */
  multiple?: ToggleGroupProps["multiple"];
  /** @default "horizontal" */
  orientation?: ToggleGroupProps["orientation"];
  /** 모든 항목을 누를 수 없게 해요.
   * @default false
   */
  disabled?: ToggleGroupProps["disabled"];
};

export type MDXToggleGroupItemProps = {
  /** Value this item adds to the group's value when pressed. */
  value: ToggleGroupItemProps["value"];
  /** Overrides the group's `variant` for this item. */
  variant?: ToggleGroupItemProps["variant"];
  /** Overrides the group's `size` for this item. */
  size?: ToggleGroupItemProps["size"];
  /** @default false */
  disabled?: ToggleGroupItemProps["disabled"];
};

export type MDXToggleGroupItemPropsKO = {
  /** 눌렸을 때 그룹 값에 들어가는 이 항목의 값이에요. */
  value: ToggleGroupItemProps["value"];
  /** 이 항목만 그룹과 다른 모양으로 그려요. */
  variant?: ToggleGroupItemProps["variant"];
  /** 이 항목만 그룹과 다른 크기로 그려요. */
  size?: ToggleGroupItemProps["size"];
  /** @default false */
  disabled?: ToggleGroupItemProps["disabled"];
};
