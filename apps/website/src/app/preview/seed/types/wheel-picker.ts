import type {
  WheelPickerColumn,
  WheelPickerProps,
} from "@repo/seed/ui/wheel-picker";

export type MDXWheelPickerProps = {
  /** Columns to render, side by side. */
  columns: WheelPickerProps["columns"];
  /** Text size and default item height (`small` 36px, `medium` 44px).
   * @default "medium"
   */
  size?: WheelPickerProps["size"];
  /** Item height in px. Defaults to the height for `size`. */
  itemSize?: WheelPickerProps["itemSize"];
  /** Number of visible items (odd).
   * @default 5
   */
  visibleItemCount?: WheelPickerProps["visibleItemCount"];
  /** Size of the fade at the top and bottom — numbers are px. Defaults to 40% of the height, at most three items. */
  scrollFogSize?: WheelPickerProps["scrollFogSize"];
  /** Blocks focus and changes.
   * @default false
   */
  disabled?: WheelPickerProps["disabled"];
  /** Keeps focus but blocks changes.
   * @default false
   */
  readOnly?: WheelPickerProps["readOnly"];
};

export type MDXWheelPickerPropsKO = {
  /** 나란히 그릴 열 목록. */
  columns: WheelPickerProps["columns"];
  /** 글자 크기와 기본 항목 높이(`small` 36px · `medium` 44px).
   * @default "medium"
   */
  size?: WheelPickerProps["size"];
  /** 항목 하나의 높이(px). 안 주면 `size` 의 기본 높이예요. */
  itemSize?: WheelPickerProps["itemSize"];
  /** 보이는 항목 수(홀수).
   * @default 5
   */
  visibleItemCount?: WheelPickerProps["visibleItemCount"];
  /** 위아래 안개의 크기 — 숫자는 px. 안 주면 높이의 40%(최대 세 항목)예요. */
  scrollFogSize?: WheelPickerProps["scrollFogSize"];
  /** 초점도 값 바꾸기도 막아요.
   * @default false
   */
  disabled?: WheelPickerProps["disabled"];
  /** 초점은 두고 값 바꾸기만 막아요.
   * @default false
   */
  readOnly?: WheelPickerProps["readOnly"];
};

export type MDXWheelPickerColumnProps = {
  /** Identifies the column. */
  id: WheelPickerColumn["id"];
  /** Items to pick from (at least one): `{ value, label, ariaLabel? }`. */
  options: WheelPickerColumn["options"];
  /** Selected item value (controlled). */
  value?: WheelPickerColumn["value"];
  /** Initial item value (uncontrolled). */
  defaultValue?: WheelPickerColumn["defaultValue"];
  /** Called when the wheel settles on a new item. `details.stepDelta` is how many items it moved (positive downward, counts past a full turn when looping). */
  onValueChange?: WheelPickerColumn["onValueChange"];
  /** Joins the last item to the first so the wheel turns endlessly.
   * @default false
   */
  loop?: WheelPickerColumn["loop"];
  /** Text read out for the current value. */
  getAriaValueText?: WheelPickerColumn["getAriaValueText"];
  /** Custom item content in place of the default label. It must inherit `currentColor` so selected and faded colors apply. */
  renderLabel?: WheelPickerColumn["renderLabel"];
  /** Screen-reader name of the column. */
  "aria-label"?: WheelPickerColumn["aria-label"];
};

export type MDXWheelPickerColumnPropsKO = {
  /** 열을 가리키는 값. */
  id: WheelPickerColumn["id"];
  /** 고를 항목(하나 이상): `{ value, label, ariaLabel? }`. */
  options: WheelPickerColumn["options"];
  /** 고른 항목의 값(제어). */
  value?: WheelPickerColumn["value"];
  /** 처음 항목의 값(비제어). */
  defaultValue?: WheelPickerColumn["defaultValue"];
  /** 휠이 새 항목에 멈출 때 불려요. `details.stepDelta` 는 움직인 칸 수예요(아래로 양수, 끝없이 도는 열은 한 바퀴를 넘겨도 세요). */
  onValueChange?: WheelPickerColumn["onValueChange"];
  /** 마지막 항목과 첫 항목을 이어 끝없이 돌려요.
   * @default false
   */
  loop?: WheelPickerColumn["loop"];
  /** 지금 값을 읽어 줄 글자. */
  getAriaValueText?: WheelPickerColumn["getAriaValueText"];
  /** 기본 글자 대신 항목에 그릴 요소. 고른 색 · 흐린 색이 먹도록 `currentColor` 를 물려받아야 해요. */
  renderLabel?: WheelPickerColumn["renderLabel"];
  /** 열을 읽어 주는 이름. */
  "aria-label"?: WheelPickerColumn["aria-label"];
};
