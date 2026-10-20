"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@repo/montage/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@repo/montage/ui/input-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputGroupPasswordDemo() {
  const t = usePreviewDictionary().demos.montage.inputGroup;
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Field className="max-w-[360px]">
        <FieldLabel>{t.password.label}</FieldLabel>
        <InputGroup>
          <InputGroupInput
            type={visible ? "text" : "password"}
            autoComplete="current-password"
            placeholder={t.password.placeholder}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label={visible ? t.password.hide : t.password.show}
              aria-pressed={visible}
              onClick={() => setVisible((current) => !current)}
            >
              {visible ? <EyeOff /> : <Eye />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>{t.password.description}</FieldDescription>
      </Field>
    </div>
  );
}
