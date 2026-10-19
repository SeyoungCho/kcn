import type { CheckboxGroupProps, CheckboxProps } from "@repo/seed/ui/checkbox";

export type MDXCheckboxProps = Pick<
  CheckboxProps,
  "checked" | "defaultChecked" | "onCheckedChange" | "name" | "value"
> & {
  /** Text next to the box. Pressing it toggles the checkbox. */
  label?: CheckboxProps["label"];
  /** Visual style. `ghost` shows only the checkmark, faded while unchecked.
   * @default "square"
   */
  variant?: CheckboxProps["variant"];
  /** Color when checked.
   * @default "brand"
   */
  tone?: CheckboxProps["tone"];
  /** Size of the box and label.
   * @default "medium"
   */
  size?: CheckboxProps["size"];
  /** Font weight of the label.
   * @default "regular"
   */
  weight?: CheckboxProps["weight"];
  /** Shows a dash instead of a checkmark — for a "select all" box when only some items are checked.
   * @default false
   */
  indeterminate?: CheckboxProps["indeterminate"];
  /** Marks the checkbox as invalid (`aria-invalid`). */
  invalid?: CheckboxProps["invalid"];
  /** @default false */
  disabled?: CheckboxProps["disabled"];
  /** @default false */
  readOnly?: CheckboxProps["readOnly"];
  /** @default false */
  required?: CheckboxProps["required"];
  /** ARIA attributes (such as `aria-label`) applied to the focusable box rather than the outer label. */
  inputProps?: CheckboxProps["inputProps"];
};

export type MDXCheckboxPropsKO = Pick<
  CheckboxProps,
  "checked" | "defaultChecked" | "onCheckedChange" | "name" | "value"
> & {
  /** 상자 옆의 글. 눌러도 체크박스가 바뀌어요. */
  label?: CheckboxProps["label"];
  /** 모양. `ghost` 는 체크 표시만 보이고, 꺼져 있을 때는 흐리게 보여요.
   * @default "square"
   */
  variant?: CheckboxProps["variant"];
  /** 켜졌을 때의 색.
   * @default "brand"
   */
  tone?: CheckboxProps["tone"];
  /** 상자와 글의 크기.
   * @default "medium"
   */
  size?: CheckboxProps["size"];
  /** 글의 굵기.
   * @default "regular"
   */
  weight?: CheckboxProps["weight"];
  /** 체크 대신 가로줄을 보여 줘요 — 일부만 고른 '모두 선택' 상자에 써요.
   * @default false
   */
  indeterminate?: CheckboxProps["indeterminate"];
  /** 오류 상태로 표시해요(`aria-invalid`). */
  invalid?: CheckboxProps["invalid"];
  /** @default false */
  disabled?: CheckboxProps["disabled"];
  /** @default false */
  readOnly?: CheckboxProps["readOnly"];
  /** @default false */
  required?: CheckboxProps["required"];
  /** 바깥 label 이 아니라 초점을 받는 상자에 붙는 접근성 속성(`aria-label` 등). */
  inputProps?: CheckboxProps["inputProps"];
};

export type MDXCheckboxGroupProps = {
  /** Label above the checkboxes. */
  label?: CheckboxGroupProps["label"];
  /** Font weight of the label.
   * @default "medium"
   */
  labelWeight?: CheckboxGroupProps["labelWeight"];
  /** Secondary text next to the label (such as "Optional"). */
  indicator?: CheckboxGroupProps["indicator"];
  /** Shows the required mark next to the label. */
  showRequiredIndicator?: CheckboxGroupProps["showRequiredIndicator"];
  /** Helper text below the checkboxes. Hidden visually while an error message shows. */
  description?: CheckboxGroupProps["description"];
  /** Error text below the checkboxes. Shown whenever it is set. */
  errorMessage?: CheckboxGroupProps["errorMessage"];
};

export type MDXCheckboxGroupPropsKO = {
  /** 체크박스 위의 이름표. */
  label?: CheckboxGroupProps["label"];
  /** 이름표의 굵기.
   * @default "medium"
   */
  labelWeight?: CheckboxGroupProps["labelWeight"];
  /** 이름표 옆의 보조 글('선택' 같은 것). */
  indicator?: CheckboxGroupProps["indicator"];
  /** 이름표 옆에 필수 표시를 보여 줘요. */
  showRequiredIndicator?: CheckboxGroupProps["showRequiredIndicator"];
  /** 체크박스 아래의 도움말. 오류 메시지가 보이는 동안에는 화면에서 감춰요. */
  description?: CheckboxGroupProps["description"];
  /** 체크박스 아래의 오류 메시지. 값을 주면 늘 보여요. */
  errorMessage?: CheckboxGroupProps["errorMessage"];
};
