"use client";

import IconMagnifyingglassLine from "@karrotmarket/react-monochrome-icon/IconMagnifyingglassLine";
import { TextField, TextFieldInput } from "@repo/seed/ui/text-field";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TextFieldAffixesDemo() {
  const t = usePreviewDictionary().demos.textField;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[360px] flex-col gap-6">
        <TextField prefixIcon={<IconMagnifyingglassLine />}>
          <TextFieldInput
            type="search"
            placeholder={t.searchPlaceholder}
            aria-label={t.searchPlaceholder}
          />
        </TextField>
        <TextField label={t.intervalLabel} suffix={t.intervalSuffix}>
          <TextFieldInput inputMode="numeric" placeholder="7" />
        </TextField>
      </div>
    </div>
  );
}
