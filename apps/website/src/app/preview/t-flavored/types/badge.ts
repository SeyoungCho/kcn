import type { BadgeProps } from "@repo/t-flavored/ui/badge";

export type MDXBadgeProps = {
  /** Color and weight; each color has a fill and a lighter `-weak` tint.
   * @default "default"
   */
  variant?: BadgeProps["variant"];
  /** Size.
   * @default "default"
   */
  size?: BadgeProps["size"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — renders another element such as a link (similar to Radix `asChild`). */
  render?: BadgeProps["render"];
};

export type MDXBadgePropsKO = {
  /** 색과 세기 — 색마다 채운 모양과 연한 `-weak` 가 있어요.
   * @default "default"
   */
  variant?: BadgeProps["variant"];
  /** 크기.
   * @default "default"
   */
  size?: BadgeProps["size"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 링크 같은 다른 요소로 그려요(Radix 의 `asChild` 와 비슷해요). */
  render?: BadgeProps["render"];
};
