import Link from "next/link";
import { getDictionary } from "@/dictionaries";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const t = dict.home;

  return (
    <div className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">{t.title}</h1>
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
