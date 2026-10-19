"use client";

import * as React from "react";
import {
  Field,
  FieldCharacterCount,
  FieldDescription,
  FieldFooter,
  FieldHeader,
  FieldIndicatorText,
  FieldLabel,
} from "@repo/seed/ui/field";
import { TextFieldInput, TextFieldRoot } from "@repo/seed/ui/text-field";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const MAX = 40;

export default function FieldDefaultDemo() {
  const t = usePreviewDictionary().demos.field;
  const [value, setValue] = React.useState("");

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[360px]">
        <Field invalid={value.length > MAX}>
          <FieldHeader>
            <FieldLabel>
              {t.label}
              <FieldIndicatorText>{t.indicator}</FieldIndicatorText>
            </FieldLabel>
          </FieldHeader>
          <TextFieldRoot value={value} onValueChange={setValue}>
            <TextFieldInput placeholder={t.placeholder} />
          </TextFieldRoot>
          <FieldFooter>
            <FieldDescription>{t.description}</FieldDescription>
            <FieldCharacterCount current={value.length} max={MAX} />
          </FieldFooter>
        </Field>
      </div>
    </div>
  );
}
