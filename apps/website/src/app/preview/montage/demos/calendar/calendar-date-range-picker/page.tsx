"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button } from "@repo/montage/ui/button";
import { Calendar } from "@repo/montage/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/montage/ui/popover";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

function formatDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}.${month}.${day}`;
}

export default function CalendarDateRangePickerDemo() {
  const t = usePreviewDictionary().demos.montage.calendar;
  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange | undefined>();

  return (
    <div className="flex min-h-screen items-start justify-center p-8">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              data-empty={!range?.from}
              className="w-72 justify-between font-normal
                data-[empty=true]:text-muted-foreground"
            />
          }
        >
          {range?.from ? (
            <span>
              {formatDate(range.from)}
              {range.to && ` – ${formatDate(range.to)}`}
            </span>
          ) : (
            t.pickTripDates
          )}
          <CalendarIcon />
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            resetOnSelect
            numberOfMonths={2}
            selected={range}
            defaultMonth={range?.from}
            onSelect={(value) => {
              setRange(value);
              if (value?.from && value.to) setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
