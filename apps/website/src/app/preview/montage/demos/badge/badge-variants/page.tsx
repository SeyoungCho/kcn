"use client";

import { Badge } from "@repo/montage/ui/badge";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function BadgeVariantsDemo() {
  const t = usePreviewDictionary().demos.montage.badge;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-3
        p-8"
    >
      <div className="flex items-center gap-2">
        <Badge>{t.variants.default}</Badge>
        <Badge variant="outline">{t.variants.outline}</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Badge color="brand">{t.variants.default}</Badge>
        <Badge variant="outline" color="brand">
          {t.variants.outline}
        </Badge>
      </div>
    </div>
  );
}
