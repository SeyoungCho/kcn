"use client";

import type { CSSProperties } from "react";
import { Skeleton } from "@repo/t-flavored/ui/skeleton";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

// 줄마다 0.1s 씩 늦게 깜빡여 위에서 아래로 물결치게 한다
const delay = (index: number) =>
  ({ "--skeleton-delay": `${index * 0.1}s` }) as CSSProperties;

export default function SkeletonDemo() {
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
        <div className="h-6" />
        {[3, 4, 5].map((index) => (
          <div
            key={index}
            className="mb-8 flex items-center"
            style={delay(index)}
          >
            <Skeleton className="me-3.5 size-10 rounded-full" />
            <Skeleton className="h-10.5 flex-1 rounded-[13px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
