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

export default function TableScrollDemo() {
  const t = usePreviewDictionary().demos.montage.table;
  const orders = [
    {
      id: "LL-2510",
      item: t.plants.snakePlant.name,
      amount: t.plants.snakePlant.price,
    },
    {
      id: "LL-2502",
      item: t.plants.olive.name,
      amount: t.plants.olive.price,
    },
    {
      id: "LL-2493",
      item: t.plants.pothos.name,
      amount: t.plants.pothos.price,
    },
    {
      id: "LL-2481",
      item: t.plants.monstera.name,
      amount: t.plants.monstera.price,
    },
    {
      id: "LL-2477",
      item: t.plants.pilea.name,
      amount: t.plants.pilea.price,
    },
    {
      id: "LL-2468",
      item: t.plants.areca.name,
      amount: t.plants.areca.price,
    },
    {
      id: "LL-2455",
      item: t.plants.fern.name,
      amount: t.plants.fern.price,
    },
    {
      id: "LL-2449",
      item: t.plants.rosemary.name,
      amount: t.plants.rosemary.price,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex max-h-[280px] w-full max-w-[560px] flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.headers.order}</TableHead>
              <TableHead>{t.headers.item}</TableHead>
              <TableHead>{t.headers.amount}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.item}</TableCell>
                <TableCell>{order.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
