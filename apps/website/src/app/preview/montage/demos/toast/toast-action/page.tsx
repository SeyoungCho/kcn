"use client";

import { Button } from "@repo/montage/ui/button";
import { Toaster, toast } from "@repo/montage/ui/toast";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToastActionDemo() {
  const t = usePreviewDictionary().demos.montage.toast;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: t.action.title,
            description: t.action.description,
            timeout: 5000,
            actionProps: {
              children: t.action.undo,
              onClick: () =>
                toast.add({ title: t.action.restored, type: "success" }),
            },
            data: { closeButton: true },
          })
        }
      >
        {t.action.trigger}
      </Button>
      <Toaster />
    </div>
  );
}
