"use client";

import { Field, FieldDescription, FieldLabel } from "@repo/t-flavored/ui/field";
import { Input } from "@repo/t-flavored/ui/input";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputDemo() {
  const t = usePreviewDictionary().demos.tFlavored.input;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Field className="w-full max-w-[360px]">
        <FieldLabel>{t.demo.label}</FieldLabel>
        <Input placeholder={t.demo.placeholder} />
        <FieldDescription>{t.demo.description}</FieldDescription>
      </Field>
    </div>
  );
}
