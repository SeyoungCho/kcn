"use client";

import { Skeleton } from "@repo/montage/ui/skeleton";

export default function SkeletonVariantsDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[320px] flex-col gap-4">
        <Skeleton variant="text" />
        <Skeleton variant="rectangle" className="h-20 rounded-12" />
        <Skeleton variant="circle" className="size-12" />
      </div>
    </div>
  );
}
