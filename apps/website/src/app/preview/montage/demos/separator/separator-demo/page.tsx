"use client";

import { Separator } from "@repo/montage/ui/separator";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SeparatorDemo() {
  const t = usePreviewDictionary().demos.montage.separator;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-xs">
        <div className="flex flex-col gap-1">
          <div className="text-body1 font-semibold">{t.title}</div>
          <p className="text-label1 text-fg-neutral-secondary">
            {t.description}
          </p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center gap-4 text-label1">
          <span>{t.links.schedule}</span>
          <Separator orientation="vertical" />
          <span>{t.links.tips}</span>
          <Separator orientation="vertical" />
          <span>{t.links.photos}</span>
        </div>
      </div>
    </div>
  );
}
