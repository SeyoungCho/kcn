"use client";

import { Switch } from "@repo/seed/ui/switch";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SwitchDefaultDemo() {
  const t = usePreviewDictionary().demos.switch;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Switch label={t.label} defaultChecked />
    </div>
  );
}
