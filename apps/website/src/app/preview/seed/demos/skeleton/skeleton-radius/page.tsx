"use client";

import { Skeleton } from "@repo/seed/ui/skeleton";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const radii = ["0", "8", "16", "full"] as const;

export default function SkeletonRadiusDemo() {
  const t = usePreviewDictionary().demos.skeleton;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-6
        p-8"
    >
      {radii.map((radius) => (
        <div key={radius} className="flex flex-col items-center gap-2">
          <Skeleton radius={radius} width={64} height={64} />
          <span className="text-t3 text-fg-neutral-muted">
            {t.radius[radius]}
          </span>
        </div>
      ))}
    </div>
  );
}
