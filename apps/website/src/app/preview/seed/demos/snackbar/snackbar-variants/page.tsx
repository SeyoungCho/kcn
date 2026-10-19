"use client";

import * as React from "react";
import { ActionButton } from "@repo/seed/ui/action-button";
import {
  Snackbar,
  SnackbarProvider,
  useSnackbarAdapter,
} from "@repo/seed/ui/snackbar";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = ["default", "positive", "critical"] as const;

function SnackbarTriggers() {
  const t = usePreviewDictionary().demos.snackbar;
  const snackbar = useSnackbarAdapter();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {variants.map((variant) => (
        <ActionButton
          key={variant}
          variant="neutralWeak"
          onClick={() =>
            snackbar.create({
              render: () => (
                <Snackbar variant={variant} message={t.messages[variant]} />
              ),
            })
          }
        >
          {t.variants[variant]}
        </ActionButton>
      ))}
    </div>
  );
}

// SnackbarProvider portals into document.body while rendering, so mount it on the client only.
const subscribe = () => () => {};

export default function SnackbarVariantsDemo() {
  const isClient = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!isClient) return null;

  return (
    <SnackbarProvider>
      <div className="flex min-h-screen items-center justify-center p-8">
        <SnackbarTriggers />
      </div>
    </SnackbarProvider>
  );
}
