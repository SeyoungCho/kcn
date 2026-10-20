"use client";

import { Toggle } from "@repo/montage/ui/toggle";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToggleVariantsDemo() {
  const t = usePreviewDictionary().demos.montage.toggle;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-3
        p-8"
    >
      <div className="flex items-center gap-3">
        <Toggle variant="default">{t.variants.default}</Toggle>
        <Toggle variant="default" defaultPressed>
          {t.variants.default}
        </Toggle>
      </div>
      <div className="flex items-center gap-3">
        <Toggle variant="outline">{t.variants.outline}</Toggle>
        <Toggle variant="outline" defaultPressed>
          {t.variants.outline}
        </Toggle>
      </div>
    </div>
  );
}
