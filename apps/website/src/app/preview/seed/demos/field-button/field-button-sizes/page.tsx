"use client";

import IconChevronDownLine from "@karrotmarket/react-monochrome-icon/IconChevronDownLine";
import {
  FieldButtonControl,
  FieldButtonPlaceholder,
} from "@repo/seed/ui/field-button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["large", "medium"] as const;

export default function FieldButtonSizesDemo() {
  const t = usePreviewDictionary().demos.fieldButton;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      {sizes.map((size) => (
        <div key={size} className="w-full max-w-[360px]">
          <FieldButtonControl
            size={size}
            suffixIcon={<IconChevronDownLine />}
            buttonProps={{ "aria-label": t.sizes[size] }}
          >
            <FieldButtonPlaceholder>{t.sizes[size]}</FieldButtonPlaceholder>
          </FieldButtonControl>
        </div>
      ))}
    </div>
  );
}
