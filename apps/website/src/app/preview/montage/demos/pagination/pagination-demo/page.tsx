"use client";

import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/montage/ui/pagination";

const total = 20;

// 처음 · 끝 쪽과 지금 쪽 양옆 하나씩을 보이고 나머지는 말줄임으로 접는다
function getPages(page: number) {
  const pages = new Set([1, total, page - 1, page, page + 1]);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  return sorted.flatMap((p, i) =>
    i > 0 && p - sorted[i - 1]! > 1 ? (["ellipsis", p] as const) : [p],
  );
}

export default function PaginationDemo() {
  const [page, setPage] = useState(6);

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
          {getPages(page).map((item, index) => (
            <PaginationItem key={index}>
              {item === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  render={<button type="button" />}
                  isActive={item === page}
                  onClick={() => setPage(item)}
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
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
