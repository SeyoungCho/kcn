"use client";

import * as React from "react";
import { Calendar } from "@repo/montage/ui/calendar";

export default function CalendarDisabledDemo() {
  const [today] = React.useState(() => new Date());
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        startMonth={today}
        disabled={[{ before: today }, { dayOfWeek: [0, 6] }]}
        className="rounded-12 border shadow-sm"
      />
    </div>
  );
}
