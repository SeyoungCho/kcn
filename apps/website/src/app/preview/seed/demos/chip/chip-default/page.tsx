"use client";

import { ChipLabel, ToggleChip } from "@repo/seed/ui/chip";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ChipDefaultDemo() {
  const t = usePreviewDictionary().demos.chip;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ToggleChip defaultChecked>
        <ChipLabel>{t.label}</ChipLabel>
      </ToggleChip>
    </div>
  );
}
