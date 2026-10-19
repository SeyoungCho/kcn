"use client";

import { ProgressCircle } from "@repo/seed/ui/progress-circle";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const tones = ["neutral", "brand", "staticWhite"] as const;

export default function ProgressCircleTonesDemo() {
  const t = usePreviewDictionary().demos.progressCircle;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-8
        p-8"
    >
      {tones.map((tone) => (
        <div key={tone} className="flex flex-col items-center gap-2">
          <div
            className={
              tone === "staticWhite"
                ? "rounded-r2 bg-bg-neutral-solid p-x2"
                : "p-x2"
            }
          >
            <ProgressCircle tone={tone} />
          </div>
          <span className="text-t3 text-fg-neutral-muted">{t.tones[tone]}</span>
        </div>
      ))}
    </div>
  );
}
