"use client";

import { Spinner } from "@repo/t-flavored/ui/spinner";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SpinnerVariantsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.spinner;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex items-center gap-4">
        <div className="flex size-15 items-center justify-center">
          <Spinner aria-label={t.loading} />
        </div>
        <div className="flex size-15 items-center justify-center">
          <Spinner variant="dark" aria-label={t.loading} />
        </div>
        <div className="flex size-15 items-center justify-center bg-grey-600">
          <Spinner variant="light" aria-label={t.loading} />
        </div>
      </div>
    </div>
  );
}
