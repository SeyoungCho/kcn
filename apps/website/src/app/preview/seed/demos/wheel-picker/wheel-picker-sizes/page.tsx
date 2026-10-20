"use client";

import { WheelPicker } from "@repo/seed/ui/wheel-picker";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["small", "medium"] as const;

export default function WheelPickerSizesDemo() {
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
      {sizes.map((size) => (
        <div key={size} className="flex w-[220px] flex-col items-center gap-2">
          <span className="text-t3 font-medium text-fg-neutral-subtle">
            {t.sizes[size]}
          </span>
          <WheelPicker
            size={size}
            aria-label={t.sizes[size]}
            columns={[
              {
                id: "plant",
                "aria-label": t.plantLabel,
                options,
                defaultValue: "oliveTree",
              },
            ]}
          />
        </div>
      ))}
    </div>
  );
}
