"use client";

import { WheelPicker } from "@repo/seed/ui/wheel-picker";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function WheelPickerColumnsDemo() {
  const t = usePreviewDictionary().demos.wheelPicker;

  const hours = Array.from({ length: 24 }, (_, hour) => ({
    value: String(hour),
    label: `${hour} ${t.columns.hourUnit}`,
  }));
  const minutes = Array.from({ length: 12 }, (_, index) => ({
    value: String(index * 5),
    label: `${index * 5} ${t.columns.minuteUnit}`,
  }));

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[320px]">
        <WheelPicker
          aria-label={t.columns.label}
          columns={[
            {
              id: "hours",
              "aria-label": t.columns.hours,
              options: hours,
              defaultValue: "1",
            },
            {
              id: "minutes",
              "aria-label": t.columns.minutes,
              options: minutes,
              defaultValue: "30",
              loop: true,
            },
          ]}
        />
      </div>
    </div>
  );
}
