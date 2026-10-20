"use client";

import { RadioGroup, RadioGroupItem } from "@repo/seed/ui/radio-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function RadioGroupHorizontalDemo() {
  const t = usePreviewDictionary().demos.radioGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <RadioGroup
        label={t.label}
        defaultValue="earlyMorning"
        className="flex-row gap-x4"
      >
        <RadioGroupItem value="standard" label={t.options.standard} />
        <RadioGroupItem value="earlyMorning" label={t.options.earlyMorning} />
        <RadioGroupItem value="pickup" label={t.options.pickup} />
      </RadioGroup>
    </div>
  );
}
