"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/seed/ui/table";
import { TablePagination } from "@repo/seed/ui/table-pagination";
import type { TablePaginationValue } from "@repo/seed/ui/table-pagination";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const TOTAL = 42;
const rows = Array.from({ length: TOTAL }, (_, index) => ({
  id: index + 1,
  joined: new Date(Date.UTC(2026, 0, 1 + index * 3)).toISOString().slice(0, 10),
}));

export default function TablePaginationWithTableDemo() {
  const t = usePreviewDictionary().demos.tablePagination;
  const [value, setValue] = React.useState<TablePaginationValue>({
    page: 1,
    pageSize: 10,
  });
  const start = (value.page - 1) * value.pageSize;
  const pageRows = rows.slice(start, start + value.pageSize);

  return (
    <div className="flex min-h-screen items-start justify-center p-8">
      <div className="flex w-full max-w-[640px] flex-col gap-3">
        <Table containerClassName="max-h-[360px]">
          <TableCaption>{t.caption}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{t.columns.id}</TableHead>
              <TableHead>{t.columns.name}</TableHead>
              <TableHead>{t.columns.joined}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tabular-nums">{row.id}</TableCell>
                <TableCell>
                  {t.member} {row.id}
                </TableCell>
                <TableCell className="tabular-nums">{row.joined}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="overflow-x-auto">
          <TablePagination
            totalItems={TOTAL}
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
            value={value}
            onValueChange={setValue}
          />
        </div>
      </div>
    </div>
  );
}
