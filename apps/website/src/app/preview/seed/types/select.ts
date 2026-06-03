import type { SelectProps, SelectTriggerProps } from "@repo/seed/ui/select";
import type { SelectContent, SelectItem } from "@repo/seed/ui/select";

type SelectContentProps = React.ComponentProps<typeof SelectContent>;
type SelectItemProps = React.ComponentProps<typeof SelectItem>;

/* -------------------------------------------------------------------------- */
/*                                   Select                                   */
/* -------------------------------------------------------------------------- */

export type MDXSelectProps = {
  /**
   * Size applied to the trigger, items, and the rest of the composed parts.
   * @remarks `"md" | "lg"`
   * @default "lg"
   */
  size?: SelectProps["size"];
  /**
   * The initially selected value. Use for an uncontrolled select.
   * @remarks `string | null`
   */
  defaultValue?: SelectProps["defaultValue"];
  /**
   * The selected value. Use for a controlled select.
   * @remarks `string | null`
   */
  value?: SelectProps["value"];
  /**
   * Event handler called when the selected value changes.
   * @remarks `(value, eventDetails) => void`
   */
  onValueChange?: SelectProps["onValueChange"];
  /**
   * Whether the select should ignore user interaction.
   * @remarks `boolean`
   * @default false
   */
  disabled?: SelectProps["disabled"];
  /**
   * Whether multiple items can be selected.
   * @remarks `boolean`
   * @default false
   */
  multiple?: SelectProps["multiple"];
};

export type MDXSelectPropsKO = {
  /**
   * 트리거, 아이템 등 하위 구성 요소 전체에 적용되는 크기입니다.
   * @remarks `"md" | "lg"`
   * @default "lg"
   */
  size?: SelectProps["size"];
  /**
   * 처음 선택된 값입니다. 비제어 셀렉트에서 사용합니다.
   * @remarks `string | null`
   */
  defaultValue?: SelectProps["defaultValue"];
  /**
   * 선택된 값입니다. 제어 셀렉트에서 사용합니다.
   * @remarks `string | null`
   */
  value?: SelectProps["value"];
  /**
   * 선택된 값이 변경될 때 호출되는 이벤트 핸들러입니다.
   * @remarks `(value, eventDetails) => void`
   */
  onValueChange?: SelectProps["onValueChange"];
  /**
   * 사용자 상호작용을 무시할지 여부입니다.
   * @remarks `boolean`
   * @default false
   */
  disabled?: SelectProps["disabled"];
  /**
   * 여러 아이템을 선택할 수 있는지 여부입니다.
   * @remarks `boolean`
   * @default false
   */
  multiple?: SelectProps["multiple"];
};

/* -------------------------------------------------------------------------- */
/*                                SelectTrigger                               */
/* -------------------------------------------------------------------------- */

export type MDXSelectTriggerProps = {
  /**
   * Whether the trigger should ignore user interaction.
   * @remarks `boolean`
   * @default false
   */
  disabled?: SelectTriggerProps["disabled"];
  /**
   * Base UI prop - [render](https://base-ui.com/react/handbook/composition#render-function)
   *
   * Allows you to replace the component's HTML element with a different tag, or compose it with another component.
   *
   * Accepts a ReactElement or a function that returns the element to render.
   * Similar to the ```asChild``` prop in Radix UI.
   * @remarks `ReactElement | ((props: HTMLProps, state: Select.Trigger.State) => ReactElement)`
   */
  render?: SelectTriggerProps["render"];
};

export type MDXSelectTriggerPropsKO = {
  /**
   * 트리거가 사용자 상호작용을 무시할지 여부입니다.
   * @remarks `boolean`
   * @default false
   */
  disabled?: SelectTriggerProps["disabled"];
  /**
   * Base UI prop - [render](https://base-ui.com/react/handbook/composition#render-function)
   *
   * 컴포넌트의 HTML 요소를 다른 태그로 대체하거나 다른 컴포넌트와 함께 구성할 수 있습니다.
   *
   * ReactElement 또는 요소를 반환하는 함수를 받습니다. Radix UI의 ```asChild``` prop과 유사합니다.
   * @remarks `ReactElement | ((props: HTMLProps, state: Select.Trigger.State) => ReactElement)`
   */
  render?: SelectTriggerProps["render"];
};

