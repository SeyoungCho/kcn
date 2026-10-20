"use client";

import { Button } from "@repo/montage/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@repo/montage/ui/empty";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function EmptyVerticalDemo() {
  const t = usePreviewDictionary().demos.montage.empty;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Empty padding="compact">
        <EmptyHeader>
          <EmptyTitle>{t.error.title}</EmptyTitle>
          <EmptyDescription>{t.error.description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent orientation="vertical">
          <Button variant="outline" size="lg">
            {t.error.retry}
          </Button>
          <Button variant="outline" size="lg">
            {t.error.home}
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
