"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@repo/seed/ui/input-group";
import { Search } from "lucide-react";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputGroupSizesDemo() {
  const t = usePreviewDictionary().demos.inputGroup;
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[384px] flex-col gap-3">
        <InputGroup size="md">
          <InputGroupInput placeholder={t.mediumPlaceholder} />
          <InputGroupAddon align="inline-start">
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupText>md</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup size="lg">
          <InputGroupInput placeholder={t.largePlaceholder} />
          <InputGroupAddon align="inline-start">
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupText>lg</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
