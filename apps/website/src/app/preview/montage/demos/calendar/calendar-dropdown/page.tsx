"use client";

import * as React from "react";
import { Calendar } from "@repo/montage/ui/calendar";

export default function CalendarDropdownDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Calendar
        mode="single"
        captionLayout="dropdown"
        selected={date}
        onSelect={setDate}
        className="rounded-12 border shadow-sm"
      />
    </div>
  );
}
