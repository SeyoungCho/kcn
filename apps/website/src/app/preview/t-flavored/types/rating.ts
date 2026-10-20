import type { RatingProps } from "@repo/t-flavored/ui/rating";

export type MDXRatingProps = {
  /** Current score (controlled). Required when `readOnly`. Use with `onValueChange`. */
  value?: RatingProps["value"];
  /** Initial score (uncontrolled). */
  defaultValue?: RatingProps["defaultValue"];
  /** Called when the user picks a score. */
  onValueChange?: RatingProps["onValueChange"];
  /** Number of stars.
   * @default 5
   */
  max?: RatingProps["max"];
  /** Size. `xs` and `sm` are meant for read-only ratings.
   * @default "default"
   */
  size?: RatingProps["size"];
  /** Shows the score without letting the user change it. Renders an image (`role="img"`) instead of a radio group.
   * @default false
   */
  readOnly?: RatingProps["readOnly"];
  /** Read-only layout: `default` is stars + score, `compact` is one star + score, `icon-only` is stars only.
   * @default "default"
   */
  variant?: RatingProps["variant"];
  /** Accessible label of each star.
   * @default String
   */
  getItemLabel?: RatingProps["getItemLabel"];
  /** @default false */
  disabled?: RatingProps["disabled"];
};

export type MDXRatingPropsKO = {
  /** 현재 점수(외부에서 관리). `readOnly` 면 꼭 줘요. `onValueChange` 와 같이 써요. */
  value?: RatingProps["value"];
  /** 처음 점수(내부에서 관리). */
  defaultValue?: RatingProps["defaultValue"];
  /** 사용자가 점수를 고르면 불려요. */
  onValueChange?: RatingProps["onValueChange"];
  /** 별의 수.
   * @default 5
   */
  max?: RatingProps["max"];
  /** 크기. `xs` · `sm` 은 읽기 전용에 써요.
   * @default "default"
   */
  size?: RatingProps["size"];
  /** 점수를 보여 주기만 해요. 라디오 그룹 대신 그림(`role="img"`)으로 그려요.
   * @default false
   */
  readOnly?: RatingProps["readOnly"];
  /** 읽기 전용일 때의 모양. `default` 는 별 + 점수, `compact` 는 별 하나 + 점수, `icon-only` 는 별만이에요.
   * @default "default"
   */
  variant?: RatingProps["variant"];
  /** 별 하나하나의 aria-label 을 만들어요.
   * @default String
   */
  getItemLabel?: RatingProps["getItemLabel"];
  /** @default false */
  disabled?: RatingProps["disabled"];
};
