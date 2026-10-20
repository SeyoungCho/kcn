"use client";

import { ToggleGroup, ToggleGroupItem } from "@repo/montage/ui/toggle-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToggleGroupMultipleDemo() {
  const t = usePreviewDictionary().demos.montage.toggleGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ToggleGroup
        multiple
        variant="outline"
        defaultValue={["easy-care", "sale"]}
      >
        <ToggleGroupItem value="easy-care">
          {t.multiple.easyCare}
        </ToggleGroupItem>
        <ToggleGroupItem value="pet-safe">{t.multiple.petSafe}</ToggleGroupItem>
        <ToggleGroupItem value="sale">{t.multiple.sale}</ToggleGroupItem>
        <ToggleGroupItem value="new">{t.multiple.new}</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
