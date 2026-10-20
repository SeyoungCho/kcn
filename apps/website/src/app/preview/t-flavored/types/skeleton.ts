import type { SkeletonProps } from "@repo/t-flavored/ui/skeleton";

export type MDXSkeletonProps = {
  /** Fill color; use `white` on grey surfaces.
   * @default "default"
   */
  variant?: SkeletonProps["variant"];
  /** Sets the bar's size and radius. */
  className?: SkeletonProps["className"];
};

export type MDXSkeletonPropsKO = {
  /** 채우는 색 — 회색 바탕 위에서는 `white` 를 써요.
   * @default "default"
   */
  variant?: SkeletonProps["variant"];
  /** 막대의 크기와 둥글기를 정해요. */
  className?: SkeletonProps["className"];
};
