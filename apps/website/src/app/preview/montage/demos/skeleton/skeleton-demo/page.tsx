"use client";

import { Skeleton } from "@repo/montage/ui/skeleton";

export default function SkeletonDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex items-center gap-4">
        <Skeleton variant="circle" className="size-12" />
        <div className="flex flex-col">
          <Skeleton className="w-[250px]" />
          <Skeleton className="w-[200px]" />
        </div>
      </div>
    </div>
  );
}
