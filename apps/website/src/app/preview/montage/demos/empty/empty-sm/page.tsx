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

export default function EmptySmDemo() {
  const t = usePreviewDictionary().demos.montage.empty;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Empty size="sm" padding="compact">
        <EmptyHeader>
          <EmptyTitle>{t.plants.title}</EmptyTitle>
          <EmptyDescription>{t.plants.description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">{t.plants.action}</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
