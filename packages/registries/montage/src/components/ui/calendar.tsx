"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  DateLib,
  DayButton,
  DayPicker,
  getDefaultClassNames,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { type ButtonProps, buttonVariants } from "@/components/ui/button";

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /** 이전 · 다음 달 버튼의 Button variant */
  buttonVariant?: ButtonProps["variant"];
};

// shadcn Calendar 에 montage 의 모양을 입혔다.
// 한 달은 늘 6주로 그리고(fixedWeeks), 기간(range) 선택에서는 다른 달의 날을 감춘다.
// 여러 달을 나란히 두면 달 이름을 가운데로 모으고 이전 · 다음 버튼을 양 끝으로 벌린다.
function Calendar({
  className,
  classNames,
  showOutsideDays,
  fixedWeeks = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays ?? props.mode !== "range"}
      fixedWeeks={fixedWeeks}
      captionLayout={captionLayout}
      className={cn(
        "group/calendar bg-surface-elevated-primary",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      formatters={{
        // 요일은 한 글자로(S M T … / 일 월 화 …)
        formatWeekdayName: (weekday, options, dateLib = new DateLib(options)) =>
          dateLib.format(weekday, "ccccc"),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col sm:flex-row",
          defaultClassNames.months,
        ),
        month: cn("flex flex-col px-3 pb-4", defaultClassNames.month),
        nav: cn(
          `absolute inset-x-4 top-4.5 flex items-center justify-end gap-2
          group-data-[multiple-months=true]/calendar:justify-between`,
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant, size: "icon-xs" }),
          `[--interaction-active:0.09] [--interaction-hover:0.0375]
          after:scale-95 after:transition-[opacity,scale] hover:after:scale-100
          active:after:scale-100 aria-disabled:pointer-events-none
          aria-disabled:text-fg-disable-primary`,
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant, size: "icon-xs" }),
          `[--interaction-active:0.09] [--interaction-hover:0.0375]
          after:scale-95 after:transition-[opacity,scale] hover:after:scale-100
          active:after:scale-100 aria-disabled:pointer-events-none
          aria-disabled:text-fg-disable-primary`,
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          `flex h-13.5 items-center px-3 pt-5 pb-2.5
          group-data-[multiple-months=true]/calendar:justify-center`,
          defaultClassNames.month_caption,
        ),
        dropdowns: cn("flex items-center gap-4", defaultClassNames.dropdowns),
        // 달 · 해 고르기는 글자 버튼처럼 — 덮개 막이 글자보다 조금 넓다
        dropdown_root: cn(
          `relative isolate rounded-10 after:pointer-events-none after:absolute
          after:-inset-x-2 after:-inset-y-1 after:-z-10 after:rounded-[inherit]
          after:bg-fg-neutral-primary after:opacity-0 after:transition-opacity
          after:duration-150 hover:after:opacity-5 active:after:opacity-12
          has-focus-visible:outline-2 has-focus-visible:outline-offset-4
          has-focus-visible:outline-ring has-focus-visible:outline-solid`,
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute inset-0 cursor-pointer bg-popover opacity-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "text-body2 font-semibold text-fg-neutral-primary select-none",
          captionLayout !== "label" &&
            "flex items-center gap-1 [&>svg]:size-[18px]",
          defaultClassNames.caption_label,
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          `flex size-9 items-center justify-center text-caption2 font-medium
          text-fg-neutral-tertiary select-none`,
          defaultClassNames.weekday,
        ),
        week: cn("mt-0.5 flex", defaultClassNames.week),
        week_number_header: cn(
          "size-9 select-none",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-caption2 font-medium text-fg-neutral-tertiary select-none",
          defaultClassNames.week_number,
        ),
        // 기간의 띠는 칸(td)에 깐다 — 양 끝 칸은 안쪽 절반만, 하루짜리 기간은 양쪽이 다 잘려 띠가 없다
        day: cn(
          `relative flex size-9 items-center justify-center p-0 text-center
          select-none before:absolute before:inset-x-0 before:inset-y-0.5`,
          defaultClassNames.day,
        ),
        range_start: cn(
          "before:start-1/2 before:bg-surface-brand-primary/8",
          defaultClassNames.range_start,
        ),
        range_middle: cn(
          "before:bg-surface-brand-primary/8",
          defaultClassNames.range_middle,
        ),
        range_end: cn(
          "before:end-1/2 before:bg-surface-brand-primary/8",
          defaultClassNames.range_end,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon
                data-slot="calendar-chevron"
                className={cn("size-[18px]", className)}
                {...props}
              />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                data-slot="calendar-chevron"
                className={cn("size-[18px]", className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon
              data-slot="calendar-chevron"
              className={cn("size-[18px]", className)}
              {...props}
            />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td data-slot="calendar-week-number" {...props}>
              <div
                className="flex size-9 items-center justify-center text-center"
              >
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

// 날짜 버튼. 고른 날은 파란 원, 오늘은 옅은 파란 원에 파란 글자.
// 다른 달의 날 · 고를 수 없는 날은 글자만 흐리게(muted) — 고른 날 · 오늘이어도 원은 그대로 둔다.
const calendarDayButtonVariants = cva(
  `relative isolate flex size-8 cursor-pointer items-center justify-center
  rounded-full text-label2 font-medium outline-none select-none
  [--interaction-active:0.09] [--interaction-hover:0.0375]
  after:pointer-events-none after:absolute after:inset-0 after:-z-10
  after:rounded-[inherit] after:bg-fg-neutral-primary after:opacity-0
  after:transition-opacity after:duration-150
  hover:after:opacity-(--interaction-hover) focus-visible:after:opacity-6
  active:after:opacity-(--interaction-active) disabled:pointer-events-none
  [&:not(:hover):not(:active)]:after:transition-none`,
  {
    variants: {
      state: {
        default: "text-fg-neutral-primary",
        today: "bg-surface-brand-primary/8 text-fg-brand-primary",
        selected: "bg-surface-brand-primary text-white",
      },
      muted: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        state: "default",
        muted: true,
        className: "text-fg-neutral-quaternary",
      },
      { state: "today", muted: true, className: "text-fg-disable-primary" },
      { state: "selected", muted: true, className: "text-white/43" },
    ],
    defaultVariants: {
      state: "default",
      muted: false,
    },
  },
);

type CalendarDayButtonProps = React.ComponentProps<typeof DayButton>;

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: CalendarDayButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  // 기간의 가운데 날은 띠만 깔고 원은 그리지 않는다
  const selected = modifiers.selected && !modifiers.range_middle;

  return (
    <button
      ref={ref}
      data-slot="calendar-day-button"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        calendarDayButtonVariants({
          state: selected ? "selected" : modifiers.today ? "today" : "default",
          muted: modifiers.outside || modifiers.disabled,
        }),
        className,
      )}
      {...props}
    />
  );
}

export {
  Calendar,
  CalendarDayButton,
  calendarDayButtonVariants,
  type CalendarProps,
  type CalendarDayButtonProps,
};
