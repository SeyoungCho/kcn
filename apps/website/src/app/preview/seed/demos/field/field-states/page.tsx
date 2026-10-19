"use client";

import IconExclamationmarkCircleFill from "@karrotmarket/react-monochrome-icon/IconExclamationmarkCircleFill";
import { PrefixIcon } from "@repo/seed/ui/affix-icon";
import {
  Field,
  FieldErrorMessage,
  FieldFooter,
  FieldHeader,
  FieldLabel,
  FieldRequiredIndicator,
} from "@repo/seed/ui/field";
import { TextFieldInput, TextFieldRoot } from "@repo/seed/ui/text-field";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function FieldStatesDemo() {
  const t = usePreviewDictionary().demos.field;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[360px] flex-col gap-6">
        <Field required invalid>
          <FieldHeader>
            <FieldLabel>
              {t.states.invalid}
              <FieldRequiredIndicator />
            </FieldLabel>
          </FieldHeader>
          <TextFieldRoot>
            <TextFieldInput />
          </TextFieldRoot>
          <FieldFooter>
            <FieldErrorMessage>
              <PrefixIcon svg={<IconExclamationmarkCircleFill />} />
              {t.errorMessage}
            </FieldErrorMessage>
          </FieldFooter>
        </Field>
        <Field disabled>
          <FieldHeader>
            <FieldLabel>{t.states.disabled}</FieldLabel>
          </FieldHeader>
          <TextFieldRoot>
            <TextFieldInput placeholder={t.placeholder} />
          </TextFieldRoot>
        </Field>
        <Field readOnly>
          <FieldHeader>
            <FieldLabel>{t.states.readOnly}</FieldLabel>
          </FieldHeader>
          <TextFieldRoot defaultValue={t.readOnlyValue}>
            <TextFieldInput />
          </TextFieldRoot>
        </Field>
      </div>
    </div>
  );
}
