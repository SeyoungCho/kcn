"use client";

import { Input } from "@repo/montage/ui/input";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputStatesDemo() {
  const t = usePreviewDictionary().demos.montage.input;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[320px] flex-col gap-3">
        <Input aria-label={t.states.default} placeholder={t.states.default} />
        <Input
          aria-label={t.states.invalid}
          placeholder={t.states.invalid}
          aria-invalid
        />
        <Input
          aria-label={t.states.readOnly}
          defaultValue={t.states.readOnlyValue}
          readOnly
        />
        <Input
          aria-label={t.states.disabled}
          placeholder={t.states.disabled}
          disabled
        />
        <Input
          aria-label={t.states.disabled}
          defaultValue={t.states.disabledValue}
          disabled
        />
      </div>
    </div>
  );
}
