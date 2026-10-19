"use client";

import { ActionButton } from "@repo/seed/ui/action-button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["xsmall", "small", "medium", "large"] as const;

export default function ActionButtonSizesDemo() {
  const t = usePreviewDictionary().demos.actionButton;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-3
        p-8"
    >
      {sizes.map((size) => (
        <ActionButton key={size} size={size}>
          {t.sizes[size]}
        </ActionButton>
      ))}
    </div>
  );
}
