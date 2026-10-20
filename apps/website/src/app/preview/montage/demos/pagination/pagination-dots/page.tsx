"use client";

import { useState } from "react";

import { PaginationDots } from "@repo/montage/ui/pagination";

export default function PaginationDotsDemo() {
  const [page, setPage] = useState(4);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-8
        p-8"
    >
      <PaginationDots count={3} defaultValue={1} />
      <PaginationDots count={10} value={page} onValueChange={setPage} />
      <PaginationDots
        size="sm"
        count={10}
        value={page}
        onValueChange={setPage}
      />
    </div>
  );
}
