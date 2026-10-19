"use client";

import { Badge } from "@repo/seed/ui/badge";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["medium", "large"] as const;

export default function BadgeSizesDemo() {
  const t = usePreviewDictionary().demos.badge;

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      {sizes.map((size) => (
        <Badge key={size} size={size} tone="brand" variant="weak">
          {t.sizes[size]}
        </Badge>
      ))}
    </div>
  );
}
