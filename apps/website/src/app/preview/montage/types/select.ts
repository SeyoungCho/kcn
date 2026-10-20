import type {
  SelectContentProps,
  SelectItemProps,
  SelectProps,
  SelectTriggerProps,
} from "@repo/montage/ui/select";

type RootProps = SelectProps<string, boolean>;

export type MDXSelectProps = {
  /** Labels for each value, so `SelectValue` shows the label instead of the raw value. */
  items?: RootProps["items"];
  /** Controlled value. Pair it with `onValueChange`.
   * @remarks `string | string[] | null`
   */
  value?: RootProps["value"];
  /** Initial value when uncontrolled.
   * @remarks `string | string[] | null`
   */
  defaultValue?: RootProps["defaultValue"];
  /** Called when the value changes. */
  onValueChange?: RootProps["onValueChange"];
  /** Lets the user pick several items. The value becomes an array.
   * @default false
   */
  multiple?: RootProps["multiple"];
  /** Controlled open state. Pair it with `onOpenChange`. */
  open?: RootProps["open"];
  /** Called when the list opens or closes. */
  onOpenChange?: RootProps["onOpenChange"];
  /** Field name used when the form is submitted. */
  name?: RootProps["name"];
  /** @default false */
  disabled?: RootProps["disabled"];
  /** @default false */
  required?: RootProps["required"];
};

export type MDXSelectPropsKO = {
  /** 값마다 보일 이름이에요. 주면 `SelectValue` 가 값 대신 이름을 보여 줘요. */
  items?: RootProps["items"];
  /** 값을 바깥에서 정해요. `onValueChange` 와 함께 써요.
   * @remarks `string | string[] | null`
   */
  value?: RootProps["value"];
  /** 바깥에서 정하지 않을 때의 처음 값이에요.
   * @remarks `string | string[] | null`
   */
  defaultValue?: RootProps["defaultValue"];
  /** 값이 바뀔 때 불려요. */
  onValueChange?: RootProps["onValueChange"];
  /** 여러 개를 고를 수 있어요. 값이 배열이 돼요.
   * @default false
   */
  multiple?: RootProps["multiple"];
  /** 열림 상태를 바깥에서 정해요. `onOpenChange` 와 함께 써요. */
  open?: RootProps["open"];
  /** 목록이 열리거나 닫힐 때 불려요. */
  onOpenChange?: RootProps["onOpenChange"];
  /** 폼을 보낼 때 쓰는 이름이에요. */
  name?: RootProps["name"];
  /** @default false */
  disabled?: RootProps["disabled"];
  /** @default false */
  required?: RootProps["required"];
};

export type MDXSelectTriggerProps = {
  /** Height of the field.
   * @default "default"
   */
  size?: SelectTriggerProps["size"];
  /** Draws a red border to mark the value as invalid. */
  "aria-invalid"?: SelectTriggerProps["aria-invalid"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — renders another element (similar to Radix `asChild`). */
  render?: SelectTriggerProps["render"];
};

export type MDXSelectTriggerPropsKO = {
  /** 입력 칸의 높이예요.
   * @default "default"
   */
  size?: SelectTriggerProps["size"];
  /** 값이 잘못됐다는 뜻으로 빨간 테두리를 그려요. */
  "aria-invalid"?: SelectTriggerProps["aria-invalid"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 다른 요소로 그려요(Radix 의 `asChild` 와 비슷해요). */
  render?: SelectTriggerProps["render"];
};

export type MDXSelectContentProps = {
  /** Side of the trigger the list opens on. Flips when there is no room.
   * @default "bottom"
   */
  side?: SelectContentProps["side"];
  /** Gap between the trigger and the list in px.
   * @default 8
   */
  sideOffset?: SelectContentProps["sideOffset"];
  /** Alignment against the trigger.
   * @default "center"
   */
  align?: SelectContentProps["align"];
  /** Offset along the alignment axis in px.
   * @default 0
   */
  alignOffset?: SelectContentProps["alignOffset"];
  /** Opens the list over the trigger so the selected item lines up with the value.
   * @default false
   */
  alignItemWithTrigger?: SelectContentProps["alignItemWithTrigger"];
};

export type MDXSelectContentPropsKO = {
  /** 트리거의 어느 쪽에 열지 정해요. 자리가 모자라면 반대쪽으로 뒤집혀요.
   * @default "bottom"
   */
  side?: SelectContentProps["side"];
  /** 트리거와 목록 사이 간격(px)이에요.
   * @default 8
   */
  sideOffset?: SelectContentProps["sideOffset"];
  /** 트리거에 맞추는 방법이에요.
   * @default "center"
   */
  align?: SelectContentProps["align"];
  /** 맞춤 방향으로 옮기는 거리(px)예요.
   * @default 0
   */
  alignOffset?: SelectContentProps["alignOffset"];
  /** 목록을 트리거 위에 겹쳐 열어 고른 항목이 값 자리에 오게 해요.
   * @default false
   */
  alignItemWithTrigger?: SelectContentProps["alignItemWithTrigger"];
};

export type MDXSelectItemProps = {
  /** Value this item selects. */
  value?: SelectItemProps["value"];
  /** How the selection is shown: a check on the right, or a radio or checkbox on the left.
   * @default "default"
   */
  variant?: SelectItemProps["variant"];
  /** Text matched by keyboard typeahead. Defaults to the item's text. */
  label?: SelectItemProps["label"];
  /** @default false */
  disabled?: SelectItemProps["disabled"];
};

export type MDXSelectItemPropsKO = {
  /** 이 항목을 고르면 들어가는 값이에요. */
  value?: SelectItemProps["value"];
  /** 고른 표시예요. 오른쪽 체크, 또는 왼쪽 라디오 · 체크박스예요.
   * @default "default"
   */
  variant?: SelectItemProps["variant"];
  /** 글자를 쳐서 찾을 때 견줄 글이에요. 안 주면 항목의 글을 써요. */
  label?: SelectItemProps["label"];
  /** @default false */
  disabled?: SelectItemProps["disabled"];
};
