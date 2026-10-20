"use client";

import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@repo/montage/ui/field";
import { Textarea } from "@repo/montage/ui/textarea";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const MAX_LENGTH = 100;

export default function TextareaCounterDemo() {
  const t = usePreviewDictionary().demos.montage.textarea;
  const [value, setValue] = useState("");
  const isOver = value.length > MAX_LENGTH;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Field className="max-w-[360px]" invalid={isOver}>
        <FieldLabel>{t.counter.label}</FieldLabel>
        <Textarea
          placeholder={t.counter.placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="max-h-40"
        />
        <FieldDescription className="flex justify-between gap-2">
          <span>{t.counter.description}</span>
          <span className="shrink-0">
            <span className={isOver ? "text-fg-negative-primary" : undefined}>
              {value.length}
            </span>
            /{MAX_LENGTH}
          </span>
        </FieldDescription>
      </Field>
    </div>
  );
}
