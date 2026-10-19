"use client";

import { TextField, TextFieldTextarea } from "@repo/seed/ui/text-field";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TextFieldTextareaDemo() {
  const t = usePreviewDictionary().demos.textField;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[360px]">
        <TextField label={t.bioLabel} maxGraphemeCount={100}>
          <TextFieldTextarea placeholder={t.bioPlaceholder} />
        </TextField>
      </div>
    </div>
  );
}
