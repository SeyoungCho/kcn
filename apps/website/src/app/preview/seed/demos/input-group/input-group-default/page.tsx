"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@repo/seed/ui/input-group";
import { Button } from "@repo/seed/ui/button";
import { Mail } from "lucide-react";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputGroupDefaultDemo() {
  const t = usePreviewDictionary().demos.inputGroup;
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <InputGroup className="max-w-[384px]">
        <InputGroupInput placeholder={t.emailPlaceholder} />
        <InputGroupAddon align="inline-start">
          <Mail />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Button variant="neutralOutline" size="sm">
            {t.submit}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
