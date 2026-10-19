"use client";

import * as React from "react";
import { TablePagination } from "@repo/seed/ui/table-pagination";
import type { TablePaginationValue } from "@repo/seed/ui/table-pagination";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

// Pretend the server reports five pages in total.
const LAST_PAGE = 5;

export default function TablePaginationUnknownTotalDemo() {
  const t = usePreviewDictionary().demos.tablePagination;
  const [value, setValue] = React.useState<TablePaginationValue>({
    page: 1,
    pageSize: 10,
  });

  return (
    <div className="flex min-h-screen items-start justify-center p-8">
      <div className="w-full max-w-[640px] overflow-x-auto">
        <TablePagination
          value={value}
          onValueChange={setValue}
          hasPreviousPage={value.page > 1}
          hasNextPage={value.page < LAST_PAGE}
          locale={t.locale}
          labels={{
            rootAriaLabel: t.labels.rootAriaLabel,
            pageRangeAriaLabel: t.labels.pageRangeAriaLabel,
            pageSizeAriaLabel: t.labels.pageSizeAriaLabel,
            previousPageAriaLabel: t.labels.previousPageAriaLabel,
            nextPageAriaLabel: t.labels.nextPageAriaLabel,
            pageSizeSuffix: t.labels.pageSizeSuffix,
          }}
        />
      </div>
    </div>
  );
}
