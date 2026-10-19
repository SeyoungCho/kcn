import type { ProgressCircleProps } from "@repo/seed/ui/progress-circle";

export type MDXProgressCircleProps = {
  /** Current value. Leave it out for an indeterminate (spinning) indicator. */
  value?: ProgressCircleProps["value"];
  /** @default 0 */
  minValue?: ProgressCircleProps["minValue"];
  /** @default 100 */
  maxValue?: ProgressCircleProps["maxValue"];
  /** Color tone. `inherit` uses the colors set by the parent component.
   * @default "neutral"
   */
  tone?: ProgressCircleProps["tone"];
  /** Diameter in px. `inherit` uses the size set by the parent component.
   * @default "40"
   */
  size?: ProgressCircleProps["size"];
};

export type MDXProgressCirclePropsKO = {
  /** 지금 값. 안 주면 끝을 모르는 진행(빙글빙글 돌아요). */
  value?: ProgressCircleProps["value"];
  /** @default 0 */
  minValue?: ProgressCircleProps["minValue"];
  /** @default 100 */
  maxValue?: ProgressCircleProps["maxValue"];
  /** 색조. `inherit` 이면 부모 부품이 정한 색을 써요.
   * @default "neutral"
   */
  tone?: ProgressCircleProps["tone"];
  /** 지름(px). `inherit` 이면 부모 부품이 정한 크기를 써요.
   * @default "40"
   */
  size?: ProgressCircleProps["size"];
};
