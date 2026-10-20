"use client";

import { Progress } from "@repo/montage/ui/progress";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["default", "md", "lg"] as const;

export default function ProgressSizesDemo() {
  const t = usePreviewDictionary().demos.montage.progress;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[360px] flex-col gap-6">
        {sizes.map((size) => (
          <Progress key={size} value={60} size={size} aria-label={t.label} />
        ))}
      </div>
    </div>
  );
}
