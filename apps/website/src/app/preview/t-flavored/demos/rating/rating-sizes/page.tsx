"use client";

import { Rating } from "@repo/t-flavored/ui/rating";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["default", "lg", "xl"] as const;

export default function RatingSizesDemo() {
  const t = usePreviewDictionary().demos.tFlavored.rating;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-8
        p-8"
    >
      {sizes.map((size) => (
        <Rating
          key={size}
          size={size}
          defaultValue={5}
          aria-label={`${t.label} (${t.sizes[size]})`}
          getItemLabel={(value) => `${value}${value === 1 ? t.star : t.stars}`}
        />
      ))}
    </div>
  );
}
