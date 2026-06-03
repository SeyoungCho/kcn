"use client";

import { Input } from "@repo/seed/ui/input";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputReadOnlyDemo() {
  const t = usePreviewDictionary().demos.input;

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      <Input readOnly placeholder={t.placeholder} />
      <Input readOnly variant="underline" placeholder={t.placeholder} />
    </div>
  );
}
