"use client";

import { RadioGroup, RadioGroupItem } from "@repo/montage/ui/radio-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function RadioGroupDisabledDemo() {
  const t = usePreviewDictionary().demos.montage.radioGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-2">
        <div
          id="radio-group-disabled-label"
          className="text-label1 font-semibold text-fg-neutral-primary"
        >
          {t.disabled.label}
        </div>
        <RadioGroup
          defaultValue="none"
          aria-labelledby="radio-group-disabled-label"
        >
          <label
            className="flex items-center gap-2 text-body2
              text-fg-neutral-primary"
          >
            <RadioGroupItem value="none" />
            {t.disabled.none}
          </label>
          <label
            className="flex items-center gap-2 text-body2
              text-fg-neutral-primary"
          >
            <RadioGroupItem value="paper" />
            {t.disabled.paper}
          </label>
          <label
            className="flex items-center gap-2 text-body2
              text-fg-disable-primary"
          >
            <RadioGroupItem value="box" disabled />
            {t.disabled.box}
          </label>
        </RadioGroup>
      </div>
    </div>
  );
}
