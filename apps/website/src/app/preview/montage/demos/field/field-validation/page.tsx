"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@repo/montage/ui/field";
import { Input } from "@repo/montage/ui/input";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function FieldValidationDemo() {
  const t = usePreviewDictionary().demos.montage.field;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Field
        className="max-w-[360px]"
        validationMode="onChange"
        validate={(value) =>
          String(value ?? "").length < 2 ? t.validation.error : null
        }
      >
        <FieldLabel>{t.validation.label}</FieldLabel>
        <Input placeholder={t.validation.placeholder} />
        <FieldDescription className="data-invalid:hidden">
          {t.validation.description}
        </FieldDescription>
        <FieldError />
      </Field>
    </div>
  );
}
