"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@repo/seed/ui/input-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputGroupStatesDemo() {
  const t = usePreviewDictionary().demos.inputGroup;
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[384px] flex-col gap-3">
        <InputGroup>
          <InputGroupInput data-invalid placeholder={t.invalidPlaceholder} />
          <InputGroupAddon align="inline-end">
            <InputGroupText>{t.invalid}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupInput disabled placeholder={t.disabledPlaceholder} />
          <InputGroupAddon align="inline-end">
            <InputGroupText>{t.disabled}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupInput readOnly placeholder={t.readOnlyPlaceholder} />
          <InputGroupAddon align="inline-end">
            <InputGroupText>{t.readOnly}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
