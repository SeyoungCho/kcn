"use client";

import { Field, FieldDescription, FieldLabel } from "@repo/t-flavored/ui/field";
import { Textarea } from "@repo/t-flavored/ui/textarea";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TextareaFixedHeightDemo() {
  const t = usePreviewDictionary().demos.tFlavored.textarea;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Field className="w-full max-w-[360px]">
        <FieldLabel>{t.fixed.label}</FieldLabel>
        <Textarea placeholder={t.fixed.placeholder} className="h-50" />
        <FieldDescription>{t.fixed.description}</FieldDescription>
      </Field>
    </div>
  );
}
