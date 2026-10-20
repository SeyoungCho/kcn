"use client";

import type { CSSProperties } from "react";
import { Skeleton } from "@repo/t-flavored/ui/skeleton";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const delay = (index: number) =>
  ({ "--skeleton-delay": `${index * 0.1}s` }) as CSSProperties;

export default function SkeletonListDemo() {
  const t = usePreviewDictionary().demos.tFlavored.skeleton;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        role="status"
        aria-label={t.loading}
        className="flex w-full max-w-[420px] flex-col px-6 pt-6
          mask-[linear-gradient(110deg,#000,transparent)]"
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <Skeleton
            key={index}
            className="mb-4 h-16 w-full rounded-[18px]"
            style={delay(index)}
          />
        ))}
      </div>
    </div>
  );
}
