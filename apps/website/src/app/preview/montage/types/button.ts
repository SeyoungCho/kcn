import type { ButtonProps } from "@repo/montage/ui/button";

export type MDXButtonProps = {
  /** Visual style.
   * @default "default"
   */
  variant?: ButtonProps["variant"];
  /** Size. `icon-*` sizes are square icon-only buttons.
   * @default "default"
   */
  size?: ButtonProps["size"];
  /** Shows a spinner in place of the label and blocks presses.
   * @default false
   */
  loading?: ButtonProps["loading"];
  /** @default false */
  disabled?: ButtonProps["disabled"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — renders another element (similar to Radix `asChild`). */
  render?: ButtonProps["render"];
};

export type MDXButtonPropsKO = {
  /** 모양.
   * @default "default"
   */
  variant?: ButtonProps["variant"];
  /** 크기. `icon-*` 은 아이콘만 있는 정사각형 버튼이에요.
   * @default "default"
   */
  size?: ButtonProps["size"];
  /** 글자 대신 스피너를 보여 주고 누를 수 없게 해요.
   * @default false
   */
  loading?: ButtonProps["loading"];
  /** @default false */
  disabled?: ButtonProps["disabled"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 다른 요소로 그려요(Radix 의 `asChild` 와 비슷해요). */
  render?: ButtonProps["render"];
};
