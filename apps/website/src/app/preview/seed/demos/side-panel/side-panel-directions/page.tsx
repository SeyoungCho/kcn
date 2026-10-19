"use client";

import { ActionButton } from "@repo/seed/ui/action-button";
import {
  SidePanelBody,
  SidePanelContent,
  SidePanelRoot,
  SidePanelTrigger,
} from "@repo/seed/ui/side-panel";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const directions = ["left", "right"] as const;

export default function SidePanelDirectionsDemo() {
  const t = usePreviewDictionary().demos.sidePanel;

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      {directions.map((direction) => (
        <SidePanelRoot key={direction} direction={direction} size="small">
          <SidePanelTrigger render={<ActionButton variant="neutralWeak" />}>
            {t.directions[direction]}
          </SidePanelTrigger>
          <SidePanelContent title={t.title}>
            <SidePanelBody>
              <p className="m-0 text-t5 text-fg-neutral">{t.body}</p>
            </SidePanelBody>
          </SidePanelContent>
        </SidePanelRoot>
      ))}
    </div>
  );
}
