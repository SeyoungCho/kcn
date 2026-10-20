"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/t-flavored/ui/field";
import { Input } from "@repo/t-flavored/ui/input";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputDisabledDemo() {
  const t = usePreviewDictionary().demos.tFlavored.input;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="w-full max-w-[360px]">
        <Field disabled>
          <FieldLabel>{t.disabled.emptyLabel}</FieldLabel>
          <Input placeholder={t.disabled.placeholder} />
          <FieldDescription>{t.disabled.description}</FieldDescription>
        </Field>
        <Field disabled>
          <FieldLabel>{t.disabled.filledLabel}</FieldLabel>
          <Input
            variant="line"
            placeholder={t.disabled.placeholder}
            defaultValue={t.disabled.value}
          />
          <FieldDescription>{t.disabled.description}</FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  );
}
