"use client";

import { TwoMonthDatePicker } from "@repo/seed/ui/date-picker";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DatePickerTwoMonthsDemo() {
  const t = usePreviewDictionary().demos.datePicker;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[720px]">
        <TwoMonthDatePicker
          selectionMode="range"
          locale={t.locale}
          aria-label={t.rangeLabel}
          defaultViewDate={{ year: 2026, month: 10, day: 1 }}
          defaultValue={{
            start: { year: 2026, month: 10, day: 26 },
            end: { year: 2026, month: 11, day: 4 },
          }}
        />
      </div>
    </div>
  );
}
