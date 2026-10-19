"use client";

import * as React from "react";
import { TimePicker } from "@repo/seed/ui/time-picker";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const subscribe = () => () => {};

export default function TimePickerDisabledDemo() {
  const t = usePreviewDictionary().demos.timePicker;
  // Node and browsers can format the Korean day period differently, so render after hydration.
  const isClient = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[320px]">
        {isClient && (
          <TimePicker
            locale={t.locale}
            aria-label={t.states.disabled}
            disabled
            defaultValue={{ hour: 9, minute: 0 }}
          />
        )}
      </div>
    </div>
  );
}
