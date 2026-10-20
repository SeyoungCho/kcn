"use client";

import { Checkbox } from "@repo/montage/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CheckboxSizesDemo() {
  const t = usePreviewDictionary().demos.montage.checkbox;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-2">
        <label
          className="flex items-center gap-2 text-label1
            text-fg-neutral-primary"
        >
          <Checkbox size="sm" defaultChecked />
          {t.sizes.sm}
        </label>
        <label
          className="flex items-center gap-2 text-body2 text-fg-neutral-primary"
        >
          <Checkbox size="default" defaultChecked />
          {t.sizes.default}
        </label>
      </div>
    </div>
  );
}
