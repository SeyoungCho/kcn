"use client";

import { Field, FieldGroup, FieldLabel } from "@repo/montage/ui/field";
import { Textarea } from "@repo/montage/ui/textarea";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TextareaSizesDemo() {
  const t = usePreviewDictionary().demos.montage.textarea;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="max-w-[320px]">
        <Field>
          <FieldLabel>{t.sizes.default}</FieldLabel>
          <Textarea placeholder={t.sizes.placeholder} />
        </Field>
        <Field>
          <FieldLabel>{t.sizes.sm}</FieldLabel>
          <Textarea size="sm" placeholder={t.sizes.placeholder} />
        </Field>
      </FieldGroup>
    </div>
  );
}
