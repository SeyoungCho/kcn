"use client";

import * as React from "react";
import { DatePicker } from "@repo/seed/ui/date-picker";
import type { DatePickerDate } from "@repo/seed/ui/date-picker";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DatePickerDefaultDemo() {
  const t = usePreviewDictionary().demos.datePicker;
  const [value, setValue] = React.useState<DatePickerDate>();

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      <div className="w-full max-w-[360px]">
        <DatePicker
          locale={t.locale}
          aria-label={t.label}
          value={value}
          onValueChange={setValue}
        />
      </div>
      <p className="text-t4 text-fg-neutral-subtle">
        {t.selected}:{" "}
        {value
          ? new Date(value.year, value.month - 1, value.day).toLocaleDateString(
              t.locale,
            )
          : t.none}
      </p>
    </div>
  );
}
