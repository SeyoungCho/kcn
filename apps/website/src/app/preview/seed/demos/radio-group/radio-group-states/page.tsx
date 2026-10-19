"use client";

import { RadioGroup, RadioGroupItem } from "@repo/seed/ui/radio-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function RadioGroupStatesDemo() {
  const t = usePreviewDictionary().demos.radioGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[320px] flex-col gap-6">
        <RadioGroup
          label={t.states.invalid}
          invalid
          errorMessage={t.errorMessage}
        >
          <RadioGroupItem value="standard" label={t.options.standard} />
          <RadioGroupItem value="express" label={t.options.express} />
        </RadioGroup>
        <RadioGroup label={t.states.disabled} disabled defaultValue="standard">
          <RadioGroupItem value="standard" label={t.options.standard} />
          <RadioGroupItem value="express" label={t.options.express} />
        </RadioGroup>
        <RadioGroup label={t.states.disabledItem} defaultValue="standard">
          <RadioGroupItem value="standard" label={t.options.standard} />
          <RadioGroupItem value="pickup" label={t.options.pickup} disabled />
        </RadioGroup>
      </div>
    </div>
  );
}
