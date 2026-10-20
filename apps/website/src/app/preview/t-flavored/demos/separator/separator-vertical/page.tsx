"use client";

import { Separator } from "@repo/t-flavored/ui/separator";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SeparatorVerticalDemo() {
  const t = usePreviewDictionary().demos.tFlavored.separator;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex h-5 items-center gap-4 text-t6 text-grey-700">
        <span>{t.vertical.shop}</span>
        <Separator orientation="vertical" />
        <span>{t.vertical.care}</span>
        <Separator orientation="vertical" />
        <span>{t.vertical.community}</span>
      </div>
    </div>
  );
}
