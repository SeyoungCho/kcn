"use client";

import type { CSSProperties } from "react";
import { Skeleton } from "@repo/t-flavored/ui/skeleton";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const delay = (index: number) =>
  ({ "--skeleton-delay": `${index * 0.1}s` }) as CSSProperties;

export default function SkeletonVariantsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.skeleton;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[420px] bg-grey-300">
        <div
          role="status"
          aria-label={t.loading}
          className="flex flex-col px-6 pt-6
            mask-[linear-gradient(110deg,#000,transparent)]"
        >
          <Skeleton
            variant="white"
            className="mb-3 h-5.5 w-1/3 rounded-[9px]"
          />
          <Skeleton
            variant="white"
            className="mb-3 h-7.5 w-1/2 rounded-[11px]"
            style={delay(1)}
          />
          <div className="h-10" />
          {[3, 4].map((index) => (
            <div
              key={index}
              className="mb-8 flex items-center"
              style={delay(index)}
            >
              <Skeleton
                variant="white"
                className="me-3.5 size-10 rounded-full"
              />
              <Skeleton
                variant="white"
                className="h-10.5 flex-1 rounded-[13px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
