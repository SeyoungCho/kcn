"use client";

import { Checkbox } from "@repo/montage/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CheckboxDisabledDemo() {
  const t = usePreviewDictionary().demos.montage.checkbox;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-2">
        <label
          className="flex items-center gap-2 text-body2 text-fg-disable-primary"
        >
          <Checkbox disabled />
          {t.disabled.off}
        </label>
        <label
          className="flex items-center gap-2 text-body2 text-fg-disable-primary"
        >
          <Checkbox disabled defaultChecked />
          {t.disabled.on}
        </label>
      </div>
    </div>
  );
}
