"use client";

import { RadioGroup, RadioGroupItem } from "@repo/montage/ui/radio-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function RadioGroupDemo() {
  const t = usePreviewDictionary().demos.montage.radioGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-2">
        <div
          id="radio-group-demo-label"
          className="text-label1 font-semibold text-fg-neutral-primary"
        >
          {t.demo.label}
        </div>
        <RadioGroup defaultValue="due" aria-labelledby="radio-group-demo-label">
          <label
            className="flex items-center gap-2 text-body2
              text-fg-neutral-primary"
          >
            <RadioGroupItem value="daily" />
            {t.demo.daily}
          </label>
          <label
            className="flex items-center gap-2 text-body2
              text-fg-neutral-primary"
          >
            <RadioGroupItem value="due" />
            {t.demo.due}
          </label>
          <label
            className="flex items-center gap-2 text-body2
              text-fg-neutral-primary"
          >
            <RadioGroupItem value="off" />
            {t.demo.off}
          </label>
        </RadioGroup>
      </div>
    </div>
  );
}
