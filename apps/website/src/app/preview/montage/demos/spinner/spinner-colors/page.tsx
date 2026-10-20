"use client";

import { Spinner } from "@repo/montage/ui/spinner";

export default function SpinnerColorsDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-8 p-8">
      <Spinner className="text-primary" />
      <Spinner className="text-fg-neutral-secondary" />
      <Spinner className="text-fg-positive-primary" />
    </div>
  );
}
