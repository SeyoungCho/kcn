"use client";

import { Rating } from "@repo/t-flavored/ui/rating";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function RatingDemo() {
  const t = usePreviewDictionary().demos.tFlavored.rating;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Rating
        defaultValue={4}
        size="xl"
        aria-label={t.label}
        getItemLabel={(value) => `${value}${value === 1 ? t.star : t.stars}`}
      />
    </div>
  );
}
