"use client";

import { CircleCheck, Mail } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/montage/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@repo/montage/ui/input-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputGroupAddonsDemo() {
  const t = usePreviewDictionary().demos.montage.inputGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="max-w-[360px]">
        <Field>
          <FieldLabel>{t.addons.email}</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>
            <InputGroupInput type="email" placeholder="name@example.com" />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel>{t.addons.price}</FieldLabel>
          <InputGroup>
            <InputGroupInput inputMode="numeric" placeholder="0" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>{t.addons.unit}</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel>{t.addons.nickname}</FieldLabel>
          <InputGroup>
            <InputGroupInput defaultValue={t.addons.nicknameValue} />
            <InputGroupAddon align="inline-end">
              <CircleCheck
                className="fill-current stroke-white text-fg-positive-primary
                  [&>circle]:stroke-current"
              />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>{t.addons.available}</FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  );
}
