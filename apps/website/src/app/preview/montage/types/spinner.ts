import type { SpinnerProps } from "@repo/montage/ui/spinner";

export type MDXSpinnerProps = {
  /** Look. `brand` morphs between shapes and colors.
   * @remarks `"default" | "brand"`
   * @default "default"
   */
  variant?: SpinnerProps["variant"];
  /** Size (`size-*`) and, for `default`, color (`text-*`).
   * @default "size-8"
   */
  className?: SpinnerProps["className"];
  /** Accessible name read by screen readers.
   * @default "Loading"
   */
  "aria-label"?: SpinnerProps["aria-label"];
};

export type MDXSpinnerPropsKO = {
  /** 모양. `brand` 는 도형과 색이 바뀌어요.
   * @remarks `"default" | "brand"`
   * @default "default"
   */
  variant?: SpinnerProps["variant"];
  /** 크기(`size-*`)와, `default` 일 때 색(`text-*`)이에요.
   * @default "size-8"
   */
  className?: SpinnerProps["className"];
  /** 스크린 리더가 읽는 이름이에요.
   * @default "Loading"
   */
  "aria-label"?: SpinnerProps["aria-label"];
};
