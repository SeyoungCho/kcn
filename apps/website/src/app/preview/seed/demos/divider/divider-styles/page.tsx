"use client";

import { Divider } from "@repo/seed/ui/divider";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DividerStylesDemo() {
  const t = usePreviewDictionary().demos.divider;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="flex w-full max-w-[360px] flex-col gap-3 text-t3
          text-fg-neutral-subtle"
      >
        <span>{t.default}</span>
        <Divider />
        <span>{t.inset}</span>
        <Divider inset />
        <span>{t.thick}</span>
        <Divider thickness={8} color="palette.gray200" />
      </div>
    </div>
  );
}
