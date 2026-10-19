import * as React from "react";
import IconChevronDownSmallLine from "@karrotmarket/react-monochrome-icon/IconChevronDownSmallLine";
import IconChevronLeftLine from "@karrotmarket/react-monochrome-icon/IconChevronLeftLine";
import IconChevronRightLine from "@karrotmarket/react-monochrome-icon/IconChevronRightLine";
import { cva } from "class-variance-authority";

import { ActionButton } from "@/components/ui/action-button";
import { Icon } from "@/components/ui/icon";
import { WheelPicker } from "@/components/ui/wheel-picker";
import {
  dateOnOrAfter,
  dateOnOrBefore,
  useDatePicker,
} from "@/lib/date-picker";
import type {
  DatePickerActions,
  DatePickerCell,
  DatePickerDate,
  DatePickerMonth,
  DatePickerMultipleProps,
  DatePickerRangeProps,
  DatePickerSingleProps,
  UseDatePickerReturn,
} from "@/lib/date-picker";
import { cn } from "@/lib/utils";

// 달 이름(한 달은 제목 버튼, 두 달은 달마다) · 연속 달력의 달 이름이 같은 글자 모양을 쓴다.
const TITLE = "text-fg-neutral text-t5 font-bold whitespace-nowrap";
// 범위를 다 골랐을 때 칸 뒤에 까는 띠 — 사이의 날은 칸 폭 전부, 시작일은 오른쪽 절반, 끝일은 왼쪽 절반.
const dateCellVariants = cva("relative isolate min-h-x12 min-w-0", {
  variants: {
    band: {
      none: "",
      full: "before:[inset-inline:0]",
      start: "before:inset-s-[50%] before:inset-e-0",
      end: "before:inset-s-0 before:inset-e-[50%]",
    },
  },
  compoundVariants: [
    {
      band: ["full", "start", "end"],
      className: `before:absolute before:top-0.75 before:z-[-1] before:h-10.5
      before:bg-bg-neutral-weak before:content-['']`,
    },
  ],
  defaultVariants: { band: "none" },
});

// 손을 대면 동그라미가 눌린 색이 된다(고를 수 없는 날도 — SEED 가 그렇다). 달력 전체가 비활성일 때만 빠진다.
const HOVER = "engaged:not-data-disabled:before:bg-bg-transparent-pressed";

const dateButtonVariants = cva(
  [
    `relative isolate flex size-full min-h-x12 min-w-0 items-start
    justify-center border-0 p-0 [background:transparent] [font:inherit]
    outline-none`,
    // 동그라미 — 칸의 폭과 상관없이 42px, 위에서 3px 내려와 가운데에 놓인다
    `before:absolute before:top-0.75 before:left-1/2 before:z-[-1]
    before:size-10.5 before:rounded-full before:content-['']
    before:transform-[translateX(-50%)]`,
    // 초점 링은 동그라미 위에 따로 그린다
    `after:pointer-events-none after:absolute after:top-0.75 after:left-1/2
    after:z-2 after:size-10.5 after:rounded-full after:content-['']
    after:transform-[translateX(-50%)]`,
    `after:outline-solid after:outline-(length:--dimension-x0_5)
    after:-outline-offset-(--dimension-x0_5) after:outline-transparent
    focused:after:outline-stroke-focus-ring`,
    "after:[transition:outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
  ],
  {
    variants: {
      /** 동그라미의 바탕 — 오늘(weak) · 고른 날(solid) · 못 바꾸는 시작일(locked) */
      fill: {
        none: ["before:bg-bg-transparent", HOVER],
        weak: ["before:bg-bg-neutral-weak", HOVER],
        solid: "before:bg-bg-neutral-solid",
        locked: "before:bg-gray-600",
      },
      tone: {
        muted: "text-fg-neutral-muted",
        onSolid: "text-fg-on-neutral-solid",
        disabled: "text-fg-disabled",
      },
      cursor: {
        pointer: "cursor-pointer",
        default: "cursor-default",
        notAllowed: "cursor-not-allowed",
      },
    },
    defaultVariants: { fill: "none", tone: "muted", cursor: "pointer" },
  },
);

