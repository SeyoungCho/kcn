import type { CheckboxProps } from "@repo/montage/ui/checkbox";

export type MDXCheckboxProps = {
  /** Shape. `default` is a square box, `circle` a round box, `check` a check mark without a box.
   * @default "default"
   */
  variant?: CheckboxProps["variant"];
  /** Size.
   * @default "default"
   */
  size?: CheckboxProps["size"];
  /** Removes the side spacing so the control lines up with text above and below.
   * @default false
   */
  tight?: CheckboxProps["tight"];
  /** Whether the checkbox is checked (controlled). Use with `onCheckedChange`. */
  checked?: CheckboxProps["checked"];
  /** Whether the checkbox is initially checked (uncontrolled).
   * @default false
   */
  defaultChecked?: CheckboxProps["defaultChecked"];
  /** Called when the checkbox is ticked or unticked. */
  onCheckedChange?: CheckboxProps["onCheckedChange"];
  /** Shows a dash for a mixed state, such as a partly selected "select all".
   * @default false
   */
  indeterminate?: CheckboxProps["indeterminate"];
  /** @default false */
  disabled?: CheckboxProps["disabled"];
  /** Name of the hidden input when the form is submitted. */
  name?: CheckboxProps["name"];
  /** Value submitted with the form when checked. */
  value?: CheckboxProps["value"];
  /** @default false */
  required?: CheckboxProps["required"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — renders another element (similar to Radix `asChild`). */
  render?: CheckboxProps["render"];
};

export type MDXCheckboxPropsKO = {
  /** 모양. `default` 는 네모 칸, `circle` 은 동그란 칸, `check` 는 칸 없이 체크만 그려요.
   * @default "default"
   */
  variant?: CheckboxProps["variant"];
  /** 크기.
   * @default "default"
   */
  size?: CheckboxProps["size"];
  /** 좌우 여백을 없애 위아래 글자와 줄을 맞춰요.
   * @default false
   */
  tight?: CheckboxProps["tight"];
  /** 선택 상태(외부에서 관리). `onCheckedChange` 와 같이 써요. */
  checked?: CheckboxProps["checked"];
  /** 처음 선택 상태(내부에서 관리).
   * @default false
   */
  defaultChecked?: CheckboxProps["defaultChecked"];
  /** 선택 상태가 바뀔 때 불려요. */
  onCheckedChange?: CheckboxProps["onCheckedChange"];
  /** 일부만 고른 "전체 선택"처럼 섞인 상태를 줄표로 보여 줘요.
   * @default false
   */
  indeterminate?: CheckboxProps["indeterminate"];
  /** @default false */
  disabled?: CheckboxProps["disabled"];
  /** 폼을 보낼 때 숨은 input 의 이름이에요. */
  name?: CheckboxProps["name"];
  /** 선택됐을 때 폼으로 보내는 값이에요. */
  value?: CheckboxProps["value"];
  /** @default false */
  required?: CheckboxProps["required"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 다른 요소로 그려요(Radix 의 `asChild` 와 비슷해요). */
  render?: CheckboxProps["render"];
};
