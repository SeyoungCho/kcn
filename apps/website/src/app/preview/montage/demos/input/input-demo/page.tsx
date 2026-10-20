"use client";

import { Input } from "@repo/montage/ui/input";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputDemo() {
  const t = usePreviewDictionary().demos.montage.input;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Input
        aria-label={t.demo.label}
        placeholder={t.demo.placeholder}
        className="max-w-[320px]"
      />
    </div>
  );
}
