"use client";

import { ChipLabel, ToggleChip } from "@repo/seed/ui/chip";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = ["solid", "outlineStrong", "outlineWeak"] as const;

export default function ChipVariantsDemo() {
  const t = usePreviewDictionary().demos.chip;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      {variants.map((variant) => (
        <div key={variant} className="flex items-center gap-2">
          <ToggleChip variant={variant}>
            <ChipLabel>{t.variants[variant]}</ChipLabel>
          </ToggleChip>
          <ToggleChip variant={variant} defaultChecked>
            <ChipLabel>{t.variants[variant]}</ChipLabel>
          </ToggleChip>
          <ToggleChip variant={variant} disabled>
            <ChipLabel>{t.disabled}</ChipLabel>
          </ToggleChip>
        </div>
      ))}
    </div>
  );
}
