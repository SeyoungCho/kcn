import * as React from "react";

import { WheelPicker } from "@/components/ui/wheel-picker";
import type {
  WheelPickerColumn,
  WheelPickerProps,
  WheelPickerValueChangeDetails,
} from "@/components/ui/wheel-picker";
import { cn } from "@/lib/utils";

const ITEM_SIZE = 44;
const VISIBLE_ITEM_COUNT = 5;
const DEFAULT_VALUE: TimePickerValue = { hour: 0, minute: 0 };
const DEFAULT_LOCALE = "ko-KR";
const DEFAULT_MINUTE_STEP = 5;
const VALID_MINUTE_STEPS: readonly MinuteStep[] = [1, 5, 10, 15, 30];
const DEFAULT_ARIA_LABELS = {
  ko: { root: "시간 선택", period: "오전/오후", hour: "시", minute: "분" },
  en: { root: "Select time", period: "AM/PM", hour: "Hour", minute: "Minute" },
  ja: { root: "時刻を選択", period: "午前/午後", hour: "時", minute: "分" },
};

export interface TimePickerValue {
  /** 24시간으로 적은 시(0 ~ 23) */
  hour: number;
  /** 분(0 ~ 59) */
  minute: number;
}

/** 분 열에서 고를 수 있는 값의 간격 */
export type MinuteStep = 1 | 5 | 10 | 15 | 30;

type TimePickerColumnType = "period" | "hour" | "minute";

export interface TimePickerProps extends Omit<
  WheelPickerProps,
  | "columns"
  | "itemSize"
  | "readOnly"
  | "scrollFogSize"
  | "size"
  | "visibleItemCount"
  | "defaultValue"
> {
  /** 시각 — 24시간으로 주고받는다 */
  value?: TimePickerValue;
  /** 값을 밖에서 쥐지 않을 때의 처음 시각(기본 0시 0분) */
  defaultValue?: TimePickerValue;
  /** 휠이 한 항목에 멈춰 값이 정해질 때 불린다 */
  onValueChange?: (value: TimePickerValue) => void;
  /** 분 열의 간격 — 간격에 맞지 않는 값은 가장 가까운 값으로 맞춘다(기본 5) */
  minuteStep?: MinuteStep;
  /** 오전 · 오후와 숫자의 표기, 열의 순서를 정한다(기본 ko-KR) */
  locale?: string | string[];
  /** 오전 · 오후 열을 읽어 주는 이름 */
  periodAriaLabel?: string;
  /** 시 열을 읽어 주는 이름 */
  hourAriaLabel?: string;
  /** 분 열을 읽어 주는 이름 */
  minuteAriaLabel?: string;
}

function assertValidValue(
  value: TimePickerValue,
  name: "value" | "defaultValue",
) {
  if (!Number.isInteger(value.hour) || value.hour < 0 || value.hour > 23)
    throw new RangeError(
      `TimePicker: ${name}.hour 는 0 이상 23 이하의 정수여야 합니다.`,
    );
  if (!Number.isInteger(value.minute) || value.minute < 0 || value.minute > 59)
    throw new RangeError(
      `TimePicker: ${name}.minute 은 0 이상 59 이하의 정수여야 합니다.`,
    );
}

// 간격에 맞지 않는 분은 가장 가까운 값으로 — 59분을 5분 간격에 맞추면 다음 시 0분이 된다.
function normalizeToMinuteStep(
  value: TimePickerValue,
  minuteStep: MinuteStep,
): TimePickerValue {
  if (value.minute % minuteStep === 0) return value;
  const rounded =
    (Math.round((value.hour * 60 + value.minute) / minuteStep) * minuteStep) %
    (24 * 60);
  return { hour: Math.floor(rounded / 60), minute: rounded % 60 };
}

const getPeriod = (hour: number) => (hour < 12 ? "am" : "pm");
const getDisplayHour = (hour: number) => (hour % 12 === 0 ? 12 : hour % 12);
const addHours = (hour: number, amount: number) =>
  (hour + (amount % 24) + 24) % 24;
const formatDate = (hour: number, minute = 0) =>
  new Date(Date.UTC(2020, 0, 1, hour, minute));

function getDefaultAriaLabels(locale: string | string[] | undefined) {
  const [canonical = DEFAULT_LOCALE] = Intl.getCanonicalLocales(
    locale ?? DEFAULT_LOCALE,
  );
  const language = new Intl.Locale(canonical).language;
  if (language === "ko") return DEFAULT_ARIA_LABELS.ko;
  if (language === "ja") return DEFAULT_ARIA_LABELS.ja;
  return DEFAULT_ARIA_LABELS.en;
}

