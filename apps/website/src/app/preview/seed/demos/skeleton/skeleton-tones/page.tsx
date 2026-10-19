"use client";

import { Skeleton } from "@repo/seed/ui/skeleton";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const tones = ["neutral", "magic"] as const;

export default function SkeletonTonesDemo() {
  const t = usePreviewDictionary().demos.skeleton;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[360px] flex-col gap-4">
        {tones.map((tone) => (
          <div key={tone} className="flex flex-col gap-2">
            <span className="text-t3 text-fg-neutral-muted">
              {t.tones[tone]}
            </span>
            <Skeleton tone={tone} radius="16" width="full" height={80} />
          </div>
        ))}
      </div>
    </div>
  );
}
