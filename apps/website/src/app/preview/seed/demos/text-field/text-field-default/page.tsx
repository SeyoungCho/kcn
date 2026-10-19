"use client";

import { TextField, TextFieldInput } from "@repo/seed/ui/text-field";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TextFieldDefaultDemo() {
  const t = usePreviewDictionary().demos.textField;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[360px]">
        <TextField label={t.label} description={t.description}>
          <TextFieldInput type="email" placeholder={t.placeholder} />
        </TextField>
      </div>
    </div>
  );
}
