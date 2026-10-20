"use client";

import { Separator } from "@repo/montage/ui/separator";

export default function SeparatorCustomDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-xs flex-col items-center gap-6">
        <Separator />
        <Separator className="bg-line-neutral-secondary" />
        <Separator className="bg-line-neutral-tertiary" />
        <Separator className="h-0.5" />
        <Separator className="w-1/2" />
      </div>
    </div>
  );
}
