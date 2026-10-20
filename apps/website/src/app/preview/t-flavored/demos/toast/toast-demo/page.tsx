"use client";

import { Button } from "@repo/t-flavored/ui/button";
import { Toaster, toast } from "@repo/t-flavored/ui/toast";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToastDemo() {
  const t = usePreviewDictionary().demos.tFlavored.toast;

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      <Button
        variant="weak"
        onClick={() =>
          toast.add({ title: t.top.message, data: { position: "top" } })
        }
      >
        {t.top.trigger}
      </Button>
      <Button
        variant="weak"
        onClick={() => toast.add({ title: t.bottom.message })}
      >
        {t.bottom.trigger}
      </Button>
      <Toaster />
    </div>
  );
}
