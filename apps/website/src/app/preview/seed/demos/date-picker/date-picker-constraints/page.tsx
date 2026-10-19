"use client";

import {
  DatePicker,
  dateOnOrAfter,
  dateOnOrBefore,
} from "@repo/seed/ui/date-picker";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

// Only Oct 8 – Oct 24, and no weekends.
const constraints = [
  dateOnOrAfter({ year: 2026, month: 10, day: 8 }),
  dateOnOrBefore({ year: 2026, month: 10, day: 24 }),
  ({ year, month, day }: { year: number; month: number; day: number }) => {
    const weekday = new Date(year, month - 1, day).getDay();
    return weekday !== 0 && weekday !== 6;
  },
];

export default function DatePickerConstraintsDemo() {
  const t = usePreviewDictionary().demos.datePicker;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[360px]">
        <DatePicker
          locale={t.locale}
          aria-label={t.label}
          defaultViewDate={{ year: 2026, month: 10, day: 1 }}
          constraints={constraints}
        />
      </div>
    </div>
  );
}
