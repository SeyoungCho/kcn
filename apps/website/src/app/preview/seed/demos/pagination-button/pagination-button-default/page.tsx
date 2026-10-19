"use client";

import IconChevronLeftLine from "@karrotmarket/react-monochrome-icon/IconChevronLeftLine";
import IconChevronRightLine from "@karrotmarket/react-monochrome-icon/IconChevronRightLine";
import { PaginationButton } from "@repo/seed/ui/pagination-button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function PaginationButtonDefaultDemo() {
  const t = usePreviewDictionary().demos.paginationButton;

  return (
    <div className="flex min-h-screen items-center justify-center gap-2 p-8">
      <PaginationButton aria-label={t.previous} disabled>
        <IconChevronLeftLine />
      </PaginationButton>
      <PaginationButton aria-label={t.next}>
        <IconChevronRightLine />
      </PaginationButton>
    </div>
  );
}
