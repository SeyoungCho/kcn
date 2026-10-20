"use client";

import { Spinner } from "@repo/montage/ui/spinner";

const sizes = ["size-6", "size-8", "size-12"];

export default function SpinnerSizesDemo() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-6
        p-8"
    >
      <div className="flex items-center gap-8">
        {sizes.map((size) => (
          <Spinner key={size} className={size} />
        ))}
      </div>
      <div className="flex items-center gap-8">
        {sizes.map((size) => (
          <Spinner key={size} variant="brand" className={size} />
        ))}
      </div>
    </div>
  );
}
