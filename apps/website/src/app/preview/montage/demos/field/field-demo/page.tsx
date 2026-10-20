"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/montage/ui/field";
import { Input } from "@repo/montage/ui/input";
import { Textarea } from "@repo/montage/ui/textarea";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function FieldDemo() {
  const t = usePreviewDictionary().demos.montage.field;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="max-w-[360px]">
        <Field>
          <FieldLabel required>{t.demo.name}</FieldLabel>
          <Input
            required
            autoComplete="name"
            placeholder={t.demo.namePlaceholder}
          />
        </Field>
        <Field>
          <FieldLabel>{t.demo.email}</FieldLabel>
          <Input
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
          />
          <FieldDescription>{t.demo.emailDescription}</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>{t.demo.message}</FieldLabel>
          <Textarea placeholder={t.demo.messagePlaceholder} />
        </Field>
      </FieldGroup>
    </div>
  );
}
