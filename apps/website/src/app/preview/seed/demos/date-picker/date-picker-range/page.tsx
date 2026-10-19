"use client";

import { DatePicker } from "@repo/seed/ui/date-picker";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DatePickerRangeDemo() {
  const t = usePreviewDictionary().demos.datePicker;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[360px]">
        <DatePicker
          selectionMode="range"
          locale={t.locale}
          aria-label={t.rangeLabel}
          defaultViewDate={{ year: 2026, month: 10, day: 1 }}
          defaultValue={{
            start: { year: 2026, month: 10, day: 12 },
            end: { year: 2026, month: 10, day: 16 },
          }}
        />
      </div>
    </div>
  );
}
