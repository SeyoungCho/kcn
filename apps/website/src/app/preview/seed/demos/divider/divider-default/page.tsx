"use client";

import { Divider } from "@repo/seed/ui/divider";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DividerDefaultDemo() {
  const t = usePreviewDictionary().demos.divider;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="flex w-full max-w-[320px] flex-col gap-4 text-t4
          text-fg-neutral"
      >
        <p className="m-0">{t.above}</p>
        <Divider />
        <p className="m-0">{t.below}</p>
      </div>
    </div>
  );
}
