"use client";

import type { CSSProperties } from "react";
import { Skeleton } from "@repo/t-flavored/ui/skeleton";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const delay = (index: number) =>
  ({ "--skeleton-delay": `${index * 0.1}s` }) as CSSProperties;

export default function SkeletonCardDemo() {
  const t = usePreviewDictionary().demos.tFlavored.skeleton;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        role="status"
        aria-label={t.loading}
        className="flex w-full max-w-[420px] flex-col px-6 pt-6
          mask-[linear-gradient(110deg,#000,transparent)]"
      >
        <Skeleton className="mb-3 h-7.5 w-1/2 rounded-[11px]" />
        <Skeleton className="mb-3 h-5.5 w-1/3 rounded-[9px]" style={delay(1)} />
        <div className="h-5" />
        <Skeleton
          className="mb-5 h-60 w-full rounded-[38px]"
          style={delay(3)}
        />
      </div>
    </div>
  );
}
