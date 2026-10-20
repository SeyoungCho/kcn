import type { CalendarProps } from "@repo/montage/ui/calendar";
import type { DateRange, Matcher } from "react-day-picker";

export type MDXCalendarProps = {
  /**
   * Selection mode.
   * @remarks `"single" | "multiple" | "range"`
   */
  mode?: CalendarProps["mode"];
  /**
   * Selected value: a `Date` in single mode, `Date[]` in multiple mode, a `DateRange` in range mode.
   * @remarks `Date | Date[] | DateRange`
   */
  selected?: Date | Date[] | DateRange;
  /**
   * Called when the selection changes.
   * @remarks `(selected: Date | Date[] | DateRange | undefined) => void`
   */
  onSelect?: (selected: Date | Date[] | DateRange | undefined) => void;
  /** Month shown when the calendar first renders. */
  defaultMonth?: CalendarProps["defaultMonth"];
  /**
   * Number of months shown side by side.
   * @default 1
   */
  numberOfMonths?: CalendarProps["numberOfMonths"];
  /**
   * Shows the month as a label or as month and year dropdowns.
   * @remarks `"label" | "dropdown" | "dropdown-months" | "dropdown-years"`
   * @default "label"
   */
  captionLayout?: CalendarProps["captionLayout"];
  /**
   * Days that can't be selected.
   * @remarks `Matcher | Matcher[]`
   */
  disabled?: Matcher | Matcher[];
  /** Earliest month you can navigate to. */
  startMonth?: CalendarProps["startMonth"];
  /** Latest month you can navigate to. */
  endMonth?: CalendarProps["endMonth"];
  /**
   * Shows days from the previous and next months.
   * @default true (false in range mode)
   */
  showOutsideDays?: CalendarProps["showOutsideDays"];
  /**
   * Always renders six weeks so the height doesn't change between months.
   * @default true
   */
  fixedWeeks?: CalendarProps["fixedWeeks"];
  /**
   * In range mode, a click after a complete range starts a new one.
   * @default false
   */
  resetOnSelect?: boolean;
  /** Locale from `react-day-picker/locale` for month and weekday names. */
  locale?: CalendarProps["locale"];
  /**
   * Button variant of the previous and next month buttons.
   * @default "ghost"
   */
  buttonVariant?: CalendarProps["buttonVariant"];
};

export type MDXCalendarPropsKO = {
  /**
   * 고르는 방식.
   * @remarks `"single" | "multiple" | "range"`
   */
  mode?: CalendarProps["mode"];
  /**
   * 고른 값 — single 은 `Date`, multiple 은 `Date[]`, range 는 `DateRange` 예요.
   * @remarks `Date | Date[] | DateRange`
   */
  selected?: Date | Date[] | DateRange;
  /**
   * 고른 값이 바뀔 때 불려요.
   * @remarks `(selected: Date | Date[] | DateRange | undefined) => void`
   */
  onSelect?: (selected: Date | Date[] | DateRange | undefined) => void;
  /** 처음 보여 줄 달. */
  defaultMonth?: CalendarProps["defaultMonth"];
  /**
   * 나란히 보여 줄 달의 수.
   * @default 1
   */
  numberOfMonths?: CalendarProps["numberOfMonths"];
  /**
   * 달 이름을 글자로 보여 줄지, 달 · 해 드롭다운으로 보여 줄지 정해요.
   * @remarks `"label" | "dropdown" | "dropdown-months" | "dropdown-years"`
   * @default "label"
   */
  captionLayout?: CalendarProps["captionLayout"];
  /**
   * 고를 수 없는 날.
   * @remarks `Matcher | Matcher[]`
   */
  disabled?: Matcher | Matcher[];
  /** 넘겨 볼 수 있는 가장 이른 달. */
  startMonth?: CalendarProps["startMonth"];
  /** 넘겨 볼 수 있는 가장 늦은 달. */
  endMonth?: CalendarProps["endMonth"];
  /**
   * 앞뒤 달의 날도 보여 줘요.
   * @default true (range 에서는 false)
   */
  showOutsideDays?: CalendarProps["showOutsideDays"];
  /**
   * 늘 6주를 그려 달마다 높이가 같아요.
   * @default true
   */
  fixedWeeks?: CalendarProps["fixedWeeks"];
  /**
   * range 에서 기간을 다 고른 뒤 누르면 새 기간을 시작해요.
   * @default false
   */
  resetOnSelect?: boolean;
  /** 달 · 요일 이름에 쓸 `react-day-picker/locale` 의 로캘. */
  locale?: CalendarProps["locale"];
  /**
   * 이전 · 다음 달 버튼의 Button variant.
   * @default "ghost"
   */
  buttonVariant?: CalendarProps["buttonVariant"];
};