// 눈에는 안 보이고 읽어 주기만 하는 글자
const VISUALLY_HIDDEN =
  "absolute -m-px size-px overflow-hidden border-0 p-0 whitespace-nowrap [clip:rect(0,0,0,0)]";

const flag = (on: boolean) => (on ? "" : undefined);

function DateCell({
  api,
  cell,
}: {
  api: UseDatePickerReturn;
  cell: DatePickerCell;
}) {
  const { disabled, readOnly } = api;
  // SEED 와 같은 이름의 상태 속성을 칸과 버튼에 같이 단다.
  const state = {
    "data-today": flag(cell.isToday),
    "data-selected": flag(cell.isSelected),
    "data-range-start": flag(cell.isRangeStart),
    "data-range-end": flag(cell.isRangeEnd),
    "data-in-range": flag(cell.isInRange),
    "data-range-complete": flag(cell.isRangeComplete),
    "data-unavailable": flag(cell.isUnavailable),
    "data-range-start-readonly": flag(cell.isRangeStartReadOnly),
    "data-focused": flag(cell.isFocused),
    "data-disabled": flag(disabled),
    "data-readonly": flag(readOnly),
  };

  let band: "none" | "full" | "start" | "end" = "none";
  if (cell.isRangeComplete && cell.isInRange) band = "full";
  else if (cell.isRangeComplete && cell.isRangeStart && !cell.isRangeEnd)
    band = "start";
  else if (cell.isRangeComplete && cell.isRangeEnd && !cell.isRangeStart)
    band = "end";

  // 겹치는 상태의 앞뒤는 SEED 의 규칙 순서대로: 못 바꾸는 시작일 > 범위 사이 > 고른 날 > 오늘.
  let fill: "none" | "weak" | "solid" | "locked" = "none";
  if (cell.isRangeStartReadOnly) fill = "locked";
  else if (cell.isInRange) fill = "none";
  else if (cell.isSelected) fill = "solid";
  else if (cell.isToday) fill = "weak";

  let tone: "muted" | "onSolid" | "disabled" = "muted";
  if (disabled || cell.isUnavailable) tone = "disabled";
  else if (cell.isSelected && !cell.isInRange) tone = "onSolid";

  let cursor: "pointer" | "default" | "notAllowed" = "pointer";
  if (disabled) cursor = "default";
  else if (cell.isUnavailable) cursor = "notAllowed";
  else if (cell.isRangeStartReadOnly) cursor = "default";

  // 고를 수 없는 날은 줄을 긋는다 — 방금 고른 시작일만 빼고(끝일을 고르는 동안 시작일이 조건에 걸릴 수 있다).
  const struck =
    cell.isUnavailable && !(cell.isRangeStart && !cell.isRangeComplete);

  return (
    <div
      role="gridcell"
      aria-selected={cell.isSelected || undefined}
      data-slot="date-picker-cell"
      {...state}
      className={dateCellVariants({ band })}
    >
      <button
        type="button"
        tabIndex={!disabled && cell.isFocused ? 0 : -1}
        disabled={disabled}
        aria-label={cell.label}
        aria-current={cell.isToday ? "date" : undefined}
        aria-disabled={
          cell.isUnavailable ||
          disabled ||
          cell.isRangeStartReadOnly ||
          undefined
        }
        data-slot="date-picker-day"
        data-date-picker-date={cell.key}
        {...state}
        className={dateButtonVariants({ fill, tone, cursor })}
        onClick={() => {
          api.setFocusedDate(cell.date);
          api.selectDate(cell.date);
        }}
        onFocus={() => api.setFocusedDate(cell.date)}
        onKeyDown={api.getDayKeyDown(cell.date)}
      >
        <span
          data-slot="date-picker-day-content"
          className="relative z-1 box-border flex min-h-x12 w-full min-w-0
            flex-col items-center gap-0.75 pt-0.75 text-inherit text-t5
            font-medium tabular-nums"
        >
          <span
            data-slot="date-picker-day-number"
            className={cn(
              "flex min-h-10.5 shrink-0 items-center justify-center",
              struck && "line-through",
            )}
          >
            {cell.formattedDay}
          </span>
        </span>
      </button>
    </div>
  );
}

