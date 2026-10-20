import type { SeparatorProps } from "@repo/t-flavored/ui/separator";

export type MDXSeparatorProps = {
  /** Shape: `inset` leaves space before the line, `section` is a thick grey band.
   * @default "default"
   */
  variant?: SeparatorProps["variant"];
  /** @default "horizontal" */
  orientation?: SeparatorProps["orientation"];
};

export type MDXSeparatorPropsKO = {
  /** 모양 — `inset` 은 선 앞을 띄우고, `section` 은 굵은 회색 띠예요.
   * @default "default"
   */
  variant?: SeparatorProps["variant"];
  /** @default "horizontal" */
  orientation?: SeparatorProps["orientation"];
};