/* -------------------------------------------------------------------------- */
/*                                SelectContent                               */
/* -------------------------------------------------------------------------- */

export type MDXSelectContentProps = {
  /**
   * Which side of the trigger to align the popup against.
   * @remarks `"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"`
   * @default "bottom"
   */
  side?: SelectContentProps["side"];
  /**
   * Distance in pixels between the popup and the trigger.
   * @remarks `number`
   * @default 4
   */
  sideOffset?: SelectContentProps["sideOffset"];
  /**
   * Alignment of the popup relative to the trigger along the chosen side.
   * @remarks `"start" | "center" | "end"`
   * @default "center"
   */
  align?: SelectContentProps["align"];
  /**
   * Offset in pixels applied along the alignment axis.
   * @remarks `number`
   * @default 0
   */
  alignOffset?: SelectContentProps["alignOffset"];
  /**
   * Whether the selected item is aligned over the trigger (native-like). Falls back to side/align positioning near viewport edges.
   * @remarks `boolean`
   * @default true
   */
  alignItemWithTrigger?: SelectContentProps["alignItemWithTrigger"];
};

export type MDXSelectContentPropsKO = {
  /**
   * 팝업을 트리거의 어느 방향에 정렬할지 결정합니다.
   * @remarks `"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"`
   * @default "bottom"
   */
  side?: SelectContentProps["side"];
  /**
   * 팝업과 트리거 사이의 거리(px)입니다.
   * @remarks `number`
   * @default 4
   */
  sideOffset?: SelectContentProps["sideOffset"];
  /**
   * 선택한 방향 축을 기준으로 한 팝업의 정렬 방식입니다.
   * @remarks `"start" | "center" | "end"`
   * @default "center"
   */
  align?: SelectContentProps["align"];
  /**
   * 정렬 축을 따라 적용되는 오프셋(px)입니다.
   * @remarks `number`
   * @default 0
   */
  alignOffset?: SelectContentProps["alignOffset"];
  /**
   * 선택된 아이템을 트리거 위에 겹쳐 정렬할지 여부입니다(네이티브 방식). 뷰포트 가장자리에서는 side/align 위치로 대체됩니다.
   * @remarks `boolean`
   * @default true
   */
  alignItemWithTrigger?: SelectContentProps["alignItemWithTrigger"];
};

/* -------------------------------------------------------------------------- */
/*                                 SelectItem                                 */
/* -------------------------------------------------------------------------- */

export type MDXSelectItemProps = {
  /**
   * The value selected when this item is chosen.
   * @remarks `string`
   */
  value?: SelectItemProps["value"];
  /**
   * Whether the item should ignore user interaction.
   * @remarks `boolean`
   * @default false
   */
  disabled?: SelectItemProps["disabled"];
  /**
   * Text label used for keyboard typeahead. Defaults to the item's text content.
   * @remarks `string`
   */
  label?: SelectItemProps["label"];
};

export type MDXSelectItemPropsKO = {
  /**
   * 이 아이템이 선택되었을 때의 값입니다.
   * @remarks `string`
   */
  value?: SelectItemProps["value"];
  /**
   * 아이템이 사용자 상호작용을 무시할지 여부입니다.
   * @remarks `boolean`
   * @default false
   */
  disabled?: SelectItemProps["disabled"];
  /**
   * 키보드 타입어헤드에 사용되는 텍스트 라벨입니다. 기본값은 아이템의 텍스트 콘텐츠입니다.
   * @remarks `string`
   */
  label?: SelectItemProps["label"];
};
