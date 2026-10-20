import type { SliderProps } from "@repo/t-flavored/ui/slider";

export type MDXSliderProps = {
  /** Current value (controlled). Pass an array for a range slider. Use with `onValueChange`. */
  value?: SliderProps["value"];
  /** Initial value (uncontrolled). */
  defaultValue?: SliderProps["defaultValue"];
  /** Called while the value changes. */
  onValueChange?: SliderProps["onValueChange"];
  /** Called once the user lets go. */
  onValueCommitted?: SliderProps["onValueCommitted"];
  /** Lowest value.
   * @default 0
   */
  min?: SliderProps["min"];
  /** Highest value.
   * @default 100
   */
  max?: SliderProps["max"];
  /** @default 1 */
  step?: SliderProps["step"];
  /** Text under the track: `min` at the left end, `max` at the right end, optional `mid` in the middle. */
  labels?: SliderProps["labels"];
  /** Shows the value in a bubble above the thumb. Pass a function to render your own text.
   * @default false
   */
  tooltip?: SliderProps["tooltip"];
  /** Number formatting for the tooltip and screen readers (`Intl.NumberFormatOptions`). */
  format?: SliderProps["format"];
  /** @default false */
  disabled?: SliderProps["disabled"];
};

export type MDXSliderPropsKO = {
  /** 현재 값(외부에서 관리). 범위 슬라이더는 배열을 줘요. `onValueChange` 와 같이 써요. */
  value?: SliderProps["value"];
  /** 처음 값(내부에서 관리). */
  defaultValue?: SliderProps["defaultValue"];
  /** 값이 바뀌는 동안 불려요. */
  onValueChange?: SliderProps["onValueChange"];
  /** 손을 뗐을 때 한 번 불려요. */
  onValueCommitted?: SliderProps["onValueCommitted"];
  /** 가장 작은 값.
   * @default 0
   */
  min?: SliderProps["min"];
  /** 가장 큰 값.
   * @default 100
   */
  max?: SliderProps["max"];
  /** @default 1 */
  step?: SliderProps["step"];
  /** 막대 아래 글자. `min` 은 왼쪽 끝, `max` 는 오른쪽 끝, `mid` 는 가운데에 놓여요. */
  labels?: SliderProps["labels"];
  /** 손잡이 위 말풍선에 값을 띄워요. 함수를 주면 원하는 글을 띄워요.
   * @default false
   */
  tooltip?: SliderProps["tooltip"];
  /** 말풍선 · 스크린 리더에 쓰는 숫자 형식(`Intl.NumberFormatOptions`)이에요. */
  format?: SliderProps["format"];
  /** @default false */
  disabled?: SliderProps["disabled"];
};
