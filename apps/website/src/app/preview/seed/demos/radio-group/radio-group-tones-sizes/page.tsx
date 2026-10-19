"use client";

import { RadioGroup, RadioGroupItem } from "@repo/seed/ui/radio-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const tones = ["brand", "neutral"] as const;
const sizes = ["medium", "large"] as const;

export default function RadioGroupTonesSizesDemo() {
  const t = usePreviewDictionary().demos.radioGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex gap-12">
        {tones.map((tone) => (
          <RadioGroup key={tone} label={t.tones[tone]} defaultValue="large">
            {sizes.map((size) => (
              <RadioGroupItem
                key={size}
                value={size}
                tone={tone}
                size={size}
                label={t.sizes[size]}
              />
            ))}
          </RadioGroup>
        ))}
      </div>
    </div>
  );
}
