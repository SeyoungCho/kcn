"use client";

import { Toggle } from "@repo/montage/ui/toggle";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToggleDisabledDemo() {
  const t = usePreviewDictionary().demos.montage.toggle;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-3
        p-8"
    >
      <div className="flex items-center gap-3">
        <Toggle disabled>{t.disabled.off}</Toggle>
        <Toggle disabled defaultPressed>
          {t.disabled.on}
        </Toggle>
      </div>
      <div className="flex items-center gap-3">
        <Toggle variant="outline" disabled>
          {t.disabled.off}
        </Toggle>
        <Toggle variant="outline" disabled defaultPressed>
          {t.disabled.on}
        </Toggle>
      </div>
    </div>
  );
}
