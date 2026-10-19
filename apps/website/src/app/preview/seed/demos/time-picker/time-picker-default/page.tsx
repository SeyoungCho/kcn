"use client";

import * as React from "react";
import { TimePicker } from "@repo/seed/ui/time-picker";
import type { TimePickerValue } from "@repo/seed/ui/time-picker";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const pad = (value: number) => String(value).padStart(2, "0");

const subscribe = () => () => {};

export default function TimePickerDefaultDemo() {
  const t = usePreviewDictionary().demos.timePicker;
  // Node and browsers can format the Korean day period differently, so render after hydration.
  const isClient = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [value, setValue] = React.useState<TimePickerValue>({
    hour: 9,
    minute: 30,
  });

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      <div className="w-full max-w-[320px]">
        {isClient && (
          <TimePicker
            locale={t.locale}
            aria-label={t.label}
            value={value}
            onValueChange={setValue}
          />
        )}
      </div>
      <p className="text-t4 text-fg-neutral-subtle tabular-nums">
        {t.selected}: {pad(value.hour)}:{pad(value.minute)}
      </p>
    </div>
  );
}
