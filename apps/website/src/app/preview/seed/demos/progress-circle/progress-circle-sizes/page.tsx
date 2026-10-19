"use client";

import { ProgressCircle } from "@repo/seed/ui/progress-circle";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["24", "40"] as const;

export default function ProgressCircleSizesDemo() {
  const t = usePreviewDictionary().demos.progressCircle;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-8
        p-8"
    >
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <ProgressCircle size={size} tone="brand" />
          <span className="text-t3 text-fg-neutral-muted">{t.sizes[size]}</span>
        </div>
      ))}
    </div>
  );
}
