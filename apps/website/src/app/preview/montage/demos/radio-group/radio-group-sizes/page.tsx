"use client";

import { RadioGroup, RadioGroupItem } from "@repo/montage/ui/radio-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function RadioGroupSizesDemo() {
  const t = usePreviewDictionary().demos.montage.radioGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <RadioGroup defaultValue="sm" className="w-auto">
        <label
          className="flex items-center gap-2 text-label1
            text-fg-neutral-primary"
        >
          <RadioGroupItem size="sm" value="sm" />
          {t.sizes.sm}
        </label>
        <label
          className="flex items-center gap-2 text-body2 text-fg-neutral-primary"
        >
          <RadioGroupItem size="default" value="default" />
          {t.sizes.default}
        </label>
      </RadioGroup>
    </div>
  );
}
