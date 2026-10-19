"use client";

import { Checkbox } from "@repo/seed/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = ["square", "ghost"] as const;
const tones = ["brand", "neutral"] as const;

export default function CheckboxVariantsDemo() {
  const t = usePreviewDictionary().demos.checkbox;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        {variants.map((variant) =>
          tones.map((tone) => (
            <Checkbox
              key={`${variant}-${tone}`}
              variant={variant}
              tone={tone}
              label={`${t.variants[variant]} · ${t.tones[tone]}`}
              defaultChecked
            />
          )),
        )}
      </div>
    </div>
  );
}
