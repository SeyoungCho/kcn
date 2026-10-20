"use client";

import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@repo/montage/ui/input-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const searches = [
  { variant: "secondary", size: "default" },
  { variant: "secondary", size: "sm" },
  { variant: "default", size: "default" },
  { variant: "default", size: "sm" },
] as const;

export default function InputGroupSearchDemo() {
  const t = usePreviewDictionary().demos.montage.inputGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[320px] flex-col gap-3">
        {searches.map(({ variant, size }) => (
          <InputGroup key={`${variant}-${size}`} variant={variant} size={size}>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              aria-label={t.search.label}
              placeholder={t.search.placeholder}
            />
          </InputGroup>
        ))}
      </div>
    </div>
  );
}
