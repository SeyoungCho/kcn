"use client";

import { Checkbox } from "@repo/t-flavored/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = ["circle", "line"] as const;

export default function CheckboxVariantsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.checkbox;

  return (
    <div className="flex min-h-screen items-center justify-center gap-10 p-8">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              variant={variant}
              defaultChecked
              aria-label={`${t.variants[variant]} ${t.variants.checked}`}
            />
            <Checkbox
              variant={variant}
              aria-label={`${t.variants[variant]} ${t.variants.unchecked}`}
            />
          </div>
          <span className="text-t7 text-grey-600">{t.variants[variant]}</span>
        </div>
      ))}
    </div>
  );
}
