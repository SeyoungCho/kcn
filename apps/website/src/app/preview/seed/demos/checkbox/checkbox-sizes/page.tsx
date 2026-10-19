"use client";

import { Checkbox } from "@repo/seed/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["medium", "large"] as const;

export default function CheckboxSizesDemo() {
  const t = usePreviewDictionary().demos.checkbox;

  return (
    <div className="flex min-h-screen items-center justify-center gap-8 p-8">
      {sizes.map((size) => (
        <Checkbox key={size} size={size} label={t.sizes[size]} defaultChecked />
      ))}
    </div>
  );
}
