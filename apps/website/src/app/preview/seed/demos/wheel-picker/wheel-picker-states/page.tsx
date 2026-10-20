"use client";

import { WheelPicker } from "@repo/seed/ui/wheel-picker";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const states = ["disabled", "readOnly"] as const;

export default function WheelPickerStatesDemo() {
  const t = usePreviewDictionary().demos.wheelPicker;

  const options = Object.entries(t.plants).map(([key, label]) => ({
    value: key,
    label,
  }));

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-6
        p-8"
    >
      {states.map((state) => (
        <div key={state} className="flex w-[220px] flex-col items-center gap-2">
          <span className="text-t3 font-medium text-fg-neutral-subtle">
            {t.states[state]}
          </span>
          <WheelPicker
            aria-label={t.states[state]}
            disabled={state === "disabled"}
            readOnly={state === "readOnly"}
            columns={[
              {
                id: "plant",
                "aria-label": t.plantLabel,
                options,
                defaultValue: "pothos",
              },
            ]}
          />
        </div>
      ))}
    </div>
  );
}
