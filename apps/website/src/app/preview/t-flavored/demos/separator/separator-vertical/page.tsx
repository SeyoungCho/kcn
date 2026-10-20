"use client";

import { Separator } from "@repo/t-flavored/ui/separator";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SeparatorVerticalDemo() {
  const t = usePreviewDictionary().demos.tFlavored.separator;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex h-5 items-center gap-4 text-t6 text-grey-700">
        <span>{t.vertical.home}</span>
        <Separator orientation="vertical" />
        <span>{t.vertical.cards}</span>
        <Separator orientation="vertical" />
        <span>{t.vertical.benefits}</span>
      </div>
    </div>
  );
}
