"use client";

import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/montage/ui/pagination";

const pages = [1, 2, 3, 4, 5];

export default function PaginationCompactDemo() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              size="icon-lg"
              render={<button type="button" />}
              aria-disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            />
          </PaginationItem>
          {pages.map((item) => (
            <PaginationItem key={item}>
              <PaginationLink
                render={<button type="button" />}
                isActive={item === page}
                onClick={() => setPage(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              size="icon-lg"
              render={<button type="button" />}
              aria-disabled={page === pages.length}
              onClick={() => setPage((p) => Math.min(p + 1, pages.length))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
