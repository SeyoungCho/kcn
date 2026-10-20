"use client";

import { Skeleton } from "@repo/montage/ui/skeleton";

export default function SkeletonCardDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-[250px] flex-col gap-3">
        <Skeleton variant="rectangle" className="h-[125px] rounded-12" />
        <div className="flex flex-col">
          <Skeleton />
          <Skeleton className="w-4/5" />
        </div>
      </div>
    </div>
  );
}
