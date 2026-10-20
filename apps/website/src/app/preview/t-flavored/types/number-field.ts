import type { NumberFieldProps } from "@repo/t-flavored/ui/number-field";

export type MDXNumberFieldProps = {
  /** Size.
   * @default "default"
   */
  size?: NumberFieldProps["size"];
  /** Current value (controlled). Use with `onValueChange`. */
  value?: NumberFieldProps["value"];
  /** Initial value (uncontrolled). */
  defaultValue?: NumberFieldProps["defaultValue"];
  /** Called when the value changes. */
  onValueChange?: NumberFieldProps["onValueChange"];
  /** Lowest value. The minus button stops at it.
   * @default 0
   */
  min?: NumberFieldProps["min"];
  /** Highest value. Its digit count sets the width of the number box.
   * @default 999
   */
  max?: NumberFieldProps["max"];
  /** @default 1 */
  step?: NumberFieldProps["step"];
  /** Dims the field and ignores presses.
   * @default false
   */
  disabled?: NumberFieldProps["disabled"];
  /** Name of the hidden input when the form is submitted. */
  name?: NumberFieldProps["name"];
};

export type MDXNumberFieldPropsKO = {
  /** 크기.
   * @default "default"
   */
  size?: NumberFieldProps["size"];
  /** 현재 값(외부에서 관리). `onValueChange` 와 같이 써요. */
  value?: NumberFieldProps["value"];
  /** 처음 값(내부에서 관리). */
  defaultValue?: NumberFieldProps["defaultValue"];
  /** 값이 바뀔 때 불려요. */
  onValueChange?: NumberFieldProps["onValueChange"];
  /** 가장 작은 값. 여기에 닿으면 빼기 버튼이 멈춰요.
   * @default 0
   */
  min?: NumberFieldProps["min"];
  /** 가장 큰 값. 자릿수만큼 숫자 칸 폭이 정해져요.
   * @default 999
   */
  max?: NumberFieldProps["max"];
  /** @default 1 */
  step?: NumberFieldProps["step"];
  /** 흐리게 만들고 누를 수 없게 해요.
   * @default false
   */
  disabled?: NumberFieldProps["disabled"];
  /** 폼을 보낼 때 숨은 input 의 이름이에요. */
  name?: NumberFieldProps["name"];
};
