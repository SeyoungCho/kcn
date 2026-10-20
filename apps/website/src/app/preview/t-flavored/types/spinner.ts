import type { SpinnerProps } from "@repo/t-flavored/ui/spinner";

export type MDXSpinnerProps = {
  /** Color. `light` is for dark backgrounds.
   * @default "default"
   */
  variant?: SpinnerProps["variant"];
  /** Size.
   * @default "default"
   */
  size?: SpinnerProps["size"];
  /** Accessible name read by screen readers.
   * @default "Loading"
   */
  "aria-label"?: SpinnerProps["aria-label"];
};

export type MDXSpinnerPropsKO = {
  /** 색. `light` 는 어두운 바탕에서 써요.
   * @default "default"
   */
  variant?: SpinnerProps["variant"];
  /** 크기.
   * @default "default"
   */
  size?: SpinnerProps["size"];
  /** 스크린 리더가 읽는 이름이에요.
   * @default "Loading"
   */
  "aria-label"?: SpinnerProps["aria-label"];
};
