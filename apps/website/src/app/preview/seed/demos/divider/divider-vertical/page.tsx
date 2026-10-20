"use client";

import { Divider } from "@repo/seed/ui/divider";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DividerVerticalDemo() {
  const t = usePreviewDictionary().demos.divider;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex h-5 items-center gap-3 text-t4 text-fg-neutral-muted">
        <span>{t.links.shipping}</span>
        <Divider orientation="vertical" className="h-full" />
        <span>{t.links.returns}</span>
        <Divider orientation="vertical" className="h-full" />
        <span>{t.links.help}</span>
      </div>
    </div>
  );
}
