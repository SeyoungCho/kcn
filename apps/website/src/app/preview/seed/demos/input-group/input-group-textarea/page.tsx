"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@repo/seed/ui/input-group";
import { Button } from "@repo/seed/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputGroupTextareaDemo() {
  const t = usePreviewDictionary().demos.inputGroup;
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[384px] flex-col gap-3">
        <InputGroup>
          <InputGroupTextarea placeholder={t.titlePlaceholder} />
          <InputGroupAddon align="block-start">
            <InputGroupText>{t.description}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupTextarea placeholder={t.messagePlaceholder} />
          <InputGroupAddon align="block-end">
            <Button variant="neutralSolid" size="sm" className="ml-auto">
              {t.submit}
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
