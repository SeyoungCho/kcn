"use client";

import { Checkbox } from "@repo/montage/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CheckboxTightDemo() {
  const t = usePreviewDictionary().demos.montage.checkbox;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-2">
        <label
          className="flex items-center gap-2 text-body2 text-fg-neutral-primary"
        >
          <Checkbox />
          {t.tight.default}
        </label>
        <label
          className="flex items-center gap-2.5 text-body2
            text-fg-neutral-primary"
        >
          <Checkbox tight />
          {t.tight.tight}
        </label>
      </div>
    </div>
  );
}
