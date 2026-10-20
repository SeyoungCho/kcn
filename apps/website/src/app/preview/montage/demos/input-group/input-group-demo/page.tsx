"use client";

import { useState } from "react";
import { CircleX, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@repo/montage/ui/input-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function InputGroupDemo() {
  const t = usePreviewDictionary().demos.montage.inputGroup;
  const [value, setValue] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <InputGroup variant="secondary" className="max-w-[320px]">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          aria-label={t.search.label}
          placeholder={t.search.placeholder}
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
              aria-label={t.search.clear}
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
    </div>
  );
}
