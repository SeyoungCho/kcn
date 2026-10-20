"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@repo/montage/ui/calendar";

export default function CalendarRangeDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>(() => {
    const today = new Date();
    return {
      from: new Date(today.getFullYear(), today.getMonth(), 12),
      to: new Date(today.getFullYear(), today.getMonth(), 16),
    };
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Calendar
        mode="range"
        resetOnSelect
        selected={range}
        onSelect={setRange}
        className="rounded-12 border shadow-sm"
      />
    </div>
  );
}
