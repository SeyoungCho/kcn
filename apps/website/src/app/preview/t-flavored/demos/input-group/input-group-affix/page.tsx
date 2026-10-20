"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/t-flavored/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@repo/t-flavored/ui/input-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputGroupAffixDemo() {
  const t = usePreviewDictionary().demos.tFlavored.inputGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="w-full max-w-[360px]">
        <Field>
          <FieldLabel>{t.affix.prefixLabel}</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              inputMode="decimal"
              placeholder={t.affix.placeholder}
            />
          </InputGroup>
          <FieldDescription>{t.affix.description}</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>{t.affix.suffixLabel}</FieldLabel>
          <InputGroup variant="line">
            <InputGroupInput
              inputMode="numeric"
              placeholder={t.affix.placeholder}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupText>{t.affix.suffix}</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>{t.affix.description}</FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  );
}
