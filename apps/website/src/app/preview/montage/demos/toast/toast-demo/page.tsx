"use client";

import { Button } from "@repo/montage/ui/button";
import { Toaster, toast } from "@repo/montage/ui/toast";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToastDemo() {
  const t = usePreviewDictionary().demos.montage.toast;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Button
        variant="outline"
        onClick={() => toast.add({ title: t.demo.message })}
      >
        {t.demo.trigger}
      </Button>
      <Toaster />
    </div>
  );
}
