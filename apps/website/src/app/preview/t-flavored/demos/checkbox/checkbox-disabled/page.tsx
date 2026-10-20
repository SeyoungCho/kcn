"use client";

import { Checkbox } from "@repo/t-flavored/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CheckboxDisabledDemo() {
  const t = usePreviewDictionary().demos.tFlavored.checkbox;

  return (
    <div className="flex min-h-screen items-center justify-center gap-2 p-8">
      <Checkbox defaultChecked disabled aria-label={t.disabled} />
      <Checkbox disabled aria-label={t.disabled} />
      <Checkbox
        variant="line"
        defaultChecked
        disabled
        aria-label={t.disabled}
      />
      <Checkbox variant="line" disabled aria-label={t.disabled} />
    </div>
  );
}
