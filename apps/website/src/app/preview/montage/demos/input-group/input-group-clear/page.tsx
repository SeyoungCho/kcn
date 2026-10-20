"use client";

import { useState } from "react";
import { CircleX } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/montage/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@repo/montage/ui/input-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

function ClearableField({ size }: { size: "default" | "sm" }) {
  const t = usePreviewDictionary().demos.montage.inputGroup;
  const [value, setValue] = useState("");

  return (
    <Field>
      <FieldLabel>{t.clear.label}</FieldLabel>
      <InputGroup size={size}>
        <InputGroupInput
          placeholder={t.clear.placeholder}
          value={value}
          onValueChange={setValue}
        />
        {value && (
          // 칸에 초점이 있을 때만 보인다. 누를 때 초점을 칸에 남겨 둔다.
          <InputGroupAddon
            align="inline-end"
            className="hidden group-focus-within/input-group:flex"
          >
            <InputGroupButton
              aria-label={t.clear.clear}
              className="text-fg-neutral-quaternary"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => setValue("")}
            >
              <CircleX
                className="fill-current stroke-background
                  [&>circle]:stroke-current"
              />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
      <FieldDescription>{t.clear.description}</FieldDescription>
    </Field>
  );
}

export default function InputGroupClearDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="max-w-[360px]">
        <ClearableField size="default" />
        <ClearableField size="sm" />
      </FieldGroup>
    </div>
  );
}
