"use client";

import { TextField, TextFieldInput } from "@repo/seed/ui/text-field";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TextFieldStatesDemo() {
  const t = usePreviewDictionary().demos.textField;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[360px] flex-col gap-6">
        <TextField
          label={t.states.invalid}
          invalid
          errorMessage={t.errorMessage}
          defaultValue="name@"
        >
          <TextFieldInput type="email" />
        </TextField>
        <TextField label={t.states.disabled} disabled>
          <TextFieldInput placeholder={t.placeholder} />
        </TextField>
        <TextField
          label={t.states.readOnly}
          readOnly
          defaultValue="name@example.com"
        >
          <TextFieldInput type="email" />
        </TextField>
      </div>
    </div>
  );
}