// 표기와 열의 순서는 Intl 에서 얻는다(한국어: 오전/오후 · 시 · 분).
function createFormats(localeKey: string) {
  const locales = localeKey === "" ? [] : localeKey.split(",");
  const dateTime = new Intl.DateTimeFormat(locales, {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h12",
    timeZone: "UTC",
  });
  const hour = new Intl.NumberFormat(locales);
  const minute = new Intl.NumberFormat(locales, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const dayPeriod = (at: number, fallback: string) =>
    dateTime
      .formatToParts(formatDate(at))
      .find((part) => part.type === "dayPeriod")?.value ?? fallback;

  const types: Partial<
    Record<Intl.DateTimeFormatPartTypes, TimePickerColumnType>
  > = { dayPeriod: "period", hour: "hour", minute: "minute" };
  const order = dateTime
    .formatToParts(formatDate(13, 5))
    .map((part) => types[part.type])
    .filter((type): type is TimePickerColumnType => type !== undefined);
  for (const type of ["period", "hour", "minute"] as const)
    if (!order.includes(type)) order.push(type);

  return {
    order,
    periodOptions: [
      { value: "am", label: dayPeriod(1, "AM") },
      { value: "pm", label: dayPeriod(13, "PM") },
    ],
    hourOptions: Array.from({ length: 12 }, (_, index) => ({
      value: String(index + 1),
      label: hour.format(index + 1),
    })),
    formatMinute: (value: number) => minute.format(value),
  };
}

// 열마다 다른 것 — 시는 오른쪽에 붙여 분과 나란히 읽히게 한다.
const columnClassNames: Record<TimePickerColumnType, string> = {
  period: "",
  hour: "[--wheel-item-justify:flex-end]",
  minute: "",
};

const renderLabel = (option: { label: React.ReactNode }) => (
  <div
    data-slot="time-picker-item"
    className="px-x4 text-t10-static font-medium tabular-nums"
  >
    {option.label}
  </div>
);

/**
 * 휠을 돌려 오전 · 오후, 시, 분을 고르는 12시간제 시각 고르기.
 * 값은 오전 · 오후를 따로 두지 않고 24시간으로 적은 `{ hour, minute }` 로 주고받는다.
 */
function TimePicker({
  value: valueProp,
  defaultValue,
  onValueChange,
  minuteStep = DEFAULT_MINUTE_STEP,
  locale = DEFAULT_LOCALE,
  disabled = false,
  periodAriaLabel,
  hourAriaLabel,
  minuteAriaLabel,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...props
}: TimePickerProps) {
  if (!VALID_MINUTE_STEPS.includes(minuteStep))
    throw new RangeError(
      `TimePicker: minuteStep 은 ${VALID_MINUTE_STEPS.join(", ")} 중 하나여야 합니다.`,
    );
  if (valueProp !== undefined) assertValidValue(valueProp, "value");
  if (defaultValue !== undefined)
    assertValidValue(defaultValue, "defaultValue");

  const [innerValue, setInnerValue] = React.useState(
    defaultValue ?? DEFAULT_VALUE,
  );
  const value = normalizeToMinuteStep(valueProp ?? innerValue, minuteStep);
  const setValue = (next: TimePickerValue) => {
    if (disabled) return;
    if (valueProp === undefined) setInnerValue(next);
    onValueChange?.(next);
  };

  const localeKey = Intl.getCanonicalLocales(locale).join(",");
  const formats = React.useMemo(() => createFormats(localeKey), [localeKey]);
  const minuteOptions = React.useMemo(
    () =>
      Array.from({ length: 60 / minuteStep }, (_, index) => ({
        value: String(index * minuteStep),
        label: formats.formatMinute(index * minuteStep),
      })),
    [formats, minuteStep],
  );

  const defaultAriaLabels = getDefaultAriaLabels(locale);
  const period = getPeriod(value.hour);

  const columns: Record<TimePickerColumnType, Omit<WheelPickerColumn, "id">> = {
    period: {
      "aria-label": periodAriaLabel ?? defaultAriaLabels.period,
      options: formats.periodOptions,
      value: period,
      onValueChange: (next: string) => {
        if (next !== period)
          setValue({
            hour: next === "am" ? value.hour - 12 : value.hour + 12,
            minute: value.minute,
          });
      },
    },
    hour: {
      "aria-label": hourAriaLabel ?? defaultAriaLabels.hour,
      options: formats.hourOptions,
      value: String(getDisplayHour(value.hour)),
      loop: true,
      // 움직인 칸 수만큼 시를 더한다 — 11 에서 12 로 넘어가면 오전 · 오후가 바뀐다.
      onValueChange: (
        _next: string,
        details: WheelPickerValueChangeDetails,
      ) => {
        const hour = addHours(value.hour, details.stepDelta);
        if (hour !== value.hour) setValue({ hour, minute: value.minute });
      },
    },
    minute: {
      "aria-label": minuteAriaLabel ?? defaultAriaLabels.minute,
      options: minuteOptions,
      value: String(value.minute),
      loop: true,
      onValueChange: (next: string) => {
        const minute = Number(next);
        if (minute !== value.minute) setValue({ hour: value.hour, minute });
      },
    },
  };

  return (
    <WheelPicker
      data-slot="time-picker"
      columns={formats.order.map((type) => ({
        id: type,
        className: columnClassNames[type],
        renderLabel,
        ...columns[type],
      }))}
      itemSize={ITEM_SIZE}
      visibleItemCount={VISIBLE_ITEM_COUNT}
      disabled={disabled}
      aria-label={
        ariaLabelledby ? ariaLabel : (ariaLabel ?? defaultAriaLabels.root)
      }
      aria-labelledby={ariaLabelledby}
      className={cn("h-55 w-full", className)}
      {...props}
    />
  );
}

export { TimePicker };
