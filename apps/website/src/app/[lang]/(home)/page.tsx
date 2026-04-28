import Link from "next/link";
import { i18n } from "@/lib/i18n";

type Lang = (typeof i18n.languages)[number];

const homeCopy: Record<
  Lang,
  { title: string; beforeLink: string; linkLabel: string; afterLink: string }
> = {
  en: {
    title: "Hello World",
    beforeLink: "You can open ",
    linkLabel: "/docs",
    afterLink: " and see the documentation.",
  },
  ko: {
    title: "안녕하세요",
    beforeLink: "아래 링크로 ",
    linkLabel: "문서",
    afterLink: "를 열 수 있습니다.",
  },
};

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  const t = homeCopy[lang as Lang] ?? homeCopy.en;

  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">{t.title}</h1>
      <p>
        {t.beforeLink}
        <Link href={`/${lang}/docs`} className="font-medium underline">
          {t.linkLabel}
        </Link>
        {t.afterLink}
      </p>
    </div>
  );
}
