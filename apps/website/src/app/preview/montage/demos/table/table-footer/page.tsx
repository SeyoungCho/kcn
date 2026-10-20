"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/montage/ui/table";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TableFooterDemo() {
  const t = usePreviewDictionary().demos.montage.table;
  const items = [
    { name: t.plants.monstera.name, price: t.plants.monstera.price },
    { name: t.plants.pothos.name, price: t.plants.pothos.price },
    { name: t.plants.rosemary.name, price: t.plants.rosemary.price },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.headers.item}</TableHead>
              <TableHead className="text-right">{t.headers.price}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-semibold">{t.total}</TableCell>
              <TableCell className="text-right font-semibold">
                {t.totalAmount}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
