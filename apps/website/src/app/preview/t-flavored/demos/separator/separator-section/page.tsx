"use client";

import { Separator } from "@repo/t-flavored/ui/separator";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SeparatorSectionDemo() {
  const t = usePreviewDictionary().demos.tFlavored.separator;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[360px] flex-col">
        <div
          className="flex min-h-11 items-center px-6 py-3 text-t5 leading-[1.35]
            font-medium text-grey-700"
        >
          {t.rows.first}
        </div>
        <Separator variant="section" />
        <div
          className="flex min-h-11 items-center px-6 py-3 text-t5 leading-[1.35]
            font-medium text-grey-700"
        >
          {t.rows.second}
        </div>
      </div>
    </div>
  );
}
