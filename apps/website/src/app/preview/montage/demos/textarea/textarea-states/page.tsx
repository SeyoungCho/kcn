"use client";

import { Textarea } from "@repo/montage/ui/textarea";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TextareaStatesDemo() {
  const t = usePreviewDictionary().demos.montage.textarea;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[320px] flex-col gap-3">
        <Textarea
          aria-label={t.states.invalid}
          placeholder={t.states.invalid}
          aria-invalid
        />
        <Textarea
          aria-label={t.states.disabled}
          placeholder={t.states.disabled}
          disabled
        />
        <Textarea
          aria-label={t.states.disabled}
          defaultValue={t.states.disabledValue}
          disabled
        />
      </div>
    </div>
  );
}
