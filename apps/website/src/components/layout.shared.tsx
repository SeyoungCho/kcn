import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { i18n } from "@/lib/i18n";
import { gitConfig } from "@/lib/shared";
import Image from "next/image";

export const i18nUI = defineI18nUI(i18n, {
  en: {
    displayName: "English",
  },
  ko: {
    displayName: "한국어",
    search: "문서 검색",
    toc: "목차",
  },
});

export function baseOptions(lang: string): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      url: `/${lang}`,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    i18n: true,
  };
}

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/kcn-logo-light.svg"
        alt="KCN"
        width={24}
        height={24}
        className="dark:hidden"
      />
      <Image
        src="/kcn-logo-dark.svg"
        alt="KCN"
        width={24}
        height={24}
        className="hidden dark:block"
      />
      <span className="text-xl font-semibold text-black dark:text-white">
        K-cn
      </span>
    </div>
  );
};
