import type { ResultSectionProps } from "@repo/seed/ui/result-section";

export type MDXResultSectionProps = {
  /** Size of the title and description.
   * @default "large"
   */
  size?: ResultSectionProps["size"];
  /** Illustration placed above the text. */
  asset?: ResultSectionProps["asset"];
  /** Title. Use `\n` to break lines. */
  title?: ResultSectionProps["title"];
  /** Description. Use `\n` to break lines. */
  description?: ResultSectionProps["description"];
  /** Props for the primary `ActionButton` (`neutralWeak`, `medium` by default). */
  primaryActionProps?: ResultSectionProps["primaryActionProps"];
  /** Props for the secondary `ActionButton` (`ghost`, `small` by default). */
  secondaryActionProps?: ResultSectionProps["secondaryActionProps"];
  /** Horizontal padding as a dimension token.
   * @default "x12"
   */
  px?: ResultSectionProps["px"];
  /** Vertical padding as a dimension token.
   * @default "x4"
   */
  py?: ResultSectionProps["py"];
};

export type MDXResultSectionPropsKO = {
  /** 제목 · 설명의 크기.
   * @default "large"
   */
  size?: ResultSectionProps["size"];
  /** 글 위에 놓는 그림. */
  asset?: ResultSectionProps["asset"];
  /** 제목. 줄을 나누려면 `\n`. */
  title?: ResultSectionProps["title"];
  /** 설명. 줄을 나누려면 `\n`. */
  description?: ResultSectionProps["description"];
  /** 첫째 `ActionButton` 의 props(기본 `neutralWeak` · `medium`). */
  primaryActionProps?: ResultSectionProps["primaryActionProps"];
  /** 둘째 `ActionButton` 의 props(기본 `ghost` · `small`). */
  secondaryActionProps?: ResultSectionProps["secondaryActionProps"];
  /** 좌우 안쪽 여백(치수 토큰).
   * @default "x12"
   */
  px?: ResultSectionProps["px"];
  /** 위아래 안쪽 여백(치수 토큰).
   * @default "x4"
   */
  py?: ResultSectionProps["py"];
};
