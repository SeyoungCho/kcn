import type {
  RadioGroupItemProps,
  RadioGroupProps,
} from "@repo/seed/ui/radio-group";

export type MDXRadioGroupProps = Pick<
  RadioGroupProps,
  "value" | "defaultValue" | "onValueChange" | "name"
> & {
  /** Label above the options. */
  label?: RadioGroupProps["label"];
  /** Font weight of the label.
   * @default "medium"
   */
  labelWeight?: RadioGroupProps["labelWeight"];
  /** Secondary text next to the label (such as "Optional"). */
  indicator?: RadioGroupProps["indicator"];
  /** Shows the required mark next to the label. */
  showRequiredIndicator?: RadioGroupProps["showRequiredIndicator"];
  /** Helper text below the options. Hidden visually while an error message shows. */
  description?: RadioGroupProps["description"];
  /** Error text below the options. Shown only when `invalid` is set. */
  errorMessage?: RadioGroupProps["errorMessage"];
  /** @default false */
  invalid?: RadioGroupProps["invalid"];
  /** @default false */
  disabled?: RadioGroupProps["disabled"];
  /** @default false */
  readOnly?: RadioGroupProps["readOnly"];
  /** @default false */
  required?: RadioGroupProps["required"];
  /** Applied to the element that holds the options — use `flex-row` to lay them out horizontally. */
  className?: RadioGroupProps["className"];
};

export type MDXRadioGroupPropsKO = Pick<
  RadioGroupProps,
  "value" | "defaultValue" | "onValueChange" | "name"
> & {
  /** 선택지 위의 이름표. */
  label?: RadioGroupProps["label"];
  /** 이름표의 굵기.
   * @default "medium"
   */
  labelWeight?: RadioGroupProps["labelWeight"];
  /** 이름표 옆의 보조 글('선택' 같은 것). */
  indicator?: RadioGroupProps["indicator"];
  /** 이름표 옆에 필수 표시를 보여 줘요. */
  showRequiredIndicator?: RadioGroupProps["showRequiredIndicator"];
  /** 선택지 아래의 도움말. 오류 메시지가 보이는 동안에는 화면에서 감춰요. */
  description?: RadioGroupProps["description"];
  /** 선택지 아래의 오류 메시지. `invalid` 일 때만 보여요. */
  errorMessage?: RadioGroupProps["errorMessage"];
  /** @default false */
  invalid?: RadioGroupProps["invalid"];
  /** @default false */
  disabled?: RadioGroupProps["disabled"];
  /** @default false */
  readOnly?: RadioGroupProps["readOnly"];
  /** @default false */
  required?: RadioGroupProps["required"];
  /** 선택지를 담는 요소에 붙어요 — `flex-row` 를 주면 가로로 놓여요. */
  className?: RadioGroupProps["className"];
};

export type MDXRadioGroupItemProps = Pick<RadioGroupItemProps, "value"> & {
  /** Text next to the circle. Pressing it selects the option. */
  label?: RadioGroupItemProps["label"];
  /** Color when selected.
   * @default "brand"
   */
  tone?: RadioGroupItemProps["tone"];
  /** Size of the circle and label.
   * @default "medium"
   */
  size?: RadioGroupItemProps["size"];
  /** Font weight of the label.
   * @default "regular"
   */
  weight?: RadioGroupItemProps["weight"];
  /** @default false */
  disabled?: RadioGroupItemProps["disabled"];
  /** ARIA attributes (such as `aria-label`) applied to the focusable circle rather than the outer label. */
  inputProps?: RadioGroupItemProps["inputProps"];
};

export type MDXRadioGroupItemPropsKO = Pick<RadioGroupItemProps, "value"> & {
  /** 동그라미 옆의 글. 눌러도 이 항목이 골라져요. */
  label?: RadioGroupItemProps["label"];
  /** 골랐을 때의 색.
   * @default "brand"
   */
  tone?: RadioGroupItemProps["tone"];
  /** 동그라미와 글의 크기.
   * @default "medium"
   */
  size?: RadioGroupItemProps["size"];
  /** 글의 굵기.
   * @default "regular"
   */
  weight?: RadioGroupItemProps["weight"];
  /** @default false */
  disabled?: RadioGroupItemProps["disabled"];
  /** 바깥 label 이 아니라 초점을 받는 동그라미에 붙는 접근성 속성(`aria-label` 등). */
  inputProps?: RadioGroupItemProps["inputProps"];
};
