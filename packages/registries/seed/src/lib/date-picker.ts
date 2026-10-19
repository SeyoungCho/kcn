import * as React from "react";

/**
 * 달력의 머리 없는 논리 — SEED 의 `@seed-design/react-date-picker` 에서 한 달 · 두 달 달력에 쓰는 부분을 옮겼다.
 * 날짜 셈 · 고르는 방식(하나 · 범위 · 여럿) · 제약 · 키보드 이동 · 보는 달 넘기기 · 해/달 고르기 상태를 맡고,
 * 그리는 일은 `@/components/ui/date-picker` 가 한다.
 */

/** 시각과 시간대가 없는 그레고리력 날짜 */
export interface DatePickerDate {
  year: number;
  /** 1 ~ 12 */
  month: number;
  day: number;
}

export interface DatePickerRangeValue {
  start: DatePickerDate;
  /** 시작일만 고른 동안에는 없다 */
  end?: DatePickerDate;
}

export type DatePickerSelectionMode = "single" | "range" | "multiple";
export type DatePickerVisibleRange = "month" | "twoMonths";
export type DatePickerValue =
  | DatePickerDate
  | DatePickerRangeValue
  | readonly DatePickerDate[]
  | undefined;
export type DatePickerWeekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface DatePickerConstraintContext {
  selectionMode: DatePickerSelectionMode;
  value: DatePickerValue;
  /** 범위에서 끝일을 고르는 중일 때의 시작일 */
  rangeStart: DatePickerDate | undefined;
  /** 고르려는 것인지, 이미 고른 날을 푸는 것인지 */
  action: "select" | "deselect";
}

/** 고를 수 있는 날이면 true. `(date) => boolean` 처럼 인자 하나만 받아도 된다 */
export type DatePickerConstraint = (
  candidate: DatePickerDate,
  context: DatePickerConstraintContext,
) => boolean;

export interface DatePickerAriaLabels {
  root: string;
  previousMonth: string;
  nextMonth: string;
  yearWheel: string;
  monthWheel: string;
  readOnlyRangeStart: string;
}

export interface DatePickerActions {
  /** 그 날짜가 보이게 달을 옮기고 탭이 멈출 칸을 바꾼다. 초점은 옮기지 않는다 */
  navigateToDate: (date: DatePickerDate) => void;
  /** 그 날짜가 보이게 달을 옮기고 그 칸에 초점을 둔다 */
  focusDate: (date: DatePickerDate) => void;
}

interface CommonProps {
  /** 보는 달(제어). 그 달의 1일로 맞춘다 */
  viewDate?: DatePickerDate;
  /** 처음 보는 달(비제어) */
  defaultViewDate?: DatePickerDate;
  onViewDateChange?: (value: DatePickerDate) => void;
  /** 오늘로 표시할 날짜 — 안 주면 기기의 오늘 */
  today?: DatePickerDate;
  /** 달 · 요일 · 날짜 표기 @default "ko-KR" */
  locale?: string;
  /** 한 주의 첫 요일(0 = 일요일) @default 0 */
  weekStartsOn?: DatePickerWeekday;
  /** 넘겨 보고 고를 수 있는 해의 범위(양 끝 포함) @default today.year ± 100 */
  yearRange?: { start: number; end: number };
  /** 고를 수 있는 날의 조건 — 모두 true 여야 고를 수 있다 */
  constraints?: readonly DatePickerConstraint[];
  /** 모든 조작과 날짜 초점을 막는다 */
  disabled?: boolean;
  /** 달 넘기기와 초점은 되고 값만 못 바꾼다 */
  readOnly?: boolean;
  ariaLabels?: Partial<DatePickerAriaLabels>;
}

interface ValueProps<Value, ChangeValue = Value> {
  value?: Value;
  defaultValue?: Value;
  onValueChange?: (value: ChangeValue) => void;
}

export interface DatePickerSingleProps
  extends CommonProps, ValueProps<DatePickerDate> {
  selectionMode?: "single";
  rangeStartReadOnly?: never;
}

export interface DatePickerRangeProps
  extends CommonProps, ValueProps<DatePickerRangeValue> {
  selectionMode: "range";
  /** 시작일은 그대로 두고 끝일만 바꾸게 한다(value 나 defaultValue 가 있어야 한다) */
  rangeStartReadOnly?: boolean;
}

