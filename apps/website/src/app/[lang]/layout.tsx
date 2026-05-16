import { RootProvider } from "fumadocs-ui/provider/next";
import "@/app/global.css";
import { i18n } from "@/lib/i18n";
import { i18nUI } from "@/components/layout.shared";
import { getDictionary } from "@/dictionaries";
import { DictionaryProvider } from "@/components/dictionary-provider";

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider i18n={i18nUI.provider(lang)}>
          <DictionaryProvider value={dictionary}>{children}</DictionaryProvider>
        </RootProvider>
      </body>
    </html>
  );
}
