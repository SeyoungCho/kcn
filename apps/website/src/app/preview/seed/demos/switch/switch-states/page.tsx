"use client";

import { Switch } from "@repo/seed/ui/switch";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SwitchStatesDemo() {
  const t = usePreviewDictionary().demos.switch;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-4">
        <Switch label={t.states.disabled} disabled />
        <Switch label={t.states.disabledChecked} disabled defaultChecked />
      </div>
    </div>
  );
}
