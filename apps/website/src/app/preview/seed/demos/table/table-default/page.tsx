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
  { id: "1042", status: "paid", amount: 89000 },
  { id: "1041", status: "shipping", amount: 320000 },
  { id: "1040", status: "refunded", amount: 45000 },
  { id: "1039", status: "paid", amount: 159000 },
] as const;

const tones = {
  paid: "positive",
  shipping: "informative",
  refunded: "neutral",
} as const;

export default function TableDefaultDemo() {
  const t = usePreviewDictionary().demos.table;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[640px]">
        <Table>
          <TableCaption>{t.caption}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{t.columns.order}</TableHead>
              <TableHead>{t.columns.customer}</TableHead>
              <TableHead>{t.columns.status}</TableHead>
              <TableHead className="text-right">{t.columns.amount}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{t.customers[index]}</TableCell>
                <TableCell>
                  <Badge variant="weak" tone={tones[order.status]}>
                    {t.status[order.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {order.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
