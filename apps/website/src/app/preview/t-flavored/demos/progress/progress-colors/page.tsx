"use client";

import { Progress } from "@repo/t-flavored/ui/progress";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ProgressColorsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.progress;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[360px] flex-col gap-4">
        <Progress value={70} aria-label={t.label} />
        <Progress
          value={70}
          aria-label={t.label}
          className="**:data-[slot=progress-indicator]:bg-green-400"
        />
        <Progress
          value={70}
          aria-label={t.label}
          className="**:data-[slot=progress-indicator]:bg-red-400"
        />
      </div>
    </div>
  );
}
