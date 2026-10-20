"use client";

import { RadioGroup, RadioGroupItem } from "@repo/montage/ui/radio-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function RadioGroupTightDemo() {
  const t = usePreviewDictionary().demos.montage.radioGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <RadioGroup defaultValue="tight" className="w-auto">
        <label
          className="flex items-center gap-2 text-body2 text-fg-neutral-primary"
        >
          <RadioGroupItem value="default" />
          {t.tight.default}
        </label>
        <label
          className="flex items-center gap-2.5 text-body2
            text-fg-neutral-primary"
        >
          <RadioGroupItem value="tight" tight />
          {t.tight.tight}
        </label>
      </RadioGroup>
    </div>
  );
}
