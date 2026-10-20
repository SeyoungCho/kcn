"use client";

import { Rating } from "@repo/t-flavored/ui/rating";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["xs", "sm", "default", "lg", "xl"] as const;

export default function RatingReadOnlySizesDemo() {
  const t = usePreviewDictionary().demos.tFlavored.rating;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      {sizes.map((size) => (
        <Rating
          key={size}
          readOnly
          value={5}
          size={size}
          aria-label={t.readOnlyLabel}
        />
      ))}
    </div>
  );
}
