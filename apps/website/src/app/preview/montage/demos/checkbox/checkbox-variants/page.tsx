"use client";

import { Checkbox } from "@repo/montage/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CheckboxVariantsDemo() {
  const t = usePreviewDictionary().demos.montage.checkbox;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-2">
        <label
          className="flex items-center gap-2 text-body2 text-fg-neutral-primary"
        >
          <Checkbox variant="default" defaultChecked />
          {t.variants.default}
        </label>
        <label
          className="flex items-center gap-2 text-body2 text-fg-neutral-primary"
        >
          <Checkbox variant="circle" defaultChecked />
          {t.variants.circle}
        </label>
        <label
          className="flex items-center gap-2 text-body2 text-fg-neutral-primary"
        >
          <Checkbox variant="check" defaultChecked />
          {t.variants.check}
        </label>
      </div>
    </div>
  );
}
