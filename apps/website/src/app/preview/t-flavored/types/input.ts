import type { InputProps } from "@repo/t-flavored/ui/input";

export type MDXInputProps = {
  /** Look of the field: a box (`default`), underlined (`line`, `big`) or large text with no border (`hero`).
   * @default "default"
   */
  variant?: InputProps["variant"];
  /** Value of the input. Use when controlled. */
  value?: InputProps["value"];
  /** Value of the input on first render. Use when uncontrolled. */
  defaultValue?: InputProps["defaultValue"];
  /** Called with the new value on every change. */
  onValueChange?: InputProps["onValueChange"];
  /** Shows the error state. Set for you inside `<Field invalid>`. */
  "aria-invalid"?: InputProps["aria-invalid"];
  /** @default false */
  disabled?: InputProps["disabled"];
  /** @default false */
  readOnly?: InputProps["readOnly"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — renders another element (similar to Radix `asChild`). */
  render?: InputProps["render"];
};

export type MDXInputPropsKO = {
  /** 입력 칸의 모양이에요 — 상자(`default`), 밑줄(`line` · `big`), 테두리 없는 큰 글씨(`hero`).
   * @default "default"
   */
  variant?: InputProps["variant"];
  /** 입력 값. 제어 컴포넌트로 쓸 때 줘요. */
  value?: InputProps["value"];
  /** 처음 그릴 때의 값. 비제어 컴포넌트로 쓸 때 줘요. */
  defaultValue?: InputProps["defaultValue"];
  /** 값이 바뀔 때마다 새 값과 함께 불려요. */
  onValueChange?: InputProps["onValueChange"];
  /** 에러 상태를 보여 줘요. `<Field invalid>` 안에서는 저절로 붙어요. */
  "aria-invalid"?: InputProps["aria-invalid"];
  /** @default false */
  disabled?: InputProps["disabled"];
  /** @default false */
  readOnly?: InputProps["readOnly"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 다른 요소로 그려요(Radix 의 `asChild` 와 비슷해요). */
  render?: InputProps["render"];
};
