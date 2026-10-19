import type { DatePickerProps } from "@repo/seed/ui/date-picker";

export type MDXDatePickerProps = {
  /** How dates are picked: one date, a start–end range, or any number of dates.
   * @default "single"
   */
  selectionMode?: DatePickerProps["selectionMode"];
  /** Selected value (controlled). Dates are `{ year, month, day }` with `month` from 1 to 12. `single` takes a date, `range` takes `{ start, end? }`, and `multiple` takes an array of dates. */
  value?: DatePickerProps["value"];
  /** Initial value (uncontrolled). Same shape as `value`. */
  defaultValue?: DatePickerProps["defaultValue"];
  /** Called when the value changes. */
  onValueChange?: DatePickerProps["onValueChange"];
  /** Month being shown (controlled). Snapped to the first day of that month. */
  viewDate?: DatePickerProps["viewDate"];
  /** Month shown first (uncontrolled). */
  defaultViewDate?: DatePickerProps["defaultViewDate"];
  /** Called when the shown month changes. */
  onViewDateChange?: DatePickerProps["onViewDateChange"];
  /** Date marked as today. Defaults to the device's today. */
  today?: DatePickerProps["today"];
  /** Locale for month, weekday, and day labels.
   * @default "ko-KR"
   */
  locale?: DatePickerProps["locale"];
  /** First day of the week (0 = Sunday).
   * @default 0
   */
  weekStartsOn?: DatePickerProps["weekStartsOn"];
  /** Years you can browse to and pick from, both ends included.
   * @default today.year ± 100
   */
  yearRange?: DatePickerProps["yearRange"];
  /** Conditions a date must meet to be picked — every one must return `true`. Use `dateOnOrAfter` / `dateOnOrBefore` or your own `(date) => boolean`. */
  constraints?: DatePickerProps["constraints"];
  /** `range` only — keeps the start date fixed and lets only the end date change. Needs `value` or `defaultValue`. */
  rangeStartReadOnly?: DatePickerProps["rangeStartReadOnly"];
  /** Blocks every interaction and date focus.
   * @default false
   */
  disabled?: DatePickerProps["disabled"];
  /** Month navigation and focus still work, but the value cannot change.
   * @default false
   */
  readOnly?: DatePickerProps["readOnly"];
  /** Overrides the screen-reader labels (`root`, `previousMonth`, `nextMonth`, `yearWheel`, `monthWheel`, `readOnlyRangeStart`). Defaults follow `locale`. */
  ariaLabels?: DatePickerProps["ariaLabels"];
  /** Ref exposing `navigateToDate(date)` and `focusDate(date)`. */
  actionsRef?: DatePickerProps["actionsRef"];
};

export type MDXDatePickerPropsKO = {
  /** 고르는 방식 — 날짜 하나 · 시작–끝 범위 · 여러 날짜.
   * @default "single"
   */
  selectionMode?: DatePickerProps["selectionMode"];
  /** 고른 값(제어). 날짜는 `{ year, month, day }` 이고 `month` 는 1 ~ 12 예요. `single` 은 날짜 하나, `range` 는 `{ start, end? }`, `multiple` 은 날짜 배열이에요. */
  value?: DatePickerProps["value"];
  /** 처음 값(비제어). 모양은 `value` 와 같아요. */
  defaultValue?: DatePickerProps["defaultValue"];
  /** 값이 바뀔 때 불려요. */
  onValueChange?: DatePickerProps["onValueChange"];
  /** 보는 달(제어). 그 달의 1일로 맞춰요. */
  viewDate?: DatePickerProps["viewDate"];
  /** 처음 보는 달(비제어). */
  defaultViewDate?: DatePickerProps["defaultViewDate"];
  /** 보는 달이 바뀔 때 불려요. */
  onViewDateChange?: DatePickerProps["onViewDateChange"];
  /** 오늘로 표시할 날짜. 안 주면 기기의 오늘이에요. */
  today?: DatePickerProps["today"];
  /** 달 · 요일 · 날짜 표기.
   * @default "ko-KR"
   */
  locale?: DatePickerProps["locale"];
  /** 한 주의 첫 요일(0 = 일요일).
   * @default 0
   */
  weekStartsOn?: DatePickerProps["weekStartsOn"];
  /** 넘겨 보고 고를 수 있는 해의 범위(양 끝 포함).
   * @default today.year ± 100
   */
  yearRange?: DatePickerProps["yearRange"];
  /** 고를 수 있는 날의 조건 — 모두 `true` 여야 해요. `dateOnOrAfter` · `dateOnOrBefore` 나 직접 만든 `(date) => boolean` 을 줘요. */
  constraints?: DatePickerProps["constraints"];
  /** `range` 전용 — 시작일은 그대로 두고 끝일만 바꾸게 해요. `value` 나 `defaultValue` 가 있어야 해요. */
  rangeStartReadOnly?: DatePickerProps["rangeStartReadOnly"];
  /** 모든 조작과 날짜 초점을 막아요.
   * @default false
   */
  disabled?: DatePickerProps["disabled"];
  /** 달 넘기기와 초점은 되고 값만 못 바꿔요.
   * @default false
   */
  readOnly?: DatePickerProps["readOnly"];
  /** 화면 낭독기용 이름(`root` · `previousMonth` · `nextMonth` · `yearWheel` · `monthWheel` · `readOnlyRangeStart`)을 바꿔요. 기본값은 `locale` 을 따라요. */
  ariaLabels?: DatePickerProps["ariaLabels"];
  /** `navigateToDate(date)` · `focusDate(date)` 를 밖에서 부를 수 있는 ref. */
  actionsRef?: DatePickerProps["actionsRef"];
};