export interface DatePickerMultipleProps
  extends CommonProps, ValueProps<readonly DatePickerDate[], DatePickerDate[]> {
  selectionMode: "multiple";
  rangeStartReadOnly?: never;
}

export type UseDatePickerProps = (
  | DatePickerSingleProps
  | DatePickerRangeProps
  | DatePickerMultipleProps
) & {
  visibleRange?: DatePickerVisibleRange;
};

/** 날짜 칸 하나의 상태 */
export interface DatePickerCell {
  key: string;
  date: DatePickerDate;
  /** locale 에 맞춘 날짜 숫자 */
  formattedDay: string;
  /** 읽어 줄 이름(요일까지 든 온전한 날짜) */
  label: string;
  isToday: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  /** 시작일과 끝일 사이 */
  isInRange: boolean;
  /** 범위의 끝일까지 골랐는지 */
  isRangeComplete: boolean;
  /** 제약 때문에 고를 수 없는 날 */
  isUnavailable: boolean;
  isRangeStartReadOnly: boolean;
  /** 탭이 멈출 칸 */
  isFocused: boolean;
}

export interface DatePickerWeek {
  key: string;
  /** 그 달에 들지 않는 자리는 null */
  cells: readonly (DatePickerCell | null)[];
}

export interface DatePickerMonth {
  key: string;
  date: DatePickerDate;
  label: string;
  weeks: readonly DatePickerWeek[];
}

// ── 날짜 셈 ─────────────────────────────────────────────────────────────────
// 시간대에 흔들리지 않게 UTC 자정으로만 셈한다.

const toUtc = ({ year, month, day }: DatePickerDate) => {
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  return date;
};

const fromUtc = (date: Date): DatePickerDate => ({
  year: date.getUTCFullYear(),
  month: date.getUTCMonth() + 1,
  day: date.getUTCDate(),
});

export const compareDates = (a: DatePickerDate, b: DatePickerDate) =>
  a.year - b.year || a.month - b.month || a.day - b.day;

export const isSameDate = (
  a: DatePickerDate | undefined,
  b: DatePickerDate | undefined,
) => a !== undefined && b !== undefined && compareDates(a, b) === 0;

