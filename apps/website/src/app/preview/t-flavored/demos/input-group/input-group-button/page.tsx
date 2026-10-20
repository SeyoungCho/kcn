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
  InputGroupButton,
  InputGroupInput,
} from "@repo/t-flavored/ui/input-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = ["default", "line"] as const;

export default function InputGroupButtonDemo() {
  const t = usePreviewDictionary().demos.tFlavored.inputGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="w-full max-w-[360px]">
        {variants.map((variant) => (
          <Field key={variant}>
            <FieldLabel>{t.button.label}</FieldLabel>
            <InputGroup variant={variant}>
              <InputGroupInput
                inputMode="numeric"
                placeholder={t.button.placeholder}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="sm" variant="default">
                  {t.button.action}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>{t.button.description}</FieldDescription>
          </Field>
        ))}
      </FieldGroup>
    </div>
  );
}