function NavigationButton({
  icon,
  className,
  ...props
}: Omit<
  React.ComponentProps<typeof ActionButton>,
  "variant" | "size" | "layout"
> & { icon: React.ReactElement }) {
  return (
    <ActionButton
      variant="ghost"
      size="medium"
      layout="iconOnly"
      className={cn("shrink-0", className)}
      {...props}
    >
      <Icon svg={icon} />
    </ActionButton>
  );
}

function PreviousButton({
  api,
  ...props
}: { api: UseDatePickerReturn } & React.ComponentProps<typeof ActionButton>) {
  return (
    <NavigationButton
      aria-label={api.ariaLabels.previousMonth}
      disabled={api.disabled || api.isWheelOpen || !api.canMovePrevious}
      onClick={() => api.moveView(-1)}
      icon={<IconChevronLeftLine />}
      {...props}
    />
  );
}

function NextButton({
  api,
  ...props
}: { api: UseDatePickerReturn } & React.ComponentProps<typeof ActionButton>) {
  return (
    <NavigationButton
      aria-label={api.ariaLabels.nextMonth}
      disabled={api.disabled || api.isWheelOpen || !api.canMoveNext}
      onClick={() => api.moveView(1)}
      icon={<IconChevronRightLine />}
      {...props}
    />
  );
}

// 한 달 달력의 머리 — 제목(누르면 해 · 달 고르기가 열린다)과 이전 · 다음 달 버튼.
function Header({ api }: { api: UseDatePickerReturn }) {
  return (
    <div
      data-slot="date-picker-header"
      className="flex h-x12 items-center justify-between"
    >
      <button
        type="button"
        id={`${api.rootId}-header-label`}
        aria-expanded={api.isWheelOpen}
        aria-controls={`${api.rootId}-wheel`}
        disabled={api.disabled}
        onClick={api.toggleWheel}
        data-slot="date-picker-header-label"
        className={cn(
          `inline-flex h-full min-w-0 cursor-pointer items-center gap-x1
          rounded-r2 border-0 px-x1 py-0 [background:transparent]
          font-[inherit]`,
          TITLE,
          `outline-solid outline-(length:--dimension-x0_5)
          -outline-offset-(--dimension-x0_5) outline-transparent
          focused:outline-stroke-focus-ring`,
          `[transition:outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]
          data-disabled:cursor-default`,
        )}
      >
        <span
          data-slot="date-picker-header-text"
          className="min-w-0 overflow-hidden text-ellipsis"
        >
          {api.headerLabel}
        </span>
        <span
          data-slot="date-picker-header-chevron"
          data-expanded={flag(api.isWheelOpen)}
          className="inline-flex size-x5 shrink-0 items-center justify-center
            [--icon-size:var(--dimension-x5)]
            data-expanded:transform-[rotate(180deg)]"
        >
          <Icon svg={<IconChevronDownSmallLine />} />
        </span>
      </button>
      <div
        data-slot="date-picker-navigation"
        className="flex shrink-0 items-center"
      >
        <PreviousButton api={api} />
        <NextButton api={api} />
      </div>
    </div>
  );
}

