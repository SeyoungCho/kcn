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
  { id: "1042", status: "paid", date: "2026-10-18", amount: 89000 },
  { id: "1041", status: "shipping", date: "2026-10-17", amount: 320000 },
  { id: "1040", status: "refunded", date: "2026-10-16", amount: 45000 },
  { id: "1039", status: "paid", date: "2026-10-15", amount: 159000 },
  { id: "1038", status: "shipping", date: "2026-10-14", amount: 72000 },
  { id: "1037", status: "paid", date: "2026-10-13", amount: 38000 },
] as const;

const tones = {
  paid: "positive",
  shipping: "informative",
  refunded: "neutral",
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
                  #{order.id}
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
                  {order.amount.toLocaleString()}
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
