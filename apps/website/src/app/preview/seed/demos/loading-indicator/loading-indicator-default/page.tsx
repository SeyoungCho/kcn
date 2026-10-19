"use client";

import * as React from "react";
import { ActionButton } from "@repo/seed/ui/action-button";
import { LoadingIndicator } from "@repo/seed/ui/loading-indicator";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function LoadingIndicatorDefaultDemo() {
  const t = usePreviewDictionary().demos.loadingIndicator;
  const [loading, setLoading] = React.useState(true);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      {/* The parent must be `relative` and center its content; it also sets the indicator's size and colors. */}
      <span
        aria-busy={loading}
        className="relative inline-flex h-x10 items-center justify-center
          rounded-r2 bg-bg-neutral-weak px-x4 text-t4 font-bold text-fg-neutral
          [--progress-range-color:var(--fg-neutral)] [--progress-size:16px]
          [--progress-thickness:2px]
          [--progress-track-color:var(--palette-gray-400)]"
      >
        {loading ? <LoadingIndicator>{t.label}</LoadingIndicator> : t.label}
      </span>
      <ActionButton
        variant="ghost"
        size="small"
        onClick={() => setLoading((value) => !value)}
      >
        {t.toggle}
      </ActionButton>
    </div>
  );
}
