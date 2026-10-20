"use client";

import { PlusIcon, TrashIcon } from "lucide-react";
import { Toggle } from "@repo/montage/ui/toggle";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToggleWithIconDemo() {
  const t = usePreviewDictionary().demos.montage.toggle;

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      <Toggle>
        <PlusIcon data-icon="inline-start" />
        {t.withIcon.add}
      </Toggle>
      <Toggle variant="outline">
        {t.withIcon.remove}
        <TrashIcon data-icon="inline-end" />
      </Toggle>
    </div>
  );
}
