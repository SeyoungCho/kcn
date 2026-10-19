import type {
  SegmentedControlItemProps,
  SegmentedControlProps,
} from "@repo/seed/ui/segmented-control";

export type MDXSegmentedControlProps = Pick<
  SegmentedControlProps,
  "value" | "defaultValue" | "onValueChange" | "name"
> & {
  /** Disables every segment.
   * @default false
   */
  disabled?: SegmentedControlProps["disabled"];
  /** Accessible name of the group. Give either this or `aria-labelledby`. */
  "aria-label"?: SegmentedControlProps["aria-label"];
};

export type MDXSegmentedControlPropsKO = Pick<
  SegmentedControlProps,
  "value" | "defaultValue" | "onValueChange" | "name"
> & {
  /** 모든 칸을 비활성화합니다.
   * @default false
   */
  disabled?: SegmentedControlProps["disabled"];
  /** 묶음의 읽는 이름. 이것이나 `aria-labelledby` 를 주세요. */
  "aria-label"?: SegmentedControlProps["aria-label"];
};

export type MDXSegmentedControlItemProps = Pick<
  SegmentedControlItemProps,
  "value" | "disabled" | "inputProps"
>;
