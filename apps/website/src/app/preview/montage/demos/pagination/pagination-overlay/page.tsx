"use client";

import { useState } from "react";

import { PaginationCounter, PaginationDots } from "@repo/montage/ui/pagination";

const total = 8;

export default function PaginationOverlayDemo() {
  const [page, setPage] = useState(2);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="relative aspect-[3/2] w-full max-w-[360px] overflow-hidden
          rounded-16
          bg-[linear-gradient(135deg,var(--color-light-blue-60),var(--color-violet-50))]"
      >
        <PaginationCounter
          variant="overlay"
          size="sm"
          page={page}
          total={total}
          className="absolute top-4 right-4"
        />
        <PaginationDots
          variant="overlay"
          size="sm"
          count={total}
          value={page}
          onValueChange={setPage}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        />
      </div>
    </div>
  );
}
