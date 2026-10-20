"use client";

import { Field, FieldDescription, FieldLabel } from "@repo/t-flavored/ui/field";
import { Textarea } from "@repo/t-flavored/ui/textarea";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TextareaDemo() {
  const t = usePreviewDictionary().demos.tFlavored.textarea;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Field className="w-full max-w-[360px]">
        <FieldLabel>{t.demo.label}</FieldLabel>
        <Textarea placeholder={t.demo.placeholder} className="min-h-25" />
        <FieldDescription>{t.demo.description}</FieldDescription>
      </Field>
    </div>
  );
}
