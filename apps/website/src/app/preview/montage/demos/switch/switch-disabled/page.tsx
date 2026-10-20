"use client";

import { Switch } from "@repo/montage/ui/switch";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SwitchDisabledDemo() {
  const t = usePreviewDictionary().demos.montage.switch;

  return (
    <div className="flex min-h-screen items-center justify-center gap-6 p-8">
      <Switch disabled aria-label={t.disabled.off} />
      <Switch disabled defaultChecked aria-label={t.disabled.on} />
    </div>
  );
}
