"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/montage/ui/table";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TableInteractiveDemo() {
  const t = usePreviewDictionary().demos.montage.table;
  const orders = [
    {
      id: "LL-2510",
      item: t.plants.snakePlant.name,
      status: t.status.paid,
    },
    {
      id: "LL-2502",
      item: t.plants.olive.name,
      status: t.status.preparing,
    },
    {
      id: "LL-2493",
      item: t.plants.pothos.name,
      status: t.status.shipped,
    },
    {
      id: "LL-2481",
      item: t.plants.monstera.name,
      status: t.status.delivered,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[560px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.headers.order}</TableHead>
              <TableHead>{t.headers.item}</TableHead>
              <TableHead>{t.headers.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} interactive>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.item}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
