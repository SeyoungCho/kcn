"use client";

import { TablePagination } from "@repo/seed/ui/table-pagination";

export default function TablePaginationDefaultDemo() {
  return (
    <div className="flex min-h-screen items-start justify-center p-8">
      <div className="w-full max-w-[640px] overflow-x-auto">
        <TablePagination totalItems={237} />
      </div>
    </div>
  );
}
