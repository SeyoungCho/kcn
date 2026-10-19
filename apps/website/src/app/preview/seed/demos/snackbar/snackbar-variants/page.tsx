"use client";

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

export default function SnackbarVariantsDemo() {
  return (
    <SnackbarProvider>
      <div className="flex min-h-screen items-center justify-center p-8">
        <SnackbarTriggers />
      </div>
    </SnackbarProvider>
  );
}
