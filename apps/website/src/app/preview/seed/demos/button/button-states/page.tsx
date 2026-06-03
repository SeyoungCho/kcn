"use client";

import { Button } from "@repo/seed/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ButtonStatesDemo() {
  const t = usePreviewDictionary().demos.button;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="grid w-full max-w-[560px] grid-cols-1 gap-3 sm:grid-cols-2"
      >
        <Button data-hover>{t.states.hover}</Button>
        <Button data-active>{t.states.pressed}</Button>
        <Button data-loading>{t.states.loading}</Button>
        <Button disabled>{t.states.disabled}</Button>
        <Button data-disabled variant="neutralOutline">
          {t.states.dataDisabled}
        </Button>
        <Button data-focus-visible variant="brandOutline">
          {t.states.focusVisible}
        </Button>
      </div>
    </div>
  );
}
