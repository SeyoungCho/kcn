"use client";

import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationCounter,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@repo/montage/ui/pagination";

const total = 10;

export default function PaginationCounterDemo() {
  const [page, setPage] = useState(3);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              render={<button type="button" />}
              aria-disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationCounter page={page} total={total} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              render={<button type="button" />}
              aria-disabled={page === total}
              onClick={() => setPage((p) => Math.min(p + 1, total))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
