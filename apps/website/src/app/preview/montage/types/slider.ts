import type { SliderProps } from "@repo/montage/ui/slider";

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
  /** What happens when two thumbs meet: `swap` lets them pass each other, `push` moves the other one along, `none` stops at it.
   * @default "swap"
   */
  thumbCollisionBehavior?: SliderProps["thumbCollisionBehavior"];
  /** Title centered above the track. Pass a function to build it from the current values. */
  heading?: SliderProps["heading"];
  /** Text under each thumb. Pass a function to build it from that thumb's value. */
  label?: SliderProps["label"];
  /** Number formatting for screen readers (`Intl.NumberFormatOptions`). */
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
  /** 두 손잡이가 만났을 때의 동작. `swap` 은 서로 지나치고, `push` 는 다른 손잡이를 밀고, `none` 은 거기서 멈춰요.
   * @default "swap"
   */
  thumbCollisionBehavior?: SliderProps["thumbCollisionBehavior"];
  /** 막대 위 가운데의 제목. 함수를 주면 지금 값들로 만들어요. */
  heading?: SliderProps["heading"];
  /** 손잡이마다 아래에 붙는 글자. 함수를 주면 그 손잡이의 값으로 만들어요. */
  label?: SliderProps["label"];
  /** 스크린 리더에 쓰는 숫자 형식(`Intl.NumberFormatOptions`)이에요. */
  format?: SliderProps["format"];
  /** @default false */
  disabled?: SliderProps["disabled"];
};
