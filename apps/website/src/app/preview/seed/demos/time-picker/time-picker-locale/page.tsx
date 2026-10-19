"use client";

import { TimePicker } from "@repo/seed/ui/time-picker";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const locales = ["en-US", "ko-KR"] as const;

export default function TimePickerLocaleDemo() {
  const t = usePreviewDictionary().demos.timePicker;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-6
        p-8"
    >
      {locales.map((locale) => (
        <div
          key={locale}
          className="flex w-[260px] flex-col items-center gap-2"
        >
          <span className="text-t3 font-medium text-fg-neutral-subtle">
            {locale}
          </span>
          <TimePicker
            locale={locale}
            aria-label={`${t.label} (${locale})`}
            defaultValue={{ hour: 18, minute: 20 }}
          />
        </div>
      ))}
    </div>
  );
}
