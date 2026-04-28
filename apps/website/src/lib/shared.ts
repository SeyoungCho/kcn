export const appName = "My App";
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

export function docsPath(lang: string) {
  return `/${lang}${docsRoute}`;
}

export function docsContentPath(lang: string) {
  return `/${lang}${docsContentRoute}`;
}

export function docsOgPath(lang: string) {
  return `/${lang}${docsImageRoute}`;
}

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: "SeyoungCho",
  repo: "kcn",
  branch: "main",
};
