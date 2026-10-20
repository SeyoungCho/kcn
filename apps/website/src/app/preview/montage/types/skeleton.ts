import type { SkeletonProps } from "@repo/montage/ui/skeleton";

export type MDXSkeletonProps = {
  /** Shape. `text` is a single line of text.
   * @remarks `"text" | "rectangle" | "circle"`
   * @default "text"
   */
  variant?: SkeletonProps["variant"];
  /** Size, corner radius and color. Add `animate-none` to stop the pulse. */
  className?: SkeletonProps["className"];
};

export type MDXSkeletonPropsKO = {
  /** 모양. `text` 는 글자 한 줄이에요.
   * @remarks `"text" | "rectangle" | "circle"`
   * @default "text"
   */
  variant?: SkeletonProps["variant"];
  /** 크기 · 둥글기 · 색을 정해요. 깜빡임을 멈추려면 `animate-none` 을 더해요. */
  className?: SkeletonProps["className"];
};
