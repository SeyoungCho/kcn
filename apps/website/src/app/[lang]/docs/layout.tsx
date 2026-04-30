import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/components/layout.shared";

import Image from "next/image";

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[lang]/docs">) {
  const { lang } = await params;

  return (
    <DocsLayout
      tree={source.getPageTree(lang)}
      {...baseOptions(lang)}
      tabs={[
        {
          title: "t-flavored",
          description: "t-flavored-desc",
          url: `/${lang}/docs/t-flavored`,
          icon: (
            <Image
              src="/t-flavored-logo.png"
              alt="t-flavored"
              width={24}
              height={24}
            />
          ),
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
