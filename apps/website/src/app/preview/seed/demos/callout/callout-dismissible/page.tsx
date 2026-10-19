"use client";

import * as React from "react";
import { ActionButton } from "@repo/seed/ui/action-button";
import { DismissibleCallout } from "@repo/seed/ui/callout";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CalloutDismissibleDemo() {
  const t = usePreviewDictionary().demos.callout;
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[420px]">
        {open ? (
          <DismissibleCallout
            tone="warning"
            description={t.dismissible.description}
            onDismiss={() => setOpen(false)}
          />
        ) : (
          <div className="flex justify-center">
            <ActionButton variant="neutralWeak" onClick={() => setOpen(true)}>
              {t.dismissible.reset}
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
}
