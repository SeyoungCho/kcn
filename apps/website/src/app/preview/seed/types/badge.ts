import type { BadgeProps } from "@repo/seed/ui/badge";

export type MDXBadgeProps = {
  /** Visual style of the badge.
   * @default "solid"
   */
  variant?: BadgeProps["variant"];
  /** Color tone.
   * @default "neutral"
   */
  tone?: BadgeProps["tone"];
  /** Size of the badge.
   * @default "medium"
   */
  size?: BadgeProps["size"];
  /** Icon placed before the label, passed as an element (`<IconCheckmarkFatFill />`). */
  prefix?: BadgeProps["prefix"];
};

export type MDXBadgePropsKO = {
  /** 배지의 모양.
   * @default "solid"
   */
  variant?: BadgeProps["variant"];
  /** 색 계열.
   * @default "neutral"
   */
  tone?: BadgeProps["tone"];
  /** 배지 크기.
   * @default "medium"
   */
  size?: BadgeProps["size"];
  /** 글자 앞에 놓는 아이콘 — 요소로 줍니다(`<IconCheckmarkFatFill />`). */
  prefix?: BadgeProps["prefix"];
};
