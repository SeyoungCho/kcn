"use client";

import * as React from "react";
import { Calendar } from "@repo/montage/ui/calendar";

export default function CalendarMultipleDemo() {
  const [dates, setDates] = React.useState<Date[] | undefined>(() => {
    const today = new Date();
    return [8, 13, 21].map(
      (day) => new Date(today.getFullYear(), today.getMonth(), day),
    );
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-12 border shadow-sm"
      />
    </div>
  );
}
