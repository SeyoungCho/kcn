import type { SwitchProps } from "@repo/montage/ui/switch";

export type MDXSwitchProps = {
  /** Size.
   * @default "default"
   */
  size?: SwitchProps["size"];
  /** Whether the switch is on (controlled). Use with `onCheckedChange`. */
  checked?: SwitchProps["checked"];
  /** Whether the switch is initially on (uncontrolled).
   * @default false
   */
  defaultChecked?: SwitchProps["defaultChecked"];
  /** Called when the switch is turned on or off. */
  onCheckedChange?: SwitchProps["onCheckedChange"];
  /** @default false */
  disabled?: SwitchProps["disabled"];
  /** Name of the hidden input when the form is submitted. */
  name?: SwitchProps["name"];
  /** @default false */
  required?: SwitchProps["required"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — renders another element (similar to Radix `asChild`). */
  render?: SwitchProps["render"];
};

export type MDXSwitchPropsKO = {
  /** 크기.
   * @default "default"
   */
  size?: SwitchProps["size"];
  /** 켜짐 상태(외부에서 관리). `onCheckedChange` 와 같이 써요. */
  checked?: SwitchProps["checked"];
  /** 처음 켜짐 상태(내부에서 관리).
   * @default false
   */
  defaultChecked?: SwitchProps["defaultChecked"];
  /** 켜거나 끌 때 불려요. */
  onCheckedChange?: SwitchProps["onCheckedChange"];
  /** @default false */
  disabled?: SwitchProps["disabled"];
  /** 폼을 보낼 때 숨은 input 의 이름이에요. */
  name?: SwitchProps["name"];
  /** @default false */
  required?: SwitchProps["required"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 다른 요소로 그려요(Radix 의 `asChild` 와 비슷해요). */
  render?: SwitchProps["render"];
};
