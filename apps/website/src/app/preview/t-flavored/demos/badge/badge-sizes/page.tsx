"use client";

import { Badge } from "@repo/t-flavored/ui/badge";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["xs", "sm", "default", "lg"] as const;

export default function BadgeSizesDemo() {
  const t = usePreviewDictionary().demos.tFlavored.badge;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {sizes.map((size) => (
          <Badge key={size} size={size}>
            {t.sizes[size]}
          </Badge>
        ))}
      </div>
    </div>
  );
}
