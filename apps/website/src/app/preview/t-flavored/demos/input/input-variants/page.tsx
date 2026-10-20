"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/t-flavored/ui/field";
import { Input } from "@repo/t-flavored/ui/input";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = ["default", "line", "big", "hero"] as const;

export default function InputVariantsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.input;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="w-full max-w-[360px]">
        {variants.map((variant) => (
          <Field key={variant}>
            <FieldLabel>{t.variants.labels[variant]}</FieldLabel>
            <Input variant={variant} placeholder={t.variants.placeholder} />
            <FieldDescription>{t.variants.description}</FieldDescription>
          </Field>
        ))}
      </FieldGroup>
    </div>
  );
}
