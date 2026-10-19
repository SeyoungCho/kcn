"use client";

import { ChipLabel, ToggleChip } from "@repo/seed/ui/chip";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["large", "medium", "small"] as const;

export default function ChipSizesDemo() {
  const t = usePreviewDictionary().demos.chip;

  return (
    <div className="flex min-h-screen items-center justify-center gap-2 p-8">
      {sizes.map((size) => (
        <ToggleChip key={size} size={size}>
          <ChipLabel>{t.sizes[size]}</ChipLabel>
        </ToggleChip>
      ))}
    </div>
  );
}
