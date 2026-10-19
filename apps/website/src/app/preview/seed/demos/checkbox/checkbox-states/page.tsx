"use client";

import { Checkbox } from "@repo/seed/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CheckboxStatesDemo() {
  const t = usePreviewDictionary().demos.checkbox;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-2">
        <Checkbox label={t.states.indeterminate} indeterminate />
        <Checkbox label={t.states.invalid} invalid />
        <Checkbox label={t.states.disabled} disabled />
        <Checkbox label={t.states.disabledChecked} disabled defaultChecked />
      </div>
    </div>
  );
}
