"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@repo/seed/ui/input-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputGroupVariantsDemo() {
  const t = usePreviewDictionary().demos.inputGroup;
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[384px] flex-col gap-3">
        <InputGroup>
          <InputGroupInput placeholder={t.outlinePlaceholder} />
          <InputGroupAddon align="inline-end">
            <InputGroupText>{t.outline}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup variant="underline">
          <InputGroupInput placeholder={t.underlinePlaceholder} />
          <InputGroupAddon align="inline-end">
            <InputGroupText>{t.underline}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
