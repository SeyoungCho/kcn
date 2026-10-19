"use client";

import * as React from "react";
import IconChevronLeftLine from "@karrotmarket/react-monochrome-icon/IconChevronLeftLine";
import IconChevronRightLine from "@karrotmarket/react-monochrome-icon/IconChevronRightLine";
import { PaginationButton } from "@repo/seed/ui/pagination-button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const total = 5;

export default function PaginationButtonWithIndicatorDemo() {
  const t = usePreviewDictionary().demos.paginationButton;
  const [page, setPage] = React.useState(1);

  return (
    <div className="flex min-h-screen items-center justify-center gap-2 p-8">
      <PaginationButton
        aria-label={t.previous}
        disabled={page === 1}
        onClick={() => setPage((current) => current - 1)}
      >
        <IconChevronLeftLine />
      </PaginationButton>
      <span className="min-w-24 text-center text-t4 text-fg-neutral">
        {t.pageIndicator
          .replace("{page}", String(page))
          .replace("{total}", String(total))}
      </span>
      <PaginationButton
        aria-label={t.next}
        disabled={page === total}
        onClick={() => setPage((current) => current + 1)}
      >
        <IconChevronRightLine />
      </PaginationButton>
    </div>
  );
}
