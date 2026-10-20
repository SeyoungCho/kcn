"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/t-flavored/ui/field";
import { Input } from "@repo/t-flavored/ui/input";
import { Textarea } from "@repo/t-flavored/ui/textarea";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function FieldDemo() {
  const t = usePreviewDictionary().demos.tFlavored.field;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="w-full max-w-[360px]">
        <Field>
          <FieldLabel>{t.demo.name}</FieldLabel>
          <Input autoComplete="name" placeholder={t.demo.namePlaceholder} />
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
          <FieldLabel>{t.demo.memo}</FieldLabel>
          <Textarea placeholder={t.demo.memoPlaceholder} className="min-h-25" />
        </Field>
      </FieldGroup>
    </div>
  );
}
