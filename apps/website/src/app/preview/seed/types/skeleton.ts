import type { SkeletonProps } from "@repo/seed/ui/skeleton";

export type MDXSkeletonProps = {
  /** Width — a dimension token (`"x12"`), `"full"`, a px number, or any CSS value. Defaults to `auto`. */
  width?: SkeletonProps["width"];
  /** Height — same formats as `width`. When standing in for text, use that text's line-height token (`"lineHeight.t4"`). */
  height?: SkeletonProps["height"];
  /** Corner radius: `8` for text, `16` for cards and thumbnails, `full` for avatars.
   * @default "8"
   */
  radius?: SkeletonProps["radius"];
  /** `magic` is for AI features.
   * @default "neutral"
   */
  tone?: SkeletonProps["tone"];
};

export type MDXSkeletonPropsKO = {
  /** 폭 — 치수 토큰(`"x12"`) · `"full"` · px 숫자 · CSS 값. 안 주면 `auto`. */
  width?: SkeletonProps["width"];
  /** 높이 — `width` 와 같은 형식. 글 대신 놓을 때는 그 글의 줄 높이 토큰(`"lineHeight.t4"`). */
  height?: SkeletonProps["height"];
  /** 모서리 둥글기: 글은 `8`, 카드 · 썸네일은 `16`, 아바타는 `full`.
   * @default "8"
   */
  radius?: SkeletonProps["radius"];
  /** `magic` 은 AI 기능에 써요.
   * @default "neutral"
   */
  tone?: SkeletonProps["tone"];
};
