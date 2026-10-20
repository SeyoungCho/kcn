"use client";

import { Textarea } from "@repo/montage/ui/textarea";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TextareaDemo() {
  const t = usePreviewDictionary().demos.montage.textarea;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Textarea
        aria-label={t.demo.label}
        placeholder={t.demo.placeholder}
        className="max-w-[320px]"
      />
    </div>
  );
}
