"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/montage/ui/table";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TableDemo() {
  const t = usePreviewDictionary().demos.montage.table;
  const orders = [
    {
      id: "LL-2510",
      item: t.plants.snakePlant.name,
      amount: t.plants.snakePlant.price,
      status: t.status.paid,
    },
    {
      id: "LL-2502",
      item: t.plants.olive.name,
      amount: t.plants.olive.price,
      status: t.status.preparing,
    },
    {
      id: "LL-2493",
      item: t.plants.pothos.name,
      amount: t.plants.pothos.price,
      status: t.status.shipped,
    },
    {
      id: "LL-2481",
      item: t.plants.monstera.name,
      amount: t.plants.monstera.price,
      status: t.status.delivered,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[560px]">
        <Table>
          <TableCaption>{t.caption}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{t.headers.order}</TableHead>
              <TableHead>{t.headers.item}</TableHead>
              <TableHead>{t.headers.amount}</TableHead>
              <TableHead>{t.headers.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.item}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
