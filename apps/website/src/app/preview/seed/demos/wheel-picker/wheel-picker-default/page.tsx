"use client";

import * as React from "react";
import { WheelPicker } from "@repo/seed/ui/wheel-picker";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function WheelPickerDefaultDemo() {
  const t = usePreviewDictionary().demos.wheelPicker;
  const [value, setValue] = React.useState("blueberry");

  const options = Object.entries(t.fruits).map(([key, label]) => ({
    value: key,
    label,
  }));
  const selected = options.find((option) => option.value === value);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      <div className="w-full max-w-[320px]">
        <WheelPicker
          aria-label={t.fruitLabel}
          columns={[
            {
              id: "fruit",
              "aria-label": t.fruitLabel,
              options,
              value,
              onValueChange: setValue,
            },
          ]}
        />
      </div>
      <p className="text-t4 text-fg-neutral-subtle">
        {t.selected}: {selected?.label}
      </p>
    </div>
  );
}
