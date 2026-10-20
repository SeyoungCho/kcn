"use client";

import { Switch } from "@repo/t-flavored/ui/switch";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SwitchDisabledDemo() {
  const t = usePreviewDictionary().demos.tFlavored.switch;

  return (
    <div className="flex min-h-screen items-center justify-center gap-2 p-8">
      <Switch defaultChecked disabled aria-label={t.disabled} />
      <Switch disabled aria-label={t.disabled} />
    </div>
  );
}
