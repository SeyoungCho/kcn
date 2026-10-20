"use client";

import { Badge } from "@repo/seed/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/seed/ui/table";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const orders = [
  { id: "LL-2486", status: "shipped", date: "2026-10-18" },
  { id: "LL-2485", status: "delivered", date: "2026-10-17" },
  { id: "LL-2484", status: "cancelled", date: "2026-10-16" },
  { id: "LL-2483", status: "delivered", date: "2026-10-15" },
  { id: "LL-2482", status: "delivered", date: "2026-10-14" },
  { id: "LL-2481", status: "delivered", date: "2026-10-13" },
] as const;

const tones = {
  shipped: "informative",
  delivered: "positive",
  cancelled: "neutral",
} as const;

export default function TablePinnedColumnsDemo() {
  const t = usePreviewDictionary().demos.table;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[420px]">
        <Table containerClassName="max-h-[280px]">
          <TableCaption>{t.caption}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead pin="left" pinEdge>
                {t.columns.order}
              </TableHead>
              <TableHead>{t.columns.customer}</TableHead>
              <TableHead>{t.columns.item}</TableHead>
              <TableHead>{t.columns.date}</TableHead>
              <TableHead>{t.columns.amount}</TableHead>
              <TableHead pin="right" pinEdge>
                {t.columns.status}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id} clickable tabIndex={0}>
                <TableCell pin="left" pinEdge>
                  {order.id}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {t.customers[index]}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {t.items[index]}
                </TableCell>
                <TableCell className="whitespace-nowrap tabular-nums">
                  {order.date}
                </TableCell>
                <TableCell className="tabular-nums">
                  {t.amounts[index]}
                </TableCell>
                <TableCell pin="right" pinEdge>
                  <Badge variant="weak" tone={tones[order.status]}>
                    {t.status[order.status]}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
