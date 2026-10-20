"use client";

import { Spinner } from "@repo/t-flavored/ui/spinner";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["sm", "default", "lg"] as const;

export default function SpinnerSizesDemo() {
  const t = usePreviewDictionary().demos.tFlavored.spinner;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex items-center gap-8">
        {sizes.map((size) => (
          <Spinner key={size} size={size} aria-label={t.loading} />
        ))}
      </div>
    </div>
  );
}
