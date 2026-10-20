"use client";

import { useState } from "react";
import { CircleX, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@repo/t-flavored/ui/input-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputGroupDemo() {
  const t = usePreviewDictionary().demos.tFlavored.inputGroup;
  const [value, setValue] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <InputGroup variant="search" className="w-full max-w-[360px]">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          aria-label={t.search.label}
          placeholder={t.search.placeholder}
          value={value}
          onValueChange={setValue}
        />
        {value && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-sm"
              aria-label={t.search.clear}
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
    </div>
  );
}
