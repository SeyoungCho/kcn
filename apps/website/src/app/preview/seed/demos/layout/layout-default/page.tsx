"use client";

import { Layout, LayoutContent } from "@repo/seed/ui/layout";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function LayoutDefaultDemo() {
  const t = usePreviewDictionary().demos.layout;
  const orders = [t.orders.first, t.orders.second, t.orders.third];

  return (
    <Layout className="bg-bg-layer-basement">
      <LayoutContent className="px-x6 pt-x14 pb-x6">
        <h1 className="text-t7 font-bold text-fg-neutral">{t.title}</h1>
        <p className="mt-x1 text-t4 text-fg-neutral-subtle">{t.description}</p>
        <ul
          className="mt-x5 flex flex-col overflow-hidden rounded-r3 border
            border-stroke-neutral-muted bg-bg-layer-default"
        >
          {orders.map((order) => (
            <li
              key={order.name}
              className="flex items-center justify-between border-b
                border-stroke-neutral-muted px-x4 py-x3 last:border-b-0"
            >
              <span className="text-t5 text-fg-neutral">{order.name}</span>
              <span className="text-t4 text-fg-neutral-subtle">
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      </LayoutContent>
    </Layout>
  );
}
