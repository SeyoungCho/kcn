"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/montage/ui/field";
import { Input } from "@repo/montage/ui/input";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputSizesDemo() {
  const t = usePreviewDictionary().demos.montage.input;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="max-w-[320px]">
        <Field>
          <FieldLabel>{t.sizes.default}</FieldLabel>
          <Input placeholder={t.sizes.placeholder} />
          <FieldDescription>{t.sizes.description}</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>{t.sizes.sm}</FieldLabel>
          <Input size="sm" placeholder={t.sizes.placeholder} />
          <FieldDescription>{t.sizes.description}</FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  );
}
