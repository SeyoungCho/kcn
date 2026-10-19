"use client";

import IconSparkle2Line from "@karrotmarket/react-monochrome-icon/IconSparkle2Line";
import { ActionableCallout } from "@repo/seed/ui/callout";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CalloutActionableDemo() {
  const t = usePreviewDictionary().demos.callout;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[420px]">
        <ActionableCallout
          tone="magic"
          prefixIcon={<IconSparkle2Line />}
          title={t.actionable.title}
          description={t.actionable.description}
        />
      </div>
    </div>
  );
}
