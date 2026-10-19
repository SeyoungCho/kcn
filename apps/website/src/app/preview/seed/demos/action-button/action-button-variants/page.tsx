"use client";

import { ActionButton } from "@repo/seed/ui/action-button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = [
  "brandSolid",
  "neutralSolid",
  "neutralWeak",
  "criticalSolid",
  "brandOutline",
  "neutralOutline",
  "ghost",
] as const;

export default function ActionButtonVariantsDemo() {
  const t = usePreviewDictionary().demos.actionButton;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="grid w-full max-w-[560px] grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {variants.map((variant) => (
          <ActionButton key={variant} variant={variant}>
            {t.variants[variant]}
          </ActionButton>
        ))}
      </div>
    </div>
  );
}
