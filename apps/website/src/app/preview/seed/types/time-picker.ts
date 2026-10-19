import type { TimePickerProps } from "@repo/seed/ui/time-picker";

export type MDXTimePickerProps = {
  /** Time (controlled), always in 24-hour form: `{ hour: 0–23, minute: 0–59 }`. */
  value?: TimePickerProps["value"];
  /** Initial time (uncontrolled).
   * @default { hour: 0, minute: 0 }
   */
  defaultValue?: TimePickerProps["defaultValue"];
  /** Called when a wheel settles on a new item. */
  onValueChange?: TimePickerProps["onValueChange"];
  /** Interval of the minute column. Values off the interval snap to the nearest step.
   * @default 5
   */
  minuteStep?: TimePickerProps["minuteStep"];
  /** Sets the AM/PM and number labels and the column order.
   * @default "ko-KR"
   */
  locale?: TimePickerProps["locale"];
  /** Blocks focus and changes.
   * @default false
   */
  disabled?: TimePickerProps["disabled"];
  /** Screen-reader name of the AM/PM column. Defaults follow `locale`. */
  periodAriaLabel?: TimePickerProps["periodAriaLabel"];
  /** Screen-reader name of the hour column. */
  hourAriaLabel?: TimePickerProps["hourAriaLabel"];
  /** Screen-reader name of the minute column. */
  minuteAriaLabel?: TimePickerProps["minuteAriaLabel"];
};

export type MDXTimePickerPropsKO = {
  /** 시각(제어). 늘 24시간으로 적어요: `{ hour: 0–23, minute: 0–59 }`. */
  value?: TimePickerProps["value"];
  /** 처음 시각(비제어).
   * @default { hour: 0, minute: 0 }
   */
  defaultValue?: TimePickerProps["defaultValue"];
  /** 휠이 새 항목에 멈출 때 불려요. */
  onValueChange?: TimePickerProps["onValueChange"];
  /** 분 열의 간격. 간격에 맞지 않는 값은 가장 가까운 값으로 맞춰요.
   * @default 5
   */
  minuteStep?: TimePickerProps["minuteStep"];
  /** 오전 · 오후와 숫자의 표기, 열의 순서를 정해요.
   * @default "ko-KR"
   */
  locale?: TimePickerProps["locale"];
  /** 초점과 값 바꾸기를 막아요.
   * @default false
   */
  disabled?: TimePickerProps["disabled"];
  /** 오전 · 오후 열을 읽어 주는 이름. 기본값은 `locale` 을 따라요. */
  periodAriaLabel?: TimePickerProps["periodAriaLabel"];
  /** 시 열을 읽어 주는 이름. */
  hourAriaLabel?: TimePickerProps["hourAriaLabel"];
  /** 분 열을 읽어 주는 이름. */
  minuteAriaLabel?: TimePickerProps["minuteAriaLabel"];
};
