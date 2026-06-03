"use client";

import { Input } from "@repo/seed/ui/input";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputDisabledDemo() {
  const t = usePreviewDictionary().demos.input;

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      <Input disabled placeholder={t.placeholder} />
      <Input disabled variant="underline" placeholder={t.placeholder} />
    </div>
  );
}
