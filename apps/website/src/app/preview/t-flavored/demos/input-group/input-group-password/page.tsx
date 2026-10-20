"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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

function PasswordField({ variant }: { variant: "default" | "line" }) {
  const t = usePreviewDictionary().demos.tFlavored.inputGroup;
  const [visible, setVisible] = useState(false);

  return (
    <Field>
      <FieldLabel>{t.password.label}</FieldLabel>
      <InputGroup variant={variant}>
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
  );
}

export default function InputGroupPasswordDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="w-full max-w-[360px]">
        <PasswordField variant="default" />
        <PasswordField variant="line" />
      </FieldGroup>
    </div>
  );
}
