"use client";

import * as React from "react";
import { ko } from "react-day-picker/locale";
import { Calendar } from "@repo/montage/ui/calendar";

export default function CalendarLocaleDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Calendar
        mode="single"
        locale={ko}
        selected={date}
        onSelect={setDate}
        className="rounded-12 border shadow-sm"
      />
    </div>
  );
}
