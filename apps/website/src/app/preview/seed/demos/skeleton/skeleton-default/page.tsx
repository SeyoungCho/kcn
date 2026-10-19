"use client";

import { Skeleton } from "@repo/seed/ui/skeleton";

export default function SkeletonDefaultDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[360px] items-center gap-3">
        <Skeleton radius="full" width="x12" height="x12" />
        <div className="flex grow flex-col gap-1">
          <Skeleton width="60%" height="lineHeight.t5" />
          <Skeleton width="full" height="lineHeight.t4" />
        </div>
      </div>
    </div>
  );
}
