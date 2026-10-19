"use client";

import * as React from "react";
import { ActionButton } from "@repo/seed/ui/action-button";
import {
  SidePanelBody,
  SidePanelContent,
  SidePanelFooter,
  SidePanelRoot,
  SidePanelTrigger,
} from "@repo/seed/ui/side-panel";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SidePanelDefaultDemo() {
  const t = usePreviewDictionary().demos.sidePanel;
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <SidePanelRoot open={open} onOpenChange={setOpen} size="small">
        <SidePanelTrigger render={<ActionButton variant="neutralWeak" />}>
          {t.open}
        </SidePanelTrigger>
        <SidePanelContent title={t.title} description={t.description}>
          <SidePanelBody>
            <p className="m-0 text-t5 text-fg-neutral">{t.body}</p>
          </SidePanelBody>
          <SidePanelFooter>
            <div className="flex gap-x2">
              <ActionButton
                variant="neutralWeak"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                {t.reset}
              </ActionButton>
              <ActionButton className="flex-1" onClick={() => setOpen(false)}>
                {t.apply}
              </ActionButton>
            </div>
          </SidePanelFooter>
        </SidePanelContent>
      </SidePanelRoot>
    </div>
  );
}
