"use client";

import { ToggleGroup, ToggleGroupItem } from "@repo/montage/ui/toggle-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToggleGroupDemo() {
  const t = usePreviewDictionary().demos.montage.toggleGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ToggleGroup defaultValue={["all"]}>
        <ToggleGroupItem value="all">{t.demo.all}</ToggleGroupItem>
        <ToggleGroupItem value="foliage">{t.demo.foliage}</ToggleGroupItem>
        <ToggleGroupItem value="succulents">
          {t.demo.succulents}
        </ToggleGroupItem>
        <ToggleGroupItem value="herbs">{t.demo.herbs}</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
