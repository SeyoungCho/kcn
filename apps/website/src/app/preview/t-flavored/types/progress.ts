import type { ProgressProps } from "@repo/t-flavored/ui/progress";

export type MDXProgressProps = {
  /** Current value between `min` and `max`; `null` renders an indeterminate bar. */
  value?: ProgressProps["value"];
  /** @default 0 */
  min?: ProgressProps["min"];
  /** @default 100 */
  max?: ProgressProps["max"];
  /** Bar thickness.
   * @default "default"
   */
  size?: ProgressProps["size"];
};

export type MDXProgressPropsKO = {
  /** `min` 과 `max` 사이의 지금 값이고, `null` 이면 끝을 모르는 진행이에요. */
  value?: ProgressProps["value"];
  /** @default 0 */
  min?: ProgressProps["min"];
  /** @default 100 */
  max?: ProgressProps["max"];
  /** 막대 두께.
   * @default "default"
   */
  size?: ProgressProps["size"];
};
