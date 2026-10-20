"use client";

import { Separator } from "@repo/t-flavored/ui/separator";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SeparatorDemo() {
  const t = usePreviewDictionary().demos.tFlavored.separator;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="flex w-full max-w-[350px] flex-col rounded-[20px]
          bg-grey-100"
      >
        <div
          className="flex min-h-11 items-center px-6 py-3 text-t5 leading-[1.35]
            font-medium text-grey-700"
        >
          {t.rows.first}
        </div>
        <Separator />
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
