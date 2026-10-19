"use client";

import { ActionButton } from "@repo/seed/ui/action-button";
import { HelpBubbleTooltipTrigger } from "@repo/seed/ui/help-bubble";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function HelpBubbleTooltipDemo() {
  const t = usePreviewDictionary().demos.helpBubble;

  return (
    <div className="flex min-h-screen items-center justify-center p-8 pt-24">
      <HelpBubbleTooltipTrigger
        title={t.tooltip.title}
        description={t.tooltip.description}
      >
        <ActionButton variant="neutralWeak">{t.tooltip.trigger}</ActionButton>
      </HelpBubbleTooltipTrigger>
    </div>
  );
}
