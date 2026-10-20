"use client";

import { Rating } from "@repo/t-flavored/ui/rating";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = ["default", "compact", "icon-only"] as const;

export default function RatingReadOnlyDemo() {
  const t = usePreviewDictionary().demos.tFlavored.rating;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-8
        p-8"
    >
      {variants.map((variant) => (
        <Rating
          key={variant}
          readOnly
          value={5}
          variant={variant}
          aria-label={t.readOnlyLabel}
        />
      ))}
    </div>
  );
}