export const dateKey = ({ year, month, day }: DatePickerDate) =>
  `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export const getDaysInMonth = ({
  year,
  month,
}: Pick<DatePickerDate, "year" | "month">) => {
  const date = new Date(0);
  date.setUTCFullYear(year, month, 0);
  return date.getUTCDate();
};

export const addDays = (date: DatePickerDate, days: number) => {
  const next = toUtc(date);
  next.setUTCDate(next.getUTCDate() + days);
  return fromUtc(next);
};

// 달 · 해를 옮길 때 그 달에 없는 날(31일 · 2월 29일)은 그 달의 마지막 날로 당긴다.
export const addMonths = (
  date: DatePickerDate,
  months: number,
): DatePickerDate => {
  const index = date.year * 12 + (date.month - 1) + months;
  const year = Math.floor(index / 12);
  const month = index - year * 12 + 1;
  return {
    year,
    month,
    day: Math.min(date.day, getDaysInMonth({ year, month })),
  };
};

export const addYears = (date: DatePickerDate, years: number) =>
  addMonths(date, years * 12);

export const startOfMonth = (date: DatePickerDate): DatePickerDate => ({
  year: date.year,
  month: date.month,
  day: 1,
});

const getWeekStart = (date: DatePickerDate, weekStartsOn: DatePickerWeekday) =>
  addDays(date, -((toUtc(date).getUTCDay() - weekStartsOn + 7) % 7));

/** 그 달이 걸친 주들의 첫날 */
const getMonthWeekStarts = (
  month: DatePickerDate,
  weekStartsOn: DatePickerWeekday,
) => {
  const first = startOfMonth(month);
  const lastWeek = getWeekStart(
    { ...first, day: getDaysInMonth(first) },
    weekStartsOn,
  );
  const result: DatePickerDate[] = [];
  for (
    let cursor = getWeekStart(first, weekStartsOn);
    compareDates(cursor, lastWeek) <= 0;
    cursor = addDays(cursor, 7)
  )
    result.push(cursor);
  return result;
};

const getLocalToday = (): DatePickerDate => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
};

const clampToYearRange = (
  date: DatePickerDate,
  { start, end }: { start: number; end: number },
): DatePickerDate => {
  if (date.year < start) return { year: start, month: 1, day: 1 };
  if (date.year > end) return { year: end, month: 12, day: 31 };
  return date;
};

// ── 제약 ────────────────────────────────────────────────────────────────────

/** 그 날짜부터(그날 포함) 고를 수 있게 한다 */
export function dateOnOrAfter(minDate: DatePickerDate): DatePickerConstraint {
  return (candidate) => compareDates(candidate, minDate) >= 0;
}

/** 그 날짜까지(그날 포함) 고를 수 있게 한다 */
export function dateOnOrBefore(maxDate: DatePickerDate): DatePickerConstraint {
  return (candidate) => compareDates(candidate, maxDate) <= 0;
}

// ── 상태 ────────────────────────────────────────────────────────────────────

const DEFAULT_ARIA_LABELS: Record<"ko" | "en", DatePickerAriaLabels> = {
  ko: {
    root: "날짜 선택",
    previousMonth: "이전 달",
    nextMonth: "다음 달",
    yearWheel: "연도",
    monthWheel: "월",
    readOnlyRangeStart: "읽기 전용 시작일",
  },
  en: {
    root: "Select date",
    previousMonth: "Previous month",
    nextMonth: "Next month",
    yearWheel: "Year",
    monthWheel: "Month",
    readOnlyRangeStart: "read-only start date",
  },
};

const EMPTY_CONSTRAINTS: readonly DatePickerConstraint[] = [];

// 밖에서 값을 주면(undefined 가 아니면) 그 값을 따르고, 아니면 안에서 기억한다. 바뀌면 onChange 로 알린다.
function useControllableState<T>(
  prop: T | undefined,
  defaultProp: T | undefined,
  onChange: ((value: T) => void) | undefined,
) {
  const [inner, setInner] = React.useState(defaultProp);
  const controlled = prop !== undefined;
  const value = controlled ? prop : inner;
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const setValue = React.useCallback(
    (next: T) => {
      if (!controlled) setInner(next);
      onChangeRef.current?.(next);
    },
    [controlled],
  );
  return [value, setValue] as const;
}

const firstSelected = (
  mode: DatePickerSelectionMode,
  value: DatePickerValue,
) => {
  if (mode === "single") return value as DatePickerDate | undefined;
  if (mode === "range")
    return (value as DatePickerRangeValue | undefined)?.start;
  return [...((value as readonly DatePickerDate[] | undefined) ?? [])].sort(
    compareDates,
  )[0];
};

export type UseDatePickerReturn = ReturnType<typeof useDatePicker>;

export function useDatePicker(props: UseDatePickerProps) {
  const selectionMode: DatePickerSelectionMode =
    props.selectionMode ?? "single";
  const visibleRange: DatePickerVisibleRange = props.visibleRange ?? "month";
  const locale = props.locale ?? "ko-KR";
  const weekStartsOn = props.weekStartsOn ?? 0;
  const today = props.today ?? getLocalToday();
  const yearRangeStart = props.yearRange?.start ?? today.year - 100;
  const yearRangeEnd = props.yearRange?.end ?? today.year + 100;
  const yearRange = React.useMemo(
    () => ({ start: yearRangeStart, end: yearRangeEnd }),
    [yearRangeStart, yearRangeEnd],
  );

  const [value, setValue] = useControllableState<DatePickerValue>(
    props.value,
    props.defaultValue ?? (selectionMode === "multiple" ? [] : undefined),
    props.onValueChange as ((value: DatePickerValue) => void) | undefined,
  );

  const initialSelected = firstSelected(
    selectionMode,
    props.value ?? props.defaultValue,
  );
  const defaultView = startOfMonth(
    clampToYearRange(
      props.viewDate ?? props.defaultViewDate ?? initialSelected ?? today,
      yearRange,
    ),
  );
  const [viewDateState, setViewDateState] =
    useControllableState<DatePickerDate>(
      props.viewDate ? startOfMonth(props.viewDate) : undefined,
      defaultView,
      props.onViewDateChange,
    );
  const viewDate = viewDateState ?? defaultView;
  const viewKey = dateKey(viewDate);

  const [focusedDate, setFocusedDate] = React.useState<DatePickerDate>(
    initialSelected ?? viewDate,
  );
  const [isWheelOpen, setIsWheelOpen] = React.useState(false);
  const [wheelViewDate, setWheelViewDate] =
    React.useState<DatePickerDate>(viewDate);
  const rootId = React.useId();
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  // 키보드로 옮겼을 때만 초점을 따라 옮긴다(달을 넘기거나 눌러 고를 때는 그대로 둔다).
  const shouldMoveDomFocusRef = React.useRef(false);
  // 같은 날짜를 다시 청해도 초점을 옮기는 효과가 돌게 한 번 더 그린다.
  const [, requestDomFocusCommit] = React.useReducer(
    (request: number) => request + 1,
    0,
  );

  const constraints = props.constraints ?? EMPTY_CONSTRAINTS;
  const language = locale.split("-")[0];
  const ariaLabels = React.useMemo(
    () => ({
      ...(language === "ko" ? DEFAULT_ARIA_LABELS.ko : DEFAULT_ARIA_LABELS.en),
      ...props.ariaLabels,
    }),
    [language, props.ariaLabels],
  );
  const disabled = props.disabled ?? false;
  const readOnly = props.readOnly ?? false;
  const rangeStartReadOnly =
    selectionMode === "range" && props.rangeStartReadOnly === true;

  // 글자는 SEED 와 같은 Intl 설정으로 만든다(달 이름 · 요일 · 날짜 숫자가 글자 하나까지 같아야 한다).
  const format = React.useMemo(() => {
    const day = new Intl.NumberFormat(locale);
    const month = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      timeZone: "UTC",
    });
    const fullDate = new Intl.DateTimeFormat(locale, {
      dateStyle: "full",
      timeZone: "UTC",
    });
    return {
      day: (date: DatePickerDate) => day.format(date.day),
      month: (date: DatePickerDate) => month.format(toUtc(date)),
      fullDate: (date: DatePickerDate) => fullDate.format(toUtc(date)),
    };
  }, [locale]);

  const weekdayLabels = React.useMemo(() => {
    const short = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      timeZone: "UTC",
    });
    const long = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      timeZone: "UTC",
    });
    const anchor = getWeekStart({ year: 2024, month: 1, day: 7 }, weekStartsOn);
    return Array.from({ length: 7 }, (_, index) => {
      const date = addDays(anchor, index);
      return {
        key: dateKey(date),
        short: short.format(toUtc(date)),
        long: long.format(toUtc(date)),
      };
    });
  }, [locale, weekStartsOn]);

  const isUnavailable = React.useCallback(
    (date: DatePickerDate) => {
      if (date.year < yearRange.start || date.year > yearRange.end) return true;
      const range =
        selectionMode === "range"
          ? (value as DatePickerRangeValue | undefined)
          : undefined;
      if (rangeStartReadOnly && isSameDate(date, range?.start)) return false;
      if (
        rangeStartReadOnly &&
        range?.start !== undefined &&
        compareDates(date, range.start) < 0
      )
        return true;
      const multiple =
        selectionMode === "multiple"
          ? (value as readonly DatePickerDate[])
          : undefined;
      const context: DatePickerConstraintContext = {
        selectionMode,
        value,
        rangeStart:
          rangeStartReadOnly || range?.end === undefined
            ? range?.start
            : undefined,
        action: multiple?.some((selected) => isSameDate(selected, date))
          ? "deselect"
          : "select",
      };
      return constraints.some((constraint) => !constraint(date, context));
    },
    [constraints, rangeStartReadOnly, selectionMode, value, yearRange],
  );

  const setViewDate = React.useCallback(
    (date: DatePickerDate) => {
      const next = startOfMonth(clampToYearRange(date, yearRange));
      if (dateKey(next) !== viewKey) setViewDateState(next);
    },
    [setViewDateState, viewKey, yearRange],
  );

  const actions: DatePickerActions = React.useMemo(
    () => ({
      navigateToDate(date) {
        shouldMoveDomFocusRef.current = false;
        setFocusedDate(date);
        setViewDate(date);
      },
      focusDate(date) {
        shouldMoveDomFocusRef.current = true;
        setFocusedDate(date);
        setViewDate(date);
        requestDomFocusCommit();
      },
    }),
    [setViewDate],
  );

  const selectDate = (date: DatePickerDate) => {
    if (disabled || readOnly || isUnavailable(date)) return;

    if (selectionMode === "single") {
      if (!isSameDate(value as DatePickerDate | undefined, date))
        setValue(date);
      return;
    }
    if (selectionMode === "multiple") {
      const current = [
        ...((value as readonly DatePickerDate[] | undefined) ?? []),
      ];
      const index = current.findIndex((selected) => isSameDate(selected, date));
      if (index >= 0) current.splice(index, 1);
      else current.push(date);
      setValue(current.sort(compareDates));
      return;
    }

    const range = value as DatePickerRangeValue | undefined;
    if (rangeStartReadOnly) {
      if (
        range === undefined ||
        compareDates(date, range.start) <= 0 ||
        isSameDate(date, range.end)
      )
        return;
      setValue({ start: range.start, end: date });
      return;
    }
    // 끝일까지 골랐거나, 시작일보다 앞을 누르면 그날부터 다시 고른다.
    if (
      range === undefined ||
      range.end !== undefined ||
      compareDates(date, range.start) < 0
    )
      setValue({ start: date });
    else setValue({ start: range.start, end: date });
  };

  // 지금 보이는 날의 처음과 끝
  const lastVisibleMonth =
    visibleRange === "twoMonths" ? addMonths(viewDate, 1) : viewDate;
  const visibleEnd = {
    ...lastVisibleMonth,
    day: getDaysInMonth(lastVisibleMonth),
  };
  const isVisible = (date: DatePickerDate) =>
    compareDates(date, viewDate) >= 0 && compareDates(date, visibleEnd) <= 0;

  const moveFocus = (nextDate: DatePickerDate) => {
    const clamped = clampToYearRange(nextDate, yearRange);
    shouldMoveDomFocusRef.current = true;
    setFocusedDate(clamped);
    // 보이는 달 밖으로 나갈 때만 달을 넘긴다.
    if (!isVisible(clamped)) setViewDate(clamped);
  };

  // 달을 넘겨 탭이 멈출 칸이 사라지면 보는 달의 첫날로 옮긴다.
  const focusedVisible = isVisible(focusedDate);
  React.useEffect(() => {
    if (!focusedVisible) setFocusedDate(viewDate);
    // viewDate 는 그릴 때마다 새 객체일 수 있어 열쇠로 본다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedVisible, viewKey]);

  React.useLayoutEffect(() => {
    if (!shouldMoveDomFocusRef.current) return;
    const button = rootRef.current?.querySelector<HTMLElement>(
      `[data-date-picker-date="${dateKey(focusedDate)}"]`,
    );
    if (!button) return;
    shouldMoveDomFocusRef.current = false;
    button.focus();
  });

  const range =
    selectionMode === "range"
      ? (value as DatePickerRangeValue | undefined)
      : undefined;
  const isRangeComplete = range?.end !== undefined;

  const getCell = (date: DatePickerDate): DatePickerCell => {
    const isRangeStart = isSameDate(range?.start, date);
    const isRangeEnd = isSameDate(range?.end, date);
    const isInRange =
      range?.end !== undefined &&
      compareDates(date, range.start) > 0 &&
      compareDates(date, range.end) < 0;
    let isSelected: boolean;
    if (selectionMode === "single")
      isSelected = isSameDate(value as DatePickerDate | undefined, date);
    else if (selectionMode === "multiple")
      isSelected = (
        (value as readonly DatePickerDate[] | undefined) ?? []
      ).some((selected) => isSameDate(selected, date));
    else isSelected = isRangeStart || isRangeEnd || isInRange;
    const isRangeStartReadOnly = rangeStartReadOnly && isRangeStart;
    return {
      key: dateKey(date),
      date,
      formattedDay: format.day(date),
      label: isRangeStartReadOnly
        ? `${format.fullDate(date)}, ${ariaLabels.readOnlyRangeStart}`
        : format.fullDate(date),
      isToday: isSameDate(today, date),
      isSelected,
      isRangeStart,
      isRangeEnd,
      isInRange,
      isRangeComplete,
      isUnavailable: isUnavailable(date),
      isRangeStartReadOnly,
      isFocused: isSameDate(focusedDate, date),
    };
  };

  const createMonth = (monthDate: DatePickerDate): DatePickerMonth => {
    const month = startOfMonth(monthDate);
    return {
      key: dateKey(month),
      date: month,
      label: format.month(month),
      weeks: getMonthWeekStarts(month, weekStartsOn).map((weekStart) => ({
        key: dateKey(weekStart),
        cells: Array.from({ length: 7 }, (_, index) => {
          const date = addDays(weekStart, index);
          return date.month === month.month && date.year === month.year
            ? getCell(date)
            : null;
        }),
      })),
    };
  };

  const months =
    visibleRange === "twoMonths"
      ? [createMonth(viewDate), createMonth(addMonths(viewDate, 1))]
      : [createMonth(viewDate)];

  const getDayKeyDown =
    (date: DatePickerDate) => (event: React.KeyboardEvent) => {
      if (event.defaultPrevented || event.nativeEvent.isComposing) return;
      const pageStep = visibleRange === "twoMonths" ? 2 : 1;
      let nextDate: DatePickerDate;
      switch (event.key) {
        case "ArrowLeft":
          nextDate = addDays(date, -1);
          break;
        case "ArrowRight":
          nextDate = addDays(date, 1);
          break;
        case "ArrowUp":
          nextDate = addDays(date, -7);
          break;
        case "ArrowDown":
          nextDate = addDays(date, 7);
          break;
        case "Home":
          nextDate = getWeekStart(date, weekStartsOn);
          break;
        case "End":
          nextDate = addDays(getWeekStart(date, weekStartsOn), 6);
          break;
        case "PageUp":
          nextDate = event.shiftKey
            ? addYears(date, -1)
            : addMonths(date, -pageStep);
          break;
        case "PageDown":
          nextDate = event.shiftKey
            ? addYears(date, 1)
            : addMonths(date, pageStep);
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          selectDate(date);
          return;
        default:
          return;
      }
      event.preventDefault();
      moveFocus(nextDate);
    };

  const moveView = (direction: -1 | 1) => {
    if (isWheelOpen) return;
    const next = clampToYearRange(addMonths(viewDate, direction), yearRange);
    setViewDate(next);
    setFocusedDate(startOfMonth(next));
  };

  // ── 해 · 달 고르기(제목을 누르면 달력 자리에 열린다) ──
  const wheelOptions = React.useMemo(() => {
    const year = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      timeZone: "UTC",
    });
    const month = new Intl.DateTimeFormat(locale, {
      month: "long",
      timeZone: "UTC",
    });
    return {
      yearOptions: Array.from(
        { length: yearRange.end - yearRange.start + 1 },
        (_, index) => {
          const value = yearRange.start + index;
          return {
            value: String(value),
            label: year.format(toUtc({ year: value, month: 1, day: 1 })),
          };
        },
      ),
      monthOptions: Array.from({ length: 12 }, (_, index) => ({
        value: String(index + 1),
        label: month.format(toUtc({ year: 2024, month: index + 1, day: 1 })),
      })),
    };
  }, [locale, yearRange]);

  // 닫을 때 고른 해 · 달을 보는 달에 반영한다.
  const closeWheel = () => {
    if (!isWheelOpen) return;
    setIsWheelOpen(false);
    if (
      wheelViewDate.year === viewDate.year &&
      wheelViewDate.month === viewDate.month
    )
      return;
    setViewDate(wheelViewDate);
    setFocusedDate(clampToYearRange(wheelViewDate, yearRange));
  };
  const toggleWheel = () => {
    if (isWheelOpen) {
      closeWheel();
      return;
    }
    setWheelViewDate(viewDate);
    setIsWheelOpen(true);
  };

  return {
    selectionMode,
    visibleRange,
    value,
    viewDate,
    focusedDate,
    today,
    disabled,
    readOnly,
    rootId,
    rootRef,
    weekdayLabels,
    months,
    /** 한 달이면 그 달, 두 달이면 '첫 달 – 둘째 달' */
    headerLabel:
      visibleRange === "twoMonths"
        ? `${format.month(viewDate)} – ${format.month(addMonths(viewDate, 1))}`
        : format.month(viewDate),
    ariaLabels,
    actions,
    canMovePrevious: viewDate.year > yearRange.start || viewDate.month > 1,
    canMoveNext: viewDate.year < yearRange.end || viewDate.month < 12,
    moveView,
    selectDate,
    setFocusedDate,
    getDayKeyDown,
    isWheelOpen,
    toggleWheel,
    closeWheel,
    wheel: {
      ...wheelOptions,
      yearValue: String(wheelViewDate.year),
      monthValue: String(wheelViewDate.month),
      onYearValueChange: (year: string) =>
        setWheelViewDate((current) => ({
          year: Number(year),
          month: current.month,
          day: 1,
        })),
      onMonthValueChange: (month: string) =>
        setWheelViewDate((current) => ({
          year: current.year,
          month: Number(month),
          day: 1,
        })),
    },
  };
}
