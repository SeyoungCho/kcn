"use client";

import { Button } from "@repo/t-flavored/ui/button";
import { Toaster, toast } from "@repo/t-flavored/ui/toast";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToastActionDemo() {
  const t = usePreviewDictionary().demos.tFlavored.toast;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Button
        variant="destructive-weak"
        onClick={() =>
          toast.add({
            title: t.action.message,
            timeout: 5000,
            actionProps: {
              children: t.action.undo,
              onClick: () => toast.add({ title: t.action.restored }),
            },
          })
        }
      >
        {t.action.trigger}
      </Button>
      <Toaster />
    </div>
  );
}
