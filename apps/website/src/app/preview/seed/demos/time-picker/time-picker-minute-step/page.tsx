"use client";

import { TimePicker } from "@repo/seed/ui/time-picker";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TimePickerMinuteStepDemo() {
  const t = usePreviewDictionary().demos.timePicker;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[320px]">
        <TimePicker
          locale={t.locale}
          aria-label={t.label}
          minuteStep={15}
          defaultValue={{ hour: 14, minute: 45 }}
        />
      </div>
    </div>
  );
}
