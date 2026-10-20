"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/montage/ui/field";
import { Input } from "@repo/montage/ui/input";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function FieldHorizontalDemo() {
  const t = usePreviewDictionary().demos.montage.field;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="max-w-[440px]">
        <Field orientation="horizontal">
          <FieldLabel className="w-24">{t.horizontal.name}</FieldLabel>
          <FieldContent>
            <Input
              autoComplete="name"
              placeholder={t.horizontal.namePlaceholder}
            />
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <FieldLabel className="w-24">{t.horizontal.email}</FieldLabel>
          <FieldContent>
            <Input
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
            />
            <FieldDescription>{t.horizontal.emailDescription}</FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <FieldLabel className="w-24">{t.horizontal.phone}</FieldLabel>
          <FieldContent>
            <Input type="tel" autoComplete="tel" placeholder="010-0000-0000" />
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  );
}