function Month({
  api,
  month,
  position,
}: {
  api: UseDatePickerReturn;
  month: DatePickerMonth;
  position?: "first" | "last";
}) {
  const labelId = `${api.rootId}-${month.key}-label`;
  return (
    <div data-slot="date-picker-month" className="min-w-0">
      {/* 두 달 달력은 달마다 이름을 적고, 첫 달에 이전 · 둘째 달에 다음 버튼을 둔다 */}
      {position ? (
        <div
          data-slot="date-picker-month-header"
          className="relative flex h-x12 items-center justify-center"
        >
          <div
            id={labelId}
            data-slot="date-picker-month-label"
            className={cn("flex size-full items-center justify-center", TITLE)}
          >
            {month.label}
          </div>
          {position === "first" ? (
            <PreviousButton
              api={api}
              data-placement="start"
              className="absolute inset-s-0 top-[4px]"
            />
          ) : (
            <NextButton
              api={api}
              data-placement="end"
              className="absolute inset-e-0 top-[4px]"
            />
          )}
        </div>
      ) : null}
      {/* SEED 는 두 달일 때 이 글자에도 위의 달 이름과 같은 id 를 달아 id 가 겹친다 — 여기서는 한 달일 때만 단다 */}
      <span
        id={position ? undefined : labelId}
        data-slot="date-picker-month-hidden-label"
        className={VISUALLY_HIDDEN}
      >
        {month.label}
      </span>
      <div
        role="grid"
        aria-labelledby={position ? labelId : `${api.rootId}-header-label`}
        aria-multiselectable={api.selectionMode === "single" ? undefined : true}
        aria-disabled={api.disabled || undefined}
        aria-readonly={api.readOnly || undefined}
        data-slot="date-picker-grid"
        className="grid min-w-0"
      >
        <div
          role="row"
          data-slot="date-picker-weekdays"
          className="relative z-2 grid grid-cols-7 bg-bg-layer-floating"
        >
          {api.weekdayLabels.map((weekday) => (
            <div
              key={weekday.key}
              role="columnheader"
              aria-label={weekday.long}
              data-slot="date-picker-weekday"
              className="flex h-x12 items-center justify-center
                text-fg-neutral-subtle text-t4 font-medium"
            >
              <span aria-hidden="true">{weekday.short}</span>
            </div>
          ))}
        </div>
        {month.weeks.map((week) => (
          <div
            key={week.key}
            role="row"
            data-slot="date-picker-week"
            className="grid grid-cols-7"
          >
            {week.cells.map((cell, index) =>
              cell ? (
                <DateCell key={cell.key} api={api} cell={cell} />
              ) : (
                <div
                  key={`${week.key}-empty-${index}`}
                  role="gridcell"
                  data-slot="date-picker-empty-cell"
                  className="min-h-x12"
                />
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

type RootElementProps = Omit<
  React.ComponentProps<"div">,
  "children" | "defaultValue" | "onChange"
>;

type DatePickerSharedProps = (
  | DatePickerSingleProps
  | DatePickerRangeProps
  | DatePickerMultipleProps
) &
  RootElementProps & {
    /** 달 옮기기 · 초점 두기를 밖에서 부를 때 */
    actionsRef?: React.Ref<DatePickerActions>;
  };

export type DatePickerProps = DatePickerSharedProps;
export type TwoMonthDatePickerProps = DatePickerSharedProps;

function DatePickerImplementation({
  ref,
  visibleRange,
  className,
  actionsRef,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  selectionMode,
  value,
  defaultValue,
  onValueChange,
  viewDate,
  defaultViewDate,
  onViewDateChange,
  today,
  locale,
  weekStartsOn,
  yearRange,
  constraints,
  disabled,
  readOnly,
  rangeStartReadOnly,
  ariaLabels,
  ...props
}: DatePickerSharedProps & { visibleRange: "month" | "twoMonths" }) {
  // 고르는 방식에 따라 값의 모양이 갈리는 props 를 다시 한 덩어리로 넘긴다(갈라 받느라 흩어진 짝을 타입이 잇지 못한다).
  const api = useDatePicker({
    visibleRange,
    selectionMode,
    value,
    defaultValue,
    onValueChange,
    viewDate,
    defaultViewDate,
    onViewDateChange,
    today,
    locale,
    weekStartsOn,
    yearRange,
    constraints,
    disabled,
    readOnly,
    rangeStartReadOnly,
    ariaLabels,
  } as Parameters<typeof useDatePicker>[0]);
  React.useImperativeHandle(actionsRef, () => api.actions, [api.actions]);

  const single = api.visibleRange === "month";
  const wheelOpen = single && api.isWheelOpen;
  const { rootRef } = api;
  const setRoot = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref, rootRef],
  );

  return (
    <div
      ref={setRoot}
      id={api.rootId}
      role="group"
      dir="ltr"
      data-slot="date-picker"
      data-disabled={flag(api.disabled)}
      data-readonly={flag(api.readOnly)}
      data-selection-mode={api.selectionMode}
      data-visible-range={api.visibleRange}
      {...props}
      aria-label={
        ariaLabelledby ? ariaLabel : (ariaLabel ?? api.ariaLabels.root)
      }
      aria-labelledby={ariaLabelledby}
      className={cn(
        `relative box-border w-full min-w-0 border-0 border-solid
        bg-bg-layer-floating text-fg-neutral-muted`,
        className,
      )}
    >
      {single ? <Header api={api} /> : null}
      {/* 해 · 달 고르기 — 달력 자리를 덮는다. 닫을 때(제목을 다시 누른다) 고른 해 · 달로 넘어간다 */}
      {wheelOpen ? (
        <div
          data-slot="date-picker-wheel"
          className="absolute top-x12 bottom-0 z-1 flex items-center
            overflow-hidden bg-bg-layer-floating [inset-inline:0]"
        >
          <WheelPicker
            id={`${api.rootId}-wheel`}
            aria-label={api.headerLabel}
            size="medium"
            itemSize={44}
            visibleItemCount={7}
            scrollFogSize={102}
            disabled={api.disabled}
            readOnly={api.readOnly}
            columns={[
              {
                id: "year",
                "aria-label": api.ariaLabels.yearWheel,
                className:
                  "flex-[0_0_120px] min-w-30 [--wheel-item-justify:flex-end]",
                options: api.wheel.yearOptions,
                value: api.wheel.yearValue,
                onValueChange: api.wheel.onYearValueChange,
                loop: false,
              },
              {
                id: "month",
                "aria-label": api.ariaLabels.monthWheel,
                className:
                  "flex-[0_0_96px] min-w-24 [--wheel-item-justify:flex-start]",
                options: api.wheel.monthOptions,
                value: api.wheel.monthValue,
                onValueChange: api.wheel.onMonthValueChange,
                loop: true,
              },
            ]}
          />
        </div>
      ) : null}
      <div
        data-slot="date-picker-months"
        data-wheel-open={flag(wheelOpen)}
        aria-hidden={wheelOpen || undefined}
        className={cn(
          "grid min-w-0 items-start",
          single ? "grid-cols-1" : "grid-cols-2 gap-x-x6",
          wheelOpen && "invisible",
        )}
      >
        {/* 두 달은 자리로 열쇠를 준다 — 달로 주면(SEED) 달을 넘길 때 둘째 달이 첫 달 자리로 옮겨 가며
            방금 누른 '다음 달' 버튼이 '이전 달' 버튼이 되어, 초점을 둔 채 다시 누르면 되돌아간다. */}
        {api.months.map((month, index) => (
          <Month
            key={single ? month.key : index}
            api={api}
            month={month}
            position={single ? undefined : index === 0 ? "first" : "last"}
          />
        ))}
      </div>
      <span
        aria-live="polite"
        aria-atomic
        data-slot="date-picker-live"
        className={VISUALLY_HIDDEN}
      >
        {api.headerLabel}
      </span>
    </div>
  );
}

/** 한 달 달력 — 날짜 하나(기본) · 범위(`selectionMode="range"`) · 여럿(`"multiple"`)을 고른다. 날짜는 `{ year, month, day }`. */
function DatePicker(props: DatePickerProps) {
  return <DatePickerImplementation {...props} visibleRange="month" />;
}

/** 두 달을 나란히 보여 주는 달력 — 범위를 고를 때 쓴다. */
function TwoMonthDatePicker(props: TwoMonthDatePickerProps) {
  return <DatePickerImplementation {...props} visibleRange="twoMonths" />;
}

export { DatePicker, TwoMonthDatePicker, dateOnOrAfter, dateOnOrBefore };
export type { DatePickerActions, DatePickerDate };
