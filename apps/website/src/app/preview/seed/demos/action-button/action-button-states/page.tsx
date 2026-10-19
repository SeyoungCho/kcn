"use client";

import { ActionButton } from "@repo/seed/ui/action-button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ActionButtonStatesDemo() {
  const t = usePreviewDictionary().demos.actionButton;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-3
        p-8"
    >
      <ActionButton loading>{t.states.loading}</ActionButton>
      <ActionButton disabled>{t.states.disabled}</ActionButton>
    </div>
  );
}
