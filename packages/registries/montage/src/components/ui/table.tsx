import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Table 에 montage 의 모양을 입혔다.
// 표는 둥근 테두리 안에 들어가고, 넘치면 그 안에서 스크롤된다(높이를 줄이려면 바깥을 flex 세로 줄로 두고 max-h-* 를 준다).
// 머리 줄은 위에 붙어 따라오며 지나가는 내용을 흐린다.
// 칸마다 아래 선을 긋고, 표의 맨 아래 줄에서는 뺀다 — 테두리와 겹치지 않게.
// TableRow interactive — 누를 수 있는 줄. 마우스를 올리거나 누르면 옅은 막이 깔린다.
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative min-h-0 w-full overflow-auto rounded-12 border
        border-line-neutral-secondary-opaque"
    >
      <table
        data-slot="table"
        className={cn(
          `w-full caption-bottom border-separate border-spacing-0
          [&_tfoot>tr:last-child>*]:border-b-0
          [&:not(:has(tfoot>tr))_tbody>tr:last-child>*]:border-b-0
          [&:not(:has(tfoot>tr,tbody>tr))_thead>tr:last-child>*]:border-b-0`,
          className,
        )}
        {...props}
      />
    </div>
  );
}

// 위에 붙은 머리 줄은 뒤를 흐린 판 위에 옅은 회색을 한 겹 더 깐다
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        `sticky top-0 z-1 bg-surface-elevated-primary/88 backdrop-blur-[32px]
        before:absolute before:inset-0 before:-z-10
        before:bg-surface-neutral-tertiary`,
        className,
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={className} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={className} {...props} />;
}

const tableRowVariants = cva("relative", {
  variants: {
    interactive: {
      true: `cursor-pointer outline-none [--interaction-active:0.12]
      [--interaction-hover:0.05] after:pointer-events-none after:absolute
      after:inset-0 after:bg-fg-neutral-primary after:opacity-0
      after:transition-opacity after:duration-200 after:ease-[ease]
      hover:after:opacity-(--interaction-hover) focus-visible:outline-2
      focus-visible:-outline-offset-2 focus-visible:outline-ring
      focus-visible:outline-solid active:after:opacity-(--interaction-active)`,
      false: "",
    },
  },
  defaultVariants: {
    interactive: false,
  },
});

type TableRowProps = React.ComponentProps<"tr"> &
  VariantProps<typeof tableRowVariants>;

function TableRow({ className, interactive = false, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      tabIndex={interactive ? 0 : undefined}
      className={cn(tableRowVariants({ interactive }), className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        `h-11 border-b border-line-neutral-secondary-opaque py-2 pl-5 text-left
        align-middle text-label2 font-semibold text-fg-neutral-secondary
        break-keep wrap-anywhere last:pr-5`,
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        `h-11 border-b border-line-neutral-secondary-opaque py-4 pl-5 text-left
        align-middle text-body1 text-fg-neutral-primary break-keep wrap-anywhere
        last:pr-5`,
        className,
      )}
      {...props}
    />
  );
}

// 표 아래에 두는 설명 — 위에 선을 긋고 칸과 같은 여백을 둔다
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        `border-t border-line-neutral-secondary-opaque px-5 py-4 text-label1
        text-fg-neutral-tertiary`,
        className,
      )}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  tableRowVariants,
  type TableRowProps,
};
