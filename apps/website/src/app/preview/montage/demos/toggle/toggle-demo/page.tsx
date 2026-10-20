"use client";

import { Toggle } from "@repo/montage/ui/toggle";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToggleDemo() {
  const t = usePreviewDictionary().demos.montage.toggle;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Toggle defaultPressed>{t.demo.label}</Toggle>
    </div>
  );
}
