"use client";

import { Badge } from "@repo/montage/ui/badge";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function BadgeDemo() {
  const t = usePreviewDictionary().demos.montage.badge;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>{t.demo.easyCare}</Badge>
        <Badge color="brand">{t.demo.new}</Badge>
        <Badge color="cyan">{t.demo.petSafe}</Badge>
        <Badge variant="outline" color="destructive">
          {t.demo.lowStock}
        </Badge>
      </div>
    </div>
  );
}
