"use client";

import { useState } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/t-flavored/ui/field";
import { Input } from "@repo/t-flavored/ui/input";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputInvalidDemo() {
  const t = usePreviewDictionary().demos.tFlavored.input;
  const [boxValue, setBoxValue] = useState("");
  const [lineValue, setLineValue] = useState("");

  const boxInvalid = boxValue.length > 2;
  const lineInvalid = lineValue.length > 2;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="w-full max-w-[360px]">
        <Field invalid={boxInvalid}>
          <FieldLabel>{t.invalid.label}</FieldLabel>
          <Input
            placeholder={t.invalid.placeholder}
            value={boxValue}
            onValueChange={setBoxValue}
          />
          {boxInvalid && <FieldError>{t.invalid.error}</FieldError>}
        </Field>
        <Field invalid={lineInvalid}>
          <FieldLabel>{t.invalid.label}</FieldLabel>
          <Input
            variant="line"
            placeholder={t.invalid.placeholder}
            value={lineValue}
            onValueChange={setLineValue}
          />
          {lineInvalid && <FieldError>{t.invalid.error}</FieldError>}
        </Field>
      </FieldGroup>
    </div>
  );
}
