"use client";

import { Field, FieldGroup, FieldLabel } from "@repo/montage/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@repo/montage/ui/input-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputGroupButtonDemo() {
  const t = usePreviewDictionary().demos.montage.inputGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="max-w-[360px]">
        <Field>
          <FieldLabel>{t.button.phone}</FieldLabel>
          <InputGroup>
            <InputGroupInput
              type="tel"
              autoComplete="tel"
              placeholder="010-0000-0000"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="sm">{t.button.send}</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel>{t.button.code}</FieldLabel>
          <InputGroup size="sm">
            <InputGroupInput
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder={t.button.codePlaceholder}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupText>4:59</InputGroupText>
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="sm">{t.button.resend}</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
    </div>
  );
}
