"use client";

import { ToggleGroup, ToggleGroupItem } from "@repo/montage/ui/toggle-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToggleGroupSizesDemo() {
  const t = usePreviewDictionary().demos.montage.toggleGroup;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      <ToggleGroup size="xs" defaultValue={["all"]}>
        <ToggleGroupItem value="all">{t.demo.all}</ToggleGroupItem>
        <ToggleGroupItem value="foliage">{t.demo.foliage}</ToggleGroupItem>
        <ToggleGroupItem value="succulents">
          {t.demo.succulents}
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup size="sm" defaultValue={["all"]}>
        <ToggleGroupItem value="all">{t.demo.all}</ToggleGroupItem>
        <ToggleGroupItem value="foliage">{t.demo.foliage}</ToggleGroupItem>
        <ToggleGroupItem value="succulents">
          {t.demo.succulents}
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup size="default" defaultValue={["all"]}>
        <ToggleGroupItem value="all">{t.demo.all}</ToggleGroupItem>
        <ToggleGroupItem value="foliage">{t.demo.foliage}</ToggleGroupItem>
        <ToggleGroupItem value="succulents">
          {t.demo.succulents}
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup size="lg" defaultValue={["all"]}>
        <ToggleGroupItem value="all">{t.demo.all}</ToggleGroupItem>
        <ToggleGroupItem value="foliage">{t.demo.foliage}</ToggleGroupItem>
        <ToggleGroupItem value="succulents">
          {t.demo.succulents}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
