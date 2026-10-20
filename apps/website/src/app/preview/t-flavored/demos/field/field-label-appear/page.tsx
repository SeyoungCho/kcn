"use client";

import { Field, FieldDescription, FieldLabel } from "@repo/t-flavored/ui/field";
import { Input } from "@repo/t-flavored/ui/input";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function FieldLabelAppearDemo() {
  const t = usePreviewDictionary().demos.tFlavored.field;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Field className="w-full max-w-[360px]">
        <FieldLabel className="invisible data-filled:visible">
          {t.appear.label}
        </FieldLabel>
        <Input
          variant="line"
          inputMode="numeric"
          placeholder={t.appear.label}
        />
        <FieldDescription>{t.appear.description}</FieldDescription>
      </Field>
    </div>
  );
}
