import type { CheckboxProps } from "@repo/t-flavored/ui/checkbox";

export type MDXCheckboxProps = {
  /** Shape. `circle` draws the check inside a ring, `line` draws the check alone.
   * @default "circle"
   */
  variant?: CheckboxProps["variant"];
  /** Whether the checkbox is checked (controlled). Use with `onCheckedChange`. */
  checked?: CheckboxProps["checked"];
  /** Whether the checkbox is initially checked (uncontrolled).
   * @default false
   */
  defaultChecked?: CheckboxProps["defaultChecked"];
  /** Called when the checkbox is ticked or unticked. */
  onCheckedChange?: CheckboxProps["onCheckedChange"];
  /** Dims the checkbox and ignores presses (it shakes instead).
   * @default false
   */
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
  /** 모양. `circle` 은 테 안에 체크를, `line` 은 체크만 그려요.
   * @default "circle"
   */
  variant?: CheckboxProps["variant"];
  /** 선택 상태(외부에서 관리). `onCheckedChange` 와 같이 써요. */
  checked?: CheckboxProps["checked"];
  /** 처음 선택 상태(내부에서 관리).
   * @default false
   */
  defaultChecked?: CheckboxProps["defaultChecked"];
  /** 선택 상태가 바뀔 때 불려요. */
  onCheckedChange?: CheckboxProps["onCheckedChange"];
  /** 흐리게 만들고 누를 수 없게 해요(누르면 흔들려요).
   * @default false
   */
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
