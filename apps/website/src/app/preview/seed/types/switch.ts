import type { SwitchProps } from "@repo/seed/ui/switch";

export type MDXSwitchProps = Pick<
  SwitchProps,
  "checked" | "defaultChecked" | "onCheckedChange" | "name" | "value"
> & {
  /** Text next to the switch. Pressing it toggles the switch. */
  label?: SwitchProps["label"];
  /** Height of the track in px. Accepts a number or a string.
   * @default 32
   */
  size?: SwitchProps["size"];
  /** Color when on.
   * @default "brand"
   */
  tone?: SwitchProps["tone"];
  /** @default false */
  disabled?: SwitchProps["disabled"];
  /** @default false */
  readOnly?: SwitchProps["readOnly"];
  /** @default false */
  required?: SwitchProps["required"];
  /** ARIA attributes (such as `aria-label`) applied to the focusable switch rather than the outer label. */
  inputProps?: SwitchProps["inputProps"];
};

export type MDXSwitchPropsKO = Pick<
  SwitchProps,
  "checked" | "defaultChecked" | "onCheckedChange" | "name" | "value"
> & {
  /** 스위치 옆의 글. 눌러도 스위치가 바뀌어요. */
  label?: SwitchProps["label"];
  /** 손잡이 길의 높이(px). 숫자나 문자열로 줘요.
   * @default 32
   */
  size?: SwitchProps["size"];
  /** 켜졌을 때의 색.
   * @default "brand"
   */
  tone?: SwitchProps["tone"];
  /** @default false */
  disabled?: SwitchProps["disabled"];
  /** @default false */
  readOnly?: SwitchProps["readOnly"];
  /** @default false */
  required?: SwitchProps["required"];
  /** 바깥 label 이 아니라 초점을 받는 스위치에 붙는 접근성 속성(`aria-label` 등). */
  inputProps?: SwitchProps["inputProps"];
};
