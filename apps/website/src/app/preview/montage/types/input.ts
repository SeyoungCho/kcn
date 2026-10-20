import type { InputProps } from "@repo/montage/ui/input";

export type MDXInputProps = {
  /** Height and text size. `sm` is one step smaller.
   * @remarks `"default" | "sm"`
   * @default "default"
   */
  size?: InputProps["size"];
  /** Value of the input. Use when controlled. */
  value?: InputProps["value"];
  /** Value of the input on first render. Use when uncontrolled. */
  defaultValue?: InputProps["defaultValue"];
  /** Called with the new value on every change. */
  onValueChange?: InputProps["onValueChange"];
  /** Shows the error state. Set for you inside `<Field invalid>`.
   * @remarks `boolean`
   */
  "aria-invalid"?: InputProps["aria-invalid"];
  /** @default false */
  disabled?: InputProps["disabled"];
  /** @default false */
  readOnly?: InputProps["readOnly"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — renders another element (similar to Radix `asChild`). */
  render?: InputProps["render"];
};

export type MDXInputPropsKO = {
  /** 높이와 글자 크기예요. `sm` 은 한 단계 작아요.
   * @remarks `"default" | "sm"`
   * @default "default"
   */
  size?: InputProps["size"];
  /** 입력 값. 제어 컴포넌트로 쓸 때 줘요. */
  value?: InputProps["value"];
  /** 처음 그릴 때의 값. 비제어 컴포넌트로 쓸 때 줘요. */
  defaultValue?: InputProps["defaultValue"];
  /** 값이 바뀔 때마다 새 값과 함께 불려요. */
  onValueChange?: InputProps["onValueChange"];
  /** 에러 상태를 보여 줘요. `<Field invalid>` 안에서는 저절로 붙어요.
   * @remarks `boolean`
   */
  "aria-invalid"?: InputProps["aria-invalid"];
  /** @default false */
  disabled?: InputProps["disabled"];
  /** @default false */
  readOnly?: InputProps["readOnly"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 다른 요소로 그려요(Radix 의 `asChild` 와 비슷해요). */
  render?: InputProps["render"];
};
