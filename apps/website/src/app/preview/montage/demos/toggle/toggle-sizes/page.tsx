"use client";

import { Toggle } from "@repo/montage/ui/toggle";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToggleSizesDemo() {
  const t = usePreviewDictionary().demos.montage.toggle;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-3
        p-8"
    >
      <Toggle size="xs">{t.sizes.xs}</Toggle>
      <Toggle size="sm">{t.sizes.sm}</Toggle>
      <Toggle size="default">{t.sizes.default}</Toggle>
      <Toggle size="lg">{t.sizes.lg}</Toggle>
    </div>
  );
}
