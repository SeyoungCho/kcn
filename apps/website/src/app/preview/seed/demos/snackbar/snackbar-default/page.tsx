"use client";

import { ActionButton } from "@repo/seed/ui/action-button";
import {
  Snackbar,
  SnackbarProvider,
  useSnackbarAdapter,
} from "@repo/seed/ui/snackbar";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

function SnackbarTrigger() {
  const t = usePreviewDictionary().demos.snackbar;
  const snackbar = useSnackbarAdapter();

  return (
    <ActionButton
      variant="neutralSolid"
      onClick={() =>
        snackbar.create({
          render: () => (
            <Snackbar
              message={t.message}
              actionLabel={t.action}
              onAction={() =>
                snackbar.create({
                  render: () => (
                    <Snackbar variant="positive" message={t.undone} />
                  ),
                })
              }
            />
          ),
        })
      }
    >
      {t.trigger}
    </ActionButton>
  );
}

export default function SnackbarDefaultDemo() {
  return (
    <SnackbarProvider>
      <div className="flex min-h-screen items-center justify-center p-8">
        <SnackbarTrigger />
      </div>
    </SnackbarProvider>
  );
}
