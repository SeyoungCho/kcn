import { RootProvider } from "fumadocs-ui/provider/next";
import "../global.css";
import { Inter } from "next/font/google";
import { i18n } from "@/lib/i18n";
import { i18nUI } from "@/lib/layout.shared";

const inter = Inter({
  subsets: ["latin"],
});

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider i18n={i18nUI.provider(lang)}>{children}</RootProvider>
      </body>
    </html>
  );
}
