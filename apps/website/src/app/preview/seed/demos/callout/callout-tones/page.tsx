"use client";

import { Callout } from "@repo/seed/ui/callout";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const tones = [
  "neutral",
  "informative",
  "positive",
  "warning",
  "critical",
  "magic",
] as const;

export default function CalloutTonesDemo() {
  const t = usePreviewDictionary().demos.callout;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[420px] flex-col gap-3">
        {tones.map((tone) => (
          <Callout
            key={tone}
            tone={tone}
            title={t.tones[tone]}
            description={t.toneDescription}
          />
        ))}
      </div>
    </div>
  );
}
