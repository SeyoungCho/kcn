"use client";

import { TablePagination } from "@repo/seed/ui/table-pagination";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TablePaginationDefaultDemo() {
  const t = usePreviewDictionary().demos.tablePagination;
  return (
    <div className="flex min-h-screen items-start justify-center p-8">
      <div className="w-full max-w-[640px] overflow-x-auto">
        <TablePagination
          totalItems={237}
          locale={t.locale}
          labels={{
            rootAriaLabel: t.labels.rootAriaLabel,
            pageRangeAriaLabel: t.labels.pageRangeAriaLabel,
            pageSizeAriaLabel: t.labels.pageSizeAriaLabel,
            previousPageAriaLabel: t.labels.previousPageAriaLabel,
            nextPageAriaLabel: t.labels.nextPageAriaLabel,
            pageSizeSuffix: t.labels.pageSizeSuffix,
            total: (total) => t.total.replace("{total}", total),
            pageSize: (size) => t.pageSize.replace("{size}", size),
          }}
        />
      </div>
    </div>
  );
}
