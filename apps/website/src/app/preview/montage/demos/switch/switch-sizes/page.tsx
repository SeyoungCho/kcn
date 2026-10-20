"use client";

import { Switch } from "@repo/montage/ui/switch";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SwitchSizesDemo() {
  const t = usePreviewDictionary().demos.montage.switch;

  return (
    <div className="flex min-h-screen items-center justify-center gap-6 p-8">
      <Switch size="sm" defaultChecked aria-label={t.sizes.sm} />
      <Switch size="default" defaultChecked aria-label={t.sizes.default} />
    </div>
  );
}
