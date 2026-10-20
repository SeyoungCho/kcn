"use client";

import { ChipLabel, RadioChipItem, RadioChipRoot } from "@repo/seed/ui/chip";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const categories = [
  "all",
  "foliage",
  "succulents",
  "herbs",
  "flowers",
] as const;

export default function ChipRadioDemo() {
  const t = usePreviewDictionary().demos.chip;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <RadioChipRoot
        defaultValue="all"
        aria-label={t.categoryLabel}
        className="flex flex-wrap justify-center gap-2"
      >
        {categories.map((category) => (
          <RadioChipItem
            key={category}
            value={category}
            disabled={category === "flowers"}
          >
            <ChipLabel>{t.categories[category]}</ChipLabel>
          </RadioChipItem>
        ))}
      </RadioChipRoot>
    </div>
  );
}
