"use client";

import { useState } from "react";
import { CircleX } from "lucide-react";
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

function ClearableField({ variant }: { variant: "default" | "line" }) {
  const t = usePreviewDictionary().demos.tFlavored.inputGroup;
  const [value, setValue] = useState("");

  return (
    <Field>
      <FieldLabel>{t.clearable.label}</FieldLabel>
      <InputGroup variant={variant}>
        <InputGroupInput
          placeholder={t.clearable.placeholder}
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
              aria-label={t.clearable.clear}
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
      <FieldDescription>{t.clearable.description}</FieldDescription>
    </Field>
  );
}

export default function InputGroupClearableDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="w-full max-w-[360px]">
        <ClearableField variant="default" />
        <ClearableField variant="line" />
      </FieldGroup>
    </div>
  );
}
