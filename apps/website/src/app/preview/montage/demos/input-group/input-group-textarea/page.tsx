"use client";

import { useState } from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import { Button } from "@repo/montage/ui/button";
import { Field, FieldLabel } from "@repo/montage/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@repo/montage/ui/input-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputGroupTextareaDemo() {
  const t = usePreviewDictionary().demos.montage.inputGroup;
  const [value, setValue] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Field className="max-w-[400px]">
        <FieldLabel>{t.textarea.label}</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            placeholder={t.textarea.placeholder}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="max-h-40"
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton aria-label={t.textarea.attach}>
              <Paperclip />
            </InputGroupButton>
            <Button
              size="icon-sm"
              aria-label={t.textarea.send}
              disabled={!value}
              className="ml-auto"
            >
              <ArrowUp />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  );
}
