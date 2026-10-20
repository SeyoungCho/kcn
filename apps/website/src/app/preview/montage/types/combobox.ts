import type {
  ComboboxChipProps,
  ComboboxChipsProps,
  ComboboxContentProps,
  ComboboxInputProps,
  ComboboxItemProps,
  ComboboxProps,
} from "@repo/montage/ui/combobox";

type RootProps = ComboboxProps<unknown, boolean>;

export type MDXComboboxProps = {
  /** Items to filter and list. Pass an array, or groups with an `items` array. */
  items?: RootProps["items"];
  /** Controlled selected value. Pair it with `onValueChange`. */
  value?: RootProps["value"];
  /** Initial selected value when uncontrolled. */
  defaultValue?: RootProps["defaultValue"];
  /** Called when the selected value changes. */
  onValueChange?: RootProps["onValueChange"];
  /** Lets the user pick several items. The value becomes an array.
   * @default false
   */
  multiple?: RootProps["multiple"];
  /** Turns an item into the text shown in the input and used for filtering. Not needed for `{ value, label }` items. */
  itemToStringLabel?: RootProps["itemToStringLabel"];
  /** Compares an item with the value. Use it when item objects are recreated between renders. */
  isItemEqualToValue?: RootProps["isItemEqualToValue"];
  /** Controlled open state. Pair it with `onOpenChange`. */
  open?: RootProps["open"];
  /** Called when the list opens or closes. */
  onOpenChange?: RootProps["onOpenChange"];
  /** @default false */
  disabled?: RootProps["disabled"];
};

export type MDXComboboxPropsKO = {
  /** 걸러서 보여 줄 항목이에요. 배열, 또는 `items` 배열을 가진 묶음을 줘요. */
  items?: RootProps["items"];
  /** 고른 값을 바깥에서 정해요. `onValueChange` 와 함께 써요. */
  value?: RootProps["value"];
  /** 바깥에서 정하지 않을 때의 처음 값이에요. */
  defaultValue?: RootProps["defaultValue"];
  /** 고른 값이 바뀔 때 불려요. */
  onValueChange?: RootProps["onValueChange"];
  /** 여러 개를 고를 수 있어요. 값이 배열이 돼요.
   * @default false
   */
  multiple?: RootProps["multiple"];
  /** 항목을 입력 칸에 보일 글 · 거를 때 견줄 글로 바꿔요. `{ value, label }` 항목에는 없어도 돼요. */
  itemToStringLabel?: RootProps["itemToStringLabel"];
  /** 항목과 값을 견줘요. 그릴 때마다 항목 객체가 새로 만들어지면 써요. */
  isItemEqualToValue?: RootProps["isItemEqualToValue"];
  /** 열림 상태를 바깥에서 정해요. `onOpenChange` 와 함께 써요. */
  open?: RootProps["open"];
  /** 목록이 열리거나 닫힐 때 불려요. */
  onOpenChange?: RootProps["onOpenChange"];
  /** @default false */
  disabled?: RootProps["disabled"];
};

export type MDXComboboxInputProps = {
  /** Height of the field.
   * @default "default"
   */
  size?: ComboboxInputProps["size"];
  /** Shows the arrow button that opens and closes the list.
   * @default true
   */
  showTrigger?: ComboboxInputProps["showTrigger"];
  /** Shows a clear button while there is a value.
   * @default false
   */
  showClear?: ComboboxInputProps["showClear"];
  /** Draws a red border to mark the value as invalid. */
  "aria-invalid"?: ComboboxInputProps["aria-invalid"];
  /** @default false */
  disabled?: ComboboxInputProps["disabled"];
};

export type MDXComboboxInputPropsKO = {
  /** 입력 칸의 높이예요.
   * @default "default"
   */
  size?: ComboboxInputProps["size"];
  /** 목록을 여닫는 화살표 버튼을 보여 줘요.
   * @default true
   */
  showTrigger?: ComboboxInputProps["showTrigger"];
  /** 값이 있는 동안 지우기 버튼을 보여 줘요.
   * @default false
   */
  showClear?: ComboboxInputProps["showClear"];
  /** 값이 잘못됐다는 뜻으로 빨간 테두리를 그려요. */
  "aria-invalid"?: ComboboxInputProps["aria-invalid"];
  /** @default false */
  disabled?: ComboboxInputProps["disabled"];
};

export type MDXComboboxContentProps = {
  /** Side of the input the list opens on. Flips when there is no room.
   * @default "bottom"
   */
  side?: ComboboxContentProps["side"];
  /** Gap between the input and the list in px.
   * @default 8
   */
  sideOffset?: ComboboxContentProps["sideOffset"];
  /** Alignment against the input.
   * @default "center"
   */
  align?: ComboboxContentProps["align"];
  /** Element to open against. Pass the `useComboboxAnchor()` ref used on `ComboboxChips`. */
  anchor?: ComboboxContentProps["anchor"];
};

export type MDXComboboxContentPropsKO = {
  /** 입력 칸의 어느 쪽에 열지 정해요. 자리가 모자라면 반대쪽으로 뒤집혀요.
   * @default "bottom"
   */
  side?: ComboboxContentProps["side"];
  /** 입력 칸과 목록 사이 간격(px)이에요.
   * @default 8
   */
  sideOffset?: ComboboxContentProps["sideOffset"];
  /** 입력 칸에 맞추는 방법이에요.
   * @default "center"
   */
  align?: ComboboxContentProps["align"];
  /** 목록을 맞춰 열 요소예요. `ComboboxChips` 에 준 `useComboboxAnchor()` ref 를 넘겨요. */
  anchor?: ComboboxContentProps["anchor"];
};

export type MDXComboboxItemProps = {
  /** Value this item selects. */
  value?: ComboboxItemProps["value"];
  /** How the selection is shown: a check on the right, or a checkbox on the left.
   * @default "default"
   */
  variant?: ComboboxItemProps["variant"];
  /** @default false */
  disabled?: ComboboxItemProps["disabled"];
};

export type MDXComboboxItemPropsKO = {
  /** 이 항목을 고르면 들어가는 값이에요. */
  value?: ComboboxItemProps["value"];
  /** 고른 표시예요. 오른쪽 체크, 또는 왼쪽 체크박스예요.
   * @default "default"
   */
  variant?: ComboboxItemProps["variant"];
  /** @default false */
  disabled?: ComboboxItemProps["disabled"];
};

export type MDXComboboxChipsProps = {
  /** Height of the field and its chips' spacing.
   * @default "default"
   */
  size?: ComboboxChipsProps["size"];
};

export type MDXComboboxChipsPropsKO = {
  /** 입력 칸의 높이와 칩 사이 간격이에요.
   * @default "default"
   */
  size?: ComboboxChipsProps["size"];
};

export type MDXComboboxChipProps = {
  /** Shows an × and removes the chip when it is pressed.
   * @default true
   */
  showRemove?: ComboboxChipProps["showRemove"];
};

export type MDXComboboxChipPropsKO = {
  /** × 를 보여 주고, 칩을 누르면 빼요.
   * @default true
   */
  showRemove?: ComboboxChipProps["showRemove"];
};
