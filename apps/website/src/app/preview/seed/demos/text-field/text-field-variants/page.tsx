"use client";

import { TextField, TextFieldInput } from "@repo/seed/ui/text-field";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = ["outline", "underline"] as const;
const sizes = ["large", "medium"] as const;

export default function TextFieldVariantsDemo() {
  const t = usePreviewDictionary().demos.textField;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="grid w-full max-w-[560px] grid-cols-1 gap-6 sm:grid-cols-2"
      >
        {variants.flatMap((variant) =>
          sizes.map((size) => (
            <TextField
              key={`${variant}-${size}`}
              variant={variant}
              size={size}
              label={`${t.variants[variant]} · ${t.sizes[size]}`}
            >
              <TextFieldInput placeholder={t.placeholder} />
            </TextField>
          )),
        )}
      </div>
    </div>
  );
}
