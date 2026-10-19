"use client";

import { Switch } from "@repo/seed/ui/switch";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const tones = ["brand", "neutral"] as const;

export default function SwitchTonesDemo() {
  const t = usePreviewDictionary().demos.switch;

  return (
    <div className="flex min-h-screen items-center justify-center gap-8 p-8">
      {tones.map((tone) => (
        <Switch key={tone} tone={tone} label={t.tones[tone]} defaultChecked />
      ))}
    </div>
  );
}
