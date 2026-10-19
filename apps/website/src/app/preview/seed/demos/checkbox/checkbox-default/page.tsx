"use client";

import { Checkbox } from "@repo/seed/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CheckboxDefaultDemo() {
  const t = usePreviewDictionary().demos.checkbox;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Checkbox label={t.label} defaultChecked />
    </div>
  );
}
