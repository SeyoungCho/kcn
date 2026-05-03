import Link from "next/link";
import { getDictionary } from "@/dictionaries";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const t = dict.home;

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
