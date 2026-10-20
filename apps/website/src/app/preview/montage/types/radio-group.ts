import type {
  RadioGroupItemProps,
  RadioGroupProps,
} from "@repo/montage/ui/radio-group";

export type MDXRadioGroupProps = {
  /** Value of the selected item (controlled). Use with `onValueChange`. */
  value?: RadioGroupProps["value"];
  /** Value of the initially selected item (uncontrolled). */
  defaultValue?: RadioGroupProps["defaultValue"];
  /** Called when another item is selected. */
  onValueChange?: RadioGroupProps["onValueChange"];
  /** Disables every item in the group.
   * @default false
   */
  disabled?: RadioGroupProps["disabled"];
  /** Name of the hidden input when the form is submitted. */
  name?: RadioGroupProps["name"];
  /** @default false */
  required?: RadioGroupProps["required"];
};

export type MDXRadioGroupPropsKO = {
  /** 고른 항목의 값(외부에서 관리). `onValueChange` 와 같이 써요. */
  value?: RadioGroupProps["value"];
  /** 처음 고른 항목의 값(내부에서 관리). */
  defaultValue?: RadioGroupProps["defaultValue"];
  /** 다른 항목을 고를 때 불려요. */
  onValueChange?: RadioGroupProps["onValueChange"];
  /** 모든 항목을 누를 수 없게 해요.
   * @default false
   */
  disabled?: RadioGroupProps["disabled"];
  /** 폼을 보낼 때 숨은 input 의 이름이에요. */
  name?: RadioGroupProps["name"];
  /** @default false */
  required?: RadioGroupProps["required"];
};

export type MDXRadioGroupItemProps = {
  /** Value this item stands for in the group. */
  value: RadioGroupItemProps["value"];
  /** Size.
   * @default "default"
   */
  size?: RadioGroupItemProps["size"];
  /** Removes the side spacing so the control lines up with text above and below.
   * @default false
   */
  tight?: RadioGroupItemProps["tight"];
  /** @default false */
  disabled?: RadioGroupItemProps["disabled"];
};

export type MDXRadioGroupItemPropsKO = {
  /** 그룹 안에서 이 항목이 뜻하는 값이에요. */
  value: RadioGroupItemProps["value"];
  /** 크기.
   * @default "default"
   */
  size?: RadioGroupItemProps["size"];
  /** 좌우 여백을 없애 위아래 글자와 줄을 맞춰요.
   * @default false
   */
  tight?: RadioGroupItemProps["tight"];
  /** @default false */
  disabled?: RadioGroupItemProps["disabled"];
};
