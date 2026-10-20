import type { ProgressProps } from "@repo/montage/ui/progress";

export type MDXProgressProps = {
  /** Current value between `min` and `max`. */
  value?: ProgressProps["value"];
  /** @default 0 */
  min?: ProgressProps["min"];
  /** @default 100 */
  max?: ProgressProps["max"];
  /** Bar thickness. Use `md` and `lg` only on wide screens.
   * @remarks `"default" | "md" | "lg"`
   * @default "default"
   */
  size?: ProgressProps["size"];
};

export type MDXProgressPropsKO = {
  /** `min` 과 `max` 사이의 지금 값이에요. */
  value?: ProgressProps["value"];
  /** @default 0 */
  min?: ProgressProps["min"];
  /** @default 100 */
  max?: ProgressProps["max"];
  /** 막대 두께. `md` · `lg` 는 넓은 화면에서만 써요.
   * @remarks `"default" | "md" | "lg"`
   * @default "default"
   */
  size?: ProgressProps["size"];
};
