import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { i18n } from "./i18n";
import { appName, gitConfig } from "./shared";

export const i18nUI = defineI18nUI(i18n, {
  en: {
    displayName: "English",
  },
  ko: {
    displayName: "한국어",
    search: "문서 검색",
  },
});

export function baseOptions(lang: string): BaseLayoutProps {
  return {
    nav: {
      title: appName,
      url: `/${lang}`,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    i18n: true,
  };
}
