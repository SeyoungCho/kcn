"use client";

import { Badge } from "@repo/t-flavored/ui/badge";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function BadgeDemo() {
  const t = usePreviewDictionary().demos.tFlavored.badge;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>{t.demo.new}</Badge>
        <Badge variant="weak">{t.demo.easyCare}</Badge>
        <Badge variant="destructive-weak">{t.demo.lowStock}</Badge>
        <Badge variant="secondary">{t.demo.petSafe}</Badge>
      </div>
    </div>
  );
}
