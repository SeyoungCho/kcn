"use client";

import { DatePicker } from "@repo/seed/ui/date-picker";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DatePickerMultipleDemo() {
  const t = usePreviewDictionary().demos.datePicker;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[360px]">
        <DatePicker
          selectionMode="multiple"
          locale={t.locale}
          aria-label={t.multipleLabel}
          defaultViewDate={{ year: 2026, month: 10, day: 1 }}
          defaultValue={[
            { year: 2026, month: 10, day: 6 },
            { year: 2026, month: 10, day: 13 },
            { year: 2026, month: 10, day: 20 },
          ]}
        />
      </div>
    </div>
  );
}
