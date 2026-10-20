import type { BadgeProps } from "@repo/montage/ui/badge";

export type MDXBadgeProps = {
  /** `default` tints the background; `outline` draws only a light border.
   * @default "default"
   */
  variant?: BadgeProps["variant"];
  /** Color of the text, tint and border.
   * @default "neutral"
   */
  color?: BadgeProps["color"];
  /** Size.
   * @default "default"
   */
  size?: BadgeProps["size"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — renders another element such as a link (similar to Radix `asChild`). */
  render?: BadgeProps["render"];
};

export type MDXBadgePropsKO = {
  /** `default` 는 바탕을 옅게 칠하고, `outline` 은 옅은 테두리만 둘러요.
   * @default "default"
   */
  variant?: BadgeProps["variant"];
  /** 글자 · 바탕 · 테두리의 색.
   * @default "neutral"
   */
  color?: BadgeProps["color"];
  /** 크기.
   * @default "default"
   */
  size?: BadgeProps["size"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 링크 같은 다른 요소로 그려요(Radix 의 `asChild` 와 비슷해요). */
  render?: BadgeProps["render"];
};
