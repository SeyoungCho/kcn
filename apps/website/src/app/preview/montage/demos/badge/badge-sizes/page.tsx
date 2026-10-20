"use client";

import { Plus } from "lucide-react";
import { Badge } from "@repo/montage/ui/badge";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function BadgeSizesDemo() {
  const t = usePreviewDictionary().demos.montage.badge;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge size="xs">
          <Plus />
          {t.sizes.xs}
        </Badge>
        <Badge size="sm">
          <Plus />
          {t.sizes.sm}
        </Badge>
        <Badge>
          <Plus />
          {t.sizes.default}
        </Badge>
      </div>
    </div>
  );
}
